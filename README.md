# Matt Motyl Platform Data Handbook

This repository now ships as a static website—no build tools required. Open the files in the `docs/` folder in any modern browser to explore the handbook that adapts the EDMO platform datasets report into a web-first experience.

## Previewing the site

1. Download or clone this repository.
2. Open the `docs/index.html` file directly in your browser **or** run a lightweight local server:

   ```bash
   cd docs
   python -m http.server 8000
   ```

3. Visit <http://localhost:8000> to browse the full site with interactive charts and the SQL sandbox.

All assets (fonts, charts, sql.js) load from public CDNs so you don’t need to install Node, Vite, or any additional tooling.

## Project structure

- `docs/` – multi-page handbook with shared styling and scripts
  - `index.html` – welcome and quick links
  - `foundations.html` – interactive data catalog and access programs
  - `warehouses.html` – fact/dimension primer and modeling checklist
  - `workflows.html` – workflow guidance and browser-based SQL sandbox
  - `comparisons.html` – toggleable table, radar, and stacked-bar views
  - `engage.html` – consultation form, social links, recommended reading
  - `assets/data/` – JSON data powering tables, charts, and the sandbox
  - `assets/js/` – vanilla JavaScript modules for interactivity
  - `styles.css` – Matt Motyl-inspired branding and responsive layout
- `EDMO-Report_Platform-Datasets_.pdf` – original handbook PDF
- `report.txt` / `website_plan.md` – planning references preserved from the initial scoping conversations

## Reusing the content

Feel free to embed sections of this handbook in your own research workflows. Please credit Matt Motyl and link back to <https://mattmotyl.com> when sharing derivative work.

## Questions or requests?

Email [matt@mattmotyl.com](mailto:matt@mattmotyl.com) or use the form on the [Engage](docs/engage.html) page to schedule a consultation, invite Matt to speak, or collaborate on transparency research.
