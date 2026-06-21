// brand-updates.js
// Updates the brand badge + description + SEO text for Gear Boxes, Oil Skimmers,
// and Ball Screws. Touches ONLY these display/SEO fields — never the URL slug,
// sub-products, images, or any other product. Run from the project root.
const fs = require('fs');
const PATH = 'src/data/products.json';
const data = JSON.parse(fs.readFileSync(PATH, 'utf8'));

const updates = {
  'gear-boxes-bonfiglioli-transtech-chennai': {
    brand: 'REPUTED BRANDS',
    heroDesc: 'Authorized dealer for reputed gearbox brands — helical, worm, bevel, and planetary gearboxes for all industrial applications.',
    metaTitle: 'Gearbox Dealer Chennai | Helical, Worm & Planetary Gearbox Tamil Nadu | Apna Shree',
    metaDescription: 'Authorized dealer for reputed gearbox brands in Chennai. Helical, worm, bevel and planetary gearboxes for all industrial applications across Tamil Nadu.',
  },
  'oil-skimmers-rajamane-apna-chennai': {
    brand: 'APNA ENGINEERS',
    heroDesc: 'APNA ENGINEERS manufactures oil skimmers and also deals with reputed brands like RAJAMANE & MACRO CUT — belt and disc type for tramp oil removal from CNC machine coolant tanks.',
    metaTitle: 'Oil Skimmer Manufacturer & Dealer Chennai | Tramp Oil Remover Tamil Nadu | Apna Shree',
    metaDescription: 'APNA ENGINEERS manufactures oil skimmers and deals with reputed brands like RAJAMANE & MACRO CUT in Chennai. Belt and disc oil skimmers for CNC coolant tanks.',
  },
  'ball-screws-lm-systems-pmi-hiwin-chennai': {
    brand: 'PMI',
    heroDesc: 'Authorized dealer for PMI — precision ball screws and LM guide systems for CNC machining centers.',
    metaTitle: 'PMI Ball Screw Dealer Chennai | LM Guide System Tamil Nadu | Apna Shree',
    metaDescription: 'Authorized dealer for PMI in Chennai. Precision ball screws and LM guide systems for CNC machining centers across Tamil Nadu.',
  },
};

let count = 0;
for (const prod of [...data.mainProducts, ...data.otherProducts]) {
  const u = updates[prod.slug];
  if (u) { Object.assign(prod, u); count++; console.log(`Updated: ${prod.name}  ->  "${u.brand}"`); }
}
fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
console.log(`\nDone — ${count} of 3 categories updated.`);
