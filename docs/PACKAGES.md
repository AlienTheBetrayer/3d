# Package Philosophy

All our packages and their brief descriptions.

## Apps

Our main apps and their stack.

- `@repo/api` (`apps/api`) - Backend. (Nest.js + Drizzle ORM)
- `@repo/web` (`apps/web`) - Frontend. (Next.js, Redux, Three.js, GLSL)

## Shared packages

Packages that are used in our apps above.

- `@repo/db` (`packages/db`) - Drizzle ORM schemas, enums and types. (PostgreSQL database)
- `@repo/lib` (`packages/lib`) - Utility functions, classes, helpers.
- `@repo/contracts` (`packages/contracts`) - DTOs for both API (Nest.js) and Web (Redux) applications. Also used in Web forms.
- `@repo/config` (`packages/config`) - Shared configuration for all packages. Includes password/code lengths, token expiry dates and other utility stuff.

## Config packages

Configuration packages used solely for plugins, extensions and their configurations

- `@repo/oxlint-config` (`packages/oxlint-config`) - Oxlint configuration file. (Linter)
- `@repo/prettier-config` (`packages/prettier-config`) - Prettier configuration file. (Formatting)
- `@repo/typescript-config` (`packages/typescript-config`) - TypeScript configuration file. 