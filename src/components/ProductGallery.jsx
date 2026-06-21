'use client'
import { useState } from 'react'

// Shows up to 6 images with a clickable thumbnail strip.
// Backward-compatible: if `images` is empty, it falls back to the single `image`
// field, so every existing product keeps working unchanged.
export default function ProductGallery({ images, image, name = '', brand = '' }) {
  const list = (Array.isArray(images) && images.filter(Boolean).length > 0)
    ? images.filter(Boolean)
    : (image ? [image] : [])

  const [active, setActive] = useState(0)
  const [hidden, setHidden] = useState(false)

  if (list.length === 0 || hidden) {
    return (
      <div style={{ width: '100%', height: 360, background: 'var(--bg3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', gap: 10, fontSize: 13, padding: 20, textAlign: 'center', borderRadius: 12, border: '1px solid var(--border)' }}>
        <span style={{ fontSize: 40 }}>📷</span>
        <span style={{ fontWeight: 600 }}>Add image in Admin Panel</span>
        <span style={{ opacity: 0.7, fontSize: 11 }}>Go to /admin → Edit this product → Upload images</span>
      </div>
    )
  }

  const current = list[Math.min(active, list.length - 1)]

  return (
    <div>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', background: '#fff' }}>
        <img
          src={current}
          alt={`${name} ${brand} supplier dealer Chennai Tamil Nadu`}
          style={{ width: '100%', height: 420, objectFit: 'contain', display: 'block', background: '#fff' }}
          onError={() => { if (list.length === 1) setHidden(true) }}
        />
      </div>

      {list.length > 1 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {list.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${name}`}
              style={{
                width: 66, height: 66, borderRadius: 8, overflow: 'hidden', padding: 0, cursor: 'pointer',
                background: '#fff', flex: '0 0 auto',
                border: i === active ? '2px solid #e85d26' : '1px solid var(--border)',
                outline: 'none', transition: 'border-color .15s',
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
