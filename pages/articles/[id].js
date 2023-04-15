import { getParkData } from '../../lib/nps_parks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'
import MediaCard from '../../components/mediaCard'
import Grid from '@mui/material/grid'

export async function getServerSideProps({ params }) {
  const park = await getParkData('articles', params.id)
  return { 
    props: { 
      parkCode: params.id,
      data: park.data
    } 
  }
}

export default function Articles({ parkCode, data }) {
  console.log(data)

  return (
    <Layout>
      <SubPage pageTitle='Articles' parkCode={parkCode}>
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