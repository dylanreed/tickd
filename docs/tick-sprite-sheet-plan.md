# Tick Sprite Sheet Plan

## Overview

This document outlines all the pixel art sprites needed to bring Tick, the Liars Todo mascot, to life. Tick is a warm brown alarm clock with a Pinocchio nose who serves as the app's always-present companion and notification deliverer.

---

## Base Specifications

**Art Style:** Pixel art, warm browns, friendly but expressive

**Color Palette (from brand guide):**
| Role | Color | Hex |
|------|-------|-----|
| Clock Body | Warm Brown | `#8B6B4F` |
| Clock Face | Cream | `#F5F0E1` |
| Nose/Details | Chestnut | `#6B4423` |
| Cheeks | Rosy Pink | `#E8A0A0` |
| Clock Hands | Dark Brown | `#4A3728` |
| Feet/Base | Warm Brown | `#8B6B4F` |

---

## Size Requirements

| Size | Dimensions | Use | Priority |
|------|------------|-----|----------|
| Mini | 16x16 | Favicon, notification badge | MVP |
| Small | 32x32 | Push notification icon, inline UI | MVP |
| Medium | 48x48 | Corner companion (mobile) | MVP |
| Large | 64x64 | Corner companion (desktop) | MVP |
| XL | 128x128 | Modals, settings screen | MVP |
| Hero | 256x256 | Full-screen moments, onboarding, reveals | Nice to have |

---

## Expression Inventory

### Core Expressions (Required - MVP)

| # | Name | Description | Primary Use |
|---|------|-------------|-------------|
| 1 | **idle** | Friendly smile, default state | Default corner state |
| 2 | **happy** | Bigger smile, rosy cheeks | Tasks on track |
| 3 | **suspicious** | Side-eye, one eyebrow up, smirk | Showing fake deadlines |
| 4 | **concerned** | Worried frown, eyebrows up | Approaching deadline |
| 5 | **disappointed** | Small frown, sad eyes | Overdue (Spice Level 1-2) |
| 6 | **judgmental** | Intense stare, unblinking | Overdue (Spice Level 3) |
| 7 | **unhinged** | Wide eyes, frazzled, vibrating | Overdue (Spice Level 4-5) |
| 8 | **celebrating** | Big smile, sparkle eyes | Task completed |
| 9 | **shocked** | Wide eyes, open mouth, gasp | Reveal moment (initial) |
| 10 | **smug** | Self-satisfied grin | Reveal moment (after), successful lie |

### Secondary Expressions (Nice to Have)

| # | Name | Description | Primary Use |
|---|------|-------------|-------------|
| 11 | **eager** | Excited, leaning forward | Onboarding, first task prompt |
| 12 | **scheming** | Mischievous grin, rubbing hands | "Evil plan" explanation |
| 13 | **relaxed** | Eyes half-closed, content | No tasks due today |
| 14 | **confused** | Arms up, questioning, shrug | Search no results, errors |
| 15 | **apologetic** | Nervous smile, sweat drop | Error states |
| 16 | **pleading** | Big puppy eyes | Notification permission ask |
| 17 | **skeptical** | One eyebrow raised, dubious | Invalid input |
| 18 | **annoyed** | Flat expression, unimpressed | Offline, rate limited |
| 19 | **waving** | Hand up, friendly wave | Welcome screen |
| 20 | **tapping_foot** | Impatient pose | Waiting for tasks, empty state |

---

## Accessories & Overlays

Accessories can be overlaid on base expressions:

| Accessory | Sprite Name | Used With | When |
|-----------|-------------|-----------|------|
| Party Hat | `acc_party_hat` | celebrating | All tasks complete |
| Confetti | `acc_confetti_1-3` | celebrating, shocked | Reveal moment, completion |
| Steam Puffs | `acc_steam_1-2` | unhinged | Max spice overdue |
| Sweat Drop | `acc_sweat` | concerned, apologetic | Errors, approaching deadline |
| Sparkles | `acc_sparkle_1-2` | happy, celebrating | Positive moments |
| Unplugged Cord | `acc_cord` | annoyed | Offline state |
| Question Mark | `acc_question` | confused | No results, errors |
| Exclamation Mark | `acc_exclaim` | unhinged, shocked | Urgent alerts |

---

## Animation Specifications

### Idle Animation
**Loop:** Yes
**Frame Count:** 6
**Frame Duration:** 100ms
**Total Duration:** 600ms

```
Frame 1: Neutral position
Frame 2: Slight bob down (1-2px)
Frame 3: Neutral position
Frame 4: Slight bob up (1-2px)
Frame 5: Blink (eyes closed)
Frame 6: Neutral position
```

### Eye Follow (Idle Variants)
**Loop:** No (directional states)
**Variants:** 5

```
- eyes_center (default)
- eyes_left
- eyes_right
- eyes_up
- eyes_down
```

### Suspicious Side-Eye
**Loop:** Yes
**Frame Count:** 6
**Frame Duration:** 150ms
**Total Duration:** 900ms

```
Frame 1: Eyes center
Frame 2: Eyes shift right
Frame 3: Eyes right (hold)
Frame 4: Eyes shift left
Frame 5: Eyes left (hold)
Frame 6: Eyes back to center
```

### Concerned Tremble
**Loop:** Yes
**Frame Count:** 4
**Frame Duration:** 80ms
**Total Duration:** 320ms

```
Frame 1: Neutral worried position
Frame 2: Slight shake left (1px)
Frame 3: Neutral worried position
Frame 4: Slight shake right (1px)
```

### Disappointed Sigh
**Loop:** Yes (slow)
**Frame Count:** 4
**Frame Duration:** 200ms
**Total Duration:** 800ms

```
Frame 1: Neutral disappointed
Frame 2: Slight droop
Frame 3: Sigh (eyes close briefly)
Frame 4: Return to neutral disappointed
```

### Judgmental Stare
**Loop:** Yes (minimal movement)
**Frame Count:** 2
**Frame Duration:** 500ms
**Total Duration:** 1000ms

```
Frame 1: Intense stare
Frame 2: Slight narrow of eyes
```

### Unhinged Vibrate
**Loop:** Yes
**Frame Count:** 4
**Frame Duration:** 50ms (fast!)
**Total Duration:** 200ms

```
Frame 1: Position A
Frame 2: Position B (offset 1-2px right)
Frame 3: Position A
Frame 4: Position C (offset 1-2px left)
```

Optional: Add steam puff overlay alternating frames

### Happy Bounce
**Loop:** Yes
**Frame Count:** 4
**Frame Duration:** 120ms
**Total Duration:** 480ms

```
Frame 1: Neutral happy
Frame 2: Slight squash down
Frame 3: Slight stretch up
Frame 4: Return to neutral
```

### Celebrating Bounce
**Loop:** No (one-shot, then transition)
**Frame Count:** 6
**Frame Duration:** 80ms
**Total Duration:** 480ms
**Next Animation:** happy

```
Frame 1: Wind up (squash down)
Frame 2: Jump up (stretch)
Frame 3: Peak height (confetti burst trigger)
Frame 4: Coming down
Frame 5: Land (squash)
Frame 6: Settle (transition to happy)
```

### Shocked Gasp
**Loop:** No (one-shot, holds on final frame)
**Frame Count:** 5
**Frame Duration:** 60ms
**Total Duration:** 300ms

```
Frame 1: Neutral/previous state
Frame 2: Eyes start widening
Frame 3: Eyes wide, mouth starting to open
Frame 4: Full shock pose
Frame 5: Slight settle (hold this frame)
```

### Smug Transition
**Loop:** No (one-shot from shocked)
**Frame Count:** 4
**Frame Duration:** 100ms
**Total Duration:** 400ms
**Next Animation:** smug_idle

```
Frame 1: Shocked pose
Frame 2: Mouth closing, eyes narrowing
Frame 3: Grin forming
Frame 4: Full smug pose
```

### Smug Idle
**Loop:** Yes
**Frame Count:** 3
**Frame Duration:** 200ms
**Total Duration:** 600ms

```
Frame 1: Smug grin
Frame 2: Slight head tilt
Frame 3: Return to smug grin
```

### Waving
**Loop:** Yes
**Frame Count:** 5
**Frame Duration:** 100ms
**Total Duration:** 500ms

```
Frame 1: Hand up, center
Frame 2: Hand right
Frame 3: Hand center
Frame 4: Hand left
Frame 5: Hand center
```

### Tapping Foot
**Loop:** Yes
**Frame Count:** 4
**Frame Duration:** 150ms
**Total Duration:** 600ms

```
Frame 1: Foot down
Frame 2: Foot up
Frame 3: Foot down
Frame 4: Pause (arms crossed optional)
```

---

## Sprite Sheet Layout

### Sheet 1: Core Expressions (48x48 and 64x64)

```
┌──────────────────────────────────────────────────────────────────────┐
│ ROW 1: Idle Animation + Eye Directions                               │
│ [idle_1][idle_2][idle_3][idle_4][idle_5][idle_6]                     │
│ [eyes_L][eyes_R][eyes_U][eyes_D]                                     │
├──────────────────────────────────────────────────────────────────────┤
│ ROW 2: Happy + Celebrating                                           │
│ [happy_1][happy_2][happy_3][happy_4]                                 │
│ [celeb_1][celeb_2][celeb_3][celeb_4][celeb_5][celeb_6]               │
├──────────────────────────────────────────────────────────────────────┤
│ ROW 3: Suspicious + Concerned                                        │
│ [susp_1][susp_2][susp_3][susp_4][susp_5][susp_6]                     │
│ [conc_1][conc_2][conc_3][conc_4]                                     │
├──────────────────────────────────────────────────────────────────────┤
│ ROW 4: Disappointed + Judgmental                                     │
│ [disap_1][disap_2][disap_3][disap_4]                                 │
│ [judg_1][judg_2]                                                     │
├──────────────────────────────────────────────────────────────────────┤
│ ROW 5: Unhinged (with steam variants)                                │
│ [unhin_1][unhin_2][unhin_3][unhin_4]                                 │
│ [unhin_steam_1][unhin_steam_2][unhin_steam_3][unhin_steam_4]         │
├──────────────────────────────────────────────────────────────────────┤
│ ROW 6: Shocked + Smug                                                │
│ [shock_1][shock_2][shock_3][shock_4][shock_5]                        │
│ [smug_trans_1][smug_trans_2][smug_trans_3][smug_trans_4]             │
│ [smug_1][smug_2][smug_3]                                             │
└──────────────────────────────────────────────────────────────────────┘
```

**Sprite Count for Sheet 1:** ~58 sprites per size

### Sheet 2: Secondary Expressions (48x48 and 64x64)

```
┌──────────────────────────────────────────────────────────────────────┐
│ ROW 1: Eager + Scheming + Relaxed                                    │
│ [eager_1][eager_2][eager_3]                                          │
│ [scheme_1][scheme_2][scheme_3]                                       │
│ [relax_1][relax_2]                                                   │
├──────────────────────────────────────────────────────────────────────┤
│ ROW 2: Confused + Apologetic + Pleading                              │
│ [confus_1][confus_2][confus_3]                                       │
│ [apolog_1][apolog_2]                                                 │
│ [plead_1][plead_2]                                                   │
├──────────────────────────────────────────────────────────────────────┤
│ ROW 3: Skeptical + Annoyed                                           │
│ [skept_1][skept_2]                                                   │
│ [annoy_1][annoy_2]                                                   │
├──────────────────────────────────────────────────────────────────────┤
│ ROW 4: Waving + Tapping Foot                                         │
│ [wave_1][wave_2][wave_3][wave_4][wave_5]                             │
│ [tap_1][tap_2][tap_3][tap_4]                                         │
└──────────────────────────────────────────────────────────────────────┘
```

**Sprite Count for Sheet 2:** ~28 sprites per size

### Sheet 3: Accessories (Overlays)

```
┌──────────────────────────────────────────────────────────────────────┐
│ ROW 1: Confetti Animation                                            │
│ [confetti_1][confetti_2][confetti_3][confetti_4][confetti_5]         │
├──────────────────────────────────────────────────────────────────────┤
│ ROW 2: Sparkles + Steam                                              │
│ [sparkle_1][sparkle_2][sparkle_3]                                    │
│ [steam_1][steam_2]                                                   │
├──────────────────────────────────────────────────────────────────────┤
│ ROW 3: Static Accessories                                            │
│ [party_hat][sweat_drop][question][exclaim][cord]                     │
└──────────────────────────────────────────────────────────────────────┘
```

**Sprite Count for Sheet 3:** ~15 sprites per size

### Sheet 4: Small Sizes (16x16 and 32x32 - Static Only)

```
┌──────────────────────────────────────────────────────────────────────┐
│ ROW 1: Core Expressions (Static)                                     │
│ [idle][happy][suspicious][concerned][disappointed]                   │
│ [judgmental][unhinged][celebrating][shocked][smug]                   │
├──────────────────────────────────────────────────────────────────────┤
│ ROW 2: Secondary (Static, if needed)                                 │
│ [eager][scheming][relaxed][confused][apologetic]                     │
│ [pleading][skeptical][annoyed][waving][tapping]                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Sprite Count for Sheet 4:** 10-20 sprites per size

---

## File Structure

```
src/
├── assets/
│   └── tick/
│       ├── sprites/
│       │   ├── tick-16.png              # Mini sprites (favicon, badges)
│       │   ├── tick-32.png              # Small sprites (notifications)
│       │   ├── tick-48-core.png         # Mobile corner - core expressions
│       │   ├── tick-48-secondary.png    # Mobile corner - secondary expressions
│       │   ├── tick-64-core.png         # Desktop corner - core expressions
│       │   ├── tick-64-secondary.png    # Desktop corner - secondary expressions
│       │   ├── tick-128.png             # Modal/settings sprites
│       │   ├── tick-256.png             # Hero sprites (if created)
│       │   └── accessories.png          # Overlay sprites (confetti, etc.)
│       │
│       └── animations/
│           └── tick-animations.json     # Animation definitions
```

---

## Animation Data Structure

```typescript
// src/assets/tick/animations/tick-animations.ts

export type TickExpression =
  | "idle"
  | "happy"
  | "suspicious"
  | "concerned"
  | "disappointed"
  | "judgmental"
  | "unhinged"
  | "celebrating"
  | "shocked"
  | "smug"
  | "eager"
  | "scheming"
  | "relaxed"
  | "confused"
  | "apologetic"
  | "pleading"
  | "skeptical"
  | "annoyed"
  | "waving"
  | "tapping_foot";

export interface AnimationConfig {
  frames: number[];           // Frame indices in sprite sheet
  frameDuration: number;      // Duration per frame in ms
  loop: boolean;              // Whether animation loops
  nextAnimation?: TickExpression;  // Transition to after one-shot
}

export const tickAnimations: Record<TickExpression, AnimationConfig> = {
  idle: {
    frames: [0, 1, 2, 3, 4, 5],
    frameDuration: 100,
    loop: true,
  },
  happy: {
    frames: [0, 1, 2, 3],
    frameDuration: 120,
    loop: true,
  },
  suspicious: {
    frames: [0, 1, 2, 2, 3, 4, 4, 5],
    frameDuration: 150,
    loop: true,
  },
  concerned: {
    frames: [0, 1, 2, 3],
    frameDuration: 80,
    loop: true,
  },
  disappointed: {
    frames: [0, 1, 2, 3],
    frameDuration: 200,
    loop: true,
  },
  judgmental: {
    frames: [0, 1],
    frameDuration: 500,
    loop: true,
  },
  unhinged: {
    frames: [0, 1, 2, 3],
    frameDuration: 50,
    loop: true,
  },
  celebrating: {
    frames: [0, 1, 2, 3, 4, 5],
    frameDuration: 80,
    loop: false,
    nextAnimation: "happy",
  },
  shocked: {
    frames: [0, 1, 2, 3, 4],
    frameDuration: 60,
    loop: false,
    // Holds on last frame until manually transitioned
  },
  smug: {
    frames: [0, 1, 2],
    frameDuration: 200,
    loop: true,
  },
  eager: {
    frames: [0, 1, 2],
    frameDuration: 100,
    loop: true,
  },
  scheming: {
    frames: [0, 1, 2],
    frameDuration: 150,
    loop: true,
  },
  relaxed: {
    frames: [0, 1],
    frameDuration: 300,
    loop: true,
  },
  confused: {
    frames: [0, 1, 2],
    frameDuration: 150,
    loop: true,
  },
  apologetic: {
    frames: [0, 1],
    frameDuration: 200,
    loop: true,
  },
  pleading: {
    frames: [0, 1],
    frameDuration: 250,
    loop: true,
  },
  skeptical: {
    frames: [0, 1],
    frameDuration: 300,
    loop: true,
  },
  annoyed: {
    frames: [0, 1],
    frameDuration: 400,
    loop: true,
  },
  waving: {
    frames: [0, 1, 2, 3, 4],
    frameDuration: 100,
    loop: true,
  },
  tapping_foot: {
    frames: [0, 1, 2, 3],
    frameDuration: 150,
    loop: true,
  },
};

// Accessory overlay configurations
export interface AccessoryConfig {
  frames: number[];
  frameDuration: number;
  loop: boolean;
  position: { x: number; y: number };  // Offset from Tick's center
}

export const accessoryAnimations: Record<string, AccessoryConfig> = {
  confetti: {
    frames: [0, 1, 2, 3, 4],
    frameDuration: 80,
    loop: false,
    position: { x: 0, y: -20 },
  },
  sparkle: {
    frames: [0, 1, 2],
    frameDuration: 100,
    loop: true,
    position: { x: 10, y: -10 },
  },
  steam: {
    frames: [0, 1],
    frameDuration: 150,
    loop: true,
    position: { x: 0, y: -15 },
  },
  party_hat: {
    frames: [0],
    frameDuration: 0,
    loop: false,
    position: { x: 0, y: -20 },
  },
  sweat_drop: {
    frames: [0],
    frameDuration: 0,
    loop: false,
    position: { x: 15, y: -5 },
  },
  question_mark: {
    frames: [0],
    frameDuration: 0,
    loop: false,
    position: { x: 20, y: -15 },
  },
  exclamation: {
    frames: [0],
    frameDuration: 0,
    loop: false,
    position: { x: 20, y: -15 },
  },
};
```

---

## Sprite Count Summary

### MVP (Minimum Viable Tick)

| Asset | Sprites |
|-------|---------|
| 48x48 Core Expressions (animated) | 58 |
| 64x64 Core Expressions (animated) | 58 |
| 128x128 Core (static/minimal) | 10 |
| 32x32 Core (static) | 10 |
| 16x16 Core (static) | 10 |
| Accessories | 15 |
| **MVP Total** | **~161 sprites** |

### Full Tick

| Asset | Sprites |
|-------|---------|
| 48x48 All Expressions (animated) | 86 |
| 64x64 All Expressions (animated) | 86 |
| 128x128 All (static/minimal) | 20 |
| 256x256 All (animated) | 86 |
| 32x32 All (static) | 20 |
| 16x16 All (static) | 20 |
| Accessories | 15 |
| **Full Total** | **~333 sprites** |

---

## Production Notes

### For Artist/Creator

1. **Start with 64x64** - This is the most visible size and easiest to work with
2. **Create core expressions first** - Get the 10 core expressions done before secondaries
3. **Animation frames should be subtle** - Pixel art shines with small, precise movements
4. **Test at actual size** - Sprites should read clearly at 48x48 and 64x64
5. **Export with transparency** - PNG format, transparent background
6. **Consistent anchor point** - Tick's feet should be at the same position across all frames

### Color Palette Reminder

Keep these colors consistent across all sprites:

```
Clock Body:    #8B6B4F (warm brown)
Clock Face:    #F5F0E1 (cream)
Nose/Details:  #6B4423 (chestnut)
Cheeks:        #E8A0A0 (rosy pink)
Clock Hands:   #4A3728 (dark brown)
```

### Style Reference

- Friendly, rounded shapes
- Clear expressions readable at small sizes
- Pinocchio nose is key identifying feature
- Rosy cheeks add warmth
- Little feet for personality and posing

---

## Implementation Priority

### Phase 1: MVP
1. [ ] 64x64 idle animation (6 frames)
2. [ ] 64x64 core expressions static (10 sprites)
3. [ ] 48x48 versions of above
4. [ ] 32x32 static core expressions
5. [ ] 16x16 favicon variants (idle, happy, concerned, unhinged)

### Phase 2: Animation
1. [ ] Full animations for all core expressions at 64x64
2. [ ] Full animations for all core expressions at 48x48
3. [ ] Accessory overlays (confetti, party hat, steam)

### Phase 3: Secondary Expressions
1. [ ] 10 secondary expressions at 64x64
2. [ ] 10 secondary expressions at 48x48
3. [ ] Static versions at smaller sizes

### Phase 4: Polish
1. [ ] 128x128 versions for modals
2. [ ] 256x256 hero versions
3. [ ] Additional animation polish
4. [ ] Extra accessories and variants
