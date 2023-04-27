import Link from 'next/link'
import Map from './map'
import MediaCard from './mediaCard'
import Grid from '@mui/material/Grid'

export default function SubPage({ parkCode, parkInfo, pageTitle, map, children }) {  
  return (
    <>
      <div className="grid">
        <div className="grid__item">
          <MediaCard 
            // img={`/images/${parkCode}.jpg`}
            // imgHeight={280}
            title={`${parkInfo.name} National Park`}
            subtitle={`${parkInfo.location.city}, ${parkInfo.location.state}`}
            // description={parkInfo.description}
            
          />
        </div>
        <div className="grid__item">
          <MediaCard 
            links={[
              {href: `/park/${parkCode}`, text: 'Info', active: pageTitle === 'Info'},
              {href: `/visitor-centers/${parkCode}`, text: 'Visitor Centers', active: pageTitle === 'Visitor Centers'},
              {href: `/campgrounds/${parkCode}`, text: 'Campgrounds', active: pageTitle === 'Campgrounds'},
              {href: `/trails/${parkCode}`, text: 'Trails', active: pageTitle === 'Trails'},
              {href: `/things-to-do/${parkCode}`, text: 'Things To Do', active: pageTitle === 'Things To Do'},
              {href: `/articles/${parkCode}`, text: 'Articles', active: pageTitle === 'Articles'}
            ]}
          />
        </div>
      </div>
      
      {children}
    </>
  )
}