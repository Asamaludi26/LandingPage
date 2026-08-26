# VeloBikers Community Landing Page

Landing page interaktif komunitas touring motor **VeloBikers Motor Club**.

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: react-icons (Heroicons + FontAwesome)
- **Test**: Vitest

## Run Locally

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Run tests
pnpm test

# Validate (lint + typecheck + test)
pnpm validate
```

## Project Structure

```
src/
├── components/
│   ├── common/          # AnimatedSection, BackToTopButton
│   ├── layout/          # Header, MobileMenu, Footer
│   ├── hero/            # Hero, AnimatedCounter
│   ├── identity/        # About, AboutModal
│   ├── fleet/           # Gallery, GalleryItem, GalleryModal
│   ├── members/         # Members, MemberModal
│   ├── agenda/          # Events, EventModal, CountdownTimer
│   └── contact/         # Contact
├── hooks/               # useIntersectionObserver
├── data/                # constants (static data)
├── types/               # TypeScript interfaces
├── App.tsx              # Root component
├── main.tsx             # Entry point
└── index.css            # Tailwind + custom CSS
```
