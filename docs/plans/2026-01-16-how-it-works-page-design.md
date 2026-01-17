# How It Works Page - Design

## Overview

A quick-reference "How to use Tickd" page accessible from both the landing page (marketing visitors) and inside the app (logged-in users). ~500 words, skimmable cards, hybrid tone (neutral explanations with Tick commentary).

## Route

`/how-it-works` - public, no auth required

## Page Structure

### Header

```
HOW TICKD WORKS
(the short version for people who don't read instructions)
```

### Intro

> Tickd is a deadline app that shows you fake earlier deadlines. You panic, you work, you finish "just in time" — then discover you actually had days to spare.

**Tick interjects:** *"I lie to you. It's a whole thing. You'll love it."*

**Tick expression:** `scheming`

---

## Content Cards

### Card 1: THE LIE

**Tick expression:** `suspicious`

> You enter the real deadline. We show you an earlier one. Your brain finally registers urgency instead of "eh, future me's problem."
>
> You never see the real date until you finish.

**Tick:** *"You can't handle the truth. Literally. That's why you're here."*

---

### Card 2: SPICINESS LEVELS

**Tick expression:** `judgmental`

> Choose how aggressive Tick gets when you're slacking. Level 1 is gentle concern. Level 5 is unhinged chaos.
>
> Adjustable anytime by long-pressing Tick.

**Tick:** *"I can be your therapist or your drill sergeant. Your call."*

---

### Card 3: RELIABILITY SCORE

**Tick expression:** `disappointed`

> The app tracks how often you meet deadlines. Lower score = we lie harder. Higher score = we ease up.
>
> It's adaptive gaslighting.

**Tick:** *"Earn my trust and I'll stop lying so aggressively. Betray it and I become unhinged."*

---

### Card 4: THE REVEAL

**Tick expression:** `smug`

> Finish a task and we show you the truth: the real deadline vs what you thought.
>
> Finding out you had 3 days to spare hits different.

**Tick:** *"I lied. You thrived. Dopamine achieved."*

---

## Technical Implementation

### New Files

- `src/pages/HowItWorksPage.tsx` - main page component

### Routing

- Add `/how-it-works` as public route in App.tsx
- No auth required

### Navigation Links

- Landing page: add link in footer
- In-app: add link in settings page help section

### Components

- `TickSprite` with expressions matching each card
- Reuse landing page card styling (border-3, shadows, slight rotations)
- Same Tailwind color palette (clock-* colors)

### Design Notes

- Single column layout
- Cards stack vertically
- Tick sprite appears next to each card with appropriate expression
- Mobile-friendly, respects ADHD attention spans
- Back link to landing page or app depending on entry point
