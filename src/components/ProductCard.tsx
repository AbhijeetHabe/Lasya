import { Heart, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { formatINR } from '../lib/format'
import { useStore } from '../lib/useStore'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const saved = isWishlisted(product.id)
  return <article className="product-card">
    <div className="product-image-wrap">
      <Link to={`/products/${product.slug}`} aria-label={`View ${product.name}`} className="product-image-link">
        <img src={product.images[0].src} alt={product.images[0].alt} loading="lazy" />
      </Link>
      {product.isNew && <span className="product-badge">New edit</span>}
      <button className={`wishlist-button ${saved ? 'is-saved' : ''}`} onClick={() => toggleWishlist(product.id)} aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} aria-pressed={saved}><Heart size={17} fill={saved ? 'currentColor' : 'none'} /></button>
      <button className="quick-add" onClick={() => addToCart(product)} disabled={product.availability !== 'in-stock'} aria-label={product.availability === 'in-stock' ? `Add ${product.name} to bag` : `${product.name} is unavailable`}><Plus size={17} /><span>{product.availability === 'in-stock' ? 'Add to bag' : 'Unavailable'}</span></button>
    </div>
    <div className="product-card-copy"><Link to={`/products/${product.slug}`} className="product-name">{product.name}</Link><p>{product.shortDescription}</p><span className="product-price">{formatINR(product.pricePaise)}</span></div>
  </article>
}