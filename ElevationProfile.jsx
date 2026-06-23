import { classifyWeather } from '../utils/scoring'

export default function ForecastStrip({ forecast }) {
  if (!forecast?.daily) return <div className="forecast muted">Hämtar 7-dagarsprognos...</div>

  const d = forecast.daily

  return (
    <div className="forecast">
      {d.time.slice(0, 7).map((date, i) => {
        const day = {
          weather_code: d.weather_code?.[i],
          temperature_2m_max: d.temperature_2m_max?.[i],
          precipitation_sum: d.precipitation_sum?.[i],
          wind_speed_10m_max: d.wind_speed_10m_max?.[i]
        }
        const status = classifyWeather(day)
        const weekday = new Date(date).toLocaleDateString('sv-SE', { weekday: 'short' })

        return (
          <div key={date} className={`forecastDay ${status.tone}`}>
            <span>{weekday}</span>
            <strong>{Math.round(day.temperature_2m_max)}°</strong>
            <small>{day.precipitation_sum} mm</small>
          </div>
        )
      })}
    </div>
  )
}
