import { getParkPaths, getParkInfo, getParkData } from "../../lib/dbParks"
import Layout from "../../components/layout"
import ParkPage from "../../components/parkPage"
import MediaCard from "../../components/mediaCard"

export async function getStaticPaths() {
  const paths = await getParkPaths()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const parkInfo = await getParkInfo(params.id)
  const parkData = await getParkData("places", params.id)
  return {
    props: {
      parkInfo: parkInfo,
      data: parkData.data,
    },
  }
}

export default function Trails({ parkInfo, data }) {
  const markers = data.map((loc) => {
    return {
      label: loc.title,
      lat: Number(loc.latitude),
      lng: Number(loc.longitude),
    }
  })

  return (
    <Layout>
      <ParkPage pageTitle="Trails" parkInfo={parkInfo} mapMarkers={markers}>
        {data.length > 0 ? (
          data.map((trails) => (
            <MediaCard
              key={trails.id}
              img={
                trails.images?.[0]?.url && {
                  url: `${trails.images[0].url}?quality=75&width=600`,
                  altText: trails.images[0].altText,
                }
              }
              imgHeight={170}
              title={trails.title}
              subtitle=""
              description={trails.listingDescription}
              links={[{ href: trails.url, text: "Read more at nps.gov" }]}
            />
          ))
        ) : (
          <p className="no-results">No results.</p>
        )}
      </ParkPage>
    </Layout>
  )
}
