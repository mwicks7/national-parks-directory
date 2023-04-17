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
  // console.log(data.parkCode)
  const client = await clientPromise;
  const db = client.db("national_parks")
  const result = await db
    .collection("parks")
    .updateOne(
      { parkCode: data.parkCode }, 
      { $set: data}, 
      { upsert: false }
    )
  
    console.log(result)
}

export async function updateParkStateFull() {
  const stateData = {
    'CA': 'California',
    'AK':'Alaska',
    'AR':'Arkansas',
    'FL':'Florida',
    'HI':'Hawaii',
    'ID':'Idaho',
    'KY':'Kentucky',
    'ME':'Maine',
    'MN':'Minnesota',
    'MT':'Montana',
    'NV':'Nevada',
    'NM':'New Mexico',
    'NC':'North Carolina',
    'ND':'North Dakota',
    'OH':'Ohio',
    'AZ':'Arizona',
    'CO':'Colorado'
  }
  const client = await clientPromise;
  const db = client.db("national_parks")

  for (const state in stateData) {
    const result = await db
      .collection("parks")
      .updateMany(
        {"location.state": { $eq: state }}, 
        { $set: {"location.stateFull": stateData[state]}},
        { upsert: false }
      )
    
    console.log(result)
  }

}