# WeckWert

Multi-page website for **Weckwert Commercial, Inc.** (Thomasville, Georgia), built as a blueprint for a
later move to **WordPress + Elementor Pro** (the platform the current site runs on).

- **Pages & content:** from the existing site, weckwert-commercial.com — Home, Residential (6 projects),
  Commercial (9 projects), About, Contact.
- **Theme & design:** from the reference allerbest-build-legacy.lovable.app — forest green + gold on ivory,
  Libre Baskerville + Manrope, square corners.

## Run it

```bash
npm install
npm run dev          # http://localhost:5177
npm run build        # type-check + production build into dist/
npm run build:wp-css # export all styles to wordpress/weckwert.css for Elementor
```

## Structure

```
src/
  content/        all copy & data — site.ts (pages), projects.ts (15 projects), team.ts (6 bios)
  components/
    elementor/    Section = Elementor container (tones: light / sand / green / forest / charcoal)
    widgets/      Heading, Button, FeatureGrid (Icon Box grid), Counter, Gallery, Lightbox, Accordion
    layout/       Header (top bar + sticky nav + mobile menu), Footer, ScrollManager
  sections/       reusable blocks = Elementor saved templates (heroes, stats, project grid, tabs, form…)
  pages/          Home, Residential, Commercial, ProjectDetail (one template for all projects), About, Contact, 404
  styles/         tokens.css (Global Colors / Fonts) → base → layout → widgets → sections
public/           brand assets, optimized project photos, team portraits, PDFs
docs/
  ELEMENTOR-MAPPING.md   step-by-step WordPress / Elementor build guide
  CONTENT-NOTES.md       open questions for the client + where each number comes from
wordpress/weckwert.css   generated stylesheet for Elementor Custom CSS
```

URLs match the planned WordPress permalinks: `/residential/`, `/commercial/`, `/projects/<slug>/`,
`/about/`, `/contact/`.

The contact form validates and shows a thank-you message but does not send email — in WordPress it is
replaced by an Elementor Pro Form (or WPForms) with the same fields.
