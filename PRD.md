# PRD - Caesar Road Website

## 1) Product Summary
- Product: Bilingual marketing website for Caesar Road Travel & Tourism.
- Primary artifact: `artifacts/website` (Next.js 15, static export).
- Target users: Potential customers looking for travel services and direct contact via WhatsApp.

## 2) Project Goals
- Present brand professionally in Arabic and English.
- Make service discovery easy (services, branches, about, contact).
- Maximize direct conversion to WhatsApp contact.
- Keep the site fast and stable on static hosting.

## 3) In Scope
- UI/UX updates in website pages and components.
- Arabic and English content updates.
- SEO basics (titles, descriptions, semantic structure).
- Performance hygiene (optimized assets, avoid unnecessary JS weight).
- Responsive behavior (mobile-first + desktop polish).

## 4) Out of Scope (for now)
- New backend features in `api-server`.
- Database features and dashboard systems.
- Authentication, user accounts, booking engine logic.
- Major infrastructure redesign.

## 5) Architecture & Source of Truth
- Repo type: pnpm monorepo.
- Main work package: `artifacts/website`.
- Content source:
  - `artifacts/website/src/lib/content/ar.ts`
  - `artifacts/website/src/lib/content/en.ts`
- Routes:
  - Arabic: `/`, `/services`, `/branches`, `/about`, `/contact`
  - English: `/en`, `/en/services`, `/en/branches`, `/en/about`, `/en/contact`

## 6) Functional Requirements
- Navigation works in both languages with correct directionality.
- Home page includes clear value proposition and CTA to WhatsApp.
- Services page clearly explains each service and trust points.
- Branches page shows branch data (address, map, working hours, WhatsApp).
- About page communicates story, mission, values, and credibility.
- Contact page prioritizes WhatsApp and shows social/branch contact paths.
- Footer reflects correct links and social channels.

## 7) Non-Functional Requirements
- Build output remains static-compatible (`output: "export"`).
- No broken routes in Arabic or English.
- Mobile layout must remain usable and readable.
- Keep CLS/LCP risks low (avoid heavy above-the-fold media unless needed).
- Keep text and contact data consistent across pages.

## 8) Content Rules
- Arabic and English content must be semantically equivalent.
- Placeholder contacts (e.g., `XXXXXXXXX`) must be replaced only with approved final values.
- No unverified claims (numbers, years, partnerships) without confirmation.

## 9) Acceptance Criteria (Per Change)
- `pnpm --filter @workspace/website run typecheck` passes.
- Critical page paths render in dev without runtime errors.
- Updated content appears in both languages when applicable.
- No accidental edits outside task scope.

## 10) Delivery Workflow
1. One conversation only (this thread).
2. One PRD only (`PRD.md`) as decision reference.
3. Every requested change is mapped to this PRD scope.
4. Small batches: implement -> review -> commit.
5. Push to GitHub, then sync in Replit if needed.

## 11) Current Priority Plan
1. Polish the home page middle sections to match the new hero quality (`Services`, then `Why Us`).
2. Add branch visuals: one representative image per city/country on branch-related UI.
3. Add real hero/banner imagery to internal pages (`/services`, `/branches`, `/about`, `/contact` and English equivalents) instead of abstract placeholder rectangles.
4. Continue content consistency and conversion polishing across Arabic and English pages.
5. SEO + metadata pass across main pages.
6. Final QA sweep before production release.

## 12) Progress Snapshot

### Completed in this thread
- Environment on the new laptop is ready enough for local development:
  - Git installed
  - Node.js installed
  - `pnpm` installed and working
  - project runs locally from `D:\ceasarroad\CEASARROAD`
- Home hero significantly redesigned and polished:
  - Arabic font flow improved by using Cairo in the Arabic app layout
  - English layout now uses Inter via Next font loading
  - hero spacing, hierarchy, and CTA layout refined
  - rotating final word added in the hero title for both Arabic and English
  - hero background changed toward a calmer premium sky-like motion direction
  - mouse interaction added to the hero background layers
- Header upgraded:
  - more premium visual treatment
  - header now switches between dark/light appearance depending on the section under it
- Home content polish:
  - hero copy updated in Arabic and English to feel more premium
- Home branch data consistency fixed:
  - home page branch cards now use the same branch source as the dedicated branches page
  - this removes mismatch between home, footer, and branches page
- Airlines section refined visually to better fit the upgraded hero/header style
- Hydration issue fixed in the home stats section by replacing locale-dependent number formatting with deterministic formatting

### Known current state
- The top/home experience is now ahead of the middle sections in visual quality.
- There are still broader repo typecheck issues outside the immediate scope of these UI changes.
- Deployment flow to cPanel is intentionally deferred until the visual/content batch is ready.

## 13) Remaining Work

### Home page
- Refine `Services` section to visually match the upgraded hero.
- Refine `Why Us` section to match the new quality level and spacing rhythm.
- Review the remaining home sections for spacing consistency and stronger visual hierarchy.
- Validate mobile behavior after the recent hero/header changes and tune where needed.

### Branches and branch visuals
- Add one representative image per branch/city/country in branch-related UI.
- Ensure those images are used consistently wherever branches are presented.
- Keep branch data unified from one source of truth.

### Internal pages
- Add a proper opening visual/hero image to each non-home page:
  - `Services`
  - `Branches`
  - `About`
  - `Contact`
  - and the English equivalents
- Replace simple placeholder/abstract opening blocks with meaningful branded imagery.

### Content and QA
- Continue upgrading Arabic and English copy page by page.
- Verify WhatsApp/contact paths remain clear and consistent.
- Run final visual QA before deployment, especially:
  - hero/header transitions
  - branch consistency
  - mobile spacing
  - bilingual parity

## 14) Change Control
- Any request outside scope is either:
  - deferred to backlog, or
  - added here first by updating this PRD, then implemented.
