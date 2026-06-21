// coolant-brand-fix.js
// Safely renames the Coolant Pumps category brand from RAJAMANE to Century.
// Edits ONLY the main product's display + SEO text. Does NOT touch the URL slug,
// the sub-products, images, or any other product. Run from the project root.
const fs = require('fs');

const PATH = 'src/data/products.json';
const data = JSON.parse(fs.readFileSync(PATH, 'utf8'));

let changed = 0;
for (const prod of [...data.mainProducts, ...data.otherProducts]) {
  if (prod.slug === 'coolant-pumps-rajamane-chennai') {
    for (const field of ['brand', 'heroDesc', 'description', 'metaTitle', 'metaDescription']) {
      if (typeof prod[field] === 'string' && /RAJAMANE/i.test(prod[field])) {
        const before = prod[field];
        prod[field] = prod[field].replace(/RAJAMANE/gi, 'Century');
        if (prod[field] !== before) {
          changed++;
          console.log(`  ${field}: "${prod[field].slice(0, 80)}"`);
        }
      }
    }
  }
}

fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
console.log(changed > 0 ? `\nDone — ${changed} field(s) updated to "Century".` : '\nNothing matched — check the slug.');
