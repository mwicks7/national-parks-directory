import Link from 'next/link'

export default function Card({ img, title, subtitle, links }) {
  return (
    <div className="mdc-card">
      <div className="my-card__media mdc-card__media mdc-card__media--16-9" style={{backgroundImage: `url("/images/${img}")`}}>
      </div>
      <div className="mdc-card-wrapper__text-section">
        <h2 className="mdc-card__title">{title}</h2>
        <p className="mdc-card__subtitle">{subtitle}</p>
        <div className="mdc-card__actions">
          {links.map(link => (
            <Link className="mdc-button mdc-card__action mdc-card__action--button" href={link.href}>{link.text}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}