# Memory — Auth and UI foundation

Last updated: 2026-08-02

## What was built

- Implemented the first InsForge authentication flow for Google and GitHub OAuth using server-side auth actions and callback handling.
- Added a login page at app/(auth)/login/page.tsx and a dashboard page at app/dashboard/page.tsx.
- Added protected-route handling with proxy.ts so dashboard, find-jobs, and profile areas redirect unauthenticated users to login.
- Added a visible Sign out button on the dashboard.
- Created redirect helper logic and regression tests for auth redirect behavior in lib/auth-redirect.ts and lib/auth-redirect.test.mjs.
- Updated the UI registry with the new auth and dashboard visual patterns in context/ui-registry.md.

## Decisions made

- Chose a server-side OAuth flow for InsForge to keep auth cookies and callback exchange on the server, which fits the Next.js app architecture.
- Used the Next.js proxy convention instead of the deprecated middleware convention for protected-route handling.
- Kept the initial auth UI aligned with the existing Tailwind design tokens and the project’s homepage styling patterns.
- Keep server-side PostHog for later

## Problems solved

- Fixed the auth redirect flow so protected routes can send users back to the page they originally attempted to visit.
- Resolved the Next.js 16 deprecation warning by migrating the route guard from middleware.ts to proxy.ts.

## Current state

- Auth sign-in and sign-out are wired through the app.
- Protected routes redirect unauthenticated users to login.
- The app builds successfully with npm run build.

## Next session starts with

- Move to the database schema and profile workflow.
