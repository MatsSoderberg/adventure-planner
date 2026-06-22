export const photoTips = {
  idre: {
    bestTime: 'Tidig morgon',
    place: 'Fjällväg ut från Idre',
    tip: 'Ta första bilden innan bilen är full av jackor, kaffe och snacks.'
  },
  roros: {
    bestTime: 'Kväll',
    place: 'Gamla trästaden',
    tip: 'Lågt kvällsljus mellan husen ger bäst känsla.'
  },
  jotunheimen: {
    bestTime: 'Morgon',
    place: 'Fjällsjöar och ryggar',
    tip: 'Starta tidigt. Moln kan göra bilderna mer dramatiska än klarblå himmel.'
  },
  lom: {
    bestTime: 'Sen eftermiddag',
    place: 'Stavkyrkan och bymiljön',
    tip: 'Kombinera kort kulturstopp med mat/fika.'
  },
  stryn: {
    bestTime: 'Eftermiddag/kväll',
    place: 'Loen och dalarna',
    tip: 'Spara energi till en utsiktsbild från Loen om vädret öppnar upp.'
  },
  geiranger: {
    bestTime: 'Morgon eller sen kväll',
    place: 'Flydalsjuvet / Ørnesvingen',
    tip: 'Fjordbilder blir bäst när solen står lågt och båtarna börjar röra sig.'
  },
  andalsnes: {
    bestTime: 'Sen eftermiddag',
    place: 'Romsdalen / Rampestreken',
    tip: 'Spara ett sista starkt foto här – dramatisk final på resan.'
  }
}

export const elevationStages = [
  { id: 'stage-1', name: 'Idre → Røros', values: [720, 690, 640, 610, 630] },
  { id: 'stage-2', name: 'Røros → Jotunheimen/Lom', values: [630, 720, 880, 1100, 760, 380] },
  { id: 'stage-3', name: 'Lom → Stryn via Sognefjellet', values: [380, 760, 1180, 1430, 1100, 450, 20] },
  { id: 'stage-4', name: 'Stryn/Loen → Geiranger', values: [20, 310, 620, 40] },
  { id: 'stage-5', name: 'Geiranger → Åndalsnes', values: [40, 620, 850, 320, 10] },
  { id: 'stage-6', name: 'Åndalsnes → Idre', values: [10, 220, 560, 720] }
]

export const conciergeRules = [
  {
    condition: 'geiranger-good',
    title: 'Fjordläge',
    text: 'Om Geiranger visar Go: prioritera fjordbåt och utsiktsplatser före längre transport.'
  },
  {
    condition: 'jotunheimen-bad',
    title: 'Fjällväder',
    text: 'Om Jotunheimen visar Plan B: flytta stor vandring och välj Lom/Stryn som flexdag.'
  },
  {
    condition: 'stryn-good',
    title: 'Aktivitetsfönster',
    text: 'Om Stryn/Loen visar Go: lägg Loen Skylift eller el-MTB här innan vädret ändras.'
  }
]
