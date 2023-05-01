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
      <SubPage parkInfo={parkInfo} pageTitle='Info' parkCode={parkCode}>
        <div className="grid">
          {/* <div className="grid__item">
            <Map 
              center={{
                lat: Number(parkInfo.latitude),
                lng: Number(parkInfo.longitude)
              }}
            />
          </div> */}
          <div className="grid__item grid__item--9">
            <div className="grid">
              <div className="grid__item">
                <MediaCard 
                  // img={`/images/${parkCode}.jpg`}
                  // imgHeight={280}
                  title="About"
                  // subtitle={`${parkInfo.location.city}, ${parkInfo.location.state}`}
                  description={parkInfo.description}
                />
              </div>
              <div className="grid__item">
                <MediaCard 
                  title="Directions"
                  description={data.directionsInfo}
                />
              </div>
              <div className="grid__item grid__item--6">
                <MediaCard
                  title="Address"
                >
                  <div>
                    {data.addresses[0].line1}<br />
                    {data.addresses[0].city}, {data.addresses[0].stateCode} {data.addresses[0].postalCode}
                  </div>
                </MediaCard>
              </div>
              <div className="grid__item grid__item--6">            
                <MediaCard
                  title="Contact"
                >
                  <b>Email:</b> {data.contacts.emailAddresses[0].emailAddress}<br />
                  <b>Phone:</b> {data.contacts.phoneNumbers[0].phoneNumber}
                </MediaCard>
              </div>
              <div className="grid__item">
                <MediaCard 
                  title="Activities"
                  description={data.activities.map(act => act.name).join(' · ')}
                />
              </div>
              <div className="grid__item">
                <MediaCard 
                  title="Photos"
                >
                  {data.images.map((image) => {
                    return (
                      <div>
                        <img src={`${image.url}?quality=90&width=1368`} alt={image.altText} title={image.credit}/>
                        <p>{image.caption}</p><br />
                      </div>
                    )
                  })}
                </MediaCard>
              </div>
            </div>
          </div>
          <div className="grid__item grid__item--3">
            <div className="grid">
              <div className="grid__item">
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
              </div>
              
              <div className="grid__item">
                <MediaCard 
                  title="Weather Info"
                  description={data.weatherInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </SubPage>
    </Layout>
  )
}