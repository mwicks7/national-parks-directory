import { getParkData } from '../../lib/npsApi'
import { getParkPaths, getParkInfo } from '../../lib/dbParks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'
import MediaCard from '../../components/mediaCard'
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
  const parkData = await getParkData('campgrounds', params.id)

  return { 
    props: { 
      parkCode: params.id,
      parkInfo: parkInfo[0],
      data: parkData.data,
    } 
  }
}

export default function Campgrounds({ parkCode, parkInfo, data }) {
  console.log(data)

  return (
    <Layout>
      <SubPage pageTitle='Campgrounds' parkInfo={parkInfo} parkCode={parkCode}>
        <section>
          <Grid container spacing={2}>
            {data.map((cg) => (
              <Grid item xs="12" md="6">
                <MediaCard 
                  key={cg.id}
                  img={cg.images.length ? `${cg.images[0].url}?quality=90&width=1000` : ''}
                  title={cg.name}
                  subtitle=''
                  description={cg.description}
                  links={[
                    {href: cg.url, text: 'More info @ nps.gov'}                
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