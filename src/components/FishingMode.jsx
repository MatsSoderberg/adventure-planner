import { fishingSpots } from '../data/fishingSpots'

function stars(rating) {
  return '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(0, 5 - rating)
}

export default function FishingMode() {
  return (
    <section className="fishingMode section" id="fishing">
      <div className="sectionHead fishingHead">
        <div>
          <p className="kicker">Fishing Mode</p>
          <h2>🎣 Fiskestopp längs Team Ekerös rutt</h2>
        </div>
        <p>Rekommenderade platser för självfiske, båtuthyrning och fiskeguider längs Norge-resan.</p>
      </div>

      <div className="fishingHeroCard">
        <div>
          <span>Team Ekerö Challenge</span>
          <h3>Vem tar resans största fisk?</h3>
          <p>Logga art, längd, plats och bild. Perfekt som extra tävling mellan bilarna.</p>
        </div>
        <a href="#fishing-list">Visa fiskestopp</a>
      </div>

      <div className="fishingGrid" id="fishing-list">
        {fishingSpots.map((spot) => (
          <article className="fishingCard" key={spot.id}>
            <div className="fishingCardTop"><span>{spot.day}</span><strong>{stars(spot.rating)}</strong></div>
            <h3>{spot.title}</h3>
            <p className="fishingLocation">{spot.location} · {spot.type}</p>
            <p>{spot.description}</p>
            <div className="fishTags">{spot.fish.map((fish) => <small key={fish}>{fish}</small>)}</div>
            <div className="fishingInfo">
              <div><b>Guide / upplägg</b><span>{spot.guide}</span></div>
              <div><b>Fiskekort / regler</b><span>{spot.permit}</span></div>
              <div><b>Passar bäst när</b><span>{spot.driveNote}</span></div>
            </div>
            <div className="fishingActions">
              <a href={spot.mapUrl} target="_blank" rel="noreferrer">Visa på karta</a>
              <a href={spot.infoUrl} target="_blank" rel="noreferrer">Info / boka</a>
            </div>
            <div className="fishingTags">{spot.tags.map((tag) => <em key={tag}>{tag}</em>)}</div>
          </article>
        ))}
      </div>
    </section>
  )
}
