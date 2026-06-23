import { teamMembers, vehicles } from '../data/teamEkero'

const plan = [
  ['1', 'Idre → Røros', '287 km · 4h 12m', '🌤️ 16°'],
  ['2', 'Røros → Jotunheimen', '244 km · 3h 45m', '☀️ 18°'],
  ['3', 'Jotunheimen → Lom', '193 km · 3h 10m', '☁️ 15°'],
  ['4', 'Lom → Loen', '187 km · 3h 05m', '☀️ 19°'],
  ['5', 'Loen → Geiranger', '128 km · 2h 25m', '☁️ 17°']
]

export default function PremiumOverview() {
  const multivan = vehicles.find(v => v.id === 'multivan')
  const x3 = vehicles.find(v => v.id === 'x3')

  return (
    <section className="premiumOverview cinematicOverview">
      <div className="cinematicHeroDashboard">
        <div className="cinematicHeroScene" />

        <div className="cinematicHeroText">
          <span className="script">Välkommen</span>
          <h2>Team Ekerö</h2>
          <strong>Expedition · Norway 2026 🇳🇴</strong>
          <p>Ett äventyr genom fjäll, fjordar och ikoniska vägar.</p>
          <button>▶ Spela resan</button>
        </div>

        <div className="parkedCarsStage" aria-label="Expedition vehicles">
          <div className="roadShadow" />
          <img className="heroCar multivanHero" src={multivan.image} alt={multivan.name} />
          <img className="heroCar x3Hero" src={x3.image} alt={x3.name} />
        </div>

        <div className="heroStatsBar">
          <div><strong>1453 km</strong><span>Total sträcka</span></div>
          <div><strong>19h 42m</strong><span>Total körtid</span></div>
          <div><strong>27</strong><span>Sevärdheter</span></div>
          <div><strong>7</strong><span>Boenden</span></div>
          <div><strong>1123 m</strong><span>Högsta punkt</span></div>
        </div>
      </div>

      <div className="overviewTeamCard premiumSideTeam">
        <div className="premiumCardHeader"><span>👥</span><h3>Vårt team</h3></div>
        {teamMembers.slice(0, 7).map((member) => (
          <div className="overviewTeamRow" key={member.id}>
            <img src={member.avatar} alt={member.name} />
            <div><strong>{member.name}</strong><span>{member.role}</span></div>
            <div className="overviewIcons">{member.icons.map(icon => <small key={icon}>{icon}</small>)}</div>
            <div className="overviewStat"><span>{member.statLabel}</span><strong>{member.statValue}</strong></div>
          </div>
        ))}
      </div>

      <div className="overviewPlanCard cinematicPanel">
        <div className="premiumCardHeader"><span>🗓️</span><h3>Resplan</h3></div>
        {plan.map(([num, title, meta, weather]) => (
          <div className="planRow" key={num}>
            <b>{num}</b>
            <div><strong>{title}</strong><span>{meta}</span></div>
            <small>{weather}</small>
          </div>
        ))}
      </div>

      <div className="overviewVehiclesCard cinematicPanel expeditionVehiclesPanel">
        <div className="premiumCardHeader"><span>🚗</span><h3>Expedition vehicles</h3></div>
        {vehicles.map(vehicle => (
          <div className={`premiumVehicle cinematicVehicle ${vehicle.id}`} key={vehicle.id}>
            <img src={vehicle.image} alt={vehicle.name} />
            <div><span>{vehicle.color}</span><strong>{vehicle.name}</strong><small>{vehicle.role}</small></div>
          </div>
        ))}
      </div>
    </section>
  )
}
