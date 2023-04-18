
export async function getCurrentWeather(lat, lng) {
const response = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${lat},${lng}`,
  {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0b1ffcf427mshee9a52560fb17bap1ca387jsnc4734d8933a4',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  }
)
const data = await response.json()
return data
}