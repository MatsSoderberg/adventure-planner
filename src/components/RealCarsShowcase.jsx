import { teamMembers, vehicles } from '../data/teamEkero'

function crewFor(vehicle) {
  return vehicle.crew
    .map((id) => teamMembers.find((member) => member.id === id))
    .filter(Boolean)
}

export default function RealCarsShowcase() {
  return (
    <section className="section realCarsSection">
      <div className="sectionHead">
        <div>
          <p className="kicker">Expedition Vehicles</p>
          <h2>Parkerade för nästa etapp</h2>
        </div>
        <p>Bilarna är nu integrerade i en scen med väg, fjordljus och skuggor – inte bara bildrutor.</p>
      </div>

      <div className="scenicGarage">
        <div className="garageBg" />
        {vehicles.map((vehicle) => (
          <article className={`garageCar ${vehicle.id}`} key={vehicle.id}>
            <img src={vehicle.image} alt={`${vehicle.color} ${vehicle.name}`} />
            <div className="garageInfo">
              <span>{vehicle.color}</span>
              <strong>{vehicle.name}</strong>
              <small>{vehicle.role}</small>
              <div className="carCrew">
                {crewFor(vehicle).map((member) => (
                  <img key={member.id} src={member.avatar} alt={member.name} title={member.name} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
