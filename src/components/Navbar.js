'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'

const WA = () => <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const links = [['/', 'Home'], ['/products', 'Products'], ['/about', 'About'], ['/contact', 'Contact']]

  return (
    <>
      <div className="topbar">
        <div className="inner">
          <span>📍 Chennai, Tamil Nadu | Authorized Dealer Since 1990</span>
          <div className="topbar-links">
            <a href="tel:+917358376280">📞 +91 73583 76280</a>
            <a href="tel:+917358376275">📞 +91 73583 76275</a>
            <a href="mailto:jeevandos@gmail.com">✉ jeevandos@gmail.com</a>
          </div>
        </div>
      </div>
      <nav className="navbar">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="Apna Shree Logo"
              style={{ height: 52, width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </Link>
          <div className="nav-links">
            {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          </div>
          <div className="nav-right">
            <button className={`theme-toggle ${dark ? 'active' : ''}`} onClick={toggle} aria-label="Toggle theme">
              <div className="theme-toggle-thumb">{dark ? '🌙' : '☀️'}</div>
            </button>
            <div className="nav-phone"><small>Call us now</small>+91 73583 76280</div>
            <Link href="/contact" className="btn-primary" style={{ padding: '10px 18px', fontSize: '13px' }}>Get Best Price →</Link>
            <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: 24, height: 2, background: 'var(--text)', borderRadius: 2, display: 'block' }} />)}
            </button>
          </div>
        </div>
      </nav>
      {open && (
        <div style={{ position: 'fixed', top: 105, left: 0, right: 0, bottom: 0, background: 'var(--bg)', zIndex: 99, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid var(--border)' }}>
          {links.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{ padding: '14px 16px', fontSize: '16px', fontWeight: '600', borderRadius: '8px', borderBottom: '1px solid var(--border)', color: 'var(--text)', display: 'block' }}>{label}</Link>
          ))}
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="tel:+917358376280" className="btn-primary" style={{ justifyContent: 'center' }}>📞 +91 73583 76280</a>
            <a href="https://wa.me/917358376280?text=Hi Apna Shree, I need a quote." className="btn-wa" style={{ justifyContent: 'center' }} target="_blank" rel="noopener noreferrer"><WA /> WhatsApp Now</a>
            <button className={`theme-toggle ${dark ? 'active' : ''}`} onClick={toggle} style={{ width: '100%', height: 48, borderRadius: 8, fontSize: 14, fontWeight: 600, color: 'var(--text)', background: 'var(--bg3)' }}>
              {dark ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
