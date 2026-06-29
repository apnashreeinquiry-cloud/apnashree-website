// add-turcite-product.js
// Safely ADDS the "Turcite Slydway Liner" main product (Rollon Bearings) to products.json.
// It edits your CURRENT products.json in place — it does NOT overwrite the file with old data,
// so all your existing products and images are left exactly as they are.
// Safe to run more than once (it refreshes this one product, never duplicates it).

const fs = require('fs');
const path = require('path');

const FILE = path.join('src', 'data', 'products.json');
if (!fs.existsSync(FILE)) {
  console.error('ERROR: ' + FILE + ' not found. Run this from your project root (apnashree-v4).');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
if (!Array.isArray(data.mainProducts)) {
  console.error('ERROR: products.json has no mainProducts array. Aborting (nothing changed).');
  process.exit(1);
}

const MAIN_SLUG = 'turcite-slydway-liner-rollon-chennai';
const SUB_SLUG  = 'rollon-turcite-b-slydway-chennai';
const IMG1 = '/images/products/rollon-turcite-b-slydway-chennai-image-1782747200001.jpg'; // green roll (front)
const IMG2 = '/images/products/rollon-turcite-b-slydway-chennai-image-1782747200002.jpg'; // curved strips (gallery)

const subProduct = {
  name: "Rollon Turcite 'B' Slydway",
  brand: "ROLLON BEARINGS",
  heroDesc: "Self-lubricating, wear-resistant slideway liner material — a PTFE and sintered-bronze formulation that gives machine tool ways low friction, no stick-slip, and excellent positional accuracy.",
  description: "Rollon Turcite 'B' Slydway is a self-lubricating, wear-resistant bearing material for machine tool slideways and linear-movement applications. Made from PTFE combined with sintered bronze and special wear-resistant additives, it provides a very low coefficient of friction between two moving metal surfaces — eliminating stick-slip, damping vibration, and improving accuracy and repeatability. It can run dry without damaging the mating slide and is simple to install and finish using conventional machining methods. Apna Shree has been an authorized dealer for ROLLON Bearings Pvt. Ltd., Bangalore since 1993.",
  specifications: [
    "Material: PTFE + sintered bronze with special wear-resistant additives",
    "Standard thicknesses: 0.8, 1.0, 1.6, 2.5, 3.2 and 4.0 mm",
    "Standard width: 12 inches (other widths on request)",
    "Length: cut to your requirement",
    "Recommended mating surface hardness: 180–220 BHN or higher",
    "Recommended surface finish: 0.4 µm (max 0.5 µm)",
    "Low coefficient of friction — can run dry without damaging the mating slide"
  ],
  applications: [
    "Machine tool slideways and guideways",
    "Combined linear, linear, prism and dovetail guidance",
    "Transfer lines and linear-movement systems",
    "Turret tool holders and machine tables",
    "Any application where low friction and wear resistance are critical"
  ],
  tags: ["ROLLON", "Turcite B", "Self-Lubricating", "Slideway Liner", "Low Friction"],
  keywords: [
    "Turcite B slideway liner Chennai",
    "Rollon Turcite slydway Tamil Nadu",
    "self lubricating slideway material",
    "machine tool way liner supplier Chennai",
    "PTFE bronze slideway liner India"
  ],
  image: IMG1,
  sheetImage: "",
  images: [IMG2],
  metaTitle: "Rollon Turcite 'B' Slydway Liner Chennai | Self-Lubricating Slideway Material | Apna Shree",
  metaDescription: "Buy Rollon Turcite 'B' slydway liner material in Chennai. Self-lubricating PTFE-bronze slideway liner for machine tool ways — low friction, no stick-slip, high accuracy. Authorized ROLLON dealer since 1993, PAN India delivery.",
  slug: SUB_SLUG,
  parentSlug: MAIN_SLUG,
  parentName: "Turcite Slydway Liner"
};

const mainProduct = {
  slug: MAIN_SLUG,
  name: "Turcite Slydway Liner",
  brand: "ROLLON BEARINGS",
  type: "main",
  category: "Linear Motion",
  heroDesc: "Authorized ROLLON Bearings dealer since 1993 — Turcite 'B' self-lubricating slideway liner material for machine tool ways. Reduces friction and stick-slip, improves accuracy, and runs dry without damaging the mating slide.",
  metaTitle: "Turcite 'B' Slideway Liner Dealer Chennai | ROLLON Slydway Material Tamil Nadu | Apna Shree",
  metaDescription: "Authorized ROLLON Bearings dealer in Chennai for Turcite 'B' slideway liner material since 1993. Self-lubricating, wear-resistant PTFE-bronze slydway for machine tool ways, available in 6 thicknesses. PAN India delivery.",
  mainImage: IMG1,
  tags: ["ROLLON", "Turcite B", "Authorized Dealer", "Slideway Liner", "Self-Lubricating"],
  subProducts: [subProduct]
};

// idempotent: drop any existing copy of this product, then add the fresh one at the end
const before = data.mainProducts.length;
data.mainProducts = data.mainProducts.filter(p => p.slug !== MAIN_SLUG);
const existed = data.mainProducts.length !== before;
data.mainProducts.push(mainProduct);

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');

console.log((existed ? '↻ Refreshed' : '✓ Added') + ' "Turcite Slydway Liner" (Rollon Bearings).');
console.log('  mainProducts is now ' + data.mainProducts.length + ' items; otherProducts untouched (' + (data.otherProducts ? data.otherProducts.length : 0) + ').');

// friendly check that the image files are in place
const pub = path.join('public', 'images', 'products');
[IMG1, IMG2].forEach(p => {
  const fp = path.join(pub, path.basename(p));
  if (!fs.existsSync(fp)) {
    console.log('  ⚠ image not found yet: ' + fp + '  (copy it there before you push)');
  } else {
    console.log('  ✓ image present: ' + fp);
  }
});
