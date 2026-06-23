# Northbound X v32 – Safe Mobile Fix

Säker rollback från v29 som fungerade.

Fixar:
- tar bort ändringen med separat mobilbild från v31
- lägger in korrekt Netlify SPA fallback
- tar bort CinematicIntro/undre Norway 2026
- mobilfix görs bara med crop-position, inte ny bild
- desktop lämnas i praktiken oförändrad

Netlify:
- Build command: `npm run build`
- Publish directory: `dist`
