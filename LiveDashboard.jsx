import { pointsOfInterest, scenicSegments } from '../data/pointsOfInterest'

export default function PremiumMapGuide({ selectedPoi, onSelectPoi, onFlySegment }) {
  return (
    <section className="section premiumMapGuide">
      <div className="sectionHead">
        <div>
          <p className="kicker">Premium Map</p>
          <h2>Ikoniska stopp längs rutten</h2>
        </div>
        <p>Välj etapp för att flyga kartan dit eller klicka på en sevärdhet för snabbguide.</p>
      </div>

      <div className="stageRail">
        {scenicSegments.map((stage) => (
          <button key={stage.id} onClick={() => onFlySegment(stage)}>
            <span>{stage.title}</span>
            <strong>{stage.from} → {stage.to}</strong>
            <small>{stage.note}</small>
          </button>
        ))}
      </div>

      <div className="poiGrid">
        {pointsOfInterest.map((poi) => (
          <button key={poi.id} className={selectedPoi?.id === poi.id ? 'active' : ''} onClick={() => onSelectPoi(poi)}>
            <span>{poi.emoji} {poi.type}</span>
            <strong>{poi.name}</strong>
            <p>{poi.description}</p>
          </button>
        ))}
      </div>

      {selectedPoi && (
        <div className="poiDetail">
          <div>
            <span>{selectedPoi.emoji} {selectedPoi.type}</span>
            <strong>{selectedPoi.name}</strong>
            <p>{selectedPoi.description}</p>
          </div>
          <a href={`https://www.google.com/search?q=${encodeURIComponent(selectedPoi.search)}`} target="_blank" rel="noreferrer">
            Sök mer
          </a>
        </div>
      )}
    </section>
  )
}
