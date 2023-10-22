import { getParkPaths, getParkInfo, getParkData } from '../../lib/dbParks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'
import MediaCard from '../../components/mediaCard'
import Grid from '@mui/material/Grid'
import Map from '../../components/map'

export async function getStaticPaths() {
  const paths = await getParkPaths()
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const parkInfo = await getParkInfo(params.id)
  const parkData = await getParkData('visitorcenters', params.id)
  return {
    props: {
      parkCode: params.id,
      parkInfo: parkInfo,
      data: parkData.data,
    }
  }
}

export default function VisitorCenters({ parkCode, parkInfo, data }) {

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
        pageTitle='Visitor Centers'
        parkInfo={parkInfo}
        parkCode={parkCode}
        mapMarkers={markers}>

          {data.map((vc) => (
            <MediaCard
              key={vc.id}
              img={vc.images.length ? `${vc.images[0].url}?quality=90&width=1000` : ''}
              imgHeight={170}
              title={vc.name}
              subtitle=''
              description={vc.description}
              links={[
                {href: vc.url, text: 'Read more at nps.gov'}
              ]}
            />
          ))}
      </SubPage>
    </Layout>
  )
}
