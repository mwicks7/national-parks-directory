import { getParkPaths, getParkInfo, getParkData } from "../../lib/dbParks"
import Layout from "../../components/layout"
import ParkPage from "../../components/parkPage"
import MediaCard from "../../components/mediaCard"

export async function getStaticPaths() {
  const paths = await getParkPaths()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const parkInfo = await getParkInfo(params.id)
  const parkData = await getParkData("thingstodo", params.id)

  return {
    props: {
      parkInfo: parkInfo,
      data: parkData.data,
    },
  }
}

export default function Park({ parkInfo, data }) {
  return <ParkPage pageTitle="Things To Do" parkInfo={parkInfo} data={data} />
}
