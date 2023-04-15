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
              key={park.parkCode}
              img={`${park.parkCode}.jpeg`}
              title={park.name}
              subtitle={`${park.location.city}, ${park.location.state}`}
              links={[
                {href: `/park/${park.parkCode}`, text: 'View'},
                {href: `https://www.nps.gov/${park.parkCode}`, text: 'NPS.gov'}                
              ]}
            />
          ))}
        </ul>
      </div>
    </Layout>
  )
}