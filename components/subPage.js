import Link from 'next/link'
import Map from './map'
import MediaCard from './mediaCard'

export default function SubPage({ parkCode, parkInfo, pageTitle, map, children }) {  
  const nav = [
    {href: `/park/${parkCode}`, text: 'Info', active: pageTitle === 'Info'},
    {href: `/visitor-centers/${parkCode}`, text: 'Visitor Centers', active: pageTitle === 'Visitor Centers'},
    {href: `/campgrounds/${parkCode}`, text: 'Campgrounds', active: pageTitle === 'Campgrounds'},
    {href: `/trails/${parkCode}`, text: 'Trails', active: pageTitle === 'Trails'},
    {href: `/things-to-do/${parkCode}`, text: 'Things To Do', active: pageTitle === 'Things To Do'},
    {href: `/articles/${parkCode}`, text: 'Articles', active: pageTitle === 'Articles'}
  ]
  return (
    <>
      <div className="park-header align-center">
        <h1>{parkInfo.name}</h1>
        <div>{parkInfo.location.city}, {parkInfo.location.state}</div>
      </div>
      
      <nav className="secondary-nav padded paper align-center">
        <ul>
          {nav.map(n => (
            <li>
              <Link href={n.href}>{n.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
        
      <h2 className="align-center">{pageTitle}</h2>
      {children}
    </>
  )
}