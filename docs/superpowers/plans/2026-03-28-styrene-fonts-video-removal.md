# Styrene A Fonts + Hero Video Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Inter/Instrument Serif with Styrene A (Regular + Bold) across the LeRank site, and remove the hero video background in favour of a CSS gradient.

**Architecture:** Self-host two OTF font files in `public/`, declare them via `@font-face` in `index.css`, update the two font CSS variables, then strip the `<video>` element from `Landing.tsx` and upgrade the overlay div to a standalone gradient background.

**Tech Stack:** React (TSX), Tailwind v4 CSS custom properties, Vite (static assets served from `public/`)

---

## File Map

| Action | File |
|--------|------|
| Copy (new) | `artifacts/lerank/public/StyreneA-Regular.otf` |
| Copy (new) | `artifacts/lerank/public/StyreneA-Bold.otf` |
| Modify | `artifacts/lerank/src/index.css` |
| Modify | `artifacts/lerank/src/pages/Landing.tsx` |

---

### Task 1: Copy font files into the public directory

**Files:**
- Create: `artifacts/lerank/public/StyreneA-Regular.otf`
- Create: `artifacts/lerank/public/StyreneA-Bold.otf`

- [ ] **Step 1: Copy both OTF files**

```bash
cp attached_assets/StyreneA-Regular.otf artifacts/lerank/public/StyreneA-Regular.otf
cp attached_assets/StyreneA-Bold.otf artifacts/lerank/public/StyreneA-Bold.otf
```

- [ ] **Step 2: Verify files are present**

```bash
ls -lh artifacts/lerank/public/Styrene*
```

Expected output (sizes may vary):
```
-rw-r--r-- ... StyreneA-Bold.otf
-rw-r--r-- ... StyreneA-Regular.otf
```

- [ ] **Step 3: Commit**

```bash
git add artifacts/lerank/public/StyreneA-Regular.otf artifacts/lerank/public/StyreneA-Bold.otf
git commit -m "feat: add Styrene A font files to public assets"
```

---

### Task 2: Declare fonts and update CSS theme variables

**Files:**
- Modify: `artifacts/lerank/src/index.css`

- [ ] **Step 1: Remove the Google Fonts import**

Find and remove line 1 of `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
```

- [ ] **Step 2: Add @font-face declarations**

Insert after line 1 (`@import "tailwindcss";`), before the `html { ... }` block:

```css
@font-face {
  font-family: 'Styrene A';
  src: url('/StyreneA-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Styrene A';
  src: url('/StyreneA-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 3: Update font theme variables**

In the `@theme inline { ... }` block, replace:
```css
  --font-sans: 'Inter', sans-serif;
  --font-display: 'Instrument Serif', serif;
```
with:
```css
  --font-sans: 'Styrene A', sans-serif;
  --font-display: 'Styrene A', sans-serif;
```

Leave `--font-brand: 'Monsieur La Doulaise', cursive;` unchanged.

- [ ] **Step 4: Verify the CSS file looks correct**

Check that `index.css` now starts with:
```css
@import "tailwindcss";

@font-face {
  font-family: 'Styrene A';
  src: url('/StyreneA-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Styrene A';
  src: url('/StyreneA-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

And that `@theme inline` contains:
```css
  --font-sans: 'Styrene A', sans-serif;
  --font-display: 'Styrene A', sans-serif;
```

- [ ] **Step 5: Commit**

```bash
git add artifacts/lerank/src/index.css
git commit -m "feat: replace Inter/Instrument Serif with Styrene A font"
```

---

### Task 3: Remove video background and replace with CSS gradient

**Files:**
- Modify: `artifacts/lerank/src/pages/Landing.tsx`

- [ ] **Step 1: Remove the video element**

Find and delete this block (lines ~238–243):
```tsx
        {/* Background video */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4"
        />
```

- [ ] **Step 2: Replace the overlay div with a gradient background**

Find the overlay div (immediately after the removed video block):
```tsx
        {/* Overlay — warm gradient so content stays readable */}
        <div className="absolute inset-0 z-[1]" style={{
          background: "linear-gradient(to bottom, hsl(var(--background)/0.72) 0%, hsl(var(--background)/0.48) 55%, hsl(var(--background)/0.28) 100%)"
        }} />
```

Replace it with:
```tsx
        {/* Hero gradient background */}
        <div className="absolute inset-0 z-0" style={{
          background: "radial-gradient(ellipse 90% 55% at 50% -5%, hsl(var(--sage)/0.22) 0%, transparent 65%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)"
        }} />
```

Note: `z-[1]` → `z-0` because there is no longer a video layer underneath; the gradient is now the base layer. The parallax content wrapper already uses `z-10` so it sits on top correctly.

- [ ] **Step 3: Update the hero section comment**

Change:
```tsx
      {/* ── Hero (Nexora-style: h-screen, video bg, centered, glass dashboard) ── */}
```
to:
```tsx
      {/* ── Hero: h-screen, gradient bg, centered, glass dashboard ── */}
```

- [ ] **Step 4: Verify no video references remain**

```bash
grep -n "video\|cloudfront" artifacts/lerank/src/pages/Landing.tsx
```

Expected: only matches inside `chart.tsx` (a different file) or none at all. No matches in `Landing.tsx`.

- [ ] **Step 5: Commit**

```bash
git add artifacts/lerank/src/pages/Landing.tsx
git commit -m "feat: replace hero video background with CSS gradient"
```
