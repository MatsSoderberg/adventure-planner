export default function AIGuide({ planB, selected, status, weather }) {
  const temp = weather?.temperature_2m_max !== undefined ? `${Math.round(weather.temperature_2m_max)}°` : 'väder hämtas'

  return (
    <section className="intro section">
      <div>
        <p className="kicker">AI Guide</p>
        <h2>Planera som en roadbook. Justera som en app.</h2>
        <p>Guiden läser väderläget och föreslår när ni bör hålla planen, korta ner eller byta aktivitet.</p>
      </div>
      <div className="aiCard">
        <span>Dagens signal</span>
        <strong>{selected.name}: {status.label} · {temp}</strong>
        <p>{status.advice}</p>
        <small>{planB}</small>
      </div>
    </section>
  )
}
