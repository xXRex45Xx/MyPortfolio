# AGENTS.md

## Scope
- This file is for coding agents working in `/Users/esrom/js-apps/MyPortfolio`.
- The repo contains two apps: `backend/` (ASP.NET Core 8 Web API) and `frontend/` (React 18 + Vite 6).
- There is no existing `AGENTS.md` in the repo root; this file is the canonical agent guide.
- No Cursor rules were found in `.cursor/rules/`.
- No `.cursorrules` file was found.
- No Copilot instructions were found in `.github/copilot-instructions.md`.
- If new tool-specific rule files are added later, treat them as additive to this guide.

## Repository Layout
- `backend/Controllers/` contains API controllers.
- `backend/DTOs/` contains request/response DTOs grouped by feature.
- `backend/Models/` contains EF Core entities and `PContext`.
- `backend/Migrations/` contains EF Core migrations.
- `frontend/src/components/` contains reusable React components.
- `frontend/src/pages/` contains route-level page components.
- `frontend/src/utils/api/` contains fetch helpers for backend API calls.
- `frontend/src/assets/` contains SVG and image assets.

## Setup Commands
- Backend restore: `dotnet restore backend/backend.csproj`
- Backend build: `dotnet build backend/backend.csproj`
- Backend run: `dotnet run --project backend/backend.csproj`
- Backend apply migrations: `dotnet ef database update --project backend/backend.csproj`
- Frontend install: `npm install`
- Frontend dev server: `npm run dev`
- Frontend build: `npm run build`
- Frontend preview: `npm run preview`
- Frontend lint: `npm run lint`

## Recommended Working Directory
- Run backend `dotnet` commands from the repo root or `backend/`.
- Run frontend `npm` commands from `frontend/`.
- The root solution file is `backend.sln`.
- `dotnet sln list` currently shows only `backend/backend.csproj`.

## Test Status
- There is currently no automated test project in the .NET solution.
- There is currently no frontend unit test runner configured in `frontend/package.json`.
- There are no `*.test.*` or `*.spec.*` files in the repo.
- Do not claim tests passed unless you actually add and run them.

## Single-Test Guidance
- Backend single-test command, once a test project exists: `dotnet test --filter "FullyQualifiedName~TestName"`
- Backend single-class command, once tests exist: `dotnet test --filter "FullyQualifiedName~Namespace.ClassName"`
- Frontend single-test guidance is not available yet because Vitest/Jest is not configured.
- If you add Vitest later, a likely single-file command would be `npx vitest run path/to/file.test.jsx`.
- If you add Jest later, a likely single-file command would be `npx jest path/to/file.test.jsx`.

## Verification Commands Agents Should Prefer
- For backend-only changes: `dotnet build backend/backend.csproj`
- For frontend-only changes: `npm run lint` and `npm run build`
- For full-stack changes: run backend build plus frontend lint/build.
- If you touch database models, also consider `dotnet ef migrations add <Name>` only when explicitly requested.
- Avoid generating migrations casually; the repo already tracks EF Core migrations.

## Backend Stack Notes
- Target framework is `.NET 8` via `backend/backend.csproj`.
- Nullable reference types are enabled.
- Implicit usings are enabled.
- EF Core uses SQLite.
- Authentication uses JWT bearer tokens.
- Swagger is enabled in development.
- Production startup applies migrations automatically in `Program.cs`.

## Frontend Stack Notes
- Frontend uses React 18 with Vite.
- Routing uses `react-router-dom` with lazy route modules.
- Styling is a mix of `App.css` plus utility-heavy class strings in JSX.
- Tailwind Vite integration is present.
- SVGs are imported as React components using `vite-plugin-svgr`.
- `react-loader-spinner` and `react-responsive` are used in app code.

## Naming Conventions
- React component files use PascalCase names with a `.component.jsx` suffix.
- Route page files use lowercase names with a `.page.jsx` suffix.
- Frontend utility modules use kebab-case names with a `.util.js` suffix.
- React component identifiers are PascalCase.
- React hooks, loaders, and helper functions use camelCase.
- Context objects use PascalCase names, e.g. `DataContext`.
- Backend controllers end with `Controller`.
- Backend DTOs end with `DTO` and are grouped by feature directory.
- Backend entity/model classes use PascalCase singular nouns.
- Private controller fields use leading underscore names, e.g. `_context`, `_logger`.

## Imports and Module Structure
- In C#, keep `using` directives at the top and prefer framework/usings before local namespace usings.
- In React files, keep imports at the top; group them consistently when editing.
- Prefer this frontend grouping order for new code: external packages, local CSS, local components/pages, local utils, local assets.
- Use relative imports; there is no path alias configured.
- Match the existing export style in each file: default exports for components/pages, named exports for loaders/helpers.
- `eslint.config.js` uses ESM syntax without semicolons; do not reformat that file into a different style unless needed.

## Formatting Conventions
- Frontend JSX files currently use double quotes and semicolons.
- Frontend JSX indentation is 4 spaces in most files; preserve the surrounding file style when editing.
- Backend C# files use 4-space indentation and standard brace-on-new-line formatting.
- Keep lines reasonably readable; there is no formatter config enforcing width.
- Preserve existing file naming suffixes such as `.component.jsx`, `.page.jsx`, and `.util.js`.
- Avoid broad reformatting changes unrelated to the task.

## Types and Validation
- C# nullable reference types are enabled; do not introduce avoidable nullability warnings.
- Initialize non-nullable string properties with `string.Empty` when appropriate.
- DTOs commonly use data annotations like `[Required]`, `[Url]`, and `[MinLength]`.
- Prefer DTOs over binding EF entities directly from requests.
- In React, PropTypes are used for many reusable components; preserve or extend them when component props change.
- Frontend code is JavaScript, not TypeScript; do not introduce TS files unless the task requires a migration.

## API and Data Access Patterns
- Controllers typically return `IActionResult` and use async EF Core calls.
- Public read endpoints often use `[AllowAnonymous]`; write endpoints typically require `[Authorize(Roles = "Admin")]`.
- Keep route attributes consistent with existing patterns like `[Route("api/[controller]")]`.
- Use `await _context.SaveChangesAsync()` for persistence.
- When returning API errors, the common pattern is `new { message = "..." }`.
- `ProjectController.GetProjects()` maps entities to DTOs for list responses; preserve this distinction when extending list endpoints.

## Error Handling Expectations
- Backend controllers generally wrap actions in `try/catch`.
- On unexpected exceptions, controllers log via `_logger.LogError(ex, "An unexpected error occurred.")`.
- On unexpected backend failures, return HTTP 500 with a generic message payload.
- Use explicit `BadRequest`, `NotFound`, or `Unauthorized` responses for expected validation or auth failures.
- Frontend API utilities catch network/parsing failures, log with `console.error`, and throw an object containing `message` and `status`.
- Preserve the existing frontend thrown-shape contract unless you are intentionally standardizing all consumers.

## Comments and Documentation
- Backend code heavily uses XML doc comments on controllers, DTOs, and models.
- Maintain XML docs for new public C# classes and public controller actions.
- Frontend files sometimes include JSDoc-style block comments for components; keep them if you touch those files.
- Add comments only when they clarify non-obvious behavior.
- Do not add noisy comments for straightforward assignments or JSX markup.

## File and Asset Handling
- Uploaded backend files are written under `backend/wwwroot/`.
- Project images live under `backend/wwwroot/images`.
- Resume uploads live under `backend/wwwroot/uploads`.
- File upload endpoints validate content type and file size inline.
- When changing file upload behavior, preserve cleanup behavior for partially failed writes.

## Security and Configuration Notes
- Backend config expects `ConnectionStrings:DefaultConnection`, `Jwt:Key`, `Jwt:Issuer`, `Jwt:Audience`, and `ClientUrl`.
- `Program.cs` throws early if critical configuration values are missing.
- The seeded admin credentials in `PContext` are `admin` / `admin`; treat this as development-only behavior.
- Do not commit secrets or real credentials.
- Preserve JWT auth and CORS behavior unless the task explicitly changes security posture.

## Agent Do/Don't Guidance
- Do make the smallest change that matches current conventions.
- Do keep backend and frontend changes scoped to the feature being edited.
- Do verify with the relevant build/lint commands after code changes.
- Do mention clearly when testing is limited by missing test infrastructure.
- Don't add new dependencies just to satisfy style preferences.
- Don't rename files away from existing suffix conventions without a repo-wide reason.
- Don't rewrite working controllers/components solely for style consistency.
- Don't add a test command section that implies tests already exist when they do not.

## Quick Reference
- Backend build: `dotnet build backend/backend.csproj`
- Backend run: `dotnet run --project backend/backend.csproj`
- Backend single test later: `dotnet test --filter "FullyQualifiedName~TestName"`
- Frontend lint: `npm run lint`
- Frontend build: `npm run build`
- Frontend single test later: add a test runner first, then use its file-specific CLI.
