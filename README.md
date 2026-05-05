# Brand Workshop — Holy Cow Media

Interaktivt værktøj til facilitering af visuel identitet- og brandworkshops sammen med kunder.

## Lokal udvikling

Statiske filer — kør hvilken som helst lokal HTTP-server:

```bash
python3 -m http.server 7321
```

Åbn `http://localhost:7321/`.

## Deployment

Repoet auto-deployer til `holycow.media/workshop/` via cPanel Git Version Control + `.cpanel.yml`.

Push til `main` → cPanel puller automatisk → filerne kopieres til `public_html/workshop/`.

## Filer

- `index.html` — app-skelet med 9 moduler
- `app.js` — state, navigation, Unsplash, fontvalg, designelementer, eksport
- `styles.css` — Holy Cow design system
- `config.js` — Unsplash API-nøgle (client-side, OK for read-only demo tier)
- `assets/logo.svg` — Holy Cow Media logo
- `.cpanel.yml` — deploy-instruktioner til cPanel
