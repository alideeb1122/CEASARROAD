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
1. Stabilize content consistency between Arabic and English pages.
2. Polish conversion paths (WhatsApp CTAs, branch contact clarity).
3. SEO + metadata pass across main pages.
4. Visual refinement pass (spacing, hierarchy, responsiveness).
5. Final QA sweep before production release.

## 12) Change Control
- Any request outside scope is either:
  - deferred to backlog, or
  - added here first by updating this PRD, then implemented.
