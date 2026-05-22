# Save this as fix.ps1 in your project folder
# Run: powershell -ExecutionPolicy Bypass -File fix.ps1

Write-Host "Fixing files..." -ForegroundColor Cyan

function ReplaceInFile($file, $old, $new) {
    if (Test-Path $file) {
        $text = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
        if ($text.Contains($old)) {
            $text = $text.Replace($old, $new)
            [System.IO.File]::WriteAllText($file, $text, [System.Text.Encoding]::UTF8)
            Write-Host "FIXED: $file" -ForegroundColor Green
        } else {
            Write-Host "OK: $file" -ForegroundColor Gray
        }
    } else {
        Write-Host "NOT FOUND: $file" -ForegroundColor Red
    }
}

$f1 = "src\app\page.js"
$f2 = "src\app\products\page.js"
$f3 = "src\components\Footer.js"
$f4 = "src\components\ProductCard.js"
$f5 = "src\data\products.js"
$f6 = "src\app\about\page.js"
$f7 = "src\app\products\[slug]\page.js"
$f8 = "src\app\products\[slug]\[subslug]\page.js"

ReplaceInFile $f1 "We Buy & Sell" "We Also Sell"
ReplaceInFile $f2 "We Buy & Sell" "We Also Sell"
ReplaceInFile $f2 "badge-buysell" "badge-dealer"
ReplaceInFile $f3 "Buy & Sell" "We Also Sell"
ReplaceInFile $f5 ", `"Buy & Sell`"" ""
ReplaceInFile $f5 "`"Buy & Sell`", " ""
ReplaceInFile $f6 "buy and sell" "also supply"
ReplaceInFile $f7 "buy and sell" "also supply"

# Fix badge text in products page
$text = [System.IO.File]::ReadAllText($f2, [System.Text.Encoding]::UTF8)
$text = $text.Replace("'🔄 Buy & Sell'", "''")
[System.IO.File]::WriteAllText($f2, $text, [System.Text.Encoding]::UTF8)

# Fix product card
$text = [System.IO.File]::ReadAllText($f4, [System.Text.Encoding]::UTF8)
$text = $text.Replace("'🔄 Buy & Sell'", "''")
[System.IO.File]::WriteAllText($f4, $text, [System.Text.Encoding]::UTF8)

# Fix slug page
$text = [System.IO.File]::ReadAllText($f7, [System.Text.Encoding]::UTF8)
$text = $text.Replace("'Buy & Sell'", "''")
[System.IO.File]::WriteAllText($f7, $text, [System.Text.Encoding]::UTF8)

# Fix subslug page
$text = [System.IO.File]::ReadAllText($f8, [System.Text.Encoding]::UTF8)
$text = $text.Replace("'Buy & Sell'", "''")
[System.IO.File]::WriteAllText($f8, $text, [System.Text.Encoding]::UTF8)

Write-Host ""
Write-Host "ALL DONE! Refresh your browser." -ForegroundColor Green
