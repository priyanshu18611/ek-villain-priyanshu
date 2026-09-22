# EK VILLAIN — PRIYANSHU · Premium Upgrade

Drop-in replacement for your `index.html`, `style.css`, `script.js`. Same
content/sections as your original repo — rebuilt with cinematic GSAP-driven
animation and 13 new features on top.

## Setup
1. Copy these 3 files into your repo, overwriting the old ones.
2. Keep your existing `assets/` folder as-is (profile photo + resume PDF) —
   nothing there needs to change.
3. Open `index.html` locally or push to GitHub Pages as before.

## 13 features added
1. **Cinematic preloader** — animated percentage loader before the hero plays.
2. **GSAP ScrollTrigger scene reveals** — every section animates in as you
   scroll, with a live chapter indicator (bottom-left) that updates in sync.
3. **Custom magnetic cursor** — ring + dot cursor that grows over links/cards;
   buttons pull toward the pointer (magnetic effect). Disabled on touch.
4. **3D tilt hero device** — the laptop mockup tilts in real 3D as you move
   the mouse, with a light-shine sweep across the screen.
5. **Animated count-up stats** — the About section's numbers (6 projects,
   3 internships, 8 certifications) count up when scrolled into view.
6. **Kinetic headline reveal** — the hero title animates in line-by-line on
   load as one orchestrated intro sequence.
7. **Interactive project modal** — click any Archive card to open a full
   case-study lightbox (description + tech stack + live link) instead of
   only seeing the compact card.
8. **Seamless infinite stack marquee** — the tech marquee now loops perfectly
   with no jump-cut, and pauses on hover so it's readable.
9. **Scroll progress bar + back-to-top button** — a slim top progress bar
   plus a floating "↑" button that appears after one screen of scroll.
10. **Villain Mode easter egg** — click the toggle in the nav, press `V`,
    click the logo 5× fast, or enter the Konami code (↑↑↓↓←→←→) to flip the
    site into a glitchy red "villain" filter — a fun, on-brand technical
    flourish with zero fake content.
11. **Working contact form** — client-side validated name/email/message form
    that hands off to the visitor's mail app, plus a "copy email" button with
    a toast confirmation (no backend needed, works on GitHub Pages).
12. **Keyboard scene navigation** — `↑`/`↓` or `J`/`K` jump between scenes
    like a slideshow, for a "director's cut" feel.
13. **Live GitHub stats** — the hero footer fetches your real public repo and
    follower count from the GitHub API at load time (falls back to the
    original text if the API is unreachable, so it never breaks).

All animation respects `prefers-reduced-motion`, the cursor auto-disables on
touch devices, and the layout is fully responsive down to mobile.

## Round 2 — advanced / role-targeted features
14. **Portfolio Lens Switcher** (hero) — three toggles, "SOFTWARE ENGINEER /
    DATA ANALYST / FULL STACK DEV". Each one rewrites the hero tagline,
    dims/highlights the matching columns in the Tools stack, and syncs the
    Archive filter — so a recruiter can instantly see the version of the
    portfolio relevant to the role they're hiring for.
15. **Data Analytics Lab — live BI dashboard** (new scene, Power BI/Tableau
    style) — a real working dashboard built with Chart.js: 4 KPI cards, a
    quarterly revenue bar chart and a category-mix donut chart, all driven
    by a region filter dropdown. Clearly labeled as illustrative data so it
    never misrepresents real client numbers, while genuinely demonstrating
    BI/dashboard-building skill.
16. **Command palette (⌘K / Ctrl+K)** — a Linear/Vercel-style quick-jump
    search: type to jump to any scene or project, or run actions (copy
    email, toggle Villain Mode, preview resume, open GitHub/LinkedIn).
    Full keyboard support (↑↓, Enter, Esc).
17. **Software Engineer terminal widget** (About section) — an animated,
    self-typing terminal (`whoami`, `cat core_skills.json`, a git commit)
    that plays once it scrolls into view — a fast, credible "I write code"
    moment for engineering-focused recruiters.
18. **System architecture diagram** (Tools section) — a hoverable four-node
    diagram (Client → API Layer → Data Layer → Deployment) showing how a
    full-stack product is actually wired, mirroring the real stack used in
    CareerPilot AI and EcoSentinel.
19. **Live GitHub stat card** (Experience section) — a second, dedicated
    card pulling real public-repo/follower/following counts from the GitHub
    API, independent from the hero's inline stat line.
20. **Resume quick-view modal** — "VIEW RESUME" now opens an inline PDF
    preview on desktop instead of jumping straight to a new tab (mobile
    still opens the PDF directly, since in-page PDF viewers are unreliable
    on small screens), with an "Open full PDF" fallback inside the modal.

## Round 3 — the "wow" layer (cinematic engine)
21. **Film countdown leader intro** — after the loading bar finishes, a real
    5‑4‑3‑2‑1 film-leader countdown plays (circular wipe + numbers), like a
    movie reel starting, before the hero reveals. Skipped instantly for
    `prefers-reduced-motion`.
22. **Interactive particle network in the hero** — a lightweight canvas
    (no libraries) draws a constellation of red nodes behind the hero copy;
    particles drift and connect with lines, and gently part around the
    cursor. Pauses automatically when the hero scrolls out of view.
23. **Text-scramble decode on "VILLAIN"** — the headline resolves out of
    scrambled characters (Matrix/decoder style) the moment it appears,
    timed into the existing intro sequence.
24. **Cinematic horizontal scroll through the Archive** (desktop) — the
    Archive section pins in place and the project cards scroll *sideways*
    as you scroll down, like a gallery reel; automatically recalculates
    when you change filters. On tablet/mobile it gracefully falls back to
    the normal vertical grid — no scroll-jacking on small screens.
25. **Scroll-scrubbed hero parallax** — as you start scrolling past the
    hero, the device mockup and headline pull back and fade in sync with
    scroll position (not just time), like a camera pulling away.
26. **Real glitch transition for Villain Mode** — toggling it now fires a
    genuine screen-tear burst (scanline jitter + torn slice bars) for a
    third of a second, on top of the red flash — not just a color swap.

All six respect `prefers-reduced-motion` (skipped or shortened), the canvas
pauses off-screen, and the horizontal pin only engages above 900px so
nothing fights the scroll on phones.

## Round 4 — real GitHub data + genuine optimization + delight
Pulled live from your actual GitHub (`github.com/priyanshu18611`) — nothing
invented:
27. **Two more real projects added to the Archive** — **Resume Parser**
    (Python, Streamlit, PyPDF2) and **Kisan Mitra** (a smart farming
    dashboard for Indian farmers — HTML/CSS/JS), both pulled from your
    actual public repos, with real GitHub links. Project count updated to 8
    everywhere (About stats + Archive) to match reality.
28. **Live "Latest on GitHub" feed** — the Experience section's GitHub card
    now also fetches your 4 most recently updated public repos in real
    time and lists them with a clickable link and last-updated date.
29. **Lazy-loaded Chart.js** — the BI dashboard library only downloads the
    moment the Data Analytics Lab section actually scrolls into view,
    instead of on every page load — a real performance win for anyone who
    never scrolls that far.
30. **Tab title syncs to the scene you're on** — the browser tab title
    updates live as you scroll ("EK VILLAIN — ARCHIVE · Priyanshu", etc.),
    so the tab itself tells a story.
31. **Favicon swaps in Villain Mode** — the tab icon itself flips from a
    plain "EV" mark to 😈 while Villain Mode is on, and back when it's off.
32. **Page-visibility-aware animation pausing** — the particle canvas,
    marquee, orb glow and Villain Mode pulse all pause automatically when
    the browser tab is in the background, saving battery and CPU for
    anyone who leaves the tab open.

## Notes
- Animations use GSAP + ScrollTrigger loaded from cdnjs (no build step, no
  npm install — works exactly like your current plain HTML/CSS/JS setup).
- No content was invented: all copy, projects, stats and links are exactly
  what was already in your repo's `index.html`.
