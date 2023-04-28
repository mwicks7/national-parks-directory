import { getAllParks } from "../lib/dbParks"

import Link from 'next/link'
import { useState } from 'react'
import Layout from '../components/layout'
import Map from '../components/map'
import MediaCard from '../components/mediaCard'
import { urlString } from '../lib/utilities'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

export default function Home({ parks }) {
  const allGroupedParks = groupParks(parks)
  const [groupedParks, setGroupedParks] = useState(allGroupedParks)
  const [stateFilterValue, setStateFilterValue] = useState('')
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
      content.push()

      content.push(
        <div id={urlString(key)} className="state-group">
          <h2 className="align-center h1">{key}</h2>
          <div className="grid">
            {parks[key].map(park => (
              <div className="grid__item">
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
              </div>
            ))}
          </div>
        </div>
      )
    }
    return content
  }

  return (
    <Layout page="Home">
          {/* <FormControl size="large" sx={{ m: 1, minWidth: 200 }} variant="filled">
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
          </FormControl> */}

          {/* <Map 
            center={{
              lat: 39.89442907857087,
              lng: -96.7528869301745
            }}
            markers={markers}
            zoom={4}
          /> */}
      

        {getGroupedParks(groupedParks)}
    </Layout>
  )
}


export async function getStaticProps() {
  const parks = await getAllParks()
  return { props: { parks } }
}
