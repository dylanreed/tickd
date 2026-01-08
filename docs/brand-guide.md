# Liars Todo - Brand Guide

## Brand Overview

**Tagline:** "A todo app that lies to you about deadlines because YOU CAN'T HANDLE THE TRUTH!!!"

**Voice:** Supportive but judgy. Your best friend who's had ENOUGH. Self-aware about being unhinged. Never mean-spirited - always "I'm doing this because I love you."

**Visual Style:** Playful pixel art with warm, cozy colors. Friendly on the surface, chaotic underneath.

---

## Mascot: Tick

Tick is a warm brown pixel art alarm clock with a Pinocchio nose (because he lies). He's cute, expressive, and increasingly unhinged the more you ignore your tasks.

### Tick's Personality
- Supportive but will absolutely roast you
- Gets progressively more dramatic as deadlines approach
- Celebrates your wins genuinely (and with surprise)
- The embodiment of "I'm not mad, I'm just disappointed" (he's mad)

### Tick's Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Clock Body | Warm Brown | `#8B6B4F` |
| Clock Face | Cream | `#F5F0E1` |
| Nose/Details | Chestnut | `#6B4423` |
| Cheeks | Rosy Pink | `#E8A0A0` |
| Clock Hands | Dark Brown | `#4A3728` |
| Feet/Base | Warm Brown | `#8B6B4F` |

### Tick's Expressions

| State | Expression | Description | When Used |
|-------|------------|-------------|-----------|
| Idle | Friendly smile | Default happy face, rosy cheeks | Browsing tasks, no urgency |
| Suspicious | Side-eye smirk | One eyebrow raised, knowing look | Showing fake deadlines |
| Concerned | Worried frown | Eyebrows up, slight frown | Task approaching "due date" |
| Disappointed | Frustrated/pouty | Furrowed brow, small frown | Task overdue (Spice Level 1-2) |
| Judgmental | Staring intensely | Unblinking, staring at user | Task overdue (Spice Level 3) |
| Unhinged | Full chaos face | Wide eyes, frazzled, maybe vibrating | Task overdue (Spice Level 4-5) |
| Celebrating | Party mode | Big smile, maybe confetti, sparkle eyes | Task completed on time |
| Shocked | Dramatic gasp | Wide eyes, open mouth, surprised | Reveal moment ("you finished 2 days early!") |
| Smug | Self-satisfied grin | Knowing smile, "told you so" energy | After successful lie reveal |

---

## App Color Palette: Warm & Cozy Chaos

Soft, inviting pastels that contrast with the unhinged messaging. Like getting yelled at by a Care Bear.

### Primary Colors

| Name | Hex | RGB | Use |
|------|-----|-----|-----|
| Lavender Dream | `#C4B7EB` | 196, 183, 235 | Primary background, cards |
| Soft Peach | `#FFCDB2` | 255, 205, 178 | Secondary background, highlights |
| Mint Whisper | `#B8E0D2` | 184, 224, 210 | Success states, completed tasks |
| Cloud White | `#FFF8F0` | 255, 248, 240 | Text backgrounds, modals |

### Accent Colors

| Name | Hex | RGB | Use |
|------|-----|-----|-----|
| Hot Pink | `#FF5E8A` | 255, 94, 138 | Primary CTA buttons, urgent states, spicy notifications |
| Electric Coral | `#FF7F6B` | 255, 127, 107 | Warnings, overdue indicators |
| Golden Yell | `#FFD166` | 255, 209, 102 | Highlights, badges, celebrations |

### Text & Neutrals

| Name | Hex | RGB | Use |
|------|-----|-----|-----|
| Soft Charcoal | `#3D3D3D` | 61, 61, 61 | Primary text |
| Dusty Purple | `#6B5B7A` | 107, 91, 122 | Secondary text, subtle labels |
| Warm Gray | `#9E9494` | 158, 148, 148 | Disabled states, placeholders |

### Color Usage Examples

**Task Card (Normal):**
- Background: Cloud White `#FFF8F0`
- Border: Lavender Dream `#C4B7EB`
- Text: Soft Charcoal `#3D3D3D`
- Due date: Dusty Purple `#6B5B7A`

**Task Card (Approaching Deadline):**
- Background: Cloud White `#FFF8F0`
- Border: Electric Coral `#FF7F6B`
- Due date: Electric Coral `#FF7F6B` (pulsing)
- Tick expression: Concerned

**Task Card (Overdue):**
- Background: Cloud White `#FFF8F0`
- Border: Hot Pink `#FF5E8A` (pulsing)
- Due date: Hot Pink `#FF5E8A`
- Tick expression: Based on spiciness level

**Task Card (Completed):**
- Background: Mint Whisper `#B8E0D2`
- Checkmark: Hot Pink `#FF5E8A`
- Tick expression: Celebrating

**Completion Reveal Screen:**
- Background: Mint Whisper `#B8E0D2`
- Confetti: Golden Yell `#FFD166` + Hot Pink `#FF5E8A`
- Text: Soft Charcoal `#3D3D3D`
- Tick expression: Shocked → Smug

**Spiciness Slider:**
- Level 1: Mint Whisper `#B8E0D2`
- Level 2: Soft Peach `#FFCDB2`
- Level 3: Golden Yell `#FFD166`
- Level 4: Electric Coral `#FF7F6B`
- Level 5: Hot Pink `#FF5E8A`

---

## Typography

### Recommended Fonts

**Headlines/Display:**
- Primary: **Press Start 2P** (pixel font, Google Fonts)
- Fallback: Any chunky pixel font
- Use for: Logo, major headlines, celebration text

**Body/UI:**
- Primary: **Nunito** (rounded, friendly, Google Fonts)
- Fallback: **Quicksand** or system sans-serif
- Use for: Task text, descriptions, buttons, notifications

**Monospace (optional):**
- **VT323** (pixel-style monospace, Google Fonts)
- Use for: Countdowns, timestamps, "computer" elements

### Font Pairing Example

```
LIARS TODO          <- Press Start 2P, Hot Pink
You can't handle    <- Nunito Bold, Soft Charcoal
the truth.          <- Nunito Bold, Soft Charcoal

Task: Buy groceries <- Nunito Regular, Soft Charcoal
Due: TOMORROW       <- Press Start 2P, Electric Coral
(tick tock)         <- Nunito Italic, Dusty Purple
```

---

## UI Components

### Buttons

**Primary Button:**
- Background: Hot Pink `#FF5E8A`
- Text: Cloud White `#FFF8F0`
- Border: 2px darker pink or pixel border
- Hover: Slightly lighter pink
- Font: Nunito Bold

**Secondary Button:**
- Background: Lavender Dream `#C4B7EB`
- Text: Soft Charcoal `#3D3D3D`
- Border: 2px Dusty Purple
- Hover: Slightly lighter lavender

**Ghost Button:**
- Background: Transparent
- Text: Dusty Purple `#6B5B7A`
- Border: 1px Dusty Purple
- Hover: Light lavender fill

### Cards

- Background: Cloud White `#FFF8F0`
- Border: 2px solid, color based on task state
- Border-radius: 8px (or pixel-perfect corners)
- Shadow: Soft, warm-toned drop shadow
- Pixel art option: 2px stepped border for retro feel

### Notifications/Toasts

- Background: Cloud White `#FFF8F0`
- Border-left: 4px accent color based on urgency
- Include small Tick with appropriate expression
- Pixel-style notification badge for counts

### The Spiciness Slider

Visual representation of the 5 spiciness levels:

```
🌶️ How mean should I be?

[1]----[2]----[3]----[4]----[5]
 😊     😐     😤     🤬     💀

Gentle                    Unhinged
```

- Slider track: Gradient from Mint to Hot Pink
- Slider thumb: Small Tick face that changes expression
- Labels below: "Gentle" to "Unhinged"

---

## Iconography

### Style
- Pixel art, 16x16 or 32x32 base size
- Consistent line weight (1-2 pixels)
- Warm color palette matching brand
- Slightly rounded, friendly shapes

### Core Icons Needed
- [ ] Checkbox (empty)
- [ ] Checkbox (checked) - with small celebration sparkle
- [ ] Plus/Add
- [ ] Settings/Gear
- [ ] Calendar
- [ ] Clock
- [ ] Bell/Notification
- [ ] Flame/Fire (for spiciness)
- [ ] Star (for reliability score)
- [ ] Trash
- [ ] Edit/Pencil
- [ ] Close/X

### Tick Variants Needed
- [ ] Tick idle (default)
- [ ] Tick suspicious
- [ ] Tick concerned
- [ ] Tick disappointed
- [ ] Tick judgmental
- [ ] Tick unhinged
- [ ] Tick celebrating
- [ ] Tick shocked
- [ ] Tick smug
- [ ] Tick mini (for small UI elements, 16x16)

---

## Animation Guidelines

### Tick Animations
- **Idle:** Subtle breathing/bobbing motion
- **Suspicious:** Eyes shift side to side
- **Concerned:** Slight tremble
- **Unhinged:** Vibrating intensely, maybe steam from ears
- **Celebrating:** Bouncing, confetti explosion
- **Shocked:** Jump back, eyes go wide

### UI Animations
- **Task complete:** Checkbox bounce + small confetti burst
- **Overdue pulse:** Border gently pulses (Hot Pink glow)
- **Notification enter:** Slide in from right with small bounce
- **Reveal moment:** Dramatic pause, then number flip animation showing real vs fake date

### Timing
- UI transitions: 200-300ms ease-out
- Tick expression changes: 150ms
- Celebration animations: 500-800ms
- Keep it snappy - ADHD users don't want to wait

---

## Voice & Tone Examples by Spiciness Level

### Level 1: Gentle
- Tick expression: Friendly smile or slight concern
- Color accents: Mint, soft peach
- Copy examples:
  - "oh no baby what is you doing"
  - "This task is overdue. No judgment. Okay, a little judgment."

### Level 2: Pointed
- Tick expression: Concerned, slightly disappointed
- Color accents: Peach, light coral
- Copy examples:
  - "Overdue. Per my last three notifications."
  - "the deadline came. the deadline went. you did not."

### Level 3: Disappointed Parent
- Tick expression: Disappointed, judgmental stare
- Color accents: Golden yellow, coral
- Copy examples:
  - "I have asked you ONE thing. ONE THING."
  - "Overdue. I expected more from you, honestly."

### Level 4: Unfiltered Chaos
- Tick expression: Frazzled, wide-eyed, slightly unhinged
- Color accents: Coral, hot pink
- Copy examples:
  - "THE AUDACITY. THE UNMITIGATED GALL."
  - "I am BEGGING you. On my KNEES."

### Level 5: Maximum Violence
- Tick expression: Full chaos mode, possibly on fire
- Color accents: Hot pink, pulsing
- Copy examples:
  - "I AM NEVER GOING TO FINANCIALLY RECOVER FROM THIS."
  - "I'm DMing all your exes about this."

---

## Asset Specifications

### Logo Sizes
- Full logo: 512x512 (max)
- App icon: 180x180 (iOS), 512x512 (Android)
- Favicon: 32x32, 16x16
- Social avatar: 400x400

### Social Media Sizes
- Twitter header: 1500x500
- Twitter post image: 1200x675
- Open Graph: 1200x630
- Product Hunt: 1270x760

### App Screenshots (for stores/marketing)
- Mobile: 1284x2778 (iPhone 14 Pro Max)
- Tablet: 2048x2732 (iPad Pro)
- Desktop: 1920x1080

---

## Do's and Don'ts

### Do
- Use Tick to deliver personality and feedback
- Let the contrast between cute visuals and unhinged copy create humor
- Keep interactions snappy and responsive
- Celebrate wins genuinely (the app wants you to succeed)
- Use Hot Pink for important actions and urgent states

### Don't
- Make the app feel genuinely mean or hostile
- Use too many colors at once - stick to the palette
- Let animations slow down the experience
- Forget that the target user has ADHD - respect their attention
- Use Tick's unhinged expressions for non-urgent states (earn the drama)

---

## Quick Reference: Color Codes

```css
:root {
  /* Primary */
  --lavender-dream: #C4B7EB;
  --soft-peach: #FFCDB2;
  --mint-whisper: #B8E0D2;
  --cloud-white: #FFF8F0;

  /* Accents */
  --hot-pink: #FF5E8A;
  --electric-coral: #FF7F6B;
  --golden-yell: #FFD166;

  /* Text */
  --soft-charcoal: #3D3D3D;
  --dusty-purple: #6B5B7A;
  --warm-gray: #9E9494;

  /* Tick */
  --tick-body: #8B6B4F;
  --tick-face: #F5F0E1;
  --tick-nose: #6B4423;
  --tick-cheeks: #E8A0A0;
}
```
