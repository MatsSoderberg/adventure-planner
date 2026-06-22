import { conciergeRules } from '../data/routeInsights'

export default function ConciergePanel({ selected, status }) {
  const selectedRule = selected.id === 'geiranger'
    ? conciergeRules[0]
    : selected.id === 'jotunheimen'
      ? conciergeRules[1]
      : selected.id === 'stryn'
        ? conciergeRules[2]
        : {
            title: 'Smart timing',
            text: 'Håll planen flexibel. Välj dagens största aktivitet där vädret och energin är bäst.'
          }

  return (
    <section className="section conciergeSection">
      <div className="conciergePanel">
        <div>
          <p className="kicker">AI Concierge 2.0</p>
          <h2>{selectedRule.title}</h2>
          <p>{selectedRule.text}</p>
        </div>
        <div className={`conciergeSignal ${status.tone}`}>
          <span>{selected.name}</span>
          <strong>{status.label}</strong>
          <small>{status.advice}</small>
        </div>
      </div>
    </section>
  )
}
