import Link from 'next/link'

export default function ParkCard({ park }) {
  return (
    <div key={park.parkCode} className="park-card">
      <div className="park-card__header">
        <Link href={`/${park.parkCode}/park`}>
          <h1 className="park-card__name">{park.name}</h1>
        </Link>
        <p className="park-card__location">{park.location.city}, {park.location.state}</p>
      </div>

      <Link href={`/${park.parkCode}/park`}>
        <div className="park-card__image" style={{backgroundImage: `url(/images/${park.parkCode}.jpg)`}}></div>
      </Link>

      <div className="park-card__details">
        <p className="park-card__description">{park.description}</p>
        <div className="park-card__links">
          <Link href={`/${park.parkCode}/park`}>
            More Info
          </Link>
        </div>
      </div>
    </div>
  )
}
