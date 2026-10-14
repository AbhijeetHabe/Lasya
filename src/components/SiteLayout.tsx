import { useEffect, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useStore } from '../lib/useStore'
import BrandLogo from './BrandLogo'

const navItems = [
  { label: 'Shop all', to: '/shop' },
  { label: 'Diwali edit', to: '/collections/diwali-decor' },
  { label: 'Gifting', to: '/collections/gift-hampers' },
  { label: 'Our story', to: '/about' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { cartCount, wishlist } = useStore()

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        document.querySelector<HTMLButtonElement>('.mobile-menu-button')?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setMenuOpen(false)
  }

  return <>
    <div className="announcement"><span>Thoughtful finds for the season of gathering</span><Link to="/collections/diwali-decor">Explore the Diwali edit <span aria-hidden="true">→</span></Link></div>
    <header className="site-header">
      <button className="icon-button mobile-menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <BrandLogo />
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{item.label}</NavLink>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button" aria-label="Search products" onClick={() => setSearchOpen((open) => !open)}><Search size={19} /></button>
        <Link className="icon-button action-link" aria-label={`Wishlist, ${wishlist.length} saved`} to="/wishlist"><Heart size={19} /><span className="action-label">Saved</span>{wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}</Link>
        <Link className="icon-button action-link bag-action" aria-label={`Shopping bag, ${cartCount} items`} to="/cart"><ShoppingBag size={19} /><span className="action-label">Bag</span><span className="count-badge">{cartCount}</span></Link>
      </div>
      {searchOpen && <form className="header-search" onSubmit={search}><label className="sr-only" htmlFor="header-search">Search the collection</label><Search size={17} /><input autoFocus id="header-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" /><button type="submit">Search</button></form>}
    </header>
    <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
      {navItems.map((item) => <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}<span aria-hidden="true">↗</span></NavLink>)}
      <Link to="/journal" onClick={() => setMenuOpen(false)}>Journal<span aria-hidden="true">↗</span></Link>
      <Link to="/faq" onClick={() => setMenuOpen(false)}>Help & FAQs<span aria-hidden="true">↗</span></Link>
    </nav>
  </>
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand"><BrandLogo footer /><p>Thoughtful pieces for rituals, gatherings and the moments in between.</p></div>
      <div className="footer-column"><h2>Discover</h2><Link to="/shop">Shop all</Link><Link to="/collections/diwali-decor">The Diwali edit</Link><Link to="/collections/gift-hampers">Thoughtful gifting</Link><Link to="/journal">Journal</Link></div>
      <div className="footer-column"><h2>LASYA</h2><Link to="/about">Our story</Link><Link to="/contact">Contact</Link><Link to="/faq">FAQs</Link></div>
      <div className="footer-column"><h2>Information</h2><Link to="/shipping-policy">Shipping</Link><Link to="/return-refund-policy">Returns & refunds</Link><Link to="/privacy-policy">Privacy</Link><Link to="/terms">Terms</Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} LASYA · Preview storefront</span><span>Product and business details are sample content.</span></div>
  </footer>
}

export default function SiteLayout() {
  return <><Header /><main id="main-content"><Outlet /></main><Footer /></>
}