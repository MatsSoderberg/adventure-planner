import { teamMembers, vehicles } from '../data/teamEkero'

export default function TeamEkeroPanel() {
  return (
    <section className="section teamEkeroSection">
      <div className="sectionHead">
        <div>
          <p className="kicker">Team Ekerö Expedition</p>
          <h2>Resesällskapet</h2>
        </div>
        <p>Appen är personlig – med hela gänget, roller och bilarna som bär expeditionen genom Norge.</p>
      </div>

      <div className="teamEkeroGrid">
        <div className="teamPanel">
          {teamMembers.map((member) => (
            <div className="teamMember" key={member.id}>
              <img src={member.avatar} alt={member.realName || member.name} />
              <div>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </div>
              <div className="memberIcons">
                {member.icons.map((icon) => <small key={icon}>{icon}</small>)}
              </div>
              <div className="memberStat">
                <span>{member.statLabel}</span>
                <strong>{member.statValue}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="vehiclePanel">
          {vehicles.map((vehicle) => (
            <div className={`vehicleCard ${vehicle.id}`} key={vehicle.id} style={{ '--vehicle-accent': vehicle.accent }}>
              <div className="vehiclePhoto">
                <img src={vehicle.image} alt={vehicle.name} />
              </div>
              <div>
                <span>{vehicle.color}</span>
                <strong>{vehicle.name}</strong>
                <p>{vehicle.role}</p>
                <small>{vehicle.plate}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
