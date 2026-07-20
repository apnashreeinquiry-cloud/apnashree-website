// add-misc-category.js
// Client request: a catch-all heading for miscellaneous products.
//
// Your site ALREADY shows a heading called "OTHER PRODUCTS" (on the homepage and the
// All Products page). This script adds a new category called "Miscellaneous Products"
// underneath that heading, so any odd item that does not fit the other categories
// can be added into it from the Admin Panel.
//
// It only ADDS this one category. Your existing 13 main products, 9 other products,
// all sub-products and every image are left exactly as they are.
// Safe to run more than once (it refreshes this one category, never duplicates it).

const fs = require('fs');
const path = require('path');

const FILE = path.join('src', 'data', 'products.json');
if (!fs.existsSync(FILE)) {
  console.error('ERROR: ' + FILE + ' not found. Run this from your project root (apnashree-v4).');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
if (!Array.isArray(data.otherProducts) || !Array.isArray(data.mainProducts)) {
  console.error('ERROR: products.json is not in the expected format. Aborting (nothing changed).');
  process.exit(1);
}

const SLUG = 'miscellaneous-products-chennai';

const category = {
  slug: SLUG,
  name: 'Miscellaneous Products',
  brand: 'MULTIPLE BRANDS',
  type: 'other',
  category: 'General Industrial',
  heroDesc: 'A range of additional industrial items we supply on request. If you do not find what you need in our listed categories, ask us — with 36+ brand partnerships and 35+ years in the trade, we can usually source it.',
  metaTitle: 'Miscellaneous Industrial Products Chennai | Special Requirements | Apna Shree',
  metaDescription: 'Apna Shree supplies a wide range of additional industrial products in Chennai on request. Cannot find what you need? Call +91 73583 76280 — we source from 36+ trusted brands, PAN India delivery.',
  mainImage: '',
  tags: ['Multiple Brands', 'On Request', 'Custom Sourcing'],
  subProducts: []
};

// keep the existing sub-products if this category was already created earlier
const existing = data.otherProducts.find(p => p.slug === SLUG);
if (existing && Array.isArray(existing.subProducts) && existing.subProducts.length) {
  category.subProducts = existing.subProducts;
  if (existing.mainImage) category.mainImage = existing.mainImage;
  console.log('Note: category already existed — keeping its ' + existing.subProducts.length + ' sub-product(s) and image.');
}

const before = data.otherProducts.length;
data.otherProducts = data.otherProducts.filter(p => p.slug !== SLUG);
const existed = data.otherProducts.length !== before;
data.otherProducts.push(category);

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');

console.log((existed ? '\u21bb Refreshed' : '\u2713 Added') + ' category "Miscellaneous Products".');
console.log('  It appears under the existing "OTHER PRODUCTS" heading.');
console.log('  mainProducts: ' + data.mainProducts.length + ' (unchanged)');
console.log('  otherProducts: ' + data.otherProducts.length);
console.log('  sub-products inside it: ' + category.subProducts.length);

if (category.subProducts.length === 0) {
  console.log('\n  NEXT STEP: open apnashree.com/admin, find "Miscellaneous Products",');
  console.log('  and click "+ Add Sub-Product" to add your first item (with a photo).');
}
