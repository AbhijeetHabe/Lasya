import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import {
  AboutPage,
  CartPage,
  CheckoutPage,
  CollectionPage,
  HomePage,
  JournalArticlePage,
  JournalPage,
  NotFoundPage,
  ProductPage,
  SearchPage,
  ShopPage,
  SupportingPage,
  WishlistPage,
} from './pages/StorePages'
import { findProduct } from './data/products'
import { findCollection } from './data/collections'
import { articlePreviews, pageContent } from './data/content'

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'LASYA | Ritual of Elegance', description: 'Thoughtfully curated festive treasures and elegant gifts for the moments that bring us together.' },
  '/shop': { title: 'The Collection | LASYA', description: 'Browse the LASYA sample collection of festive décor, lighting, rituals and thoughtful gifts.' },
  '/search': { title: 'Search | LASYA', description: 'Search the LASYA sample collection.' },
  '/cart': { title: 'Your Bag | LASYA', description: 'Review your sample selection in the LASYA static storefront.' },
  '/wishlist': { title: 'Wishlist | LASYA', description: 'Your locally saved LASYA sample pieces.' },
  '/checkout': { title: 'Demo Checkout | LASYA', description: 'A local checkout demonstration. No order or payment will be placed.' },
  '/about': { title: 'Our Story | LASYA', description: 'Discover the LASYA Ritual of Elegance philosophy.' },
  '/contact': { title: 'Contact | LASYA', description: 'Contact LASYA using a local-only form demonstration.' },
  '/faq': { title: 'FAQs | LASYA', description: 'Helpful details about the LASYA static storefront preview.' },
  '/journal': { title: 'Journal | LASYA', description: 'Sample festive inspiration and gifting guides from LASYA.' },
  '/shipping-policy': { title: 'Shipping Information | LASYA', description: 'Shipping details awaiting merchant confirmation.' },
  '/return-refund-policy': { title: 'Returns & Refunds | LASYA', description: 'Return and refund details awaiting merchant confirmation.' },
  '/privacy-policy': { title: 'Privacy Notice | LASYA', description: 'Privacy information for the LASYA static storefront preview.' },
  '/terms': { title: 'Terms of Use | LASYA', description: 'Terms awaiting merchant review.' },
  '/terms-and-conditions': { title: 'Terms of Use | LASYA', description: 'Terms awaiting merchant review.' },
}

function PageMetadata() {
  const { pathname } = useLocation()
  useEffect(() => {
    const productSlug = pathname.startsWith('/products/') ? pathname.split('/').at(-1) : undefined
    const product = productSlug ? findProduct(productSlug) : undefined
    const collectionSlug = pathname.startsWith('/collections/') ? pathname.split('/').at(-1) : undefined
    const collection = collectionSlug ? findCollection(collectionSlug) : undefined
    const articleSlug = pathname.startsWith('/journal/') ? pathname.split('/').at(-1) : undefined
    const article = articleSlug ? articlePreviews.find((item) => item.slug === articleSlug) : undefined
    const supportPage = pathname.startsWith('/') ? pageContent[pathname.slice(1)] : undefined
    const meta = product
      ? { title: `${product.name} | LASYA`, description: product.shortDescription }
      : collection
        ? { title: `${collection.name} | LASYA`, description: collection.description }
        : article
          ? { title: `${article.title} | LASYA Journal`, description: article.excerpt }
          : supportPage
            ? { title: `${supportPage.title} | LASYA`, description: supportPage.intro }
            : routeMeta[pathname] ?? { title: 'LASYA | Ritual of Elegance', description: 'A static preview of the LASYA festive and gifting collection.' }
    document.title = meta.title
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.append(description)
    }
    description.content = meta.description
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.append(robots)
    }
    robots.content = ['/search', '/cart', '/checkout', '/wishlist'].includes(pathname) ? 'noindex,follow' : 'index,follow'
  }, [pathname])
  return null
}

export default function App() {
  return <>
    <PageMetadata />
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="collections/:slug" element={<CollectionPage />} />
        <Route path="products/:slug" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<SupportingPage pageKey="contact" />} />
        <Route path="faq" element={<SupportingPage pageKey="faq" />} />
        <Route path="shipping-policy" element={<SupportingPage pageKey="shipping-policy" />} />
        <Route path="return-refund-policy" element={<SupportingPage pageKey="return-refund-policy" />} />
        <Route path="privacy-policy" element={<SupportingPage pageKey="privacy-policy" />} />
        <Route path="terms" element={<SupportingPage pageKey="terms" />} />
        <Route path="terms-and-conditions" element={<SupportingPage pageKey="terms-and-conditions" />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="journal/:slug" element={<JournalArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </>
}