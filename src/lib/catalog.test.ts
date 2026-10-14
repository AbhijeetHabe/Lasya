import { describe, expect, it } from 'vitest'
import { products } from '../data/products'
import { defaultFilters, filterProducts } from './catalog'

describe('catalogue discovery', () => {
  it('searches descriptions, category fields and tags', () => {
    expect(filterProducts(products, { ...defaultFilters, query: 'lotus' }).map((product) => product.id)).toContain('ls-002')
    expect(filterProducts(products, { ...defaultFilters, query: 'pooja' }).length).toBeGreaterThan(0)
  })

  it('combines availability and category filters', () => {
    const result = filterProducts(products, { ...defaultFilters, category: 'diyas-lighting', availability: 'out-of-stock' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((product) => product.categoryId === 'diyas-lighting' && product.availability === 'out-of-stock')).toBe(true)
  })

  it('sorts by INR price in both directions', () => {
    const lowToHigh = filterProducts(products, { ...defaultFilters, sort: 'price-asc' })
    const highToLow = filterProducts(products, { ...defaultFilters, sort: 'price-desc' })
    expect(lowToHigh[0].pricePaise).toBeLessThanOrEqual(lowToHigh.at(-1)!.pricePaise)
    expect(highToLow[0].pricePaise).toBeGreaterThanOrEqual(highToLow.at(-1)!.pricePaise)
  })
})