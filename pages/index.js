import { getAllParks } from "../lib/dbParks"
import { urlString } from '../lib/utilities'
import Layout from '../components/layout'
import ParkCard from '../components/parkCard'

export async function getStaticProps() {
  const parks = await getAllParks()
  return { props: { parks } }
}

function groupByState(parks) {
  let groupedParks = {}

  parks.map(park => {
    const { stateFull } = park.location
    if (groupedParks[stateFull]) {
      groupedParks[stateFull].push(park)
    } else {
      groupedParks[stateFull] = [park]
    }
  })

  return groupedParks
}

const ParkListing = ({ parks }) => {
  let content = []
  const parksByState = groupByState(parks)

  for (const stateFull in parksByState) {
    content.push(
      <div
        key={urlString(stateFull)}
        id={urlString(stateFull)}
        className="park-listing__state"
      >
        <h2 className="park-listing__state-name h1">{stateFull}</h2>
        <div className="park-listing__parks">
          {parksByState[stateFull].map(park => (
            <div className="park-listing__park">
              <ParkCard park={park} />
            </div>
          ))}
        </div>
      </div>
    )
  }
  return content
}

export default function Home({ parks }) {
  return (
    <Layout page="Home">
      <div className="park-listing">
        <ParkListing parks={parks} />
      </div>
    </Layout>
  )
}
