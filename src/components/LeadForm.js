'use client'
import { useState } from 'react'

const PRODUCTS = ['Lubrication Systems (CENLUB)','Turcite Slydway Liner (ROLLON)','EM Brakes DC (INTORQ)','EM Brakes AC (PETHE)','Gear Boxes','Ball Screws & LM Systems (PMI/HIWIN)','Encoder Couplings','Oil Skimmers (RAJAMANE)','Coolant Pumps (CENTURY)','GROZ Tools & Fluid Pumps','Nippon Oil Pumps','Torque Limiters (NUTECK)','Shock Absorbers (ADONITECH)','Rotary Unions (DEUBLIN/MICRO)','Machine Spares (HMT/KIRLOSKAR/BFW)','Clutch Plates (DEEKAY/IPE)','Hydraulic Products','Pneumatics (JANATICS)','Industrial Greases','Special & Chemical Pumps','Timing Pulleys & Sprockets','Telescopic Covers & Bellows','Other / Multiple']

// ✅ Web3Forms Key connected
const WEB3FORMS_KEY = 'cf71012b-28c7-406e-bd10-d9d841c1a0e8'

const ENQUIRIES_KEY = 'apnashree_enquiries'

function saveEnquiry(data) {
  try {
    const existing = JSON.parse(localStorage.getItem(ENQUIRIES_KEY) || '[]')
    existing.unshift({ id: Date.now().toString(), ...data, date: new Date().toISOString(), contacted: false, status: 'new' })
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(existing))
  } catch(e) {}
}

export default function LeadForm({ compact = false, preselect = '' }) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name:'', phone:'', company:'', product: preselect||'', city:'', message:'' })

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  async function handle(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Save to admin panel inbox
    saveEnquiry(form)

    // Send email to jeevandos@gmail.com via Web3Forms
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `🔔 New Enquiry: ${form.name} — ${form.product}`,
          from_name: 'Apna Shree Website',
          name: form.name,
          phone: form.phone,
          company: form.company || 'Not provided',
          product: form.product,
          city: form.city || 'Not provided',
          message: form.message,
          botcheck: '',
        })
      })
      const result = await res.json()
      if (!result.success) {
        console.error('Web3Forms:', result)
      }
    } catch(err) {
      console.error('Email error:', err)
    }

    setLoading(false)
    setSent(true)
  }

  if (sent) return (
    <div className="form-success">
      <div style={{ fontSize: 48 }}>✅</div>
      <h4>Enquiry Sent!</h4>
      <p>Our team will call you back within 2 hours.</p>
      <p style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>Mon–Sat 9AM–6PM · {form.phone}</p>
    </div>
  )

  return (
    <form onSubmit={handle}>
      <div className="form-row">
        <div className="form-group">
          <label>Name *</label>
          <input type="text" name="name" placeholder="Your name" value={form.name} onChange={change} required />
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={change} required />
        </div>
      </div>
      {!compact && (
        <div className="form-group">
          <label>Company</label>
          <input type="text" name="company" placeholder="Company name" value={form.company} onChange={change} />
        </div>
      )}
      <div className="form-group">
        <label>Product / Brand *</label>
        <select name="product" required value={form.product} onChange={change}>
          <option value="">Select product</option>
          {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      {!compact && (
        <div className="form-group">
          <label>City in Tamil Nadu</label>
          <input type="text" name="city" placeholder="Chennai / Coimbatore / Salem..." value={form.city} onChange={change} />
        </div>
      )}
      <div className="form-group">
        <label>Your Requirement *</label>
        <textarea name="message" placeholder="Brand, model, quantity, specifications..." value={form.message} onChange={change} required />
      </div>
      {error && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 10 }}>⚠️ {error}</p>}
      <button type="submit" className="form-submit" disabled={loading}>
        {loading ? '⏳ Sending...' : '📩 Get Best Price Now'}
      </button>
      <p className="form-note">🔒 We respond within 2 hours. Your details are safe.</p>
    </form>
  )
}