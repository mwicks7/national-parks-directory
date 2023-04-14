import { getAllParks } from "../lib/db_parks"

import Link from 'next/link'
import Layout from '../components/layout'

export async function getStaticProps() {
  const parks = await getAllParks()
  return { props: { parks } }
}

export default function Home({ parks }) {
  return (
    <Layout>
      
      {/* Park Cards */}
      <div>
        <ul>
          {parks.map((park) => (
            <li key={park.npsId}>
              <h2>{park.name}</h2>
              <h3>{park.location.city}, {park.location.state}</h3>
              <Link href={`/park/${park.npsId}`}>View</Link> | <a target="_blank" href={`https://www.nps.gov/${park.npsId}`}>NPS.org</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Map */}

    </Layout>
  )
}