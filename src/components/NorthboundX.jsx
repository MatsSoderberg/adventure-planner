import { teamMembers } from '../data/teamEkero'

const metrics = [
  ['1453 km', 'Total sträcka'],
  ['7 dagar', 'Roadbook'],
  ['18 stopp', 'Planerade stopp'],
  ['94', 'Adventure index']
]

const chapters = [
  ['01', 'Idre → Røros', 'Mjuk start mot Norge'],
  ['02', 'Jotunheimen', 'Fjäll, väderbeslut och vyer'],
  ['03', 'Lom → Loen', 'Sognefjellet och fjordland'],
  ['04', 'Geiranger', 'Båt, vattenfall och utsikter'],
  ['05', 'Trollstigen', 'Ikonisk final']
]

export default function NorthboundX() {
  return (
    <section className="nx nxMockup">
      <div className="nxHeroMockup">
        <img className="nxHeroArt" src="/hero/team-ekero-hero.png" alt="Team Ekerö Norway Expedition" />

        <header className="nxFloatingNav">
          <div className="nxLogo">
            <div className="nxMark"><span>N</span></div>
            <div>
              <strong>Northbound X</strong>
              <small>Team Ekerö · Norway 2026</small>
            </div>
          </div>

          <div className="nxCrew">
            {teamMembers.map(member => (
              <img key={member.id} src={member.avatar} alt={member.name} />
            ))}
            <b>{teamMembers.length}</b>
          </div>
        </header>

        <div className="nxHeroOverlayCopy">
          <span>Expedition Norway</span>
          <h1>Team Ekerö</h1>
          <p>En personlig roadtrip-app för fjäll, fjordar, väderbeslut och ikoniska vägar.</p>
          <div className="nxActions">
            <button>▶ Starta expedition</button>
            <a href="#route">Visa karta</a>
          </div>
        </div>

        <div className="nxMetrics nxMockMetrics">
          {metrics.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="nxDashboard">
        <article className="nxCard nxMission">
          <span className="nxKicker">Mission Control</span>
          <h2>Dagens smarta val</h2>
          <p>Om Geiranger har bäst väder: prioritera fjordbåt, Flydalsjuvet och middag med utsikt. Flytta fjällvandring vid låg sikt eller hård vind.</p>
          <div className="nxSignals">
            <div><strong>18°</strong><span>best window</span></div>
            <div><strong>4h 15m</strong><span>drive today</span></div>
            <div><strong>82%</strong><span>range/fuel</span></div>
          </div>
        </article>

        <article className="nxCard">
          <span className="nxKicker">Crew</span>
          <div className="nxCrewGrid">
            {teamMembers.map(member => (
              <div key={member.id}>
                <img src={member.avatar} alt={member.name} />
                <strong>{member.name}</strong>
                <small>{member.role}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="nxCard">
          <span className="nxKicker">Route Chapters</span>
          <div className="nxChapters">
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
      </section>
    </section>
  )
}
