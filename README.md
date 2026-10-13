# URMEI creator portal

The URMEI creator (influencer) portal, built from Figma: Vite + React 19 + TypeScript + Tailwind CSS v4. There is no backend; state is kept in `localStorage`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and production build
npm run lint
```

## Repo layout

| Path | What it holds |
| --- | --- |
| `src/`, `public/` | The app and its Figma-exported assets |
| `TRACKER.md` | Every task, by `T-nn` ID |
| `change-requests/` | One folder per client change request (requirement, answers, Figma flows) |
| `workflows/` | Agent-driven workflows (change requests, responsive Figma design, design review) |
| `CLAUDE.md` | The full guide for AI agents and developers |
