export async function fetchWeatherForStops(stops) {
  const entries = await Promise.all(stops.map(async (stop) => {
    try {
      const [lat, lon] = stop.coords
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=7`
      const res = await fetch(url)
      const data = await res.json()
      return [stop.id, data]
    } catch {
      return [stop.id, null]
    }
  }))

  return Object.fromEntries(entries)
}

export const weatherCodeText = {
  0: 'Klart',
  1: 'Mestadels klart',
  2: 'Delvis molnigt',
  3: 'Molnigt',
  45: 'Dimma',
  48: 'Dimma',
  51: 'Duggregn',
  53: 'Duggregn',
  55: 'Duggregn',
  61: 'Lätt regn',
  63: 'Regn',
  65: 'Kraftigt regn',
  71: 'Snö',
  73: 'Snö',
  75: 'Snö',
  80: 'Skurar',
  81: 'Skurar',
  82: 'Kraftiga skurar',
  95: 'Åska'
}
