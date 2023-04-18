import { getParkPaths, getParkInfo, getParkData } from '../../lib/dbParks'
import { getCurrentWeather } from '../../lib/weatherApi'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'
import MediaCard from '../../components/mediaCard'
import Grid from '@mui/material/Grid'
import Map from '../../components/map'
import Paper from '@mui/material/Paper'
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
  console.log(parkData.data)
  return { 
    props: { 
      parkCode: params.id,
      parkInfo: parkInfo,
      data: parkData.data[0],
    } 
  }
}


export default function Park({ parkCode, parkInfo, data }) {
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
        {!parkInfo.description && 
          <button onClick={handleParkUpdate}>Update DB</button>
        }

        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Map 
              center={{
                lat: Number(parkInfo.latitude),
                lng: Number(parkInfo.longitude)
              }}
            />
          </Grid>
          <Grid item sm={9}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <MediaCard 
                  title="Directions"
                  description={data.directionsInfo}
                />
              </Grid>
              <Grid item sm={6}>
                <MediaCard
                  title="Address"
                >
                  <div>
                    {data.addresses[0].line1}<br />
                    {data.addresses[0].city}, {data.addresses[0].stateCode} {data.addresses[0].postalCode}
                  </div>
                </MediaCard>
              </Grid>
              <Grid item sm={6}>             
                <MediaCard
                  title="Contact"
                >
                  <b>Email:</b> {data.contacts.emailAddresses[0].emailAddress}<br />
                  <b>Phone:</b> {data.contacts.phoneNumbers[0].phoneNumber}
                </MediaCard>
              </Grid>
              <Grid item sm={12}>
                <MediaCard 
                  title="Activities"
                  description={data.activities.map(act => act.name).join(' · ')}
                />
              </Grid>
            </Grid>
            <Grid item sm={12}>
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
            </Grid>
          </Grid>
          <Grid item sm={3}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
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
              </Grid>
              
              <Grid item sm={12}>
                <MediaCard 
                  title="Weather Info"
                  description={data.weatherInfo}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SubPage>
    </Layout>
  )
}