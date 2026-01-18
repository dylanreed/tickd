# TICKD LAUNCH CHECKLIST

## ~~CRITICAL~~ - All Fixed

### 1. ~~Wire up Time Estimation tracking~~ DONE
- `useTaskEstimation` hook now wired up in TaskListPage
- Focus tracking starts when user uses 5 min timer, body doubling, or warmup
- `actual_minutes` populated from elapsed time when task is completed

### 2. ~~Wire up Time Alerts~~ DONE
- `useTimeAlerts` hook now wired up in TaskListPage
- `TimeAlertToast` component rendered when alerts fire
- Respects `milestone_alerts` and `estimate_alerts_enabled` settings

### 3. ~~Connect Brain State → Spiciness~~ DONE
- `getEffectiveSpicyLevel()` now called to adjust spiciness based on brain state
- All components now receive `effectiveSpicyLevel` instead of raw `spicyLevel`
- "Brain State Adjusts Spiciness" toggle now functional

### 4. ~~Make Deadline Visuals work~~ DONE
- `DeadlineIndicator` now accepts `visualStyle` prop
- Component uses setting to determine visual style independent of app theme

---

## ~~IMPORTANT~~ - All Fixed

### 5. ~~Render EnvironmentCheck component~~ DONE
- Now rendered in transition flow between prompt and ritual
- Respects `environment_checklist` profile setting

### 6. ~~Verify database sync~~ DONE
- `daily_checkins` now syncs to database via `useDailyCheckin` hook
- `time_sessions` now syncs to database via `useTaskEstimation` hook
- Sessions persist across page refreshes and devices

### 7. ~~Clean up orphaned components~~ DONE
- `FiveMinutesCheckpoint.tsx` - now rendered on phase transitions
- `WarmupComplete.tsx` - now rendered when warmup streak completes
- `FiveMinutesButton.tsx` - intentionally unused (buttons in TaskCard instead)

---

## POLISH (Nice to have)

### 8. Remove unused database columns
- `ambient_timer_enabled`, `milestone_alerts`, `auto_pause_tracking`, `day_start_time` defined but never used

### 9. Newsletter signup is placeholder
- LandingPage email capture doesn't connect to anything

### 10. Test all settings toggles end-to-end
- Master toggle `time_tools_enabled` not consistently checked

### 11. Fix AddTaskForm test
- Test uses hardcoded past date (2026-01-15) that fails HTML5 validation

---

## ALREADY WORKING

- Pick For Me / Single Task Escalation / Earn-out progress
- Daily Check-in Modal (shows, records state)
- Transition Help flow (prompt → environment check → ritual → countdown)
- Just 5 Minutes timer with checkpoints
- Task Shrinking / Micro-steps
- Body Doubling sessions
- Momentum Builder / Warmup queue with completion celebration
- Theme toggle (hinged/unhinged)
- Spiciness slider (now adjusts based on brain state)
- All the one-liners/messages
