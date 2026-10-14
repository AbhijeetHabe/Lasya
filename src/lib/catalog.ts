import type { Product } from '../data/products'

export type SortMode = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name'
export type CatalogFilters = { query: string; category: string; availability: 'all' | 'in-stock' | 'out-of-stock'; maxPrice: number; sort: SortMode }

export const defaultFilters: CatalogFilters = { query: '', category: '', availability: 'all', maxPrice: 500000, sort: 'featured' }

export function filterProducts(items: Product[], filters: CatalogFilters): Product[] {
  const query = filters.query.trim().toLocaleLowerCase('en-IN')
  const visible = items.filter((product) => {
    const haystack = [product.name, product.shortDescription, product.description, product.categoryId, product.sku, ...product.tags, product.materials, product.dimensions].join(' ').toLocaleLowerCase('en-IN')
    return (!query || haystack.includes(query))
      && (!filters.category || product.categoryId === filters.category)
      && (filters.availability === 'all' || product.availability === filters.availability)
      && product.pricePaise <= filters.maxPrice
  })

  return visible.sort((left, right) => {
    if (filters.sort === 'price-asc') return left.pricePaise - right.pricePaise
    if (filters.sort === 'price-desc') return right.pricePaise - left.pricePaise
    if (filters.sort === 'newest') return Number(right.isNew) - Number(left.isNew) || right.id.localeCompare(left.id)
    if (filters.sort === 'name') return left.name.localeCompare(right.name)
    return Number(right.isFeatured) - Number(left.isFeatured) || left.name.localeCompare(right.name)
  })
}