# Architectural Decisions — VeloBikers Motor Club

Log keputusan arsitektural (ADR) untuk proyek ini.

---

## ADR-001: SPA Single-Page Architecture

**Status**: Accepted  
**Tanggal**: 2026-08-25

**Konteks**: Website VeloBikers adalah landing page komunitas touring motor yang membutuhkan navigasi antar section tanpa reload halaman.

**Keputusan**: Menggunakan React 18+ SPA dengan section-based navigation (bukan React Router multi-page).

**Rationale**: 
- Semua konten bisa di-load sekaligus
- Navigasi cukup dengan smooth scroll ke section ID
- Performa lebih baik untuk landing page
- Kompleksitas lebih rendah dari multi-page app

---

## ADR-002: No Backend / Database

**Status**: Accepted  
**Tanggal**: 2026-08-25

**Konteks**: Data anggota, motor, event, dan merchandise bersifat statis dan jarang berubah.

**Keputusan**: Semua data hardcode di file TypeScript (`constants.ts`). Tidak ada backend atau database.

**Rationale**:
- Data statis tidak membutuhkan CRUD
- Pengelolaan data cukup edit file langsung
- Deploy lebih mudah (static hosting saja)
- Biaya hosting nol (GitHub Pages / Vercel free tier)

---

## ADR-003: State Management dengan React Hooks + Local Storage

**Status**: Accepted  
**Tanggal**: 2026-08-25

**Konteks**: Hanya perlu state sederhana (keranjang belanja, audio toggle, filter).

**Keputusan**: Menggunakan React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`) + Local Storage untuk persistensi.

**Rationale**:
- Tidak perlu Redux/Zustand untuk state sederhana
- Local Storage cukup untuk cart persistence
- Bundle size lebih kecil
- Kompleksitas lebih rendah

---

## ADR-004: Styling dengan Tailwind CSS CDN

**Status**: Accepted (temporary)  
**Tanggal**: 2026-08-25

**Konteks**: Proyek masih dalam tahap awal, Tailwind belum diinstall sebagai dependency.

**Keputusan**: Menggunakan Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com">`) sementara.

**Rationale**:
- Cepat untuk prototyping
- Tidak perlu config postcss/tailwind.config.js
- **TODO**: Migrasi ke build-time Tailwind sebelum production

---

## ADR-005: Testing dengan Vitest

**Status**: Accepted  
**Tanggal**: 2026-08-25

**Konteks**: Perlu testing infrastructure untuk menjamin kode berkualitas.

**Keputusan**: Menggunakan Vitest sebagai test runner (isolated, tanpa external services).

**Rationale**:
- Native integration dengan Vite
- Cepat (ms untuk unit test)
- API mirip Jest (mudah dipelajari)
- jsdom untuk component testing
