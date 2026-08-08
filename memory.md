# Memory - Phase 2 Profile Persistence

Last updated: 2026-08-09 (Asia/Manila)

## What was built

- Completed the database-schema phase and the Profile page UI phase from the approved design.
- The Profile page includes navigation, attention banner, completion ring, resume upload surface, personal information, professional information, work experience, education, job preferences, tag controls, and shared form controls.
- The original profile form was split into domain-owned components under `components/profile/`, with `ProfileForm.tsx` retaining form state and orchestration.
- The disabled email field uses the signed-in InsForge user's email and remains read-only.
- Completed Feature 06, Profile Save Logic.
- Added `actions/profile.ts` to authenticate the user, parse and validate profile form data, upload a selected PDF to the user's active resume path, save the profile row, persist `is_complete`, revalidate `/profile`, and report safe UI status.
- Added `types/index.ts` with shared profile, education, work-experience, and completion types/helpers.
- Updated `app/profile/page.tsx` to load and pass the authenticated user's existing profile into the form.
- Updated the profile form sections with stable field names and saved-value hydration.
- Added authenticated current-resume viewing in `components/profile/ResumeUpload.tsx` using `insforge.storage.from("resumes").download(`${userId}/resume.pdf`)`, then opening the returned Blob in a new tab.
- Refactored the resume upload SVG into one reusable `ResumeIcon` instead of duplicating the SVG markup.
- Updated `context/progress-tracker.md` and `context/ui-registry.md`.

## Decisions made

- Profile field values intentionally start empty except for the authenticated email, which is read-only.
- Profile completeness is calculated from full name, phone, location, professional information, skills, work experience, education, and job preferences.
- Domain sections own their visual field layouts; `ProfileForm` owns shared state, completion calculation, tag additions/removals, submission feedback, and server-action orchestration.
- Profile mutations use a Server Action receiving `FormData`; UI components do not access the database directly.
- The existing database schema remains unchanged. Only `resume_pdf_url` and `is_complete` are persisted; completion percentage and missing fields are derived from the eight required profile groups.
- Resume storage uses the deterministic key `{user_id}/resume.pdf` inside the private `resumes` bucket.
- Current-resume viewing must use the authenticated SDK `download()` method. Directly opening `resume_pdf_url` returns `AUTH_INVALID_CREDENTIALS` because a new-tab navigation does not supply the SDK token.
- `profile_completed` fires only on an incomplete-to-complete transition.

## Problems solved

- Removed misleading static progress from the Profile attention banner and completion ring.
- Avoided duplicated form markup by extracting personal, professional, work experience, education, and job-preference sections into focused components.
- Confirmed the backend contains the resume object in the private `resumes` bucket at the user-scoped key and that the profile URL points to it.
- Replaced the broken unauthenticated direct-link behavior with an authenticated Blob download.
- Kept the resume icon markup single-sourced after the current-resume interaction was added.

## Current state

- The Profile UI follows the design-token visual system, and the completion banner and ring update as required fields are completed.
- Feature 06 profile saving, existing-profile hydration, PDF upload, and current-resume viewing are implemented.
- `npx tsc --noEmit` and `npm run lint` pass after the latest resume icon refactor.
- A production build passed before the final authenticated-download and icon-only UI refinements; rerun `npm run build` if a full final verification is needed.
- No database schema changes were made.

## Next session starts with

- Run the production build, then manually verify the current-resume circle downloads and opens the private PDF while signed in.
- After that, begin Feature 07: AI Profile Extraction from Resume.

## Open questions

- Whether the current-resume icon should use a more explicit view/download glyph while preserving the approved visual design.
