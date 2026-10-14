import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function BrandLogo({ footer = false }: { footer?: boolean }) {
  const [logoMissing, setLogoMissing] = useState(false)

  return <Link className={`wordmark brand-logo ${footer ? 'wordmark-light' : ''}`} to="/" aria-label="LASYA home">
    {!logoMissing
      ? <img className="brand-logo-image" src={`${import.meta.env.BASE_URL}images/lasya-logo.jpeg`} alt="LASYA lotus emblem, wordmark and Ritual of Elegance tagline" onError={() => setLogoMissing(true)} />
      : <><span>LASYA</span><small>RITUAL OF ELEGANCE</small></>}
  </Link>
}