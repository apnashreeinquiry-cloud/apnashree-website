// POST /api/admin/login  { password }
// Validates against the ADMIN_PASSWORD environment variable set in Vercel.
// The password is NEVER in the code/repo anymore.
export async function POST(request) {
  let body = {}
  try { body = await request.json() } catch (e) {}

  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    return Response.json(
      { ok: false, error: 'ADMIN_PASSWORD is not set on the server. Add it in Vercel > Settings > Environment Variables.' },
      { status: 500 }
    )
  }

  if (body.password && body.password === expected) {
    return Response.json({ ok: true })
  }
  return Response.json({ ok: false, error: 'Wrong password' }, { status: 401 })
}
