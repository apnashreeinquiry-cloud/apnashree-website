'use client'
import { useState } from 'react'

// One unified gallery: the front (main) image shows first, then the gallery images.
// If there's no main image, the first gallery image becomes the front.
// De-duplicated so the same picture never shows twice.
export default function ProductGallery({ images, image, name = '', brand = '' }) {
  const seen = new Set()
  const list = [image, ...(Array.isArray(images) ? images : [])]
    .filter(u => u && !seen.has(u) && seen.add(u))

  const [active, setActive] = useState(0)

  if (list.length === 0) {
    return (
      <div style={{ width: '100%', height: 380, background: 'var(--bg3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', gap: 10, fontSize: 13, padding: 20, textAlign: 'center', borderRadius: 14, border: '1px solid var(--border)' }}>
        <span style={{ fontSize: 40 }}>📷</span>
        <span style={{ fontWeight: 600 }}>Add image in Admin Panel</span>
        <span style={{ opacity: 0.7, fontSize: 11 }}>Go to /admin → Edit this product → Upload images</span>
      </div>
    )
  }

  const idx = Math.min(active, list.length - 1)
  const current = list[idx]

  return (
    <div>
      {/* HERO IMAGE */}
      <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
        <img
          src={current}
          alt={`${name} ${brand} supplier dealer Chennai Tamil Nadu`}
          style={{ width: '100%', height: 440, objectFit: 'contain', display: 'block', background: '#fff' }}
        />
        {list.length > 1 && (
          <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(20,20,20,0.72)', color: '#fff', fontSize: 12, fontWeight: 600, padding: '4px 11px', borderRadius: 20, letterSpacing: '0.02em' }}>
            {idx + 1} / {list.length}
          </div>
        )}
      </div>

      {/* THUMBNAIL STRIP */}
      {list.length > 1 && (
        <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          {list.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${name}`}
              style={{
                width: 80, height: 80, borderRadius: 10, overflow: 'hidden', padding: 0, cursor: 'pointer',
                background: '#fff', flex: '0 0 auto',
                border: i === idx ? '2.5px solid #e85d26' : '1.5px solid var(--border)',
                boxShadow: i === idx ? '0 2px 10px rgba(232,93,38,0.35)' : 'none',
                transform: i === idx ? 'translateY(-1px)' : 'none',
                transition: 'all .15s ease', outline: 'none',
              }}
            >
              <img src={img} alt={`${name} view ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
