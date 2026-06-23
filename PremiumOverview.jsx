import { experiences } from '../data/experiences'

export default function ExperiencePanel({ selected }) {
  const experience = experiences[selected.id]

  if (!experience) return null

  return (
    <section className="section experienceSection">
      <div className="sectionHead">
        <div>
          <p className="kicker">Destination Experience</p>
          <h2>{selected.name}: vad ni faktiskt gör där</h2>
        </div>
        <p>Mer konkret innehåll för att appen ska kännas som en riktig roadbook, inte bara en karta.</p>
      </div>

      <div className="experienceGrid">
        <div className="experienceCard premium">
          <span>⭐ Missa inte</span>
          <ul>
            {experience.must.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="experienceCard">
          <span>🏔️ Aktiviteter</span>
          <ul>
            {experience.activities.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="experienceCard">
          <span>🍽️ Mat & fika</span>
          <ul>
            {experience.food.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="experienceCard plan">
          <span>🧭 Plan B</span>
          <p>{experience.planB}</p>
        </div>
      </div>

      <div className="quickLinks">
        <a href={selected.mapUrl} target="_blank" rel="noreferrer">📍 Öppna platsen</a>
        <a href={`https://www.google.com/search?q=${encodeURIComponent(selected.name + ' Norway activities')}`} target="_blank" rel="noreferrer">🔎 Aktiviteter</a>
        <a href={`https://www.google.com/search?q=${encodeURIComponent(selected.name + ' Norway restaurants')}`} target="_blank" rel="noreferrer">🍽️ Restauranger</a>
        <a href={`https://www.google.com/search?q=${encodeURIComponent(selected.name + ' Norway hotel')}`} target="_blank" rel="noreferrer">🏨 Boende</a>
      </div>
    </section>
  )
}
