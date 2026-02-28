# Delingo

German language learning app — gamified drills for mastering articles (der/die/das) and grammatical cases.

## Tech Stack

- **Framework**: TanStack Start (React 19 + TanStack Router + Nitro + Vite)
- **UI**: Mantine 8 (dark mode forced), Tabler Icons
- **Auth**: Better Auth with OIDC/OAuth2 (Pocket ID)
- **Database**: MongoDB 7 (via native driver, not Mongoose)
- **Validation**: Zod 4
- **Language**: TypeScript 5.9 (strict mode, `noUncheckedIndexedAccess`)
- **Package Manager**: Yarn 4
- **Node**: 24+

## Commands

```bash
yarn dev              # Dev server on localhost:3000
yarn build            # Production build
yarn start            # Run production build
yarn dev:backend      # Start MongoDB via Docker Compose
yarn test             # Jest (currently no tests)
yarn lint             # Run all linting (typecheck + eslint + prettier)
yarn lint:typecheck   # TypeScript type checking
yarn lint:eslint      # ESLint
yarn lint:formatting  # Prettier check
yarn storybook        # Storybook on localhost:6006
```

## Project Structure

```
src/
  routes/
    (frontend)/         # Public-facing routes (the learning app)
    (admin)/            # Admin routes behind auth
      _layout/
        _protected/     # Requires authentication
    api/auth/$.ts       # Auth API handler
  components/           # React components
  helpers/
    problems/           # Problem generation (AbstractProblem, NominalProblem)
    env.mjs             # Type-safe env vars (t3-oss/env-core)
    *.json              # Data files (nouns, artikels, pronouns)
    *Schema.ts          # Zod schemas for data files
    db.ts               # MongoDB connection
    authClient.ts       # Better Auth client
    authMiddleware.ts   # Route auth middleware
auth.ts                 # Better Auth server config (root)
vite.config.ts          # Vite + Nitro + TanStack Start + React plugins
```

## Code Conventions

- **Environment variables**: Always use `src/helpers/env.mjs` — never access `process.env` directly (enforced by ESLint rule).
- **Routing**: File-based routing via TanStack Router. Route groups use parentheses: `(frontend)`, `(admin)`. Protected routes nest under `_protected`.
- **Imports**: Prettier auto-sorts imports — non-CSS imports first, then CSS imports.
- **CSS**: CSS Modules for component styles (`.module.css`). PostCSS with CSS nesting enabled. Prettier sorts CSS declarations.
- **Data schemas**: JSON data files in `src/helpers/` have matching Zod schemas (`nounSchema.ts`, `artikelSchema.ts`, etc.).
- **Problem system**: Abstract base class `AbstractProblem` with concrete implementations (e.g., `NominalProblem`, `SubjectVerbObjectProblem`). Each problem generates a `uuid`, `problem` (English prompt), and `solution` (German answer).
- **German capitalization in solutions**: German nouns are always capitalized. In full sentences (e.g., `SubjectVerbObjectProblem`), the first word is also capitalized (sentence case). In noun phrases (e.g., `NominalProblem`), the article stays lowercase — only the noun is capitalized.

## Formatting

All changed files should be formatted with `yarn prettier --write`.
