const apiKey = process.env.NPS_API_KEY

export async function getParkData(dataType, parkCode) {
  let moreParams = ''

  if (dataType === 'places') moreParams = '&q=trailhead'

  const url = `https://developer.nps.gov/api/v1/${dataType}?parkCode=${parkCode}${moreParams}`

  const response = await fetch(url, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": process.env.NEXT_PUBLIC_NPS_API_KEY,
    },
  })


  const data = await response.json()

  return data
}
