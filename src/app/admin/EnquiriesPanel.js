'use client'
import { useState, useEffect } from 'react'

const KEY = 'apnashree_enquiries'

const STATUS_COLORS = {
  new:       { bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.25)',   text: '#dc2626',  label: '🔴 New' },
  contacted: { bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)',  text: '#d97706',  label: '🟡 Contacted' },
  closed:    { bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.25)',   text: '#16a34a',  label: '🟢 Closed' },
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true })
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  const hrs = Math.floor(mins / 60)
  const days = Math.floor(hrs / 24)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  if (hrs < 24) return `${hrs}h ago`
  return `${days}d ago`
}

export default function EnquiriesPanel() {
  const [enquiries, setEnquiries] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    load()
    const iv = setInterval(load, 30000) // auto-refresh every 30s
    return () => clearInterval(iv)
  }, [])

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || '[]')
      setEnquiries(data)
    } catch(e) {}
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data))
    setEnquiries(data)
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function toggleContacted(id) {
    const updated = enquiries.map(e => {
      if (e.id !== id) return e
      const wasContacted = e.contacted
      return { ...e, contacted: !wasContacted, status: !wasContacted ? 'contacted' : 'new' }
    })
    save(updated)
    showToast('✅ Status updated!')
  }

  function setStatus(id, status) {
    const updated = enquiries.map(e => e.id !== id ? e : { ...e, status, contacted: status !== 'new' })
    save(updated)
    if (selected?.id === id) setSelected(updated.find(e => e.id === id))
    showToast('✅ Status updated!')
  }

  function deleteEnquiry(id) {
    if (!confirm('Delete this enquiry?')) return
    const updated = enquiries.filter(e => e.id !== id)
    save(updated)
    if (selected?.id === id) setSelected(null)
    showToast('🗑️ Deleted')
  }

  function addTestEnquiry() {
    const test = {
      id: Date.now().toString(),
      name: 'Test Customer',
      phone: '+91 98765 43210',
      company: 'ABC Industries',
      product: 'Lubrication Systems (CENLUB)',
      city: 'Chennai',
      message: 'Need 5 units of motorised lubrication system for CNC machines. Please quote.',
      date: new Date().toISOString(),
      contacted: false,
      status: 'new'
    }
    const updated = [test, ...enquiries]
    save(updated)
    showToast('✅ Test enquiry added!')
  }

  const filtered = enquiries.filter(e => {
    const matchFilter = filter === 'all' || e.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q || e.name?.toLowerCase().includes(q) || e.phone?.includes(q) || e.product?.toLowerCase().includes(q) || e.company?.toLowerCase().includes(q)
    return matchFilter && matchSearch
  })

  const counts = { all: enquiries.length, new: enquiries.filter(e => e.status === 'new').length, contacted: enquiries.filter(e => e.status === 'contacted').length, closed: enquiries.filter(e => e.status === 'closed').length }

  return (
    <div style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      {/* TOAST */}
      {toast && (
        <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', background:'#0f0f0f', color:'#fff', padding:'12px 24px', borderRadius:8, fontSize:14, fontWeight:600, zIndex:999 }}>
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:700, color:'#0f0f0f', margin:0 }}>📬 Enquiries Inbox</h2>
          <p style={{ fontSize:13, color:'#888', marginTop:4 }}>{counts.new > 0 ? `🔴 ${counts.new} new enquir${counts.new===1?'y':'ies'} waiting` : '✅ All enquiries handled'}</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={load} style={{ padding:'8px 16px', borderRadius:6, border:'1px solid #e2ddd6', background:'#f0ede6', cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'inherit' }}>
            🔄 Refresh
          </button>
          <button onClick={addTestEnquiry} style={{ padding:'8px 16px', borderRadius:6, border:'1px solid rgba(59,130,246,0.3)', background:'rgba(59,130,246,0.08)', cursor:'pointer', fontSize:13, fontWeight:600, color:'#2563eb', fontFamily:'inherit' }}>
            + Test Enquiry
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
        {[
          { label:'Total', count:counts.all, icon:'📋', color:'#0a1628', bg:'rgba(10,22,40,0.08)' },
          { label:'New', count:counts.new, icon:'🔴', color:'#dc2626', bg:'rgba(239,68,68,0.08)' },
          { label:'Contacted', count:counts.contacted, icon:'🟡', color:'#d97706', bg:'rgba(245,158,11,0.08)' },
          { label:'Closed', count:counts.closed, icon:'🟢', color:'#16a34a', bg:'rgba(34,197,94,0.08)' },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, border:`1px solid ${s.bg.replace('0.08','0.2')}`, borderRadius:10, padding:'14px 16px', cursor:'pointer' }} onClick={() => setFilter(s.label.toLowerCase())}>
            <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.count}</div>
            <div style={{ fontSize:11, fontWeight:700, color:s.color, textTransform:'uppercase', letterSpacing:'0.08em', marginTop:2 }}>{s.icon} {s.label}</div>
          </div>
        ))}
      </div>

      {/* FILTER + SEARCH */}
      <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap', alignItems:'center' }}>
        <div style={{ display:'flex', gap:6 }}>
          {['all','new','contacted','closed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding:'6px 14px', borderRadius:6, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit', textTransform:'capitalize', border: filter===f ? 'none' : '1px solid #e2ddd6', background: filter===f ? '#e85d26' : '#f0ede6', color: filter===f ? '#fff' : '#555' }}>
              {f} {f !== 'all' ? `(${counts[f]})` : `(${counts.all})`}
            </button>
          ))}
        </div>
        <input placeholder="🔍 Search name, phone, product..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex:1, minWidth:200, padding:'8px 14px', border:'1.5px solid #e2ddd6', borderRadius:7, fontSize:13, fontFamily:'inherit', outline:'none', background:'#f8f6f1' }} />
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:'60px 20px', color:'#888' }}>
          <div style={{ fontSize:48, marginBottom:12 }}>📭</div>
          <h3 style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>No enquiries yet</h3>
          <p style={{ fontSize:14 }}>When customers fill the form on your website, they'll appear here.</p>
          <button onClick={addTestEnquiry} style={{ marginTop:16, padding:'10px 24px', background:'#e85d26', color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:14, fontWeight:600, fontFamily:'inherit' }}>
            + Add Test Enquiry
          </button>
        </div>
      )}

      {/* TWO PANEL LAYOUT */}
      {filtered.length > 0 && (
        <div style={{ display:'grid', gridTemplateColumns: selected ? '1fr 1.2fr' : '1fr', gap:16 }}>

          {/* LIST */}
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {filtered.map(enq => {
              const sc = STATUS_COLORS[enq.status] || STATUS_COLORS.new
              const isSelected = selected?.id === enq.id
              return (
                <div key={enq.id}
                  onClick={() => setSelected(isSelected ? null : enq)}
                  style={{ background: isSelected ? '#fff' : '#fff', border:`2px solid ${isSelected ? '#e85d26' : '#e2ddd6'}`, borderRadius:12, padding:'16px 18px', cursor:'pointer', transition:'all 0.15s', boxShadow: isSelected ? '0 4px 16px rgba(232,93,38,0.15)' : '0 1px 4px rgba(0,0,0,0.04)' }}>

                  <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                    {/* CHECKBOX */}
                    <div onClick={ev => { ev.stopPropagation(); toggleContacted(enq.id) }}
                      style={{ width:22, height:22, borderRadius:6, border:`2px solid ${enq.contacted ? '#16a34a' : '#d0ccc6'}`, background: enq.contacted ? '#16a34a' : '#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2, cursor:'pointer', transition:'all 0.2s' }}>
                      {enq.contacted && <span style={{ color:'#fff', fontSize:13, lineHeight:1 }}>✓</span>}
                    </div>

                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4, flexWrap:'wrap' }}>
                        <span style={{ fontWeight:700, fontSize:15, color:'#0f0f0f' }}>{enq.name}</span>
                        <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:20, background:sc.bg, border:`1px solid ${sc.border}`, color:sc.text }}>{sc.label}</span>
                        {enq.status === 'new' && <span style={{ fontSize:10, background:'#e85d26', color:'#fff', padding:'1px 6px', borderRadius:4, fontWeight:700 }}>NEW</span>}
                      </div>
                      <div style={{ fontSize:13, color:'#555', marginBottom:4 }}>
                        📞 {enq.phone} {enq.company && `· 🏢 ${enq.company}`}
                      </div>
                      <div style={{ fontSize:12, color:'#e85d26', fontWeight:600, marginBottom:6 }}>
                        📦 {enq.product}
                      </div>
                      <div style={{ fontSize:12, color:'#888', display:'flex', justifyContent:'space-between' }}>
                        <span>🕐 {timeAgo(enq.date)}</span>
                        <span>{enq.city && `📍 ${enq.city}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* DETAIL PANEL */}
          {selected && (() => {
            const sc = STATUS_COLORS[selected.status] || STATUS_COLORS.new
            return (
              <div style={{ background:'#fff', border:'1px solid #e2ddd6', borderRadius:14, padding:24, position:'sticky', top:80, alignSelf:'start', boxShadow:'0 4px 24px rgba(0,0,0,0.08)' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
                  <h3 style={{ fontSize:18, fontWeight:700, color:'#0f0f0f', margin:0 }}>Enquiry Details</h3>
                  <button onClick={() => setSelected(null)} style={{ width:30, height:30, borderRadius:'50%', border:'none', background:'#f0ede6', cursor:'pointer', fontSize:16 }}>✕</button>
                </div>

                {/* STATUS BUTTONS */}
                <div style={{ display:'flex', gap:8, marginBottom:20 }}>
                  {['new','contacted','closed'].map(s => {
                    const c = STATUS_COLORS[s]
                    return (
                      <button key={s} onClick={() => setStatus(selected.id, s)}
                        style={{ flex:1, padding:'8px 4px', borderRadius:6, border:`1.5px solid ${selected.status===s ? c.border : '#e2ddd6'}`, background: selected.status===s ? c.bg : 'transparent', color: selected.status===s ? c.text : '#888', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit', textTransform:'capitalize', transition:'all 0.2s' }}>
                        {c.label}
                      </button>
                    )
                  })}
                </div>

                {/* CONTACTED CHECKBOX */}
                <div onClick={() => toggleContacted(selected.id)}
                  style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', background: selected.contacted ? 'rgba(34,197,94,0.08)' : '#f8f6f1', borderRadius:8, cursor:'pointer', marginBottom:20, border:`1.5px solid ${selected.contacted ? 'rgba(34,197,94,0.25)' : '#e2ddd6'}` }}>
                  <div style={{ width:24, height:24, borderRadius:6, border:`2px solid ${selected.contacted ? '#16a34a' : '#d0ccc6'}`, background: selected.contacted ? '#16a34a' : '#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {selected.contacted && <span style={{ color:'#fff', fontSize:14 }}>✓</span>}
                  </div>
                  <span style={{ fontWeight:600, fontSize:14, color: selected.contacted ? '#16a34a' : '#555' }}>
                    {selected.contacted ? '✅ Customer Contacted' : 'Mark as Contacted'}
                  </span>
                </div>

                {/* DETAILS */}
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {[
                    { icon:'👤', label:'Name', val: selected.name },
                    { icon:'📞', label:'Phone', val: selected.phone, link:`tel:${selected.phone?.replace(/\s/g,'')}` },
                    { icon:'🏢', label:'Company', val: selected.company || '—' },
                    { icon:'📦', label:'Product', val: selected.product },
                    { icon:'📍', label:'City', val: selected.city || '—' },
                    { icon:'🕐', label:'Date', val: formatDate(selected.date) },
                  ].map(item => (
                    <div key={item.label} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                      <span style={{ fontSize:16, width:24, flexShrink:0 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#aaa', marginBottom:2 }}>{item.label}</div>
                        {item.link
                          ? <a href={item.link} style={{ fontSize:14, fontWeight:600, color:'#e85d26', textDecoration:'none' }}>{item.val}</a>
                          : <div style={{ fontSize:14, fontWeight:600, color:'#0f0f0f' }}>{item.val}</div>
                        }
                      </div>
                    </div>
                  ))}

                  {/* MESSAGE */}
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#aaa', marginBottom:6 }}>📝 Requirement</div>
                    <div style={{ fontSize:14, color:'#333', lineHeight:1.6, background:'#f8f6f1', padding:'12px 14px', borderRadius:8, border:'1px solid #e2ddd6' }}>
                      {selected.message}
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div style={{ display:'flex', gap:10, marginTop:20 }}>
                  <a href={`tel:${selected.phone?.replace(/\s/g,'')}`}
                    style={{ flex:1, padding:'11px', background:'#0a1628', color:'#fff', borderRadius:8, textAlign:'center', textDecoration:'none', fontSize:13, fontWeight:700 }}>
                    📞 Call Now
                  </a>
                  <a href={`https://wa.me/${selected.phone?.replace(/[\s\+\-]/g,'')}?text=Hi ${selected.name}, This is Apna Shree regarding your enquiry for ${selected.product}.`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ flex:1, padding:'11px', background:'#25d366', color:'#fff', borderRadius:8, textAlign:'center', textDecoration:'none', fontSize:13, fontWeight:700 }}>
                    💬 WhatsApp
                  </a>
                </div>
                <button onClick={() => deleteEnquiry(selected.id)}
                  style={{ width:'100%', marginTop:10, padding:'9px', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:8, color:'#dc2626', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                  🗑️ Delete Enquiry
                </button>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
