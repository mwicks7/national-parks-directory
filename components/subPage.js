import Link from 'next/link'
import MediaCard from './mediaCard'

export default function SubPage({ parkCode, parkInfo, pageTitle, children }) {
  return (
    <div>
      <Link href="/">&lt; Back</Link>
      <div>
        <MediaCard 
          img={`/images/${parkCode}.jpeg`}
          imgHeight={370}
          title={`${parkInfo.name} National Park`}
          subtitle={`${parkInfo.location.city}, ${parkInfo.location.state}`}
          description={parkInfo.description}
          links={[
            {href: `/park/${parkCode}`, text: 'Info'},
            {href: `/visitor-centers/${parkCode}`, text: 'Visitor Centers'},
            {href: `/campgrounds/${parkCode}`, text: 'CampGrounds'},
            {href: `/trails/${parkCode}`, text: 'Trails'},
            {href: `/things-to-do/${parkCode}`, text: 'Things To Do'},
            {href: `/articles/${parkCode}`, text: 'Articles'},
            {href: `/news/${parkCode}`, text: 'News'}     
          ]}
        />
      </div>
      <h2>{pageTitle}</h2>
      
      <div>
        {children}
      </div>
    </div>
  )
}