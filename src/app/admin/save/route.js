// POST /api/admin/save
// Body: { password, data: { mainProducts, otherProducts }, images: [{ path, dataUrl }] }
// Authenticates against ADMIN_PASSWORD, then commits products.json + any new
// image files to the repo in ONE atomic commit. Vercel auto-redeploys.

const GH = 'https://api.github.com'

function ghHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }
}

async function gh(token, path, options = {}) {
  const res = await fetch(`${GH}${path}`, { ...options, headers: ghHeaders(token) })
  const text = await res.text()
  let json = {}
  try { json = text ? JSON.parse(text) : {} } catch (e) { json = { raw: text } }
  if (!res.ok) {
    throw new Error(`GitHub ${path} -> ${res.status}: ${json.message || text}`)
  }
  return json
}

export async function POST(request) {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO          // e.g. apnashreeinquiry-cloud/apnashree-website
  const branch = process.env.GITHUB_BRANCH || 'main'
  const adminPass = process.env.ADMIN_PASSWORD

  if (!token || !repo || !adminPass) {
    return Response.json(
      { ok: false, error: 'Server not configured. Set GITHUB_TOKEN, GITHUB_REPO and ADMIN_PASSWORD in Vercel.' },
      { status: 500 }
    )
  }

  let body = {}
  try { body = await request.json() } catch (e) {
    return Response.json({ ok: false, error: 'Invalid request body' }, { status: 400 })
  }

  // --- auth ---
  if (!body.password || body.password !== adminPass) {
    return Response.json({ ok: false, error: 'Not authorised' }, { status: 401 })
  }

  // --- validate payload ---
  const data = body.data
  if (!data || !Array.isArray(data.mainProducts) || !Array.isArray(data.otherProducts)) {
    return Response.json({ ok: false, error: 'Missing or malformed product data' }, { status: 400 })
  }
  const images = Array.isArray(body.images) ? body.images : []

  // build the list of files to commit
  const files = []
  files.push({
    path: 'src/data/products.json',
    content: Buffer.from(JSON.stringify(data, null, 2), 'utf8').toString('base64'),
  })
  for (const img of images) {
    if (!img || !img.path || !img.dataUrl) continue
    const base64 = String(img.dataUrl).split(',').pop()  // strip "data:image/...;base64,"
    // basic guard: only allow writing into the products image folder
    if (!img.path.startsWith('public/images/products/')) continue
    files.push({ path: img.path, content: base64 })
  }

  try {
    // 1. current commit + tree
    const ref = await gh(token, `/repos/${repo}/git/ref/heads/${branch}`)
    const baseCommitSha = ref.object.sha
    const baseCommit = await gh(token, `/repos/${repo}/git/commits/${baseCommitSha}`)
    const baseTreeSha = baseCommit.tree.sha

    // 2. blobs
    const tree = []
    for (const f of files) {
      const blob = await gh(token, `/repos/${repo}/git/blobs`, {
        method: 'POST',
        body: JSON.stringify({ content: f.content, encoding: 'base64' }),
      })
      tree.push({ path: f.path, mode: '100644', type: 'blob', sha: blob.sha })
    }

    // 3. new tree
    const newTree = await gh(token, `/repos/${repo}/git/trees`, {
      method: 'POST',
      body: JSON.stringify({ base_tree: baseTreeSha, tree }),
    })

    // 4. commit
    const msg = `Admin: update sub-products${images.length ? ` (+${images.length} image${images.length > 1 ? 's' : ''})` : ''}`
    const commit = await gh(token, `/repos/${repo}/git/commits`, {
      method: 'POST',
      body: JSON.stringify({ message: msg, tree: newTree.sha, parents: [baseCommitSha] }),
    })

    // 5. move branch
    await gh(token, `/repos/${repo}/git/refs/heads/${branch}`, {
      method: 'PATCH',
      body: JSON.stringify({ sha: commit.sha, force: false }),
    })

    return Response.json({ ok: true, commit: commit.sha, files: files.length })
  } catch (err) {
    return Response.json({ ok: false, error: String(err.message || err) }, { status: 502 })
  }
}
