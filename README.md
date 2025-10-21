# Platform Data Primer

This repository contains the React + Vite implementation of the Platform Data Primer—an expanded, web-native adaptation of Matt Motyl’s handbook on working with Article 40 transparency datasets. The app mirrors the full text of the report, adds interactive tooling, and keeps navigation consistent with the PDF’s chapters.

## Getting started

1. Install dependencies:
   ```bash
   cd app
   npm install
   ```
2. Launch the development server:
   ```bash
   npm run dev
   ```
   Vite will print a local URL (usually <http://localhost:5173/>) where you can preview the handbook with hot reloading.
3. Build a static export (optional):
   ```bash
   npm run build
   ```
   The compiled assets land in `app/dist/` and can be deployed to any static host.

## Project structure

- `app/` – Vite + React TypeScript application
  - `src/components/` – shared layout, navigation, and helpers
  - `src/pages/` – chapter-level views that load the original report text
  - `src/content/` – HTML fragments extracted from the published report
  - `src/data/` – JSON datasets driving the catalog, charts, and SQL sandboxes
  - `src/features/` – vanilla DOM utilities powering tables, charts, and the SQL engine
- `EDMO-Report_Platform-Datasets_.pdf` – source PDF for reference
- `website_plan.md` / `report.txt` – historical planning notes from the original conversion effort

## Questions or requests?

Reach out to [matt@mattmotyl.com](mailto:matt@mattmotyl.com), connect via [mattmotyl.com](https://mattmotyl.com), or explore the contact links on the Engage page to schedule a consultation, invite Matt to speak, or collaborate on transparency research.
