import { getAllParks } from "../lib/dbParks"

import Link from 'next/link'
import { useState } from 'react'
import Layout from '../components/layout'
import Map from '../components/map'
import MediaCard from '../components/mediaCard'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export async function getStaticProps() {
  const parks = await getAllParks()
  return { props: { parks } }
}

function groupParks(parks) {
  let groupedParks = {}

  parks.map(park => {
    const { stateFull } = park.location
    if (groupedParks[stateFull]) {
      groupedParks[stateFull].push(park)
    } else {
      groupedParks[stateFull] = [park]
    }
  })

  return groupedParks
}

function extractStates(parks) {
  let states = []
  parks.map(park => {
    if (!states.includes(park.location.stateFull)) {
      states.push(park.location.stateFull)
    }
  })
  return states
}


export default function Home({ parks }) {
  const allGroupedParks = groupParks(parks)
  const [groupedParks, setGroupedParks] = useState(allGroupedParks)
  const [stateFilterValue, setStateFilterValue] = useState('')
  const statesMenu = extractStates(parks)
  const markers = parks.map(park => {
    return {
      label: park.name,
      lat: Number(park.latitude),
      lng: Number(park.longitude)
    }
  })
  
  function handleStateFilter(e) {
    const stateName = e.target.value
    if (stateName === 'all') {
      setGroupedParks(allGroupedParks)
    } else {
      setGroupedParks({
        [stateName]: allGroupedParks[stateName]
      })
    }
    setStateFilterValue(stateName)
  }
  
  const getGroupedParks = (parks) => {
    let content = []
    for (const key in parks) {
      content.push(<h2>{key}</h2>)

      content.push(
        <Grid container spacing={2}>
          {parks[key].map(park => (
            <Grid item xs={12}>
              <MediaCard 
                key={park.parkCode}
                imgHeight={280}
                img={`/images/${park.parkCode}.jpg`}
                title={park.name}
                subtitle={`${park.location.city}, ${park.location.state}`}
                description={park.description}
                links={[
                  {href: `/park/${park.parkCode}`, text: 'Info & Maps'},
                  {href: `https://www.nps.gov/${park.parkCode}`, text: 'NPS.gov'}                
                ]}
              />
            </Grid>
          ))}
        </Grid>
      )
    }
    return content
  }

  return (
    <Layout page="Home">
      <Grid container spacing={2}>
        <Grid item sm={12} md={9}>
          <h1>The National Parks of The United States</h1>
        </Grid>
        <Grid item sm={12} md={3}>
          <FormControl size="large" sx={{ m: 1, minWidth: 200 }} variant="filled">
            <InputLabel id="simple-select-label">Filter by state</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={stateFilterValue}
              onChange={handleStateFilter}
            >
              <MenuItem value="all" >All</MenuItem>
              {statesMenu.map(stateName => (
                <MenuItem key={stateName} value={stateName} >{`${stateName} (${allGroupedParks[stateName].length})`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item sm={12}>
          <Map 
            center={{
              lat: 39.89442907857087,
              lng: -96.7528869301745
            }}
            markers={markers}
            zoom={4}
          />
        </Grid>         */}
      </Grid>
      

      <div>
        {getGroupedParks(groupedParks)}
      </div>
    </Layout>
  )
}