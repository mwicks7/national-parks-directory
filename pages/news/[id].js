import { getParkData } from '../../lib/npsApi'
import { getParkInfo } from '../../lib/dbParks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'

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