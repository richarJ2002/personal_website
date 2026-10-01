# AGENTS.md

Personal website repo (directory: `personal_website`).

## Current state

- Git repository on branch `main`, with existing history.
- Static HTML/CSS/JS website — no build system, no frameworks, no package managers.
- GitHub Pages serves files directly from the repository root.
- Portfolio for Jason Wakim Richards: robotics research, aerospace/GNC
  experience, and three simulator case studies. Content is grounded in authored
  CVs and read-only project inspection, not the original placeholder scaffold.
- Development records, scripts, screenshots, and handoffs belong in `.agents/`.
  Start with `.agents/handoff.md` for the latest verified state and limitations.

## Architecture

- **HTML**: Plain semantic HTML5 — one file per page in the root directory
- **CSS**: Single `css/style.css` with CSS custom properties for theming
- **JavaScript**: `js/theme.js` for pre-render theme, year, and CV print controls;
  deferred `js/navigation.js` for grouped/mobile nav and `js/evidence.js` for
  progressive native-dialog image previews. Vanilla JS, no dependencies.
- **Evidence**: Curated original-colour photographs and three certificate scans;
  local responsive JPEG previews and owner-approved paper PDFs.
- **Illustrations**: Small inline SVG schematics; local SVG favicon. No icon library.
- **Fonts**: Inter (sans-serif) and JetBrains Mono (monospace) via Google Fonts CDN

## Directory structure

```
personal_website/
├── index.html              # Home page
├── about.html
├── research.html
├── publications.html
├── projects.html
├── experience.html
├── education.html
├── cv.html
├── contact.html
├── css/
│   └── style.css           # All styles with CSS custom properties
├── js/
│   └── theme.js            # Theme, footer year, optional CV print action
│       navigation.js       # Native disclosures + progressive mobile menu
│       evidence.js         # Native image dialog + original-file fallbacks
├── assets/
│   └── images/
│       └── favicon.svg
├── .agents/                # Development records and verification artifacts only
└── AGENTS.md
```

## Conventions

### Code style

- Prefer simple, explicit code over clever or condensed code.
- Keep HTML semantic and well structured.
- Use clear and descriptive class, ID, file, and variable names.
- Keep CSS organized into logical sections with clear comments.
- Use CSS variables for shared values (colours, spacing, typography, layout).
- Keep JavaScript small and straightforward.
- Avoid unnecessary abstractions and deeply nested structures.
- Avoid duplicated code where a simple reusable approach makes sense.
- Keep individual files focused on a clear purpose.

### Comments

- Add comments to explain non-obvious design decisions and behaviour.
- Comment sections of the HTML/CSS/JavaScript where the purpose may not be immediately obvious.
- Explain why something is implemented a particular way when there is a meaningful reason.
- Do not add comments that merely restate what the code obviously does.
- Prefer useful explanatory comments over large blocks of documentation.
- Keep comments concise and accurate.

### Placeholder content (TODO convention)

- Every missing piece of personal/content information must have a TODO.
- TODOs must be easy to find using a recursive text search such as: `grep -R "TODO" .`
- Make TODOs specific about what needs to be added or replaced.
- Do not use vague comments such as `<!-- TODO -->`.
- Prefer comments such as:
  - `<!-- TODO: Replace with final biography -->`
  - `<!-- TODO: Add publication DOI -->`
  - `<!-- TODO: Add project GitHub repository link -->`
  - `<!-- TODO: Add date of workshop -->`
- Keep placeholder text clearly identifiable as placeholder content.
- Do not make placeholder content look like real personal information.
- Do not invent realistic names, publications, dates, employers, achievements, links, or other facts merely to make the website look complete.
- If a section has no information yet, create the structure and leave a clearly marked TODO rather than inventing content.
- Keep TODOs in the actual source files rather than creating a separate TODO list that can become out of sync with the website.

### Design system

- Monochrome interface: black, white, and greys; no coloured accents, gradients,
  or glowing effects. Photographs/certificates keep their original colours.
- Light and dark mode supported via CSS custom properties.
- Theme defaults to system preference on first visit, with toggle to switch.
- Theme choice persisted in `localStorage`.
- Typography: Inter for body/headings, JetBrains Mono for technical labels/dates/metadata.
- Navigation: boxed links with dark grey (inactive), lighter grey (active), inverted (hover).
- No external UI libraries beyond Bootstrap Icons (CDN).

### Maintenance and content boundaries

- Keep the runtime stack simple. Do not add a framework, package manager,
  generated-page pipeline, deployment workflow, analytics, or contact backend
  without explicit approval. Bootstrap Icons are permitted but not currently used.
- Keep every internal page/asset URL relative: `projects.html`, `css/style.css`,
  and `assets/images/favicon.svg`, not root-absolute paths. GitHub Pages hosts
  this as a project site under `/personal_website/`.
- Header/footer HTML is intentionally explicit in all nine pages plus 404 so
  navigation and content work without JavaScript. When changing shared chrome,
  apply the change consistently across every page; do not inject it at runtime.
- Main nav: Home, Projects, Research (Research overview, Publications), Background
  (About, Experience, Education), CV, Contact. Groups use native details/summary,
  not application-menu roles or hover-only controls. Every page has a top route.
  The navbar has no name/monogram block; identity remains in page content/footer.
  Set one `aria-current="page"` on its actual top link (none on 404); a separate
  group class highlights secondary pages. Retain footer shortcuts without a
  duplicate current-page marker. Sticky desktop only; compact menu is progressive.
- `theme.js` runs in `<head>` without `defer`: stored theme setup runs before
  rendering, while DOM controls bind on `DOMContentLoaded`. Without JavaScript,
  CSS follows the system theme and hides non-functional controls.
  Keep navigation/viewer scripts deferred and independent of theme setup.
- Use `hidden` plus `data-print` on the CV print button. Preserve the `.print-only`
  identity block and verify print styles with explicit and system-dark themes.
- Do not copy private CVs or job applications into this public repository.
  Publish professional summaries, not phone numbers, home addresses, references,
  private issue trackers, source-machine paths, or raw application documents.
- Source project directories are read-only. Their existing tests, local edits,
  and build outputs are not evidence of a successful build in this repository.
- Keep purpose, personal contribution, implemented scope, and future plans
  distinct. Do not invent authorship, accuracy, flight readiness, certifications,
  publication records, degrees, supervisors, or completion dates.
- Schematics are illustrations, not measured/simulated results. Preserve their
  accessible titles/descriptions and captions when editing them.
- `cv.html` is the public CV. Print/save PDF via the browser; no private PDF
  download or missing-file link is needed.
- Evidence thumbnails remain ordinary relative image links when JS/dialogs are
  unavailable. Native dialog must preserve modifier clicks, original-file access,
  Escape/Close/focus return, loading errors, repeated opens, and print cleanup.
  PDFs stay ordinary links. Do not add a gallery library or embedded PDF renderer.
- Use intrinsic image dimensions and existing local JPEG variants where useful;
  no upscaled/redundant derivatives. Originals and omitted duplicate photos stay
  intact unless removal is approved. New previews must not contain location EXIF.
- Use normal hyphen dashes in authored website text. JamSail title stays unchanged
  with the visible dissertation/unpublished footnote. NBS was built to simulate
  and test JamSail ADCS: EKF fusion of sun/magnetometer/IMU, owner's IGRF and sun-
  sensing implementation. TRIAD was studied but rejected for noise sensitivity.
  Rover schematic labels are NavCams and LocCams; LocCams supply stereo VO.
  The JamSail illustration depicts a 3U CubeSat, not an exact spacecraft CAD model.
- Known inherited deployment blocker: private application documents are tracked
  in the assets tree. Do not open/delete/publish them without owner discussion;
  hiding links is not access control. Nested-path 404 handling remains a separate
  pre-existing limitation; direct 404 tests do not prove deployed fallback behavior.

### Agent artifacts and verification

- All agent-created plans, evidence notes, diagnostic scripts, logs, screenshots,
  and reports must live under `.agents/`; update this file for lasting conventions.
  Only actual runtime website assets belong outside that directory.
- These records can be committed or served publicly. Sanitize them too: never
  include raw private source documents, credentials, phone/reference details,
  or private job-application material. Do not add `.nojekyll` just to expose
  development records. The website must not link to or depend on `.agents/`.
- There is no existing build/lint/test toolchain to run. Focused checks:

  ```sh
  node --check js/theme.js
  node --check js/navigation.js
  node --check js/evidence.js
  node .agents/check-site.mjs
  git diff --check
  ```

- Basic preview from the repository root: `python3 -m http.server 8765 --bind
  127.0.0.1`. For the GitHub project prefix, `node .agents/serve.mjs 8766` serves
  `http://127.0.0.1:8766/personal_website/`. Both are local development tools,
  not deployment infrastructure.
  Restart a running preview when its server code changes. Verify image/PDF
  responses on the user's actual preview port; a healthy alternate port does
  not fix an older server that is still rejecting those file types.
- `.agents/browser-check.mjs` can use an **existing** Playwright MCP installation
  and Brave executable to run isolated headless browser checks. See
  `.agents/verification.md` for the invocation and findings. Do not install
  production dependencies or stop a user's normal Brave session to make it run.
- Inspect screenshots as well as checks. The narrow static checker and sampled
  contrast checks are not a formal HTML validator or accessibility certification.
- Never claim a command passed unless it actually ran. Record blocked/unrun
  checks in the handoff. No commits, pushes, or deployment unless specifically
  requested by the user.

### GitHub Pages deployment

- No build step — GitHub Pages serves files directly from the repository root.
- Source: `main` branch, `/ (root)` folder.
- No `_config.yml` or GitHub Actions needed for basic deployment.
- Custom domain: add `CNAME` file later if needed.
