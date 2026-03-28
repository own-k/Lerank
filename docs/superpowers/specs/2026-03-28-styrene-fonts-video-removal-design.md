# Design: Styrene A Fonts + Hero Video Removal

**Date:** 2026-03-28
**Scope:** `artifacts/lerank/`

## Summary

Two visual changes to the LeRank landing page:
1. Remove the video background from the hero section and replace with a CSS gradient.
2. Replace Inter (body) and Instrument Serif (headings) with Styrene A Regular and Styrene A Bold throughout.

## Changes

### 1. Font Files — `public/`

Copy both OTF files from `attached_assets/` into `artifacts/lerank/public/`:
- `StyreneA-Regular.otf`
- `StyreneA-Bold.otf`

### 2. Font Declarations — `src/index.css`

Remove the Google Fonts `@import` for Inter and Instrument Serif.

Add two `@font-face` blocks under `font-family: 'Styrene A'`:
- Regular: weight 400, `StyreneA-Regular.otf`
- Bold: weight 700, `StyreneA-Bold.otf`

Update `@theme inline`:
- `--font-sans: 'Styrene A', sans-serif` (replaces Inter)
- `--font-display: 'Styrene A', sans-serif` (replaces Instrument Serif)

`--font-brand` (Monsieur La Doulaise) is unchanged.

Headings (`h1–h6`) already use `font-display` via the base layer rule — no HTML changes needed.

### 3. Hero Background — `src/pages/Landing.tsx`

Remove the `<video autoPlay loop muted playsInline>` element entirely.

Replace the existing translucent overlay `<div>` with a standalone gradient background:
```
radial-gradient(ellipse 90% 55% at 50% -5%, hsl(var(--sage)/0.22) 0%, transparent 65%),
linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)
```

This creates a subtle sage glow at the top of the hero. Uses existing CSS custom properties so it adapts to both light and dark mode automatically.

## Out of Scope

- No changes to Monsieur La Doulaise (brand/logo font)
- No changes to font sizes, weights, or tracking on individual elements
- No changes to pages other than Landing.tsx
