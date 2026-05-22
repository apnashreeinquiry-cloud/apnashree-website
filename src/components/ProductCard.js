'use client'
import Link from 'next/link'
import SmartImage from './SmartImage'

export default function ProductCard({ p }) {
  const subCount = p.subProducts?.length || 0
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--border)',
      borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
      transition: 'all 0.25s', cursor: 'pointer'
    }}>
      <div style={{ height: 200, overflow: 'hidden', background: 'var(--bg3)', position: 'relative' }}>
        <SmartImage
          src={p.mainImage}
          alt={`${p.name} ${p.brand} Chennai`}
          style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
          fallbackText={p.mainImage?.split('/').pop()}
          height={200}
        />
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: p.type === 'main' ? 'var(--accent)' : 'var(--text)',
          color: '#fff', fontSize: 10, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '4px 10px', borderRadius: 4
        }}>
          {p.type === 'main' ? '🏆 Authorized' : '🔄 Buy & Sell'}
        </div>
      </div>
      <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>
          {p.brand}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8, lineHeight: 1.3 }}>
          {p.name}
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.6, marginBottom: 14, flex: 1 }}>
          {p.heroDesc}
        </p>
        {subCount > 0 && (
          <div style={{
            background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
            borderRadius: 6, padding: '6px 10px', fontSize: 12,
            color: 'var(--accent)', fontWeight: 600, marginBottom: 12
          }}>
            📦 {subCount} sub-product{subCount !== 1 ? 's' : ''} available
          </div>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href={`/products/${p.slug}`} style={{
            flex: 1, padding: 10, borderRadius: 6,
            background: 'var(--accent)', color: '#fff',
            fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block'
          }}>
            View Details →
          </Link>
          <Link href="/contact" style={{
            flex: 1, padding: 10, borderRadius: 6, background: 'transparent',
            color: 'var(--text)', fontSize: 13, fontWeight: 600,
            textAlign: 'center', display: 'block', border: '1.5px solid var(--border)'
          }}>
            Get Price
          </Link>
        </div>
      </div>
    </div>
  )
}
