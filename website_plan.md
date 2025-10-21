# Website Conversion Plan: Platform Datasets Handbook

## Audience & Voice
- Primary audience expands beyond vetted researchers to include investigators, journalists, policymakers, civil society practitioners, and any motivated analysts exploring social media or search platform data.
- Tone should be invitational, emphasizing accessibility and pathways for newcomers while still supporting advanced methodological depth.

## Information Architecture
- Multi-page structure modeled after handbooks like *R for Data Science*.
- Proposed top-level navigation:
  1. **Welcome & Overview**
  2. **Platform Data Foundations** (what platforms collect)
  3. **Working With Platform Warehouses** (fact/dim tables, storage concepts)
  4. **Applied Research Workflows** (examples, case studies)
  5. **Comparing API vs Internal Data**
  6. **Call to Action & Further Resources**
- Each chapter page will include intra-page anchor navigation for subsections, breadcrumbs, and a persistent sidebar for quick switching between chapters.

## Data Tables & Supplementary Assets
- Transform spreadsheet content from the shared Google Drive folder into responsive, searchable, and sortable web-native tables.
- Provide CSV/Excel download options for each major table.
- Integrate filters that allow readers to toggle by platform, data category, and availability.
- Highlight provenance for each table (e.g., "Source: EDMO Supplementary Dataset – updated YYYY-MM-DD").

## Interactive Learning Components
- Present SQL snippets as annotated code blocks that explain the purpose of each clause and key variables.
- Develop an interactive SQL sandbox with synthetic (or approved public) datasets mirroring examples from the handbook.
  - Readers should be able to run provided queries, tweak parameters, and view results inline.
  - Include a guided walkthrough and reset capability.
- Add diagrams that visually depict relationships between fact and dimension tables, leveraging callouts to link diagram elements to corresponding code blocks.

## Visualization Strategy for Comparative Tables
- Break large comparison tables into thematically grouped modules (e.g., Structural Indicator coverage, Enforcement Metrics, Audience Insights).
- Provide toggleable views:
  - Compact summary cards for quick scanning.
  - Detailed tables with sorting and filters.
  - Optional chart views (stacked bar or heatmap) to emphasize coverage gaps and strengths.
- Iterate on visualization approach once prototypes are available to converge on the clearest presentation.

## Calls to Action & Engagement
- Feature a dedicated CTA page encouraging readers to:
  - Request tailored consultations or workshops via embedded contact form.
  - Connect through mattmotyl.com and the Duco SME profile.
  - Subscribe to the YouTube channel and Substack newsletter.
  - Explore recommended readings (e.g., Tech Policy Press transparency article) and EDMO resources.
- Offer contextual micro-CTAs throughout the site (e.g., "Ready to dive deeper? Book a session" at the end of key tutorials).

## Branding & Visual System
- Use Matt Motyl’s personal brand as the visual foundation (color palette, typography, iconography) inspired by mattmotyl.com.
- Incorporate consistent logo/wordmark placement, accent colors for interactive components, and accessible contrast ratios.
- Ensure all components are responsive and adhere to WCAG AA accessibility guidelines.

## Open Items / Next Steps
- Gather brand style specifics (hex codes, font families, logo assets) for implementation.
- Inventory datasets from the Google Drive folder and map them to planned table components.
- Evaluate technical options for hosting the SQL sandbox (client-side WebAssembly database, serverless API, or embedded third-party tool).
- Define analytics/telemetry requirements (e.g., tracking CTA conversions, sandbox engagement).
