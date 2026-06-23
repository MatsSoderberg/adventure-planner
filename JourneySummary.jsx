import Badge from './Badge'
import { classifyWeather, getTodayWeather } from '../utils/scoring'

export default function ActivityExplorer({ modes, mode, setMode, stops, weather, onSelect }) {
  return (
    <section id="weather" className="section">
      <div className="sectionHead">
        <div>
          <p className="kicker">Adventure Mode</p>
          <h2>Filtrera efter känsla</h2>
        </div>
        <p>Välj vad ni är sugna på. Appen lyfter relevanta stopp.</p>
      </div>

      <div className="modeBar">
        {modes.map((item) => (
          <button key={item.id} className={mode === item.id ? 'active' : ''} onClick={() => setMode(item.id)}>
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </div>

      <div className="bestGrid">
        {stops.map((stop) => {
          const status = classifyWeather(getTodayWeather(weather[stop.id]))
          return (
            <button key={stop.id} className="bestCard" onClick={() => onSelect(stop.id)}>
              <span>{stop.emoji} {stop.type}</span>
              <strong>{stop.name}</strong>
              <p>{stop.headline}</p>
              <Badge status={status} />
            </button>
          )
        })}
      </div>
    </section>
  )
}
