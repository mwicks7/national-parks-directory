import Link from "next/link"

export default function MediaCard({
  id,
  img,
  imgHeight = 240,
  title,
  subtitle,
  description,
  links,
  children,
  onMouseEnter,
}) {
  return (
    <div className="media-card" onMouseEnter={onMouseEnter} id={id}>
      {title && <h2 className="media-card__title">{title}</h2>}

      {img && (
        <img
          className="media-card__image"
          src={img.url}
          alt={img.altText}
          height={300}
          width={460}
          loading={img.loading ? img.loading : "lazy"}
        />
      )}

      <div className="media-card__details">
        {description && (
          <p className="media-card__description">{description}</p>
        )}

        {children && <>{children}</>}

        {links && (
          <div className="media-card__links">
            {links.map((link) => {
              return link.href ? (
                <Link
                  key={link.text}
                  href={link.href}
                  className="media-card__link"
                >
                  {link.text}
                </Link>
              ) : null
            })}
          </div>
        )}
      </div>
    </div>
  )
}
