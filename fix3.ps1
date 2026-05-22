# Fix the [slug] files - Windows path fix
Write-Host "Fixing slug pages..." -ForegroundColor Cyan

# Find the actual files using wildcard
$slugPage = Get-ChildItem -Path "src\app\products" -Recurse -Filter "page.js" | 
    Where-Object { $_.FullName -match "\[slug\]" -and $_.FullName -notmatch "\[subslug\]" } |
    Select-Object -First 1

$subSlugPage = Get-ChildItem -Path "src\app\products" -Recurse -Filter "page.js" | 
    Where-Object { $_.FullName -match "\[subslug\]" } |
    Select-Object -First 1

if ($slugPage) {
    Write-Host "Found: $($slugPage.FullName)" -ForegroundColor Gray
    $text = [System.IO.File]::ReadAllText($slugPage.FullName, [System.Text.Encoding]::UTF8)
    $text = $text.Replace("'Buy & Sell'", "''")
    $text = $text.Replace("buy and sell", "also supply")
    $text = $text.Replace("Buy and sell", "Also supply")
    [System.IO.File]::WriteAllText($slugPage.FullName, $text, [System.Text.Encoding]::UTF8)
    Write-Host "FIXED: [slug]\page.js" -ForegroundColor Green
} else {
    Write-Host "NOT FOUND: [slug]\page.js" -ForegroundColor Red
}

if ($subSlugPage) {
    Write-Host "Found: $($subSlugPage.FullName)" -ForegroundColor Gray
    $text = [System.IO.File]::ReadAllText($subSlugPage.FullName, [System.Text.Encoding]::UTF8)
    $text = $text.Replace("'Buy & Sell'", "''")
    $text = $text.Replace("buy and sell", "also supply")
    [System.IO.File]::WriteAllText($subSlugPage.FullName, $text, [System.Text.Encoding]::UTF8)
    Write-Host "FIXED: [slug]\[subslug]\page.js" -ForegroundColor Green
} else {
    Write-Host "NOT FOUND: [slug]\[subslug]\page.js" -ForegroundColor Red
}

Write-Host ""
Write-Host "ALL DONE! Refresh browser." -ForegroundColor Green
