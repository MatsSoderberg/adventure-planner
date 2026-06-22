export default function JourneySummary({ adventureScore }) {
  return (
    <section className="section journeySummary">
      <div className="summaryCard wide">
        <p className="kicker">Northbound Quality Check</p>
        <h2>En roadtrip som balanserar upplevelse och tempo.</h2>
        <p>Rutten är byggd för att ge mycket Norge på kort tid utan att allt blir bil. Nyckeln är att hålla Jotunheimen, Stryn/Loen och Geiranger flexibla efter väder.</p>
      </div>

      <div className="summaryCard">
        <span>Upplevelsemix</span>
        <strong>Fjäll · Fjord · Båt · MTB · Kultur</strong>
      </div>

      <div className="summaryCard">
        <span>Score</span>
        <strong>{adventureScore}/100</strong>
      </div>
    </section>
  )
}
