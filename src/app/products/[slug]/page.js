'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeadForm from '@/components/LeadForm'
import { allProducts } from '@/data/products'

const STORAGE_KEY = 'apnashree_subs'

export default function ProductPage() {
  const params = useParams()
  const slug = params?.slug

  const [product, setProduct] = useState(null)
  const [subs, setSubs] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const base = allProducts.find(x => x.slug === slug)
    if (!base) { setLoaded(true); return }

    // Load sub-products from localStorage (has uploaded images)
    let subProds = base.subProducts || []
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed[slug] && parsed[slug].length > 0) {
          subProds = parsed[slug]
        }
      }
    } catch (e) {}

    setProduct(base)
    setSubs(subProds)
    setLoaded(true)
  }, [slug])

  if (!loaded) return (
    <>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--text3)', fontSize: 16 }}>Loading...</div>
      <Footer />
    </>
  )

  if (!product) return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 48, color: 'var(--text)', marginBottom: 12 }}>Product Not Found</h1>
        <Link href="/products" className="btn-primary">← Back to Products</Link>
      </div>
      <Footer />
    </>
  )

  const isMain = product.type === 'main'

  return (
    <>
      <Navbar />

      {/* PRODUCT HERO */}
      <section style={{ padding: '60px 0', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/products">Products</Link><span>/</span>
            <span style={{ color: 'var(--text)' }}>{product.name}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span className="label" style={{ margin: 0 }}>{product.brand}</span>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 10px', borderRadius: 4, background: isMain ? 'var(--accent)' : 'var(--text)', color: '#fff' }}>
                  {isMain ? 'Authorized Dealer' : ''}
                </span>
              </div>
              <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5vw,68px)', lineHeight: 0.9, letterSpacing: '0.02em', color: 'var(--text)', marginBottom: 16 }}>
                {product.name}
              </h1>
              <p style={{ fontSize: 16, color: 'var(--text3)', lineHeight: 1.7, marginBottom: 24 }}>{product.heroDesc}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                <a href="#enquire" className="btn-primary">Get Best Price →</a>
                <a href="tel:+917358376280" className="btn-ghost">📞 Call Now</a>
                <a href={`https://wa.me/917358376280?text=Hi, I need a quote for ${product.name}`}
                  className="btn-wa" target="_blank" rel="noopener noreferrer" style={{ padding: '13px 18px', fontSize: 14 }}>
                  <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
              <div className="hero-tags">
                {product.tags?.map(t => <span key={t} className="hero-tag">{t}</span>)}
              </div>
            </div>

            {/* MAIN PRODUCT IMAGE */}
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
              {product.mainImage ? (
                <img src={product.mainImage} alt={`${product.name} ${product.brand} Chennai`}
                  style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }}
                  onError={e => { e.target.style.display = 'none' }} />
              ) : (
                <div style={{ width: '100%', height: 360, background: 'var(--bg3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', gap: 10, fontSize: 13 }}>
                  <span style={{ fontSize: 40 }}>📷</span>
                  <span>Add image in Admin Panel</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SUB-PRODUCTS — reads from localStorage so uploaded images show */}
      {subs.length > 0 && (
        <section style={{ padding: '60px 0', background: 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ marginBottom: 36 }}>
              <span className="label">{subs.length} Sub-Products</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,4vw,52px)', color: 'var(--text)', letterSpacing: '0.02em', lineHeight: 0.95 }}>PRODUCTS WE SUPPLY</h2>
              <p style={{ fontSize: 15, color: 'var(--text3)', marginTop: 10 }}>Click any product to view full specifications, applications, and get a price quote.</p>
            </div>
            <div className="sub-grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))' }}>
              {subs.map(sub => (
                <Link key={sub.slug} href={`/products/${slug}/${sub.slug}`} className="sub-card">
                  <div className="sub-card-img">
                    {/* KEY FIX: src works for both base64 (from admin upload) AND file paths */}
                    {sub.image ? (
                      <img
                        src={sub.image}
                        alt={`${sub.name} ${sub.brand} Chennai`}
                        style={{ width: '100%', height: 220, objectFit: 'contain', display: 'block' }}
                        onError={e => { e.target.style.display = 'none' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', gap: 8 }}>
                        <span style={{ fontSize: 28 }}>📷</span>
                        <span style={{ fontSize: 11 }}>Upload in Admin Panel</span>
                      </div>
                    )}
                  </div>
                  <div className="sub-card-body">
                    <p className="sub-card-brand">{sub.brand}</p>
                    <p className="sub-card-name">{sub.name}</p>
                    <div className="sub-card-tags">
                      {sub.tags?.slice(0, 3).map(t => <span key={t} className="sub-tag">{t}</span>)}
                    </div>
                    <span className="sub-card-link">View Full Details →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ENQUIRY + SIDEBAR */}
      <section className="section">
        <div className="container">
          <div className="sub-page-grid">
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>About {product.name}</h2>
              <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.8 }}>{product.heroDesc}</p>
              <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.8, marginTop: 12 }}>
                {isMain
                  ? `As an authorized dealer for ${product.brand} in Chennai, we supply the complete range of ${product.name.toLowerCase()} with genuine products, manufacturer warranty, and expert technical support across Tamil Nadu.`
                  : `We buy and sell ${product.name.toLowerCase()} from ${product.brand} in Chennai. Competitive pricing, fast sourcing, and expert guidance for all your requirements.`}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginTop: 32 }}>
                {[
                  { icon: isMain ? '🏆' : '📦', title: isMain ? 'Authorized Dealer' : 'Available', desc: isMain ? 'Genuine products with full manufacturer warranty' : 'Competitive pricing, large sourcing network' },
                  { icon: '⚡', title: 'Fast Delivery', desc: 'Same-day and next-day delivery in Chennai' },
                  { icon: '🔧', title: 'Free Technical Help', desc: 'Expert guidance on selection and application' },
                  { icon: '📞', title: '2-Hour Response', desc: 'Call or WhatsApp for an instant quote' },
                ].map(c => (
                  <div key={c.title} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{c.title}</p>
                    <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.5 }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sub-sidebar">
              <div className="sidebar-card" id="enquire">
                <h3>Get Best Price</h3>
                <p className="sidebar-sub">Response within 2 hours · B2B pricing</p>
                <LeadForm compact preselect={product.name} />
              </div>
              <div style={{ background: 'var(--bg3)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Contact Directly</h3>
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
              <div style={{ background: 'var(--accent)', borderRadius: 12, padding: 20 }}>
                <h3 style={{ color: '#fff', marginBottom: 10, fontSize: 14, fontWeight: 700 }}>Quick Info</h3>
                {[['🏆', isMain ? 'Authorized Dealer' : 'Supplier'], ['📍', 'Chennai, Tamil Nadu'], ['⏰', 'Response in 2 hrs'], ['📅', 'Since 1990']].map(([icon, val]) => (
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
