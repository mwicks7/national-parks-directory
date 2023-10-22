export async function getCurrentWeather(lat, lng) {
  const response = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${lat},${lng}`,
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    }
  )
  const data = await response.json()
  return data
}
