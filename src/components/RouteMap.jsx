import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { pointsOfInterest, scenicSegments } from '../data/pointsOfInterest'

export default function RouteMap({ stops, selectedId, onSelect, mapMode, setMapMode, selectedPoi, onSelectPoi, activeSegment }) {
  const mapRef = useRef(null)
  const markerRef = useRef({})
  const layersRef = useRef({ classic: null, topo: null })
  const poiMarkersRef = useRef({})
  const segmentLayerRef = useRef(null)
  const routeCoords = stops.map((stop) => stop.coords)
  const selected = stops.find((stop) => stop.id === selectedId)

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

    L.polyline(routeCoords, { color: '#17d6b5', weight: 4, opacity: 0.45, dashArray: '6, 10' }).addTo(map)

    scenicSegments.forEach((segment) => {
      L.polyline(segment.coords, { color: '#17d6b5', weight: 5, opacity: 0.78 }).addTo(map)
    })

    stops.forEach((stop, i) => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div><span>${stop.emoji}</span><b>${i + 1}</b></div>`,
        iconSize: [42, 42],
        iconAnchor: [21, 21]
      })

      const marker = L.marker(stop.coords, { icon })
        .addTo(map)
        .bindPopup(`<strong>${stop.name}</strong><br>${stop.headline}`)
        .on('click', () => onSelect(stop.id))

      markerRef.current[stop.id] = marker
    })

    pointsOfInterest.forEach((poi) => {
      const icon = L.divIcon({
        className: 'poi-marker',
        html: `<div><span>${poi.emoji}</span></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })

      const marker = L.marker(poi.coords, { icon })
        .addTo(map)
        .bindPopup(`<strong>${poi.name}</strong><br>${poi.type}`)
        .on('click', () => onSelectPoi?.(poi))

      poiMarkersRef.current[poi.id] = marker
    })

    map.fitBounds(routeCoords, { padding: [32, 32] })
  }, [])

  useEffect(() => {
    if (!mapRef.current || !selected) return
    mapRef.current.flyTo(selected.coords, 8, { duration: 0.9 })
    markerRef.current[selected.id]?.openPopup()
  }, [selectedId])

  useEffect(() => {
    if (!mapRef.current || !selectedPoi) return
    mapRef.current.flyTo(selectedPoi.coords, 10, { duration: 0.9 })
    poiMarkersRef.current[selectedPoi.id]?.openPopup()
  }, [selectedPoi?.id])

  useEffect(() => {
    if (!mapRef.current || !activeSegment) return

    if (segmentLayerRef.current) {
      mapRef.current.removeLayer(segmentLayerRef.current)
    }

    segmentLayerRef.current = L.polyline(activeSegment.coords, {
      color: '#ffdd70',
      weight: 8,
      opacity: 0.95
    }).addTo(mapRef.current)

    mapRef.current.fitBounds(activeSegment.coords, { padding: [70, 70] })
  }, [activeSegment?.id])

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
  )
}

