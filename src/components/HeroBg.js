'use client'
import { useEffect, useRef } from 'react'

const IMAGES = [
  { src: '/images/products/hydraulics-main.jpg',        label: 'Hydraulics',         brand: 'YUKEN · REXROTH' },
  { src: '/images/products/pneumatics-main.jpg',        label: 'Pneumatics',         brand: 'FESTO · JANATICS' },
  { src: '/images/products/nippon-pumps-main.jpg',      label: 'Oil Pumps',          brand: 'NIPPON' },
  { src: '/images/products/groz-tools-main.jpg',        label: 'Industrial Tools',   brand: 'GROZ' },
  { src: '/images/products/telescopic-covers-main.jpg', label: 'Telescopic Covers',  brand: 'APNA' },
  { src: '/images/products/rotary-unions-main.jpg',     label: 'Rotary Unions',      brand: 'DEUBLIN · MICRO' },
  { src: '/images/products/special-pumps-main.jpg',     label: 'Special Pumps',      brand: 'WILO · KNOLL' },
  { src: '/images/products/torque-limiters-main.jpg',   label: 'Torque Limiters',    brand: 'NUTECK' },
]

export default function HeroBg() {
  // 3 columns with different speeds and offsets
  const col1 = [...IMAGES, ...IMAGES, ...IMAGES]
  const col2 = [...IMAGES.slice(3), ...IMAGES, ...IMAGES, ...IMAGES.slice(0,3)]
  const col3 = [...IMAGES.slice(5), ...IMAGES, ...IMAGES, ...IMAGES.slice(0,5)]

  return (
    <div className="hb-root" style={{
      position: 'absolute', inset: 0, zIndex: 0,
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      <style>{`
        @media(max-width:768px){ .hb-root{ display:none !important; } }
        @keyframes scrollUp1 { 0%{transform:translateY(0)} 100%{transform:translateY(-33.333%)} }
        @keyframes scrollUp2 { 0%{transform:translateY(0)} 100%{transform:translateY(-33.333%)} }
        @keyframes scrollUp3 { 0%{transform:translateY(0)} 100%{transform:translateY(-33.333%)} }

        .hb-col1 { animation: scrollUp1 35s linear infinite; }
        .hb-col2 { animation: scrollUp2 28s linear infinite; }
        .hb-col3 { animation: scrollUp3 42s linear infinite; }

        .hb-card {
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 16px;
          position: relative;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12);
          flex-shrink: 0;
        }
        .hb-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(1.1) contrast(1.05);
        }
        .hb-badge {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.4) 70%, transparent 100%);
          padding: 28px 14px 12px;
        }
        .hb-badge-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          display: block;
          margin-bottom: 2px;
        }
        .hb-badge-brand {
          font-size: 10px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .hb-col-wrap {
          flex: 1;
          overflow: hidden;
          height: 100%;
          min-width: 0;
        }
      `}</style>

      {/* 3-column scrolling grid */}
      <div style={{
        position: 'absolute',
        top: 0, right: '-8px',
        width: '52%',
        height: '100%',
        display: 'flex',
        gap: 16,
        padding: '0 16px 0 0',
      }}>
        {/* COL 1 — normal speed */}
        <div className="hb-col-wrap">
          <div className="hb-col1">
            {col1.map((img, i) => (
              <div key={i} className="hb-card" style={{ height: i % 3 === 0 ? 200 : i % 3 === 1 ? 220 : 185 }}>
                <img src={img.src} alt={img.label}
                  onError={e => { e.target.parentElement.style.display='none' }}/>
                <div className="hb-badge">
                  <span className="hb-badge-label">{img.label}</span>
                  <span className="hb-badge-brand">{img.brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COL 2 — faster */}
        <div className="hb-col-wrap">
          <div className="hb-col2">
            {col2.map((img, i) => (
              <div key={i} className="hb-card" style={{ height: i % 3 === 0 ? 215 : i % 3 === 1 ? 190 : 230 }}>
                <img src={img.src} alt={img.label}
                  onError={e => { e.target.parentElement.style.display='none' }}/>
                <div className="hb-badge">
                  <span className="hb-badge-label">{img.label}</span>
                  <span className="hb-badge-brand">{img.brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COL 3 — slowest */}
        <div className="hb-col-wrap">
          <div className="hb-col3">
            {col3.map((img, i) => (
              <div key={i} className="hb-card" style={{ height: i % 3 === 0 ? 195 : i % 3 === 1 ? 225 : 205 }}>
                <img src={img.src} alt={img.label}
                  onError={e => { e.target.parentElement.style.display='none' }}/>
                <div className="hb-badge">
                  <span className="hb-badge-label">{img.label}</span>
                  <span className="hb-badge-brand">{img.brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LEFT GRADIENT — keeps text readable */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to right, var(--bg,#f8f6f1) 38%, rgba(248,246,241,0.96) 50%, rgba(248,246,241,0.5) 63%, rgba(248,246,241,0.1) 75%, transparent 85%)',
      }}/>

      {/* TOP FADE */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '18%', zIndex: 3,
        background: 'linear-gradient(to bottom, var(--bg,#f8f6f1) 0%, transparent 100%)',
      }}/>

      {/* BOTTOM FADE */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '18%', zIndex: 3,
        background: 'linear-gradient(to top, var(--bg,#f8f6f1) 0%, transparent 100%)',
      }}/>

      {/* Subtle orange vignette on right edge */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '8%', height: '100%', zIndex: 3,
        background: 'linear-gradient(to left, rgba(232,93,38,0.08) 0%, transparent 100%)',
      }}/>
    </div>
  )
}
