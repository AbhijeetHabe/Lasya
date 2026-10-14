export const isIndianMobile = (value: string) => /^(?:\+91[- ]?)?[6-9]\d{9}$/.test(value.trim())
export const isIndianPinCode = (value: string) => /^[1-9]\d{5}$/.test(value.trim())