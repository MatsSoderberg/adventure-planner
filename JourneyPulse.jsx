export default function CinematicIntro({ adventureScore }) {
  return (
    <section className="cinematic">
      <div className="cinematicBackdrop" />
      <div className="cinematicInner">
        <span>Northbound presents</span>
        <h2>Norway 2026</h2>
        <p>1450 km · 7 dagar · fjäll · fjord · väderstyrd roadbook</p>
        <div className="cinematicStats">
          <div><strong>{adventureScore}</strong><small>Adventure Score</small></div>
          <div><strong>6</strong><small>scenic stages</small></div>
          <div><strong>11</strong><small>iconic POIs</small></div>
        </div>
      </div>
    </section>
  )
}
