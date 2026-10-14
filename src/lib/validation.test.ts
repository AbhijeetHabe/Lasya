import { describe, expect, it } from 'vitest'
import { isIndianMobile, isIndianPinCode } from './validation'

describe('Indian checkout field validation', () => {
  it('accepts ten-digit Indian mobile numbers with an optional +91 prefix', () => {
    expect(isIndianMobile('9876543210')).toBe(true)
    expect(isIndianMobile('+91 9876543210')).toBe(true)
    expect(isIndianMobile('1234567890')).toBe(false)
  })

  it('requires a six-digit PIN code that does not begin with zero', () => {
    expect(isIndianPinCode('560001')).toBe(true)
    expect(isIndianPinCode('056001')).toBe(false)
    expect(isIndianPinCode('56001')).toBe(false)
  })
})