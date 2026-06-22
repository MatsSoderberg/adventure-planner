import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './styles.css'

const stops = [
  {
    id: 'idre',
    day: 'Start',
    name: 'Idre',
    coords: [61.858, 12.715],
    type: 'Start / mål',
    drive: 'Startpunkt',
    distance: '0 km',
    headline: 'Avfärd från svenska fjällen',
    description: 'Packa bilen, starta tidigt och rulla västerut mot första norska stoppet.',
    highlights: ['Start', 'Fjällkänsla', 'Roadtrip'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Idre%20Sweden'
  },
  {
    id: 'roros',
    day: 'Dag 1',
    name: 'Røros',
    coords: [62.574, 11.384],
    type: 'UNESCO / kultur',
    drive: '3–4 h',
    distance: 'ca 250 km',
    headline: 'Trähus, historia och första Norge-känslan',
    description: 'En lagom första etapp med kultur, god mat och mysig kvällspromenad i en av Norges mest karaktärsfulla småstäder.',
    highlights: ['UNESCO', 'Trähus', 'Restaurangkväll'],
    image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=1400&q=80',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=R%C3%B8ros%20Norway'
  },
  {
    id: 'jotunheimen',
    day: 'Dag 2–3',
    name: 'Jotunheimen',
    coords: [61.54, 8.35],
    type: 'Fjäll / vandring',
    drive: '5 h',
    distance: 'ca 300 km',
    headline: 'Norges stora fjällscen',
    description: 'Resans fjällhjärta. Välj en stor upplevelse: Besseggen eller Galdhøpiggen, beroende på väder och dagsform.',
    highlights: ['Besseggen', 'Galdhøpiggen', 'Högfjäll'],
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jotunheimen%20Norway'
  },
  {
    id: 'lom',
    day: 'Dag 3',
    name: 'Lom',
    coords: [61.837, 8.568],
    type: 'Bas / logistik',
    drive: 'Kort transfer',
    distance: 'lokalt',
    headline: 'Smart bas nära fjällen',
    description: 'Bra övernattning, mat och logistik inför Sognefjellet och vidare mot Stryn.',
    highlights: ['Stavkyrka', 'Bageri', 'Fjällbas'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Lom%20Norway'
  },
  {
    id: 'stryn',
    day: 'Dag 4',
    name: 'Stryn / Loen',
    coords: [61.904, 6.722],
    type: 'Fjord / aktivitet',
    drive: '4–5 h via Sognefjellet',
    distance: 'ca 220 km',
    headline: 'Dramatiska dalar, Loen och fjordnära äventyr',
    description: 'En av resans bästa flexpunkter. Välj Loen Skylift, el-MTB, glaciärnära utflykt eller lugn kväll vid fjorden.',
    highlights: ['Sognefjellet', 'Loen Skylift', 'El-MTB'],
    image: 'https://images.unsplash.com/photo-1518128958364-65859d70aa41?auto=format&fit=crop&w=1400&q=80',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Stryn%20Loen%20Norway'
  },
  {
    id: 'geiranger',
    day: 'Dag 5',
    name: 'Geiranger',
    coords: [62.101, 7.206],
    type: 'Fjord / båt',
    drive: '2–3 h',
    distance: 'ca 120 km',
    headline: 'Fjordbåt, vattenfall och vykortsvyer',
    description: 'Den stora fjorddagen. Prioritera båttur, Flydalsjuvet och en lång middag med utsikt över fjorden.',
    highlights: ['Fjordkryssning', 'Flydalsjuvet', 'Vattenfall'],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Geiranger%20Norway'
  },
  {
    id: 'andalsnes',
    day: 'Dag 6',
    name: 'Åndalsnes',
    coords: [62.567, 7.687],
    type: 'Trollstigen / final',
    drive: '2–3 h via Trollstigen',
    distance: 'ca 110 km',
    headline: 'Ikonisk väg och sista wow-dagen',
    description: 'Trollstigen, Romsdalen och eventuellt Rampestreken ger en stark final innan hemresan mot Idre.',
    highlights: ['Trollstigen', 'Rampestreken', 'Romsdalen'],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=%C3%85ndalsnes%20Norway'
  }
]

const routeCoords = stops.map(s => s.coords)

const weatherCodeText = {
  0: 'Klart', 1: 'Mestadels klart', 2: 'Delvis molnigt', 3: 'Molnigt',
  45: 'Dimma', 48: 'Dimma', 51: 'Lätt duggregn', 53: 'Duggregn', 55: 'Duggregn',
  61: 'Lätt regn', 63: 'Regn', 65: 'Kraftigt regn', 71: 'Snö', 73: 'Snö', 75: 'Snö',
  80: 'Skurar', 81: 'Skurar', 82: 'Kraftiga skurar', 95: 'Åska'
}

function classifyWeather(day) {
  if (!day) return { label: 'Hämtar', tone: 'neutral', score: 50, advice: 'Väderdata laddas.' }
  const rain = day.precipitation_sum ?? 0
  const wind = day.wind_speed_10m_max ?? 0
  const temp = day.temperature_2m_max ?? 0
  let score = 100
  score -= rain * 4
  score -= wind * 3
  if (temp < 8) score -= 18
  if (temp > 27) score -= 8
  score = Math.max(0, Math.min(100, Math.round(score)))

  if (score < 45) return { label: 'Plan B', tone: 'bad', score, advice: 'Byt till kortare aktivitet, fjord/stad eller flytta fjälldag.' }
  if (score < 72) return { label: 'Flex', tone: 'warn', score, advice: 'Går att köra, men planera med marginal och regnkläder.' }
  return { label: 'Go', tone: 'good', score, advice: 'Bra läge för vandring, foto, båt eller cykel.' }
}

function Badge({ status }) {
  return <span className={`badge ${status.tone}`}>{status.label}</span>
}

function App() {
  const [selectedId, setSelectedId] = useState('geiranger')
  const [weather, setWeather] = useState({})
  const [mapMode, setMapMode] = useState('classic')
  const mapRef = useRef(null)
  const layersRef = useRef({ classic: null, topo: null })

  const selected = stops.find(s => s.id === selectedId) || stops[0]
  const selectedWeather = weather[selected.id]
  const selectedStatus = classifyWeather(selectedWeather)

  const best = useMemo(() => {
    return stops
      .filter(s => s.id !== 'idre')
      .map(stop => ({ stop, status: classifyWeather(weather[stop.id]) }))
      .sort((a, b) => b.status.score - a.status.score)
      .slice(0, 3)
  }, [weather])

  const planB = useMemo(() => {
    const bad = stops
      .filter(s => s.id !== 'idre')
      .map(stop => ({ stop, status: classifyWeather(weather[stop.id]) }))
      .filter(x => x.status.tone === 'bad')
    if (!bad.length) return 'Rutten ser stabil ut. Behåll planen men följ vädret dagligen.'
    return `${bad[0].stop.name} ser svagast ut vädermässigt. Flytta större vandring och välj fjord, stad eller kortare aktivitet.`
  }, [weather])

  useEffect(() => {
    async function loadWeather() {
      const entries = await Promise.all(stops.map(async stop => {
        try {
          const [lat, lon] = stop.coords
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=7`
          const res = await fetch(url)
          const data = await res.json()
          const d = data.daily
          return [stop.id, {
            weather_code: d.weather_code?.[0],
            temperature_2m_max: d.temperature_2m_max?.[0],
            temperature_2m_min: d.temperature_2m_min?.[0],
            precipitation_sum: d.precipitation_sum?.[0],
            wind_speed_10m_max: d.wind_speed_10m_max?.[0]
          }]
        } catch {
          return [stop.id, null]
        }
      }))
      setWeather(Object.fromEntries(entries))
    }
    loadWeather()
  }, [])

  useEffect(() => {
    const el = document.getElementById('map')
    if (!el || mapRef.current) return

    const map = L.map(el, { scrollWheelZoom: false, zoomControl: true }).setView([61.9, 8.6], 6)
    mapRef.current = map

    layersRef.current.classic = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    layersRef.current.topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenTopoMap contributors'
    })

    L.polyline(routeCoords, { color: '#17d6b5', weight: 5, opacity: 0.92 }).addTo(map)

    stops.forEach((stop, i) => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div>${i + 1}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      })
      L.marker(stop.coords, { icon })
        .addTo(map)
        .bindPopup(`<strong>${stop.name}</strong><br>${stop.headline}`)
        .on('click', () => setSelectedId(stop.id))
    })

    map.fitBounds(routeCoords, { padding: [32, 32] })
  }, [])

  useEffect(() => {
    if (!mapRef.current) return
    const { classic, topo } = layersRef.current
    if (mapMode === 'classic') {
      if (topo) mapRef.current.removeLayer(topo)
      if (classic && !mapRef.current.hasLayer(classic)) classic.addTo(mapRef.current)
    } else {
      if (classic) mapRef.current.removeLayer(classic)
      if (topo && !mapRef.current.hasLayer(topo)) topo.addTo(mapRef.current)
    }
  }, [mapMode])

  return (
    <main>
      <section className="hero">
        <div className="heroBg" />
        <nav>
          <div className="logo">Adventure<span>Planner</span></div>
          <div className="navlinks">
            <a href="#route">Karta</a>
            <a href="#weather">Väder</a>
            <a href="#days">Dagar</a>
            <a href="#pack">Packning</a>
          </div>
        </nav>

        <div className="heroContent">
          <p className="kicker">Norway Adventure 2026</p>
          <h1>The Ultimate Roadtrip</h1>
          <p className="lead">En interaktiv roadbook för 6–7 dagar: Idre, Røros, Jotunheimen, Sognefjellet, Stryn, Loen, Geiranger, Trollstigen och Åndalsnes.</p>
          <div className="actions">
            <a className="button primary" href="#route">Utforska rutten</a>
            <a className="button" href="https://www.google.com/maps/dir/Idre,+Sweden/R%C3%B8ros,+Norway/Lom,+Norway/Stryn,+Norway/Loen,+Norway/Geiranger,+Norway/%C3%85ndalsnes,+Norway/Idre,+Sweden" target="_blank" rel="noreferrer">Öppna Google Maps</a>
          </div>
        </div>

        <div className="stats">
          <div><strong>7</strong><span>dagar</span></div>
          <div><strong>±1450</strong><span>km</span></div>
          <div><strong>22–25h</strong><span>körning</span></div>
          <div><strong>Live</strong><span>väder</span></div>
        </div>
      </section>

      <section className="intro section">
        <div>
          <p className="kicker">Smart reseapp</p>
          <h2>Byggd för att vara snygg att dela och praktisk på resan.</h2>
        </div>
        <div className="aiCard">
          <span>Plan B-rekommendation</span>
          <strong>{planB}</strong>
        </div>
      </section>

      <section id="route" className="section layout">
        <div className="panel mapPanel">
          <div className="panelTop">
            <div>
              <p className="kicker">Interaktiv karta</p>
              <h2>Rutten i Norge</h2>
            </div>
            <div className="toggle">
              <button className={mapMode === 'classic' ? 'active' : ''} onClick={() => setMapMode('classic')}>Classic</button>
              <button className={mapMode === 'topo' ? 'active' : ''} onClick={() => setMapMode('topo')}>Topo</button>
            </div>
          </div>
          <div id="map" />
        </div>

        <aside className="panel detail">
          <div className="image" style={{ backgroundImage: `url(${selected.image})` }}>
            <Badge status={selectedStatus} />
          </div>
          <p className="kicker">{selected.day} · {selected.type}</p>
          <h2>{selected.name}</h2>
          <h3>{selected.headline}</h3>
          <p>{selected.description}</p>

          <div className="miniGrid">
            <div><span>Körtid</span><strong>{selected.drive}</strong></div>
            <div><span>Sträcka</span><strong>{selected.distance}</strong></div>
            <div><span>Väderpoäng</span><strong>{selectedStatus.score}/100</strong></div>
            <div><span>Råd</span><strong>{selectedStatus.label}</strong></div>
          </div>

          {selectedWeather && (
            <div className="weatherLine">
              <span>{weatherCodeText[selectedWeather.weather_code] || 'Väder'}</span>
              <strong>{Math.round(selectedWeather.temperature_2m_max)}°</strong>
              <span>{selectedWeather.precipitation_sum} mm</span>
              <span>{Math.round(selectedWeather.wind_speed_10m_max)} m/s</span>
            </div>
          )}

          <p className="advice">{selectedStatus.advice}</p>

          <div className="chips">
            {selected.highlights.map(h => <span key={h}>{h}</span>)}
          </div>
          <a className="button full" href={selected.mapUrl} target="_blank" rel="noreferrer">Öppna platsen</a>
        </aside>
      </section>

      <section id="weather" className="section">
        <div className="sectionHead">
          <div>
            <p className="kicker">Väderstyrning</p>
            <h2>Bästa valen just nu</h2>
          </div>
          <p>En enkel rekommendationsmotor poängsätter stopp utifrån nederbörd, vind och temperatur.</p>
        </div>

        <div className="bestGrid">
          {best.map(({ stop, status }, index) => (
            <button key={stop.id} className="bestCard" onClick={() => setSelectedId(stop.id)}>
              <span>#{index + 1} rekommenderas</span>
              <strong>{stop.name}</strong>
              <p>{status.advice}</p>
              <Badge status={status} />
            </button>
          ))}
        </div>
      </section>

      <section id="days" className="section">
        <div className="sectionHead">
          <div>
            <p className="kicker">Dag för dag</p>
            <h2>Roadbook</h2>
          </div>
          <p>Klicka på ett stopp för att uppdatera karta och detaljkort.</p>
        </div>

        <div className="days">
          {stops.slice(1).map(stop => {
            const status = classifyWeather(weather[stop.id])
            return (
              <button key={stop.id} className={`day ${selectedId === stop.id ? 'selected' : ''}`} onClick={() => setSelectedId(stop.id)}>
                <div><span>{stop.day}</span><Badge status={status} /></div>
                <h3>{stop.name}</h3>
                <p>{stop.headline}</p>
                <div className="chips small">
                  {stop.highlights.map(h => <span key={h}>{h}</span>)}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <section id="pack" className="section pack">
        <div>
          <p className="kicker">Packning</p>
          <h2>För norsk sommar</h2>
          <p>Vädret växlar snabbt. Packa hellre flexibelt än optimistiskt.</p>
        </div>
        <div className="checks">
          {['Regnjacka', 'Vandringsskor', 'Powerbank', 'Extra strumpor', 'Tunn mössa', 'Solglasögon', 'Badkläder', 'Kamera'].map(item => (
            <label key={item}><input type="checkbox" /> {item}</label>
          ))}
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
