import Link from "next/link"
import Image from "next/image"

export default function ParkCard({ park, imgLoading = "lazy" }) {
  return (
    <div key={park.parkCode} className="park-card">
      <div className="park-card__header">
        <h3 className="park-card__name">
          <Link className="park-card__link" href={`/${park.parkCode}/park`}>
            {park.name}
          </Link>
        </h3>
        <p className="park-card__location">
          {park.location.city}, {park.location.state}
        </p>
      </div>

      <div className="park-card__image">
        <Image
          src={`/images/original/${park.parkCode}.jpg`}
          height={300}
          width={900}
          quality={100}
          loading={imgLoading}
          priority={imgLoading === "eager"}
          sizes="900px"
          alt=""
        />
      </div>

      <div className="park-card__details">
        <p className="park-card__description">{park.description}</p>
      </div>
    </div>
  )
}
