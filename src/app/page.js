import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { mainProducts, otherProducts } from '@/data/products'
import HeroBg from '@/components/HeroBg'

export const metadata = {
  title: 'Apna Shree | Authorized Industrial Dealer Chennai | CENLUB INTORQ BONFIGLIOLI PMI HIWIN',
  description: 'Apna Shree — authorized dealer for CENLUB, INTORQ, PETHE, BONFIGLIOLI, PMI, HIWIN in Chennai. Lubrication systems, EM brakes, gearboxes, ball screws. 35+ years. Call +91 73583 76280.',
  alternates: { canonical: 'https://apnashree.com' },
}

const brands = ['CENLUB','INTORQ','PETHE','BONFIGLIOLI','PMI','HIWIN','RAJAMANE','GROZ','NIPPON','NUTECK','ADONITECH','REXROTH','YUKEN','FESTO','JANATICS','KLUEBER','KYODO YUSHI','DEUBLIN','FENNER','TSUBAKI']

const quickList = [
  { color: '#e85d26', label: 'Ball Screws — PMI / HIWIN' },
  { color: '#3b82f6', label: 'Gear Boxes — Bonfiglioli' },
  { color: '#ef4444', label: 'Hydraulics — Rexroth / Yuken' },
  { color: '#8b5cf6', label: 'Lubrication — CENLUB' },
  { color: '#10b981', label: 'Pneumatics — FESTO' },
  { color: '#f59e0b', label: 'EM Brakes — INTORQ' },
]

const WA_SVG = (
  <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function HomePage() {
  const totalSubs = [...mainProducts, ...otherProducts].reduce((a, p) => a + (p.subProducts?.length || 0), 0)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Are you an authorized CENLUB dealer in Chennai?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Apna Shree is an authorized dealer for CENLUB centralized lubrication systems in Chennai, Tamil Nadu since 1990." } },
          { "@type": "Question", "name": "Do you stock BONFIGLIOLI gearboxes in Chennai?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We are an authorized BONFIGLIOLI dealer in Chennai stocking helical, worm, bevel, and planetary gearboxes." } },
          { "@type": "Question", "name": "Where can I buy PMI and HIWIN ball screws in Chennai?", "acceptedAnswer": { "@type": "Answer", "text": "Apna Shree is an authorized dealer for PMI and HIWIN ball screws and LM guide systems in Chennai, Tamil Nadu." } },
        ]
      })}} />

      <Navbar />

      {/* HERO */}
      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden' }}>
        <HeroBg />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <span className="hero-dot" />
                Authorized Dealership · Chennai, India
              </div>
              <p className="hero-h1-line1">INDIA'S TRUSTED</p>
              <span className="hero-h1-accent">INDUSTRIAL</span>
              <p className="hero-h1-line3">ENGINEERING PARTNER</p>
              <p className="hero-desc">
                Authorized dealers for <strong>30+ global brands</strong> — CENLUB, INTORQ, BONFIGLIOLI, PMI, HIWIN, FESTO & more.{' '}
                {totalSubs}+ sub-products. B2B pricing. Chennai & all of Tamil Nadu since 1990.
              </p>
              <div className="hero-btns">
                <Link href="/contact" className="btn-primary">🔥 Get Best Price Now</Link>
                <a href="https://wa.me/917358376280?text=Hi Apna Shree, I need a quote." className="btn-wa" target="_blank" rel="noopener noreferrer">
                  {WA_SVG} WhatsApp Now
                </a>
                <Link href="/products" className="btn-ghost">View All Products</Link>
              </div>
              <div className="hero-chips">
                {['✅ Genuine Products', '⚡ Fast Delivery', '🏆 Authorized Dealer', '🔧 Expert Support'].map(c => (
                  <span key={c} className="hero-chip">{c}</span>
                ))}
              </div>
            </div>

            {/* QUICK ENQUIRY PANEL */}
            <div className="enquiry-panel">
              <h3>Quick Enquiry</h3>
              <p className="ep-sub">Tell us what you need — best price within 2 hours.</p>
              <ul className="quick-list">
                {quickList.map(item => (
                  <li key={item.label}>
                    <span className="quick-dot" style={{ background: item.color }} />
                    {item.label}
                  </li>
                ))}
              </ul>
              <div className="ep-btns">
                <Link href="/contact" style={{ justifyContent: "center", display: "flex", alignItems: "center", background: "#1a3a5c", color: "#fff", padding: "14px 28px", borderRadius: 6, fontFamily: "Space Grotesk,sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none", transition: "all 0.2s" }}>
                  View All Products & Enquire
                </Link>
                <a href="https://wa.me/917358376280?text=Hi Apna Shree, I need a quote."
                  className="btn-wa" style={{ justifyContent: 'center' }}
                  target="_blank" rel="noopener noreferrer">
                  {WA_SVG} WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="ticker-item">{b} <span className="ticker-sep">·</span></span>
          ))}
        </div>
      </div>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {[['35+', 'YEARS IN BUSINESS'], ['500+', 'B2B CLIENTS SERVED'], ['36+', 'GLOBAL BRANDS'], ['2hr', 'RESPONSE TIME']].map(([n, l]) => (
              <div key={l} className="stat-item">
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="inner">
          {['🛡️ 35+ Years Experience', '📍 Chennai Based', '⏰ 2-Hour Response', '🏆 30+ Authorized Brands', '🎯 Free Technical Advice', '🚚 Pan India Delivery'].map(t => (
            <div key={t} className="trust-item">{t}</div>
          ))}
        </div>
      </div>

      {/* MAIN PRODUCTS */}
      <section className="section" id="main-products">
        <div className="container">
          <div className="sec-head">
            <span className="label">Authorized Dealership</span>
            <h2>OUR MAIN PRODUCTS</h2>
            <p>Direct authorized dealerships — each with multiple sub-products. Click any product to explore.</p>
          </div>
          <div className="grid-3">
            {mainProducts.map(p => <ProductCard key={p.slug} p={p} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/products" className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
              View All Products & Sub-Products →
            </Link>
          </div>
        </div>
      </section>

      {/* OTHER PRODUCTS */}
      <section className="section" style={{ background: 'var(--bg3)', borderTop: '1px solid var(--border)' }} id="other-products">
        <div className="container">
          <div className="sec-head">
            
            <h2>OTHER PRODUCTS</h2>
            <p>Wide range of industrial components — competitive pricing, large sourcing network.</p>
          </div>
          <div className="grid-3">
            {otherProducts.map(p => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section" id="about">
        <div className="container">
          <div className="sec-head sec-head-center">
            <span className="label">Why Apna Shree</span>
            <h2>CHENNAI'S MOST TRUSTED<br />INDUSTRIAL PARTNER</h2>
          </div>
          <div className="grid-4">
            {[
              { icon: '🏆', title: 'Authorized Dealer', desc: 'Bonfiglioli, PMI, HIWIN, INTORQ, CENLUB & more — genuine products with manufacturer warranty.' },
              { icon: '✅', title: 'Genuine Products', desc: '100% authentic with full manufacturer documentation.' },
              { icon: '📦', title: 'Stockist', desc: 'Large in-stock inventory for fast same-day delivery.' },
              { icon: '🔧', title: 'Technical Support', desc: 'Expert guidance on product selection — free of charge.' },
            ].map(c => (
              <div key={c.title} className="why-card">
                <div className="why-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section" style={{ background: 'var(--bg3)', borderTop: '1px solid var(--border)' }} id="industries">
        <div className="container">
          <div className="sec-head sec-head-center">
            <span className="label">Industries We Serve</span>
            <h2>POWERING TAMIL NADU'S FACTORIES</h2>
          </div>
          <div className="grid-4">
            {[['🏭', 'Automotive'], ['⚙️', 'CNC Machining'], ['🧵', 'Textile'], ['📦', 'Packaging'], ['🔩', 'General Engineering'], ['🏗️', 'Heavy Industry'], ['💊', 'Pharmaceuticals'], ['🍃', 'Food Processing']].map(([icon, name]) => (
              <div key={name} className="ind-card">
                <div className="ind-icon">{icon}</div>
                <p className="ind-name">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <div className="sec-head sec-head-center">
            <span className="label">FAQ</span>
            <h2>COMMON QUESTIONS</h2>
          </div>
          <div className="faq-grid">
            {[
              { q: 'HOW FAST DO YOU RESPOND?', a: 'Within 2 hours during business hours (Mon–Sat, 9AM–6PM). For urgent needs, WhatsApp us directly.' },
              { q: 'DO YOU SHIP OUTSIDE CHENNAI?', a: 'Yes — we ship pan-India. Standard courier reaches most cities in 2–5 business days.' },
              { q: 'CAN YOU SOURCE UNLISTED PRODUCTS?', a: "Yes! Tell us your requirement and we'll source it from our network of 50+ manufacturers." },
              { q: 'DO YOU BUY SURPLUS EQUIPMENT?', a: 'Yes! We buy good-condition used industrial equipment. WhatsApp us photos for an offer.' },
              { q: 'CAN YOU MAKE CUSTOM COMPONENTS?', a: 'Yes — we manufacture components as per customer drawing or sample.' },
              { q: 'DO YOU SERVE B2B AND INDIVIDUALS?', a: 'We primarily serve B2B clients (manufacturers, OEMs) but also serve individual buyers for genuine parts.' },
            ].map((f, i) => (
              <div key={i} className="faq-card">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
