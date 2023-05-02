import Link from 'next/link'

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
      <div className="paper padded">
        <div className="park-header align-center" style={{backgroundImage: `url(/images/${parkCode}.jpg)`}}>
          <h1>{parkInfo.name}</h1>
          <div className="h2">{parkInfo.location.city}, {parkInfo.location.state}</div>
        </div>
      </div>
      
      <nav className="secondary-nav padded align-center">
        <ul>
          {nav.map(n => (
            <li>
              <Link className={`button ${n.text === pageTitle ? 'button--active' : ''}`} href={n.href}>{n.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
        
      <h2 className="align-center">{pageTitle}</h2>
      {children}
    </>
  )
}