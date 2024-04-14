import Link from "next/link";
import Image from "next/image";

export default function ParkCard({ park }) {
  return (
    <div key={park.parkCode} className="park-card">
      <div className="park-card__header">
        <Link href={`/${park.parkCode}/park`}>
          <h2 className="park-card__name">{park.name}</h2>
        </Link>
        <p className="park-card__location">
          {park.location.city}, {park.location.state}
        </p>
      </div>

      <Link href={`/${park.parkCode}/park`}>
        <div className="park-card__image">
          <Image
            src={`/images/${park.parkCode}.jpg`}
            height={300}
            width={460}
            quality={100}
            loading="lazy"
            sizes="460px"
            alt=""
            unoptimized
          />
        </div>
      </Link>

      <div className="park-card__details">
        <p className="park-card__description">{park.description}</p>
        <div className="park-card__links">
          <Link href={`/${park.parkCode}/park`}>More info on {park.name}</Link>
        </div>
      </div>
    </div>
  );
}
