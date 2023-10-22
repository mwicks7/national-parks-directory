import { getParkPaths, getParkInfo, getParkData } from '../../lib/dbParks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'
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
      parkCode: params.id,
      parkInfo: parkInfo,
      data: parkData.data,
    }
  }
}

export default function Camping({ parkCode, parkInfo, data }) {
  const markers = data.map(loc => {
    return {
      label: loc.name,
      lat: Number(loc.latitude),
      lng: Number(loc.longitude)
    }
  })

  return (
    <Layout>
      <SubPage
        pageTitle='Camping'
        parkInfo={parkInfo}
        parkCode={parkCode}
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
      </SubPage>
    </Layout>
  )
}
