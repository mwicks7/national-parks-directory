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
  const parkData = await getParkData("thingstodo", params.id)

  return {
    props: {
      parkInfo: parkInfo,
      data: parkData.data,
    },
  }
}

export default function Park({ parkInfo, data }) {
  const markers = data.map((loc) => {
    return {
      label: loc.title,
      lat: Number(loc.latitude),
      lng: Number(loc.longitude),
    }
  })

  return (
    <Layout>
      <ParkPage
        pageTitle="Things To Do"
        parkInfo={parkInfo}
        mapMarkers={markers}
      >
        {data.length > 0 ? (
          data.map((todo, i) => (
            <MediaCard
              key={todo.id}
              img={
                todo.images?.[0]?.url && {
                  url: `${todo.images[0].url}?quality=75&width=600`,
                  altText: todo.images[0].altText,
                  loading: i <= 1 ? "eager" : "lazy",
                }
              }
              imgHeight={300}
              title={todo.title}
              subtitle=""
              description={todo.shortDescription}
              links={[{ href: todo.url, text: "Read more at nps.gov" }]}
            />
          ))
        ) : (
          <p className="no-results">No results.</p>
        )}
      </ParkPage>
    </Layout>
  )
}
