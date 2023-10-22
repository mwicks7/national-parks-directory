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
  const parkData = await getParkData('campgrounds', params.id)

  return {
    props: {
      parkInfo: parkInfo,
      data: parkData.data,
    }
  }
}

export default function Camping({ parkInfo, data }) {
  const markers = data.map(loc => {
    return {
      label: loc.name,
      lat: Number(loc.latitude),
      lng: Number(loc.longitude)
    }
  })

  return (
    <Layout>
      <ParkPage
        pageTitle='Camping'
        parkInfo={parkInfo}
        mapMarkers={markers}
      >
        {data.map((cg) => (
          <MediaCard
            key={cg.id}
            img={cg.images.length ? `${cg.images[0].url}?quality=90&width=1000` : ''}
            imgHeight={170}
            title={cg.name}
            subtitle=''
            description={cg.description}
            links={[
              {href: cg.url, text: 'Read more at nps.gov'}
            ]}
          />
        ))}
      </ParkPage>
    </Layout>
  )
}
