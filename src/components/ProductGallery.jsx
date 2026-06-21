'use client'
import { useState, useEffect, useRef } from 'react'

// Unified, responsive image carousel:
// - Front (main) image first, then gallery images, de-duplicated.
// - Auto-slideshow (advances every 4.5s), pauses on hover / after you tap.
// - Desktop: big image + thumbnail strip. Mobile: full-width image + dots.
export default function ProductGallery({ images, image, name = '', brand = '' }) {
  const seen = new Set()
  const list = [image, ...(Array.isArray(images) ? images : [])]
    .filter(u => u && !seen.has(u) && seen.add(u))

  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (list.length <= 1 || paused) return
    timer.current = setInterval(() => setActive(a => (a + 1) % list.length), 4500)
    return () => clearInterval(timer.current)
  }, [list.length, paused])

  if (list.length === 0) {
    return (
      <div style={{ width: '100%', aspectRatio: '4/3', background: 'var(--bg3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', gap: 10, fontSize: 13, padding: 20, textAlign: 'center', borderRadius: 14, border: '1px solid var(--border)' }}>
        <span style={{ fontSize: 40 }}>📷</span>
        <span style={{ fontWeight: 600 }}>Add image in Admin Panel</span>
        <span style={{ opacity: 0.7, fontSize: 11 }}>Go to /admin → Edit this product → Upload images</span>
      </div>
    )
  }

  const go = (i) => { setActive((i + list.length) % list.length); setPaused(true) }

  return (
    <div className="pg-wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <style>{`
        .pg-wrap{width:100%;}
        .pg-hero{position:relative;width:100%;aspect-ratio:1/1;max-height:460px;border-radius:14px;overflow:hidden;border:1px solid var(--border);background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.07);}
        .pg-hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#fff;opacity:0;transition:opacity .55s ease;}
        .pg-hero>img.on{opacity:1;}
        .pg-count{position:absolute;bottom:12px;right:12px;background:rgba(20,20,20,0.72);color:#fff;font-size:12px;font-weight:600;padding:4px 11px;border-radius:20px;z-index:2;letter-spacing:.02em;}
        .pg-arrow{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;border:none;background:rgba(255,255,255,0.92);box-shadow:0 2px 8px rgba(0,0,0,0.18);cursor:pointer;font-size:22px;line-height:1;color:#222;z-index:2;display:flex;align-items:center;justify-content:center;padding:0;}
        .pg-arrow:hover{background:#fff;}
        .pg-prev{left:10px;} .pg-next{right:10px;}
        .pg-dots{display:none;gap:7px;justify-content:center;margin-top:14px;}
        .pg-dot{width:9px;height:9px;border-radius:50%;border:none;padding:0;cursor:pointer;background:#d9d2c8;transition:all .2s;}
        .pg-dot.on{background:#e85d26;width:26px;border-radius:5px;}
        .pg-thumbs{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;}
        .pg-thumb{width:80px;height:80px;border-radius:10px;overflow:hidden;padding:0;cursor:pointer;background:#fff;flex:0 0 auto;border:1.5px solid var(--border);transition:all .15s ease;}
        .pg-thumb.on{border:2.5px solid #e85d26;box-shadow:0 2px 10px rgba(232,93,38,0.35);transform:translateY(-1px);}
        .pg-thumb>img{width:100%;height:100%;object-fit:cover;display:block;}
        @media(max-width:768px){
          .pg-hero{aspect-ratio:4/3;max-height:none;}
          .pg-thumbs{display:none;}
          .pg-dots{display:flex;}
          .pg-arrow{width:36px;height:36px;font-size:20px;}
        }
      `}</style>

      <div className="pg-hero">
        {list.map((img, i) => (
          <img key={i} src={img} className={i === active ? 'on' : ''} alt={`${name} ${brand} supplier dealer Chennai ${i + 1}`} />
        ))}
        {list.length > 1 && (
          <>
            <button className="pg-arrow pg-prev" onClick={() => go(active - 1)} aria-label="Previous image">‹</button>
            <button className="pg-arrow pg-next" onClick={() => go(active + 1)} aria-label="Next image">›</button>
            <div className="pg-count">{active + 1} / {list.length}</div>
          </>
        )}
      </div>

      {list.length > 1 && (
        <>
          <div className="pg-dots">
            {list.map((_, i) => (
              <button key={i} className={`pg-dot ${i === active ? 'on' : ''}`} onClick={() => go(i)} aria-label={`Go to image ${i + 1}`} />
            ))}
          </div>
          <div className="pg-thumbs">
            {list.map((img, i) => (
              <button key={i} className={`pg-thumb ${i === active ? 'on' : ''}`} onClick={() => go(i)} aria-label={`View image ${i + 1} of ${name}`}>
                <img src={img} alt={`${name} view ${i + 1}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
