import { getAllParks } from "../lib/dbParks"

import Link from 'next/link'
import Layout from '../components/layout'
import Map from '../components/map'
import MediaCard from '../components/mediaCard'
import Grid from '@mui/material/Grid';

export async function getStaticProps() {
  const parks = await getAllParks()
  return { props: { parks } }
}

export default function Home({ parks }) {
  console.log(parks)
  const markers = parks.map(park => {
    return {
      label: park.name,
      lat: Number(park.latitude),
      lng: Number(park.longitude)
    }
  })

  const handleParkUpdate = async () => {
    await fetch('/api/park', 
      {
        method: "POST",
      }
    )
  }

  return (
    <Layout page="Home">
      <h1>The National Parks of The United States</h1>
      {/* <button onClick={handleParkUpdate}>Update DB</button> */}
      <div>
        {/* <Map 
          center={{
            lat: 40.365794255437436,
            lng: -102.03842665156836
          }}
          markers={markers}
        /> */}
        <Grid container spacing={2}>
          {parks.map((park) => (
            <Grid item xs={12} sm={6}>
              <MediaCard 
                key={park.parkCode}
                imgHeight={280}
                img={`/images/${park.parkCode}.jpg`}
                title={park.name}
                subtitle={`${park.location.city}, ${park.location.state}`}
                description={park.description}
                links={[
                  {href: `/park/${park.parkCode}`, text: 'Info & Maps'},
                  {href: `https://www.nps.gov/${park.parkCode}`, text: 'NPS.gov'}                
                ]}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}