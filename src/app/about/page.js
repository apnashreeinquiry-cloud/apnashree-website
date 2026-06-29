import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SmartImage from '@/components/SmartImage'
import FaqSection from '@/components/FaqSection'
export const metadata = { title: 'About Apna Shree | 35+ Years Authorized Industrial Dealer Chennai', description: "Apna Shree — Chennai's most trusted industrial engineering partner since 1990. Authorized dealer for CENLUB, INTORQ, BONFIGLIOLI, PMI, HIWIN. 1500+ B2B clients.", alternates: { canonical: 'https://apnashree.com/about' } }
const timeline = [
  { year: '1990', title: 'Founded in Chennai', desc: 'Apna Shree was established in Chennai as a trusted supplier of industrial engineering products.' },
  { year: '1991', title: 'First Authorized Dealership', desc: 'Became authorized dealer for Rollon — Turcite slideway liners.' },
  { year: '1992', title: 'CENLUB Lubrication Systems', desc: 'Became authorized dealer for CENLUB Systems centralized lubrication systems.' },
  { year: '1994', title: 'EMCO, Dynatorq & Elscint', desc: 'Authorized dealer for EMCO AC & DC motors, Dynatorq, and Elscint vibratory bowl feeders.' },
  { year: '1998', title: 'Pethe Brakes', desc: 'Became authorized dealer for Pethe electromagnetic brakes.' },
  { year: '2000', title: 'PMI Ball Screws & LM Systems', desc: 'Became authorized dealer for PMI-make ball screws and LM systems.' },
  { year: '2002', title: 'Nuteck Couplings', desc: 'Became authorized dealer for Nuteck couplings.' },
  { year: '2005', title: 'Motors, Gearboxes & Couplings', desc: 'Expanded into industrial motors, gear boxes, and a wider range of industrial couplings.' },
  { year: '2006', title: 'ACMEE International Exhibition', desc: 'Began participating in the ACMEE International Exhibition — 10 times consecutively since.' },
  { year: '2010', title: 'Coolant Pumps', desc: 'Expanded into coolant pumps for CNC and conventional machine tools.' },
  { year: '2019', title: 'INTORQ Dealership', desc: 'Became authorized dealer for INTORQ electromagnetic brakes and clutches.' },
  { year: '2020', title: 'PAN India Shipping', desc: 'Expanded logistics to ship across all of India, with exports to the US and Dubai.' },
  { year: '2022', title: 'Best Distributor Award', desc: 'Received the Best Distributor Award for INTORQ.' },
  { year: '2025', title: 'DURI (Taiwan) Dealership', desc: 'Became dealer for DURI Taiwan products. Now serving 1500+ clients across 36 brands.' },
]
const testimonials = [
  { stars: 5, text: 'Apna Shree has been our go-to supplier for CENLUB lubrication systems for over 10 years. Always genuine products, fast delivery, and excellent technical support.', name: 'R. Krishnamurthy', company: 'Precision Engineering Works, Ambattur', init: 'RK' },
  { stars: 5, text: 'We needed PMI ball screws urgently for a CNC breakdown. Apna Shree delivered within the day. Saved us lakhs in production losses.', name: 'S. Venkataraman', company: 'Machine Tools India, Guindy', init: 'SV' },
  { stars: 5, text: 'Best place in Chennai for BONFIGLIOLI gearboxes. Competitive pricing and they always have stock. Been buying from them for 8+ years.', name: 'M. Arumugam', company: 'Industrial Drives Chennai', init: 'MA' },
  { stars: 5, text: 'Their technical advice on selecting the right INTORQ brake for our packaging machine was invaluable. Knowledgeable team, genuine products.', name: 'P. Subramaniam', company: 'Pack Tech Industries, Perungudi', init: 'PS' },
  { stars: 5, text: 'Excellent service for FESTO pneumatic components. Always available, competitive price, and they even helped with system design.', name: 'K. Ramasamy', company: 'Automation Solutions TN', init: 'KR' },
  { stars: 5, text: 'Apna Shree supplied Turcite sheets and HIWIN LM guides for our machine reconditioning project. Perfect quality, great price.', name: 'V. Natarajan', company: 'CNC Reconditioning Services', init: 'VN' },
]
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section style={{ padding: '80px 0 60px', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="label">Our Story</span>
              <h1 style={{ marginBottom: 20 }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(52px,7vw,88px)', color: 'var(--text)', display: 'block', lineHeight: 0.92, letterSpacing: '0.02em' }}>ABOUT</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(52px,7vw,88px)', color: 'var(--accent)', display: 'block', lineHeight: 0.92, letterSpacing: '0.02em' }}>APNA SHREE</span>
              </h1>
              <p style={{ fontSize: 17, color: 'var(--text3)', lineHeight: 1.75, marginBottom: 28 }}>35+ years of engineering excellence in Chennai. Trusted by 1500+ B2B clients across Tamil Nadu and India.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn-primary">Get In Touch</Link>
                <Link href="/products" className="btn-ghost">View Products</Link>
              </div>
              <div className="about-stats-row">
                {[['35+', 'Years in Business'], ['1500+', 'B2B Clients'], ['36+', 'Global Brands'], ['29+', 'Product Categories']].map(([n, l]) => (
                  <div key={l} className="about-stat"><div className="about-stat-num">{n}</div><div className="about-stat-label">{l}</div></div>
                ))}
              </div>
            </div>
            <div>
              <SmartImage src="/images/founder.jpg" alt="Apna Shree founder Mohan Rengan Chennai" style={{ width: '100%', height: 480, objectFit: 'cover', borderRadius: 14, border: '2px solid var(--border)', display: 'block' }} fallbackText="founder.jpg · 600×700px · Add founder photo here" height={480} />
              <div style={{ marginTop: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Mohan Rengan</p>
                <p style={{ fontSize: 12, color: 'var(--text3)' }}>Founder & Managing Director, Apna Shree</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="label">Who We Are</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,60px)', lineHeight: 0.92, letterSpacing: '0.02em', color: 'var(--text)', marginBottom: 28 }}>CHENNAI'S MOST TRUSTED<br />ENGINEERING PARTNER</h2>
            </div>
            <div>
              <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.8, marginBottom: 16 }}>Apna Shree is a Chennai-based B2B industrial engineering products supplier with over 35 years of experience. We are the authorized dealer for 36+ globally trusted brands including Bonfiglioli, PMI, HIWIN, INTORQ, CENLUB, Rexroth, Festo, and Yuken.</p>
              <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.8, marginBottom: 16 }}>We specialize in mechanical power transmission, motion control, lubrication systems, hydraulics, pneumatics, and precision machine tool components.</p>
              <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.8 }}>Beyond dealership, we also buy and sell surplus industrial equipment, and manufacture custom components from drawings or samples.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--bg3)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="sec-head sec-head-center"><span className="label">Our Credentials</span><h2>WHY CLIENTS TRUST US</h2></div>
          <div className="grid-4">
            {[{ icon: '🏆', t: 'Authorized Dealer', d: 'Bonfiglioli, PMI, HIWIN, INTORQ, CENLUB & more.' }, { icon: '✅', t: 'Genuine Products', d: '100% authentic with full manufacturer warranty.' }, { icon: '📦', t: 'Stockist', d: 'Large inventory for fast same-day delivery.' }, { icon: '🔧', t: 'Technical Support', d: 'Expert application guidance — free of charge.' }].map(c => (
              <div key={c.t} className="why-card"><div className="why-icon">{c.icon}</div><h3>{c.t}</h3><p>{c.d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div>
              <span className="label">Our Journey</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,60px)', lineHeight: 0.92, letterSpacing: '0.02em', color: 'var(--text)', marginBottom: 48 }}>35 YEARS OF GROWTH</h2>
              <div className="timeline">
                {timeline.map(t => (
                  <div key={t.year} className="tl-item">
                    <div className="tl-dot" />
                    <div className="tl-year">{t.year}</div>
                    <div className="tl-title">{t.title}</div>
                    <div className="tl-desc">{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="label">Our Mission</span>
              <h3 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 20, lineHeight: 1.3 }}>Making quality industrial components accessible to every factory in Tamil Nadu</h3>
              <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.8, marginBottom: 16 }}>Our mission is simple: be the most reliable industrial components partner for Tamil Nadu's manufacturing sector — the right products, genuine authorized brands, and technical guidance that solves real production problems.</p>
              <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.8, marginBottom: 32 }}>A factory should never be stopped because of a missing component. With our stock, our sourcing network, and our 35+ years of experience — we make sure that doesn't happen.</p>
              <div style={{ padding: 28, background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 10 }}>Contact the founder directly</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Mohan Rengan</p>
                <a href="tel:+917358376280" style={{ fontSize: 14, color: 'var(--text3)', display: 'block', marginBottom: 4 }}>📞 +91 73583 76280</a>
                <a href="mailto:jeevandos@gmail.com" style={{ fontSize: 14, color: 'var(--text3)' }}>✉ jeevandos@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--bg3)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="sec-head sec-head-center"><span className="label">Customer Reviews</span><h2>WHAT OUR CLIENTS SAY</h2></div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testi-card">
                <div className="stars">{[...Array(t.stars)].map((_, j) => <span key={j} className="star">★</span>)}</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-footer">
                  <div className="testi-avatar">{t.init}</div>
                  <div><p className="testi-name">{t.name}</p><p className="testi-company">{t.company}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FaqSection />
      <Footer />
    </>
  )
}
