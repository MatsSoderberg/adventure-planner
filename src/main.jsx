import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, CloudSun, Compass, Car, Mountain, Ship, Bike, Wallet, CheckCircle2, ExternalLink, Route, Sparkles } from 'lucide-react';
import { stops, route, days } from './data/trip.js';
import './styles.css';

function weatherCodeText(code){
  if(code === undefined) return 'Väder saknas';
  if([0].includes(code)) return 'Klart';
  if([1,2,3].includes(code)) return 'Växlande molnighet';
  if([45,48].includes(code)) return 'Dimma';
  if([51,53,55,61,63,65,80,81,82].includes(code)) return 'Regn';
  if([71,73,75,85,86].includes(code)) return 'Snö';
  if([95,96,99].includes(code)) return 'Åska';
  return 'Växlande väder';
}

function scoreWeather(w){
  if(!w) return {label:'Hämtar', tone:'neutral', advice:'Väder hämtas från Open-Meteo.'};
  const rain = w.precipitation_sum ?? 0;
  const wind = w.wind_speed_10m_max ?? 0;
  const code = w.weather_code;
  if(rain > 10 || wind > 12 || [45,48,95,96,99].includes(code)) return {label:'Plan B', tone:'bad', advice:'Välj kortare aktivitet, utsiktsstopp eller flytta fjälldagen.'};
  if(rain > 3 || wind > 8 || [51,53,55,61,63,80,81].includes(code)) return {label:'Flex', tone:'warn', advice:'Kör enligt plan men ha regnjacka och kortare alternativ redo.'};
  return {label:'Go', tone:'good', advice:'Bra läge för vandring, fjordtur eller cykel.'};
}

function App(){
  const [selected, setSelected] = useState(stops[1]);
  const [weather, setWeather] = useState({});
  const [people, setPeople] = useState(4);

  useEffect(() => {
    async function loadWeather(){
      const result = {};
      await Promise.all(stops.map(async stop => {
        const [lat, lon] = stop.coords;
        try {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=3`;
          const res = await fetch(url);
          const data = await res.json();
          result[stop.id] = {
            weather_code: data.daily?.weather_code?.[0],
            temperature_2m_max: data.daily?.temperature_2m_max?.[0],
            temperature_2m_min: data.daily?.temperature_2m_min?.[0],
            precipitation_sum: data.daily?.precipitation_sum?.[0],
            wind_speed_10m_max: data.daily?.wind_speed_10m_max?.[0]
          };
        } catch(e){ result[stop.id] = null; }
      }));
      setWeather(result);
    }
    loadWeather();
  }, []);

  const selectedWeather = weather[selected.id];
  const selectedScore = scoreWeather(selectedWeather);
  const budget = useMemo(() => ({
    low: people * 5500,
    high: people * 8750
  }), [people]);

  useEffect(() => {
    const map = L.map('map', { scrollWheelZoom: false }).setView([62.05, 8.7], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);
    L.polyline(route, { color: '#30d5c8', weight: 5, opacity: .9 }).addTo(map);
    stops.forEach((stop, index) => {
      const marker = L.marker(stop.coords).addTo(map);
      marker.bindPopup(`<strong>${stop.name}</strong><br>${stop.day}<br>${stop.activity}`);
      marker.on('click', () => setSelected(stops[index]));
    });
    map.fitBounds(route, { padding: [35,35] });
    setTimeout(()=>map.invalidateSize(), 250);
    return () => map.remove();
  }, []);

  return <main>
    <section className="hero">
      <div className="heroOverlay" />
      <nav><div className="brand"><Compass size={20}/> Adventure Planner <span>Norway 2026</span></div><div><a href="#route">Rutt</a><a href="#days">Dagar</a><a href="#weather">Väder</a><a href="#budget">Budget</a></div></nav>
      <div className="heroContent">
        <p className="eyebrow">Idre → Røros → Jotunheimen → fjordar → Trollstigen → Idre</p>
        <h1>The Ultimate Norway Roadtrip</h1>
        <p className="lead">En interaktiv roadbook för 6–7 dagar med karta, live-väder, smarta rekommendationer och tydliga stopp.</p>
        <div className="heroActions"><a className="btn primary" href="#route">Starta resan</a><a className="btn" href="https://www.google.com/maps/dir/Idre,+Sweden/R%C3%B8ros,+Norway/Lom,+Norway/Stryn,+Norway/Loen,+Norway/Geiranger,+Norway/%C3%85ndalsnes,+Norway/Idre,+Sweden" target="_blank">Öppna i Google Maps <ExternalLink size={16}/></a></div>
      </div>
    </section>

    <section className="stats">
      <Stat icon={<Route/>} value="ca 1 450 km" label="Total sträcka" />
      <Stat icon={<Car/>} value="6–7 dagar" label="Lagom tempo" />
      <Stat icon={<Mountain/>} value="Fjäll + fjord" label="Max upplevelse" />
      <Stat icon={<CloudSun/>} value="Live-väder" label="Plan B-stöd" />
    </section>

    <section id="route" className="section gridTwo">
      <div>
        <p className="eyebrow">Interaktiv karta</p>
        <h2>Rutten med klickbara stopp</h2>
        <p>Klicka på en markör i kartan för att visa stoppets detaljer, väder och rekommendation. Kartan använder OpenStreetMap och Leaflet.</p>
        <div id="map" className="map" />
      </div>
      <aside className={`stopCard ${selectedScore.tone}`}>
        <div className="pill">{selected.day}</div>
        <h3>{selected.name}</h3>
        <p className="muted">{selected.subtitle}</p>
        <div className="weatherBox" id="weather">
          <CloudSun/><div><strong>{selectedWeather ? `${Math.round(selectedWeather.temperature_2m_min)}–${Math.round(selectedWeather.temperature_2m_max)}°C` : 'Hämtar väder...'}</strong><span>{selectedWeather ? `${weatherCodeText(selectedWeather.weather_code)} · ${selectedWeather.precipitation_sum} mm · vind ${Math.round(selectedWeather.wind_speed_10m_max)} m/s` : 'Open-Meteo'}</span></div><b>{selectedScore.label}</b>
        </div>
        <h4>Rekommendation</h4><p>{selectedScore.advice}</p>
        <h4>Höjdpunkter</h4><ul>{selected.highlights.map(h => <li key={h}><CheckCircle2 size={16}/>{h}</li>)}</ul>
        <a className="btn full" href={selected.map} target="_blank">Öppna stoppet i Google Maps <ExternalLink size={16}/></a>
      </aside>
    </section>

    <section id="days" className="section">
      <p className="eyebrow">Dag-för-dag</p><h2>Roadbook i rätt tempo</h2>
      <div className="dayGrid">{days.map(d => <article className="dayCard" key={d.day}><span>{d.day}</span><h3>{d.route}</h3><p className="muted">{d.theme} · {d.time}</p><p>{d.text}</p></article>)}</div>
    </section>

    <section className="section activityStrip">
      <Activity icon={<Mountain/>} title="Vandring" text="Besseggen eller Galdhøpiggen beroende på väder." />
      <Activity icon={<Ship/>} title="Fjordtur" text="Geiranger med båt, RIB eller lugn sightseeing." />
      <Activity icon={<Bike/>} title="El-MTB" text="Loen/Stryn som flexibel aktivitetsdag." />
      <Activity icon={<Sparkles/>} title="Plan B" text="Appen flaggar när vädret talar för kortare alternativ." />
    </section>

    <section id="budget" className="section budget">
      <div><p className="eyebrow">Budget</p><h2>Snabb kostnadsbild</h2><p>Justera antal personer för en ungefärlig nivå inklusive boende, mat, bränsle, färjor/tullar och aktiviteter.</p></div>
      <div className="budgetCard"><Wallet/><label>Antal personer: <strong>{people}</strong></label><input type="range" min="2" max="8" value={people} onChange={e=>setPeople(Number(e.target.value))}/><h3>{budget.low.toLocaleString('sv-SE')}–{budget.high.toLocaleString('sv-SE')} kr</h3><p className="muted">Grovt estimat. Hotellstandard och aktiviteter styr mest.</p></div>
    </section>

    <section className="section pack">
      <p className="eyebrow">Packning</p><h2>Roadtrip essentials</h2>
      <div className="checkGrid">{['Regnjacka','Vandringsskor','Powerbank','Badkläder','Kamera','Solglasögon','Varm tröja','Snacks i bilen'].map(x=><label key={x}><input type="checkbox"/> {x}</label>)}</div>
    </section>
  </main>
}

function Stat({icon,value,label}){ return <div className="stat">{icon}<strong>{value}</strong><span>{label}</span></div> }
function Activity({icon,title,text}){ return <article className="activity">{icon}<h3>{title}</h3><p>{text}</p></article> }

createRoot(document.getElementById('root')).render(<App />);
