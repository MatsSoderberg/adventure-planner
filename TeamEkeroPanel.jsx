const items = ['Regnjacka', 'Vandringsskor', 'Powerbank', 'Extra strumpor', 'Tunn mössa', 'Solglasögon', 'Badkläder', 'Kamera']

export default function PackList() {
  return (
    <section className="section pack">
      <div>
        <p className="kicker">Packning</p>
        <h2>För norsk sommar</h2>
        <p>Vädret växlar snabbt. Packa hellre flexibelt än optimistiskt.</p>
      </div>
      <div className="checks">
        {items.map((item) => (
          <label key={item}><input type="checkbox" /> {item}</label>
        ))}
      </div>
    </section>
  )
}
