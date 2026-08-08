# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### Profile Persistence Feedback

Files: actions/profile.ts, app/profile/page.tsx, components/profile/ProfileForm.tsx
Last updated: 2026-08-09

| Property | Class |
| --- | --- |
| Save pending state | `disabled:cursor-not-allowed disabled:opacity-60` |
| Save success feedback | `text-xs font-medium text-success-dark` |
| Save error feedback | `text-xs font-medium text-error` |

Pattern notes: Profile persistence keeps the existing card and form surfaces unchanged. Mutation feedback is compact inline text immediately above the primary action, with the primary button label reflecting pending and successful states.

When a current resume exists, the circular resume icon is the authenticated SDK download control and opens the returned PDF Blob in a new tab.

### Profile Page Surface

Files: app/profile/page.tsx, components/profile/ProfileForm.tsx, components/profile/ProfileAttentionBanner.tsx, components/profile/PersonalInfoSection.tsx, components/profile/ProfessionalInfoSection.tsx, components/profile/WorkExperienceSection.tsx, components/profile/EducationSection.tsx, components/profile/JobPreferencesSection.tsx, components/profile/TagList.tsx, components/profile/ProfileField.tsx, components/profile/ResumeUpload.tsx, components/profile/CompletionIndicator.tsx
Last updated: 2026-08-08

| Property        | Class                                                         |
| --------------- | ------------------------------------------------------------- |
| Page background | `bg-background`                                               |
| Card background | `bg-surface`                                                  |
| Card border     | `border border-border`                                        |
| Card radius     | `rounded-xl`                                                  |
| Card spacing    | `p-5 sm:p-6`                                                  |
| Section spacing | `space-y-8`, `border-t border-border-light pt-7`              |
| Text hierarchy  | `text-text-primary`, `text-text-secondary`, `text-text-muted` |
| Input pattern   | `h-9 rounded-md border border-border px-3 text-xs`            |
| Primary action  | `bg-accent text-accent-foreground hover:bg-accent-dark`       |
| Shadow          | `shadow-sm`                                                   |

**Pattern notes:**
The Profile page uses a centered `max-w-[960px]` content column and stacks full-width white cards over the background token. Form sections use two columns from the `md` breakpoint, compact uppercase field labels, and a consistent 16px vertical rhythm. Repeating fields use muted surface panels, while missing-profile states use the error token only for badges, iconography, and the completion ring. Keep the form decomposed by domain: `ProfileForm` owns state and orchestration, while each `*Section` owns its field layout and delegates shared controls to `ProfileField`, `TagList`, and `TextArea`/`TextInput`/`SelectInput`.

- Homepage marketing layout — app/page.tsx — uses bg-background, bg-surface, bg-surface-secondary, border-border, text-text-primary, text-text-secondary, text-text-darkest, bg-accent, rounded-[24px], rounded-2xl, rounded-md, shadow-sm
- Auth card layout — app/(auth)/login/page.tsx — uses bg-background, bg-surface, bg-surface-secondary, border-border, text-text-primary, text-text-secondary, text-accent, text-accent-foreground, rounded-[32px], rounded-[24px], rounded-xl, rounded-lg, shadow-sm
- Dashboard shell — app/dashboard/page.tsx — uses bg-background, bg-surface, border-border, text-text-primary, text-text-secondary, text-accent, rounded-[32px], rounded-md, shadow-sm
