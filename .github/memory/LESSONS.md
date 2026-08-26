# Lessons Learned — VeloBikers Motor Club

Pelajaran dan catatan dari pengembangan proyek ini.

---

## Struktur File

### Monolithic App.tsx
**Masalah**: Awalnya semua kode (2083 baris) dalam satu file `App.tsx`.
**Solusi**: Rencana migrasi ke struktur modular per section (lihat `copilot-.instructions.md` > MODULAR FILE SCHEMA).
**Pelajaran**: Mulai modular dari awal, jangan tunggu kode jadi besar.

### Flat File Structure
**Masalah**: File-file source berada di root bukan di `src/`.
**Solusi**: Migrasi ke struktur `src/` mengikuti konvensi Vite+React.
**Pelajaran**: Ikuti konvensi framework sejak awal.

---

## Tech Stack

### Tailwind CDN
**Masalah**: Menggunakan Tailwind via CDN untuk prototyping.
**Risiko**: Tidak production-ready, tidak bisa tree-shake, CDN dependency.
**Solusi**: Install Tailwind sebagai dependency + postcss config sebelum deploy.
**Pelajaran**: CDN fine untuk dev, tapi harus migrasi ke build-time sebelum production.

### No Lock File
**Masalah**: Tidak ada `pnpm-lock.yaml`.
**Risiko**: Dependency versions tidak konsisten antar dev machine.
**Solusi**: Jalankan `pnpm install` untuk generate lockfile.
**Pelajaran**: Selalu commit lockfile.

---

## Section Development

### Yang Sudah Selesai
- Header & Navbar (responsive, mobile drawer)
- Hero Section (Ken Burns animation, parallax)
- Our Identity (mission cards, timeline, counters)
- The Core Crew (3D infinite carousel, member modal)
- Club Agenda (events, filters, countdown, Google Maps)
- Footer (social links, back to top)
- Custom cursor spotlight
- Scroll-reveal animations

### Yang Belum Selesai
- The Fleet (motor gallery dengan spec modal)
- Club Shop (merchandise, cart, WhatsApp checkout)
- Dispatch / Community Feed
- Full Join/Registration form
- Canvas particle engine
- Web Audio sound effects
- Toast notification system
