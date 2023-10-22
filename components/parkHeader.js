import Link from 'next/link'
import { urlString } from '../lib/utilities'

export default function ParkHeader({ park, pageTitle}) {
  const nav = [
    {href: `/${park.parkCode}/park/`, text: 'Info', active: pageTitle === 'Info'},
    // {href: `/${park.parkCode}/photos/`, text: 'Photos', active: pageTitle === 'Photos'},
    {href: `/${park.parkCode}/visitor-centers/`, text: 'Visitor Centers', active: pageTitle === 'Visitor Centers'},
    {href: `/${park.parkCode}/camping/`, text: 'Camping', active: pageTitle === 'Camping'},
    {href: `/${park.parkCode}/trails/`, text: 'Trails', active: pageTitle === 'Trails'},
    {href: `/${park.parkCode}/things-to-do/`, text: 'Things To Do', active: pageTitle === 'Things To Do'},
    // {href: `${park.parkCode}`/articles/, text: 'Articles', active: pageTitle === 'Articles'}
  ]

  return (
    <div key={park.parkCode} className="park-header">
      <h1 className="park-header__name">{park.name}</h1>
      <p className="park-header__location">{park.location.city}, {park.location.state}</p>
      <nav className="park-header__nav">
        <ul className="park-header__links">
          {nav.map(n => (
            <li key={`park-header-link-${urlString(n.text)}`}>
              <Link className={`park-header__link ${n.text === pageTitle ? 'park-header__link--active' : ''}`} href={n.href}>{n.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
