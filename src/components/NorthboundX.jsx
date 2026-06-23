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
        <div className="heroClickZones" aria-label="Hero navigation">
          <a className="heroClickZone heroStartZone" href="#route" aria-label="Starta expedition"></a>
          <a className="heroClickZone heroMapZone" href="#route" aria-label="Visa karta"></a>
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

        <article className="nxCard v24NorwayCard">
          <span className="nxKicker">Northbound presents</span>
          <h2>Norway 2026</h2>
          <p>1450 km · 7 dagar · fjäll · fjord · väderstyrd roadbook</p>
          <div className="v24NorwayStats">
            <div><strong>40</strong><small>Adventure Score</small></div>
            <div><strong>6</strong><small>Scenic stages</small></div>
            <div><strong>11</strong><small>Iconic POIs</small></div>
          </div>
        </article>

      </section>
    </section>
  )
}
