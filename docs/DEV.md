# Dev environment

Apps run natively via `pnpm dev` / `turbo dev`. Docker runs the infra: Postgres + SeaweedFS (S3-compatible storage)

## Prerequisites

- Node `>=24`
- `pnpm@11.25.0` (see root `package.json`)
- Docker, Docker Compose (if using local dev infra, which is recommended)

## Install Dependencies

```sh
pnpm install
```

## Start infra

```sh
docker compose -f compose.dev.yml up -d
```

Development compose includes these containers:

- **postgres** - Local PG instance for development. `postgres:17`
    - **POSTGRES_DEV_USER** - defaults to `fluxbound`
    - **POSTGRES_DEV_PASSWORD** - defaults to `dev-data`
    - **POSTGRES_DEV_DB** - defaults to `fluxbound-dev`
    - **POSTGRES_DEV_PORT** - host port, defaults to `5434`
- **storage** - S3-compatible storage. SeaweedFS in `mini` mode
    - **S3_DEV_PORT** - S3 API, defaults to `8334`
    - **S3_DEV_UI_PORT** - File Explorer UI, defaults to `8889`
    - **S3_DEV_ADMIN_PORT** - Admin UI, defaults to `23647`

All of the above are optional overrides - copy the root [`.env.example`](../.env.example) to `.env` to set any of them.
Defaults are picked to not collide with other local docker projects, so you don't need this file unless something's
already bound to one of those ports

Stop with `docker compose -f compose.dev.yml down`. Data lives in `./dev/postgres/data` and `./dev/storage/data` (bind
mounts, gitignored) and survives `down` - delete those folders to reset from scratch

## Environment

Copy the `.env.example` next to each of these and fill in the DB URL - values already match `compose.dev.yml`'s defaults
out of the box:

- `apps/api/.env` - see [DB.md](./DB.md) for what each var does
- `packages/db/.env` - only needed for running `db:*` scripts without `@repo/api`

Storage credentials default the same way Postgres's do - override via root `.env` if you want, otherwise these just
work:

- **S3_DEV_ACCESS_KEY** - defaults to `dev-access-key`
- **S3_DEV_SECRET_KEY** - defaults to `dev-secret-key`
- **S3_DEV_BUCKET** - defaults to `fluxbound-dev`, auto-created on container start via `-bucket`

Two different URLs when you wire up a client:

- **Endpoint** - `http://localhost:<S3_DEV_PORT>`. What an S3 SDK connects to and signs requests against. No bucket in
  the path - the SDK adds that itself
- **Host** - `http://localhost:<S3_DEV_PORT>/<S3_DEV_BUCKET>`. Endpoint + bucket, for building a public URL to a stored
  file (e.g. `${HOST}/some-key.jpg` in an `<img src>`). SeaweedFS serves bucket contents directly under
  `/<bucket>/<key>`, so this is just the endpoint with the bucket appended

## Database

With infra up and `apps/api/.env` (or `packages/db/.env`) in place, apply the schema - see [DB.md](./DB.md) for the full
workflow:

```sh
pnpm db:push
```

## Run the apps

```sh
pnpm dev
```

Runs lint + tests then `turbo dev` for everything - `web` on `:3000`, `api` on `:3001`. Use `turbo dev --filter=web` (or
`--filter=@repo/api`) to run just one

## Gotchas

- The storage container's entrypoint (`dev/storage/entrypoint.sh`) renders `dev/storage/config.json.template` into
  `/config/s3.json` at startup using the `S3_DEV_*` env vars, then hands off to `weed` - it overrides the image's
  default entrypoint, so if SeaweedFS ever needs its own permission-fixing/privilege-drop logic again, that's gone and
  needs re-adding by hand
