import type { Product } from '../data/products'
import { products } from '../data/products'
import type { CartEntry } from './store-context'

const productMap = new Map(products.map((product) => [product.id, product]))

export function quantityLimit(product: Product, variantId?: string) {
  return product.variants?.find((variant) => variant.id === variantId)?.stockQuantity ?? product.stockQuantity
}

export function addCartEntry(current: CartEntry[], product: Product, quantity = 1, variantId?: string): CartEntry[] {
  const limit = quantityLimit(product, variantId)
  if (product.availability !== 'in-stock' || limit < 1) return current
  const safeQuantity = Number.isFinite(quantity) ? Math.floor(quantity) : 1
  const bounded = Math.max(1, Math.min(safeQuantity, limit))
  const existing = current.find((entry) => entry.productId === product.id && entry.variantId === variantId)
  if (!existing) return [...current, { productId: product.id, quantity: bounded, variantId }]
  return current.map((entry) => entry === existing ? { ...entry, quantity: Math.min(limit, entry.quantity + bounded) } : entry)
}

export function updateCartEntry(current: CartEntry[], productId: string, quantity: number, variantId?: string): CartEntry[] {
  const product = productMap.get(productId)
  if (!product) return current.filter((entry) => entry.productId !== productId)
  const limit = quantityLimit(product, variantId)
  if (limit < 1) return current.filter((entry) => entry.productId !== productId || entry.variantId !== variantId)
  const safeQuantity = Number.isFinite(quantity) ? Math.floor(quantity) : 1
  const bounded = Math.min(Math.max(1, safeQuantity), limit)
  return current.map((entry) => entry.productId === productId && entry.variantId === variantId ? { ...entry, quantity: bounded } : entry)
}

export function normalizeCart(value: unknown): CartEntry[] {
  if (!Array.isArray(value)) return []
  return value.reduce<CartEntry[]>((items, candidate: unknown) => {
    if (!candidate || typeof candidate !== 'object') return items
    const entry = candidate as Partial<CartEntry>
    const product = typeof entry.productId === 'string' ? productMap.get(entry.productId) : undefined
    if (!product || !Number.isInteger(entry.quantity) || Number(entry.quantity) < 1) return items
    const variantId = typeof entry.variantId === 'string' && product.variants?.some((variant) => variant.id === entry.variantId) ? entry.variantId : undefined
    return addCartEntry(items, product, Number(entry.quantity), variantId)
  }, [])
}

export function cartSubtotal(cart: CartEntry[]) {
  return cart.reduce((sum, entry) => {
    const product = productMap.get(entry.productId)
    if (!product) return sum
    const variant = product.variants?.find((item) => item.id === entry.variantId)
    return sum + (variant?.pricePaise ?? product.pricePaise) * entry.quantity
  }, 0)
}

export const countCartItems = (cart: CartEntry[]) => cart.reduce((sum, entry) => sum + entry.quantity, 0)
export const normalizeWishlist = (value: unknown) => Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === 'string' && productMap.has(id)))] : []