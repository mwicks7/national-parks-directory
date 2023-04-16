import { getParkData } from '../../lib/npsApi'
import { getParkInfo } from '../../lib/dbParks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'
import MediaCard from '../../components/mediaCard'
import Grid from '@mui/material/Grid'

export async function getServerSideProps({ params }) {
  const parkInfo = await getParkInfo(params.id)
  const parkData = await getParkData('newsreleases', params.id)

  return { 
    props: { 
      parkCode: params.id,
      parkInfo: parkInfo[0],
      data: parkData.data,
    } 
  }
}

export default function News({ parkCode, parkInfo, data }) {
  console.log(data)

  return (
    <Layout>
      <SubPage pageTitle='News' parkInfo={parkInfo} parkCode={parkCode}>
        <section>
          <Grid container spacing={2}>
            {data.map((article) => (
              <Grid item sm={12} md={12} key={article.id}>
                <MediaCard 
                  imgHeight={500}
                  title={article.title}
                  subtitle={article.releaseDate}
                  description={article.abstract}
                  img={article.image.url}
                />
              </Grid> 
            ))}
          </Grid>
        </section>
      </SubPage>
    </Layout>
  )
}