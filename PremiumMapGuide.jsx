export default function Dashboard({ adventureScore }) {
  return (
    <section className="section dashboard">
      <div><strong>7</strong><span>dagar</span></div>
      <div><strong>±1450</strong><span>km</span></div>
      <div><strong>22–25h</strong><span>körning</span></div>
      <div><strong>{adventureScore}</strong><span>score</span></div>
    </section>
  )
}
