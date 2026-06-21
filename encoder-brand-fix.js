// encoder-brand-fix.js
// Updates the Encoder Couplings category brand + description + SEO text to "DURI & SB".
// Touches ONLY these display/SEO fields — never the slug, sub-products, or images.
const fs = require('fs');
const PATH = 'src/data/products.json';
const data = JSON.parse(fs.readFileSync(PATH, 'utf8'));

const updates = {
  'encoder-couplings-duri-rw-kbk-chennai': {
    brand: 'DURI & SB',
    heroDesc: 'Authorized dealer for DURI & SB — zero-backlash encoder and servo couplings for CNC and automation.',
    metaTitle: 'Encoder Coupling Dealer Chennai | DURI & SB Couplings Tamil Nadu | Apna Shree',
    metaDescription: 'Authorized dealer for DURI & SB encoder couplings in Chennai. Zero-backlash servo couplings for CNC and automation. Call +91 73583 76280.',
  },
};

let count = 0;
for (const prod of [...data.mainProducts, ...data.otherProducts]) {
  const u = updates[prod.slug];
  if (u) { Object.assign(prod, u); count++; console.log(`Updated: ${prod.name} -> "${u.brand}"`); }
}
fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
console.log(`\nDone — ${count} updated.`);
