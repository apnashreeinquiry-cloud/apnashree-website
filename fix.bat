@echo off
echo.
echo ========================================
echo   Apna Shree - Fixing Buy and Sell...
echo ========================================
echo.

cd /d "%~dp0"

powershell -ExecutionPolicy Bypass -Command ^
"$files = @('src\app\page.js','src\app\products\page.js','src\components\Footer.js','src\components\ProductCard.js','src\data\products.js','src\app\about\page.js','src\app\products\[slug]\page.js','src\app\products\[slug]\[subslug]\page.js'); ^
$replacements = @( ^
  @('We Buy & Sell','We Also Sell'), ^
  @('🔄 Buy & Sell',''), ^
  @(\"'Buy & Sell'\",''), ^
  @('\"Buy & Sell\", ',''), ^
  @(', \"Buy & Sell\"',''), ^
  @('badge-buysell','badge-dealer'), ^
  @('buy and sell','also supply'), ^
  @('Buy and sell','Also supply') ^
); ^
foreach (\$f in \$files) { ^
  if (Test-Path \$f) { ^
    \$c = Get-Content \$f -Raw -Encoding UTF8; ^
    \$orig = \$c; ^
    foreach (\$r in \$replacements) { \$c = \$c.Replace(\$r[0],\$r[1]) } ^
    if (\$c -ne \$orig) { Set-Content \$f \$c -Encoding UTF8 -NoNewline; Write-Host 'Fixed:' \$f -ForegroundColor Green } ^
    else { Write-Host 'OK (no change):' \$f -ForegroundColor Gray } ^
  } ^
}"

echo.
echo ========================================
echo   Done! Refresh your browser.
echo ========================================
echo.
pause
