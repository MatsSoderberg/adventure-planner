export default function Timeline({ stops, selectedId, onSelect }) {
  return (
    <section id="timeline" className="section">
      <div className="sectionHead">
        <div>
          <p className="kicker">Roadtrip Timeline</p>
          <h2>Resans rytm</h2>
        </div>
        <p>Klicka på ett stopp för att flyga dit på kartan och uppdatera detaljkortet.</p>
      </div>

      <div className="timeline">
        {stops.map((stop) => (
          <button key={stop.id} className={`timelineItem ${selectedId === stop.id ? 'active' : ''}`} onClick={() => onSelect(stop.id)}>
            <span className="timelineDot">{stop.emoji}</span>
            <small>{stop.day}</small>
            <strong>{stop.name}</strong>
          </button>
        ))}
      </div>
    </section>
  )
}
