import Link from 'next/link'
import { mainProducts, otherProducts } from '@/data/products'

const WA = () => <svg width="26" height="26" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
const CALL = () => <svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>

export default function Footer() {
  return (
    <>
      <section className="cta-section">
        <div className="container">
          <span className="label">Get Started</span>
          <h2>READY TO WORK<br />TOGETHER?</h2>
          <p>Send us your requirement and we'll get back with the best price within 2 hours. No spam — just engineering expertise.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-primary">📋 Send Enquiry</Link>
            <a href="https://wa.me/917358376280?text=Hi Apna Shree, I need a quote." className="btn-wa" target="_blank" rel="noopener noreferrer"><WA /> WhatsApp Us</a>
            <a href="tel:+917358376280" className="btn-ghost">📞 +91 73583 76280</a>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, background: '#e85d26', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                </div>
                <span style={{ fontFamily: 'Space Grotesk,sans-serif', fontWeight: 800, fontSize: 17, color: '#ffffff' }}>Apna Shree</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 12 }}>Authorized B2B industrial engineering products dealer in Chennai. Trusted by 500+ manufacturing clients across Tamil Nadu and India for 35+ years.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[['tel:+917358376280', '📞 +91 73583 76280'], ['tel:+917358376275', '📞 +91 73583 76275'], ['mailto:jeevandos@gmail.com', '✉ jeevandos@gmail.com']].map(([href, val]) => (
                  <a key={href} href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{val}</a>
                ))}
              </div>
            </div>
            <div className="footer-col">
              <h4>🏆 Dealership Products</h4>
              <ul>
                {mainProducts.map(p => (
                  <li key={p.slug}><Link href={`/products/${p.slug}`}>{p.name}<small>{p.brand}</small></Link></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Other Products</h4>
              <ul>
                {otherProducts.map(p => (
                  <li key={p.slug}><Link href={`/products/${p.slug}`}>{p.name}<small>{p.brand}</small></Link></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="tel:+917358376280">📞 Call Now</a></li>
                <li><a href="https://wa.me/917358376280" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a></li>
                <li><a href="mailto:jeevandos@gmail.com">✉ Email Us</a></li>
                <li><Link href="/contact">📋 Send Enquiry</Link></li>
                <li><Link href="/products">📦 All Products</Link></li>
                <li><Link href="/about">🏢 About Us</Link></li>
                <li><Link href="/admin">⚙️ Admin Panel</Link></li>
                <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">🗺️ Sitemap</a></li>
              </ul>
              <div style={{ marginTop: 20, padding: 16, background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: 10 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e85d26', marginBottom: 6 }}>Business Hours</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Mon–Sat: 9:00 AM – 6:00 PM</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Chennai, Tamil Nadu, India</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 Apna Shree. All rights reserved. | Chennai, Tamil Nadu</span>
            <span>Authorized: CENLUB | INTORQ | PETHE | BONFIGLIOLI | PMI | HIWIN</span>
          </div>
        </div>
      </footer>
      <a href="https://wa.me/917358376280?text=Hi Apna Shree, I need a quote." className="float-wa" target="_blank" rel="noopener noreferrer"><WA /></a>
      <a href="tel:+917358376280" className="float-call"><CALL /></a>
    </>
  )
}