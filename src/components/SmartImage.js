'use client'
import { useState } from 'react'
export default function SmartImage({ src, alt, style, height = 200, fallbackText, className }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return (
    <div className="img-placeholder-box" style={{ height, ...style }}>
      <span style={{ fontSize: 28 }}>📷</span>
      <span style={{ fontWeight: 600 }}>{fallbackText || (src?.split('/').pop()) || 'Add image'}</span>
      <span style={{ opacity: 0.6, fontSize: 10 }}>{src ? `public${src}` : 'No image set'}</span>
    </div>
  )
  return <img src={src} alt={alt} className={className} style={style} onError={() => setFailed(true)} />
}
