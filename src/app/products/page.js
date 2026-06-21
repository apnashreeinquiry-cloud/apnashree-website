'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { mainProducts, otherProducts } from '@/data/products'

export default function ProductsPage() {
  const [query, setQuery] = useState('')

  const allProds = useMemo(() => [...mainProducts, ...otherProducts], [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return allProds
    return allProds.filter(p => {
      return p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q)) ||
        p.subProducts?.some(s =>
          s.name.toLowerCase().includes(q) ||
          s.brand.toLowerCase().includes(q) ||
          s.tags?.some(t => t.toLowerCase().includes(q))
        )
    })
  }, [query, allProds])

  const main = filtered.filter(p => p.type === 'main')
  const other = filtered.filter(p => p.type === 'other')
  const totalSubs = allProds.reduce((acc, p) => acc + (p.subProducts?.length || 0), 0)

  return (
    <>
      <Navbar />
      <section style={{ background: 'var(--bg)', padding: '60px 0 40px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="label">All Products</span>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(52px,7vw,88px)', lineHeight: 0.9, letterSpacing: '0.02em', color: 'var(--text)', marginBottom: 16 }}>
            OUR COMPLETE<br />PRODUCT RANGE
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text3)', marginBottom: 24 }}>
            {allProds.length} product categories · {totalSubs} sub-products · 30+ authorized brands · Delivered across Tamil Nadu
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Get Best Price →</Link>
            <a href="tel:+917358376280" className="btn-ghost">📞 Call Now</a>
          </div>
        </div>
      </section>

      <div className="search-wrap">
        <div className="search-inner">
          <span className="search-icon">🔍</span>
          <input type="text" className="search-input"
            placeholder="Search products, brands, sub-products... (e.g. CENLUB, ball screw, brake, pneumatic)"
            value={query} onChange={e => setQuery(e.target.value)} autoComplete="off" />
          {query && <button className="search-clear" onClick={() => setQuery('')}>✕</button>}
          {query && (
            <p className="search-results-count">
              {filtered.length === 0 ? `❌ No results for "${query}"` : `✅ ${filtered.length} product${filtered.length !== 1 ? 's' : ''} found for "${query}"`}
            </p>
          )}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="no-results">
          <h3>No products found for "{query}"</h3>
          <p>Try: CENLUB, BONFIGLIOLI, brake, ball screw, coolant pump...</p>
          <button className="btn-primary" style={{ margin: '20px auto 0', display: 'inline-flex' }} onClick={() => setQuery('')}>Clear Search</button>
        </div>
      )}

      {main.length > 0 && (
        <section className="section main-prod-section">
          <div className="container">
            <div style={{ marginBottom: 40 }}>
              <span className="label">Authorized Dealership</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,4.5vw,56px)', color: 'var(--text)', letterSpacing: '0.02em', lineHeight: 0.95 }}>MAIN PRODUCTS</h2>
            </div>
            {main.map(product => <ProductBlock key={product.slug} product={product} query={query} />)}
          </div>
        </section>
      )}

      {other.length > 0 && (
        <section className="section" style={{ background: 'var(--bg3)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ marginBottom: 40 }}>
              <span className="label">We Also Sell</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,4.5vw,56px)', color: 'var(--text)', letterSpacing: '0.02em', lineHeight: 0.95 }}>OTHER PRODUCTS</h2>
            </div>
            {other.map(product => <ProductBlock key={product.slug} product={product} query={query} />)}
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}

function ProductBlock({ product, query }) {
  const subs = product.subProducts || []
  const highlightedSubs = query
    ? subs.filter(s => {
        const q = query.toLowerCase()
        return s.name.toLowerCase().includes(q) || s.brand.toLowerCase().includes(q) || s.tags?.some(t => t.toLowerCase().includes(q))
      })
    : subs
  const displaySubs = query ? highlightedSubs : subs

  return (
    <div className="main-prod-card">
      <div className="main-prod-header">

        {/* CLICKABLE IMAGE — 480px wide x 300px tall landscape */}
        <Link href={`/products/${product.slug}`} className="main-prod-img"
          style={{ display: 'block', cursor: 'pointer', textDecoration: 'none', overflow: 'hidden' }}>
          {product.mainImage ? (
            <img src={product.mainImage} alt={`${product.name} ${product.brand} Chennai`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
              onMouseEnter={e => { e.target.style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { e.target.style.transform = 'scale(1)' }}
              onError={e => { e.target.style.display = 'none' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', gap: 10 }}>
              <span style={{ fontSize: 40 }}>📦</span>
              <span style={{ fontSize: 12 }}>Upload in Admin Panel</span>
            </div>
          )}
        </Link>

        {/* TEXT INFO */}
        <div className="main-prod-info">
          <div>
            {product.type === 'main' && (
              <span className="main-prod-badge badge-dealer">🏆 Authorized Dealer</span>
            )}
            <p className="main-prod-brand">{product.brand}</p>
            <h2 className="main-prod-name">{product.name}</h2>
            <p className="main-prod-desc">{product.heroDesc}</p>
          </div>
          <div className="main-prod-actions">
            <Link href={`/products/${product.slug}`} className="btn-primary" style={{ fontSize: 14, padding: '11px 22px' }}>View Full Details →</Link>
            <Link href="/contact" className="btn-ghost" style={{ fontSize: 14, padding: '10px 20px' }}>Get Best Price</Link>
            {subs.length > 0 && (
              <span className="sub-count-badge">{subs.length} sub-product{subs.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
      </div>

      {subs.length > 0 && (
        <div className="sub-products-wrap">
          <div className="sub-products-label">
            {query && highlightedSubs.length < subs.length
              ? `${highlightedSubs.length} of ${subs.length} sub-products match`
              : `${subs.length} Sub-Product${subs.length !== 1 ? 's' : ''}`}
          </div>
          <div className="sub-grid">
            {displaySubs.map(sub => (
              <Link key={sub.slug} href={`/products/${product.slug}/${sub.slug}`} className="sub-card">
                <div className="sub-card-img">
                  {sub.image ? (
                    <img src={sub.image} alt={`${sub.name} ${sub.brand}`}
                      style={{ width: '100%', height: 220, objectFit: 'contain', display: 'block', background: 'var(--bg3)' }}
                      onError={e => { e.target.style.display = 'none' }} />
                  ) : (
                    <div style={{ width: '100%', height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', fontSize: 11, gap: 6 }}>
                      <span style={{ fontSize: 28 }}>📷</span>
                      <span>Upload in Admin Panel</span>
                    </div>
                  )}
                </div>
                <div className="sub-card-body">
                  <p className="sub-card-brand">{sub.brand}</p>
                  <p className="sub-card-name">{sub.name}</p>
                  <div className="sub-card-tags">{sub.tags?.slice(0, 3).map(t => <span key={t} className="sub-tag">{t}</span>)}</div>
                  <span className="sub-card-link">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
