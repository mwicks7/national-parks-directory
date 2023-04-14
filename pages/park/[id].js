import { getParkData } from '../../lib/nps_parks'
import { getParkPaths } from '../../lib/db_parks'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'

export async function getStaticPaths() {
  const paths = await getParkPaths()
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const park = await getParkData('parks', params.id)
  return { props: { park: park.data[0] } }
}

export default function Park({ park }) {
  console.log(park)
  // const data = park.data[0]

  return (
    <Layout>
      <section>
        <h1>{park.fullName}</h1>
        <p>{park.description}</p>
      </section>
    </Layout>
  )
}