import { teamMembers } from '../data/teamEkero'

const liveStats = [
  { label: 'Adventure Index', value: '94', hint: 'Excellent', icon: '🏔️' },
  { label: 'Weather Today', value: '18°', hint: 'Geiranger best window', icon: '☀️' },
  { label: 'Driving Today', value: '4h 15m', hint: 'Balanced stage', icon: '🚗' },
  { label: 'Distance Left', value: '963 km', hint: 'After Røros', icon: '🧭' },
  { label: 'Budget Pulse', value: '74%', hint: 'On track', icon: '💳' },
  { label: 'Fuel / Range', value: '82%', hint: 'Next stop OK', icon: '⛽' }
]

export default function LiveDashboard() {
  return (
    <section className="section liveDashboardSection">
      <div className="sectionHead">
        <div>
          <p className="kicker">Live Dashboard</p>
          <h2>Team Ekerö Mission Control</h2>
        </div>
        <p>En mer app-lik startpanel med snabbstatus för väder, körning, budget och resans puls.</p>
      </div>

      <div className="liveDashboard">
        <div className="missionCard">
          <div>
            <span className="script">Northbound</span>
            <h3>Today’s recommendation</h3>
            <p>Geiranger har bäst upplevelsefönster. Ta fjord och utsikter före längre transport.</p>
          </div>
          <div className="missionCrew">
            {teamMembers.slice(0, 5).map(member => (
              <img key={member.id} src={member.avatar} alt={member.name} />
            ))}
          </div>
        </div>

        {liveStats.map(stat => (
          <div className="liveStatCard" key={stat.label}>
            <span>{stat.icon}</span>
            <small>{stat.label}</small>
            <strong>{stat.value}</strong>
            <p>{stat.hint}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
