import { diwaliDiyasImage, imageUrl } from './images'

export type Category = { id: string; name: string; description: string; image: string; alt: string }
export type Collection = { id: string; slug: string; name: string; description: string; productIds?: string[]; categoryIds?: string[]; maxPricePaise?: number; image: string; alt: string }

const image = (id: string) => imageUrl(id, 1000)

export const categories: Category[] = [
  { id: 'diyas-lighting', name: 'Diyas & lighting', description: 'A warmer glow for every gathering.', image: diwaliDiyasImage, alt: 'A traditional earthenware diya lit against warm festive lights' },
  { id: 'festive-decor', name: 'Festive décor', description: 'Thoughtful details for a welcoming home.', image: image('photo-1616486338812-3dadae4b4ace'), alt: 'Warmly styled living space' },
  { id: 'candles', name: 'Candles', description: 'Soft light, quiet moments.', image: image('photo-1578749556568-bc2c40e68b61'), alt: 'Candles arranged for a calm evening' },
  { id: 'rangoli-decor', name: 'Rangoli', description: 'A beautiful beginning at the threshold.', image: image('photo-1600166898405-da9535204843'), alt: 'Patterned floor in warm festive colours' },
  { id: 'pooja-essentials', name: 'Pooja essentials', description: 'Meaningful pieces for cherished rituals.', image: image('photo-1610701596007-11502861dcfa'), alt: 'Ceramic ritual objects in a home' },
  { id: 'gift-hampers', name: 'Gift hampers', description: 'A considered gesture, beautifully gathered.', image: image('photo-1513201099705-a9746e1e201f'), alt: 'Thoughtfully wrapped gift with ribbon' },
  { id: 'festive-accessories', name: 'Festive accessories', description: 'Finishing touches for the season.', image: image('photo-1590736969955-71cc94901144'), alt: 'Richly coloured textile accessory' },
  { id: 'corporate-gifting', name: 'Corporate gifting', description: 'A thoughtful way to celebrate together.', image: image('photo-1607344645866-009c320b63e0'), alt: 'Gift presentation with refined wrapping' },
  { id: 'gift-packaging', name: 'Gift packaging', description: 'Every detail, a little more special.', image: image('photo-1607082349566-187342175e2f'), alt: 'Gift box finished with ribbon' },
]

export const collections: Collection[] = [
  { id: 'diwali-edit', slug: 'diwali-decor', name: 'The Diwali Edit', description: 'Light, colour and thoughtful details for the season of celebration.', categoryIds: ['diyas-lighting', 'festive-decor', 'candles', 'rangoli-decor', 'festive-accessories'], image: image('photo-1600210492486-724fe5c67fb0'), alt: 'Warm home interior with festive styling' },
  { id: 'ritual-essentials', slug: 'pooja-essentials', name: 'Ritual Essentials', description: 'Considered pieces for the rituals that bring us together.', categoryIds: ['pooja-essentials', 'diyas-lighting'], image: image('photo-1610701596007-11502861dcfa'), alt: 'Thoughtful ceramic objects for the home' },
  { id: 'premium-gifting', slug: 'gift-hampers', name: 'Thoughtful Gifting', description: 'Beautifully considered gestures for the people who matter.', categoryIds: ['gift-hampers', 'corporate-gifting', 'gift-packaging'], image: image('photo-1513201099705-a9746e1e201f'), alt: 'Elegant wrapping on a festive gift' },
  { id: 'corporate-edit', slug: 'corporate-gifts', name: 'Gifting for Teams', description: 'A sample edit for teams, clients and business associates. Bulk availability is not confirmed.', categoryIds: ['corporate-gifting'], image: image('photo-1607344645866-009c320b63e0'), alt: 'A neatly wrapped corporate gift' },
  { id: 'lighting-edit', slug: 'diyas-lighting', name: 'Diyas & Lighting', description: 'A warm glow for thresholds, quiet rituals and festive evenings.', categoryIds: ['diyas-lighting'], image: image('photo-1602874801007-bd458bb1b8b6'), alt: 'A candle glowing beside delicate lights' },
  { id: 'under-999-edit', slug: 'under-999', name: 'Gifts under ₹999', description: 'Small gestures, thoughtfully chosen. Prices are illustrative sample prices.', maxPricePaise: 99900, image: image('photo-1513201099705-a9746e1e201f'), alt: 'A carefully wrapped gift' },
  { id: 'gifts-under-999', slug: 'gifts-under-999', name: 'Gifts under ₹999', description: 'Small gestures, thoughtfully chosen. Prices are illustrative sample prices.', maxPricePaise: 99900, image: image('photo-1607082349566-187342175e2f'), alt: 'Gift wrapped for a special occasion' },
  { id: 'gifts-under-2499', slug: 'gifts-under-2499', name: 'Gifts under ₹2,499', description: 'A little more room for a memorable gesture. Sample prices only.', maxPricePaise: 249900, image: image('photo-1607344645866-009c320b63e0'), alt: 'Premium gift presentation' },
]

export const findCollection = (slug: string) => collections.find((collection) => collection.slug === slug)