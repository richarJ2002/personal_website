# Jason Wakim Richards - Personal Website

Personal portfolio website for Jason Wakim Richards: aerospace engineering,
robotics, and guidance, navigation and control (GNC). Research, projects,
experience, education, publications, CV, and contact pages.

Live site: https://richarJ2002.github.io/personal_website/

## Structure

- `index.html`, `about.html`, `research.html`, `publications.html`,
  `projects.html`, `experience.html`, `education.html`, `cv.html`,
  `contact.html` - site pages (plus `404.html`)
- `css/style.css` - shared stylesheet (light/dark themes)
- `js/` - small vanilla scripts (theme, navigation, image viewer)
- `assets/` - photographs, certificates, paper PDFs, favicon

Static site only. No build step, framework, package manager, or backend.
GitHub Pages serves the repository root directly.

## Local preview

From the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open http://127.0.0.1:8765/ (root) or use the `/personal_website/` prefix
path matching the project-site URL when needed.

## License

All rights reserved. See `LICENSE`. No reuse without permission.
