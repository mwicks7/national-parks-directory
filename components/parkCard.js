import Link from 'next/Link'

export default function ParkCard({ park, listing, pageTitle}) {
  const nav = [
    {href: `/${park.parkCode}/park/`, text: 'Info', active: pageTitle === 'Info'},
    {href: `/${park.parkCode}/photos/`, text: 'Photos', active: pageTitle === 'Photos'},
    {href: `/${park.parkCode}/visitor-centers/`, text: 'Visitor Centers', active: pageTitle === 'Visitor Centers'},
    {href: `/${park.parkCode}/camping/`, text: 'Camping', active: pageTitle === 'Camping'},
    {href: `/${park.parkCode}/trails/`, text: 'Trails', active: pageTitle === 'Trails'},
    {href: `/${park.parkCode}/things-to-do/`, text: 'Things To Do', active: pageTitle === 'Things To Do'},
    // {href: `${park.parkCode}`/articles/, text: 'Articles', active: pageTitle === 'Articles'}
  ]

  return (
    <>
      {listing ? (
        <div key={park.parkCode} className="park-card paper">
        <div className="park-card__header">
          <Link href={`/${park.parkCode}/park`}>
            <h1 className="park-card__name">{park.name}</h1>
          </Link>
          <p className="park-card__location">{park.location.city}, {park.location.state}</p>
        </div>

          <Link href={`/${park.parkCode}/park`}>
            <div className="park-card__image" style={{backgroundImage: `url(/images/${park.parkCode}.jpg)`}}>
            </div>
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
      ) : (
        <div key={park.parkCode} className="park-card paper">
          {/* <div className="park-card__image" style={{backgroundImage: `url(/images/${park.parkCode}.jpg)`}}></div> */}
          <div className="park-card__header">
            <h1 className="park-card__name">{park.name}</h1>
            <p className="park-card__location">{park.location.city}, {park.location.state}</p>
          </div>
          <div className="park-card__details">

            <nav>
              <ul className="park-card__links">
                {nav.map(n => (
                  <li>
                    <Link className={`park-card__link ${n.text === pageTitle ? 'park-card__link--active' : ''}`} href={n.href}>{n.text}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )
      }


    </>
  )
}
