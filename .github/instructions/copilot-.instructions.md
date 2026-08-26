# AI Orchestrator — Source of Truth

> Baca file ini SETIAP KALI sebelum memulai task.
> Semua AI agents (Claude, Gemini, OpenCode, dll) WAJIB membaca file ini.

---

## PROYEK

**VeloBikers Motor Club** — Landing page interaktif komunitas touring motor.
Arsitektur: React 18+ SPA, TypeScript, Vite, Tailwind CSS. **Tidak ada backend/database.**

---

## LAWS (NON-NEGOTIABLE)

### FATAL — Hentikan operasi
- **LAW-001**: Jangan hardcode secrets atau nomor HP di source code
- **LAW-002**: Jangan edit file di luar workspace project
- **LAW-003**: Jangan commit/push — user handles all git operations
- **LAW-004**: Jangan hapus data user tanpa konfirmasi

### CRITICAL — Rollback
- **LAW-018 (TDD)**: Test ditulis DAHULU sebelum implementasi. RED -> GREEN
- **LAW-019 (Scan Protocol)**: WAJIB baca source actual sebelum menulis. Dilarang menebak.
- **LAW-005**: Semua kode typed — NO `any` tanpa justifikasi terdokumentasi
- **LAW-006**: Error handling WAJIB — no empty catch blocks
- **LAW-007**: Quality Gate: `pnpm validate` — Warning = Error

### WARNING — Perbaiki sebelum submit
- DRY — cari existing code sebelum buat baru
- Business logic di hooks/utils, bukan di komponen
- Conventional commits: `type(scope): description`
- Changelog: update `.github/docs/changelog/ReadMe.md`

---

## TEST STRATEGY (WAJIB)

### Prinsip Test Performance

```
Unit Test  >>>  Component Test  >>>  Full Page Test
(ms)            (s)                  (10s+)
```

| Jenis | Kecepatan | Perlindungan | Kapan Pakai |
|-------|-----------|-------------|-------------|
| **Unit Test** | ⚡ ms | Business logic | Utils, hooks, validasi, formatters |
| **Component Test** | ⚡ s | UI behavior | Komponen kecil/atomik (Button, Modal, Toast) |
| **Full Page Test** | 🐌 10s+ | Integration | HANYA untuk flow kritis, 1-2 test per section |

### ATURAN MEMBUAT TEST (WAJIB)

#### 1. Prioritaskan Unit Test
```
✅ Unit test: formatters.test.ts, validators.test.ts, dateUtils.test.ts
✅ Unit test: useCart.test.ts, useAudio.test.ts, useIntersection.test.ts
✅ Component test: Button.test.tsx, Modal.test.tsx, Toast.test.tsx
```

#### 2. Batasi Page/Component Test
```
⚠️  BOLEH: 1-2 test per section untuk verifikasi render (smoke test)
❌  JANGAN: 10+ test per section — pindahkan logic test ke unit test
❌  JANGAN: Test yang render halaman penuh dengan heavy libraries
❌  JANGAN: Test yang mock 5+ dependencies — pindahkan ke custom hook
```

**Jika test membutuhkan >3 mocks, logic HARUS dipindah ke custom hook atau utility.**

#### 3. Heavy Libraries — Test CARA INI
```
❌  JANGAN render komponen yang import:
    framer-motion, canvas partikel, Web Audio API, Google Maps embed

✅  CARA AMAN: Extract logic ke custom hook, test hook-nya saja
✅  CARA AMAN: Mock komponen berat dengan vi.mock()
```

#### 4. Test Structure — Minimal & Fokus
```
Test file yang baik:
- 1 describe block per komponen/hook
- 3-8 test per describe (max 15)
- Satu test = satu assertion utama

❌ JANGAN buat test untuk:
  - Cover 100% branch — tidak realistis
  - Render testing yang hanya cek teks statis
  - Test CSS classes (itu bukan behavior test)
```

---

## PROJECT ESSENTIALS

| Item | Detail |
|------|--------|
| Package manager | `pnpm@10.18.3` ONLY (never npm/yarn) |
| Quality gate | `pnpm validate` = lint + typecheck + test |
| Framework | React 18+ SPA with TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS + Custom CSS Variables & Animations |
| Icon library | `react-icons` (Heroicons `HiOutline*` & FontAwesome `Fa*`) |
| State management | React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`) + Local Storage |
| Audio | Web Audio API |
| Canvas | Custom Particle Engine |
| Test runner | Vitest 3 (jsdom) |
| Test command | `pnpm test` (vitest, isolated — no external services) |

---

## SECTION MAP

Website single-page application dengan section-section berikut:

| Section | Path ID | Komponen Utama | Fitur Kunci |
|---------|---------|----------------|-------------|
| Header & Navbar | `header` | Navbar, MobileMenu | Brand logo, cart widget, audio toggle |
| Hero | `hero` | Hero, HeroCanvas, StatsCounter | Particle canvas, CTA buttons, live metrics |
| Our Identity | `identity` | Identity, MissionCards, HistoryTimeline | Mission, timeline, safety charter |
| The Fleet | `fleet` | Fleet, MotorCard, MotorDetailModal | Filter kategori, spesifikasi motor |
| The Core Crew | `members` | Members, MembersCarousel, MemberCard | 3D infinite carousel, profil modal |
| Club Agenda | `agenda` | Agenda, AgendaFeatured, AgendaGrid, AgendaDetailModal | Filter multi-tahun, countdown, Google Maps |
| Club Shop | `shop` | Shop, ProductCard, ProductDetailModal, CartDrawer | Katalog, cart, WhatsApp checkout |
| Dispatch | `dispatch` | Dispatch, FeedCard | Community feed, news |
| Contact & Join | `contact` | Contact, JoinForm, ContactInfo | Registration form, contact channels |
| Footer | `footer` | Footer | Social media, back to top |

---

## DEVELOPER FLOW (WAJIB)

```
SCAN (Glob/Grep/Read) → PLAN (TodoWrite) → TEST-RED → EXECUTE → TEST-GREEN → REFACTOR → VERIFY (lint+typecheck) → DOCUMENT
```

---

## MEMORY & DECISIONS

- Architectural decisions: `.github/memory/DECISIONS.md`
- Lessons learned: `.github/memory/LESSONS.md`
- Jika ada keputusan arsitektural baru → update DECISIONS.md

---

## OUTPUT STYLE

- Langsung ke kode/aksi. Tidak ada pembuka/penutup.
- Jika perlu penjelasan arsitektural → tulis di `.github/memory/DECISIONS.md`
- Update changelog SETIAP perubahan:
  - Buat file baru di `.github/docs/changelog/entries/YYYY-MM-DD.md`
  - Gunakan template dari `.github/docs/changelog/_TEMPLATE.md`
- **Changelog `### Commit` format WAJIB multi-line**:
  - Baris 1: `type(scope): concise header` (max 150 chars)
  - Baris 2+: `- detail` bullet points untuk tiap perubahan spesifik
  - Contoh:
    ```
    feat(shop): add shopping cart drawer with WhatsApp checkout

    - add CartDrawer slide-over component
    - add useCart hook with localStorage persistence
    - implement WhatsApp API link generator in utils
    ```

---

## MODULAR FILE SCHEMA

Target struktur folder (referensi untuk code organization):

```text
src/
├── assets/              # Aset statis (audio, gambar)
├── components/
│   ├── common/          # Komponen reusable (Modal, Toast, SectionHeader, AnimatedSection)
│   ├── layout/          # Navbar, MobileMenu, Footer
│   ├── hero/            # Hero, HeroCanvas, StatsCounter
│   ├── identity/        # MissionCards, HistoryTimeline
│   ├── fleet/           # MotorCard, MotorDetailModal
│   ├── members/         # MembersCarousel, MemberCard, MemberDetailModal
│   ├── agenda/          # AgendaFeatured, AgendaCard, AgendaDetailModal
│   ├── shop/            # ProductCard, ProductDetailModal, CartDrawer
│   ├── dispatch/        # FeedCard
│   └── contact/         # JoinForm, ContactInfo
├── hooks/               # useAudio, useCart, useIntersection, useWindowSize
├── data/                # Data statis: membersData, eventsData, fleetData, productsData
├── types/               # TypeScript interfaces: member, event, bike, product
├── utils/               # dateUtils, formatters, whatsapp link generator
├── App.tsx              # Root component
├── main.tsx             # Vite entry point
└── index.css            # Tailwind CSS & global animations
```
