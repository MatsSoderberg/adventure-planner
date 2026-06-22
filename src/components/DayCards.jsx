import Badge from './Badge'
import { classifyWeather, getTodayWeather } from '../utils/scoring'

export default function DayCards({ stops, weather, selectedId, onSelect }) {
  return (
    <section id="days" className="section">
      <div className="sectionHead">
        <div>
          <p className="kicker">Dag för dag</p>
          <h2>Roadbook</h2>
        </div>
        <p>Håll planen lös. Det är väder, fjäll och dagsform som avgör vilken dag som blir bäst.</p>
      </div>

      <div className="days">
        {stops.slice(1).map((stop) => {
          const status = classifyWeather(getTodayWeather(weather[stop.id]))

          return (
            <button key={stop.id} className={`day ${selectedId === stop.id ? 'selected' : ''}`} onClick={() => onSelect(stop.id)}>
              <div><span>{stop.day}</span><Badge status={status} /></div>
              <h3>{stop.emoji} {stop.name}</h3>
              <p>{stop.headline}</p>
              <div className="chips small">
                {stop.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
