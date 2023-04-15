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