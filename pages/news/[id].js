import { getParkData } from '../../lib/nps_parks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'

export async function getServerSideProps({ params }) {
  const park = await getParkData('newsreleases', params.id)
  return { 
    props: { 
      parkCode: params.id,
      data: park.data
    } 
  }
}

export default function News({ parkCode, data }) {
  console.log(data)

  return (
    <Layout>
      <SubPage page='news' parkCode={parkCode}>
        <section>
          <ul>
            {data.map((news) => (
              <li key={news.id}>
                <h2>{news.title}</h2>
              </li>
            ))}
          </ul>
        </section>
      </SubPage>
    </Layout>
  )
}