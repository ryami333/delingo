# Delingo

German language learning app — gamified drills for mastering articles (der/die/das) and grammatical cases.

## Tech Stack

- **Framework**: TanStack Start (React 19 + TanStack Router + Nitro + Vite)
- **UI**: Mantine 8 (dark mode forced), Tabler Icons
- **Validation**: Zod 4
- **Language**: TypeScript 5.9 (strict mode, `noUncheckedIndexedAccess`)
- **Package Manager**: Yarn 4
- **Node**: 24+

## Commands

```bash
yarn dev              # Dev server on localhost:3000
yarn build            # Production build
yarn start            # Run production build
yarn test             # Vitest
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
    __root.tsx          # Root layout (MantineProvider, Notifications)
    (frontend)/         # Public-facing routes (the learning app)
  components/           # React components
  helpers/
    problems/           # Problem generation (AbstractProblem, NominalProblem, SubjectVerbObjectProblem)
    *.json              # Data files (nouns, artikels, pronouns, verbs)
    *Schema.ts          # Zod schemas for data files
vite.config.ts          # Vite + Nitro + TanStack Start + React plugins
```

## Code Conventions

- **Routing**: File-based routing via TanStack Router. Route groups use parentheses: `(frontend)`. SSR is disabled (`ssr: false` on the root route).
- **Imports**: Prettier auto-sorts imports — non-CSS imports first, then CSS imports.
- **CSS**: CSS Modules for component styles (`.module.css`). PostCSS with CSS nesting enabled. Prettier sorts CSS declarations.
- **Data schemas**: JSON data files in `src/helpers/` have matching Zod schemas (`nounSchema.ts`, `artikelSchema.ts`, etc.).
- **Artikel data design**: The English translation is the "pivot" — if a German word covers multiple distinct English meanings (e.g. `sein` → "his" / "its", `ihr` → "her" / "their"), they are stored as separate rows with distinct `english` values rather than combined into one entry. The `disambiguators` field (`"singular" | "plural" | "formal" | "informal"`) is used only where the English word itself is ambiguous across multiple German words (e.g. "your" → `dein`, `euer`, `Ihr`).
- **Disambiguator order**: Within a `disambiguators` array, list formality (`formal` / `informal`) before plurality (`singular` / `plural`) — e.g. `["informal", "plural"]`, never `["plural", "informal"]`. This order is the canonical authoring order in the JSON data files; the array is rendered verbatim (no sorting at runtime), so the hints (e.g. "(informal, plural)") read consistently.
- **Problem system**: Abstract base class `AbstractProblem` with concrete implementations (e.g., `NominalProblem`, `SubjectVerbObjectProblem`). Each problem generates a `uuid`, `problemParts` (a tuple of `[englishWord, sourceObject]` pairs), and `solution` (the German answer string). The `ProblemPart<T>` type is exported from `AbstractProblem`.
- **German capitalization in solutions**: German nouns are always capitalized in the data files. In full sentences (e.g., `SubjectVerbObjectProblem`), the first word is also capitalized (sentence case). In noun phrases (e.g., `NominalProblem`), the article stays lowercase — only the noun is capitalized.

## Formatting

All changed files should be formatted with `yarn prettier --write`.
