const metrics = [
  ['1453 km', 'Total sträcka'],
  ['7 dagar', 'Roadbook'],
  ['18 stopp', 'Planerade stopp'],
  ['94', 'Adventure Index']
]

const chapters = [
  ['01', 'Idre → Røros', 'Mjuk start mot Norge'],
  ['02', 'Jotunheimen', 'Fjäll, väderbeslut och vyer'],
  ['03', 'Lom → Loen', 'Sognefjellet och fjordland'],
  ['04', 'Geiranger', 'Båt, vattenfall och utsikter'],
  ['05', 'Trollstigen', 'Ikonisk final']
]

function PremiumCar({ type }) {
  return (
    <div className={`v20Car ${type}`}>
      <div className="v20CarCabin" />
      <div className="v20CarGlass" />
      <div className="v20CarHighlight" />
      <div className="v20CarLight left" />
      <div className="v20CarLight right" />
      <div className="v20Wheel rear" />
      <div className="v20Wheel front" />
    </div>
  )
}

export default function NorthboundX() {
  return (
    <section className="v20">
      <div className="v20Hero" id="top">
        <div className="v20Fjord" />
        <div className="v20Mist" />
        <div className="v20Road" />

        <header className="v20Header">
          <div className="v20Brand">
            <div className="v20Mark">N</div>
            <div>
              <strong>NORTHBOUND X</strong>
              <small>Team Ekerö · Norway 2026</small>
            </div>
          </div>
          <a href="#route" className="v20HeaderLink">Visa karta</a>
        </header>

        <div className="v20Badge">
          <span>✦</span>
          <strong>TEAM EKERÖ</strong>
          <small>NORWAY EXPEDITION 2026</small>
        </div>

        <div className="v20HeroCopy">
          <span>EXPEDITION NORWAY</span>
          <h1>TEAM<br />EKERÖ</h1>
          <p>En personlig roadbook för fjäll, fjordar, väderbeslut och ikoniska vägar.</p>
          <div className="v20Actions">
            <a className="v20Primary" href="#route">▶ Starta expedition</a>
            <a className="v20Secondary" href="#route">Visa karta</a>
          </div>
        </div>

        <div className="v20Cars">
          <PremiumCar type="multivan" />
          <PremiumCar type="x3" />
        </div>

        <div className="v20Metrics">
          {metrics.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="v20Dashboard">
        <article className="v20Panel v20Mission">
          <span>Mission Control</span>
          <h2>Dagens smarta val</h2>
          <p>Om Geiranger har bäst väder: prioritera fjordbåt, Flydalsjuvet och middag med utsikt. Flytta fjällvandring vid låg sikt eller hård vind.</p>
          <div className="v20Signals">
            <div><strong>18°</strong><small>best window</small></div>
            <div><strong>4h 15m</strong><small>drive today</small></div>
            <div><strong>82%</strong><small>range/fuel</small></div>
          </div>
        </article>

        <article className="v20Panel" id="route">
          <span>Route Chapters</span>
          <div className="v20Chapters">
            {chapters.map(([num, title, text]) => (
              <div key={num}>
                <b>{num}</b>
                <div>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="v20Panel">
          <span>Expedition Vehicles</span>
          <div className="v20VehicleRows">
            <div>
              <PremiumCar type="multivan small" />
              <strong>Mörkblå Multivan</strong>
              <small>Comfort Cruiser</small>
            </div>
            <div>
              <PremiumCar type="x3 small" />
              <strong>Carbonsvart BMW X3</strong>
              <small>Mountain Scout</small>
            </div>
          </div>
        </article>
      </section>
    </section>
  )
}
