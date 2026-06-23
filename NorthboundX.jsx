import { photoTips } from '../data/routeInsights'

export default function PhotoMode({ selected }) {
  const tip = photoTips[selected.id]
  if (!tip) return null

  return (
    <section className="section photoMode">
      <div>
        <p className="kicker">Photo Mode</p>
        <h2>Bästa bilden i {selected.name}</h2>
      </div>
      <div className="photoCard">
        <div>
          <span>Bästa tid</span>
          <strong>{tip.bestTime}</strong>
        </div>
        <div>
          <span>Plats</span>
          <strong>{tip.place}</strong>
        </div>
        <p>{tip.tip}</p>
      </div>
    </section>
  )
}
