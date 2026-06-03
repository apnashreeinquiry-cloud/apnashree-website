// Apna Shree product catalog
// Data now lives in products.json so the admin panel can edit it and commit it
// back to the repo (permanent storage). This file keeps the SAME exports every
// page already imports, so nothing else needs to change.
import data from './products.json'

export const mainProducts = data.mainProducts
export const otherProducts = data.otherProducts

export const allProducts = [...mainProducts, ...otherProducts]

export function getAllSubProducts() {
  const subs = []
  allProducts.forEach(p => {
    (p.subProducts || []).forEach(s => subs.push(s))
  })
  return subs
}

export function findProduct(slug) {
  return allProducts.find(p => p.slug === slug)
}

export function findSubProduct(parentSlug, subSlug) {
  const parent = findProduct(parentSlug)
  if (!parent) return null
  return (parent.subProducts || []).find(s => s.slug === subSlug)
}

export default allProducts