import { getAllParks } from "../lib/dbParks"
import { urlString } from "../lib/utilities"
import Layout from "../components/layout"
import ParkCard from "../components/parkCard"

export async function getStaticProps() {
  const parks = await getAllParks()
  return { props: { parks } }
}

function groupByState(parks) {
  let states = []

  parks.map((park) => {
    const { stateFull } = park.location
    const groupedState = states?.find((state) => state.stateFull === stateFull)

    if (groupedState) {
      groupedState.parks.push(park)
    } else {
      const newState = { stateFull, parks: [park] }
      states.push(newState)
    }
  })

  return states
}

export default function Home({ parks }) {
  const parksByState = groupByState(parks)

  return (
    <Layout page="Home">
      <div className="park-listing">
        {parksByState.map((state) => (
          <div
            className="park-listing__state"
            id={urlString(state.stateFull)}
            key={urlString(state.stateFull)}
          >
            <h2 className="park-listing__state-name h1">{state.stateFull}</h2>
            <div className="park-listing__parks">
              {state.parks.map((park) => (
                <div
                  className="park-listing__park"
                  key={`park-listing-${urlString(park.name)}`}
                >
                  <ParkCard park={park} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
