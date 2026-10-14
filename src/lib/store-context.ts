import { createContext } from 'react'
import type { Product } from '../data/products'

export type CartEntry = { productId: string; quantity: number; variantId?: string }
export type StoreValue = {
  cart: CartEntry[]
  wishlist: string[]
  cartCount: number
  subtotal: number
  addToCart: (product: Product, quantity?: number, variantId?: string) => void
  setQuantity: (productId: string, quantity: number, variantId?: string) => void
  removeFromCart: (productId: string, variantId?: string) => void
  toggleWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
}

export const StoreContext = createContext<StoreValue | null>(null)