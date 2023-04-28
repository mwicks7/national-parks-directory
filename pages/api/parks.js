import { getAllParks } from '../../lib/dbParks'

export default async function handler(req, res) {  
  const responseData = await getAllParks()

  console.log(responseData)
  res.status(200).json(responseData)
}


