<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Read Before Anything Else

Read in this exact order before any implementation:

1. context/project-overview.md
2. context/architecture.md
3. context/ui-tokens.md
4. context/ui-rules.md
5. context/ui-registry.md
6. context/code-standards.md
7. context/library-docs.md
8. context/build-plan.md
9. context/progress-tracker.md

## Rules That Never Change

- Never use hardcoded hex values or raw Tailwind color classes
- Update `progress-tracker.md` and `ui-registry.md` after every feature
- Before any third party library — load its installed skill first,
  then read `context/library-docs.md` for project-specific rules
- If the same problem persists after one corrective prompt —
  stop immediately and run /recover

## InsForge Backend Rules

When this project uses InsForge as the backend, follow the latest InsForge guidance before implementing anything new:

- Prefer the official InsForge CLI and agent skills over ad-hoc backend setup.
- If an InsForge MCP server is available, use its fetch-docs capability first; otherwise use the official InsForge docs and skill guidance.
- Use InsForge for authentication, database, storage, and realtime needs.
- Keep browser and server clients separate: browser-side code should use the browser client, and server routes/actions should use the server client.
- Store configuration in environment variables such as `NEXT_PUBLIC_INSFORGE_URL` and `NEXT_PUBLIC_INSFORGE_ANON_KEY`.
- Never hardcode secrets or API keys.
- Scope database queries to the current user where relevant, and always handle query errors.
- For storage uploads, use the project’s intended bucket/path conventions and keep uploads server-side.

## Available Skills

- `/architect` — before any complex feature. Think before building.
- `/imprint` — after any new UI component. Capture patterns.
- `/review` — before demo or when something feels off.
- `/recover` — when something breaks after one failed correction.
- `/remember save` — when a feature spans multiple sessions.
- `/remember restore` — when returning after a multi-session feature.
