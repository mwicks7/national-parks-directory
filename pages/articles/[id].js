import { getParkData } from '../../lib/npsApi'
import { getParkInfo } from '../../lib/dbParks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'
import MediaCard from '../../components/mediaCard'
import Grid from '@mui/material/Grid'

export async function getServerSideProps({ params }) {
  const parkInfo = await getParkInfo(params.id)
  const parkData = await getParkData('articles', params.id)

  return { 
    props: { 
      parkCode: params.id,
      parkInfo: parkInfo[0],
      data: parkData.data,
    } 
  }
}

export default function Articles({ parkCode, parkInfo, data }) {

  return (
    <Layout>
      <SubPage pageTitle='Articles' parkInfo={parkInfo} parkCode={parkCode}>
        <section>
          <Grid container spacing={2}>
            {data.map((article) => (
              <Grid item sm={12} md={12} key={article.id}>
                <MediaCard 
                  imgHeight={500}
                  title={article.title}
                  subtitle={article.description}
                  description={article.listingDescription}
                  img={article.listingImage.url}
                />
              </Grid> 
            ))}
          </Grid>
        </section>
      </SubPage>
    </Layout>
  )
}