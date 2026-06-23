const pulses = [
  ['Fjäll', 92, 'Jotunheimen och Sognefjellet'],
  ['Fjord', 98, 'Geiranger och Loen'],
  ['Foto', 96, 'Flydalsjuvet, Ørnesvingen, Trollstigen'],
  ['Mat & fika', 84, 'Røros, Lom och fjordmiddag'],
  ['Tempo', 88, 'Mycket upplevelse utan maximal bilstress']
]

export default function JourneyPulse() {
  return (
    <section className="section journeyPulseSection">
      <div className="sectionHead">
        <div>
          <p className="kicker">Journey Pulse</p>
          <h2>Hur stark resan är per dimension</h2>
        </div>
        <p>En snabb känsla för vad rutten levererar mest av.</p>
      </div>

      <div className="pulseGrid">
        {pulses.map(([name, value, text]) => (
          <div className="pulseCard" key={name}>
            <div>
              <strong>{name}</strong>
              <span>{value}/100</span>
            </div>
            <div className="pulseBar"><i style={{ width: `${value}%` }} /></div>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
