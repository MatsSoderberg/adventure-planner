import { useEffect, useMemo, useState } from 'react'
import { stops, modes } from './data/norwayRoute'
import { fetchWeatherForStops } from './services/weather'
import { classifyWeather, getTodayWeather, buildPlanB, calculateAdventureScore } from './utils/scoring'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import AIGuide from './components/AIGuide'
import Timeline from './components/Timeline'
import RouteMap from './components/RouteMap'
import DestinationPanel from './components/DestinationPanel'
import ActivityExplorer from './components/ActivityExplorer'
import DayCards from './components/DayCards'
import PackList from './components/PackList'
import ExperiencePanel from './components/ExperiencePanel'
import PremiumMapGuide from './components/PremiumMapGuide'
import CinematicIntro from './components/CinematicIntro'
import ConciergePanel from './components/ConciergePanel'
import PhotoMode from './components/PhotoMode'
import ElevationProfile from './components/ElevationProfile'
import StoryMode from './components/StoryMode'
import JourneySummary from './components/JourneySummary'

export default function App() {
  const [selectedId, setSelectedId] = useState('geiranger')
  const [weather, setWeather] = useState({})
  const [mode, setMode] = useState('all')
  const [mapMode, setMapMode] = useState('classic')
  const [selectedPoi, setSelectedPoi] = useState(null)
  const [activeSegment, setActiveSegment] = useState(null)

  const selected = stops.find((stop) => stop.id === selectedId) || stops[0]
  const selectedForecast = weather[selected.id]
  const selectedToday = getTodayWeather(selectedForecast)
  const selectedStatus = classifyWeather(selectedToday)

  const adventureScore = useMemo(() => calculateAdventureScore(stops, weather), [weather])
  const planB = useMemo(() => buildPlanB(stops, weather), [weather])

  const filteredStops = useMemo(() => {
    if (mode === 'all') return stops.filter((stop) => stop.id !== 'idre')
    return stops.filter((stop) => stop.id !== 'idre' && stop.activities.includes(mode))
  }, [mode])

  useEffect(() => {
    fetchWeatherForStops(stops).then(setWeather)
  }, [])

  return (
    <main>
      <Hero adventureScore={adventureScore} />
      <CinematicIntro adventureScore={adventureScore} />
      <JourneySummary adventureScore={adventureScore} />
      <Dashboard adventureScore={adventureScore} />
      <AIGuide planB={planB} selected={selected} status={selectedStatus} weather={selectedToday} />
      <ConciergePanel selected={selected} status={selectedStatus} />

      <StoryMode selectedId={selectedId} onSelect={setSelectedId} />

      <Timeline stops={stops} selectedId={selectedId} onSelect={setSelectedId} />

      <section id="route" className="section layout">
        <RouteMap
          stops={stops}
          selectedId={selectedId}
          onSelect={setSelectedId}
          mapMode={mapMode}
          setMapMode={setMapMode}
          selectedPoi={selectedPoi}
          onSelectPoi={setSelectedPoi}
          activeSegment={activeSegment}
        />

        <DestinationPanel
          selected={selected}
          forecast={selectedForecast}
          today={selectedToday}
          status={selectedStatus}
        />
      </section>

      <PremiumMapGuide
        selectedPoi={selectedPoi}
        onSelectPoi={setSelectedPoi}
        onFlySegment={setActiveSegment}
      />

      <ElevationProfile />

      <ExperiencePanel selected={selected} />

      <PhotoMode selected={selected} />

      <ActivityExplorer
        modes={modes}
        mode={mode}
        setMode={setMode}
        stops={filteredStops}
        weather={weather}
        onSelect={setSelectedId}
      />

      <DayCards stops={stops} weather={weather} selectedId={selectedId} onSelect={setSelectedId} />

      <PackList />
    </main>
  )
}
