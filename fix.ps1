# ============================================================
# Apna Shree — Auto Fix Script
# Run this in PowerShell inside your project folder
# Command: powershell -ExecutionPolicy Bypass -File fix.ps1
# ============================================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Apna Shree — Auto Fix Running..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$root = Get-Location

# ── FILE PATHS ──────────────────────────────────────────────
$homePage      = Join-Path $root "src\app\page.js"
$productsPage  = Join-Path $root "src\app\products\page.js"
$slugPage      = Join-Path $root "src\app\products\[slug]\page.js"
$subslugPage   = Join-Path $root "src\app\products\[slug]\[subslug]\page.js"
$footer        = Join-Path $root "src\components\Footer.js"
$productCard   = Join-Path $root "src\components\ProductCard.js"
$productsData  = Join-Path $root "src\data\products.js"
$aboutPage     = Join-Path $root "src\app\about\page.js"

# ── FUNCTION: Replace text in file ──────────────────────────
function Fix-File {
    param($path, $old, $new, $desc)
    if (Test-Path $path) {
        $content = Get-Content $path -Raw -Encoding UTF8
        if ($content -match [regex]::Escape($old)) {
            $content = $content.Replace($old, $new)
            Set-Content $path $content -Encoding UTF8 -NoNewline
            Write-Host "  ✅ Fixed: $desc" -ForegroundColor Green
        }
    }
}

# ── FUNCTION: Replace with regex ────────────────────────────
function Fix-FileRegex {
    param($path, $pattern, $replacement, $desc)
    if (Test-Path $path) {
        $content = Get-Content $path -Raw -Encoding UTF8
        $newContent = [regex]::Replace($content, $pattern, $replacement)
        if ($newContent -ne $content) {
            Set-Content $path $newContent -Encoding UTF8 -NoNewline
            Write-Host "  ✅ Fixed: $desc" -ForegroundColor Green
        }
    }
}

Write-Host "1. Fixing Homepage (page.js)..." -ForegroundColor Yellow
Fix-File $homePage `
    '<span className="label">We Buy & Sell</span>' `
    '<span className="label">We Also Sell</span>' `
    "Homepage label: We Buy & Sell → We Also Sell"

Write-Host ""
Write-Host "2. Fixing Products Page..." -ForegroundColor Yellow
Fix-File $productsPage `
    '<span className="label">We Buy & Sell</span>' `
    '<span className="label">We Also Sell</span>' `
    "Products page label"
Fix-File $productsPage `
    "'🔄 Buy & Sell'" `
    "''" `
    "Products page badge text"
Fix-File $productsPage `
    "badge-buysell" `
    "badge-dealer" `
    "Products page badge class"

Write-Host ""
Write-Host "3. Fixing Product Detail Page [slug]..." -ForegroundColor Yellow
Fix-File $slugPage `
    "isMain ? 'Authorized Dealer' : 'Buy & Sell'" `
    "isMain ? 'Authorized Dealer' : ''" `
    "Slug page badge"
Fix-File $slugPage `
    "isMain ? '🏆' : '🔄'" `
    "isMain ? '🏆' : '📦'" `
    "Slug page icon"
Fix-File $slugPage `
    "We buy and sell" `
    "We also supply" `
    "Slug page description text"

Write-Host ""
Write-Host "4. Fixing Sub-Product Page [subslug]..." -ForegroundColor Yellow
Fix-File $subslugPage `
    "isMain ? 'Authorized Dealer' : 'Buy & Sell'" `
    "isMain ? 'Authorized Dealer' : ''" `
    "Subslug page badge"

Write-Host ""
Write-Host "5. Fixing Footer..." -ForegroundColor Yellow
Fix-File $footer `
    "<h4>🔄 Buy & Sell</h4>" `
    "<h4>We Also Sell</h4>" `
    "Footer column heading"

Write-Host ""
Write-Host "6. Fixing Product Card Component..." -ForegroundColor Yellow
Fix-File $productCard `
    "'🏆 Authorized' : '🔄 Buy & Sell'" `
    "'🏆 Authorized' : ''" `
    "ProductCard badge"

Write-Host ""
Write-Host "7. Fixing Products Data File..." -ForegroundColor Yellow
Fix-FileRegex $productsData `
    '"Buy & Sell", ' `
    '' `
    "Data file tags (leading)"
Fix-FileRegex $productsData `
    ', "Buy & Sell"' `
    '' `
    "Data file tags (trailing)"
Fix-FileRegex $productsData `
    '"Buy & Sell"' `
    '' `
    "Data file tags (standalone)"

Write-Host ""
Write-Host "8. Fixing About Page..." -ForegroundColor Yellow
Fix-File $aboutPage `
    "we also buy and sell surplus" `
    "we also supply surplus" `
    "About page text"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  All fixes applied successfully!" -ForegroundColor Green
Write-Host "  'Buy & Sell' → replaced with 'We Also Sell'" -ForegroundColor Green
Write-Host "  Your images and other data are untouched." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Now refresh your browser to see changes." -ForegroundColor White
Write-Host ""
