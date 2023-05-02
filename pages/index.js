import { getAllParks } from "../lib/dbParks"

import Link from 'next/link'
import { useState } from 'react'
import Layout from '../components/layout'
import Map from '../components/map'
import MediaCard from '../components/mediaCard'
import { urlString } from '../lib/utilities'

function groupParksData(parks) {
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

const GroupedParks = ({ parks }) => {
  let content = []
  const parkGroups = groupParksData(parks)
  for (const key in parkGroups) {
    content.push(
      <div id={urlString(key)} className="state-group">
        <h2 className="align-center h1">{key}</h2>
        <div className="grid">
          {parkGroups[key].map(park => (
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

export default function Home({ parks }) {
  return (
    <Layout page="Home">
      <GroupedParks parks={parks} />
    </Layout>
  )
}

export async function getStaticProps() {
  const parks = await getAllParks()
  return { props: { parks } }
}
