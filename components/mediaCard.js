import Link from 'next/link'

export default function MediaCard({ img, imgHeight=240, title, subtitle, description, links, children}) {
  return (
    <div className="media-card">
      {title && <h1 className="media-card__title">{title}</h1>}

      {img && <div className="media-card__image" style={{backgroundImage: `url(${img})`}}></div>}

      <div className="media-card__details">
        {description &&
          <p className="media-card__description">
            {description}
          </p>
        }

        {children && <p>{children}</p>}

        {links &&
          <div className="media-card__links">
            {links.map(link => (
              <Link key={link.text} href={link.href}>
                {link.text}
              </Link>
            ))}
          </div>
        }
      </div>
    </div>
  );
}
