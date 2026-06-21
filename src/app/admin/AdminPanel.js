'use client'
import { useState, useRef, useEffect } from 'react'
import { upload } from '@vercel/blob/client'
import Link from 'next/link'
import { mainProducts, otherProducts } from '../../data/products'
import EnquiriesPanel from './EnquiriesPanel'

const ADMIN_USERNAME = 'admin'

const allProds = [...mainProducts, ...otherProducts]
const EMPTY = { name:'', brand:'', heroDesc:'', description:'', specifications:[''], applications:[''], tags:[], keywords:[], image:'', sheetImage:'', images:[], metaTitle:'', metaDescription:'', slug:'' }

// The committed products.json is the single source of truth — the LIVE site
// reads it. So we load straight from it (no browser localStorage anywhere).
function loadSubs() {
  const m = {}
  allProds.forEach(p => { m[p.slug] = JSON.parse(JSON.stringify(p.subProducts || [])) })
  return m
}

// Build the full data payload, and pull any newly-uploaded images (data: URLs)
// out as real files to commit, replacing them with their final /images path.
function buildPayload(subs) {
  const inject = (arr) => arr.map(p => ({ ...p, subProducts: (subs[p.slug] || []).map(s => ({ ...s })) }))
  const data = { mainProducts: inject(mainProducts), otherProducts: inject(otherProducts) }
  const images = []
  let counter = Date.now()
  ;[...data.mainProducts, ...data.otherProducts].forEach(p => {
    (p.subProducts || []).forEach(s => {
      ['image', 'sheetImage'].forEach(field => {
        const val = s[field]
        if (typeof val === 'string' && val.startsWith('data:')) {
          const mt = val.match(/^data:image\/([a-z0-9.+-]+);base64,/i)
          const ext = (mt ? mt[1] : 'jpg').toLowerCase().replace('jpeg', 'jpg').replace('svg+xml', 'svg')
          const name = ((s.slug || 'sub') + '-' + field + '-' + (counter++)).toLowerCase().replace(/[^a-z0-9-]+/g, '-') + '.' + ext
          images.push({ path: 'public/images/products/' + name, dataUrl: val })
          s[field] = '/images/products/' + name
        }
      })
    })
  })
  return { data, images }
}

// Save to the server, which commits to the repo. Vercel then redeploys.
async function commitSubs(subs) {
  const password = (typeof window !== 'undefined' && sessionStorage.getItem('apnashree_admin_pass')) || ''
  const { data, images } = buildPayload(subs)
  const res = await fetch('/api/admin/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, data, images }),
  })
  let json = {}
  try { json = await res.json() } catch (e) {}
  if (!res.ok || !json.ok) throw new Error(json.error || ('Save failed (HTTP ' + res.status + ')'))
  return json
}

// ── LOGIN SCREEN ──────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      let json = {}
      try { json = await res.json() } catch (e) {}
      if (res.ok && json.ok && username === ADMIN_USERNAME) {
        sessionStorage.setItem('apnashree_admin_auth', 'true')
        sessionStorage.setItem('apnashree_admin_pass', password)
        onLogin()
      } else {
        setError('❌ Incorrect username or password')
        setLoading(false)
      }
    } catch (err) {
      setError('❌ Login failed — check your connection and try again')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f8f6f1', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Space Grotesk,sans-serif', padding:20 }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <div style={{ width:'100%', maxWidth:400 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:56, height:56, background:'#e85d26', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
            <svg width="26" height="26" fill="white" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <h1 style={{ fontSize:22, fontWeight:700, color:'#0f0f0f', marginBottom:4 }}>Apna Shree Admin</h1>
          <p style={{ fontSize:13, color:'#888' }}>Sign in to manage your products</p>
        </div>
        <div style={{ background:'#fff', border:'1px solid #e2ddd6', borderRadius:16, padding:32, boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#555', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Username</label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:16 }}>👤</span>
                <input type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} required autoComplete="username"
                  style={{ width:'100%', padding:'12px 14px 12px 40px', border:'1.5px solid #d0ccc6', borderRadius:8, fontSize:15, fontFamily:'inherit', outline:'none', color:'#0f0f0f', background:'#f8f6f1', boxSizing:'border-box' }}
                  onFocus={e => e.target.style.borderColor='#e85d26'} onBlur={e => e.target.style.borderColor='#d0ccc6'} />
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#555', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Password</label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:16 }}>🔒</span>
                <input type={showPass ? 'text' : 'password'} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password"
                  style={{ width:'100%', padding:'12px 44px 12px 40px', border:'1.5px solid #d0ccc6', borderRadius:8, fontSize:15, fontFamily:'inherit', outline:'none', color:'#0f0f0f', background:'#f8f6f1', boxSizing:'border-box' }}
                  onFocus={e => e.target.style.borderColor='#e85d26'} onBlur={e => e.target.style.borderColor='#d0ccc6'} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, padding:0 }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            {error && (
              <div style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:8, padding:'10px 14px', marginBottom:16, fontSize:13, color:'#dc2626', fontWeight:500 }}>
                {error}
              </div>
            )}
            <button type="submit" disabled={loading}
              style={{ width:'100%', padding:14, background: loading ? '#f0987a' : '#e85d26', color:'#fff', border:'none', borderRadius:8, fontSize:16, fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              {loading ? '⏳ Signing in...' : '🔐 Sign In to Admin'}
            </button>
          </form>
          <div style={{ marginTop:20, padding:'12px 14px', background:'#f0ede6', borderRadius:8, fontSize:12, color:'#888', textAlign:'center', lineHeight:1.6 }}>
            🔒 Authorized personnel only · Contact admin for access
          </div>
        </div>
        <p style={{ textAlign:'center', marginTop:20, fontSize:12, color:'#aaa' }}>
          <Link href="/" style={{ color:'#888', textDecoration:'none' }}>← Back to Website</Link>
        </p>
      </div>
    </div>
  )
}

// ── MAIN ADMIN PANEL ──────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [activeTab, setActiveTab] = useState('enquiries')
  const [subs, setSubs] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [delConfirm, setDelConfirm] = useState(null)
  const [search, setSearch] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [kwInput, setKwInput] = useState('')
  const [expandedProd, setExpandedProd] = useState({})
  const [toast, setToast] = useState('')
  const imgRef = useRef()
  const sheetRef = useRef()
  const galleryRef = useRef()
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const isAuthed = sessionStorage.getItem('apnashree_admin_auth') === 'true'
    setAuthed(isAuthed)
    setAuthChecked(true)
  }, [])

  useEffect(() => {
    const data = loadSubs()
    setSubs(data)
    setLoaded(true)
  }, [])

  if (!authChecked) return null
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }
  const filtered = allProds.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
  const totalSubs = Object.values(subs).reduce((a, b) => a + b.length, 0)

  function toggleExpand(slug) { setExpandedProd(prev => ({ ...prev, [slug]: !prev[slug] })) }

  function openAdd(parentSlug) {
    const parent = allProds.find(p => p.slug === parentSlug)
    setForm({ ...EMPTY, brand: parent?.brand?.split('/')[0].trim() || '' })
    setModal({ mode:'add', parentSlug }); setSaved(false); setTagInput(''); setKwInput('')
  }

  function openEdit(parentSlug, idx) {
    const sub = subs[parentSlug]?.[idx]
    if (!sub) return
    setForm({ ...EMPTY, ...sub, specifications: sub.specifications?.length ? [...sub.specifications] : [''], applications: sub.applications?.length ? [...sub.applications] : [''], tags: [...(sub.tags||[])], keywords: [...(sub.keywords||[])] })
    setModal({ mode:'edit', parentSlug, subIndex:idx }); setSaved(false); setTagInput(''); setKwInput('')
  }

  function closeModal() { setModal(null); setForm(EMPTY); setTagInput(''); setKwInput('') }

  function handleImg(e, field) {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 3*1024*1024) { alert('Image too large (max 3MB). Compress at squoosh.app'); return }
    const reader = new FileReader()
    reader.onload = ev => setForm(f => ({ ...f, [field]: ev.target.result }))
    reader.readAsDataURL(file)
  }

  // Gallery: upload multiple images straight to Vercel Blob (permanent URLs).
  async function uploadGalleryImages(e) {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (!files.length) return
    const current = form.images || []
    if (current.length + files.length > 6) { alert('Maximum 6 images per product.'); return }
    setUploading(true)
    const password = (typeof window !== 'undefined' && sessionStorage.getItem('apnashree_admin_pass')) || ''
    try {
      const urls = []
      for (const file of files) {
        if (file.size > 25*1024*1024) { throw new Error(file.name + ' is over 25MB') }
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/admin/blob-upload',
          clientPayload: password,
        })
        urls.push(blob.url)
      }
      setForm(f => ({ ...f, images: [...(f.images || []), ...urls] }))
    } catch (err) {
      alert('Upload failed: ' + (err.message || err))
    } finally {
      setUploading(false)
    }
  }

  function removeGalleryImage(idx) {
    setForm(f => ({ ...f, images: (f.images || []).filter((_, i) => i !== idx) }))
  }

  function autoSlug() { return (form.name||'product').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')+'-chennai' }

  function autoSEO() {
    const parent = allProds.find(p => p.slug === modal?.parentSlug)
    if (!form.name) return alert('Enter product name first')
    setForm(f => ({
      ...f,
      metaTitle: `${form.name} Supplier Chennai | ${form.brand} Tamil Nadu | Apna Shree`.slice(0,60),
      metaDescription: `Buy ${form.name} in Chennai. ${form.brand} ${(parent?.name||'').toLowerCase()} for industrial applications in Tamil Nadu. Call +91 73583 76280.`.slice(0,160),
      keywords: [`${form.name.toLowerCase()} Chennai`, `${form.brand} ${form.name.toLowerCase()} Tamil Nadu`, `${form.name.toLowerCase()} supplier Chennai`, `${form.brand.toLowerCase()} dealer Chennai`]
    }))
  }

  async function handleSave(e) {
    e.preventDefault(); setSaving(true)
    const parent = allProds.find(p => p.slug === modal.parentSlug)
    const newSub = { ...form, slug: form.slug||autoSlug(), parentSlug: modal.parentSlug, parentName: parent?.name||'', specifications: form.specifications.filter(Boolean), applications: form.applications.filter(Boolean) }
    const list = [...(subs[modal.parentSlug]||[])]
    if (modal.mode === 'add') list.push(newSub); else list[modal.subIndex] = newSub
    const next = { ...subs, [modal.parentSlug]: list }
    try {
      await commitSubs(next)
      setSubs(next)
      setSaving(false); setSaved(true)
      showToast(modal.mode==='add' ? '✅ Added! Live in ~1 min (site is rebuilding)' : '✅ Saved! Live in ~1 min (site is rebuilding)')
    } catch (err) {
      setSaving(false)
      showToast('❌ ' + (err.message || 'Save failed'))
    }
  }

  async function doDelete() {
    if (!delConfirm) return
    const list = [...(subs[delConfirm.parentSlug]||[])]
    list.splice(delConfirm.subIndex, 1)
    const next = { ...subs, [delConfirm.parentSlug]: list }
    try {
      await commitSubs(next)
      setSubs(next)
      setDelConfirm(null); showToast('🗑️ Deleted — live in ~1 min')
    } catch (err) {
      setDelConfirm(null); showToast('❌ ' + (err.message || 'Delete failed'))
    }
  }

  function resetToDefault() {
    if (!confirm('Reload sub-products from the live site data? This only clears unsaved edits on this screen — it does NOT undo changes you already saved.')) return
    setSubs(loadSubs()); showToast('♻️ Reloaded from live data')
  }

  const seoScore = (() => {
    const t = form.metaTitle?.length||0, d = form.metaDescription?.length||0
    if (t>=50&&t<=60&&d>=140&&d<=160) return { txt:'✅ SEO Perfect!', color:'#16a34a', bg:'rgba(34,197,94,0.1)', border:'rgba(34,197,94,0.2)' }
    if (t>0&&d>0) return { txt:'⚠️ Needs improvement', color:'#d97706', bg:'rgba(245,158,11,0.1)', border:'rgba(245,158,11,0.2)' }
    return { txt:'❌ Fill Meta Title & Description', color:'#dc2626', bg:'rgba(239,68,68,0.1)', border:'rgba(239,68,68,0.2)' }
  })()

  const css = `
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Space Grotesk',sans-serif;background:#f8f6f1;color:#0f0f0f;}
    a{text-decoration:none;color:inherit;}
    .btn{padding:8px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:inherit;transition:all 0.2s;}
    .btn-orange{background:#e85d26;color:#fff;} .btn-orange:hover{background:#ff7a3d;}
    .btn-gray{background:#f0ede6;color:#555;border:1px solid #e2ddd6;} .btn-gray:hover{background:#e2ddd6;}
    .btn-red{background:rgba(239,68,68,0.1);color:#dc2626;border:1px solid rgba(239,68,68,0.2);} .btn-red:hover{background:#dc2626;color:#fff;}
    .btn-blue{background:rgba(59,130,246,0.1);color:#2563eb;border:1px solid rgba(59,130,246,0.2);}
    input,select,textarea{width:100%;padding:10px 14px;border:1.5px solid #d0ccc6;border-radius:7px;font-family:inherit;font-size:14px;color:#0f0f0f;background:#f8f6f1;outline:none;}
    input:focus,select:focus,textarea:focus{border-color:#e85d26;background:#fff;}
    textarea{resize:vertical;}
    label{display:block;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#888;margin-bottom:5px;}
    .card{background:#fff;border:1px solid #e2ddd6;border-radius:12px;}
    .overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;}
    .modal{background:#fff;border-radius:16px;max-width:700px;width:100%;max-height:92vh;overflow-y:auto;}
    .tag-chip{display:inline-flex;align-items:center;gap:4px;background:rgba(232,93,38,0.1);border:1px solid rgba(232,93,38,0.2);color:#c44d1a;font-size:12px;padding:3px 10px;border-radius:20px;}
    .tag-chip button{background:none;border:none;cursor:pointer;color:#c44d1a;font-size:14px;line-height:1;}
    .tags-wrap{display:flex;flex-wrap:wrap;gap:6px;padding:8px;border:1.5px solid #d0ccc6;border-radius:7px;background:#f8f6f1;cursor:text;min-height:42px;align-items:center;}
    .tag-field{border:none;outline:none;background:transparent;font-family:inherit;font-size:13px;color:#0f0f0f;min-width:80px;}
    .upload-area{border:2px dashed #d0ccc6;border-radius:10px;padding:20px;text-align:center;cursor:pointer;background:#f8f6f1;transition:all 0.2s;}
    .upload-area:hover{border-color:#e85d26;background:rgba(232,93,38,0.04);}
    .spec-row{display:grid;grid-template-columns:1fr 32px;gap:8px;margin-bottom:8px;align-items:center;}
    .spec-row input{padding:8px 12px;}
    .del-btn{width:28px;height:28px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:6px;cursor:pointer;color:#dc2626;font-size:14px;display:flex;align-items:center;justify-content:center;}
    .add-btn{font-size:13px;color:#e85d26;background:none;border:none;cursor:pointer;font-weight:600;font-family:inherit;margin-top:4px;}
    .char-ok{color:#16a34a;} .char-warn{color:#d97706;} .char-over{color:#dc2626;}
    .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0f0f0f;color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;z-index:999;}
  `

  if (!loaded) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', fontFamily:'Space Grotesk,sans-serif', fontSize:16, color:'#888' }}>
      <div style={{ textAlign:'center' }}><div style={{ fontSize:40, marginBottom:12 }}>⚙️</div>Loading...</div>
    </div>
  )

  return (
    <>
      <style>{css}</style>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      {toast && <div className="toast">{toast}</div>}

      {/* HEADER */}
      <div style={{ background:'#fff', borderBottom:'1px solid #e2ddd6', padding:'0 28px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:36, height:36, background:'#e85d26', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <div style={{ fontWeight:700, fontSize:15 }}>Apna Shree — Admin Panel</div>
            <div style={{ fontSize:11, color:'#888' }}>Manage Products & Enquiries</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <Link href="/" style={{ fontSize:13, color:'#888' }}>← Website</Link>
          <button className="btn btn-gray" onClick={resetToDefault} style={{ fontSize:12 }}>♻️ Reset</button>
          <button onClick={() => { sessionStorage.removeItem('apnashree_admin_auth'); setAuthed(false) }}
            style={{ padding:'7px 14px', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer', background:'rgba(239,68,68,0.1)', color:'#dc2626', border:'1px solid rgba(239,68,68,0.2)', fontFamily:'inherit' }}>
            🔓 Logout
          </button>
          <div style={{ padding:'5px 12px', background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:6, fontSize:12, color:'#16a34a', fontWeight:600 }}>
            ✅ {totalSubs} Sub-Products
          </div>
        </div>
      </div>

      {/* TAB BAR */}
      <div style={{ background:'#fff', borderBottom:'1px solid #e2ddd6', padding:'0 28px', display:'flex', gap:4 }}>
        {[
          { id:'enquiries', label:'📬 Enquiries' },
          { id:'products',  label:'📦 Products' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ padding:'14px 20px', border:'none', background:'none', cursor:'pointer', fontSize:14, fontWeight:700, fontFamily:'inherit', color: activeTab===tab.id ? '#e85d26' : '#888', borderBottom: activeTab===tab.id ? '2px solid #e85d26' : '2px solid transparent', transition:'all 0.2s' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* BODY */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'28px 24px' }}>

        {/* ENQUIRIES TAB */}
        {activeTab === 'enquiries' && <EnquiriesPanel />}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <>
            <input placeholder="🔍 Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom:20, fontSize:14 }}/>

            <div style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:10, padding:'12px 16px', marginBottom:16, fontSize:13, color:'#166534' }}>
              ✅ <strong>Auto-Save ON</strong> — Images saved as base64, survive page refresh.
            </div>

            {filtered.map(product => {
              const productSubs = subs[product.slug] || []
              const isExpanded = expandedProd[product.slug] !== false
              return (
                <div key={product.slug} className="card" style={{ marginBottom:20, overflow:'hidden' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 20px', borderBottom: isExpanded ? '1px solid #e2ddd6' : 'none', cursor:'pointer' }} onClick={() => toggleExpand(product.slug)}>
                    <div style={{ width:52, height:52, borderRadius:8, overflow:'hidden', background:'#f0ede6', flexShrink:0 }}>
                      {product.mainImage ? <img src={product.mainImage} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => { e.target.style.display='none' }}/> : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>📦</div>}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:15 }}>{product.name}</div>
                      <div style={{ fontSize:12, color:'#888', marginTop:2 }}>{product.brand} · {product.category}</div>
                    </div>
                    <span style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', padding:'3px 8px', borderRadius:4, background: product.type==='main' ? '#e85d26' : '#0f0f0f', color:'#fff', letterSpacing:'0.08em' }}>
                      {product.type==='main' ? '🏆 Dealer' : '📦 Other'}
                    </span>
                    <span style={{ fontSize:12, color:'#888', minWidth:80, textAlign:'center' }}>{productSubs.length} sub-products</span>
                    <button className="btn btn-orange" onClick={e => { e.stopPropagation(); openAdd(product.slug) }} style={{ display:'flex', alignItems:'center', gap:6, whiteSpace:'nowrap' }}>
                      <span style={{ fontSize:16, lineHeight:1 }}>+</span> Add Sub-Product
                    </button>
                    <span style={{ fontSize:18, color:'#888', userSelect:'none' }}>{isExpanded ? '▲' : '▼'}</span>
                  </div>

                  {isExpanded && (
                    <div style={{ padding:'0 20px 12px' }}>
                      {productSubs.length === 0 ? (
                        <div style={{ padding:'24px 0', textAlign:'center', color:'#888', fontSize:13 }}>
                          No sub-products yet. Click <strong style={{ color:'#e85d26' }}>+ Add Sub-Product</strong> above.
                        </div>
                      ) : productSubs.map((sub, idx) => (
                        <div key={sub.slug||idx} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid #f0ede6' }}>
                          <div style={{ width:56, height:56, borderRadius:8, overflow:'hidden', background:'#f0ede6', flexShrink:0, border:'1px solid #e2ddd6' }}>
                            {sub.image ? <img src={sub.image} alt={sub.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => { e.target.style.display='none' }}/> : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>🖼️</div>}
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontWeight:600, fontSize:14 }}>{sub.name}</div>
                            <div style={{ fontSize:12, color:'#888', marginTop:2 }}>{sub.brand}{sub.tags?.length > 0 && ` · ${sub.tags.slice(0,3).join(', ')}`}</div>
                            {sub.image && <div style={{ fontSize:11, color:'#16a34a', marginTop:2 }}>{sub.image.startsWith('data:') ? '🖼️ Image uploaded' : '🔗 Image linked'}</div>}
                          </div>
                          <div style={{ fontSize:12, fontWeight:600, minWidth:90, textAlign:'center', color: sub.metaTitle ? '#16a34a' : '#d97706' }}>
                            {sub.metaTitle ? '✅ SEO set' : '⚠️ No SEO'}
                          </div>
                          <div style={{ display:'flex', gap:8 }}>
                            {sub.slug && <Link href={`/products/${product.slug}/${sub.slug}`} target="_blank" className="btn btn-gray" style={{ fontSize:12, padding:'6px 12px' }}>👁 View</Link>}
                            <button className="btn btn-blue" style={{ fontSize:12 }} onClick={() => openEdit(product.slug, idx)}>✏️ Edit</button>
                            <button className="btn btn-red" style={{ fontSize:12 }} onClick={() => setDelConfirm({ parentSlug:product.slug, subIndex:idx, name:sub.name })}>🗑 Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </>
        )}
      </div>

      {/* DELETE CONFIRM */}
      {delConfirm && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setDelConfirm(null)}>
          <div className="modal" style={{ maxWidth:400, padding:28 }}>
            <div style={{ fontSize:36, marginBottom:16, textAlign:'center' }}>🗑️</div>
            <h3 style={{ fontSize:18, fontWeight:700, marginBottom:10, textAlign:'center' }}>Delete Sub-Product?</h3>
            <p style={{ fontSize:14, color:'#555', textAlign:'center', marginBottom:24 }}>Delete <strong>{delConfirm.name}</strong>? This cannot be undone.</p>
            <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
              <button className="btn btn-gray" onClick={() => setDelConfirm(null)}>Cancel</button>
              <button className="btn btn-red" onClick={doDelete} style={{ padding:'10px 24px' }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {modal && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && closeModal()}>
          <div className="modal">
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 22px', borderBottom:'1px solid #e2ddd6', position:'sticky', top:0, background:'#fff', zIndex:5 }}>
              <div>
                <div style={{ fontWeight:700, fontSize:17 }}>{modal.mode==='add' ? '➕ Add New Sub-Product' : '✏️ Edit Sub-Product'}</div>
                <div style={{ fontSize:12, color:'#888', marginTop:2 }}>{allProds.find(p => p.slug===modal.parentSlug)?.name}</div>
              </div>
              <button onClick={closeModal} style={{ width:32, height:32, background:'#f0ede6', border:'none', borderRadius:'50%', cursor:'pointer', fontSize:16 }}>✕</button>
            </div>

            {saved ? (
              <div style={{ textAlign:'center', padding:'48px 24px' }}>
                <div style={{ fontSize:56, marginBottom:12 }}>✅</div>
                <h3 style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>{modal.mode==='add' ? 'Sub-Product Added!' : 'Changes Saved!'}</h3>
                <p style={{ fontSize:14, color:'#888', marginBottom:24 }}>Saved to browser. Images will show on website.</p>
                <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
                  <button className="btn btn-orange" onClick={closeModal}>Done</button>
                  {modal.mode==='add' && <button className="btn btn-gray" onClick={() => { setSaved(false); const p=allProds.find(p=>p.slug===modal.parentSlug); setForm({...EMPTY, brand:p?.brand?.split('/')[0].trim()||''}); setTagInput(''); setKwInput('') }}>Add Another</button>}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div style={{ padding:22, display:'flex', flexDirection:'column', gap:16 }}>
                  <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#888' }}>📋 Basic Information</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    <div><label>Product Name *</label><input placeholder="e.g. Motorised Lubrication" value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} required/></div>
                    <div><label>Brand *</label><input placeholder="e.g. CENLUB" value={form.brand} onChange={e => setForm(f => ({...f, brand:e.target.value}))} required/></div>
                  </div>
                  <div><label>Short Description *</label><input placeholder="One-line summary" value={form.heroDesc} onChange={e => setForm(f => ({...f, heroDesc:e.target.value}))} required/></div>
                  <div><label>Full Description *</label><textarea style={{ height:90 }} placeholder="Detailed description..." value={form.description} onChange={e => setForm(f => ({...f, description:e.target.value}))} required/></div>

                  <div style={{ height:1, background:'#e2ddd6' }}/>
                  <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#888' }}>🖼️ Images <span style={{ fontWeight:400, textTransform:'none', color:'#e85d26' }}>(Max 3MB · Compress at squoosh.app)</span></div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    {[['image','Main Image (800×600px)', imgRef],['sheetImage','Sheet Image (800×500px)', sheetRef]].map(([field, lbl, ref]) => (
                      <div key={field}>
                        <label>{lbl}</label>
                        <div className="upload-area" onClick={() => ref.current?.click()}>
                          <input ref={ref} type="file" accept="image/*" style={{ display:'none' }} onChange={e => handleImg(e, field)}/>
                          {form[field] ? <img src={form[field]} alt="" style={{ width:'100%', height:140, objectFit:'cover', borderRadius:8, display:'block' }}/> : <><div style={{ fontSize:28, marginBottom:6 }}>📤</div><div style={{ fontSize:13, color:'#888' }}>Click to upload</div></>}
                        </div>
                        {form[field] && <button type="button" style={{ marginTop:4, fontSize:12, color:'#888', background:'none', border:'none', cursor:'pointer' }} onClick={() => setForm(f => ({...f, [field]:''}))}>✕ Remove</button>}
                      </div>
                    ))}
                  </div>

                  <div style={{ height:1, background:'#e2ddd6' }}/>
                  <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#888' }}>🖼️ Product Gallery <span style={{ fontWeight:400, textTransform:'none', color:'#e85d26' }}>(front image + up to 6 more · shown together on the product page)</span></div>
                  <div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:12, alignItems:'flex-start' }}>
                      {form.image && (
                        <div style={{ position:'relative', width:112, height:112 }}>
                          <img src={form.image} alt="" style={{ width:112, height:112, objectFit:'cover', borderRadius:10, border:'2.5px solid #e85d26', display:'block' }}/>
                          <span style={{ position:'absolute', bottom:5, left:5, fontSize:9, fontWeight:700, background:'#e85d26', color:'#fff', padding:'2px 7px', borderRadius:5, letterSpacing:'0.05em' }}>FRONT</span>
                        </div>
                      )}
                      {(form.images||[]).map((url, i) => (
                        <div key={i} style={{ position:'relative', width:112, height:112 }}>
                          <img src={url} alt="" style={{ width:112, height:112, objectFit:'cover', borderRadius:10, border:'1px solid #e2ddd6', display:'block' }}/>
                          <button type="button" title="Remove" onClick={() => removeGalleryImage(i)}
                            style={{ position:'absolute', top:-8, right:-8, width:24, height:24, borderRadius:'50%', border:'2px solid #fff', background:'#e85d26', color:'#fff', fontSize:13, lineHeight:'20px', padding:0, cursor:'pointer', boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }}>✕</button>
                          {!form.image && i===0 && <span style={{ position:'absolute', bottom:5, left:5, fontSize:9, fontWeight:700, background:'#e85d26', color:'#fff', padding:'2px 7px', borderRadius:5, letterSpacing:'0.05em' }}>FRONT</span>}
                        </div>
                      ))}
                      {(form.images||[]).length < 6 && (
                        <div className="upload-area" onClick={() => !uploading && galleryRef.current?.click()}
                          style={{ width:112, height:112, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor: uploading?'wait':'pointer', borderRadius:10 }}>
                          <input ref={galleryRef} type="file" accept="image/*" multiple style={{ display:'none' }} onChange={uploadGalleryImages}/>
                          {uploading ? <div style={{ fontSize:12, color:'#888' }}>Uploading…</div> : <><div style={{ fontSize:26, color:'#e85d26' }}>＋</div><div style={{ fontSize:11, color:'#888' }}>Add image</div></>}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize:12, color:'#666', marginTop:8, lineHeight:1.5 }}>The <b style={{ color:'#e85d26' }}>FRONT</b> image shows first and biggest on the product page; the rest appear as clickable thumbnails below it. Your “Main Image” above is the front image — to change it, upload a new Main Image. {(form.images||[]).length}/6 gallery images added.</div>
                  </div>

                  <div style={{ height:1, background:'#e2ddd6' }}/>
                  <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#888' }}>📐 Specifications</div>
                  {form.specifications.map((spec, i) => (
                    <div key={i} className="spec-row">
                      <input placeholder="e.g. Motor voltage: 24V DC" value={spec} onChange={e => { const s=[...form.specifications]; s[i]=e.target.value; setForm(f => ({...f, specifications:s})) }}/>
                      <button type="button" className="del-btn" onClick={() => setForm(f => ({...f, specifications:f.specifications.filter((_,x) => x!==i)}))}>✕</button>
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={() => setForm(f => ({...f, specifications:[...f.specifications,'']}))}>+ Add Specification</button>

                  <div style={{ height:1, background:'#e2ddd6' }}/>
                  <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#888' }}>🏭 Applications</div>
                  {form.applications.map((app, i) => (
                    <div key={i} className="spec-row">
                      <input placeholder="e.g. CNC machining centers" value={app} onChange={e => { const a=[...form.applications]; a[i]=e.target.value; setForm(f => ({...f, applications:a})) }}/>
                      <button type="button" className="del-btn" onClick={() => setForm(f => ({...f, applications:f.applications.filter((_,x) => x!==i)}))}>✕</button>
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={() => setForm(f => ({...f, applications:[...f.applications,'']}))}>+ Add Application</button>

                  <div style={{ height:1, background:'#e2ddd6' }}/>
                  <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#888' }}>🏷️ Tags (Enter to add)</div>
                  <div className="tags-wrap" onClick={() => document.getElementById('tag-f')?.focus()}>
                    {form.tags.map(t => <span key={t} className="tag-chip">{t}<button type="button" onClick={() => setForm(f => ({...f, tags:f.tags.filter(x => x!==t)}))}>✕</button></span>)}
                    <input id="tag-f" className="tag-field" placeholder={form.tags.length ? 'More...' : 'e.g. Automatic, CNC, 24V'} value={tagInput} onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => { if ((e.key==='Enter'||e.key===',') && tagInput.trim()) { e.preventDefault(); const t=tagInput.trim().replace(/,$/,''); if (t&&!form.tags.includes(t)) setForm(f => ({...f, tags:[...f.tags,t]})); setTagInput('') }}}/>
                  </div>

                  <div style={{ height:1, background:'#e2ddd6' }}/>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#888' }}>🔍 SEO Settings</div>
                    <button type="button" className="btn btn-blue" style={{ fontSize:12 }} onClick={autoSEO}>✨ Auto-Fill SEO</button>
                  </div>
                  <div>
                    <label>Meta Title * (50–60 chars)</label>
                    <input placeholder="e.g. CENLUB Motorised Lubrication Chennai | Apna Shree" value={form.metaTitle} onChange={e => setForm(f => ({...f, metaTitle:e.target.value}))} required/>
                    <div style={{ fontSize:11, textAlign:'right', marginTop:3 }} className={form.metaTitle.length<50?'char-warn':form.metaTitle.length<=60?'char-ok':'char-over'}>
                      {form.metaTitle.length}/60 {form.metaTitle.length<50?'(too short)':form.metaTitle.length<=60?'✅ Perfect':'⚠️ Too long'}
                    </div>
                  </div>
                  <div>
                    <label>Meta Description * (140–160 chars)</label>
                    <textarea style={{ height:80 }} placeholder="e.g. Buy CENLUB motorised lubrication systems in Chennai..." value={form.metaDescription} onChange={e => setForm(f => ({...f, metaDescription:e.target.value}))} required/>
                    <div style={{ fontSize:11, textAlign:'right', marginTop:3 }} className={form.metaDescription.length<140?'char-warn':form.metaDescription.length<=160?'char-ok':'char-over'}>
                      {form.metaDescription.length}/160 {form.metaDescription.length<140?'(too short)':form.metaDescription.length<=160?'✅ Perfect':'⚠️ Too long'}
                    </div>
                  </div>
                  {(form.metaTitle||form.metaDescription) && (
                    <div style={{ padding:'10px 14px', borderRadius:8, fontSize:13, fontWeight:600, background:seoScore.bg, border:`1px solid ${seoScore.border}`, color:seoScore.color }}>{seoScore.txt}</div>
                  )}
                </div>

                <div style={{ padding:'14px 22px', borderTop:'1px solid #e2ddd6', display:'flex', gap:10, justifyContent:'flex-end', position:'sticky', bottom:0, background:'#fff' }}>
                  <button type="button" className="btn btn-gray" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-orange" disabled={saving} style={{ padding:'10px 24px', fontSize:14 }}>
                    {saving ? '⏳ Saving...' : modal.mode==='add' ? '✅ Add Sub-Product' : '✅ Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}