import { getParkPaths, getParkInfo, getParkData } from "../../lib/dbParks"
import ParkPage from "../../components/parkPage"

export async function getStaticPaths() {
  const paths = await getParkPaths()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const parkInfo = await getParkInfo(params.id)
  const parkData = await getParkData("articles", params.id)

  return {
    props: {
      parkInfo: parkInfo,
      data: parkData.data,
    },
  }
}

export default function Articles({ parkInfo, data }) {
  return <ParkPage pageTitle="Articles" parkInfo={parkInfo} data={data} />
}
