# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 2 — Profile Page
**Last completed:** 05 Profile Page — Full UI
**Next:** 06 Profile Save Logic

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [x] 03 PostHog Initialization
- [x] 04 Database Schema

### Phase 2 — Profile Page

- [x] 05 Profile Page — Full UI
- [x] 06 Profile Save Logic
- [ ] 07 AI Profile Extraction from Resume
- [ ] 08 Resume PDF Generation from Profile

### Phase 3 — Find Jobs Page

- [ ] 09 Find Jobs Page — Full UI
- [ ] 10 Adzuna Job Discovery
- [ ] 11 Filter + Sort + Pagination

### Phase 4 — Job Details Page

- [ ] 12 Job Details Page — Full UI
- [ ] 13 Company Research Agent

### Phase 5 — Dashboard

- [ ] 14 Dashboard Page — Full UI
- [ ] 15 Stats Bar — Real Data
- [ ] 16 Recent Activity — Real Data
- [ ] 17 Analytics Charts — PostHog Data

---

## Decisions Made During Build

_Add decisions here as they are made during implementation._

---

## Notes

- Implemented the first auth iteration using InsForge SSR auth helpers with server-side OAuth initiation and callback exchange.
- Protected dashboard, find-jobs, and profile routes through middleware and redirect unauthenticated users to the login page.
- The app now supports Google and GitHub sign-in entry points and a working callback route for the OAuth flow.
- InsForge database schema setup is complete, including the application tables, resumes storage bucket, and row-level security policies.
- Phase 2 starts with the Profile Page UI; profile save logic and resume workflows remain queued after the mock UI.
- Built the complete Profile page UI from `context/designs/profile.png`, including responsive form sections, resume controls, completion state, tag inputs, and repeatable work experience.
- Profile controls now hydrate from the authenticated profile row and persist through the Feature 06 server action.
- Resume selection uploads to the active user resume path, and completion state remains derived from the eight required groups.
- The `profile_completed` PostHog event fires only on an incomplete-to-complete transition.
