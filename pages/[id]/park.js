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
      parkCode: params.id,
      parkInfo: parkInfo,
      data: parkData.data[0],
    }
  }
}


export default function Park({ parkCode, parkInfo, data }) {
  const pageTitle = 'Info'
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
        parkCode={parkCode}
      >
        <>
          <MediaCard
            img={`/images/${parkCode}.jpg`}
            title="About"
            description={parkInfo.description}
            links={[
              {href: `https://nps.gov/${parkCode}`, text: 'Read more at nps.gov'}
            ]}
          />

          <MediaCard
            title="Directions"
            description={data.directionsInfo}
          />

          {/* <MediaCard
            title="Address"
          >
            <div>
              {data.addresses[0].line1}<br />
              {data.addresses[0].city}, {data.addresses[0].stateCode} {data.addresses[0].postalCode}
            </div>
          </MediaCard> */}

          {/* <MediaCard
            title="Contact"
          >
            <b>Email:</b> {data.contacts.emailAddresses[0].emailAddress}<br />
            <b>Phone:</b> {data.contacts.phoneNumbers[0].phoneNumber}
          </MediaCard> */}

          {/* <MediaCard
            title="Activities"
            description={data.activities.map(act => act.name).join(' · ')}
          /> */}

          <MediaCard
            title="Weather Info"
            description={data.weatherInfo}
          />

          <MediaCard
            title="Current Weather"
          >
            {weatherData.current &&
              <div className="flex-row center-text">
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
