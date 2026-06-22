import { teamMembers } from '../data/teamEkero'

const stats = [
  ['1453 km', 'Total sträcka'],
  ['7 dagar', 'Roadbook'],
  ['27', 'Sevärdheter'],
  ['94', 'Adventure index']
]

const stages = [
  ['01', 'Idre → Røros', 'Mjuk start mot Norge'],
  ['02', 'Jotunheimen', 'Fjäll, väderbeslut och vyer'],
  ['03', 'Lom → Loen', 'Sognefjellet och fjordland'],
  ['04', 'Geiranger', 'Båt, vattenfall och utsikter'],
  ['05', 'Trollstigen', 'Ikonisk final']
]

function ExpeditionCar({ type }) {
  return (
    <div className={`xCar ${type}`}>
      <div className="xCarRoof" />
      <div className="xCarWindow" />
      <div className="xCarLight left" />
      <div className="xCarLight right" />
      <div className="xWheel front" />
      <div className="xWheel rear" />
    </div>
  )
}

export default function NorthboundX() {
  return (
    <section className="northboundX">
      <div className="xHero">
        <div className="xHeroBg" />

        <div className="xTopGlass">
          <div className="xBrand">
            <div className="xEmblem"><span>△</span></div>
            <div><strong>NORTHBOUND X</strong><small>Team Ekerö · Norway 2026</small></div>
          </div>
          <div className="xMiniCrew">
            {teamMembers.map(member => <img key={member.id} src={member.avatar} alt={member.name} />)}
            <b>{teamMembers.length}</b>
          </div>
        </div>

        <div className="xHeroCopy">
          <span className="xScript">Välkommen</span>
          <h1>Team Ekerö</h1>
          <p>En personlig expedition genom fjäll, fjordar och ikoniska vägar.</p>
          <button>▶ Starta expedition</button>
        </div>

        <div className="xVehicleStage">
          <div className="xRoad" />
          <ExpeditionCar type="multivan" />
          <ExpeditionCar type="x3" />
        </div>

        <div className="xStats">
          {stats.map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </div>

      <div className="xMissionGrid">
        <div className="xPanel xWide">
          <span className="xKicker">Mission Control</span>
          <h2>Dagens smarta val</h2>
          <p>Håll fjälldagarna flexibla. Om Geiranger har bäst väder: prioritera fjordbåt, Flydalsjuvet och middag med utsikt.</p>
          <div className="xSignal">
            <div><strong>18°</strong><span>Loen idag</span></div>
            <div><strong>4h 15m</strong><span>Körning</span></div>
            <div><strong>82%</strong><span>Fuel/range</span></div>
          </div>
        </div>

        <div className="xPanel">
          <span className="xKicker">Team</span>
          <div className="xTeamList">
            {teamMembers.slice(0, 7).map(member => (
              <div key={member.id}>
                <img src={member.avatar} alt={member.name} />
                <span>{member.name}</span>
                <small>{member.role}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="xPanel">
          <span className="xKicker">Route chapters</span>
          <div className="xStageList">
            {stages.map(([num, title, text]) => (
              <div key={num}>
                <b>{num}</b>
                <span>{title}</span>
                <small>{text}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="xPanel xVehicles">
          <span className="xKicker">Expedition vehicles</span>
          <div className="xVehicleRows">
            <div><ExpeditionCar type="multivan small" /><span>Mörkblå Multivan</span><small>Comfort Cruiser</small></div>
            <div><ExpeditionCar type="x3 small" /><span>Carbonsvart BMW X3</span><small>Mountain Scout</small></div>
          </div>
        </div>
      </div>
    </section>
  )
}
