import { getParkPaths, getParkInfo, getParkData } from '../../lib/dbParks'
import { getCurrentWeather } from '../../lib/weatherApi'
import Layout from '../../components/layout'
import ParkPage from '../../components/parkPage'
import MediaCard from '../../components/mediaCard'
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
      parkInfo: parkInfo,
      data: parkData.data[0],
    }
  }
}

export default function Park({ parkInfo, data }) {
  const [weatherData, setWeatherData] = useState({});

  const handleGetCurrentWeather = async (lat, lng) => {
    const response = await getCurrentWeather(lat, lng)
    setWeatherData(response)
  }

  useEffect(() => {
    handleGetCurrentWeather(parkInfo.latitude, parkInfo.longitude)
  }, [data, parkInfo.latitude, parkInfo.longitude])

  return (
    <Layout>
      <ParkPage
        parkInfo={parkInfo}
        pageTitle='Info'
      >
        <>
          <MediaCard
            img={`/images/${parkInfo.parkCode}.jpg`}
            title="About"
            description={parkInfo.description}
            links={[
              {href: `https://nps.gov/${parkInfo.parkCode}`, text: 'Read more at nps.gov'}
            ]}
          />

          <MediaCard
            title="Directions"
            description={data.directionsInfo}
          />

          <MediaCard
            title="Weather Info"
            description={data.weatherInfo}
          />

          <MediaCard
            title="Current Weather"
          >
            {weatherData.current &&
              <div class="weather-data">
                <div>{weatherData.current.temp_f}&#8457;</div>
                <div><img src={`https:${weatherData.current.condition.icon}`} /></div>
                <div>{weatherData.current.condition.text}</div>
              </div>
            }
          </MediaCard>
        </>
      </ParkPage>
    </Layout>
  )
}
