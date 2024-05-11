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
  const parkData = await getParkData("visitorcenters", params.id)
  return {
    props: {
      parkInfo: parkInfo,
      data: parkData.data,
    },
  }
}

export default function VisitorCenters({ parkInfo, data }) {
  return (
    <ParkPage pageTitle="Visitor Centers" parkInfo={parkInfo} data={data} />
  )
}
