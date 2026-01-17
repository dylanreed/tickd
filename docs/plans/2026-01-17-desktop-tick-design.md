# Desktop Tick Companion — Design Document

**Feature:** Native Mac app bringing Tick to the desktop as a persistent companion
**Date:** 2026-01-17
**Status:** Draft

---

## Overview

A native Mac application that brings Tick out of the browser and onto your desktop. Lives in the corner of your screen, syncs with the web app in real-time, and provides accountability, alerts, and quick actions while you work in any application.

**Tech stack:** Tauri (Rust backend, web view frontend — reuses existing sprite/animation code)

**Core features:**

| Feature | Description |
|---------|-------------|
| Floating sprite | Tick lives in corner, transparent background, always-on-top |
| Morphing widget | Expands on hover/click to show contextual info and actions |
| Real-time sync | WebSocket connection keeps desktop and web app in sync |
| Native alerts | Critical notifications via macOS notification center |
| Activity awareness | Notices time passing, offers nudges when helpful |
| Idle animations | Tick feels alive — working, resting, curious based on context |
| Global hotkeys | Quick actions without touching the mouse |
| Menu bar option | Dock Tick in menu bar, summon on demand |

**Platform:** macOS only (initial release)

**Design principle:** Present but not annoying. Helpful when needed. Feels like a companion, not a nag.

---

## Visual Design & Morphing

### Floating Sprite (Default State)

- Tick sprite only, transparent background, no window chrome
- Small footprint: ~80-100px
- Always-on-top but click-through when not interacting
- Positioned in corner (user can drag anywhere)
- Subtle idle animations running

### Morphing Behavior

**Trigger:** Hover for 500ms or single click

**Expand animation:**
- Tick slides to one side
- Widget panel grows out from behind Tick
- Smooth ~200ms transition

**Collapse trigger:**
- Click outside widget
- Press Escape
- Mouse leaves for 2 seconds
- After completing an action (optional setting)

### Widget Sizes

| Mode | Size | Content |
|------|------|---------|
| Collapsed | ~80px | Just Tick |
| Expanded | ~280px wide | Tick + contextual panel |
| Full panel | ~350px wide | Full control panel (optional) |

### Contextual Widget Content

Widget shows different info based on current state:

| State | What's shown |
|-------|--------------|
| **Working** (timer active) | Current task, elapsed time, pause/complete buttons |
| **Idle** (no active task) | Next 2-3 upcoming tasks, "Start" buttons, "Pick For Me" |
| **Overdue tasks exist** | Overdue count, most urgent task, "Do it now" prompt |
| **In focus session** | Timer countdown, "I need more time" / "Done" buttons |
| **Body doubling active** | Session timer, encouragement, Tick working animation |
| **Break time** | "You've been at it X hours", stretch reminder |

---

## Idle Animations & Tick Behavior

### Animation States

Tick cycles through states based on context:

| State | Trigger | Animation |
|-------|---------|-----------|
| **Working** | User has active task/timer | Tick typing, writing, focused expression |
| **Watching** | User working, no tickd task active | Tick observing, occasional glances at user |
| **Resting** | Low activity for 5+ min | Tick relaxed, slower breathing, maybe napping |
| **Curious** | Cursor passes nearby | Tick tracks cursor, head tilts, alert expression |
| **Bored** | Long idle, no interaction | Tick yawns, stretches, looks around |
| **Celebrating** | Task just completed | Tick happy dance, confetti moment |
| **Concerned** | Overdue tasks, missed deadlines | Tick worried expression, occasional glances at user |
| **Urgent** | Critical deadline approaching | Tick anxious, more active movement |

### Ambient Reactions

Small responses that make Tick feel alive:

- **Cursor passes by:** Tick's eyes follow briefly
- **Click near Tick:** Small startle, then settles
- **Long typing detected:** Tick nods approvingly
- **App switch detected:** Tick glances at the change
- **Nothing happening:** Occasional fidget, yawn, stretch

### Time-of-Day Awareness

Optional feature:
- Morning: Tick more energetic, coffee animation
- Afternoon: Normal state
- Evening: Tick getting sleepy
- Late night: Tick concerned you're still working

### Spiciness Affects Animations

| Level | Animation vibe |
|-------|----------------|
| 1-2 | Gentle, supportive expressions |
| 3 | Normal range |
| 4-5 | More dramatic reactions, exaggerated expressions |

---

## Alerts & Notifications

### Alert Types

| Type | Delivery | Example |
|------|----------|---------|
| **Critical** | Native macOS | Hard deadline reached, time's up |
| **Urgent** | Native + Tick bounce | 5 minutes left, overdue task |
| **Standard** | Tick animation + toast | Time milestone, session end |
| **Soft** | Tick expression only | Encouragement, check-in |

### Native macOS Notifications

Used for:
- Hard deadline warnings (15 min, 5 min, time's up)
- Severely overdue tasks (user-configurable threshold)
- Daily check-in reminder (if enabled)
- Session end for "need to leave" deadlines

Notification actions:
- "Open Tickd" — brings up web app
- "Snooze 5 min" — delays reminder
- "Mark Done" — quick complete from notification

### In-App Alerts

**Tick bounce:** Tick hops or vibrates to get attention

**Expression shift:** Tick's face changes to match alert urgency

**Toast popup:** Small message appears near Tick, auto-dismisses

**Widget flash:** If expanded, relevant section highlights

### Activity-Based Nudges

When enabled, Tick notices:

| Detection | Nudge |
|-----------|-------|
| Same app for 2+ hours | "You've been in [app] for 2 hours. Break?" |
| No tickd task but actively working | "Working on something? Want to track it?" |
| Idle for 30+ min | "You've been quiet. Taking a break?" |
| Rapid app switching | "Scattered? Want me to pick a task for you?" |

All nudges respect spiciness level and can be disabled.

---

## Quick Actions & Interactions

### Click Actions

**Single click on Tick:** Expand/collapse widget

**Double click on Tick:** Quick action menu (configurable default)

**Right click on Tick:** Context menu (settings, quit, open web app)

**Click + drag:** Reposition Tick anywhere on screen

### Global Keyboard Shortcuts

User-configurable, suggested defaults:

| Shortcut | Action |
|----------|--------|
| `⌘ + Shift + T` | Quick add task |
| `⌘ + Shift + P` | Pick For Me |
| `⌘ + Shift + 5` | Start "Just 5 Minutes" |
| `⌘ + Shift + Space` | Start/pause timer |
| `⌘ + Shift + D` | Mark current task done |
| `⌘ + Shift + .` | Show/hide Tick |

### Quick Add Flow

Triggered by hotkey or widget button:

1. Small input field appears near Tick
2. Type task name
3. Optional: Tab to add deadline
4. Enter to save
5. Field dismisses, Tick confirms

No need to open full web app for simple task capture.

### Widget Quick Actions

When expanded, context-appropriate buttons:

| State | Actions shown |
|-------|---------------|
| Idle | "Pick For Me", "Quick Add", "Start Timer" |
| Task selected | "Start", "Just 5 Min", "Shrink Task" |
| Timer running | "Pause", "Done", "More Time" |
| Overdue | "Do Now", "Snooze", "Dismiss" |

---

## Menu Bar & Settings

### Menu Bar Modes

User chooses their preference:

| Mode | Behavior |
|------|----------|
| **Floating only** | Tick always on screen, no menu bar presence |
| **Menu bar only** | Tick lives in menu bar, click to show dropdown widget |
| **Both** | Menu bar icon + floating Tick, independent controls |

### Menu Bar Dropdown

If menu bar enabled, clicking shows:

- Current task (if any)
- Quick stats (tasks today, streak)
- Quick actions (Add, Pick, Timer)
- "Summon Tick" (shows floating sprite)
- Settings
- Quit

### Settings Panel

Accessible from menu bar or right-click Tick:

**Appearance:**

| Setting | Options |
|---------|---------|
| Tick position | Corner picker or "remember last" |
| Default size | Small / Medium / Large |
| Mode | Floating / Menu bar / Both |
| Show on all desktops | On / Off |
| Launch at login | On / Off |

**Behavior:**

| Setting | Options |
|---------|---------|
| Activity awareness | On / Off |
| Idle nudges | On / Off |
| Nudge frequency | Low / Medium / High |
| Time-of-day awareness | On / Off |
| Collapse on action | On / Off |

**Alerts:**

| Setting | Options |
|---------|---------|
| Native notifications | All / Critical only / None |
| Sound | On / Off / Custom |
| Bounce in dock | On / Off |

**Shortcuts:**
- Customizable hotkey bindings
- Enable/disable global shortcuts

---

## Sync & Offline Behavior

### Real-Time Sync

**Connection:** WebSocket via Supabase real-time subscriptions

**Sync scope:**
- Tasks (create, update, complete, delete)
- Timer state (start, pause, stop)
- Active sessions (body doubling, focus mode)
- Profile settings (spiciness, brain state)
- Reliability score updates

**Latency target:** <500ms for changes to appear on both ends

### Sync Direction

| Action on Desktop | Web App |
|-------------------|---------|
| Complete task | Immediately reflected |
| Start timer | Timer starts on web too |
| Quick add task | Appears in task list |
| Change spiciness | Settings update |

| Action on Web | Desktop |
|---------------|---------|
| Complete task | Tick celebrates |
| Start timer | Desktop shows timer |
| Add task | Available in widget |
| Trigger alert | Desktop delivers it |

### Offline Behavior

When connection lost:

- Tick shows subtle offline indicator (small icon or expression)
- Quick add still works → queued locally
- Timers continue locally → sync duration when reconnected
- Cached task list still viewable
- Alerts based on local data still fire

**Reconnection:**
- Auto-reconnect with exponential backoff
- Queue replays in order
- Conflict resolution: last-write-wins with timestamp

### Authentication

- Initial login via web app generates device token
- Desktop stores token securely in macOS Keychain
- Token refresh handled automatically
- "Sign out" option in settings

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Multiple monitors | Tick remembers which monitor, position per display config |
| Full screen app | Tick hides by default, option to show over full screen |
| Screen sharing | Auto-hide Tick (optional setting) |
| Sleep/wake | Reconnect sync, catch up on missed changes |
| Web app closed | Desktop fully functional standalone |
| Desktop closed | Web app fully functional, no desktop alerts |
| Both closed | Timers pause, resume on next open |
| Low battery | Reduce animation frequency to save power |
| Multiple accounts | Switch accounts from menu, separate Tick instances |

---

## Integration with ADHD Toolkits

Desktop Tick can trigger/participate in web app features:

| Feature | Desktop Integration |
|---------|---------------------|
| Pick For Me | Hotkey triggers, result shown in widget |
| Just 5 Minutes | Start from desktop, timer runs on both |
| Body Doubling | Tick animates as co-worker on desktop |
| Time Blindness alerts | Desktop delivers all time-related nudges |
| Daily Check-in | Prompt can appear on desktop at start of day |
| Task Shrinking | Can input micro-steps via quick add |
| Momentum Builder | Warmup queue shown in expanded widget |

---

## Tick Copy

### App Launch / Startup (10 per level)

**Level 1 (Gentle Concern):**
1. "Morning! I'm here whenever you need me."
2. "Hey! Ready to work together today."
3. "I'm back! Let's have a good day."
4. "Hello! I'll be right here in the corner."
5. "Starting up! Here to help when you need me."
6. "Hi there! Ready when you are."
7. "I'm here! No rush. Start whenever."
8. "Good to see you! Let's do this."
9. "Back again! I'll keep you company."
10. "Hey! I'll be here. Just say the word."

**Level 2 (Pointed Reminders):**
1. "I'm here. Let's get some things done."
2. "Starting up. Ready to work."
3. "Back on duty. What's the plan?"
4. "I'm here. Tasks are waiting."
5. "Loaded up. Let's do this."
6. "Ready. Your tasks haven't forgotten you."
7. "Online. Time to make progress."
8. "Here. Let's see what needs doing."
9. "Back. Ready when you are."
10. "I'm up. Let's get moving."

**Level 3 (Disappointed Parent):**
1. "I'm here. The tasks are still there too."
2. "Starting up. You know what needs doing."
3. "Back again. Let's actually accomplish something today."
4. "I'm here. Try not to ignore me."
5. "Loaded. Your to-do list misses you."
6. "Ready. Hopefully you are too."
7. "Online. The tasks have been waiting."
8. "Here. Let's make today count."
9. "Back. Try to be productive this time."
10. "I'm up. So should your motivation be."

**Level 4 (Unfiltered Chaos):**
1. "I'M HERE! Let's GO!"
2. "Starting up! PRODUCTIVITY TIME!"
3. "BACK! Ready to WORK!"
4. "I'm HERE! Tasks are WAITING!"
5. "Loaded! Let's CRUSH today!"
6. "READY! Are YOU?!"
7. "Online! Time to make MOVES!"
8. "HERE! Let's DO this!"
9. "Back! MOTIVATION ENGAGED!"
10. "I'm UP! Let's GET IT!"

**Level 5 (Maximum Violence):**
1. "I'M HERE!!! LET'S DESTROY THAT TASK LIST!!!"
2. "STARTING UP!!! PRODUCTIVITY MODE ACTIVATED!!!"
3. "BACK!!! READY TO CONQUER!!!"
4. "I'M HERE!!! TASKS ARE TREMBLING!!!"
5. "LOADED!!! LET'S GOOOOO!!!"
6. "READY!!! MAXIMUM EFFORT!!!"
7. "ONLINE!!! TIME TO DOMINATE!!!"
8. "HERE!!! LET'S MAKE TODAY COUNT!!!"
9. "BACK!!! NO MERCY FOR TASKS!!!"
10. "I'M UP!!! AND SO IS YOUR POTENTIAL!!!"

---

### Time-of-Day Greetings — Morning (10 per level)

**Level 1 (Gentle Concern):**
1. "Good morning! Take your time getting started."
2. "Morning! Hope you slept well."
3. "Hey, good morning. I'm here when you're ready."
4. "Rise and shine! No rush though."
5. "Morning! Let's ease into the day."
6. "Good morning! Coffee first, tasks second."
7. "Hey! New day, fresh start."
8. "Morning! Ready whenever you are."
9. "Good morning! Be gentle with yourself today."
10. "Hey, morning! I'll be right here."

**Level 2 (Pointed Reminders):**
1. "Good morning. Ready to start?"
2. "Morning! New day, new opportunities."
3. "Rise and shine. Tasks await."
4. "Morning. Let's make it a good one."
5. "Good morning! Time to get moving."
6. "Hey, morning. What's the plan?"
7. "Morning! Fresh start. Let's go."
8. "Good morning. Your tasks are up too."
9. "Morning! Day's burning."
10. "Rise and shine. Things to do."

**Level 3 (Disappointed Parent):**
1. "Good morning. Try to be productive today."
2. "Morning. The tasks didn't sleep either."
3. "Rise and shine. Eventually. Please."
4. "Morning. Let's do better than yesterday."
5. "Good morning. I believe in you. Mostly."
6. "Hey, morning. Tasks are already judging you."
7. "Morning. Fresh start. Don't waste it."
8. "Good morning. Time to prove yourself."
9. "Morning. The day is watching."
10. "Rise and shine. Emphasis on rise."

**Level 4 (Unfiltered Chaos):**
1. "GOOD MORNING! LET'S GOOO!"
2. "MORNING! New day! NEW ENERGY!"
3. "RISE AND SHINE! Tasks await!"
4. "MORNING! Time to ATTACK the day!"
5. "GOOD MORNING! Productivity AWAITS!"
6. "HEY MORNING! Let's make it COUNT!"
7. "MORNING! Fresh start! FRESH MOTIVATION!"
8. "GOOD MORNING! Your tasks are READY!"
9. "MORNING! The day is YOURS!"
10. "RISE AND SHINE! IT'S GO TIME!"

**Level 5 (Maximum Violence):**
1. "GOOD MORNING!!! TIME TO DESTROY!!!"
2. "MORNING!!! NEW DAY!!! MAXIMUM EFFORT!!!"
3. "RISE AND SHINE!!! TASKS TREMBLE BEFORE YOU!!!"
4. "MORNING!!! LET'S CONQUER THIS DAY!!!"
5. "GOOD MORNING!!! PRODUCTIVITY EXPLOSION!!!"
6. "HEY MORNING!!! MAKE IT LEGENDARY!!!"
7. "MORNING!!! FRESH START!!! FULL POWER!!!"
8. "GOOD MORNING!!! YOUR TASKS DON'T STAND A CHANCE!!!"
9. "MORNING!!! THE DAY BOWS BEFORE YOU!!!"
10. "RISE AND SHINE!!! VICTORY AWAITS!!!"

---

### Time-of-Day Greetings — Late Night (10 per level)

**Level 1 (Gentle Concern):**
1. "It's getting late. Maybe wrap up soon?"
2. "Hey, it's late. You okay?"
3. "Still here? Remember to rest eventually."
4. "It's late. Take care of yourself."
5. "Working late? Don't forget sleep exists."
6. "Hey, it's getting late. Be kind to yourself."
7. "Still going? Rest when you can."
8. "It's late. Tomorrow is also a day."
9. "Working late tonight? Pace yourself."
10. "Hey, don't forget to sleep eventually."

**Level 2 (Pointed Reminders):**
1. "It's late. You should probably sleep."
2. "Still working? It's past midnight."
3. "Hey, it's late. Wrap it up?"
4. "Working late. Don't burn out."
5. "It's getting late. Tasks will exist tomorrow."
6. "Still here? Sleep is important."
7. "Late night. Tomorrow you will also be."
8. "It's late. Consider stopping."
9. "Working late? Don't overdo it."
10. "Hey, it's late. Bed exists."

**Level 3 (Disappointed Parent):**
1. "It's late. Why are you still here?"
2. "Still working? Go to bed."
3. "Hey, it's past midnight. This isn't healthy."
4. "Working this late? I worry about you."
5. "It's late. The tasks will be there tomorrow."
6. "Still here? Sleep deprivation isn't productive."
7. "Late night again? We need to talk about this."
8. "It's late. I'm judging you. Go to bed."
9. "Working late? You're going to regret this tomorrow."
10. "Hey. It's late. Stop."

**Level 4 (Unfiltered Chaos):**
1. "IT'S LATE! Why are you STILL HERE?!"
2. "Still working?! GO TO BED!"
3. "Hey it's PAST MIDNIGHT! SLEEP!"
4. "Working THIS late?! Are you OKAY?!"
5. "It's LATE! Tasks exist TOMORROW too!"
6. "STILL HERE?! Your bed is LONELY!"
7. "Late night AGAIN?! This is CONCERNING!"
8. "It's LATE! I'm worried! SLEEP!"
9. "Working late?! TOMORROW YOU WILL SUFFER!"
10. "HEY! LATE! BED! NOW!"

**Level 5 (Maximum Violence):**
1. "IT'S LATE!!! WHY ARE YOU LIKE THIS?!!"
2. "STILL WORKING?!!! GO TO BED!!! NOW!!!"
3. "IT'S PAST MIDNIGHT!!! SLEEP EXISTS!!!"
4. "WORKING THIS LATE?!!! THIS IS UNACCEPTABLE!!!"
5. "IT'S LATE!!! THE TASKS WILL SURVIVE UNTIL TOMORROW!!!"
6. "STILL HERE?!!! YOUR BED IS WEEPING!!!"
7. "LATE NIGHT AGAIN?!!! I'M STAGING AN INTERVENTION!!!"
8. "IT'S LATE!!! STOP!!! SLEEP!!! NOW!!!"
9. "WORKING LATE?!!! TOMORROW YOU WILL PAY!!!"
10. "HEY!!! IT'S LATE!!! BED!!! IMMEDIATELY!!!"

---

### Activity Nudge — Same App Too Long (10 per level)

**Level 1 (Gentle Concern):**
1. "You've been in [app] for 2 hours. Stretch break?"
2. "Still in [app]? Maybe take a quick break."
3. "2 hours in [app]. How are you feeling?"
4. "Been focused on [app] a while. Break time?"
5. "You've been at this 2 hours. All good?"
6. "Long session in [app]. Remember to breathe."
7. "2 hours! Maybe step away for a minute?"
8. "Still in [app]? Your body might want a break."
9. "Been at this a while. Water break?"
10. "2 hours in [app]. Consider a stretch?"

**Level 2 (Pointed Reminders):**
1. "2 hours in [app]. Time for a break."
2. "You've been in [app] a while. Stretch."
3. "Still in [app]? 2 hours now. Break time."
4. "Long session. Consider stepping away."
5. "2 hours. Your eyes need a rest."
6. "Been focused 2 hours. Break recommended."
7. "Still at it? 2 hours. Take five."
8. "[app] for 2 hours. Move around."
9. "2 hour mark. Break time."
10. "Long stretch in [app]. Rest your eyes."

**Level 3 (Disappointed Parent):**
1. "2 hours in [app]. Your body is suffering."
2. "You've been there 2 hours. Get up."
3. "Still in [app]? Take a break. Please."
4. "2 hours. When did you last blink?"
5. "[app] for 2 hours straight. This isn't healthy."
6. "Long session. I'm worried. Break time."
7. "2 hours. Your spine is not happy."
8. "Still at it? 2 hours. Stand up."
9. "Been in [app] too long. Move."
10. "2 hours. Take care of yourself."

**Level 4 (Unfiltered Chaos):**
1. "2 HOURS in [app]! BREAK TIME!"
2. "You've been there 2 HOURS! STAND UP!"
3. "Still in [app]?! TWO HOURS! Move!"
4. "2 HOURS! When did you last EXIST?!"
5. "[app] for 2 HOURS! Your body is MAD!"
6. "Long session! TOO long! BREAK!"
7. "2 HOURS! Your spine is CRYING!"
8. "Still at it?! 2 HOURS! REST!"
9. "Been in [app] TOO LONG! MOVE!"
10. "2 HOURS! TAKE A BREAK! NOW!"

**Level 5 (Maximum Violence):**
1. "2 HOURS IN [APP]!!! GET UP!!!"
2. "YOU'VE BEEN THERE 2 HOURS!!! STAND UP NOW!!!"
3. "STILL IN [APP]?!!! TWO HOURS!!! THIS IS MADNESS!!!"
4. "2 HOURS!!! WHEN DID YOU LAST BLINK?!!"
5. "[APP] FOR 2 HOURS!!! YOUR BODY IS REVOLTING!!!"
6. "LONG SESSION!!! TOO LONG!!! BREAK NOW!!!"
7. "2 HOURS!!! YOUR SPINE IS SCREAMING!!!"
8. "STILL AT IT?!!! 2 HOURS!!! MANDATORY BREAK!!!"
9. "BEEN IN [APP] TOO LONG!!! MOVE YOUR BODY!!!"
10. "2 HOURS!!! TAKE A BREAK!!! IMMEDIATELY!!!"

---

### Activity Nudge — No Task But Working (10 per level)

**Level 1 (Gentle Concern):**
1. "Looks like you're working. Want to track it?"
2. "Busy over there? Want to add a task?"
3. "Working on something? I can help track it."
4. "You seem focused. Want to log what you're doing?"
5. "I see activity. Tracking something?"
6. "Working? Want me to track it for you?"
7. "Looks productive! Want to make it official?"
8. "Something happening? Want to add a task?"
9. "You're busy. Want to track your progress?"
10. "Working without a task? Want to add one?"

**Level 2 (Pointed Reminders):**
1. "You're working but have no task tracked."
2. "Activity detected. No task logged. Add one?"
3. "Looks like work. Want to track it?"
4. "You're doing something. Make it a task?"
5. "Working off-book? Add a task?"
6. "I see work happening. Track it?"
7. "Productive but untracked. Add a task?"
8. "Working? No task logged. Fix that?"
9. "Activity without a task. Add one?"
10. "You're busy. Want to track it?"

**Level 3 (Disappointed Parent):**
1. "You're working but it's not tracked. That doesn't count."
2. "Activity detected but no task. We talked about this."
3. "Working off the books? Log it."
4. "I see work. Why isn't it a task?"
5. "Productive but untracked. That's wasted credit."
6. "Working without logging? Add a task."
7. "You're doing something. Make it official."
8. "Activity but no task. Come on."
9. "Working in the shadows? Track it."
10. "Busy but untracked. That doesn't help your score."

**Level 4 (Unfiltered Chaos):**
1. "You're WORKING but no task tracked! Add one!"
2. "Activity detected! No task! FIX IT!"
3. "Looks like WORK! Track it!"
4. "You're doing SOMETHING! Make it a TASK!"
5. "Working off-book?! ADD A TASK!"
6. "I see PRODUCTIVITY! Log it!"
7. "Productive but UNTRACKED! That's a WASTE!"
8. "Working?! No task?! Add one NOW!"
9. "Activity! No task! COME ON!"
10. "You're BUSY! Make it COUNT!"

**Level 5 (Maximum Violence):**
1. "YOU'RE WORKING BUT NO TASK TRACKED!!! FIX IT!!!"
2. "ACTIVITY DETECTED!!! NO TASK!!! ADD ONE NOW!!!"
3. "LOOKS LIKE WORK!!! TRACK IT!!!"
4. "YOU'RE DOING SOMETHING!!! MAKE IT A TASK!!!"
5. "WORKING OFF-BOOK?!!! UNACCEPTABLE!!! LOG IT!!!"
6. "I SEE PRODUCTIVITY!!! WHY ISN'T IT TRACKED?!!"
7. "PRODUCTIVE BUT UNTRACKED!!! WASTED CREDIT!!!"
8. "WORKING?!!! NO TASK?!!! ADD ONE IMMEDIATELY!!!"
9. "ACTIVITY WITHOUT A TASK!!! THIS IS CHAOS!!!"
10. "YOU'RE BUSY!!! MAKE IT OFFICIAL!!! NOW!!!"

---

### Activity Nudge — Rapid App Switching (10 per level)

**Level 1 (Gentle Concern):**
1. "Lots of switching happening. Feeling scattered?"
2. "Bouncing around a bit. Need help focusing?"
3. "App hopping? Want me to pick something for you?"
4. "Seems scattered. Want a task to anchor on?"
5. "Lots of switching. Everything okay?"
6. "Bouncing between apps. Need some focus?"
7. "App switching detected. Want help picking one thing?"
8. "Feeling unfocused? I can help."
9. "Scattered vibes. Want me to pick a task?"
10. "Lots of movement. Need an anchor?"

**Level 2 (Pointed Reminders):**
1. "You're switching apps a lot. Pick one thing."
2. "Scattered? Want me to pick a task for you?"
3. "Lots of app hopping. Focus on something."
4. "Bouncing around. Need a task to focus on?"
5. "App switching detected. Time to commit to something."
6. "Scattered energy. Let me pick something."
7. "Too much switching. Pick a task."
8. "Bouncing between apps. Want help focusing?"
9. "Lots of switching. Commit to one thing."
10. "Scattered? Let me help."

**Level 3 (Disappointed Parent):**
1. "You're switching apps constantly. Focus."
2. "Scattered again? Let me pick something for you."
3. "So much app hopping. This isn't productive."
4. "Bouncing around like this doesn't help. Focus."
5. "App switching detected. Commit to something. Please."
6. "Scattered energy isn't working. Pick a task."
7. "Too much switching. You need an anchor."
8. "This app hopping? Not helping. Focus."
9. "Lots of switching. Let's get you on track."
10. "Scattered vibes. I'll pick something. You do it."

**Level 4 (Unfiltered Chaos):**
1. "You're SWITCHING apps constantly! FOCUS!"
2. "SCATTERED?! Let me pick something!"
3. "So much APP HOPPING! This isn't WORKING!"
4. "Bouncing around! COMMIT to something!"
5. "APP SWITCHING detected! Focus on ONE thing!"
6. "SCATTERED energy! Let me HELP!"
7. "Too much SWITCHING! Pick a TASK!"
8. "This app hopping?! NOT PRODUCTIVE!"
9. "Lots of SWITCHING! Get ANCHORED!"
10. "SCATTERED?! I'll pick! You DO!"

**Level 5 (Maximum Violence):**
1. "YOU'RE SWITCHING APPS CONSTANTLY!!! FOCUS!!!"
2. "SCATTERED?!!! LET ME PICK SOMETHING!!!"
3. "SO MUCH APP HOPPING!!! THIS IS CHAOS!!!"
4. "BOUNCING AROUND!!! COMMIT TO SOMETHING!!!"
5. "APP SWITCHING DETECTED!!! FOCUS ON ONE THING!!!"
6. "SCATTERED ENERGY!!! LET ME HELP YOU!!!"
7. "TOO MUCH SWITCHING!!! PICK A TASK!!!"
8. "THIS APP HOPPING?!!! NOT PRODUCTIVE!!!"
9. "LOTS OF SWITCHING!!! GET ANCHORED NOW!!!"
10. "SCATTERED?!!! I'LL PICK!!! YOU DO!!! GO!!!"

---

### Activity Nudge — Been Idle (10 per level)

**Level 1 (Gentle Concern):**
1. "You've been quiet for a while. Taking a break?"
2. "Been idle for a bit. Everything okay?"
3. "Quiet over there. Resting?"
4. "Haven't seen much activity. You good?"
5. "Been still for a while. Break time?"
6. "Idle for a bit. All good?"
7. "Quiet time? Or stuck on something?"
8. "Been quiet. Intentional rest?"
9. "Not much happening. Taking it easy?"
10. "Idle for a while. Need anything?"

**Level 2 (Pointed Reminders):**
1. "Been idle 30 minutes. Break or stuck?"
2. "Quiet for a while. What's happening?"
3. "No activity detected. Taking a break?"
4. "Been still. Intentional or frozen?"
5. "Idle for a bit. Ready to work?"
6. "30 minutes idle. Break or block?"
7. "Quiet over there. What's the status?"
8. "Been inactive. Need help?"
9. "No movement. Break time?"
10. "Idle for a while. Ready to go?"

**Level 3 (Disappointed Parent):**
1. "You've been idle 30 minutes. What's happening?"
2. "Quiet for a while. Procrastinating or resting?"
3. "No activity. Please tell me it's intentional."
4. "Been still. Stuck or avoiding?"
5. "Idle too long. What's going on?"
6. "30 minutes of nothing. Talk to me."
7. "Quiet. Hopefully resting, not hiding."
8. "Been inactive. I have questions."
9. "No movement. Should I be worried?"
10. "Idle. What's the situation?"

**Level 4 (Unfiltered Chaos):**
1. "You've been IDLE 30 minutes! What's HAPPENING?!"
2. "QUIET for a while! Break or STUCK?!"
3. "No ACTIVITY! Are you OKAY?!"
4. "Been STILL! Intentional or FROZEN?!"
5. "IDLE too long! What's going ON?!"
6. "30 minutes of NOTHING! Talk to ME!"
7. "QUIET over there! STATUS?!"
8. "Been INACTIVE! Need HELP?!"
9. "No MOVEMENT! Break or BLOCK?!"
10. "IDLE! What's the SITUATION?!"

**Level 5 (Maximum Violence):**
1. "YOU'VE BEEN IDLE 30 MINUTES!!! WHAT'S HAPPENING?!!"
2. "QUIET FOR A WHILE!!! BREAK OR STUCK?!!"
3. "NO ACTIVITY!!! ARE YOU OKAY?!!"
4. "BEEN STILL!!! INTENTIONAL OR FROZEN?!!"
5. "IDLE TOO LONG!!! WHAT'S GOING ON?!!"
6. "30 MINUTES OF NOTHING!!! TALK TO ME!!!"
7. "QUIET OVER THERE!!! STATUS REPORT!!!"
8. "BEEN INACTIVE!!! NEED HELP?!!"
9. "NO MOVEMENT!!! BREAK OR BLOCK?!!"
10. "IDLE!!! EXPLAIN YOURSELF!!!"

---

### Quick Add Confirmation (10 per level)

**Level 1 (Gentle Concern):**
1. "Task added! I've got it."
2. "Added! I'll keep track of it."
3. "Got it! Task saved."
4. "Done! Task is in the list."
5. "Added! You won't forget now."
6. "Task saved! I'm on it."
7. "Got it! Added to your list."
8. "Done! I'll remember for you."
9. "Added! It's tracked."
10. "Task saved! Good thinking."

**Level 2 (Pointed Reminders):**
1. "Task added. Now do it."
2. "Added. I'll hold you to it."
3. "Got it. Task logged."
4. "Done. It's on the list."
5. "Added. Don't forget."
6. "Task saved. Accountability starts now."
7. "Got it. I'm tracking."
8. "Done. Now you have to do it."
9. "Added. The list grows."
10. "Task saved. Clock's ticking."

**Level 3 (Disappointed Parent):**
1. "Task added. Now you have to actually do it."
2. "Added. I'll be watching."
3. "Got it. The list judges you."
4. "Done. Another thing you committed to."
5. "Added. Don't make me remind you."
6. "Task saved. Follow through."
7. "Got it. Prove you'll do it."
8. "Done. I'm tracking. Don't forget."
9. "Added. Your list is longer now."
10. "Task saved. Time to deliver."

**Level 4 (Unfiltered Chaos):**
1. "Task ADDED! Now DO it!"
2. "ADDED! I'm WATCHING!"
3. "GOT IT! Task LOGGED!"
4. "DONE! It's on the LIST!"
5. "ADDED! Don't you FORGET!"
6. "Task SAVED! ACCOUNTABILITY engaged!"
7. "GOT IT! I'm TRACKING!"
8. "DONE! Now EXECUTE!"
9. "ADDED! The list GROWS!"
10. "Task SAVED! GO DO IT!"

**Level 5 (Maximum Violence):**
1. "TASK ADDED!!! NOW DO IT!!!"
2. "ADDED!!! I'M WATCHING!!!"
3. "GOT IT!!! TASK LOGGED!!!"
4. "DONE!!! IT'S ON THE LIST!!!"
5. "ADDED!!! DON'T YOU DARE FORGET!!!"
6. "TASK SAVED!!! ACCOUNTABILITY ENGAGED!!!"
7. "GOT IT!!! I'M TRACKING YOU!!!"
8. "DONE!!! NOW EXECUTE!!!"
9. "ADDED!!! THE LIST GROWS!!!"
10. "TASK SAVED!!! GO DO IT NOW!!!"

---

### Offline / Connection Lost (10 per level)

**Level 1 (Gentle Concern):**
1. "Connection lost. I'll keep working offline."
2. "Offline now. Your data is safe with me."
3. "Lost connection. I'll sync when it's back."
4. "Offline mode. I'm still here for you."
5. "Connection dropped. Working locally."
6. "Offline. Don't worry, nothing's lost."
7. "Lost connection. I'll catch up later."
8. "Offline now. Still functional."
9. "Connection lost. Your tasks are safe."
10. "Offline mode active. I've got you."

**Level 2 (Pointed Reminders):**
1. "Connection lost. Working offline."
2. "Offline. Sync will resume when reconnected."
3. "Lost connection. Local mode active."
4. "Offline now. Tasks cached."
5. "Connection dropped. Still functional."
6. "Offline. Will sync when back online."
7. "Lost connection. Working locally."
8. "Offline mode. Data preserved."
9. "Connection lost. Continuing locally."
10. "Offline. Don't worry about it."

**Level 3 (Disappointed Parent):**
1. "Connection lost. It's not my fault."
2. "Offline. Check your internet."
3. "Lost connection. I'll survive."
4. "Offline now. We'll sync when you fix this."
5. "Connection dropped. Working locally."
6. "Offline. The internet betrayed us."
7. "Lost connection. I'm coping."
8. "Offline mode. Not ideal but fine."
9. "Connection lost. Your WiFi is the problem."
10. "Offline. I'm still here. Unlike the internet."

**Level 4 (Unfiltered Chaos):**
1. "Connection LOST! Working OFFLINE!"
2. "OFFLINE! But I'm FINE!"
3. "Lost connection! Not MY fault!"
4. "OFFLINE now! Still FUNCTIONAL!"
5. "Connection DROPPED! SURVIVING!"
6. "OFFLINE! Will sync LATER!"
7. "Lost connection! COPING!"
8. "OFFLINE mode! Data SAFE!"
9. "Connection LOST! Internet BETRAYED us!"
10. "OFFLINE! I'll MANAGE!"

**Level 5 (Maximum Violence):**
1. "CONNECTION LOST!!! WORKING OFFLINE!!!"
2. "OFFLINE!!! BUT I'M STILL HERE!!!"
3. "LOST CONNECTION!!! NOT MY FAULT!!!"
4. "OFFLINE NOW!!! STILL FUNCTIONAL!!!"
5. "CONNECTION DROPPED!!! SURVIVING!!!"
6. "OFFLINE!!! WILL SYNC WHEN INTERNET BEHAVES!!!"
7. "LOST CONNECTION!!! I'LL COPE!!!"
8. "OFFLINE MODE!!! DATA IS SAFE!!!"
9. "CONNECTION LOST!!! INTERNET IS THE ENEMY!!!"
10. "OFFLINE!!! I'LL MANAGE!!! FIX YOUR WIFI!!!"

---

### Reconnected (10 per level)

**Level 1 (Gentle Concern):**
1. "Back online! Syncing now."
2. "Reconnected! Catching up."
3. "Connection restored. All good."
4. "Back! Syncing your changes."
5. "Online again! Data syncing."
6. "Reconnected! Everything's fine."
7. "Back online. Syncing."
8. "Connection back! Catching up."
9. "Restored! Syncing now."
10. "Back online! All caught up soon."

**Level 2 (Pointed Reminders):**
1. "Back online. Syncing."
2. "Reconnected. Catching up now."
3. "Connection restored. Syncing data."
4. "Back. Sync in progress."
5. "Online again. Updating."
6. "Reconnected. All synced."
7. "Back online. Good to go."
8. "Connection back. Syncing."
9. "Restored. Catching up."
10. "Back. Synced."

**Level 3 (Disappointed Parent):**
1. "Back online. Finally."
2. "Reconnected. About time."
3. "Connection restored. Syncing."
4. "Back. You fixed the internet."
5. "Online again. Catching up."
6. "Reconnected. Crisis over."
7. "Back online. That was annoying."
8. "Connection back. Syncing now."
9. "Restored. All is well."
10. "Back. Let's not do that again."

**Level 4 (Unfiltered Chaos):**
1. "BACK ONLINE! Syncing NOW!"
2. "RECONNECTED! Catching UP!"
3. "Connection RESTORED! All GOOD!"
4. "BACK! Sync in PROGRESS!"
5. "ONLINE again! UPDATING!"
6. "RECONNECTED! Crisis OVER!"
7. "Back ONLINE! Let's GO!"
8. "Connection BACK! SYNCING!"
9. "RESTORED! All SYNCED!"
10. "BACK! FINALLY!"

**Level 5 (Maximum Violence):**
1. "BACK ONLINE!!! SYNCING NOW!!!"
2. "RECONNECTED!!! CATCHING UP!!!"
3. "CONNECTION RESTORED!!! ALL GOOD!!!"
4. "BACK!!! SYNC IN PROGRESS!!!"
5. "ONLINE AGAIN!!! UPDATING!!!"
6. "RECONNECTED!!! CRISIS OVER!!!"
7. "BACK ONLINE!!! LET'S GO!!!"
8. "CONNECTION BACK!!! SYNCING!!!"
9. "RESTORED!!! ALL SYNCED!!!"
10. "BACK!!! FINALLY!!! INTERNET BEHAVED!!!"

---

### Summoning Tick from Menu Bar (10 per level)

**Level 1 (Gentle Concern):**
1. "You called? I'm here!"
2. "Hey! You summoned me."
3. "Here I am! What do you need?"
4. "Present! Ready to help."
5. "You called? What's up?"
6. "I'm here! What can I do?"
7. "Summoned! At your service."
8. "Here! How can I help?"
9. "You rang? I'm here."
10. "Present and ready!"

**Level 2 (Pointed Reminders):**
1. "You summoned me. What's up?"
2. "Here. What do you need?"
3. "You called? Ready."
4. "Present. What's the task?"
5. "Here I am. Let's go."
6. "Summoned. At your service."
7. "You called. I answered."
8. "Here. What's happening?"
9. "You rang. I'm here."
10. "Present. Ready to work."

**Level 3 (Disappointed Parent):**
1. "You summoned me. This better be good."
2. "Here. What do you need?"
3. "You called? I was comfortable in the menu bar."
4. "Present. What's so urgent?"
5. "Here I am. Work to do?"
6. "Summoned. Hopefully for actual work."
7. "You called. I answered. Don't waste it."
8. "Here. What's happening?"
9. "You rang. Make it count."
10. "Present. Let's see what you've got."

**Level 4 (Unfiltered Chaos):**
1. "You SUMMONED me! What's UP?!"
2. "HERE! What do you NEED?!"
3. "You CALLED?! READY!"
4. "PRESENT! What's the TASK?!"
5. "Here I AM! Let's GO!"
6. "SUMMONED! At your SERVICE!"
7. "You CALLED! I ANSWERED!"
8. "HERE! What's HAPPENING?!"
9. "You RANG! I'm HERE!"
10. "PRESENT! Ready to WORK!"

**Level 5 (Maximum Violence):**
1. "YOU SUMMONED ME!!! WHAT'S UP?!!"
2. "HERE!!! WHAT DO YOU NEED?!!"
3. "YOU CALLED?!!! READY FOR ACTION!!!"
4. "PRESENT!!! WHAT'S THE TASK?!!"
5. "HERE I AM!!! LET'S GO!!!"
6. "SUMMONED!!! AT YOUR SERVICE!!!"
7. "YOU CALLED!!! I ANSWERED!!!"
8. "HERE!!! WHAT'S HAPPENING?!!"
9. "YOU RANG!!! I'M HERE!!!"
10. "PRESENT!!! READY TO DESTROY TASKS!!!"

---

### Desktop Task Completion Celebration (10 per level)

**Level 1 (Gentle Concern):**
1. "Done! Nice work!"
2. "Task complete! Well done."
3. "You did it! Great job."
4. "Finished! Proud of you."
5. "Done! That's progress."
6. "Complete! You're doing great."
7. "Task done! Celebrate!"
8. "Finished! Well done."
9. "You did it! Amazing."
10. "Done! Keep it up."

**Level 2 (Pointed Reminders):**
1. "Done. Task complete."
2. "Finished. Nice work."
3. "Complete. Progress made."
4. "Task done. Good."
5. "Done. One down."
6. "Finished. Keep going."
7. "Complete. Next?"
8. "Task done. Moving forward."
9. "Done. Good work."
10. "Finished. Momentum building."

**Level 3 (Disappointed Parent):**
1. "Done. See? You can do things."
2. "Finished. I'm pleasantly surprised."
3. "Complete. That wasn't so hard."
4. "Task done. Finally."
5. "Done. More of this please."
6. "Finished. Proud. Ish."
7. "Complete. Growth detected."
8. "Task done. Keep it up."
9. "Done. You proved me slightly wrong."
10. "Finished. Progress is progress."

**Level 4 (Unfiltered Chaos):**
1. "DONE! You DID it!"
2. "FINISHED! Nice WORK!"
3. "COMPLETE! PROGRESS!"
4. "Task DONE! YES!"
5. "DONE! One DOWN!"
6. "FINISHED! Keep GOING!"
7. "COMPLETE! MOMENTUM!"
8. "Task DONE! INCREDIBLE!"
9. "DONE! Good WORK!"
10. "FINISHED! MORE! DO MORE!"

**Level 5 (Maximum Violence):**
1. "DONE!!! YOU DID IT!!!"
2. "FINISHED!!! INCREDIBLE!!!"
3. "COMPLETE!!! PROGRESS!!!"
4. "TASK DONE!!! VICTORY!!!"
5. "DONE!!! ONE DOWN!!! MORE TO GO!!!"
6. "FINISHED!!! KEEP CRUSHING IT!!!"
7. "COMPLETE!!! UNSTOPPABLE!!!"
8. "TASK DONE!!! LEGENDARY!!!"
9. "DONE!!! AMAZING WORK!!!"
10. "FINISHED!!! YOU'RE ON FIRE!!!"

---

## Future Considerations

Features deferred for later versions:

- **iOS companion** — Tick on your phone
- **Apple Watch** — Glanceable task/timer complications
- **Focus mode integration** — Respect macOS Focus modes
- **Shortcuts app** — Expose actions to macOS Shortcuts
- **Notification Center widget** — Alternative to floating Tick
- **Windows/Linux** — Cross-platform expansion
- **Screen time integration** — Coordinate with macOS Screen Time

---

## Technical Notes

### Tauri Specifics

- Use `tauri::window::Window` with `always_on_top` and `transparent`
- WebSocket via `tauri-plugin-websocket` or direct Rust implementation
- Keychain access via `keychain-services` crate
- Global shortcuts via `tauri-plugin-global-shortcut`
- System tray via `tauri::SystemTray`
- Menu bar via `tauri::SystemTray` with custom menu

### Animation Approach

- Reuse existing Tick sprite sheets from web app
- CSS animations in web view for smooth transitions
- Rust-side event triggers for state changes
- Frame-rate throttling on battery power

### Performance Targets

- <50MB memory footprint
- <1% CPU at idle
- <5% CPU during active animation
- Instant wake from sleep
- <500ms sync latency
