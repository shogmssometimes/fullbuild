# fullbuild

Combined PWA bundle that ships the three Collapse web builds together:

- Collapse Companion (`#/cvttweb` inside the React shell)
- cHUD (`/chud/`)
- CS Matrix (`/csmatrix/`)

## Development

```bash
cd collapse_web
npm install
npm run dev
```

## Build & Deploy

```bash
cd collapse_web
npm run build            # outputs to docs/ with base /fullbuild/
```

GitHub Pages deploy is configured via `.github/workflows/deploy-gh-pages.yml` and serves the `docs/` folder. The service worker caches entry points for all three experiences so they keep working offline once loaded.
