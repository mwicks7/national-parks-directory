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
        {data.map((todo) => (
          <MediaCard
            key={todo.id}
            img={
              todo.images.length
                ? `${todo.images[0].url}?quality=90&width=1000`
                : ""
            }
            imgHeight={300}
            title={todo.title}
            subtitle=""
            description={todo.shortDescription}
            links={[{ href: todo.url, text: "Read more at nps.gov" }]}
          />
        ))}
      </ParkPage>
    </Layout>
  )
}
