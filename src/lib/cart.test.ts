import { describe, expect, it } from 'vitest'
import { products } from '../data/products'
import { addCartEntry, cartSubtotal, countCartItems, normalizeCart, updateCartEntry } from './cart'

const diya = products.find((product) => product.id === 'ls-001')!
const candle = products.find((product) => product.id === 'ls-003')!

describe('cart rules', () => {
  it('caps quantities to the sample stock and rejects unavailable items', () => {
    expect(addCartEntry([], diya, 99)[0].quantity).toBe(diya.stockQuantity)
    expect(addCartEntry([], products.find((product) => product.id === 'ls-010')!).length).toBe(0)
  })

  it('uses selected variant pricing and stock for totals and quantity updates', () => {
    const cart = addCartEntry([], candle, 2, 'set-of-6')
    expect(cartSubtotal(cart)).toBe(319800)
    expect(countCartItems(cart)).toBe(2)
    expect(updateCartEntry(cart, candle.id, 99, 'set-of-6')[0].quantity).toBe(7)
  })

  it('drops invalid persisted entries and combines duplicate product variants', () => {
    const entries = normalizeCart([
      { productId: diya.id, quantity: 2 },
      { productId: diya.id, quantity: 3 },
      { productId: 'missing', quantity: 1 },
      { productId: candle.id, quantity: 1, variantId: 'not-a-variant' },
    ])
    expect(entries).toHaveLength(2)
    expect(entries[0].quantity).toBe(5)
    expect(entries[1].variantId).toBeUndefined()
  })
})