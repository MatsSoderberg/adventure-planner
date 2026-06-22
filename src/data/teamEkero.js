export const teamMembers = [
  { id: 'mats', name: 'Mats', role: 'Expedition Leader', avatar: '/team/mats.jpg', icons: ['🏔️', '🚗'], statLabel: 'Körsträcka', statValue: '287 km' },
  { id: 'asa', name: 'Åsa', role: 'Navigator', avatar: '/team/asa.jpg', icons: ['🍽️', '📷'], statLabel: 'POI hittade', statValue: '14' },
  { id: 'wilmer', name: 'Wilmer', role: 'MTB Expert', avatar: '/team/wilmer.jpg', icons: ['🚴', '⛰️'], statLabel: 'Aktiviteter', statValue: '8' },
  { id: 'ludwig', name: 'Ludwig', role: 'Fotograf', avatar: '/team/ludwig.jpg', icons: ['📷', '🎥'], statLabel: 'Bilder tagna', statValue: '238' },
  { id: 'anna', name: 'Anna', role: 'Stämningshöjare', avatar: '/team/anna.jpg', icons: ['💚', '🎵'], statLabel: 'Glada poäng', statValue: '95%' },
  { id: 'malte', name: 'Malte', role: 'Snacksminister', avatar: '/team/malte.jpg', icons: ['🍦', '🍔'], statLabel: 'Fikastopp', statValue: '11' },
  { id: 'johan', name: 'Johan', role: 'Snow Engineer', avatar: '/team/johan.jpg', icons: ['❄️', '👍'], statLabel: 'Snöprojekt', statValue: '1' }
]

export const vehicles = [
  {
    id: 'multivan',
    name: 'Volkswagen Multivan',
    color: 'Mörkblå',
    role: 'Comfort Cruiser',
    plate: 'TEAM VAN',
    accent: '#0e3a5c',
    image: 'https://car-images.bauersecure.com/wp-images/13273/1752x1168/080-vw-multivan-review-front-blue-ehybrid.jpg?mode=max&quality=90&scale=down',
    crew: ['mats', 'asa', 'anna', 'johan']
  },
  {
    id: 'x3',
    name: 'BMW X3',
    color: 'Carbonsvart',
    role: 'Mountain Scout',
    plate: 'BMW X3',
    accent: '#111418',
    image: 'https://www.hexagonclassics.com/userfiles/multimedia/bmw-x3-m40i-auto-petrol--2019-vehicle-20251002091510-11.jpg',
    crew: ['wilmer', 'ludwig', 'malte']
  }
]
