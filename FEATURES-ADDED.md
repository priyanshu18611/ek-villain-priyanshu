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

## Notes
- Animations use GSAP + ScrollTrigger loaded from cdnjs (no build step, no
  npm install — works exactly like your current plain HTML/CSS/JS setup).
- No content was invented: all copy, projects, stats and links are exactly
  what was already in your repo's `index.html`.
