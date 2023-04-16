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
  console.log(data)

  return (
    <Layout>
      <SubPage pageTitle='Articles' parkInfo={parkInfo} parkCode={parkCode}>
        <section>
          <ul>
            {data.map((article) => (
              <li key={article.id}>
                <h2>{article.title}</h2>
              </li>
            ))}
          </ul>
        </section>
      </SubPage>
    </Layout>
  )
}