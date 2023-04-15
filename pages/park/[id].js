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
  const park = await getParkData('parks', params.id)
  return { 
    props: { 
      parkCode: params.id,
      data: park.data[0]
    } 
  }
}

export default function Park({ parkCode, data }) {
  console.log(data)

  return (
    <Layout>
      <SubPage pageTitle='Info' parkCode={parkCode}>
        <section>
          <h1>{data.fullName}</h1>
          <p>{data.description}</p>
        </section>
      </SubPage>
    </Layout>
  )
}