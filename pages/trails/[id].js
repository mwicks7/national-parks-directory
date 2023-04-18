import { getParkPaths, getParkInfo, getParkData } from '../../lib/dbParks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'
import MediaCard from '../../components/mediaCard'
import Map from '../../components/map'
import Grid from '@mui/material/Grid'


export async function getStaticPaths() {
  const paths = await getParkPaths()
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const parkInfo = await getParkInfo(params.id)
  const parkData = await getParkData('places', params.id)
  return { 
    props: { 
      parkCode: params.id,
      parkInfo: parkInfo,
      data: parkData.data,
    } 
  }
}

export default function Trails({ parkCode, parkInfo, data }) {
  const markers = data.map(loc => {
    return {
      label: loc.title,
      lat: Number(loc.latitude),
      lng: Number(loc.longitude)
    }
  })

  return (
    <Layout>
      <SubPage pageTitle='Trails' parkInfo={parkInfo} parkCode={parkCode}>
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
            {data.map((trails) => (
              
              <Grid item xs="12" md="6">
                <MediaCard 
                  key={trails.id}
                  img={trails.images.length ? `${trails.images[0].url}?quality=90&width=1000` : ''}
                  title={trails.title}
                  subtitle=''
                  description={trails.listingDescription}
                  links={[
                    {href: trails.url, text: 'More info @ nps.gov'}                
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