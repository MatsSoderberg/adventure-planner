import { elevationStages } from '../data/routeInsights'

function Sparkline({ values }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100
    const y = 100 - ((value - min) / Math.max(max - min, 1)) * 86 - 7
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline points={points} />
    </svg>
  )
}

export default function ElevationProfile() {
  return (
    <section className="section elevationSection">
      <div className="sectionHead">
        <div>
          <p className="kicker">Elevation Profile</p>
          <h2>Hur dramatisk rutten känns</h2>
        </div>
        <p>Konceptuell höjdprofil för att ge känsla av fjällpass, dalar och fjordnivå.</p>
      </div>

      <div className="elevationGrid">
        {elevationStages.map((stage) => (
          <div className="elevationCard" key={stage.id}>
            <strong>{stage.name}</strong>
            <Sparkline values={stage.values} />
            <div>
              <span>{Math.min(...stage.values)} m</span>
              <span>{Math.max(...stage.values)} m</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
