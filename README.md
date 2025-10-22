# Platform Data Primer

This repository contains the React + Vite implementation of the Platform Data Primer—an expanded, web-native adaptation of Matt Motyl’s handbook on working with Article 40 transparency datasets. The app mirrors the full text of the report, adds interactive tooling, and keeps navigation consistent with the PDF’s chapters.

## Viewing the repository on GitHub

If you simply want to read through the project without running any code:

1. Visit <https://github.com/mattmotyl/homepage> in your browser.
2. Click the green **Code** button and choose **Download ZIP** to grab all files, or
   browse them directly in the web interface by clicking folders such as `app/` → `src/`.
3. To open a specific chapter, navigate to `app/src/content/` and click the corresponding
   `.html` file. GitHub will show the rendered markup for that chapter.
4. For interactive tables and sandboxes, open the React page components under
   `app/src/pages/` to see how each view is assembled.

When you’re ready to explore the live site locally, you can either follow the no-terminal walkthrough below or stick with the traditional command-line steps that follow.

## Preview the site without using a terminal (Visual Studio Code)

The instructions below keep you entirely inside graphical tools—no Bash, Git, PowerShell, or command prompt required.

1. **Install the prerequisites (one time only).**
   - Download and install [Node.js LTS](https://nodejs.org/)—this also installs the `npm` tool the project relies on.
   - Download and install [Visual Studio Code](https://code.visualstudio.com/Download).
2. **Download the project.**
   - Visit <https://github.com/mattmotyl/homepage> in your browser.
   - Click the green **Code** button and choose **Download ZIP**.
   - After the download finishes, open the ZIP file and drag the enclosed `homepage` folder to an easy-to-find location (e.g., Desktop or Documents).
3. **Open the project in Visual Studio Code.**
   - Launch Visual Studio Code.
   - Choose **File → Open Folder…** (Windows) or **File → Open…** (macOS) and select the `homepage/app` folder you just extracted. Opening the `app` folder is important because it contains the project’s `package.json` file.
4. **Install the project’s packages without typing commands.**
   - In VS Code’s sidebar, click the **NPM SCRIPTS** tab (you may need to expand the Explorer section to see it).
   - Under “NPM SCRIPTS,” hover over the script named **install** and click the ▶️ run icon. VS Code will run `npm install` for you in an integrated panel—just wait for the status to show **Process exited with code 0**.
5. **Start the live preview server.**
   - Still inside the **NPM SCRIPTS** panel, click the ▶️ icon next to **dev**.
   - After a few seconds, VS Code will display a message in the lower-right corner offering to **Open in Browser** (the server runs at <http://localhost:5173/>). Click that button, or open the “PORTS” panel and click the globe icon next to port 5173.
6. **Browse the handbook.**
   - Your default browser will open the Platform Data Primer. Navigate through the sidebar or page links exactly as visitors would on a deployed site.
   - Leave the VS Code window open while you review; when you’re done, return to VS Code and click the trash-can icon next to the **dev** script in the TERMINAL panel to stop the server.

You can repeat steps 5 and 6 any time you want to revisit the site—the dependencies remain installed unless you delete the `app/node_modules` folder.

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
