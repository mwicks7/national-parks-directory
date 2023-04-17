import { updatePark, updateParkStateFull } from '../../lib/dbParks'

export default async function handler(req, res) {
  await updateParkStateFull()

  // const requestMethod = req.method;
  // const data = JSON.parse(req.body)

  // switch (requestMethod) {
  //   case 'POST':
  //     await updatePark(data)
      
  //   // handle other HTTP methods
  //   default:
  //     res.status(200).json({ message: 'Welcome to API Routes!'})
  // }
}