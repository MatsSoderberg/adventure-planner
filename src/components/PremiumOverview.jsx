import { teamMembers, vehicles } from '../data/teamEkero'

const plan = [
  ['1', 'Idre → Røros', '287 km · 4h 12m', '🌤️ 16°'],
  ['2', 'Røros → Jotunheimen', '244 km · 3h 45m', '☀️ 18°'],
  ['3', 'Jotunheimen → Lom', '193 km · 3h 10m', '☁️ 15°'],
  ['4', 'Lom → Loen', '187 km · 3h 05m', '☀️ 19°'],
  ['5', 'Loen → Geiranger', '128 km · 2h 25m', '☁️ 17°'],
  ['6', 'Geiranger → Åndalsnes', '174 km · 2h 58m', '🌤️ 16°']
]

export default function PremiumOverview() {
  return (
    <section className="premiumOverview">
      <div className="overviewHeroCard">
        <div className="overviewHeroBg" />
        <div className="overviewHeroContent">
          <span className="script">Välkommen</span>
          <h2>Team Ekerö</h2>
          <strong>Expedition · Norway 2026 🇳🇴</strong>
          <p>Ett äventyr genom fjäll, fjordar och ikoniska vägar.</p>
          <button>▶ Spela resan</button>
        </div>
        <div className="overviewVehicleGlass">
          <div className="miniVehicle van"><i /><b /><b /></div>
          <div className="miniVehicle suv"><i /><b /><b /></div>
        </div>
      </div>

      <div className="overviewTeamCard">
        <div className="premiumCardHeader"><span>👥</span><h3>Vårt team</h3></div>
        {teamMembers.map((member) => (
          <div className="overviewTeamRow" key={member.id}>
            <img src={member.avatar} alt={member.name} />
            <div><strong>{member.name}</strong><span>{member.role}</span></div>
            <div className="overviewIcons">{member.icons.map(icon => <small key={icon}>{icon}</small>)}</div>
            <div className="overviewStat"><span>{member.statLabel}</span><strong>{member.statValue}</strong></div>
          </div>
        ))}
      </div>

      <div className="overviewPlanCard">
        <div className="premiumCardHeader"><span>🗓️</span><h3>Resplan</h3></div>
        {plan.map(([num, title, meta, weather]) => (
          <div className="planRow" key={num}>
            <b>{num}</b>
            <div><strong>{title}</strong><span>{meta}</span></div>
            <small>{weather}</small>
          </div>
        ))}
      </div>

      <div className="overviewVehiclesCard">
        <div className="premiumCardHeader"><span>🚗</span><h3>Expedition vehicles</h3></div>
        {vehicles.map(vehicle => (
          <div className={`premiumVehicle real ${vehicle.id}`} key={vehicle.id}>
            <img src={vehicle.image} alt={vehicle.name} />
            <div><span>{vehicle.color}</span><strong>{vehicle.name}</strong><small>{vehicle.role}</small></div>
          </div>
        ))}
      </div>

      <div className="overviewStatsCard">
        <div className="premiumCardHeader"><span>📊</span><h3>Resans statistik</h3></div>
        <div className="statTiles">
          <div><strong>1453</strong><span>km</span></div>
          <div><strong>27</strong><span>POI</span></div>
          <div><strong>7</strong><span>dagar</span></div>
          <div><strong>92</strong><span>index</span></div>
        </div>
      </div>
    </section>
  )
}
