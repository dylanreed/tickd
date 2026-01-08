# Hinged Mode Design

## Overview

Hinged mode transforms the UI into a standard, professional-looking todo app while preserving the core lying mechanism. The mascot Tick remains fully visible and functional - the deception continues, just wrapped in boring clothes.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | `#F9FAFB` |
| Cards | White | `#FFFFFF` |
| Card borders | Gray | `#E5E7EB` |
| Primary text | Near-black | `#111827` |
| Secondary text | Medium gray | `#6B7280` |
| Accent (buttons, success) | Green | `#10B981` |
| Accent hover | Darker green | `#059669` |

## Typography

- **Headers**: Standard sans-serif (`font-body`), not pixel font
- **Title**: "Tick is a Liar" in regular weight
- **Task titles**: Normal weight, not bold
- **Due dates**: Simple format - "Due Tuesday" or "Due in 3 days", no commentary

## Layout Changes

- **Cards**: `rounded-lg` instead of `rounded-2xl`
- **Buttons**: `rounded-md` instead of `rounded-full`, more compact
- **Spacing**: Tighter, standard app density
- **Overall**: Clean, minimal, productivity-focused

## Component Changes

### TaskCard (hinged)
- White background with thin gray border
- No urgency-based border colors
- Green "Complete" button, gray "Delete" button
- Text-only urgency indicator ("Due soon", "Overdue")
- No animations

### TaskListPage (hinged)
- Light gray background (`bg-gray-50`)
- Header: Sans-serif "Tick is a Liar", no emoji
- Empty state: Simple "No tasks yet" message

### AddTaskForm (hinged)
- White card with gray border
- Standard rectangular inputs
- Green "Add Task" button

### ThemeToggle
- Stays in header, provides escape to unhinged mode
- No changes needed

## What Stays The Same

- **Tick mascot**: Remains colorful and fully functional in corner
- **SpicinessModal**: Accessed via long-press on Tick
- **CompletionModal**: Reveal moment keeps full personality
- **LoginPage, HomePage, OnboardingPage**: Pre-app pages keep brand styling
- **Lying mechanism**: Fake dates still calculated and shown

## Tailwind Classes Reference

New utility classes to add to `tailwind.config.js`:

```js
colors: {
  // Hinged mode neutrals
  'hinged-bg': '#F9FAFB',
  'hinged-card': '#FFFFFF',
  'hinged-border': '#E5E7EB',
  'hinged-text': '#111827',
  'hinged-text-secondary': '#6B7280',
  'hinged-accent': '#10B981',
  'hinged-accent-hover': '#059669',
}
```

## Files to Modify

1. `tailwind.config.js` - Add hinged color palette
2. `src/components/TaskCard.tsx` - Conditional styling
3. `src/pages/TaskListPage.tsx` - Background and header styling
4. `src/components/AddTaskForm.tsx` - Form styling
5. `src/components/ThemeToggle.tsx` - May need visual update

## Design Philosophy

"Wolf in sheep's clothing" - The app looks like any standard todo app in hinged mode, making the lying feel almost clinical. The chaos is hidden until you toggle to unhinged mode or complete a task and see the reveal.
