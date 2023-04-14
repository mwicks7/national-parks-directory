import { getParkData } from '../../lib/nps_parks'
import { getParkPaths } from '../../lib/db_parks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'


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
      <SubPage page='visitorcenters' parkCode={parkCode}>
        <section>
          <ul>
            {data.map((visitorcenters) => (
              <li key={visitorcenters.id}>
                <h2>{visitorcenters.name}</h2>
              </li>
            ))}
          </ul>
        </section>
      </SubPage>
    </Layout>
  )
}