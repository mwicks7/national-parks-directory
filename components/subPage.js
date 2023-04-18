import Link from 'next/link'
import Map from './map'
import MediaCard from './mediaCard'
import Grid from '@mui/material/Grid'

export default function SubPage({ parkCode, parkInfo, pageTitle, map, children }) {  
  return (
    <div>
      {/* <h1>{`${parkInfo.name} National Park`}</h1> */}
      <br />
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <MediaCard 
            img={`/images/${parkCode}.jpg`}
            imgHeight={280}
            title={`${parkInfo.name} National Park`}
            subtitle={`${parkInfo.location.city}, ${parkInfo.location.state}`}
            description={parkInfo.description}
          />
        </Grid>
        <Grid item sm={12}>
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
        </Grid>
        <Grid item sm={12}>
          {/* <h2>{pageTitle}</h2> */}
          {children}
        </Grid>
      </Grid>
    </div>
  )
}