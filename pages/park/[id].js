import { getParkData } from '../../lib/npsApi'
import { getParkPaths, getParkInfo } from '../../lib/dbParks'
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
  const parkData = await getParkData('parks', params.id)

  return { 
    props: { 
      parkCode: params.id,
      parkInfo: parkInfo[0],
      data: parkData.data[0],
    } 
  }
}

export default function Park({ parkCode, parkInfo, data }) {
  console.log(data)

  const handleParkUpdate = async () => {
    await fetch('/api/park', 
      {
        method: "POST",
        body: JSON.stringify({ 
          parkCode: parkCode,
          latitude: data.latitude,
          longitude: data.longitude,
          description: data.description
        })
      }
    )
  }

  return (
    <Layout>
      <SubPage parkInfo={parkInfo} pageTitle='Info' parkCode={parkCode}>
        {!parkInfo.description && 
          <button onClick={handleParkUpdate}>Update DB</button>
        }

        <Map />
        <Grid container spacing={2}>
          <Grid item sm={9}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <MediaCard 
                  title="Directions"
                  description={data.directionsInfo}
                />
              </Grid>
              <Grid item sm={12}>
                <MediaCard 
                  title="Weather Info"
                  description={data.weatherInfo}
                />
              </Grid>
              <Grid item sm={12}>
                <MediaCard 
                  title="Activities"
                  description={data.activities.map(act => act.name).join(' · ')}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={3}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <MediaCard
                  title="Addresses"
                />
              </Grid>
              <Grid item sm={12}>             
                <MediaCard
                  title="Contact"
                >
                </MediaCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SubPage>
    </Layout>
  )
}