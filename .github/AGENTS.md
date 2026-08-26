# AGENTS — VeloBikers Landing Page

Repo-specific facts only. See `.github/instructions/copilot-.instructions.md` for the full protocol.

## First principles

- **Package manager**: `pnpm@10.18.3` only. Never npm/yarn.
- **Quality Gate**: `pnpm validate` = lint → typecheck → test (sequential). Warning=Error.
- **No git ops**: User handles commits/PRs.
- **This file is gitignored** — local only, like most of `.github/`.

## Project (SPA, no monorepo)

Single React application. No backend, no database, no separate packages.

| Item | Detail |
|------|--------|
| Module | ESM (React 18+, Vite, TypeScript) |
| Test runner | Vitest (jsdom) |
| Test pattern | `*.{test,spec}.{ts,tsx}` |
| Test command | `pnpm test` (isolated — no services needed) |

## Commands

```bash
pnpm validate             # lint → typecheck → test (order matters!)
pnpm dev                  # Vite dev server
pnpm build                # production build
pnpm test                 # vitest run (isolated)
pnpm lint                 # eslint
pnpm typecheck            # tsc --noEmit
```

## Framework

### Vite + React 18+
- TypeScript strict mode
- Tailwind CSS for styling + custom CSS variables for animations
- `react-icons` for iconography (Heroicons + FontAwesome)
- Web Audio API for sound effects
- Custom canvas particle engine for hero background

### State Management
- React Hooks only: `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`
- Local Storage for cart persistence (via `useCart` hook)
- No Redux, no Zustand, no external state library

### Test Setup
- Vitest with jsdom environment
- No external services required
- Prioritize unit tests (hooks, utils) over component render tests
- Avoid rendering components with heavy canvas/audio dependencies

## Sections

1. Header & Navbar — sticky, mobile drawer, cart widget, audio toggle
2. Hero — particle canvas, stats counters, CTA buttons
3. Our Identity — mission cards, history timeline, safety charter
4. The Fleet — motor gallery, category filter, spec modal
5. The Core Crew — 3D infinite carousel, member detail modal
6. Club Agenda — events with year filter, countdown timer, Google Maps embed
7. Club Shop — merchandise catalog, product modal, shopping cart, WhatsApp checkout
8. Dispatch — community feed cards
9. Contact & Join — registration form with validation
10. Footer — social links, back to top

## Key Patterns

- **AnimatedSection**: Intersection Observer wrapper for scroll reveal animations
- **Modal**: Reusable modal with backdrop blur (used by fleet, members, agenda, shop)
- **SectionHeader**: Standard section header (badge + title + subtitle)
- **Toast**: Floating notification system
- **useCart**: Cart state with localStorage persistence
- **useAudio**: Web Audio API hook for sound effects
- **WhatsApp checkout**: Link generator for direct WhatsApp API messaging

## MCP tools available

Three local servers wired in `opencode.json`:
- **trinity-context** — agent info, architecture, conventions, tech stack, routing
- **trinity-memory** — ADRs and lessons learned (read/add)
- **trinity-validator** — audit checklist, naming validation, API response validation

## Commit conventions

Enforced by conventional commits config.

```
type(scope): description
```

Scopes: components, hooks, data, types, utils, shop, agenda, fleet, members, hero, identity, contact, dispatch, footer, navbar, ui, styles, docs.

Types: feat, fix, docs, style, refactor, perf, test, build, chore, revert.
