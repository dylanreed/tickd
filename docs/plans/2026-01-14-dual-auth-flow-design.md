# Dual Auth Flow Design

## Problem

When Tickd is installed as a PWA, magic link authentication opens in the browser instead of the PWA window. Users have to manually switch back to the app after authenticating.

## Solution

Support both magic link and OTP code authentication. Auto-detect PWA vs browser and default to the best option for each context, while still allowing users to switch.

## User Flow

### Browser users (default: magic link)
1. User enters email
2. Clicks "LIE TO ME" (sends magic link)
3. Small text below: "Using the app? Send a code instead"
4. If clicked → sends 6-digit code, transitions to code entry screen

### PWA users (default: code)
1. User enters email
2. Clicks "LIE TO ME" (sends 6-digit code)
3. Small text below: "Prefer a magic link?"
4. Transitions to code entry screen
5. User enters code, auto-submits at 6 digits, authenticated

## PWA Detection

```typescript
const isPWA = window.matchMedia('(display-mode: standalone)').matches
```

## Code Entry Screen

- "Check your email" message with email address shown
- Single text input for 6-digit code (numeric keyboard on mobile)
- Auto-submit when 6 digits entered
- "Resend code" link
- "Back" link to return to email entry
- Inline error messages for invalid/expired codes

## State Machine

```
'email' → user enters email
    ↓ (send magic link) → 'magic-link-sent' → done, wait for redirect
    ↓ (send code) → 'code-entry' → user enters code
                        ↓ (success) → authenticated
                        ↓ (error) → show error, stay on screen
                        ↓ (resend) → send new code, stay on screen
                        ↓ (back) → return to 'email'
```

## Technical Implementation

### AuthContext changes
- Add `signInWithCode(email)` - calls `signInWithOtp({ email })` without redirect
- Add `verifyCode(email, code)` - calls `verifyOtp({ email, token: code, type: 'email' })`
- Keep existing `signIn(email)` for magic link flow

### Files to modify
- `src/contexts/AuthContext.tsx` - add new methods
- `src/pages/LoginPage.tsx` - add state machine, code entry screen, PWA detection

## Error Handling

- Invalid code: "That code didn't work. Check it and try again."
- Expired code: "Code expired. Request a new one."
- Rate limited: Show Supabase error message
- Manual resend via "Resend code" link
