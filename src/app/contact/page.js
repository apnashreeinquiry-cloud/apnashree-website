import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeadForm from '@/components/LeadForm'
export const metadata = { title: 'Contact Apna Shree | Get Best Price | Industrial Dealer Chennai', description: 'Contact Apna Shree for industrial component enquiries. Best price within 2 hours. Call +91 73583 76280 or WhatsApp. Chennai, Tamil Nadu.', alternates: { canonical: 'https://apnashree.com/contact' } }
const faqs = [
  { q: 'HOW FAST DO YOU RESPOND?', a: 'Within 2 hours during Mon–Sat 9AM–6PM. For urgent needs, WhatsApp us directly.' },
  { q: 'DO YOU SHIP OUTSIDE CHENNAI?', a: 'Yes — pan-India shipping. Courier reaches most cities in 2–5 business days.' },
  { q: 'CAN YOU SOURCE UNLISTED PRODUCTS?', a: 'Yes! Tell us your requirement and we\'ll source it from our network.' },
  { q: 'DO YOU BUY SURPLUS EQUIPMENT?', a: 'Yes! We buy good-condition used industrial equipment. WhatsApp us photos.' },
  { q: 'CAN YOU MANUFACTURE CUSTOM PARTS?', a: 'Yes — as per customer drawing or sample. Contact us for a quote.' },
  { q: 'DO YOU SELL TO INDIVIDUALS?', a: 'We serve B2B clients primarily but also serve individuals for genuine part replacements.' },
]
export default function ContactPage() {
  return (
    <>
      <Navbar />
      <section style={{ padding: '70px 0 50px', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="container">
          <span className="label">Send Enquiry</span>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(52px,7vw,88px)', lineHeight: 0.9, letterSpacing: '0.02em', color: 'var(--text)', marginBottom: 16 }}>TELL US YOUR<br />REQUIREMENT</h1>
          <p style={{ fontSize: 16, color: 'var(--text3)', maxWidth: 500 }}>We respond within 2 hours · Mon–Sat 9AM–6PM</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="contact-page-grid">
            <div>
              <div className="contact-form-card">
                <span className="label">Send Enquiry</span>
                <h2>GET BEST PRICE NOW</h2>
                <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 24 }}>We respond within 2 hours · Mon–Sat 9AM–6PM</p>
                <LeadForm />
              </div>
            </div>
            <div>
              <span className="label">Find Us</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,60px)', lineHeight: 0.92, letterSpacing: '0.02em', color: 'var(--text)', marginBottom: 24 }}>CHENNAI,<br />TAMIL NADU</h2>
              <div className="map-wrap" style={{ marginBottom: 20 }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.078085982648!2d80.20177937507625!3d13.028877587294444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526793c3b4bbd9%3A0x9b0b0b0b0b0b0b0b!2sApna%20Shree%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin" width="100%" height="320" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Apna Shree location Chennai Tamil Nadu" />
              </div>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 16 }}>
                {[{ icon: '📞', label: 'Mobile 1', val: '+91 73583 76280', href: 'tel:+917358376280' }, { icon: '📞', label: 'Mobile 2', val: '+91 73583 76275', href: 'tel:+917358376275' }, { icon: '☎️', label: 'Landline', val: '+91-44-26870205 / 2219 / 0579', href: 'tel:+914426870205' }, { icon: '✉️', label: 'Email', val: 'jeevandos@gmail.com', href: 'mailto:jeevandos@gmail.com' }, { icon: '📍', label: 'Location', val: 'Chennai, Tamil Nadu, India', href: null }, { icon: '🕐', label: 'Hours', val: 'Mon–Sat: 9:00 AM – 6:00 PM', href: null }].map(item => (
                  <div key={item.label} className="ci-row">
                    <div className="ci-icon">{item.icon}</div>
                    <div><p className="ci-label">{item.label}</p>{item.href ? <p className="ci-val"><a href={item.href}>{item.val}</a></p> : <p className="ci-val">{item.val}</p>}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="tel:+917358376280" className="btn-primary" style={{ justifyContent: 'center' }}>📞 Call +91 73583 76280</a>
                <a href="https://wa.me/917358376280?text=Hi Apna Shree, I need a quote." className="btn-wa" style={{ justifyContent: 'center' }} target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  WhatsApp Now
                </a>
                <a href="mailto:jeevandos@gmail.com" className="btn-ghost" style={{ justifyContent: 'center' }}>✉ Email Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--bg3)', borderTop: '1px solid var(--border)', paddingTop: 60 }}>
        <div className="container">
          <div className="sec-head sec-head-center"><span className="label">Frequently Asked</span><h2>COMMON QUESTIONS</h2></div>
          <div className="faq-grid">
            {faqs.map((f, i) => <div key={i} className="faq-card"><h3>{f.q}</h3><p>{f.a}</p></div>)}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
