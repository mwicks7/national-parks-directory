import { getAllParks } from "../lib/dbParks"
import { urlString } from "../lib/utilities"
import Layout from "../components/layout"
import ParkCard from "../components/parkCard"

export async function getStaticProps() {
  const parks = await getAllParks()
  return { props: { parks } }
}

export default function Home({ parks }) {
  const parksByState = parks.reduce((acc, park) => {
    const parkState = park.location.stateFull
    const accState = acc[parkState]
    return {
      ...acc,
      ...{ [parkState]: accState ? accState.concat(park) : [park] },
    }
  }, {})

  return (
    <Layout page="Home">
      <div className="park-listing">
        {Object.keys(parksByState).map((state) => (
          <div
            className="park-listing__state"
            id={urlString(state)}
            key={urlString(state)}
          >
            <h2 className="park-listing__state-name h1">{state}</h2>
            <ul className="park-listing__parks">
              {parksByState[state].map((park, i) => (
                <li
                  className="park-listing__park"
                  key={`park-listing-${urlString(park.name)}`}
                >
                  <ParkCard
                    park={park}
                    imgLoading={i == 0 ? "eager" : "lazy"}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  )
}
