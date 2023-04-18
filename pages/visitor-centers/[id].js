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
      <SubPage pageTitle='Visitor Centers' parkInfo={parkInfo} parkCode={parkCode}>
        <section>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Map 
                center={{
                  lat: Number(parkInfo.latitude),
                  lng: Number(parkInfo.longitude)
                }}
                markers={markers}
              />
            </Grid>
            {data.map((vc) => (
              <Grid item xs="12" md="6">
                <MediaCard 
                  key={vc.id}
                  img={vc.images.length ? `${vc.images[0].url}?quality=90&width=1000` : ''}
                  title={vc.name}
                  subtitle=''
                  description={vc.description}
                  links={[
                    {href: vc.url, text: 'More info @ nps.gov'}                
                  ]}
                />
              </Grid>
            ))}
          </Grid>
        </section>
      </SubPage>
    </Layout>
  )
}