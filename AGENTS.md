# AGENTS.md

Personal website repo (directory: `personal_website`).

## Current state

- Fresh git repo on branch `main` with **no commits yet**.
- Static HTML/CSS/JS website — no build system, no frameworks, no package managers.
- GitHub Pages serves files directly from the repository root.

## Architecture

- **HTML**: Plain semantic HTML5 — one file per page in the root directory
- **CSS**: Single `css/style.css` with CSS custom properties for theming
- **JavaScript**: Single `js/theme.js` for theme toggle + persistence (vanilla JS)
- **Icons**: Bootstrap Icons via CDN (`bootstrap-icons` CSS file)
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
│   └── theme.js            # Theme toggle + localStorage persistence
├── assets/
│   ├── images/             # For future images
│   └── documents/          # For future PDFs (CV, papers)
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

- Monochrome palette only: black, white, and greys — no coloured accents, gradients, glowing effects.
- Light and dark mode supported via CSS custom properties.
- Theme defaults to system preference on first visit, with toggle to switch.
- Theme choice persisted in `localStorage`.
- Typography: Inter for body/headings, JetBrains Mono for technical labels/dates/metadata.
- Navigation: boxed links with dark grey (inactive), lighter grey (active), inverted (hover).
- No external UI libraries beyond Bootstrap Icons (CDN).

### GitHub Pages deployment

- No build step — GitHub Pages serves files directly from the repository root.
- Source: `main` branch, `/ (root)` folder.
- No `_config.yml` or GitHub Actions needed for basic deployment.
- Custom domain: add `CNAME` file later if needed.
