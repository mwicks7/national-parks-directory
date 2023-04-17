import Link from 'next/link'
import MediaCard from './mediaCard'

export default function SubPage({ parkCode, parkInfo, pageTitle, children }) {
  const img = pageTitle === 'Info' ? `/images/${parkCode}.jpg` : ''
  const description = pageTitle === 'Info' ? parkInfo.description : ''
  // const subtitle = pageTitle === 'Info' ? parkInfo.subtitle : ''
  return (
    <div>
      {/* <h1>{`${parkInfo.name} National Park`}</h1> */}
      <br />
      <div>
        <MediaCard 
          img={img}
          imgHeight={280}
          title={`${parkInfo.name} National Park`}
          subtitle={`${parkInfo.location.city}, ${parkInfo.location.state}`}
          description={description}
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