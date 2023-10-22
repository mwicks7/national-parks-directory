import { getParkPaths, getParkInfo, getParkData } from '../../lib/dbParks'
import { getCurrentWeather } from '../../lib/weatherApi'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'
import MediaCard from '../../components/mediaCard'
import Map from '../../components/map'
import { useState, useEffect } from "react";

export async function getStaticPaths() {
  const paths = await getParkPaths()
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const parkInfo = await getParkInfo(params.id)
  const parkData = await getParkData('info', params.id)
  return {
    props: {
      parkCode: params.id,
      parkInfo: parkInfo,
      data: parkData.data[0],
    }
  }
}


export default function Photos({ parkCode, parkInfo, data }) {
  const pageTitle = 'Photos'
  const markers = data.images.map(loc => {
    return {
      label: loc.caption,
      lat: Number(loc.latitude),
      lng: Number(loc.longitude)
    }
  })

  return (
    <Layout>
      <SubPage
        parkInfo={parkInfo}
        pageTitle={pageTitle}
        parkCode={parkCode}
        mapMarkers={markers}
      >
        {data.images.map((image) => {
          return (
            <MediaCard
              img={image.url}
              description={image.caption}
            >
            </MediaCard>
          )
        })}
      </SubPage>
    </Layout>
  )
}
