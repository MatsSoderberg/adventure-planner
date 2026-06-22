# Northbound v6.1

Real road routing sprint.

## New in v6.1

- Real driving routes using OSRM public routing
- Route loading status
- Fallback to scenic straight segments if routing is unavailable
- Route distance/time estimate from routing response
- No API key needed

## Notes

OSRM public demo routing is suitable for demos and lightweight use. For production or heavy traffic, replace with a dedicated routing provider.

## Netlify

Build command:

```bash
npm run build
```

Publish directory:

```bash
dist
```
