import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, ChevronDown, Heart, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { categories, findCollection } from '../data/collections'
import { articlePreviews, faqs, pageContent } from '../data/content'
import { diwaliDiyasCredit, diwaliDiyasImage } from '../data/images'
import { findProduct, products, type Product } from '../data/products'
import { defaultFilters, filterProducts, type CatalogFilters } from '../lib/catalog'
import { formatINR } from '../lib/format'
import { useStore } from '../lib/useStore'
import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'

const campaignImage = diwaliDiyasImage

function ProductGrid({ items, emptyTitle = 'Nothing in this edit just yet' }: { items: Product[]; emptyTitle?: string }) {
  if (!items.length) return <div className="empty-state"><span className="empty-mark">✳</span><h3>{emptyTitle}</h3><p>Try adjusting your search or explore another part of the collection.</p><Link className="button button-outline" to="/shop">Browse all pieces</Link></div>
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) return
    setMessage('Demo only: your email was not sent or recorded.')
  }
  return <section className="newsletter-band"><div className="newsletter-copy"><span className="eyebrow">A letter from LASYA</span><h2>Make room for a little wonder.</h2><p>Seasonal inspiration and thoughtful gifting ideas, when they are ready to share.</p></div><form className="newsletter-form" onSubmit={submit}><label htmlFor="newsletter-email">Your email address</label><div className="newsletter-input"><input id="newsletter-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /><button type="submit" aria-label="Submit email"><ArrowRight size={19} /></button></div><p className="form-note">Preview only. This form does not subscribe or transmit your email.</p>{message && <p className="form-feedback" role="status">{message}</p>}</form></section>
}

export function HomePage() {
  const featured = products.filter((product) => product.isFeatured && product.availability === 'in-stock').slice(0, 4)
  const newArrivals = products.filter((product) => product.isNew && product.availability === 'in-stock').slice(0, 4)
  return <>
    <section className="home-hero" style={{ backgroundImage: `url("${campaignImage}")` }}>
      <div className="hero-shade" />
      <div className="hero-content"><span className="eyebrow eyebrow-light">A season to gather</span><h1>Make every<br />celebration <em>extraordinary.</em></h1><p>Thoughtfully curated festive treasures and elegant gifts for the moments that bring us together.</p><div className="hero-actions"><Link className="button button-gold" to="/collections/diwali-decor">Shop the Diwali edit <ArrowRight size={16} /></Link><Link className="text-link text-link-light" to="/collections/gift-hampers">Explore gifting <span aria-hidden="true">↗</span></Link></div></div>
      <span className="hero-caption">The art of gathering, considered.</span>
      <a className="hero-credit" href={diwaliDiyasCredit.source} target="_blank" rel="noreferrer">“{diwaliDiyasCredit.title}” · {diwaliDiyasCredit.artist} · {diwaliDiyasCredit.license}</a>
      <div className="hero-index"><span>01</span><i /><span>03</span></div>
    </section>

    <section className="section category-section content-width"><SectionHeading eyebrow="A considered collection" title="Find your kind of festive" action={<Link className="text-link" to="/shop">View everything <ArrowRight size={15} /></Link>} /><div className="category-grid">{categories.slice(0, 6).map((category, index) => <Link className={`category-tile category-tile-${index + 1}`} to={`/shop?category=${category.id}`} key={category.id}><img src={category.image} alt={category.alt} loading="lazy" /><span className="category-tile-overlay" /><span className="category-tile-copy"><small>DISCOVER</small><strong>{category.name}</strong><span>{category.description}</span></span><span className="tile-arrow"><ArrowRight size={17} /></span></Link>)}</div></section>

    <section className="section featured-section content-width"><SectionHeading eyebrow="Chosen for the season" title="A few favourites" action={<Link className="text-link" to="/shop?sort=featured">Shop the edit <ArrowRight size={15} /></Link>} /><ProductGrid items={featured} /></section>

    <section className="collection-feature"><div className="collection-feature-image"><img src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1500&q=85" alt="Warm candlelight and delicate string lights in a festive home" loading="lazy" /></div><div className="collection-feature-copy"><span className="eyebrow">The Diwali edit</span><span className="ornament-line" aria-hidden="true" /><h2>Let the light<br />find its way in.</h2><p>From a welcoming threshold to the last glow of the evening, discover considered details for a celebration that feels like you.</p><Link className="button button-dark" to="/collections/diwali-decor">Explore the collection <ArrowRight size={16} /></Link><span className="feature-note">A little light, a lot of meaning.</span></div></section>

    <section className="section gifting-section content-width"><SectionHeading eyebrow="Thoughtfully chosen. Beautifully remembered." title="A gift for every kind of person" /><div className="gift-guide-grid"><Link to="/collections/gift-hampers" className="gift-guide gift-guide-family"><img src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1100&q=84" alt="A carefully wrapped present for someone special" loading="lazy" /><span><small>FOR THE PEOPLE WHO FEEL LIKE HOME</small><strong>Family & friends</strong><span>Explore gifts <ArrowRight size={14} /></span></span></Link><Link to="/collections/corporate-gifts" className="gift-guide gift-guide-host"><img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1100&q=84" alt="A gift box prepared for a host" loading="lazy" /><span><small>FOR THE DOOR THAT'S ALWAYS OPEN</small><strong>Hosts & gracious guests</strong><span>Explore gifts <ArrowRight size={14} /></span></span></Link></div><div className="budget-row"><span className="eyebrow">A lovely little gesture</span><Link to="/collections/gifts-under-999">Under ₹999 <ArrowRight size={14} /></Link><Link to="/collections/gifts-under-2499">Under ₹2,499 <ArrowRight size={14} /></Link><Link to="/collections/gift-hampers">A little more to give <ArrowRight size={14} /></Link></div></section>

    <section className="packaging-band"><div className="packaging-visual"><img src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=1300&q=85" alt="A gift wrapped with quiet, considered detail" loading="lazy" /><span className="packaging-stamp">A LITTLE<br />MORE<br />SPECIAL</span></div><div className="packaging-copy"><span className="eyebrow">The finishing touch</span><h2>Every detail,<br /><em>a little more special.</em></h2><p>Gift-ready details are part of the thought. Explore sample pieces designed to make giving feel just as lovely as receiving.</p><Link className="text-link" to="/collections/gift-hampers">Explore thoughtful gifting <ArrowRight size={15} /></Link></div></section>

    <section className="story-band"><div className="story-side-note">LASYA · EST. IN THE MOMENTS THAT MATTER</div><div className="story-copy"><span className="eyebrow eyebrow-light">A little about us</span><h2>Rituals are how<br />we remember.</h2><p>LASYA celebrates the beauty of meaningful rituals, thoughtful gifting and the moments that bring us together. A considered object can turn an ordinary evening into something worth keeping.</p><Link className="text-link text-link-light" to="/about">Discover our story <ArrowRight size={15} /></Link></div><div className="story-mark" aria-hidden="true">✳</div></section>

    <section className="section new-section content-width"><SectionHeading eyebrow="Freshly considered" title="New to the edit" action={<Link className="text-link" to="/shop?sort=newest">See new arrivals <ArrowRight size={15} /></Link>} /><ProductGrid items={newArrivals} /></section>
    <Newsletter />
    <section className="faq-preview content-width"><div><span className="eyebrow">A little help</span><h2>Good to know.</h2><p>Quick answers for this preview storefront.</p><Link className="text-link" to="/faq">Read all FAQs <ArrowRight size={15} /></Link></div><div className="preview-questions">{faqs.slice(0, 3).map((faq) => <details key={faq.question}><summary>{faq.question}<ChevronDown size={17} /></summary><p>{faq.answer}</p></details>)}</div></section>
  </>
}

function ProductListing({ title, intro, baseProducts = products, searchMode = false }: { title: string; intro: string; baseProducts?: Product[]; searchMode?: boolean }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<CatalogFilters>(() => ({ ...defaultFilters, query: searchParams.get('q') ?? '', category: searchParams.get('category') ?? '', sort: (searchParams.get('sort') as CatalogFilters['sort']) || 'featured' }))
  const [displayCount, setDisplayCount] = useState(12)

  useEffect(() => setFilters((current) => ({ ...current, query: searchParams.get('q') ?? '', category: searchParams.get('category') ?? '', sort: (searchParams.get('sort') as CatalogFilters['sort']) || current.sort })), [searchParams])

  const visible = useMemo(() => filterProducts(baseProducts, filters), [baseProducts, filters])
  const update = (key: keyof CatalogFilters, value: string | number) => setFilters((current) => ({ ...current, [key]: value }))
  const reset = () => { setFilters(defaultFilters); setSearchParams({}) }
  const hasFilters = Boolean(filters.query || filters.category || filters.availability !== 'all' || filters.maxPrice < 500000)

  return <div className="listing-page content-width">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>{title}</span></div>
    <div className="listing-intro"><span className="eyebrow">LASYA · RITUAL OF ELEGANCE</span><h1>{title}</h1><p>{intro}</p>{searchMode && <label className="search-page-input"><span className="sr-only">Search products</span><input value={filters.query} onChange={(event) => update('query', event.target.value)} placeholder="Try candles, gifting, décor…" /><SearchIcon /></label>}</div>
    <div className="listing-toolbar"><span className="result-count">{visible.length} {visible.length === 1 ? 'piece' : 'pieces'}<span className="demo-label">Sample catalogue</span></span><div className="toolbar-controls"><label>Category<select value={filters.category} onChange={(event) => update('category', event.target.value)}><option value="">All categories</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label><label>Availability<select value={filters.availability} onChange={(event) => update('availability', event.target.value)}><option value="all">All pieces</option><option value="in-stock">Available in demo</option><option value="out-of-stock">Unavailable in demo</option></select></label><label>Sort by<select value={filters.sort} onChange={(event) => update('sort', event.target.value)}><option value="featured">Featured</option><option value="newest">New arrivals</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A–Z</option></select></label></div></div>
    <div className="price-filter"><label htmlFor="price-range">Price up to <strong>{formatINR(filters.maxPrice)}</strong></label><input id="price-range" type="range" min="50000" max="500000" step="50000" value={filters.maxPrice} onChange={(event) => update('maxPrice', Number(event.target.value))} /></div>
    {hasFilters && <div className="filter-chips"><span>Showing:</span>{filters.query && <button onClick={() => update('query', '')}>“{filters.query}” <X size={13} /></button>}{filters.category && <button onClick={() => update('category', '')}>{categories.find((category) => category.id === filters.category)?.name} <X size={13} /></button>}{filters.availability !== 'all' && <button onClick={() => update('availability', 'all')}>{filters.availability === 'in-stock' ? 'Available in demo' : 'Unavailable in demo'} <X size={13} /></button>}{filters.maxPrice < 500000 && <button onClick={() => update('maxPrice', 500000)}>Up to {formatINR(filters.maxPrice)} <X size={13} /></button>}<button className="clear-filters" onClick={reset}>Clear all</button></div>}
    {visible.length ? <ProductGrid items={visible.slice(0, displayCount)} emptyTitle="No matching pieces" /> : <div className="empty-state"><span className="empty-mark">⌕</span><h3>No pieces found</h3><p>Try a different search or clear the filters to explore the full sample edit.</p><button className="button button-outline" onClick={reset}>Clear filters</button></div>}
    {visible.length > displayCount && <div className="load-more"><button className="button button-outline" onClick={() => setDisplayCount((count) => count + 8)}>Load more pieces <ChevronDown size={16} /></button></div>}
  </div>
}

function SearchIcon() { return <span aria-hidden="true">⌕</span> }

export function ShopPage() { return <ProductListing title="The collection" intro="Thoughtful details for celebrations, rituals and generous gatherings." /> }

export function SearchPage() { return <ProductListing title="Search the collection" intro="Find something lovely for the moments ahead." searchMode /> }

export function CollectionPage() {
  const { slug = '' } = useParams()
  const collection = findCollection(slug)
  if (!collection) return <NotFoundPage />
  let items = products.filter((product) => product.collectionIds.includes(collection.id))
  if (collection.categoryIds) items = products.filter((product) => collection.categoryIds?.includes(product.categoryId))
  if (collection.maxPricePaise) items = products.filter((product) => product.pricePaise <= collection.maxPricePaise!)
  return <><section className="collection-hero" style={{ backgroundImage: `url("${collection.image}")` }}><div className="collection-hero-shade" /><div><span className="eyebrow eyebrow-light">A LASYA collection</span><h1>{collection.name}</h1><p>{collection.description}</p></div></section><ProductListing title={collection.name} intro={collection.description} baseProducts={items} /></>
}

export function ProductPage() {
  const { slug = '' } = useParams()
  const product = findProduct(slug)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [variantId, setVariantId] = useState(product?.variants?.[0]?.id ?? '')
  const [added, setAdded] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const galleryButtonRef = useRef<HTMLButtonElement>(null)
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const firstVariantId = product?.variants?.[0]?.id ?? ''
  useEffect(() => {
    setQuantity(1)
    setSelectedImage(0)
    setVariantId(firstVariantId)
    setAdded(false)
  }, [slug, firstVariantId])
  useEffect(() => {
    if (!zoomed) return
    lightboxRef.current?.focus()
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoomed(false)
        galleryButtonRef.current?.focus()
      }
      if (event.key === 'Tab') {
        event.preventDefault()
        lightboxRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
      }
    }
    window.addEventListener('keydown', handleDialogKeys)
    return () => window.removeEventListener('keydown', handleDialogKeys)
  }, [zoomed])
  if (!product) return <NotFoundPage />
  const related = products.filter((item) => item.id !== product.id && (item.categoryId === product.categoryId || item.collectionIds.some((id) => product.collectionIds.includes(id)))).slice(0, 4)
  const variant = product.variants?.find((item) => item.id === variantId)
  const price = variant?.pricePaise ?? product.pricePaise
  const available = product.availability === 'in-stock' && (variant ? variant.stockQuantity > 0 : product.stockQuantity > 0)
  const add = () => { addToCart(product, quantity, variant?.id); setAdded(true) }
  return <div className="product-detail content-width">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><span>{product.name}</span></div>
    <div className="product-detail-grid"><div className="product-gallery"><button ref={galleryButtonRef} className="gallery-main" onClick={() => setZoomed(true)} aria-label="Enlarge product image"><img src={product.images[selectedImage].src} alt={product.images[selectedImage].alt} /><span>Click to enlarge</span></button><div className="gallery-thumbs">{product.images.map((item, index) => <button key={item.src} className={selectedImage === index ? 'selected' : ''} onClick={() => setSelectedImage(index)} aria-label={`View image ${index + 1}`}><img src={item.src} alt="" /></button>)}</div>{product.id === 'ls-001' && <a className="product-image-credit" href={diwaliDiyasCredit.source} target="_blank" rel="noreferrer">Image reference: “{diwaliDiyasCredit.title}” by {diwaliDiyasCredit.artist}, cropped for display. {diwaliDiyasCredit.license}</a>}</div>
      <div className="product-detail-copy"><span className="eyebrow">{categories.find((category) => category.id === product.categoryId)?.name} · SAMPLE</span><h1>{product.name}</h1><p className="product-detail-short">{product.shortDescription}</p><p className="detail-price">{formatINR(price)}</p><p className="sample-price-note">Illustrative sample price · Not a confirmed offer</p><p className={`availability ${available ? '' : 'unavailable'}`}><i />{available ? 'Shown as available in this sample catalogue' : 'Currently unavailable in this sample catalogue'}</p><p className="product-description">{product.description}</p>
        {product.variants && <label className="variant-select">Choose an option<select value={variantId} onChange={(event) => setVariantId(event.target.value)}>{product.variants.map((option) => <option key={option.id} value={option.id}>{option.label} · {formatINR(option.pricePaise)}</option>)}</select></label>}
        <div className="purchase-row"><div className="quantity-control"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={15} /></button><span>{quantity}</span><button onClick={() => setQuantity((value) => Math.min(available ? (variant?.stockQuantity ?? product.stockQuantity) : 1, value + 1))} aria-label="Increase quantity" disabled={!available || quantity >= (variant?.stockQuantity ?? product.stockQuantity)}><Plus size={15} /></button></div><button className="button button-dark add-to-bag" disabled={!available} onClick={add}><ShoppingBag size={17} />{available ? (added ? 'Added to your bag' : 'Add to bag') : 'Unavailable'}</button><button className={`icon-button detail-wishlist ${isWishlisted(product.id) ? 'is-saved' : ''}`} aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={isWishlisted(product.id)} onClick={() => toggleWishlist(product.id)}><Heart size={19} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} /></button></div><p className="purchase-disclaimer" role="status">{added ? 'Added locally. No order has been placed.' : 'This is a static preview. No order or payment will be placed.'}</p>
        <div className="product-specs"><details open><summary>Details <ChevronDown size={15} /></summary><p>{product.description}</p></details><details><summary>Materials & dimensions <ChevronDown size={15} /></summary><p>{product.materials}<br />{product.dimensions}<br />{product.packageContents}</p></details><details><summary>Shipping & returns <ChevronDown size={15} /></summary><p>Shipping and return terms have not been confirmed. Please review the <Link to="/shipping-policy">shipping information</Link> and <Link to="/return-refund-policy">returns draft</Link>.</p></details></div>
      </div></div>
      {related.length > 0 ? <section className="related-section"><SectionHeading eyebrow="You may also like" title="A considered pairing" /><ProductGrid items={related} /></section> : null}
    {zoomed && <div ref={lightboxRef} className="image-lightbox" role="dialog" aria-modal="true" aria-label={`Large view of ${product.name}`} tabIndex={-1} onClick={() => { setZoomed(false); galleryButtonRef.current?.focus() }}><button className="lightbox-close" aria-label="Close enlarged image"><X size={22} /></button><img src={product.images[selectedImage].src} alt={product.images[selectedImage].alt} /></div>}
  </div>
}

export function CartPage() {
  const { cart, setQuantity, removeFromCart, subtotal } = useStore()
  const entries = cart.map((entry) => ({ ...entry, product: products.find((product) => product.id === entry.productId) })).filter((entry) => entry.product)
  return <div className="content-width commerce-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Your bag</span></div><div className="commerce-heading"><div><span className="eyebrow">A little something lovely</span><h1>Your bag</h1></div><Link className="text-link" to="/shop">Continue browsing <ArrowRight size={15} /></Link></div>
    {entries.length ? <div className="cart-layout"><div className="cart-items">{entries.map(({ product, quantity, variantId }) => {
      if (!product) return null
      const variant = product.variants?.find((item) => item.id === variantId)
      const quantityLimit = variant?.stockQuantity ?? product.stockQuantity
      return <article className="cart-item" key={`${product.id}-${variantId ?? ''}`}><Link to={`/products/${product.slug}`} className="cart-item-image"><img src={product.images[0].src} alt={product.images[0].alt} /></Link><div className="cart-item-info"><Link to={`/products/${product.slug}`} className="product-name">{product.name}</Link><span className="cart-sku">{variant?.label ? `${variant.label} · ` : ''}{variant?.sku ?? product.sku} · Sample catalogue</span><div className="cart-item-actions"><div className="quantity-control"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => quantity <= 1 ? removeFromCart(product.id, variantId) : setQuantity(product.id, quantity - 1, variantId)}><Minus size={14} /></button><span>{quantity}</span><button aria-label={`Increase ${product.name} quantity`} disabled={quantity >= quantityLimit} onClick={() => setQuantity(product.id, quantity + 1, variantId)}><Plus size={14} /></button></div><button className="remove-link" onClick={() => removeFromCart(product.id, variantId)}>Remove</button></div></div><span className="cart-line-price">{formatINR((variant?.pricePaise ?? product.pricePaise) * quantity)}</span></article>
    })}</div><aside className="order-summary"><span className="eyebrow">Your summary</span><h2>Order summary</h2><div className="summary-line"><span>Sample item subtotal</span><strong>{formatINR(subtotal)}</strong></div><div className="summary-line muted"><span>Shipping</span><span>Not calculated</span></div><div className="summary-line muted"><span>Taxes</span><span>Not configured</span></div><div className="summary-total"><span>Subtotal</span><strong>{formatINR(subtotal)}</strong></div><p>Sample prices only. Shipping, taxes and any final price are not confirmed.</p><Link className="button button-dark button-full" to="/checkout">Continue to demo checkout <ArrowRight size={16} /></Link><div className="checkout-notice">No real order or payment can be placed from this demonstration.</div></aside></div> : <div className="empty-state cart-empty"><span className="empty-mark"><ShoppingBag size={28} /></span><h3>Your bag is taking a quiet moment.</h3><p>When you find something lovely, it will be waiting here.</p><Link className="button button-dark" to="/shop">Explore the collection <ArrowRight size={16} /></Link></div>}
  </div>
}

export function WishlistPage() {
  const { wishlist } = useStore()
  const saved = wishlist.map((id) => products.find((product) => product.id === id)).filter((product): product is Product => Boolean(product))
  return <div className="content-width commerce-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Wishlist</span></div><div className="commerce-heading"><div><span className="eyebrow">Saved for later</span><h1>Your wishlist</h1></div><span className="result-count">{saved.length} {saved.length === 1 ? 'piece' : 'pieces'}</span></div>{saved.length ? <ProductGrid items={saved} /> : <div className="empty-state"><span className="empty-mark"><Heart size={27} /></span><h3>A little wish list in the making.</h3><p>Save the pieces that catch your eye and find them here again.</p><Link className="button button-dark" to="/shop">Discover the collection <ArrowRight size={16} /></Link></div>}</div>
}

export function CheckoutPage() {
  const { cart, subtotal } = useStore()
  const [notice, setNotice] = useState('')
  const [delivery, setDelivery] = useState('standard')
  const navigate = useNavigate()
  const entries = cart.map((entry) => ({ entry, product: products.find((product) => product.id === entry.productId) })).filter((item): item is { entry: typeof cart[number]; product: Product } => Boolean(item.product))
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice('Demo validation complete. Your details were not sent, stored or submitted as an order.')
  }
  if (!entries.length) return <div className="content-width commerce-page"><div className="empty-state cart-empty"><span className="empty-mark"><ShoppingBag size={28} /></span><h3>Your bag is empty.</h3><p>Add a sample piece before exploring the checkout demonstration.</p><button className="button button-dark" onClick={() => navigate('/shop')}>Browse the collection <ArrowRight size={16} /></button></div></div>
  return <div className="content-width commerce-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/cart">Your bag</Link><span>/</span><span>Demo checkout</span></div><header className="checkout-page-heading"><span className="eyebrow">A preview, not an order</span><h1>Delivery details</h1><p>Complete this local form to see the demonstration validation.</p></header><div className="checkout-demo-banner"><strong>DEMONSTRATION ONLY</strong><span>No real order or payment will be placed. Do not enter sensitive or real payment information.</span></div><div className="checkout-grid"><form className="checkout-form" onSubmit={submit}>
    <section className="checkout-section"><div className="form-section-heading"><span>01</span><div><h2>Contact details</h2><p>For this local form demonstration only.</p></div></div><div className="form-grid"><label className="field-full">Email address<input type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>Full name<input type="text" autoComplete="name" required minLength={2} /></label><label>Phone number<input type="tel" autoComplete="tel" required pattern="(?:\+91(?:-| )?)?[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number" placeholder="10-digit mobile number" /></label></div></section>
    <section className="checkout-section"><div className="form-section-heading"><span>02</span><div><h2>Delivery address</h2><p>Indian address format · sample delivery options.</p></div></div><div className="form-grid"><label className="field-full">Address line 1<input autoComplete="address-line1" required /></label><label className="field-full">Address line 2 <span>(optional)</span><input autoComplete="address-line2" /></label><label>Locality<input autoComplete="address-level3" required /></label><label>City<input autoComplete="address-level2" required /></label><label>State<input autoComplete="address-level1" required /></label><label>PIN code<input autoComplete="postal-code" required inputMode="numeric" pattern="[1-9][0-9]{5}" title="Enter a valid six-digit Indian PIN code" /></label></div></section>
    <section className="checkout-section"><div className="form-section-heading"><span>03</span><div><h2>Delivery preference</h2><p>These options are illustrative and not connected to a courier.</p></div></div><div className="delivery-options"><label className={delivery === 'standard' ? 'delivery-option selected' : 'delivery-option'}><input type="radio" name="delivery" value="standard" checked={delivery === 'standard'} onChange={() => setDelivery('standard')} /><span><strong>Standard delivery</strong><small>Sample option · timing not confirmed</small></span><b>To be confirmed</b></label><label className={delivery === 'gift' ? 'delivery-option selected' : 'delivery-option'}><input type="radio" name="delivery" value="gift" checked={delivery === 'gift'} onChange={() => setDelivery('gift')} /><span><strong>Gift-ready delivery</strong><small>Sample option · availability not confirmed</small></span><b>To be confirmed</b></label></div></section>
    <button className="button button-dark button-full" type="submit">Validate demo details <ArrowRight size={16} /></button>{notice && <p className="form-feedback checkout-feedback" role="status">{notice}</p>}
  </form><aside className="checkout-summary"><span className="eyebrow">A preview, not an order</span><h2>Your selection</h2>{entries.map(({ entry, product }) => { const variant = product.variants?.find((item) => item.id === entry.variantId); return <div className="checkout-line" key={`${product.id}-${entry.variantId ?? ''}`}><img src={product.images[0].src} alt="" /><div><strong>{product.name}</strong><small>{variant?.label ? `${variant.label} · ` : ''}Qty {entry.quantity}</small></div><span>{formatINR((variant?.pricePaise ?? product.pricePaise) * entry.quantity)}</span></div> })}<div className="summary-line"><span>Sample item subtotal</span><strong>{formatINR(subtotal)}</strong></div><div className="summary-line muted"><span>Shipping & taxes</span><span>Not calculated</span></div><div className="summary-total"><span>Sample subtotal</span><strong>{formatINR(subtotal)}</strong></div><p>Prices, stock, delivery options and product details are demonstration data only.</p></aside></div></div>
}

export function AboutPage() { return <TextContentPage pageKey="about" /> }

export function SupportingPage({ pageKey }: { pageKey: string }) { return <TextContentPage pageKey={pageKey} /> }

function TextContentPage({ pageKey }: { pageKey: string }) {
  const page = pageContent[pageKey]
  if (!page) return <NotFoundPage />
  return <div className="content-width text-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>{page.title}</span></div><header className="text-page-heading"><span className="eyebrow">{page.eyebrow}</span><h1>{page.title}</h1><p>{page.intro}</p></header>{pageKey === 'faq' ? <div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<ChevronDown size={17} /></summary><p>{faq.answer}</p></details>)}</div> : <div className="text-page-sections">{page.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}{pageKey === 'contact' && <ContactForm />}</div>}</div>
}

function ContactForm() {
  const [message, setMessage] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setMessage('Demo only: your enquiry was validated in this browser but not sent or stored.') }
  return <form className="contact-form" onSubmit={submit}><h2>Local enquiry form</h2><label>Your name<input required minLength={2} /></label><label>Email address<input type="email" required /></label><label>Your message<textarea rows={5} minLength={10} required /></label><button className="button button-dark" type="submit">Check details <ArrowRight size={16} /></button>{message && <p role="status" className="form-feedback">{message}</p>}</form>
}

export function JournalPage() {
  return <div className="content-width journal-page"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Journal</span></div><header className="text-page-heading"><span className="eyebrow">Ideas for meaningful moments</span><h1>The LASYA Journal</h1><p>Seasonal inspiration for considered homes, rituals and gifting. Sample editorial drafts are marked for review.</p></header><div className="journal-grid">{articlePreviews.map((article) => <Link className="journal-card" to={`/journal/${article.slug}`} key={article.slug}><img src={article.image} alt={article.alt} loading="lazy" /><span className="eyebrow">{article.category} · EDITORIAL DRAFT</span><h2>{article.title}</h2><p>{article.excerpt}</p><span className="text-link">Read the story <ArrowRight size={15} /></span></Link>)}</div></div>
}

export function JournalArticlePage() {
  const { slug = '' } = useParams()
  const article = articlePreviews.find((item) => item.slug === slug)
  if (!article) return <NotFoundPage />
  return <article className="article-page content-width"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/journal">Journal</Link><span>/</span><span>{article.title}</span></div><header className="article-heading"><span className="eyebrow">{article.category} · EDITORIAL DRAFT</span><h1>{article.title}</h1><p>{article.excerpt}</p></header><img className="article-cover" src={article.image} alt={article.alt} /><div className="article-body"><p>{article.body}</p><p>This article is sample content for the storefront preview and should be reviewed and edited before publication.</p><Link className="text-link" to="/journal">Back to the Journal <ArrowRight size={15} /></Link></div></article>
}

export function NotFoundPage() { return <div className="content-width not-found"><span className="eyebrow">A small detour</span><h1>This page isn't in the edit.</h1><p>The link may have changed, or this page has not been added yet.</p><Link className="button button-dark" to="/shop">Return to the collection <ArrowRight size={16} /></Link></div> }

export function ScrollReset() {
  const [params] = useSearchParams()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [params])
  return null
}