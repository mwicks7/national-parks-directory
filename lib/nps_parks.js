const apiKey = process.env.NPS_API_KEY

export async function getParkData(dataType, parkCode) {
  const url = `https://developer.nps.gov/api/v1/${dataType}?parkCode=${parkCode}`
  const response = await fetch(url, { 
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": 'wsWAgTFex6ocFDpAG8wx2G8qB2jfqwiZgPqFVOgp',
    }, 
  })
  
  const data = await response.json()

  return data
}