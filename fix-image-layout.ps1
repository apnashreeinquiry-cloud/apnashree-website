# fix-image-layout.ps1
# Run: powershell -ExecutionPolicy Bypass -File fix-image-layout.ps1
Write-Host "Applying full-width image layout fix..." -ForegroundColor Cyan

$file = "src\app\products\page.js"

if (-not (Test-Path $file)) {
    Write-Host "ERROR: $file not found. Run from project root folder." -ForegroundColor Red
    exit
}

$text = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

$oldBlock = 'function ProductBlock({ product, query }) {'

if (-not $text.Contains($oldBlock)) {
    Write-Host "ERROR: ProductBlock not found in file." -ForegroundColor Red
    exit
}

# Find start and end of function
$start = $text.IndexOf('function ProductBlock({ product, query }) {')
$end = $text.LastIndexOf('}') + 1  # last } in file before the export

# Write the new ProductBlock
$newBlock = @'
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
    <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 40, border: '1px solid var(--border)', background: 'var(--card-bg)' }}>

      {/* FULL WIDTH CLICKABLE IMAGE */}
      <Link href={`/products/${product.slug}`} style={{ display: 'block', overflow: 'hidden', background: 'var(--bg3)', cursor: 'pointer' }}>
        {product.mainImage ? (
          <img
            src={product.mainImage}
            alt={`${product.name} ${product.brand} Chennai`}
            style={{ width: '100%', height: 420, objectFit: 'contain', display: 'block', background: 'var(--bg3)' }}
            onError={e => { e.target.style.display = 'none' }}
          />
        ) : (
          <div style={{ width: '100%', height: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', gap: 12 }}>
            <span style={{ fontSize: 48 }}>📦</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Upload image in Admin Panel</span>
          </div>
        )}
      </Link>

      {/* PRODUCT INFO */}
      <div style={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            {product.type === 'main' && (
              <span style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 4, marginBottom: 10 }}>
                🏆 Authorized Dealer
              </span>
            )}
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>{product.brand}</p>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,3vw,42px)', lineHeight: 0.95, letterSpacing: '0.02em', color: 'var(--text)', marginBottom: 10 }}>{product.name}</h2>
            <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.65, maxWidth: 600 }}>{product.heroDesc}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', paddingTop: 4 }}>
            <Link href={`/products/${product.slug}`} className="btn-primary" style={{ fontSize: 14, padding: '12px 24px' }}>View Full Details →</Link>
            <Link href="/contact" className="btn-ghost" style={{ fontSize: 14, padding: '11px 22px' }}>Get Best Price</Link>
            {subs.length > 0 && (
              <span className="sub-count-badge">{subs.length} sub-product{subs.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
      </div>

      {/* SUB-PRODUCTS */}
      {subs.length > 0 && (
        <div style={{ padding: '0 28px 28px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0 16px' }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text3)' }}>
              {query && highlightedSubs.length < subs.length
                ? `${highlightedSubs.length} of ${subs.length} sub-products match`
                : `${subs.length} Sub-Product${subs.length !== 1 ? 's' : ''}`}
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
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
'@

# Replace everything from function ProductBlock to the last }
$before = $text.Substring(0, $start)
$newContent = $before + $newBlock

[System.IO.File]::WriteAllText($file, $newContent, [System.Text.Encoding]::UTF8)
Write-Host "FIXED: Full-width clickable image layout applied!" -ForegroundColor Green
Write-Host ""
Write-Host "Refresh your browser to see the change." -ForegroundColor White
