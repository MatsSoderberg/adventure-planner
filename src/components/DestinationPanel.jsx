import Badge from './Badge'
import ForecastStrip from './ForecastStrip'
import { weatherCodeText } from '../services/weather'

export default function DestinationPanel({ selected, forecast, today, status }) {
  return (
    <aside className="panel detail">
      <div className="image" style={{ backgroundImage: `url(${selected.image})` }}>
        <Badge status={status} />
      </div>

      <p className="kicker">{selected.day} · {selected.type}</p>
      <h2>{selected.name}</h2>
      <h3>{selected.headline}</h3>
      <p>{selected.description}</p>

      <div className="miniGrid">
        <div><span>Körtid</span><strong>{selected.drive}</strong></div>
        <div><span>Sträcka</span><strong>{selected.distance}</strong></div>
        <div><span>Väderpoäng</span><strong>{status.score}/100</strong></div>
        <div><span>Råd</span><strong>{status.label}</strong></div>
      </div>

      {today && (
        <div className="weatherLine">
          <span>{weatherCodeText[today.weather_code] || 'Väder'}</span>
          <strong>{Math.round(today.temperature_2m_max)}°</strong>
          <span>{today.precipitation_sum} mm</span>
          <span>{Math.round(today.wind_speed_10m_max)} m/s</span>
        </div>
      )}

      <ForecastStrip forecast={forecast} />

      <p className="advice">{status.advice}</p>

      <div className="chips">
        {selected.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
      </div>

      <a className="button full" href={selected.mapUrl} target="_blank" rel="noreferrer">Öppna platsen</a>
    </aside>
  )
}
