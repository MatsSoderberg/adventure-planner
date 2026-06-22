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
          <h2>Bilarna som tar Team Ekerö genom Norge</h2>
        </div>
        <p>Nu med riktiga bilbilder i stället för enkla illustrationer – mer likt mockupens premiumkänsla.</p>
      </div>

      <div className="realCarsGrid">
        {vehicles.map((vehicle) => (
          <article className={`realCarCard ${vehicle.id}`} key={vehicle.id}>
            <div className="carImageWrap">
              <img src={vehicle.image} alt={`${vehicle.color} ${vehicle.name}`} />
              <div className="carGlow" />
            </div>

            <div className="carInfo">
              <span>{vehicle.color}</span>
              <h3>{vehicle.name}</h3>
              <p>{vehicle.role}</p>

              <div className="carCrew">
                {crewFor(vehicle).map((member) => (
                  <img key={member.id} src={member.avatar} alt={member.name} title={member.name} />
                ))}
                <strong>{vehicle.crew.length} ombord</strong>
              </div>

              <div className="carMeta">
                <small>{vehicle.plate}</small>
                <small>{vehicle.id === 'multivan' ? 'Comfort / luggage' : 'Sport / scout'}</small>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
