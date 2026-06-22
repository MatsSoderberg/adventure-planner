export const stops = [
  { id:'idre', day:'Start', name:'Idre', subtitle:'Start och mål', coords:[61.858,12.714], type:'start', drive:'Start', highlights:['Samling','Packning','Fjällkänsla redan från start'], activity:'Roadtrip start', map:'https://www.google.com/maps/search/?api=1&query=Idre+Sweden' },
  { id:'roros', day:'Dag 1', name:'Røros', subtitle:'UNESCO, trästad och första Norge-känslan', coords:[62.574,11.384], type:'culture', drive:'ca 3–4 h från Idre', highlights:['UNESCO-världsarv','Kvällspromenad i trästaden','Middag i centrum'], activity:'Kultur + mat', map:'https://www.google.com/maps/search/?api=1&query=R%C3%B8ros+Norway' },
  { id:'lom', day:'Dag 2', name:'Lom / Jotunheimen', subtitle:'Bas för fjäll, Galdhøpiggen och Besseggen-val', coords:[61.837,8.568], type:'mountain', drive:'ca 5 h från Røros', highlights:['Lom stavkyrka','Bageriet i Lom','Porten till Jotunheimen'], activity:'Fjällbas', map:'https://www.google.com/maps/search/?api=1&query=Lom+Norway' },
  { id:'besseggen', day:'Dag 3', name:'Besseggen / Galdhøpiggen', subtitle:'Välj en stor fjälldag – inte båda', coords:[61.499,8.753], type:'hike', drive:'Heldagsaktivitet', highlights:['Ikonisk kamvandring','Alternativ: Norges högsta berg','Kräver bra väder'], activity:'Vandring', map:'https://www.google.com/maps/search/?api=1&query=Besseggen+Norway' },
  { id:'stryn', day:'Dag 4', name:'Sognefjellet → Stryn', subtitle:'En av Norges vackraste körsträckor', coords:[61.904,6.722], type:'scenic', drive:'ca 4–5 h från Lom', highlights:['Sognefjellet','Snöfält och utsikter','Stryn som bas'], activity:'Scenic drive', map:'https://www.google.com/maps/search/?api=1&query=Stryn+Norway' },
  { id:'loen', day:'Dag 5', name:'Loen', subtitle:'Skylift, fjord, cykel och aktivitetsdag', coords:[61.872,6.855], type:'activity', drive:'Kort etapp från Stryn', highlights:['Loen Skylift','El-MTB eller lättare vandring','Fjordutsikt'], activity:'Skylift / MTB', map:'https://www.google.com/maps/search/?api=1&query=Loen+Norway' },
  { id:'geiranger', day:'Dag 5–6', name:'Geiranger', subtitle:'Fjordcruise, vattenfall och ikoniska vyer', coords:[62.101,7.205], type:'fjord', drive:'ca 2–3 h via fina vägar', highlights:['Fjordbåt eller RIB','Flydalsjuvet','Middag med utsikt'], activity:'Fjordtur', map:'https://www.google.com/maps/search/?api=1&query=Geiranger+Norway' },
  { id:'andalsnes', day:'Dag 6', name:'Trollstigen / Åndalsnes', subtitle:'Hårnålskurvor, vattenfall och Rampestreken', coords:[62.567,7.687], type:'road', drive:'ca 2–3 h från Geiranger', highlights:['Trollstigen om vägen är öppen','Utsiktsplattformar','Rampestreken om benen orkar'], activity:'Ikonisk väg', map:'https://www.google.com/maps/search/?api=1&query=%C3%85ndalsnes+Norway' }
];

export const route = stops.map(s => s.coords);

export const days = [
  { day:'Dag 1', route:'Idre → Røros', theme:'Mjuk start', time:'3–4 h', text:'Kortare första kördag med fokus på att komma in i Norge utan stress.' },
  { day:'Dag 2', route:'Røros → Lom/Jotunheimen', theme:'In i fjällen', time:'ca 5 h', text:'Transportdag med stopp, vyer och bas inför fjälläventyret.' },
  { day:'Dag 3', route:'Besseggen eller Galdhøpiggen', theme:'Stor fjälldag', time:'heldag', text:'Välj en stor tur beroende på väder, ork och ambition.' },
  { day:'Dag 4', route:'Lom → Sognefjellet → Stryn', theme:'Scenic drive', time:'4–5 h', text:'En av resans vackraste körsträckor. Planera många fotostopp.' },
  { day:'Dag 5', route:'Stryn → Loen → Geiranger', theme:'Aktivitet + fjord', time:'kortare körning', text:'Loen Skylift, el-MTB eller lugn aktivitet före Geiranger.' },
  { day:'Dag 6', route:'Geiranger → Trollstigen → Åndalsnes', theme:'Ikonisk väg', time:'2–3 h', text:'Kolla vägstatus innan avfärd. Lägg in tid för utsiktsplatser.' },
  { day:'Dag 7', route:'Åndalsnes → Idre', theme:'Hemresa', time:'lång kördag', text:'Lugn hemresa med möjlighet till sista stopp längs vägen.' }
];
