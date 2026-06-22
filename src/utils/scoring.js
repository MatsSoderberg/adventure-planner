export function getTodayWeather(forecast) {
  const d = forecast?.daily
  if (!d) return null

  return {
    weather_code: d.weather_code?.[0],
    temperature_2m_max: d.temperature_2m_max?.[0],
    precipitation_sum: d.precipitation_sum?.[0],
    wind_speed_10m_max: d.wind_speed_10m_max?.[0]
  }
}

export function classifyWeather(day) {
  if (!day) return { label: 'Hämtar', tone: 'neutral', score: 50, advice: 'Väderdata laddas.' }

  const rain = day.precipitation_sum ?? 0
  const wind = day.wind_speed_10m_max ?? 0
  const temp = day.temperature_2m_max ?? 0

  let score = 100
  score -= rain * 4
  score -= wind * 3
  if (temp < 8) score -= 18
  if (temp > 27) score -= 8
  score = Math.max(0, Math.min(100, Math.round(score)))

  if (score < 45) return { label: 'Plan B', tone: 'bad', score, advice: 'Byt till kortare aktivitet, fjord/stad eller flytta fjälldag.' }
  if (score < 72) return { label: 'Flex', tone: 'warn', score, advice: 'Går att köra, men planera med marginal och regnkläder.' }
  return { label: 'Go', tone: 'good', score, advice: 'Bra läge för vandring, foto, båt eller cykel.' }
}

export function calculateAdventureScore(stops, weather) {
  const scores = stops.filter((stop) => stop.id !== 'idre').map((stop) => classifyWeather(getTodayWeather(weather[stop.id])).score)
  const weatherAvg = scores.reduce((a, b) => a + b, 0) / Math.max(scores.length, 1)
  const varietyBonus = 22
  return Math.min(100, Math.round(weatherAvg * 0.75 + varietyBonus))
}

export function buildPlanB(stops, weather) {
  const ranked = stops
    .filter((stop) => stop.id !== 'idre')
    .map((stop) => ({ stop, status: classifyWeather(getTodayWeather(weather[stop.id])) }))
    .sort((a, b) => a.status.score - b.status.score)

  if (!ranked.length || ranked[0].status.tone !== 'bad') {
    return 'Rutten ser stabil ut. Behåll planen men följ fjällväder och vägstatus dagligen.'
  }

  return `${ranked[0].stop.name} ser svagast ut vädermässigt. Flytta större vandring och välj fjord, mat eller kortare aktivitet.`
}
