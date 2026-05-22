# Fix image sizes - run from project folder
Write-Host "Fixing image sizes..." -ForegroundColor Cyan

function ReplaceInFile($file, $old, $new) {
    if (Test-Path $file) {
        $text = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
        if ($text.Contains($old)) {
            $text = $text.Replace($old, $new)
            [System.IO.File]::WriteAllText($file, $text, [System.Text.Encoding]::UTF8)
            Write-Host "FIXED: $file" -ForegroundColor Green
        } else {
            Write-Host "OK (already fixed): $file" -ForegroundColor Gray
        }
    } else {
        Write-Host "NOT FOUND: $file" -ForegroundColor Red
    }
}

# 1. Fix main product image height 280 -> 420 and cover -> contain in CSS
ReplaceInFile "src\app\globals.css" `
    ".main-prod-img{height:280px;overflow:hidden;background:var(--bg3);position:relative;}" `
    ".main-prod-img{height:420px;overflow:hidden;background:var(--bg3);position:relative;}"

ReplaceInFile "src\app\globals.css" `
    ".main-prod-img img{width:100%;height:100%;object-fit:cover;display:block;}" `
    ".main-prod-img img{width:100%;height:100%;object-fit:contain;display:block;background:var(--bg3);}"

# 2. Fix sub-product card height 140 -> 220 in CSS
ReplaceInFile "src\app\globals.css" `
    ".sub-card-img{height:140px;" `
    ".sub-card-img{height:220px;"

# 3. Fix sub-product card images in products page
ReplaceInFile "src\app\products\page.js" `
    "height: 140, objectFit: 'cover'" `
    "height: 220, objectFit: 'contain'"

ReplaceInFile "src\app\products\page.js" `
    "height: 140, display:" `
    "height: 220, display:"

Write-Host ""

# 4. Fix [slug] page - use Get-ChildItem for bracket paths
$slugPage = Get-ChildItem -Path "src\app\products" -Recurse -Filter "page.js" | 
    Where-Object { $_.FullName -match "\[slug\]" -and $_.FullName -notmatch "\[subslug\]" } |
    Select-Object -First 1

if ($slugPage) {
    $text = [System.IO.File]::ReadAllText($slugPage.FullName, [System.Text.Encoding]::UTF8)
    $changed = $false
    if ($text.Contains("height: 160, objectFit: 'cover'")) {
        $text = $text.Replace("height: 160, objectFit: 'cover'", "height: 220, objectFit: 'contain'")
        $changed = $true
    }
    if ($text.Contains("height: 160, display:")) {
        $text = $text.Replace("height: 160, display:", "height: 220, display:")
        $changed = $true
    }
    if ($changed) {
        [System.IO.File]::WriteAllText($slugPage.FullName, $text, [System.Text.Encoding]::UTF8)
        Write-Host "FIXED: [slug]\page.js" -ForegroundColor Green
    } else {
        Write-Host "OK: [slug]\page.js" -ForegroundColor Gray
    }
}

# 5. Fix [subslug] page
$subSlugPage = Get-ChildItem -Path "src\app\products" -Recurse -Filter "page.js" | 
    Where-Object { $_.FullName -match "\[subslug\]" } |
    Select-Object -First 1

if ($subSlugPage) {
    $text = [System.IO.File]::ReadAllText($subSlugPage.FullName, [System.Text.Encoding]::UTF8)
    $changed = $false
    if ($text.Contains("height: 120, objectFit: 'cover'")) {
        $text = $text.Replace("height: 120, objectFit: 'cover'", "height: 180, objectFit: 'contain'")
        $changed = $true
    }
    if ($text.Contains("height: 120, display:")) {
        $text = $text.Replace("height: 120, display:", "height: 180, display:")
        $changed = $true
    }
    if ($text.Contains("height: 360, objectFit: 'cover'")) {
        $text = $text.Replace("height: 360, objectFit: 'cover'", "height: 420, objectFit: 'contain'")
        $changed = $true
    }
    if ($changed) {
        [System.IO.File]::WriteAllText($subSlugPage.FullName, $text, [System.Text.Encoding]::UTF8)
        Write-Host "FIXED: [slug]\[subslug]\page.js" -ForegroundColor Green
    } else {
        Write-Host "OK: [slug]\[subslug]\page.js" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Image sizes fixed! Refresh browser." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
