import { getParkData } from '../../lib/nps_parks'
import { getParkPaths } from '../../lib/db_parks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'
import MediaCard from '../../components/mediaCard'
import Grid from '@mui/material/grid'


export async function getStaticPaths() {
  const paths = await getParkPaths()
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const park = await getParkData('places', params.id)
  return { 
    props: { 
      parkCode: params.id,
      data: park.data
    } 
  }
}

export default function Hiking({ parkCode, data }) {
  console.log(data)

  return (
    <Layout>
      <SubPage pageTitle='Hiking' parkCode={parkCode}>
        <section>
          <Grid container spacing={2}>
            {data.map((places) => (
              <Grid item xs="12" md="6">
                <MediaCard 
                  key={places.id}
                  img={places.images.length ? `${places.images[0].url}?quality=90&width=1000` : ''}
                  title={places.title}
                  subtitle=''
                  links={[
                    {href: places.url, text: 'NPS.gov'}                
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