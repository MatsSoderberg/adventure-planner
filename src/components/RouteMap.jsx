import { useEffect, useMemo, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { pointsOfInterest, scenicSegments } from '../data/pointsOfInterest'
import { fetchDrivingRoute, fetchDrivingSegment } from '../services/routing'

const mapStyle = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors'
    }
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm'
    }
  ]
}

function toLngLat(coords) {
  const [lat, lng] = coords
  return [lng, lat]
}

function makeLineGeoJson(coords) {
  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: coords
    },
    properties: {}
  }
}

function makePoiGeoJson() {
  return {
    type: 'FeatureCollection',
    features: pointsOfInterest.map((poi) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: toLngLat(poi.coords)
      },
      properties: {
        id: poi.id,
        name: poi.name,
        emoji: poi.emoji,
        typeLabel: poi.type
      }
    }))
  }
}

export default function RouteMap({ stops, selectedId, onSelect, mapMode, setMapMode, selectedPoi, onSelectPoi, activeSegment }) {
  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)
  const markersRef = useRef({})
  const poiMarkersRef = useRef({})
  const [routeStatus, setRouteStatus] = useState('loading')
  const [routeInfo, setRouteInfo] = useState(null)

  const routeFallback = useMemo(() => stops.map((stop) => toLngLat(stop.coords)), [stops])
  const selected = stops.find((stop) => stop.id === selectedId)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [8.6, 61.9],
      zoom: 5.5,
      pitch: 48,
      bearing: -12,
      attributionControl: true
    })

    mapRef.current = map
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right')

    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: makeLineGeoJson(routeFallback)
      })

      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#17d6b5',
          'line-width': 5,
          'line-opacity': 0.45,
          'line-dasharray': [1, 1.8]
        }
      })

      map.addSource('active-segment', {
        type: 'geojson',
        data: makeLineGeoJson([])
      })

      map.addLayer({
        id: 'active-segment-line',
        type: 'line',
        source: 'active-segment',
        paint: {
          'line-color': '#ffdd70',
          'line-width': 8,
          'line-opacity': 0.95
        }
      })

      stops.forEach((stop, index) => {
        const el = document.createElement('button')
        el.className = 'maplibre-stop-marker'
        el.innerHTML = `<span>${stop.emoji}</span><b>${index + 1}</b>`
        el.type = 'button'
        el.addEventListener('click', () => onSelect(stop.id))

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat(toLngLat(stop.coords))
          .setPopup(new maplibregl.Popup({ offset: 22 }).setHTML(`<strong>${stop.name}</strong><br>${stop.headline}`))
          .addTo(map)

        markersRef.current[stop.id] = marker
      })

      pointsOfInterest.forEach((poi) => {
        const el = document.createElement('button')
        el.className = 'maplibre-poi-marker'
        el.innerHTML = `<span>${poi.emoji}</span>`
        el.type = 'button'
        el.addEventListener('click', () => onSelectPoi?.(poi))

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat(toLngLat(poi.coords))
          .setPopup(new maplibregl.Popup({ offset: 18 }).setHTML(`<strong>${poi.name}</strong><br>${poi.type}`))
          .addTo(map)

        poiMarkersRef.current[poi.id] = marker
      })

      fetchDrivingRoute(stops)
        .then((route) => {
          map.getSource('route')?.setData(makeLineGeoJson(route.coords))
          map.setPaintProperty('route-line', 'line-opacity', 0.92)
          map.setPaintProperty('route-line', 'line-dasharray', [1, 0])
          setRouteInfo(route)
          setRouteStatus('ready')
        })
        .catch(() => {
          setRouteStatus('fallback')
        })
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !selected) return
    mapRef.current.flyTo({
      center: toLngLat(selected.coords),
      zoom: 8.2,
      pitch: 55,
      bearing: -10,
      duration: 1100
    })
    markersRef.current[selected.id]?.togglePopup()
  }, [selectedId])

  useEffect(() => {
    if (!mapRef.current || !selectedPoi) return
    mapRef.current.flyTo({
      center: toLngLat(selectedPoi.coords),
      zoom: 10.4,
      pitch: 58,
      bearing: -18,
      duration: 1000
    })
    poiMarkersRef.current[selectedPoi.id]?.togglePopup()
  }, [selectedPoi?.id])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !activeSegment || !map.getSource('active-segment')) return

    setRouteStatus('segment-loading')

    fetchDrivingSegment(activeSegment)
      .then((segment) => {
        map.getSource('active-segment').setData(makeLineGeoJson(segment.coords))
        setRouteStatus('ready')
        const bounds = new maplibregl.LngLatBounds()
        segment.coords.forEach((coord) => bounds.extend(coord))
        map.fitBounds(bounds, { padding: 80, duration: 1000, pitch: 55, bearing: -12 })
      })
      .catch(() => {
        const coords = activeSegment.coords.map(toLngLat)
        map.getSource('active-segment').setData(makeLineGeoJson(coords))
        setRouteStatus('fallback')
        const bounds = new maplibregl.LngLatBounds()
        coords.forEach((coord) => bounds.extend(coord))
        map.fitBounds(bounds, { padding: 80, duration: 1000, pitch: 55, bearing: -12 })
      })
  }, [activeSegment?.id])

  function resetView() {
    const map = mapRef.current
    if (!map) return
    const bounds = new maplibregl.LngLatBounds()
    routeFallback.forEach((coord) => bounds.extend(coord))
    map.fitBounds(bounds, { padding: 70, duration: 1000, pitch: 48, bearing: -12 })
  }

  return (
    <div className="panel mapPanel maplibrePanel">
      <div className="panelTop">
        <div>
          <p className="kicker">MapLibre Navigation</p>
          <h2>Riktig vägkänsla</h2>
        </div>
        <div className="toggle">
          <button className={mapMode === 'classic' ? 'active' : ''} onClick={() => setMapMode('classic')}>Road</button>
          <button onClick={resetView}>Reset</button>
        </div>
      </div>

      <div className={`routeStatus ${routeStatus}`}>
        <span>
          {routeStatus === 'loading' && 'Hämtar riktiga bilvägar...'}
          {routeStatus === 'segment-loading' && 'Hämtar vald etapp...'}
          {routeStatus === 'ready' && `Riktig bilrutt aktiv${routeInfo ? ` · ca ${routeInfo.distanceKm} km · ${routeInfo.durationHours} h` : ''}`}
          {routeStatus === 'fallback' && 'Fallback: visar förenklad rutt'}
        </span>
      </div>

      <div ref={mapContainerRef} id="map" className="maplibreMap" />

      <div className="mapNote">
        <span>v7.0</span>
        <p>MapLibre GL ger mjukare flygningar, lutad kamera och en tydligare premiumkänsla. Ruttdata hämtas via OSRM utan API-nyckel.</p>
      </div>
    </div>
  )
}
