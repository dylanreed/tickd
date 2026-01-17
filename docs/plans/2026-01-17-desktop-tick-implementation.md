# Desktop Tick Companion — Implementation Plan

**Feature:** Native Mac app bringing Tick to the desktop
**Date:** 2026-01-17
**Complexity:** HIGH
**Estimated Hours:** 60-80 hours
**Prerequisites:** Web app stable, Supabase real-time working

---

## Overview

This is a new application, not a feature within the existing web app. Requires Tauri setup, Rust backend, and coordination with the existing Supabase backend.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Tauri 2.0 |
| Backend | Rust |
| Frontend | React + TypeScript (reuse web components) |
| Styling | Tailwind CSS |
| State | Zustand (match web app) |
| Sync | Supabase Realtime (WebSocket) |
| Auth | Supabase + macOS Keychain |
| Notifications | macOS native via `tauri-plugin-notification` |
| Shortcuts | `tauri-plugin-global-shortcut` |

### Repository Structure

```
tickd-desktop/
├── src-tauri/           # Rust backend
│   ├── src/
│   │   ├── main.rs
│   │   ├── lib.rs
│   │   ├── commands/    # Tauri commands
│   │   ├── sync/        # WebSocket sync
│   │   ├── activity/    # Activity detection
│   │   └── keychain/    # Auth storage
│   ├── Cargo.toml
│   └── tauri.conf.json
├── src/                 # React frontend
│   ├── components/
│   │   ├── Tick/        # Sprite + animations
│   │   ├── Widget/      # Morphing widget
│   │   └── QuickAdd/    # Quick add flow
│   ├── hooks/
│   ├── stores/
│   └── App.tsx
├── package.json
└── README.md
```

---

## Implementation Phases

### Phase 1: Project Setup (4-6 hours)

**Goal:** Basic Tauri app running with transparent window

**Tasks:**

1. Initialize Tauri project with React template
   ```bash
   npm create tauri-app@latest tickd-desktop -- --template react-ts
   ```

2. Configure tauri.conf.json:
   - Set window transparent
   - Set always-on-top
   - Disable decorations (frameless)
   - Set initial size (~100x100)
   - Enable macOS-specific features

3. Set up shared dependencies:
   - Copy Tailwind config from web app
   - Install Zustand, Supabase client
   - Set up path aliases matching web app

4. Create basic App shell with Tailwind working

**Files to create:**
- `src-tauri/tauri.conf.json`
- `src-tauri/src/main.rs`
- `src/App.tsx`
- `tailwind.config.js`
- `package.json`

**Verification:** Transparent, frameless window appears on screen

---

### Phase 2: Tick Sprite Rendering (6-8 hours)

**Goal:** Tick sprite visible with basic idle animation

**Tasks:**

1. Copy sprite assets from web app:
   - `tick_states.afphoto` exports
   - All sprite sheet PNGs
   - Animation timing data

2. Create TickSprite component:
   - Port existing web TickSprite logic
   - Adapt for smaller display size
   - Ensure crisp rendering at small sizes

3. Implement basic state machine:
   - idle, working, resting states
   - Smooth transitions between states
   - Frame timing for animations

4. Add cursor tracking for "curious" state:
   - Track mouse position via Tauri
   - Tick's eyes follow cursor near window
   - Subtle head tilt animation

**Files to create:**
- `src/components/Tick/TickSprite.tsx`
- `src/components/Tick/TickAnimations.ts`
- `src/components/Tick/states.ts`
- `src/hooks/useTickState.ts`
- `src/assets/sprites/` (copied from web)

**Reuse from web app:**
- Sprite sheet structure
- Animation timing constants
- State definitions

**Verification:** Tick animates on screen, eyes track cursor

---

### Phase 3: Window Behavior (4-6 hours)

**Goal:** Draggable, positionable window with proper behavior

**Tasks:**

1. Implement window dragging:
   - Click and drag on Tick to move window
   - Save position to local storage
   - Restore position on launch

2. Handle multiple displays:
   - Detect display configuration
   - Save position per display setup
   - Handle display disconnect gracefully

3. Implement show/hide:
   - Minimize to menu bar (if enabled)
   - Show/hide via global shortcut
   - Fade in/out animations

4. Full screen app behavior:
   - Detect full screen apps
   - Auto-hide Tick (configurable)
   - Restore when exiting full screen

**Files to create:**
- `src-tauri/src/commands/window.rs`
- `src/hooks/useWindowPosition.ts`
- `src/stores/windowStore.ts`

**Verification:** Drag Tick around, position persists across restarts

---

### Phase 4: Morphing Widget (8-10 hours)

**Goal:** Widget expands/collapses smoothly with contextual content

**Tasks:**

1. Implement morph trigger:
   - Hover detection (500ms delay)
   - Click to toggle
   - Escape to collapse
   - Click outside to collapse

2. Create expand animation:
   - Tick slides to side
   - Panel grows from behind
   - Smooth 200ms transition
   - Resize window during animation

3. Build widget panel structure:
   - Header with current context
   - Content area (contextual)
   - Action buttons
   - Compact, information-dense design

4. Implement contextual content:
   - Idle state: upcoming tasks, Pick For Me
   - Working state: current task, timer, actions
   - Overdue state: overdue list, urgency
   - Session state: timer, controls

5. Style for dark/light mode:
   - Match web app theming
   - Respect macOS appearance setting
   - Smooth theme transitions

**Files to create:**
- `src/components/Widget/Widget.tsx`
- `src/components/Widget/WidgetPanel.tsx`
- `src/components/Widget/WidgetHeader.tsx`
- `src/components/Widget/WidgetContent.tsx`
- `src/components/Widget/contexts/IdleContent.tsx`
- `src/components/Widget/contexts/WorkingContent.tsx`
- `src/components/Widget/contexts/OverdueContent.tsx`
- `src/hooks/useMorph.ts`
- `src/hooks/useWidgetContext.ts`

**Verification:** Hover/click expands widget, shows correct content per state

---

### Phase 5: Supabase Sync (8-10 hours)

**Goal:** Real-time bidirectional sync with web app

**Tasks:**

1. Set up Supabase client in Tauri:
   - Configure for Rust or JS client
   - Handle auth token from Keychain
   - Manage connection lifecycle

2. Implement real-time subscriptions:
   - Subscribe to tasks table changes
   - Subscribe to profile changes
   - Subscribe to timer_sessions (if exists)
   - Handle reconnection gracefully

3. Build local state cache:
   - Mirror relevant data locally
   - Handle offline mode
   - Queue changes when offline
   - Replay queue on reconnect

4. Implement sync actions:
   - Create task → sync to server
   - Complete task → sync + trigger celebration
   - Start/stop timer → sync both ways
   - Settings changes → sync

5. Handle conflict resolution:
   - Last-write-wins with timestamps
   - Notify user of conflicts (optional)

**Files to create:**
- `src-tauri/src/sync/mod.rs`
- `src-tauri/src/sync/realtime.rs`
- `src-tauri/src/sync/offline.rs`
- `src/stores/syncStore.ts`
- `src/hooks/useSync.ts`
- `src/hooks/useTasks.ts` (desktop version)

**Verification:** Create task on desktop, appears on web. Complete on web, desktop celebrates.

---

### Phase 6: Authentication (4-6 hours)

**Goal:** Secure auth flow using web app login

**Tasks:**

1. Implement device linking flow:
   - Generate link code on desktop
   - Enter code in web app to authorize
   - Web app generates device token
   - Desktop receives and stores token

2. Keychain integration:
   - Store token in macOS Keychain
   - Retrieve on app launch
   - Handle token refresh
   - Secure deletion on sign out

3. Build auth UI:
   - "Link to web app" screen
   - Show link code
   - Loading/success/error states
   - "Sign out" option in settings

4. Handle auth errors:
   - Token expired → prompt re-link
   - Invalid token → clear and re-link
   - Network error → retry with backoff

**Files to create:**
- `src-tauri/src/keychain/mod.rs`
- `src-tauri/src/commands/auth.rs`
- `src/components/Auth/LinkDevice.tsx`
- `src/stores/authStore.ts`

**Web app changes:**
- Add device linking endpoint
- Generate secure device tokens
- Device management UI in settings

**Verification:** Link desktop to web account, token persists across restarts

---

### Phase 7: Quick Actions (6-8 hours)

**Goal:** Quick add, timer controls, task actions

**Tasks:**

1. Implement quick add:
   - Input field appears near Tick
   - Type task name
   - Tab to add deadline (optional)
   - Enter to save, Escape to cancel
   - Confirmation animation

2. Build timer controls:
   - Start/pause/stop buttons
   - Time display in widget
   - "Just 5 Minutes" quick start
   - Timer state synced with web

3. Implement task actions:
   - Mark complete from widget
   - Start task from list
   - "Pick For Me" trigger
   - Snooze overdue

4. Add confirmation feedback:
   - Tick reactions to actions
   - Toast messages
   - Sound effects (optional)

**Files to create:**
- `src/components/QuickAdd/QuickAdd.tsx`
- `src/components/QuickAdd/QuickAddInput.tsx`
- `src/components/Timer/TimerControls.tsx`
- `src/components/Timer/TimerDisplay.tsx`
- `src/components/Actions/TaskActions.tsx`
- `src/hooks/useQuickAdd.ts`
- `src/hooks/useTimer.ts`

**Verification:** Quick add task, start timer, complete task — all from desktop

---

### Phase 8: Global Shortcuts (4-6 hours)

**Goal:** System-wide keyboard shortcuts

**Tasks:**

1. Set up shortcut plugin:
   ```bash
   cargo add tauri-plugin-global-shortcut
   ```

2. Implement default shortcuts:
   - `⌘+Shift+T`: Quick add
   - `⌘+Shift+P`: Pick For Me
   - `⌘+Shift+5`: Just 5 Minutes
   - `⌘+Shift+Space`: Start/pause timer
   - `⌘+Shift+D`: Mark done
   - `⌘+Shift+.`: Show/hide Tick

3. Build shortcut settings UI:
   - List current shortcuts
   - Click to rebind
   - Conflict detection
   - Reset to defaults

4. Handle shortcut conflicts:
   - Detect system conflicts
   - Warn user
   - Fallback options

**Files to create:**
- `src-tauri/src/commands/shortcuts.rs`
- `src/components/Settings/ShortcutSettings.tsx`
- `src/stores/shortcutStore.ts`

**Verification:** Global shortcuts work from any app

---

### Phase 9: Menu Bar Integration (4-6 hours)

**Goal:** System tray / menu bar presence

**Tasks:**

1. Add system tray:
   - Tick icon in menu bar
   - Click to show dropdown
   - Right-click for context menu

2. Build dropdown menu:
   - Current task display
   - Quick stats
   - Quick action buttons
   - "Summon Tick" option
   - Settings access
   - Quit option

3. Implement menu bar modes:
   - Floating only (no tray)
   - Menu bar only (no floating)
   - Both (independent)
   - Persist preference

4. Handle interactions:
   - Click menu bar → dropdown
   - "Summon Tick" → show floating
   - Action buttons → execute + close dropdown

**Files to create:**
- `src-tauri/src/tray/mod.rs`
- `src-tauri/src/tray/menu.rs`
- `src/components/MenuBar/MenuDropdown.tsx`
- `src/stores/menuBarStore.ts`

**Verification:** Menu bar icon works, dropdown shows correct info

---

### Phase 10: Native Notifications (4-6 hours)

**Goal:** macOS notification center integration

**Tasks:**

1. Set up notification plugin:
   ```bash
   cargo add tauri-plugin-notification
   ```

2. Request notification permission:
   - Prompt on first critical alert
   - Handle permission denied
   - Settings to re-prompt

3. Implement notification types:
   - Critical (hard deadlines): native + sound
   - Urgent (overdue, warnings): native
   - Standard (milestones): in-app only
   - Soft (encouragement): in-app only

4. Add notification actions:
   - "Open Tickd" → bring up web app
   - "Mark Done" → complete task
   - "Snooze" → delay reminder

5. Coordinate with web app:
   - Don't double-notify
   - Desktop handles alerts when running
   - Web app handles when desktop closed

**Files to create:**
- `src-tauri/src/commands/notifications.rs`
- `src/hooks/useNotifications.ts`
- `src/services/notificationCoordinator.ts`

**Verification:** Deadline approaches, native notification appears with actions

---

### Phase 11: Activity Awareness (6-8 hours)

**Goal:** Detect user activity patterns, provide contextual nudges

**Tasks:**

1. Implement activity detection:
   - Track active application (via Accessibility API)
   - Track idle time
   - Track app switching frequency
   - Privacy-conscious: no content, just app names

2. Request Accessibility permission:
   - Explain why needed
   - Handle permission flow
   - Graceful degradation if denied

3. Build activity analysis:
   - Same app too long → break nudge
   - Rapid switching → focus nudge
   - Long idle → check-in
   - Working without task → tracking prompt

4. Implement nudge delivery:
   - In-app toast for soft nudges
   - Tick expression changes
   - Optional native notification
   - Respect "do not disturb" periods

5. Add activity settings:
   - Enable/disable activity awareness
   - Adjust thresholds
   - Quiet hours configuration

**Files to create:**
- `src-tauri/src/activity/mod.rs`
- `src-tauri/src/activity/detector.rs`
- `src-tauri/src/activity/analyzer.rs`
- `src/hooks/useActivity.ts`
- `src/components/Nudges/ActivityNudge.tsx`
- `src/stores/activityStore.ts`

**Verification:** Work in one app for 2 hours, receive break nudge

---

### Phase 12: Idle Animations (4-6 hours)

**Goal:** Full animation state machine with contextual behavior

**Tasks:**

1. Implement animation states:
   - Working (typing animation)
   - Watching (observing user)
   - Resting (relaxed, slow breathing)
   - Curious (tracking cursor)
   - Bored (yawns, stretches)
   - Celebrating (task complete)
   - Concerned (overdue tasks)
   - Urgent (deadline approaching)

2. Build state transition logic:
   - User activity → working/watching
   - No activity 5+ min → resting
   - Cursor near Tick → curious
   - Long idle → bored
   - Task complete → celebrating
   - Overdue exists → concerned
   - Deadline soon → urgent

3. Add ambient reactions:
   - Eyes follow cursor briefly
   - Startle on click nearby
   - Nod on long typing
   - Glance on app switch

4. Implement time-of-day awareness:
   - Morning: energetic
   - Afternoon: normal
   - Evening: sleepy
   - Late night: concerned

**Files to create:**
- `src/components/Tick/AnimationStateMachine.ts`
- `src/components/Tick/states/WorkingState.ts`
- `src/components/Tick/states/RestingState.ts`
- `src/components/Tick/states/CuriousState.ts`
- (etc. for each state)
- `src/hooks/useAnimationState.ts`

**Verification:** Tick behavior changes naturally based on context

---

### Phase 13: Settings Panel (4-6 hours)

**Goal:** Comprehensive settings UI

**Tasks:**

1. Build settings window:
   - Opens from menu bar or right-click
   - Separate window (not in widget)
   - Tabbed interface

2. Implement setting categories:
   - **Appearance:** size, position, mode, launch at login
   - **Behavior:** activity awareness, nudges, time-of-day
   - **Alerts:** notification types, sounds
   - **Shortcuts:** customize hotkeys
   - **Account:** linked account, sign out

3. Persist settings:
   - Store in app data directory
   - Sync relevant settings to web app
   - Handle settings migration

4. Add "About" section:
   - Version info
   - Link to web app
   - Link to support

**Files to create:**
- `src/components/Settings/SettingsWindow.tsx`
- `src/components/Settings/AppearanceSettings.tsx`
- `src/components/Settings/BehaviorSettings.tsx`
- `src/components/Settings/AlertSettings.tsx`
- `src/components/Settings/AccountSettings.tsx`
- `src/stores/settingsStore.ts`

**Verification:** All settings functional, persist across restarts

---

### Phase 14: Copy Integration (4-6 hours)

**Goal:** All Tick copy working with spiciness levels

**Tasks:**

1. Port copy system from web:
   - Copy selection logic
   - Spiciness level filtering
   - Random selection within level

2. Create desktop-specific copy files:
   - `desktopLaunchMessages.ts`
   - `activityNudgeMessages.ts`
   - `quickAddMessages.ts`
   - `connectionMessages.ts`
   - `timeOfDayMessages.ts`

3. Integrate copy with components:
   - Toast messages use copy system
   - Tick "speech" bubbles (if implemented)
   - Notification text

4. Sync spiciness from web app:
   - Use profile spiciness setting
   - React to changes in real-time

**Files to create:**
- `src/data/desktopCopy/index.ts`
- `src/data/desktopCopy/launchMessages.ts`
- `src/data/desktopCopy/activityNudges.ts`
- `src/data/desktopCopy/quickAddMessages.ts`
- `src/data/desktopCopy/connectionMessages.ts`
- `src/data/desktopCopy/timeOfDayMessages.ts`
- `src/hooks/useCopy.ts`

**Verification:** Messages appear at correct spiciness level, match web behavior

---

### Phase 15: Polish & Performance (6-8 hours)

**Goal:** Production-ready polish

**Tasks:**

1. Performance optimization:
   - Profile memory usage (<50MB target)
   - Profile CPU at idle (<1% target)
   - Throttle animations on battery
   - Optimize sprite rendering

2. Animation polish:
   - Smooth all transitions
   - Consistent timing curves
   - No janky frames
   - Test on older Macs

3. Error handling:
   - Graceful degradation for all failures
   - User-friendly error messages
   - Crash reporting (Sentry?)

4. Edge case handling:
   - Multiple monitors
   - Display connect/disconnect
   - Sleep/wake
   - Low memory
   - Network flakiness

5. App signing & notarization:
   - Apple Developer certificate
   - Notarization for distribution
   - Auto-update system

**Files to modify:**
- Various performance optimizations
- Error boundary components
- Crash reporting integration

**Verification:** App runs smooth, handles all edge cases gracefully

---

## Implementation Order

| Phase | Name | Hours | Dependencies |
|-------|------|-------|--------------|
| 1 | Project Setup | 4-6 | None |
| 2 | Tick Sprite Rendering | 6-8 | Phase 1 |
| 3 | Window Behavior | 4-6 | Phase 2 |
| 4 | Morphing Widget | 8-10 | Phase 3 |
| 5 | Supabase Sync | 8-10 | Phase 1 |
| 6 | Authentication | 4-6 | Phase 5 |
| 7 | Quick Actions | 6-8 | Phase 4, 5 |
| 8 | Global Shortcuts | 4-6 | Phase 7 |
| 9 | Menu Bar Integration | 4-6 | Phase 4 |
| 10 | Native Notifications | 4-6 | Phase 5, 6 |
| 11 | Activity Awareness | 6-8 | Phase 3 |
| 12 | Idle Animations | 4-6 | Phase 2 |
| 13 | Settings Panel | 4-6 | Phase 8-11 |
| 14 | Copy Integration | 4-6 | Phase 4, 7 |
| 15 | Polish & Performance | 6-8 | All |

**Total: 60-80 hours**

---

## Parallel Work Streams

Can be developed in parallel by different people:

**Stream A (Rust/Backend):**
- Phase 1, 5, 6, 8, 10, 11 (setup, sync, auth, shortcuts, notifications, activity)

**Stream B (React/Frontend):**
- Phase 2, 3, 4, 7, 12, 13, 14 (sprites, widget, actions, animations, settings, copy)

**Integration points:**
- Phase 6 (auth) needs web app changes
- Phase 5 (sync) needs both streams
- Phase 15 (polish) needs everything

---

## Web App Changes Required

Minimal changes to support desktop:

1. **Device linking API:**
   - `POST /api/devices/link` - generate link code
   - `POST /api/devices/authorize` - authorize device
   - `DELETE /api/devices/:id` - revoke device

2. **Device management UI:**
   - Settings page shows linked devices
   - Ability to revoke devices
   - Last active timestamp

3. **Notification coordination:**
   - Track if desktop is active
   - Route notifications appropriately

**Estimated additional: 4-6 hours**

---

## Testing Strategy

1. **Unit tests:**
   - State machine logic
   - Sync conflict resolution
   - Copy selection

2. **Integration tests:**
   - Auth flow end-to-end
   - Sync round-trip
   - Notification delivery

3. **Manual testing:**
   - All animation states
   - Edge cases (multiple monitors, sleep/wake)
   - Performance on different Macs

4. **Beta testing:**
   - Internal dogfooding first
   - Limited beta before public release

---

## Future Considerations

Not in v1, but architected for:

- Windows/Linux ports (Tauri supports them)
- iOS companion app
- Apple Watch integration
- Shortcuts app actions
- Screen time integration
