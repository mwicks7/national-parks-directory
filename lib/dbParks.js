import clientPromise from "./mongodb";

export async function getAllParks() {
  try {
    const client = await clientPromise;
    const db = client.db("national_parks")

    const parksData = await db
        .collection("parks")
        .find({})
        .sort({ "location.stateFull": 1 })
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
        .toArray()
    
    return JSON.parse(JSON.stringify(parksData[0]))
  } catch (e) {
      console.error(e)
  }
}

export async function getParkData(collection, parkCode) {
  try {
    const client = await clientPromise;
    const db = client.db("national_parks")

    const parksData = await db
        .collection(collection)
        .find({parkCode: parkCode})
        .toArray()
    
    return JSON.parse(JSON.stringify(parksData[0]))
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
  const client = await clientPromise;
  const db = client.db("national_parks")
  const result = await db
    .collection("parks")
    .updateOne(
      { parkCode: data.parkCode }, 
      { $set: data}, 
      { upsert: false }
    )
}

export async function updateDataWithScraper(data, dataType, parkCode) {
  if (dataType === 'parks') {
    dataType = 'info'
  }
  console.log(dataType)

  const client = await clientPromise;
  const db = client.db("national_parks")
  const result = await db
    .collection(dataType)
    .updateOne(
      { parkCode: parkCode }, 
      { $set: data}, 
      { upsert: true }
    )

  console.log(parkCode)
  return result
}
