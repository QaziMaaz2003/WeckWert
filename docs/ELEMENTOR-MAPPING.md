# Moving the site to WordPress + Elementor

The live site (weckwert-commercial.com) already runs **WordPress + Astra + Elementor / Elementor Pro**.
This React build is a blueprint for that setup: every page is made of Elementor-style containers and
widgets, all copy lives in `src/content/`, and all styling is in `src/styles/` (exportable as one file).

---

## 1. Site Settings (do these first)

### Global Colors — Elementor → Site Settings → Global Colors

| Name | Hex | Used for |
|---|---|---|
| Primary (Green) | `#003f20` | Buttons on light, eyebrows, icons, CTA band, process panel |
| Primary Hover | `#00532b` | Green button hover |
| Forest | `#002a14` | Dark sections (Selected Work, panels), top bar |
| Charcoal | `#0f1611` | Headings, Leadership section, footer |
| Gold | `#bea06a` | Buttons on dark, eyebrows/icons on dark, badges |
| Gold Light | `#cbb07e` | Gold button hover |
| Gold Dark | `#9b7f4b` | Small numbers / labels on light backgrounds |
| Background | `#fcfaf6` | Page background (ivory) |
| Surface | `#f4f0e7` | Alternate sections (sand) |
| Border | `#d9d4ca` | Hairlines, card borders |
| Text | `#3c4640` | Body copy |
| Muted | `#525e56` | Secondary copy |

### Global Fonts — Elementor → Site Settings → Global Fonts

| Role | Font | Weight | Notes |
|---|---|---|---|
| Primary (headings) | Libre Baskerville | 400 | letter-spacing −0.015em, line-height 1.12 |
| Text | Manrope | 400 | 16px / 1.7 |
| Accent (eyebrows) | Manrope | 700 | 12px, UPPERCASE, letter-spacing 0.22em |
| Buttons | Manrope | 600 | 15px |

### Layout — Site Settings → Layout
- Content width **1280px**, container padding 40px (20px on mobile).
- Breakpoints: Elementor defaults (**tablet 1024px, mobile 767px**). The CSS uses the same breakpoints.
- Default border radius on buttons/inputs: **2px** (the design uses square corners).

### Custom CSS
Run `npm run build:wp-css` and paste `wordpress/weckwert.css` into **Site Settings → Custom CSS**
(or enqueue it from an Astra child theme). After that, any container or widget given a `wk-…` CSS class
(Advanced → CSS Classes) picks up the exact styling from this build. Class names below match the React code.

### Other settings
- **Settings → Permalinks → Post name** (the live site uses `?page_id=` links — see redirects in §6).
- **Site Identity:** logo = `public/brand/logo-dark.png` (header), footer = `logo-light.png`,
  Site Icon = `public/brand/icon-512.png`.
- **Lightbox:** Site Settings → Lightbox → on (replaces `Lightbox.tsx`).

---

## 2. Projects: custom post type + fields

Recommended: **ACF Pro** (or ACF free + its built-in post-type UI) with:

- Post type **`project`** (slug `projects`) → URLs `/projects/heards-pond/` (same as the React routes).
- Taxonomy **`project_type`**: `Residential`, `Commercial`.
- Featured image = `cover`.

| ACF field | Type | React field (`src/content/projects.ts`) |
|---|---|---|
| `short_title` | Text | `short` (card title, e.g. "The Palms") |
| `category` | Text | `category` ("55+ Townhome Community") |
| `location` | Text | `location` |
| `years` | Text | `years` ("2004 – 2005") |
| `status_label` | Text | `status.label` ("Only 1 lot remaining") |
| `status_tone` | Select: sold / available / current / complete | `status.tone` → badge class `wk-badge--{tone}` |
| `card_stat` | Text | `cardStat` ("82 homes") |
| `summary` | Textarea | `summary` (hero text + SEO description) |
| `highlights` | Textarea (one per line) or Repeater | `highlights` |
| `facts` | Repeater (label, value) | `facts` (facts strip) |
| `plain_hero` | True/False | `plainHero` (no photo in hero) |
| `brand_logo` | Image | `brandLogo` (The Woodlands only) |
| Post content | Elementor | `body`, `gallery`, `specs`, `sections`, `plans`, `maps` |

The long, variable blocks (overview text, spec sheets, galleries, plans, maps) are easiest to keep as
normal Elementor content inside each project, built from the saved templates in §4.

**Alternative without a CPT:** keep the live site's structure (Residential / Commercial parent pages with
child pages), build one "Project page" template, and insert it on each child page. You lose the automatic
filterable Loop Grid, but editing stays simple.

---

## 3. Theme Builder templates (Elementor Pro → Templates → Theme Builder)

| Template | Condition | React source |
|---|---|---|
| Header | Entire site | `components/layout/Header.tsx` |
| Footer | Entire site | `components/layout/Footer.tsx` |
| Single — Project | Projects (all) | `pages/ProjectDetail.tsx` |
| Loop Item — Project card | (used by Loop Grids) | `ProjectCard` in `sections/Projects.tsx` |
| 404 | 404 page | `pages/NotFound.tsx` |

### Header (`wk-topbar` + `wk-header`)
1. Container **Top bar** (class `wk-topbar`, bg Forest, height 34px, hidden on tablet/mobile):
   Icon List (map-pin "Thomasville, Georgia" → Google Maps, phone "229-233-8292" → `tel:+12292338292`) · Text "Developer & general contractor since 1986".
2. Container **Main** (class `wk-header`, bg Background, border-bottom Border, height 80px,
   *Motion Effects → Sticky: Top*): Site Logo (52px tall) · **Nav Menu** (menu "Primary", dropdown on,
   pointer underline gold) · Button "Request Proposal" → `/contact/` (class `wk-btn wk-btn--green`, hidden on tablet/mobile).
3. Nav Menu mobile: hamburger, dropdown "Full width", items in Libre Baskerville 24px.

**Menu "Primary"** (Appearance → Menus): Home · Commercial (9 child items) · Residential (6 child items) · About · Contact.
(Commercial is listed first because it is the company's primary focus.)

### Footer (`wk-footer`, bg Charcoal)
Grid container 5 columns (tablet 3, mobile 2): Logo + blurb · Headquarters (address, phone, directions) ·
Residential links · Commercial links (2-column list) · Company links. Bottom bar: © year + "Developer & General
Contractor · Thomasville, Georgia" (use the `[year]`/dynamic tag for the year).

### Single Project
Top to bottom (each block hidden when its field is empty):
1. **Hero** (`wk-pagehero`, or `wk-pagehero wk-pagehero--plain` when `plain_hero`): Featured image as
   background + overlay (gradient below) · Breadcrumbs · eyebrow "{Type} project" · Post Title (H1) ·
   meta Icon List (category, location, years) + status badge · `summary`.
2. **Facts strip** (`wk-facts`): Loop of `facts` repeater → label/value cells.
3. **Overview** (`wk-overview`): left = Post Content intro (eyebrow "Overview", H2 "About {short}.");
   right = sticky panel (`wk-aside__panel`) with `highlights` checklist, gold button "Discuss a similar project", phone.
4. Post content blocks (Specs / Gallery / Amenities / Plans / Location) — built from saved templates (§4).
5. **Pager** (`wk-pager`): Post Navigation widget (same taxonomy) + button "All {type} projects".
6. **More work** (bg Forest): Loop Grid, 3 posts, same `project_type`, exclude current.
7. **CTA band** (global template).

Hero overlay (Background Overlay → Gradient, or Custom CSS on `.wk-hero__shade`):
`linear-gradient(90deg, rgba(0,42,20,.97) 0%, rgba(0,42,20,.9) 32%, rgba(0,42,20,.55) 62%, rgba(0,42,20,.25) 100%)`.

---

## 4. Saved templates / Global widgets (Templates → Saved Templates)

| Template | Class | React component | Elementor build |
|---|---|---|---|
| Section header | `wk-head` | `SectionHeader` | Heading (h6, class `wk-eyebrow`) + Heading (h2) + Text Editor |
| Ledger grid | `wk-ledger` / `wk-cell` | `FeatureGrid` | Grid container (3/2/1 cols, gap 0, border-top/left Border) with Icon Box widgets (class `wk-cell`, number in the description or a small Heading) |
| Stats strip | `wk-stats` | `StatsStrip` | Grid container 5/3/2 of **Counter** widgets (bg Surface, dividers) |
| Project grid + filter | `wk-pgrid`, `wk-filter` | `ProjectGrid` | **Loop Grid** (Projects, 3/2/1 cols, gap 20px) + **Taxonomy Filter** on `project_type` |
| Process tabs | `wk-tabs` | `ProcessTabs` | **Tabs** widget, vertical; content panel bg Primary |
| Name marquee | `wk-marquee` | `Marquee` | Text Editor with the `<ul class="wk-marquee__row">` markup (CSS-only animation) |
| Project brief form | `wk-brief` | `ProjectBrief` | Container 2 cols: left panel (bg Forest) + **Form** widget (see §5) |
| Leadership | `wk-people` / `wk-person` | `Leadership` | Section bg Charcoal; grid of Image + Heading + Text per person |
| Regions | `wk-states`, `wk-mapcard` | `Regions` | **Tabs** widget, horizontal, tab titles styled as tiles, content = green grid card |
| FAQ | `wk-accordion` | `FaqBlock` | **Accordion** widget (first item open) |
| CTA band | `wk-cta` | `CtaBand` | Container bg Primary: Heading + Text | Buttons (gold, outline, text) |
| Spec sheet | `wk-spec` | `SpecsBlock` | Container with Heading, 3-cell sizes row, two Icon Lists (features, options) |
| Gallery | `wk-gallery` | `Gallery` | **Gallery** / Basic Gallery, 3 cols, aspect 4:3, link → Media File (lightbox) |
| Plans | `wk-plans` / `wk-plan` | `PlansBlock` | Grid of Image (contain) + Heading + text links "View larger" (lightbox) / "PDF" (file) |

Section backgrounds alternate **Background → Surface**, with dark bands (Forest / Charcoal / Primary) for
Selected Work, Leadership, process panel and the CTA.

Scroll animations: Advanced → Motion Effects → Entrance Animation **Fade In Up** (replaces `[data-reveal]`).
Counters: Counter widget, duration 1600ms, thousands separator off for "1986".

---

## 5. Pages

| Page | URL | React | Sections (top → bottom) |
|---|---|---|---|
| Home | `/` | `pages/Home.tsx` | Home hero · Stats strip · Capabilities ledger (6) · Selected work (Loop Grid 8 + filter, bg Forest) · Process tabs (bg Surface) · Marquee · Project brief form · Leadership (bg Charcoal) · Regions (bg Surface) · FAQ · CTA band |
| Residential | `/residential/` | `pages/Residential.tsx` | Page hero + stats (11 / 22 / 700+) · intro + 4-cell ledger · Loop Grid (Residential, 6) bg Forest · "Available now" (2 project spots) · CTA |
| Commercial | `/commercial/` | `pages/Commercial.tsx` | Page hero + stats · capabilities ledger (6) · Loop Grid (Commercial, 9) bg Forest · Wendy's spotlight (text + 3-photo mosaic) · Colonial Square land panel · CTA |
| About | `/about/` | `pages/About.tsx` | Page hero · intro (text + framed image) · Stats strip · Commercial / Residential focus · Advantages ledger · Timeline (bg Forest) · Team bios (`#team`) · Community · CTA |
| Contact | `/contact/` | `pages/Contact.tsx` | Page hero + quick call/visit buttons · Project brief form · "What happens next" ledger · Map (Google Maps widget, "313 Hickory Ridge East, Thomasville, GA 31792") · FAQ |

### Heroes — every page fills exactly the first screen
All heroes (home, inner pages, every project, 404) are one screen tall below the header, on every device.
In Elementor: hero Container → Min Height **100 vh**, then add class `wk-hero` (home) or `wk-pagehero`
(inner pages) so the custom CSS sets `min-height: var(--hero-h)` = `100svh − header (80px / 72px on tablet
& mobile) − top bar (34px, desktop only)`. Content is vertically centred; the stats strip sits at the bottom.

- Type and spacing scale with screen width **and** height (`--fs-hero`, `--fs-h1`, `--hero-gap`, `--hero-pad` in tokens.css),
  so headings shrink on short laptops and grow on tall tablets.
- On short screens, secondary items hide so the hero never runs past the fold:
  phones under 760px tall hide the "Now developing" callout; screens under 600px tall also hide the home intro text;
  landscape phones (under 500px tall) also hide breadcrumbs, the inner-page intro text and the Contact quick links.
  (Elementor: Advanced → Responsive can only hide by device, so keep these rules in the custom CSS.)
- Verified on 21 viewports (320×568 → 2560×1440, incl. landscape phones and tablets) across all hero types.

Home hero: background = the client's commercial project photo (Starbucks / strip-center building, `/images/site/hero-commercial.jpg`).
Photo placement keeps the Starbucks sign clear of the headline: on desktop the photo fills the **right 70%** and fades into the green on the
left (Elementor: Container background image → Position *Center Right*, size *Cover*, plus an overlay gradient green→transparent left→right);
on tablets and tall phones the photo is zoomed to the **top** of the hero with the text below it (overlay gradient bottom→top);
on very small phones it stays full-bleed. See the `Home hero photo placement` block in `src/styles/sections.css`. Overlay as above; eyebrow with
line (class `wk-eyebrow wk-eyebrow--line`); H1 Libre Baskerville; buttons gold + outline (side by side on phones);
"Now developing" callout (class `wk-now`).

### Contact / project brief form (Elementor Pro Form, or WPForms which is already installed)
Fields: Project category (Select) · Approximate scale (Select) · Timeline goal (Radio, inline — style as
chips with class `wk-chips`) · Full name* · Phone · Email* · Project details* (Textarea).
Actions after submit: **Email** to **info@weckwertcml.com**,
optional Collect Submissions. Success message: "Thank you — your project brief has been received. We'll be in touch shortly."
The React form only validates and shows that message; it does not send anything.

---

## 6. Redirects from the current URLs

The live site uses plain permalinks. If pages keep their IDs, switching to "Post name" redirects them
automatically; projects moved into the `project` post type need 301s (Redirection plugin):

| Old | New |
|---|---|
| `/?page_id=1319` | `/about/` |
| `/?page_id=16` | `/contact/` |
| `/?page_id=1691` | `/residential/` |
| `/?page_id=1969` | `/commercial/` |
| `/?page_id=1753` | `/projects/the-palms/` |
| `/?page_id=1812` | `/projects/heards-pond/` |
| `/?page_id=1831` and `/?page_id=1844` | `/projects/huntington-pointe/` |
| `/?page_id=1937` | `/projects/stone-bridge/` |
| `/?page_id=1914` | `/projects/lake-eagle/` |
| `/?page_id=1899` | `/projects/wood-hollow/` |
| `/?page_id=2027` | `/projects/cnsnext/` |
| `/?page_id=2047` | `/projects/huron-holdings/` |
| `/?page_id=2062` | `/projects/the-woodlands/` |
| `/?page_id=2098` | `/projects/colonial-square/` |
| `/?page_id=2089` | `/projects/the-phoenix/` |
| `/?page_id=2083` | `/projects/the-brickworks/` |
| `/?page_id=2075` | `/projects/rsc/` |
| `/?page_id=2309` | `/projects/zaxbys/` |
| `/?page_id=2314` | `/projects/wendys/` |

---

## 7. Media

Everything in `public/` uploads straight to the Media Library:

- `public/brand/` — logos (light/dark, horizontal + stacked), mark, favicon, 512px site icon, social image.
- `public/images/projects/<slug>/` — cover + gallery + plans per project (web-optimized from the live site's originals).
- `public/images/team/` — 720px square portraits.
- `public/images/site/` — `cta-cranes.jpg` (Pexels, free licence) and `thomasville.jpg` (from the live site).
- `public/files/` — printable PDFs (The Palms plans + plat, The Woodlands overall site plan).
