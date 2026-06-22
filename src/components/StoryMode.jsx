import { storyChapters } from '../data/storyChapters'

export default function StoryMode({ selectedId, onSelect }) {
  return (
    <section className="section storyMode">
      <div className="sectionHead">
        <div>
          <p className="kicker">Story Mode</p>
          <h2>Resan som berättelse</h2>
        </div>
        <p>Istället för ett schema blir rutten en serie kapitel – lättare att dela, minnas och följa.</p>
      </div>

      <div className="chapterStack">
        {storyChapters.map((chapter, index) => {
          const isActive = chapter.stops.includes(selectedId)
          const targetStop = chapter.stops[chapter.stops.length - 1]

          return (
            <button
              key={chapter.id}
              className={`chapterCard ${chapter.color} ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(targetStop)}
            >
              <div className="chapterNumber">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <span>{chapter.title}</span>
                <strong>{chapter.name}</strong>
                <small>{chapter.range}</small>
                <p>{chapter.mood}</p>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
