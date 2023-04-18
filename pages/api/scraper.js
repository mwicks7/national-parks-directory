import { updateDataWithScraper } from '../../lib/dbParks'
import { getParkData } from '../../lib/npsApi'

const dataTypes = [
  // 'parks',
  // 'visitorcenters',
  // 'campgrounds',
  // 'places',
  // 'thingstodo',
  'articles'
]

export default async function handler(req, res) {
  const {parkCode} = JSON.parse(req.body)
  const responses = []
  
  if (res.status(200)) {
    await Promise.all(dataTypes.map(async dataType => {
      const parkData = await getParkData(dataType, parkCode)
      const response = await updateDataWithScraper(parkData, dataType, parkCode)
      responses.push(response)
    }))

    return responses
  }
}
