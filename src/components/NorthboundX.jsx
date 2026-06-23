import { teamMembers } from '../data/teamEkero'

const metrics = [
  ['1453 km', 'Total sträcka'],
  ['7 dagar', 'Resans längd'],
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

export default function NorthboundX() {
  return (
    <section className="nx nxCleanMockup">
      <div className="nxHeroClean">
        <img className="nxHeroArtClean" src="/hero/team-ekero-hero-clean.png" alt="Team Ekerö Norway Expedition" />

        <div className="nxCleanActions">
          <a className="nxPrimaryCta" href="#route">▶ Starta expedition</a>
          <a className="nxSecondaryCta" href="#route">Visa karta</a>
        </div>

        <div className="nxCleanMetrics">
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
