import { getAllParks } from "../lib/db_parks"

import Link from 'next/link'
import Layout from '../components/layout'
import Card from '../components/card'

export async function getStaticProps() {
  const parks = await getAllParks()
  return { props: { parks } }
}

export default function Home({ parks }) {
  return (
    <Layout>
      <div>
        <ul>
          {parks.map((park) => (

            <Card 
              img={`${park.npsId}.jpeg`}
              title={park.name}
              subtitle={`${park.location.city}, ${park.location.state}`}
              links={[
                {href: `/park/${park.npsId}`, text: 'View'},
                {href: `https://www.nps.gov/${park.npsId}`, text: 'NPS.gov'}                
              ]}
            />
          ))}
        </ul>
      </div>
    </Layout>
  )
}