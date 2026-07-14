// remove-brands.js
// Client request: remove BONFIGLIOLI, REXROTH, YUKEN, FESTO from the website text. Add CENTURY.
//
// This edits TEXT ONLY (page titles, SEO tags, footer, hero, enquiry dropdown, About page).
// It does NOT touch src/data/products.json — your products and images are not changed at all.
// Safe to run twice: if something is already fixed, it just says "already clean".

const fs = require('fs');
const path = require('path');

// [ file , [ [find, replace], ... ] ]
const EDITS = [

  ['src/app/page.js', [
    // page title (shows in Google)
    [`CENLUB INTORQ BONFIGLIOLI PMI HIWIN`,
     `CENLUB INTORQ PMI HIWIN CENTURY`],
    // meta description
    [`CENLUB, INTORQ, PETHE, BONFIGLIOLI, PMI, HIWIN in Chennai`,
     `CENLUB, INTORQ, PETHE, PMI, HIWIN, CENTURY in Chennai`],
    // scrolling brand strip
    [`const brands = ['CENLUB','INTORQ','PETHE','BONFIGLIOLI','PMI','HIWIN','RAJAMANE','GROZ','NIPPON','NUTECK','ADONITECH','REXROTH','YUKEN','FESTO','JANATICS','KLUEBER','KYODO YUSHI','DEUBLIN','FENNER','TSUBAKI']`,
     `const brands = ['CENLUB','INTORQ','PETHE','CENTURY','PMI','HIWIN','ROLLON','RAJAMANE','GROZ','NIPPON','NUTECK','ADONITECH','JANATICS','KLUEBER','KYODO YUSHI','DEUBLIN','FENNER','TSUBAKI']`],
    // hero category labels
    [`label: 'Hydraulics — Rexroth / Yuken' }`,
     `label: 'Hydraulics — Reputed Brands' }`],
    [`label: 'Pneumatics — FESTO' }`,
     `label: 'Pneumatics — JANATICS' }`],
    // Google FAQ structured data
    [`{ "@type": "Question", "name": "Do you stock BONFIGLIOLI gearboxes in Chennai?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We are an authorized BONFIGLIOLI dealer in Chennai stocking helical, worm, bevel, and planetary gearboxes." } },`,
     `{ "@type": "Question", "name": "Do you stock industrial gearboxes in Chennai?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We stock helical, worm, bevel, and planetary gearboxes from reputed brands in Chennai." } },`],
    // hero line
    [`Authorized dealers for <strong>30+ global brands</strong> — CENLUB, INTORQ, BONFIGLIOLI, PMI, HIWIN, FESTO & more.`,
     `Authorized dealers for <strong>36+ global brands</strong> — CENLUB, INTORQ, PMI, HIWIN, CENTURY, ROLLON & more.`],
    // "Authorized Dealer" card
    [`desc: 'Bonfiglioli, PMI, HIWIN, INTORQ, CENLUB & more — genuine products with manufacturer warranty.'`,
     `desc: 'PMI, HIWIN, INTORQ, CENLUB, CENTURY & more — genuine products with manufacturer warranty.'`],
    // numbers, to match the About page (client's own figures)
    [`['500+', 'B2B CLIENTS SERVED']`, `['1500+', 'B2B CLIENTS SERVED']`],
    [`'🏆 30+ Authorized Brands'`, `'🏆 36+ Authorized Brands'`],
  ]],

  ['src/app/layout.js', [
    [`CENLUB, INTORQ, PETHE, BONFIGLIOLI, PMI, HIWIN in Chennai`,
     `CENLUB, INTORQ, PETHE, PMI, HIWIN, CENTURY in Chennai`],
    [`BONFIGLIOLI gearbox Chennai`, `industrial gearbox Chennai`],
    [`"Authorized dealer for CENLUB, INTORQ, PETHE, BONFIGLIOLI, PMI, HIWIN and 30+ industrial brands in Chennai, Tamil Nadu since 1990."`,
     `"Authorized dealer for CENLUB, INTORQ, PETHE, PMI, HIWIN, CENTURY and 36+ industrial brands in Chennai, Tamil Nadu since 1990."`],
  ]],

  ['src/components/Footer.js', [
    [`<span>Authorized: CENLUB | INTORQ | PETHE | BONFIGLIOLI | PMI | HIWIN</span>`,
     `<span>Authorized: CENLUB | INTORQ | PETHE | PMI | HIWIN | CENTURY</span>`],
  ]],

  ['src/components/LeadForm.js', [
    [`'Gear Boxes (BONFIGLIOLI/TRANSTECH)'`, `'Gear Boxes'`],
    [`'Hydraulic Products (YUKEN/REXROTH/PARKER)'`, `'Hydraulic Products'`],
    [`'Pneumatics (FESTO/JANATICS)'`, `'Pneumatics (JANATICS)'`],
    [`'Coolant Pumps (RAJAMANE)'`, `'Coolant Pumps (CENTURY)'`],
    // make the new Turcite product selectable in the enquiry form
    [`'Lubrication Systems (CENLUB)',`, `'Lubrication Systems (CENLUB)','Turcite Slydway Liner (ROLLON)',`],
  ]],

  ['src/components/HeroBg.js', [
    [`brand: 'YUKEN · REXROTH' }`, `brand: 'REPUTED BRANDS' }`],
    [`brand: 'FESTO · JANATICS' }`, `brand: 'JANATICS' }`],
  ]],

  ['src/app/products/page.js', [
    [`<p>Try: CENLUB, BONFIGLIOLI, brake, ball screw, coolant pump...</p>`,
     `<p>Try: CENLUB, Turcite, brake, ball screw, coolant pump...</p>`],
  ]],

  // About page — in case the updated about-page.js has not been put in place yet
  ['src/app/about/page.js', [
    [`We are the authorized dealer for 36+ globally trusted brands including Bonfiglioli, PMI, HIWIN, INTORQ, CENLUB, Rexroth, Festo, and Yuken.`,
     `We are the authorized dealer for 36+ globally trusted brands including PMI, HIWIN, INTORQ, CENLUB, CENTURY, and ROLLON.`],
    [`d: 'Bonfiglioli, PMI, HIWIN, INTORQ, CENLUB & more.'`,
     `d: 'PMI, HIWIN, INTORQ, CENLUB, CENTURY & more.'`],
    [`CENLUB, INTORQ, BONFIGLIOLI, PMI, HIWIN. 500+ B2B clients.`,
     `CENLUB, INTORQ, ROLLON, PMI, HIWIN. 1500+ B2B clients.`],
  ]],
];

let changed = 0, clean = 0, missing = 0;

for (const [file, rules] of EDITS) {
  const fp = path.join(...file.split('/'));
  if (!fs.existsSync(fp)) {
    console.log(`⚠ file not found: ${file}`);
    missing++;
    continue;
  }
  let txt = fs.readFileSync(fp, 'utf8');
  const before = txt;
  const notes = [];

  for (const [find, repl] of rules) {
    if (txt.includes(repl)) {
      clean++;   // already applied — do not apply again
    } else if (txt.includes(find)) {
      txt = txt.split(find).join(repl);
      notes.push('  ✓ ' + find.slice(0, 60).replace(/\s+/g, ' ') + '…');
      changed++;
    } else {
      notes.push('  ⚠ could not find: ' + find.slice(0, 60).replace(/\s+/g, ' ') + '…');
      missing++;
    }
  }

  if (txt !== before) {
    fs.writeFileSync(fp, txt);
    console.log(`\n${file}  — UPDATED`);
  } else {
    console.log(`\n${file}  — no change needed`);
  }
  notes.forEach(n => console.log(n));
}

console.log('\n--------------------------------------------');
console.log(`${changed} text change(s) made, ${clean} already clean, ${missing} not found.`);
console.log('products.json was NOT touched — all products and images are unchanged.');

// leftover check (text files only)
const scan = ['src/app/page.js', 'src/app/layout.js', 'src/components/Footer.js',
              'src/components/LeadForm.js', 'src/components/HeroBg.js',
              'src/app/products/page.js', 'src/app/about/page.js'];
const left = [];
for (const f of scan) {
  const fp = path.join(...f.split('/'));
  if (!fs.existsSync(fp)) continue;
  const t = fs.readFileSync(fp, 'utf8');
  for (const b of ['bonfiglioli', 'rexroth', 'yuken', 'festo']) {
    if (t.toLowerCase().includes(b)) left.push(`${f} → ${b}`);
  }
}
if (left.length) {
  console.log('\n⚠ Still mentioned in text files:');
  left.forEach(l => console.log('   ' + l));
} else {
  console.log('\n✓ Bonfiglioli / Rexroth / Yuken / Festo are gone from all site text.');
}
