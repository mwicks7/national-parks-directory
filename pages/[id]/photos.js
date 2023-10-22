import { getParkPaths, getParkInfo, getParkData } from '../../lib/dbParks'
import Layout from '../../components/layout'
import ParkPage from '../../components/parkPage'
import MediaCard from '../../components/mediaCard'

export async function getStaticPaths() {
  const paths = await getParkPaths()
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const parkInfo = await getParkInfo(params.id)
  const parkData = await getParkData('info', params.id)
  return {
    props: {
      parkInfo: parkInfo,
      data: parkData.data[0],
    }
  }
}

export default function Photos({ parkInfo, data }) {
  const pageTitle = 'Photos'
  const markers = data.images.map(loc => {
    return {
      label: loc.caption,
      lat: Number(loc.latitude),
      lng: Number(loc.longitude)
    }
  })

  return (
    <Layout>
      <ParkPage
        parkInfo={parkInfo}
        pageTitle={pageTitle}
        mapMarkers={markers}
      >
        {data.images.map((image) => {
          return (
            <MediaCard
              img={image.url}
              description={image.caption}
            >
            </MediaCard>
          )
        })}
      </ParkPage>
    </Layout>
  )
}
