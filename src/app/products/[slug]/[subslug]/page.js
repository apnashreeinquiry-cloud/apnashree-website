'use client'
import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeadForm from '@/components/LeadForm'
import ProductGallery from '@/components/ProductGallery'
import { allProducts } from '@/data/products'

const STORAGE_KEY = 'apnashree_subs'

export default function SubProductPage() {
  const params = useParams()
  const { slug, subslug } = params

  const [sub, setSub] = useState(null)
  const [parent, setParent] = useState(null)
  const [otherSubs, setOtherSubs] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const parentProd = allProducts.find(x => x.slug === slug)
    if (!parentProd) { setLoaded(true); return }

    // Try localStorage first
    let subProds = parentProd.subProducts || []
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed[slug]) subProds = parsed[slug]
      }
    } catch (e) {}

    const foundSub = subProds.find(s => s.slug === subslug)
    const others = subProds.filter(s => s.slug !== subslug)
    setParent(parentProd)
    setSub(foundSub || null)
    setOtherSubs(others)
    setLoaded(true)
  }, [slug, subslug])

  if (!loaded) return (
    <>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', fontFamily: 'Space Grotesk,sans-serif', color: 'var(--text3)', fontSize: 16 }}>
        Loading...
      </div>
      <Footer />
    </>
  )

  if (!parent || !sub) return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 48, color: 'var(--text)', marginBottom: 12 }}>Product Not Found</h1>
        <p style={{ color: 'var(--text3)', marginBottom: 24 }}>This product page could not be found.</p>
        <Link href="/products" className="btn-primary">← Back to Products</Link>
      </div>
      <Footer />
    </>
  )

  const isMain = parent.type === 'main'

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{ padding: '60px 0', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/products">Products</Link><span>/</span>
            <Link href={`/products/${slug}`}>{parent.name}</Link><span>/</span>
            <span style={{ color: 'var(--text)' }}>{sub.name}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 8 }}>
                {sub.brand} · {parent.name}
              </p>
              <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5vw,64px)', lineHeight: 0.9, letterSpacing: '0.02em', color: 'var(--text)', marginBottom: 14 }}>
                {sub.name}
              </h1>
              <p style={{ fontSize: 16, color: 'var(--text3)', lineHeight: 1.7, marginBottom: 24 }}>{sub.heroDesc}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                <a href="#enquire" className="btn-primary">Get Best Price →</a>
                <a href="tel:+917358376280" className="btn-ghost">📞 Call Now</a>
                <a href={`https://wa.me/917358376280?text=Hi, I need a quote for ${sub.name}`}
                  className="btn-wa" target="_blank" rel="noopener noreferrer" style={{ padding: '13px 16px', fontSize: 14 }}>
                  <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
              <div className="hero-tags">{sub.tags?.map(t => <span key={t} className="hero-tag">{t}</span>)}</div>
            </div>

            {/* MAIN IMAGE GALLERY — multiple images (Blob URLs) with fallback to single image */}
            <ProductGallery images={sub.images} image={sub.image} name={sub.name} brand={sub.brand} />
          </div>
        </div>
      </section>

      {/* DETAIL CONTENT */}
      <section className="section">
        <div className="container">
          <div className="sub-page-grid">
            <div className="sub-body">
              <h2>About {sub.name}</h2>
              {(sub.description || sub.heroDesc || '').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}

              {/* SHEET IMAGE */}
              {sub.sheetImage && (
                <div style={{ margin: '28px 0' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Product Detail / Sheet</p>
                  <img src={sub.sheetImage} alt={`${sub.name} specifications Chennai`}
                    style={{ width: '100%', borderRadius: 10, border: '1px solid var(--border)', display: 'block' }}
                    onError={e => { e.target.style.display = 'none' }} />
                </div>
              )}

              {/* SPECIFICATIONS */}
              {sub.specifications?.length > 0 && (
                <>
                  <h2>Technical Specifications</h2>
                  <table className="spec-table">
                    <tbody>
                      {sub.specifications.map((spec, i) => {
                        const idx = spec.indexOf(':')
                        const key = idx > -1 ? spec.slice(0, idx).trim() : spec
                        const val = idx > -1 ? spec.slice(idx + 1).trim() : ''
                        return <tr key={i}><td>{key}</td><td>{val || spec}</td></tr>
                      })}
                    </tbody>
                  </table>
                </>
              )}

              {/* APPLICATIONS */}
              {sub.applications?.length > 0 && (
                <>
                  <h2>Applications</h2>
                  <ul className="sub-list arrow">{sub.applications.map((a, i) => <li key={i}>{a}</li>)}</ul>
                </>
              )}

              {/* FAQ */}
              {sub.faqs?.length > 0 && (
                <>
                  <h2>Frequently Asked Questions</h2>
                  <div className="faq-grid" style={{ maxWidth: '100%' }}>
                    {sub.faqs.map((f, i) => <div key={i} className="faq-card"><h3>{f.q}</h3><p>{f.a}</p></div>)}
                  </div>
                </>
              )}

              {/* OTHER SUB-PRODUCTS */}
              {otherSubs.length > 0 && (
                <>
                  <h2>Other {parent.name} Products</h2>
                  <div className="sub-grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))' }}>
                    {otherSubs.map(s => (
                      <Link key={s.slug} href={`/products/${slug}/${s.slug}`} className="sub-card">
                        <div className="sub-card-img">
                          {s.image ? (
                            <img src={s.image} alt={s.name} style={{ width: '100%', height: 180, objectFit: 'contain', display: 'block' }}
                              onError={e => { e.target.style.display = 'none' }} />
                          ) : (
                            <div style={{ width: '100%', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', fontSize: 24 }}>📷</div>
                          )}
                        </div>
                        <div className="sub-card-body">
                          <p className="sub-card-brand">{s.brand}</p>
                          <p className="sub-card-name">{s.name}</p>
                          <span className="sub-card-link">View →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="sub-sidebar">
              <div className="sidebar-card" id="enquire">
                <h3>Get Best Price for {sub.name}</h3>
                <p className="sidebar-sub">Response within 2 hours · B2B pricing</p>
                <LeadForm compact preselect={`${sub.name} (${sub.brand})`} />
              </div>
              <div style={{ background: 'var(--bg3)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact Directly</h3>
                {[
                  { bg: '#0a1628', c: '#fff', href: 'tel:+917358376280', label: '📞 +91 73583 76280' },
                  { bg: '#0a1628', c: '#fff', href: 'tel:+917358376275', label: '📞 +91 73583 76275' },
                  { bg: '#25d366', c: '#fff', href: 'https://wa.me/917358376280', label: '💬 WhatsApp Now', ext: true },
                  { bg: 'var(--bg)', c: 'var(--text)', href: 'mailto:jeevandos@gmail.com', label: '✉ Email Us' },
                ].map(b => (
                  <a key={b.label} href={b.href} {...(b.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="scb" style={{ background: b.bg, color: b.c, fontSize: 13 }}>{b.label}</a>
                ))}
              </div>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Part of Range</h3>
                <Link href={`/products/${slug}`} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', background: 'var(--bg3)', flexShrink: 0 }}>
                    {parent.mainImage && <img src={parent.mainImage} alt={parent.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{parent.brand}</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{parent.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--accent)' }}>View all products →</p>
                  </div>
                </Link>
              </div>
              <div style={{ background: 'var(--accent)', borderRadius: 12, padding: 20 }}>
                <h3 style={{ color: '#fff', marginBottom: 10, fontSize: 14, fontWeight: 700 }}>Quick Info</h3>
                {[['📍', 'Chennai, Tamil Nadu'], ['⏰', 'Response in 2 hrs'], ['🏆', isMain ? 'Authorized Dealer' : 'Supplier'], ['📅', 'Since 1990']].map(([icon, val]) => (
                  <div key={val} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                    <span>{icon}</span><span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
