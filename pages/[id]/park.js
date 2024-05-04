import { getParkPaths, getParkInfo, getParkData } from "../../lib/dbParks"
import { getCurrentWeather } from "../../lib/weatherApi"
import Layout from "../../components/layout"
import ParkPage from "../../components/parkPage"
import MediaCard from "../../components/mediaCard"
import { useState, useEffect } from "react"

export async function getStaticPaths() {
  const paths = await getParkPaths()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const parkInfo = await getParkInfo(params.id)
  const parkData = await getParkData("info", params.id)

  return {
    props: {
      parkInfo: parkInfo,
      data: parkData.data[0],
    },
  }
}

export default function Park({ parkInfo, data }) {
  const markers = [
    {
      label: data.fullName,
      lat: Number(data.latitude),
      lng: Number(data.longitude),
    },
  ]

  const [weatherData, setWeatherData] = useState({})

  const handleGetCurrentWeather = async (lat, lng) => {
    const response = await getCurrentWeather(lat, lng)
    setWeatherData(response)
  }

  useEffect(() => {
    handleGetCurrentWeather(parkInfo.latitude, parkInfo.longitude)
  }, [data, parkInfo.latitude, parkInfo.longitude])

  return (
    <Layout>
      <ParkPage parkInfo={parkInfo} pageTitle="Info" mapMarkers={markers}>
        <>
          <MediaCard
            img={
              data.images.length > 0 && {
                url: `${data.images[0].url}?quality=75&width=600`,
                altText: data.images[0].altText,
              }
            }
            title="About"
            description={parkInfo.description}
            links={[
              {
                href: `https://nps.gov/${parkInfo.parkCode}`,
                text: "Read more at nps.gov",
              },
            ]}
          />

          <MediaCard title="Directions" description={data.directionsInfo} />

          <MediaCard title="Weather Info" description={data.weatherInfo}>
            {weatherData.current && (
              <div className="weather-data">
                <img
                  aria-hidden="true"
                  src={`https:${weatherData.current.condition.icon}`}
                />
                <p>
                  Currently {weatherData.current.temp_f}&deg; (
                  {weatherData.current.condition.text})
                </p>
              </div>
            )}
          </MediaCard>

          {data.images.map((image, i) => {
            return i === 0 ? (
              <MediaCard
                title={i === 1 ? "Photos" : null}
                img={{
                  url: `${image.url}?quality=75&width=600`,
                  altText: image.altText,
                }}
                description={image.caption}
              ></MediaCard>
            ) : null
          })}
        </>
      </ParkPage>
    </Layout>
  )
}
