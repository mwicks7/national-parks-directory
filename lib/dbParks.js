import clientPromise from "./mongodb";

export async function getAllParks() {
  try {
    const client = await clientPromise;
    const db = client.db("national_parks")

    const parksData = await db
        .collection("parks")
        .find({})
        .sort({ name: 1 })
        .toArray()
    
    return JSON.parse(JSON.stringify(parksData))
  } catch (e) {
      console.error(e)
  }
}

export async function getParkInfo(parkCode) {
  try {
    const client = await clientPromise;
    const db = client.db("national_parks")

    const parksData = await db
        .collection("parks")
        .find({parkCode: parkCode})
        .sort({ name: 1 })
        .toArray()
    
    return JSON.parse(JSON.stringify(parksData))
  } catch (e) {
      console.error(e)
  }
}

export async function getParkPaths() {
  const parksData = await getAllParks()
      
  return parksData.map((park) => {
    return {
      params: {
        id: park.parkCode
      }
    }
  })
}

export async function updatePark(data) {
  console.log(data)
  const client = await clientPromise;
  const db = client.db("national_parks")
  const result = await db
    .collection("parks")
    .updateOne(
      { parkCode: data.parkCode }, 
      { $set: data }, 
      { upsert: true }
    )

  console.log(result)

}