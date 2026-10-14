import { useEffect, useState, type ReactNode } from 'react'
import type { Product } from '../data/products'
import { safeRead, safeWrite } from './format'
import { addCartEntry, cartSubtotal as calculateCartSubtotal, countCartItems, normalizeCart, normalizeWishlist, updateCartEntry } from './cart'
import { StoreContext, type CartEntry } from './store-context'

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartEntry[]>(() => normalizeCart(safeRead<unknown>('lasya-cart-v1', [])))
  const [wishlist, setWishlist] = useState<string[]>(() => normalizeWishlist(safeRead<unknown>('lasya-wishlist-v1', [])))

  useEffect(() => safeWrite('lasya-cart-v1', cart), [cart])
  useEffect(() => safeWrite('lasya-wishlist-v1', wishlist), [wishlist])

  const addToCart = (product: Product, quantity = 1, variantId?: string) => {
    setCart((current) => addCartEntry(current, product, quantity, variantId))
  }

  const setQuantity = (productId: string, quantity: number, variantId?: string) => {
    setCart((current) => updateCartEntry(current, productId, quantity, variantId))
  }

  const removeFromCart = (productId: string, variantId?: string) =>
    setCart((current) => current.filter((entry) => entry.productId !== productId || entry.variantId !== variantId))

  const toggleWishlist = (productId: string) => setWishlist((current) =>
    current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId])

  const cartCount = countCartItems(cart)
  const subtotal = calculateCartSubtotal(cart)

  return <StoreContext.Provider value={{ cart, wishlist, cartCount, subtotal, addToCart, setQuantity, removeFromCart, toggleWishlist, isWishlisted: (id) => wishlist.includes(id) }}>{children}</StoreContext.Provider>
}