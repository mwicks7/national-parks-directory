import Link from "next/link"

export default function MediaCard({
  img,
  imgHeight = 240,
  title,
  subtitle,
  description,
  links,
  children,
}) {
  return (
    <div className="media-card">
      {title && <h2 className="media-card__title">{title}</h2>}

      {img && (
        <img
          className="media-card__image"
          src={img.url}
          alt={img.altText}
          height={300}
          width={460}
          loading="lazy"
        />
      )}

      <div className="media-card__details">
        {description && (
          <p className="media-card__description">{description}</p>
        )}

        {children && <>{children}</>}

        {links && (
          <div className="media-card__links">
            {links.map((link) => (
              <Link key={link.text} href={link.href}>
                {link.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
