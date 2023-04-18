
import { getAllParks } from '../../lib/dbParks'

export async function getStaticProps() {
  const parks = await getAllParks()
  return { props: { parks } }
}

export default function DataScraper({ parks }) {

  const handleScrape = async (parkCode) => {
    const response = await fetch('/api/scraper', 
    {
      method: 'POST',
      body: JSON.stringify({ 
        parkCode: parkCode
      })
    })
  }

  return (
    <div>
      {parks.map((park) => (
        <p>
          {park.name}: 
          <button onClick={() => handleScrape(park.parkCode)} >Scrape {park.parkCode}</button>
        </p>
      ))}
    </div>
  )
}