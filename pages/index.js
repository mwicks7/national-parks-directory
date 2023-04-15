import { getAllParks } from "../lib/db_parks"

import Link from 'next/link'
import Layout from '../components/layout'
import MediaCard from '../components/mediaCard'
import Grid from '@mui/material/grid';

export async function getStaticProps() {
  const parks = await getAllParks()
  return { props: { parks } }
}

export default function Home({ parks }) {
  return (
    <Layout>
      <div>
        <Grid container spacing={2}>
          {parks.map((park) => (
            <Grid item xs={12} sm={6} md={4}>
              <MediaCard 
                key={park.parkCode}
                img={`/images/${park.parkCode}.jpeg`}
                title={park.name}
                subtitle={`${park.location.city}, ${park.location.state}`}
                links={[
                  {href: `/park/${park.parkCode}`, text: 'View'},
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