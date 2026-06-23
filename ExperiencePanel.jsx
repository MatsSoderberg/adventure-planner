import TeamAvatarStrip from './TeamAvatarStrip'
export default function Hero({ adventureScore }) {
  return (
    <section className="hero">
      <div className="heroBg" />
      <nav>
        <div className="logo">North<span>bound</span></div>
        <TeamAvatarStrip compact />
        <div className="navlinks">
          <a href="#route">Karta</a>
          <a href="#timeline">Timeline</a>
          <a href="#weather">Väder</a>
          <a href="#days">Dagar</a>
        </div>
      </nav>

      <div className="heroContent">
        <p className="kicker">Team Ekerö · Norway 2026</p>
        <h1>Team Ekerö</h1>
        <div className="heroLine">The Ekerö Expedition</div>
        <p className="lead">En personlig roadbook för fjäll, fjord, båt, el-MTB, Trollstigen och hela gängets bästa Norgeäventyr.</p>
        <div className="actions">
          <a className="button primary" href="#route">Start journey</a>
          <a className="button" href="https://www.google.com/maps/dir/Idre,+Sweden/R%C3%B8ros,+Norway/Lom,+Norway/Stryn,+Norway/Loen,+Norway/Geiranger,+Norway/%C3%85ndalsnes,+Norway/Idre,+Sweden" target="_blank" rel="noreferrer">Google Maps</a>
        </div>
      </div>

      <div className="scoreCard">
        <span>Adventure Score</span>
        <strong>{adventureScore}/100</strong>
        <p>Baserat på variation, väderläge och upplevelsemix.</p>
      </div>
    </section>
  )
}
