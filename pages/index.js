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
  return (
    <Layout>
      <h1>The National Parks of The United States</h1>
      <div>
        <Grid container spacing={2}>
          {parks.map((park) => (
            <Grid item xs={12} sm={12}>
              <MediaCard 
                key={park.parkCode}
                imgHeight={280}
                img={`/images/${park.parkCode}.jpeg`}
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