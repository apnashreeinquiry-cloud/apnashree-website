# fix-domain.ps1 — Run from your project folder
# cd C:\Users\info\Downloads\apnashree-v4-SYNC\apnashree-v4
# powershell -ExecutionPolicy Bypass -File fix-domain.ps1

Write-Host "Updating domain apnashree.in → apnashree.com..." -ForegroundColor Cyan

$files = Get-ChildItem -Path "src" -Recurse -Include "*.js" | Select-Object -ExpandProperty FullName
$files += Get-ChildItem -Path "public" -Recurse -Include "*.xml","*.txt" -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName

foreach ($file in $files) {
    $text = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
    if ($text.Contains("apnashree.in")) {
        $text = $text.Replace("apnashree.in", "apnashree.com")
        [System.IO.File]::WriteAllText($file, $text, [System.Text.Encoding]::UTF8)
        Write-Host "  FIXED: $($file.Replace((Get-Location).Path, ''))" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Done! Domain updated to apnashree.com" -ForegroundColor Green
