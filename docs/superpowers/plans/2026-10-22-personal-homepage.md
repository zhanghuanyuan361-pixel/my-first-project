# Personal Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive single-page personal homepage from the empty repository using only native HTML, CSS, and JavaScript.

**Architecture:** `index.html` owns semantic content and section anchors, `style.css` owns the visual system and responsive layout, and `script.js` owns progressive-enhancement interactions. A Node built-in smoke test checks the three files and key behavior markers without adding a dependency or changing the runtime model.

**Tech Stack:** HTML5, CSS3, browser JavaScript, and Node.js built-in `assert`/`fs` for validation only.

**Spec:** `docs/superpowers/specs/2026-10-22-personal-homepage-design.md`

## Global Constraints

- Use native HTML, CSS, and JavaScript; do not add a framework, package manager, or runtime service.
- Keep example copy easy to search and replace; do not invent real social profiles, projects, credentials, or contact data.
- Do not use external images, fonts, or network assets.
- Preserve the existing README and do not deploy, push, or merge to the main branch.
- Keep the layout responsive for desktop and mobile widths and honor `prefers-reduced-motion: reduce`.

## Review Focus

- A keyboard user must be able to see focus states and open/close the mobile menu with a button that exposes its state.
- A user with reduced-motion preferences must not receive forced entrance or smooth-scroll animation.
- A browser without Clipboard API support must still expose a usable `mailto:` contact link and visible failure feedback.
- A page with JavaScript disabled must retain readable content, working section links, and ordinary project/contact links.
- A narrow viewport must avoid horizontal overflow and keep card content readable.

### Task 1: Create a dependency-free smoke-test harness

**Files:**
- Create: `tests/portfolio-smoke.mjs`

**Interfaces:**
- Produces: a command-line check runnable with `node tests/portfolio-smoke.mjs`.
- Consumes: the three root files created by later tasks.

- [ ] **Step 1: Write the failing test**

  Use Node's `assert/strict` and `fs` to require `index.html`, `style.css`, and `script.js`; assert the HTML includes `#about`, `#skills`, `#projects`, `#contact`, links to both assets, and three project cards; assert CSS includes a mobile media query and reduced-motion rule; assert JavaScript includes menu state handling, `IntersectionObserver`, a scroll-to-top handler, and Clipboard API fallback markers.

- [ ] **Step 2: Run the test to verify it fails**

  Run: `node tests/portfolio-smoke.mjs`

  Expected: FAIL because the three website files do not exist yet.

- [ ] **Step 3: Commit**

  ```bash
  git add tests/portfolio-smoke.mjs
  git commit -m "test: add homepage smoke checks"
  ```

### Task 2: Build the semantic page structure

**Files:**
- Create: `index.html`

**Interfaces:**
- Produces: section IDs `about`, `skills`, `projects`, and `contact`; class hooks used by `style.css` and `script.js`; a mobile menu button with `aria-expanded`; a copy-email button with a `data-email` value; a `#back-to-top` button.
- Consumes: none.

- [ ] **Step 1: Implement the HTML shell and navigation**

  Add a language declaration, viewport metadata, title/description, skip link, header navigation, and links to `style.css` and `script.js`. Keep navigation links anchored to the four named sections.

- [ ] **Step 2: Add the hero and about sections**

  Use the example identity “Alex Chen”, a front-end developer/creative technologist description, two hero actions, and a concise about panel with location and work-style metadata.

- [ ] **Step 3: Add skills, projects, contact, and footer content**

  Add five skill cards, three project cards with type/description/tags and safe `#` links, contact email/GitHub/location data, a `mailto:` fallback, copy button, toast region, and back-to-top control.

- [ ] **Step 4: Run the smoke test**

  Run: `node tests/portfolio-smoke.mjs`

  Expected: FAIL only on CSS/JavaScript assertions because those files are not created yet; HTML structure assertions pass.

- [ ] **Step 5: Commit**

  ```bash
  git add index.html
  git commit -m "feat: add personal homepage structure"
  ```

### Task 3: Add the responsive visual system

**Files:**
- Create: `style.css`

**Interfaces:**
- Consumes: class hooks and section structure from `index.html`.
- Produces: dark blue/violet surface, cyan accent, gradient glow decorations, desktop grid layout, mobile single-column layout, hover/focus states, reveal animation classes, and reduced-motion overrides.

- [ ] **Step 1: Define tokens, reset, and base typography**

  Add CSS custom properties for colors, spacing, radii, shadows, and content width; apply box sizing, body background, readable line height, visible focus rings, and selection styling.

- [ ] **Step 2: Style the header and hero**

  Create the sticky glass navigation, brand mark, responsive menu surface, hero grid, gradient headline, status badge, decorative glow, and primary/secondary buttons.

- [ ] **Step 3: Style content cards and section grids**

  Add the about panel, skill grid, project grid, tags, contact panel, footer, toast, and back-to-top states with consistent card treatment and keyboard-visible focus.

- [ ] **Step 4: Add responsive and motion rules**

  Use a mobile breakpoint to collapse navigation and grids; prevent overflow; add `.reveal`/`.is-visible` transitions; add `@media (prefers-reduced-motion: reduce)` to remove transitions and smooth scrolling.

- [ ] **Step 5: Run the smoke test**

  Run: `node tests/portfolio-smoke.mjs`

  Expected: FAIL only on JavaScript assertions because `script.js` is not created yet; CSS assertions pass.

- [ ] **Step 6: Commit**

  ```bash
  git add style.css
  git commit -m "feat: style responsive personal homepage"
  ```

### Task 4: Add progressive-enhancement interactions

**Files:**
- Create: `script.js`

**Interfaces:**
- Consumes: DOM hooks from `index.html` and state classes from `style.css`.
- Produces: menu toggle behavior, reveal observer, active-section navigation, scroll-to-top visibility, copy-email feedback, and graceful fallbacks when optional browser APIs are missing.

- [ ] **Step 1: Implement menu state helpers and event listeners**

  Define `setMenuState(isOpen)` to synchronize the mobile navigation class, `aria-expanded`, and button label; close the menu after a navigation link click and when Escape is pressed.

- [ ] **Step 2: Implement reveal and active-navigation behavior**

  Observe `.reveal` elements with `IntersectionObserver` when available; otherwise make them visible immediately. Track section visibility with the same API or a scroll fallback and toggle `is-active` on matching links.

- [ ] **Step 3: Implement scroll-to-top and copy-email feedback**

  Toggle the back-to-top button after a small scroll threshold. Use `navigator.clipboard.writeText` when available, keep the `mailto:` link usable, and show success/failure text in the toast region for a short period.

- [ ] **Step 4: Run syntax and smoke checks**

  Run: `node --check script.js && node tests/portfolio-smoke.mjs`

  Expected: both commands exit 0 with no syntax errors; all smoke assertions pass.

- [ ] **Step 5: Commit**

  ```bash
  git add script.js
  git commit -m "feat: add homepage interactions"
  ```

### Task 5: Verify the complete local workflow

**Files:**
- Modify: none

**Interfaces:**
- Consumes: committed `index.html`, `style.css`, `script.js`, and `tests/portfolio-smoke.mjs`.
- Produces: evidence that the static page is served and its three assets load.

- [ ] **Step 1: Run the full static checks**

  Run: `node --check script.js && node tests/portfolio-smoke.mjs && git diff --check && git status --short --branch`

  Expected: syntax check, smoke test, and whitespace check pass; status lists only the planned commits with no uncommitted changes.

- [ ] **Step 2: Start a local server and check each asset**

  Run `python3 -m http.server 4173` from the repository root, request `/`, `/index.html`, `/style.css`, and `/script.js` with `curl`, then stop only the server started for this check.

  Expected: each request returns HTTP 200 and the HTML response contains the page title.

- [ ] **Step 3: Review the final diff**

  Run: `git show --stat --oneline HEAD~3..HEAD` and inspect `git status --short`.

  Expected: the final change set includes the design/plan docs, three requested website files, and the dependency-free smoke test; README remains unchanged and nothing is pushed or merged.
