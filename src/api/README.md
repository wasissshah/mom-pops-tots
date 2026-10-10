# src/api — one file per endpoint

| File | Endpoint | Used by |
|---|---|---|
| `client.ts` | shared `apiGet()` (calls `/mpt-api`, token is added server-side) | all files below |
| `home.ts` | GET /api/v1/home | Hero |
| `cities.ts` | GET /api/v1/cities | SiteHeader |
| `languages.ts` | GET /api/v1/languages | SiteHeader |

To add an API: create `src/api/<name>.ts`, import `apiGet` from `./client`, export a typed `getXxx()` function.
Server proxy (adds the Bearer token): `src/app/mpt-api/[...path]/route.ts`. Secrets: `.env.local`.