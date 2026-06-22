function toLngLat(coords) {
  const [lat, lng] = coords
  return `${lng},${lat}`
}

export async function fetchDrivingRoute(stops) {
  const coordinates = stops.map((stop) => toLngLat(stop.coords)).join(';')
  const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Could not fetch driving route')

  const data = await res.json()
  const route = data.routes?.[0]
  if (!route?.geometry?.coordinates) throw new Error('No route geometry found')

  return {
    coords: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
    distanceKm: Math.round(route.distance / 1000),
    durationHours: Math.round((route.duration / 3600) * 10) / 10
  }
}

export async function fetchDrivingSegment(stage) {
  const coordinates = stage.coords.map(toLngLat).join(';')
  const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Could not fetch segment route')

  const data = await res.json()
  const route = data.routes?.[0]
  if (!route?.geometry?.coordinates) throw new Error('No segment route geometry found')

  return {
    id: stage.id,
    coords: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
    distanceKm: Math.round(route.distance / 1000),
    durationHours: Math.round((route.duration / 3600) * 10) / 10
  }
}
