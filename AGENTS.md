<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repo shape

- Single Next.js 16 App Router app (`npm` — `package-lock.json`; don't use yarn/pnpm/bun commands). Not a monorepo.
- Entrypoints: `app/layout.tsx`, `app/page.tsx`. Supporting code in `components/ui/`, `hooks/`, `lib/`.
- Path alias `@/*` maps to the repo root (e.g. `@/lib/utils`, `@/components/ui/...`).

## Commands

- Dev: `npm run dev` (Turbopack; regenerates the block above — see note)
- Build: `npm run build`
- Lint: `npm run lint` — this runs plain `eslint` against the flat config in `eslint.config.mjs`. `next lint` does not exist in Next 16; don't use it.
- Typecheck: no script exists — run `npx tsc --noEmit`.
- Tests: none exist and there is no test runner. Don't add `npm test` expectations.
- Verify before finishing: `npm run lint` then `npx tsc --noEmit` (there is no combined check).

## Toolchain quirks

- Next 16.4.4 with `cacheComponents: true` and `partialPrefetching: true` in `next.config.ts` — caching/Suspense semantics differ from classic `dynamic = "force-dynamic"` recipes; check `node_modules/next/dist/docs/01-app/` for the current pattern. `experimental.agentFeedback: true` is also set.
- Tailwind CSS v4: no `tailwind.config.*`. Styling lives in `app/globals.css`, loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`. Don't add a Tailwind config file or PostCSS config.
- shadcn/ui is scaffolded with `components.json` style `base-nova` and `rsc: true`. Components in `components/ui/` are built on **Base UI** (`@base-ui/react`), not Radix — don't copy Radix-based shadcn examples. `cn` comes from the `cn` npm package, re-exported by `@/lib/utils`. Add components with `npx shadcn add <name>` (`shadcn` is a local dependency).

## Conventions

- `eslint.config.mjs` ignores are overridden there — add new ignore paths to its `globalIgnores([...])`, not `.eslintignore`.
- `.env*` is gitignored; the project currently has no env files or backend — it is a client-only assignment repo.
