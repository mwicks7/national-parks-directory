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
  const park = await getParkData('visitorcenters', params.id)
  return { 
    props: { 
      parkCode: params.id,
      data: park.data
    } 
  }
}

export default function VisitorCenters({ parkCode, data }) {
  console.log(data)

  return (
    <Layout>
      <SubPage pageTitle='Visitor Centers' parkCode={parkCode}>
        <section>
          <Grid container spacing={2}>
            {data.map((vc) => (
              <Grid item xs="12" md="6">
                <MediaCard 
                  key={vc.id}
                  img={vc.images.length ? `${vc.images[0].url}?quality=90&width=1000` : ''}
                  title={vc.name}
                  subtitle=''
                  links={[
                    {href: vc.url, text: 'NPS.gov'}                
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