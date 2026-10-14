import type { ReactNode } from 'react'

export default function SectionHeading({ eyebrow, title, action, centered = false }: { eyebrow?: string; title: string; action?: ReactNode; centered?: boolean }) {
  return <div className={`section-heading ${centered ? 'centered' : ''}`}>
    <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>
    {action && <div className="section-heading-action">{action}</div>}
  </div>
}