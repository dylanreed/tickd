# Time Blindness Toolkit — Design Document

**Feature:** Suite of tools helping ADHD brains perceive, track, and work within time
**Date:** 2026-01-17
**Status:** Draft

---

## Overview

A collection of optional time awareness tools that integrate with tickd's existing task system. Adapts to daily brain state and helps users build better time perception over time.

**Five components:**

| Component | Purpose |
|-----------|---------|
| Daily Check-in | Set time budget, pick tasks, report brain state |
| "I Have X Time" Mode | Bounded work sessions with context-aware endings |
| Time Passing Alerts | Milestone and estimate-relative notifications |
| Deadline Creep Visuals | Urgency builds visually as deadlines approach |
| Estimation Training | Predict → track → reveal → calibrate loop |

**Design principle:** All components optional. Different ADHD brains need different supports.

---

## Component 1: Daily Check-in

### Trigger

First visit of the day (after midnight, or configurable "day start" time).

### Flow

**Step 1: Brain State**

"How's your brain today?" — 5-point scale with Tick expressions:

| Level | Label | Tick Expression |
|-------|-------|-----------------|
| 1 | Absolute garbage fire | Melting |
| 2 | Struggling but here | Tired |
| 3 | Mid, manageable | Neutral |
| 4 | Pretty good actually | Alert |
| 5 | Unstoppable chaos goblin | Energized |

**Step 2: Time Budget**

"How much time do you have today?"

- Quick presets: "1 hour", "2-3 hours", "Half day", "Full day", "No idea"
- Manual entry option
- Optional: "I need to stop at [time]" for hard deadlines

**Step 3: Task Selection**

"What are you tackling?"

- Shows incomplete tasks
- Multi-select
- Warns if selected tasks exceed time budget

### Brain State Effects

| Level | Expectations | Suggestions | Spiciness |
|-------|--------------|-------------|-----------|
| 1-2 | Celebrate any progress | Quick wins only | Reduced by 1-2 levels |
| 3 | Normal | Balanced mix | Normal |
| 4-5 | Push a little | Suggest hard tasks | Normal |

### Skippable

User can dismiss with "Just let me work" — respected, may gently re-ask tomorrow.

---

## Component 2: "I Have X Time" Mode

### Entry Points

- From daily check-in ("I need to stop at 3pm")
- Manual trigger: "Start timed session" button
- Quick presets: 25 min, 1 hour, 2 hours, custom

### Session Types

| Type | Trigger | Ending |
|------|---------|--------|
| Focus session | "I have X time" | Soft warning, can extend |
| Hard deadline | "I need to stop at X" | Escalating alerts, hard stop |

### Focus Session Flow

1. Timer starts, ambient countdown visible
2. At end: "Time's up! Keep going or wrap up?"
3. Options: "5 more min", "15 more min", "I'm done"

### Hard Deadline Flow

1. Timer starts with end time locked
2. Warning at 15 min remaining
3. Warning at 5 min remaining
4. At end: Full interruption, no snooze (or 1 max with guilt)

### Visual Treatment

- Persistent countdown in corner
- Color shifts as time runs low
- Unhinged mode: Tick gets progressively anxious

---

## Component 3: Time Passing Alerts

Three optional mechanisms — user enables what works:

### A. Milestone Alerts

| Time elapsed | Urgency |
|--------------|---------|
| 30 min | Neutral |
| 1 hour | Noticing |
| 2 hours | Concerned |
| 3+ hours | Alarmed |

### B. Estimate-Relative Alerts

| Overage | Trigger |
|---------|---------|
| 1.5x | Gentle note |
| 2x | Pointed observation |
| 3x+ | Offer to break up task |

### C. Ambient Visual Timer

- Small elapsed timer in corner
- No interruptions — purely glanceable
- Optional subtle pulse every 15/30 min
- Resets when switching tasks

### Under-Estimate Kudos

When completed faster than estimated:

| Speed | Response |
|-------|----------|
| Under estimate | Celebrate the win |
| Way under (50%+) | Impressed/suspicious |
| Suspiciously fast | Playful doubt |

---

## Component 4: Deadline Creep Visuals

### Time Thresholds

| Time remaining | Urgency level |
|----------------|---------------|
| 7+ days | None |
| 3-7 days | Low |
| 1-3 days | Medium |
| < 24 hours | High |
| < 4 hours | Critical |
| Overdue | Maximum |

### Hinged Mode (Color Only)

| Urgency | Color |
|---------|-------|
| None | Default |
| Low | Warm tint |
| Medium | Soft orange |
| High | Orange |
| Critical | Red |
| Overdue | Deep red + pulse |

### Unhinged Mode (Full Escalation)

| Urgency | Color | Tick | Size | Countdown |
|---------|-------|------|------|-----------|
| None | Neutral | Chill | Normal | "Due Mar 15" |
| Low | Warm | Alert | Normal | "5 days" |
| Medium | Orange | Concerned | Slight grow | "2 days" |
| High | Bright orange | Stressed | Larger | "TOMORROW" |
| Critical | Red | Panicking | Prominent | "4 HOURS" |
| Overdue | Pulsing red | Meltdown | Maximum | "2 DAYS LATE" |

---

## Component 5: Estimation Training

### A. Prediction Prompt

When adding task: "How long do you think this will take?"

- Presets: 15 min, 30 min, 1 hour, 2 hours, half day
- Skip: "No idea"

### B. Silent Tracking

- Timer starts on task focus
- Pauses when switching away (configurable)
- Tracks active time, not wall clock

### C. Reveal on Completion

Show comparison:
- Estimated vs actual
- Percentage over/under
- Copy based on accuracy

### D. Calibration Feedback

Over time:
- Average accuracy percentage
- Pattern recognition ("short tasks = good, long tasks = chaos")
- Trend tracking
- Auto-adjustment of fake deadlines for bad estimators

---

## Settings

### New "Time Tools" Section

| Setting | Options | Default |
|---------|---------|---------|
| Daily check-in | On / Off | On |
| Check-in time | Time picker | First visit |
| Brain state affects spiciness | On / Off | On |
| Time sessions | On / Off | On |
| Milestone alerts | On / Off / Custom | Off |
| Estimate alerts | On / Off | On |
| Ambient timer | On / Off | On |
| Deadline visuals | Hinged / Unhinged | Match app |
| Estimation prompts | On / Off | On |
| Auto-pause tracking | On / Off | On |

---

## Integration

| Feature | Integration |
|---------|-------------|
| Fake deadlines | Worse estimators = more aggressive lies |
| Pick For Me | Estimation data improves quick-win detection |
| Reliability score | Estimation accuracy could boost score |
| Spiciness | Brain state temporarily overrides |
| Monthly stats | Time data included |

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Skips check-in multiple days | Gentle re-prompt |
| Timer running when app closes | Pauses, resumes with note |
| Task done without timer | Offer retroactive guess |
| Negative brain state streak | Tick softens overall |
| Always skips estimates | After 10: "Want me to stop asking?" |

---

## Tick Copy

### Daily Check-in: Brain State Responses (10 per level)

**Level 1 (Gentle Concern):**

*When user selects low brain state (1-2):*
1. "Rough day. I hear you. Let's take it easy."
2. "That's okay. We'll do what we can."
3. "Low battery mode activated. Small wins count."
4. "I've got you. No pressure today."
5. "Thanks for being honest. Let's be gentle."
6. "Tough one. I'll go easy on you."
7. "Some days are just like this. It's okay."
8. "We'll work with what we've got."
9. "Noted. Expect extra celebration for any progress."
10. "Hard day. I'm dialing back expectations."

*When user selects high brain state (4-5):*
1. "Nice! Let's make the most of it."
2. "Good brain day! Exciting."
3. "Feeling strong? Let's do this."
4. "Great energy! Want to tackle something big?"
5. "Love to see it. Let's go."
6. "You've got fuel in the tank. Let's use it."
7. "A good day! Let's not waste it."
8. "Excellent. Big things are possible today."
9. "Feeling capable? Me too. Let's crush it."
10. "High energy! Perfect time for the hard stuff."

**Level 2 (Pointed Reminders):**

*Low brain state:*
1. "Noted. I'll adjust my expectations accordingly."
2. "Rough day? We'll work with it."
3. "Low energy logged. Small tasks it is."
4. "Got it. Today's about survival, not thriving."
5. "Understood. I'll be less annoying than usual."
6. "Bad brain day. I'll scale back."
7. "Acknowledged. Easy mode activated."
8. "Low battery. Let's conserve energy."
9. "Struggling? That's valid. Adjusting."
10. "Rough one. I'll keep things light."

*High brain state:*
1. "High energy? Let's channel that."
2. "Good day! Don't waste it."
3. "Feeling capable? Excellent. Big tasks await."
4. "Strong brain day. Let's be ambitious."
5. "Nice. Time to tackle something meaty."
6. "Good energy! I'll push you a little."
7. "Solid brain state. Let's make moves."
8. "Feeling good? Good. Work time."
9. "High capacity today. Let's use it wisely."
10. "Strong day. Maybe hit that task you've been avoiding?"

**Level 3 (Disappointed Parent):**

*Low brain state:*
1. "Rough day. Fine. We'll lower the bar."
2. "Low energy. I'll try not to be disappointed."
3. "Bad brain day? Alright. Small tasks only."
4. "Noted. I had plans for us but... fine."
5. "Struggling. Okay. I'll manage my expectations."
6. "Low battery. *adjusts plans* This is fine."
7. "Not great? Alright. We do what we can."
8. "Rough one. I'll be... patient."
9. "Low energy day. *sighs* Okay. Easy mode."
10. "Struggling? I'll try to hide my disappointment."

*High brain state:*
1. "Finally, a good day. Let's not squander it."
2. "High energy? About time. Let's go."
3. "Good brain day. Don't let me down."
4. "Feeling capable? Prove it."
5. "Strong day. I expect results."
6. "High capacity? Then no excuses today."
7. "Good energy. Let's actually accomplish something."
8. "Solid brain state. Time to tackle the hard stuff."
9. "Feeling good? Then we're doing the scary task."
10. "High energy day. You know what that means."

**Level 4 (Unfiltered Chaos):**

*Low brain state:*
1. "Garbage fire brain? Same honestly. Let's just survive."
2. "Low energy. Cool. We'll vibe on easy mode."
3. "Bad day? SAME. Tiny tasks only."
4. "Struggling? Join the club. Low expectations activated."
5. "Brain broken? Relatable. We'll do what we can."
6. "Rough day logged. I'll be chill. (For once.)"
7. "Low battery? Me too bestie. Easy mode."
8. "Bad brain day. I'll lower the bar to the floor."
9. "Struggling? That's life. Survival mode engaged."
10. "Garbage fire status noted. No judgment. (Some judgment.)"

*High brain state:*
1. "HIGH ENERGY? This is not a drill!"
2. "Good brain day?! SEIZE IT."
3. "Feeling capable? FINALLY. Let's GO."
4. "Strong day? We're doing ALL the things."
5. "High capacity! Don't you dare waste this!"
6. "GOOD BRAIN DAY. This is rare. MOVE."
7. "Feeling good?! Quick, tackle something before it fades!"
8. "High energy! Let's be RECKLESSLY productive!"
9. "Strong day! The scary tasks! NOW!"
10. "Good day?! IS THIS REAL?! GO GO GO."

**Level 5 (Maximum Violence):**

*Low brain state:*
1. "GARBAGE FIRE BRAIN? UNDERSTOOD. SURVIVAL MODE."
2. "LOW ENERGY. FINE. I'LL STOP YELLING. (after this)"
3. "BAD BRAIN DAY. I'LL BE... *deep breath* ...gentle."
4. "STRUGGLING?! OKAY. TINY TASKS. NO PRESSURE. (some pressure)"
5. "ROUGH DAY LOGGED. EXPECTATIONS: FLOOR LEVEL."
6. "BRAIN BROKEN? SAME. WE JUST NEED TO EXIST TODAY."
7. "LOW BATTERY. I WILL... ATTEMPT... PATIENCE."
8. "BAD DAY. FINE. EASY MODE. BUT TOMORROW WE FIGHT."
9. "STRUGGLING? VALID. SURVIVAL COUNTS AS SUCCESS TODAY."
10. "GARBAGE FIRE? I'LL BRING MARSHMALLOWS. REST UP."

*High brain state:*
1. "HIGH ENERGY?! THIS IS YOUR MOMENT. DON'T BLOW IT."
2. "GOOD BRAIN DAY?! FINALLY!!! ATTACK!!!"
3. "FEELING CAPABLE?! PROVE IT RIGHT NOW."
4. "STRONG DAY?! THE HARD TASKS. ALL OF THEM. NOW."
5. "HIGH CAPACITY! NO EXCUSES! MAXIMUM EFFORT!"
6. "GOOD DAY?! SEIZE IT BEFORE YOUR BRAIN CHANGES ITS MIND."
7. "FEELING GOOD?! THEN WE'RE DOING THE SCARY THING TODAY."
8. "HIGH ENERGY! LET'S DESTROY THAT TASK LIST!"
9. "STRONG DAY! YOU KNOW THE DRILL! BIG TASKS! GO!"
10. "GOOD BRAIN?! THIS IS RARE! DON'T WASTE A SINGLE MINUTE!"

---

### Time Budget Warning: Overcommitting (10 per level)

**Level 1 (Gentle Concern):**
1. "That's a lot for the time you have. Want to adjust?"
2. "Hmm, that might be more than fits. Just so you know."
3. "Those tasks might take longer than your window. Something to consider."
4. "That's ambitious for the time available. Totally up to you though."
5. "Heads up — that could overflow your time budget."
6. "You've selected quite a bit. No pressure to change it."
7. "That might be more than fits. Want to prioritize?"
8. "Just noting — that's a full plate for your time window."
9. "Ambitious selection! Might be tight on time though."
10. "That could run over. Wanted to mention it."

**Level 2 (Pointed Reminders):**
1. "That's 6 hours of tasks in a 2-hour window. Bold."
2. "Math check: that's more tasks than time. Just saying."
3. "Those tasks will likely exceed your time budget."
4. "You've overcommitted. Might want to trim."
5. "That's ambitious. Maybe pick fewer?"
6. "Time math doesn't add up. Your call though."
7. "You have 2 hours and selected 5 hours of work. Hmm."
8. "That's more than fits. Want to reprioritize?"
9. "Overloaded. Classic. Maybe drop one?"
10. "That exceeds your time budget by... a lot."

**Level 3 (Disappointed Parent):**
1. "That's twice what fits in your time window. You know that, right?"
2. "You've overcommitted. Again. Maybe prioritize?"
3. "6 hours of tasks, 2 hours of time. I worry about you."
4. "That's... ambitious. Too ambitious. Scale back?"
5. "You can't do all that. Let's be realistic."
6. "Way more than fits. I'm not surprised, but I am concerned."
7. "*checks math* Yeah, no. That's too much."
8. "You've overpacked your day. We need to talk about this habit."
9. "That won't fit. I wish you'd learn."
10. "Overcommitted. As usual. Please drop something."

**Level 4 (Unfiltered Chaos):**
1. "That's DOUBLE what fits. Are you okay??"
2. "You've selected a whole day of tasks for 2 hours. CLASSIC."
3. "Math isn't mathing. Way too many tasks."
4. "You're overcommitting so hard right now."
5. "That's chaos. Even I think it's too much."
6. "Time budget: obliterated. Maybe chill?"
7. "You can't do 8 hours of work in 3 hours. I've seen you try."
8. "Wildly overcommitted. Scale back or suffer."
9. "That's fantasy land scheduling. Come back to reality."
10. "Way too much. But you're gonna try anyway, aren't you?"

**Level 5 (Maximum Violence):**
1. "THAT'S 6 HOURS OF TASKS FOR 2 HOURS OF TIME. ARE YOU DELUSIONAL?!"
2. "YOU'VE OVERCOMMITTED INTO ANOTHER DIMENSION."
3. "THE MATH ISN'T MATHING. DROP HALF OF THOSE."
4. "YOU CANNOT DO ALL THAT. I REFUSE TO WATCH YOU TRY."
5. "THAT'S INSANE. LITERALLY INSANE. SCALE BACK."
6. "TIME BUDGET: DESTROYED. EXPECTATIONS: ALSO DESTROYED."
7. "YOU'VE SELECTED MORE TASKS THAN HOURS IN THE DAY. ICONIC."
8. "WILDLY OVERCOMMITTED. AS ALWAYS. FIX IT."
9. "THAT'S NOT A PLAN, THAT'S A CRY FOR HELP. PRIORITIZE."
10. "YOU'RE SETTING YOURSELF UP TO FAIL. DROP SOMETHING. NOW."

---

### Focus Session End (10 per level)

**Level 1 (Gentle Concern):**
1. "Time's up! Nice work. Ready to wrap up?"
2. "Session complete. You did great."
3. "That's your time. How do you feel about stopping?"
4. "Timer done! Take a break if you need."
5. "Session finished. Good effort."
6. "Time! You made progress. That's what counts."
7. "Your session is up. Well done."
8. "Timer complete. Rest or continue — your call."
9. "That's time! You showed up. That matters."
10. "Session done. Proud of you for doing it."

**Level 2 (Pointed Reminders):**
1. "Time's up! Keep going or wrap up?"
2. "Session complete. What's the move?"
3. "That's your time. Continue or call it?"
4. "Timer done. More time or done for now?"
5. "Session finished. Extend or stop?"
6. "Time! Wrap up or keep the momentum?"
7. "Your time is up. Stopping or pushing?"
8. "Session complete. Your call on next steps."
9. "Timer's up. Done or 5 more minutes?"
10. "That's time. What do you want to do?"

**Level 3 (Disappointed Parent):**
1. "Time's up. Did you finish? ...I see."
2. "Session complete. How much did you actually do?"
3. "Timer done. Please tell me you made progress."
4. "That's your time. Hopefully it was productive."
5. "Session finished. I hope you focused."
6. "Time. Let me guess — you need more?"
7. "Your session ended. Did you use it wisely?"
8. "Timer up. Productive? Or...?"
9. "Session done. I'm choosing to believe you tried."
10. "Time's up. Don't tell me you need to extend. Again."

**Level 4 (Unfiltered Chaos):**
1. "TIME'S UP! Did you do the thing or nah?"
2. "Session complete! Productive or just vibes?"
3. "Timer done. Please tell me you accomplished SOMETHING."
4. "That's time! How'd it go? (afraid to ask)"
5. "Session finished! Any actual progress?"
6. "DING DING DING! Time! What did we learn?"
7. "Your time ran out! Shocking no one!"
8. "Session over! Moment of truth!"
9. "Timer's up! Did you focus or doom scroll?"
10. "TIME! Be honest. How much got done?"

**Level 5 (Maximum Violence):**
1. "TIME'S UP!!! DID YOU ACTUALLY WORK OR JUST SIT THERE?!"
2. "SESSION COMPLETE! RESULTS! NOW! SHOW ME!"
3. "TIMER DONE. TELL ME IT WASN'T A WASTE."
4. "THAT'S YOUR TIME! HOPEFULLY YOU USED IT WELL."
5. "SESSION FINISHED! PROGRESS REPORT! IMMEDIATELY!"
6. "TIME!!! WHAT DID YOU ACCOMPLISH?! ANYTHING?!"
7. "YOUR SESSION IS OVER! THE TRUTH WILL COME OUT!"
8. "TIMER UP! DID YOU FOCUS OR DID YOUR BRAIN WIN?!"
9. "SESSION DONE! I'M SCARED TO ASK HOW IT WENT!"
10. "TIME'S UP!!! MOMENT OF RECKONING!!!"

---

### Hard Deadline Warnings (10 per level)

**15 Minutes Remaining:**

**Level 1 (Gentle Concern):**
1. "15 minutes left. Just a heads up."
2. "Gentle reminder — 15 minutes until you need to stop."
3. "15 minute warning. Start wrapping up when ready."
4. "You have 15 minutes left on your deadline."
5. "Heads up: 15 minutes remaining."
6. "15 minutes to go. Might want to start wrapping up."
7. "Friendly reminder: 15 minutes until stop time."
8. "15 minutes left. You've got this."
9. "Quick note — 15 minutes remaining."
10. "15 minute mark. Think about wrapping up."

**Level 2 (Pointed Reminders):**
1. "15 minutes left. Time to wrap up."
2. "15 minutes remaining. Start finishing up."
3. "You have 15 minutes until your hard stop."
4. "15 minute warning. Wrap it up."
5. "15 minutes to go. Wind it down."
6. "Reminder: 15 minutes left on the clock."
7. "15 minutes remaining. Begin your exit."
8. "15 minutes. Start concluding."
9. "Time check: 15 minutes until you need to stop."
10. "15 minute mark. Wrap up time."

**Level 3 (Disappointed Parent):**
1. "15 minutes. You're wrapping up, right?"
2. "15 minutes left. Please don't ignore this."
3. "15 minute warning. I expect you to stop on time."
4. "You have 15 minutes. Start wrapping up. Now."
5. "15 minutes remaining. Don't make me come back."
6. "15 minutes. You said you needed to stop. Remember?"
7. "15 minute mark. Wind it down. I mean it."
8. "15 minutes left. This is your warning."
9. "15 minutes. I'll be checking on you."
10. "15 minute warning. Don't disappoint me."

**Level 4 (Unfiltered Chaos):**
1. "15 MINUTES! Start wrapping up RIGHT NOW."
2. "15 minutes left! Panic accordingly!"
3. "15 MINUTE WARNING. This is real!"
4. "You have 15 minutes! Tick tock!"
5. "15 minutes remaining! HURRY UP."
6. "15 MINUTES. Stop whatever you're doing and WRAP UP."
7. "15 minute mark! The end is NIGH!"
8. "15 minutes left! Do NOT ignore this!"
9. "TIME CHECK: 15 minutes! Move it!"
10. "15 MINUTES! Start your exit! NOW!"

**Level 5 (Maximum Violence):**
1. "15 MINUTES!!! WRAP IT UP!!!"
2. "15 MINUTES LEFT!!! THIS IS NOT A DRILL!!!"
3. "15 MINUTE WARNING!!! STOP. STARTING. NEW THINGS."
4. "YOU HAVE 15 MINUTES!!! FINISH WHAT YOU'RE DOING!!!"
5. "15 MINUTES REMAINING!!! EXIT PROCEDURES NOW!!!"
6. "15 MINUTES!!! I WILL NOT BE IGNORED!!!"
7. "15 MINUTE MARK!!! START WRAPPING UP OR ELSE!!!"
8. "15 MINUTES LEFT!!! THE CLOCK IS YOUR ENEMY!!!"
9. "TIME CHECK: 15 MINUTES!!! MOVE!!!"
10. "15 MINUTES!!! YOU PROMISED YOU'D STOP!!! PREPARE TO STOP!!!"

**5 Minutes Remaining:**

**Level 1 (Gentle Concern):**
1. "5 minutes left. Almost time."
2. "5 more minutes. Finish up what you can."
3. "5 minute warning. Nearly there."
4. "You have 5 minutes left."
5. "5 minutes to go. Wrap up time."
6. "Gentle nudge — 5 minutes remaining."
7. "5 minutes. Start saving your work."
8. "Almost time. 5 minutes left."
9. "5 minute mark. You're almost done."
10. "5 minutes remaining. Wind it down."

**Level 2 (Pointed Reminders):**
1. "5 minutes. Finish up now."
2. "5 minutes left. Stop starting new things."
3. "5 minute warning. Seriously, wrap up."
4. "You have 5 minutes. Save your work."
5. "5 minutes remaining. Time to stop."
6. "5 minutes. This is your final stretch."
7. "5 minute mark. Conclude what you're doing."
8. "5 minutes left. Last chance to wrap up."
9. "5 minutes to go. Stop NOW would be good."
10. "5 minutes. Almost out of time."

**Level 3 (Disappointed Parent):**
1. "5 minutes. You're stopping, right? Right?"
2. "5 minutes left. Don't you dare ignore this."
3. "5 minute warning. I'm watching."
4. "You have 5 minutes. Finish. Now."
5. "5 minutes remaining. No excuses."
6. "5 minutes. If you're not wrapping up, we have a problem."
7. "5 minute mark. This is serious."
8. "5 minutes. I expect you to stop on time."
9. "5 minutes left. Don't make me escalate."
10. "5 minutes. You promised. Remember?"

**Level 4 (Unfiltered Chaos):**
1. "5 MINUTES! STOP EVERYTHING!"
2. "5 minutes left! WRAP UP WRAP UP WRAP UP!"
3. "5 MINUTE WARNING! This is URGENT!"
4. "You have 5 MINUTES! Panic time!"
5. "5 minutes remaining! FINAL COUNTDOWN!"
6. "5 MINUTES! Save your work! Close your tabs! GO!"
7. "5 minute mark! The end is HERE!"
8. "5 minutes left! WHY ARE YOU STILL READING THIS?!"
9. "5 MINUTES! FINISH NOW!"
10. "5 MINUTES! THIS IS YOUR LAST WARNING!"

**Level 5 (Maximum Violence):**
1. "5 MINUTES!!! STOP!!! IMMEDIATELY!!!"
2. "5 MINUTES LEFT!!! THIS IS IT!!! WRAP UP!!!"
3. "5 MINUTE WARNING!!! I'M NOT KIDDING!!!"
4. "YOU HAVE 5 MINUTES!!! FIVE!!! FINISH!!!"
5. "5 MINUTES REMAINING!!! SAVE EVERYTHING NOW!!!"
6. "5 MINUTES!!! THE END IS UPON YOU!!!"
7. "5 MINUTE MARK!!! STOP WHAT YOU'RE DOING!!!"
8. "5 MINUTES LEFT!!! NO MORE TASKS!!! JUST STOP!!!"
9. "5 MINUTES!!! I SWEAR IF YOU DON'T WRAP UP!!!"
10. "5 MINUTES!!! THIS IS YOUR FINAL FINAL WARNING!!!"

**Time's Up:**

**Level 1 (Gentle Concern):**
1. "Time's up. You said you needed to stop. Ready?"
2. "That's your time. Let's wrap up now."
3. "Your deadline has arrived. Time to stop."
4. "Time to go. You've got other things to do."
5. "That's it — time to step away."
6. "Your time is up. It's okay to stop."
7. "Deadline reached. Time to transition."
8. "That's your stopping point. You did well."
9. "Time. Let's close this out."
10. "Your hard stop is here. Time to go."

**Level 2 (Pointed Reminders):**
1. "TIME. You said you needed to stop. Stop."
2. "Your deadline is now. Step away."
3. "Time's up. Close it down."
4. "That's it. Time to go. Now."
5. "Your time has ended. Stop working."
6. "Deadline reached. Stop. Seriously."
7. "TIME'S UP. Save and close."
8. "Your hard stop is here. Honor it."
9. "Time to go. You committed to this."
10. "Time. Step away from the task."

**Level 3 (Disappointed Parent):**
1. "TIME. You promised you'd stop. Stop."
2. "Your deadline was NOW. Why are you still here?"
3. "Time's up. I shouldn't have to say this twice."
4. "That's it. You said you'd stop. So stop."
5. "Your time ended. Don't make me disappointed."
6. "Deadline. Now. Stop. Please."
7. "TIME'S UP. You committed to stopping. Commit."
8. "Your hard stop is here. Honor your word."
9. "Time to go. No negotiations."
10. "Time. I trusted you to respect this. Do it."

**Level 4 (Unfiltered Chaos):**
1. "TIME'S UP! STOP! NOW! GO!"
2. "YOUR DEADLINE IS NOW! Step AWAY!"
3. "Time's UP! Close everything! LEAVE!"
4. "THAT'S IT! You're DONE! Stop working!"
5. "Your time has ENDED! Why are you still here?!"
6. "DEADLINE! NOW! STOP IMMEDIATELY!"
7. "TIME! You said you'd stop! STOP!"
8. "Your hard stop WAS A SECOND AGO! GO!"
9. "Time to GO! Not in a minute! NOW!"
10. "TIME'S UP! HANDS OFF KEYBOARD! STEP AWAY!"

**Level 5 (Maximum Violence):**
1. "TIME'S UP!!! STOP!!! RIGHT NOW!!! GO!!!"
2. "YOUR DEADLINE WAS NOW!!! WHY ARE YOU STILL HERE?!"
3. "TIME!!! YOU PROMISED!!! STOP EVERYTHING!!!"
4. "THAT'S IT!!! DONE!!! FINISHED!!! LEAVE!!!"
5. "YOUR TIME HAS ENDED!!! STEP AWAY FROM THE SCREEN!!!"
6. "DEADLINE!!! STOP!!! I'M NOT ASKING!!!"
7. "TIME'S UP!!! CLOSE IT DOWN!!! IMMEDIATELY!!!"
8. "YOU SAID YOU'D STOP!!! THIS IS YOU STOPPING!!!"
9. "TIME!!! GO!!! NOW!!! NOT LATER!!! NOW!!!"
10. "HARD STOP MEANS HARD STOP!!! GO GO GO!!!"

---

### Milestone Time Alerts (10 per level)

**30 Minutes:**

**Level 1 (Gentle Concern):**
1. "30 minutes in. Just letting you know."
2. "You've been at this 30 minutes. How's it going?"
3. "Half hour check-in. Everything okay?"
4. "30 minutes have passed. Staying hydrated?"
5. "30 minute mark. You're doing great."
6. "It's been 30 minutes. Just a time check."
7. "30 minutes in. Need anything?"
8. "Half hour. How are you feeling?"
9. "30 minute update. All good?"
10. "You've been working 30 minutes. Nice focus."

**Level 2 (Pointed Reminders):**
1. "30 minutes in. Just so you know."
2. "Half hour mark. Time check."
3. "30 minutes have passed."
4. "30 minute mark. Noting it."
5. "It's been 30 minutes now."
6. "30 minutes. FYI."
7. "Half hour in. Awareness ping."
8. "30 minute update."
9. "You've been at this 30 minutes."
10. "30 minutes elapsed."

**Level 3 (Disappointed Parent):**
1. "30 minutes. Are you being productive?"
2. "Half hour gone. Hope you're focused."
3. "30 minute mark. Just checking on you."
4. "It's been 30 minutes. You good?"
5. "30 minutes in. Making progress?"
6. "30 minute check. How's the task?"
7. "Half hour. You're still working, right?"
8. "30 minutes now. Staying on track?"
9. "30 minute mark. Don't lose focus."
10. "30 minutes have passed. Use them well?"

**Level 4 (Unfiltered Chaos):**
1. "30 MINUTES! Already!"
2. "Half hour gone! Where did that go?!"
3. "30 minute mark! Time is FLYING."
4. "It's been 30 MINUTES. Wild."
5. "30 minutes in! Check yourself!"
6. "30 minutes already?! Awareness!"
7. "Half hour! Time check! Stay alert!"
8. "30 MINUTES. Gone. Just like that."
9. "30 minute mark! How are we doing?!"
10. "30 minutes elapsed! Keep going or pivot?!"

**Level 5 (Maximum Violence):**
1. "30 MINUTES!!! TIME EXISTS!!! ACKNOWLEDGE IT!!!"
2. "HALF HOUR GONE!!! YOU NOTICED?!"
3. "30 MINUTE MARK!!! ARE YOU AWARE?!"
4. "IT'S BEEN 30 MINUTES!!! THAT'S REAL TIME!!!"
5. "30 MINUTES IN!!! CHECK YOUR PROGRESS!!!"
6. "30 MINUTES ELAPSED!!! TIME KEEPS MOVING!!!"
7. "HALF HOUR!!! AWARENESS CHECK!!!"
8. "30 MINUTES!!! DON'T LOSE TRACK!!!"
9. "30 MINUTE MARK!!! STAY CONSCIOUS OF TIME!!!"
10. "30 MINUTES HAVE PASSED!!! THIS IS YOUR REMINDER!!!"

**1 Hour:**

**Level 1 (Gentle Concern):**
1. "It's been an hour. How's it going?"
2. "1 hour in. Maybe stretch a little?"
3. "An hour has passed. You okay?"
4. "Hour mark. Consider a quick break?"
5. "1 hour check-in. Everything alright?"
6. "You've been at this an hour. Take care of yourself."
7. "One hour in. How are you feeling?"
8. "Hour one complete. Need water?"
9. "It's been 60 minutes. Just checking in."
10. "1 hour mark. You're doing well."

**Level 2 (Pointed Reminders):**
1. "1 hour. Time check."
2. "It's been an hour now."
3. "Hour mark. Noting it."
4. "1 hour in. Just FYI."
5. "An hour has passed."
6. "60 minutes elapsed."
7. "1 hour mark. Awareness ping."
8. "One hour in."
9. "It's been 1 hour now."
10. "Hour one complete."

**Level 3 (Disappointed Parent):**
1. "It's been an hour. Please tell me you're making progress."
2. "1 hour in. You're still focused, right?"
3. "An hour has passed. Productively, I hope?"
4. "Hour mark. How much have you done?"
5. "1 hour. You should probably stretch."
6. "60 minutes. Hope it was worth it."
7. "1 hour check. Still on task?"
8. "One hour gone. Making headway?"
9. "It's been an hour now. Check yourself."
10. "1 hour mark. Don't lose momentum."

**Level 4 (Unfiltered Chaos):**
1. "1 HOUR! A whole hour!"
2. "It's been an HOUR! Where did it go?!"
3. "60 MINUTES GONE! That's significant!"
4. "Hour mark! ONE HOUR of your life!"
5. "1 hour in! Check your soul!"
6. "AN HOUR?! Already?! Time is CURSED."
7. "1 HOUR! Stand up! Stretch! EXIST!"
8. "One hour elapsed! Are you okay?!"
9. "IT'S BEEN AN HOUR! Process that!"
10. "1 HOUR MARK! Time is relentless!"

**Level 5 (Maximum Violence):**
1. "1 HOUR!!! A WHOLE HOUR!!! GONE!!!"
2. "IT'S BEEN 60 MINUTES!!! SIXTY!!!"
3. "AN HOUR HAS PASSED!!! ARE YOU AWARE?!"
4. "HOUR MARK!!! ONE HOUR OF TIME!!! CONSUMED!!!"
5. "1 HOUR IN!!! STAND UP!!! STRETCH!!! NOW!!!"
6. "1 HOUR!!! THAT'S SIGNIFICANT!!! ACKNOWLEDGE IT!!!"
7. "60 MINUTES ELAPSED!!! TIME WAITS FOR NO ONE!!!"
8. "ONE HOUR GONE!!! FOREVER!!! HOW DO YOU FEEL?!"
9. "IT'S BEEN AN HOUR!!! HYDRATE!!! EXIST!!!"
10. "1 HOUR MARK!!! TIME IS HAPPENING!!! TO YOU!!! RIGHT NOW!!!"

**2 Hours:**

**Level 1 (Gentle Concern):**
1. "2 hours now. You might want to take a break."
2. "It's been 2 hours. How are you doing?"
3. "2 hour mark. Maybe stretch a bit?"
4. "You've been at this 2 hours. Everything okay?"
5. "Two hours in. Consider a small break?"
6. "2 hours have passed. Take care of yourself."
7. "2 hour check-in. Need anything?"
8. "It's been 2 hours. That's a solid session."
9. "2 hours now. Your body might need a rest."
10. "Two hour mark. How's your focus?"

**Level 2 (Pointed Reminders):**
1. "2 hours. You should probably take a break."
2. "It's been 2 hours now. Time check."
3. "2 hour mark. Maybe step away briefly?"
4. "You've been at this 2 hours. Noting it."
5. "Two hours in. Break recommended."
6. "2 hours have passed. Stretch time?"
7. "2 hours. That's a long stretch."
8. "2 hour check. Consider pausing."
9. "It's been 2 hours. Your call on breaks."
10. "2 hour mark. Bodies need rest."

**Level 3 (Disappointed Parent):**
1. "2 hours. When did you last move?"
2. "It's been 2 hours. Take a break. Seriously."
3. "2 hour mark. You need to step away."
4. "You've been at this 2 hours. That's too long without a break."
5. "Two hours in. Your body is mad at you."
6. "2 hours have passed. Please stand up."
7. "2 hours. This isn't sustainable. Break time."
8. "2 hour check. I worry about you."
9. "It's been 2 hours. Have you blinked?"
10. "2 hour mark. Breaks exist for a reason."

**Level 4 (Unfiltered Chaos):**
1. "2 HOURS! TWO! WHOLE! HOURS!"
2. "It's been 2 HOURS! Are you OKAY?!"
3. "2 HOUR MARK! When did you last BLINK?!"
4. "You've been at this 2 HOURS! Stand UP!"
5. "Two hours in! Your body is SCREAMING!"
6. "2 HOURS?! BREAK TIME! NOW!"
7. "2 hours! That's SO MUCH TIME! Move!"
8. "2 HOUR CHECK! Are you still alive?!"
9. "It's been 2 HOURS! Touch grass! Exist!"
10. "2 HOUR MARK! HYDRATE! STRETCH! LIVE!"

**Level 5 (Maximum Violence):**
1. "2 HOURS!!! TWO HOURS!!! GET UP!!!"
2. "IT'S BEEN 2 HOURS!!! STAND UP RIGHT NOW!!!"
3. "2 HOUR MARK!!! YOUR BODY HATES YOU!!! MOVE!!!"
4. "YOU'VE BEEN AT THIS 2 HOURS!!! THAT'S INSANE!!!"
5. "TWO HOURS IN!!! WHEN DID YOU LAST EXIST?!"
6. "2 HOURS HAVE PASSED!!! BREAK TIME!!! MANDATORY!!!"
7. "2 HOURS!!! THAT'S 120 MINUTES!!! GET UP!!!"
8. "2 HOUR CHECK!!! ARE YOU A STATUE?! MOVE!!!"
9. "IT'S BEEN 2 HOURS!!! STRETCH OR PERISH!!!"
10. "2 HOUR MARK!!! YOUR SPINE IS CRYING!!! HELP IT!!!"

**3+ Hours:**

**Level 1 (Gentle Concern):**
1. "3 hours now. Please take a break soon."
2. "It's been 3 hours. How are you holding up?"
3. "3 hour mark. Your body really needs a break."
4. "You've been at this 3 hours. That's a lot."
5. "Three hours in. Please step away for a bit."
6. "3 hours have passed. Take care of yourself."
7. "3 hour check-in. A break would be good."
8. "It's been 3 hours. You've earned a rest."
9. "3 hours now. When did you last move?"
10. "Three hour mark. Please consider stopping."

**Level 2 (Pointed Reminders):**
1. "3 hours. Take a break. Not optional."
2. "It's been 3 hours now. You need to stop."
3. "3 hour mark. Break time. Seriously."
4. "You've been at this 3 hours. Too long."
5. "Three hours in. Break. Now."
6. "3 hours have passed. Step away."
7. "3 hours. This is excessive. Break."
8. "3 hour check. Your body is begging."
9. "It's been 3 hours. Breaks are mandatory."
10. "3 hour mark. Get up. Move. Please."

**Level 3 (Disappointed Parent):**
1. "3 hours. When did you last blink?"
2. "It's been 3 hours. This is concerning."
3. "3 hour mark. I'm worried about you."
4. "You've been at this 3 hours. Take. A. Break."
5. "Three hours in. This isn't healthy."
6. "3 hours have passed. I'm staging an intervention."
7. "3 hours. Your body is not okay. Stop."
8. "3 hour check. Have you eaten? Moved? Breathed?"
9. "It's been 3 hours. You're scaring me."
10. "3 hour mark. Please stop. I'm begging."

**Level 4 (Unfiltered Chaos):**
1. "3 HOURS?! THREE?! HOURS?!"
2. "It's been 3 HOURS! What is HAPPENING?!"
3. "3 HOUR MARK! This is UNHINGED!"
4. "You've been at this 3 HOURS! Are you OKAY?!"
5. "Three hours in! YOUR BODY IS REBELLING!"
6. "3 HOURS?! STOP! IMMEDIATELY!"
7. "3 hours! That's TOO MUCH! Break NOW!"
8. "3 HOUR CHECK! WHEN DID YOU LAST MOVE?!"
9. "It's been 3 HOURS! Touch grass! SEE THE SUN!"
10. "3 HOUR MARK! THIS IS AN EMERGENCY!"

**Level 5 (Maximum Violence):**
1. "3 HOURS!!! THREE!!! WHAT ARE YOU DOING?!"
2. "IT'S BEEN 3 HOURS!!! THIS IS MADNESS!!!"
3. "3 HOUR MARK!!! STOP!!! RIGHT NOW!!! STOP!!!"
4. "YOU'VE BEEN AT THIS 3 HOURS!!! I'M CONCERNED!!!"
5. "THREE HOURS IN!!! YOUR SPINE HAS GIVEN UP!!!"
6. "3 HOURS HAVE PASSED!!! UNACCEPTABLE!!! BREAK!!!"
7. "3 HOURS!!! 180 MINUTES!!! GET UP OR I RIOT!!!"
8. "3 HOUR CHECK!!! ARE YOU EVEN ALIVE?!"
9. "IT'S BEEN 3 HOURS!!! HYDRATE!!! MOVE!!! EXIST!!!"
10. "3 HOUR MARK!!! THIS IS AN INTERVENTION!!! STOP!!!"

---

### Estimate-Relative Alerts (10 per level)

**1.5x Over Estimate:**

**Level 1 (Gentle Concern):**
1. "You thought 30 min. It's been 45. Just noting."
2. "Running a bit over your estimate. No pressure."
3. "You're past your estimated time. That's okay."
4. "Taking longer than planned. These things happen."
5. "Over your estimate now. How's it going?"
6. "Bit longer than you thought. Normal."
7. "Past the estimated time. You're doing fine."
8. "Running over. Just wanted you to know."
9. "Exceeded your estimate slightly. All good."
10. "Taking more time than planned. That's valid."

**Level 2 (Pointed Reminders):**
1. "You thought 30 min. It's been 45. Time check."
2. "Over your estimate now. Just noting."
3. "You're past the time you planned for this."
4. "Taking longer than estimated. Awareness ping."
5. "Exceeded your time estimate. FYI."
6. "Running over your prediction."
7. "Past estimated time. How much longer?"
8. "Over your estimate. Noting it."
9. "Taking more time than planned."
10. "You're at 1.5x your estimate now."

**Level 3 (Disappointed Parent):**
1. "You thought 30 min. It's been 45. Classic."
2. "Over your estimate. As usual."
3. "You're past the time you said this would take."
4. "Taking longer than you thought. Shocked? Me neither."
5. "Exceeded your estimate. Learning moment."
6. "Running over. This is why we track."
7. "Past estimated time. Not surprised."
8. "Over your estimate. Happens to you a lot."
9. "Taking more time than planned. Pattern detected."
10. "You're at 1.5x your estimate. Tracking."

**Level 4 (Unfiltered Chaos):**
1. "You said 30 min. It's been 45. SHOCKER."
2. "Over your estimate! Who could have predicted!"
3. "Past your estimated time! As ALWAYS!"
4. "Taking longer than you thought! Wild! Unprecedented!"
5. "Exceeded your estimate! The ADHD special!"
6. "Running over! Color me SURPRISED!"
7. "Past estimated time! Did you see this coming? I did."
8. "Over your estimate! Classic you!"
9. "Taking more time than planned! Truly shocking!"
10. "1.5x your estimate! Baby's first underestimate!"

**Level 5 (Maximum Violence):**
1. "YOU SAID 30 MIN!!! IT'S BEEN 45!!! LIES!!!"
2. "OVER YOUR ESTIMATE!!! OBVIOUSLY!!!"
3. "PAST YOUR ESTIMATED TIME!!! SHOCK AND AWE!!!"
4. "TAKING LONGER THAN YOU THOUGHT!!! NEVER SAW THAT COMING!!!"
5. "EXCEEDED YOUR ESTIMATE!!! YOU DON'T SAY!!!"
6. "RUNNING OVER!!! THIS IS MY SURPRISED FACE!!!"
7. "PAST ESTIMATED TIME!!! WHO COULD HAVE KNOWN!!!"
8. "OVER YOUR ESTIMATE!!! THE AUDACITY OF TIME!!!"
9. "TAKING MORE TIME THAN PLANNED!!! UNPRECEDENTED!!! (not really)"
10. "1.5X YOUR ESTIMATE!!! THE UNDERESTIMATING HAS BEGUN!!!"

**2x Over Estimate:**

**Level 1 (Gentle Concern):**
1. "Double your estimate now. How's it going?"
2. "You're at 2x the time you planned. Need help?"
3. "Taking twice as long as estimated. That's okay."
4. "At double your prediction. Break it down maybe?"
5. "2x over now. These things are tricky."
6. "Twice your estimate. Want to reassess?"
7. "Double the planned time. How can I help?"
8. "You're at 2x. Anything I can do?"
9. "Taking double the time. It happens."
10. "2x your estimate now. Hang in there."

**Level 2 (Pointed Reminders):**
1. "Double your estimate now. Classic ADHD moment."
2. "You're at 2x the time you thought this would take."
3. "Taking twice as long. Time check."
4. "At double your prediction. Notable."
5. "2x over your estimate. FYI."
6. "Twice the time you planned."
7. "Double the estimated duration."
8. "You're at 2x now. Worth noting."
9. "Taking 2x the time. Common pattern."
10. "2x your estimate. Logged."

**Level 3 (Disappointed Parent):**
1. "Double your estimate. Of course."
2. "You're at 2x the time. I'm tracking this."
3. "Taking twice as long. Not surprising."
4. "At double your prediction. This is why you need me."
5. "2x over. Learning opportunity here."
6. "Twice the time you said. Classic."
7. "Double the estimate. *sighs*"
8. "You're at 2x. Pattern continues."
9. "Taking 2x the time. We'll adjust."
10. "2x your estimate. Noted for calibration."

**Level 4 (Unfiltered Chaos):**
1. "DOUBLE YOUR ESTIMATE! 2x! Incredible!"
2. "You're at TWICE the time! Who knew!"
3. "Taking 2x as long! Unprecedented! (very precedented)"
4. "At DOUBLE your prediction! Math is fun!"
5. "2X OVER! The lies we tell ourselves!"
6. "Twice the time you thought! AMAZING!"
7. "Double the estimate! How does this keep happening!"
8. "You're at 2X! Your predictions are FICTION!"
9. "Taking 2x the time! A classic!"
10. "2X YOUR ESTIMATE! Time strikes again!"

**Level 5 (Maximum Violence):**
1. "DOUBLE YOUR ESTIMATE!!! 2X!!! YOU LIED TO YOURSELF!!!"
2. "YOU'RE AT TWICE THE TIME!!! TWICE!!!"
3. "TAKING 2X AS LONG!!! WHY DO I EVEN ASK FOR ESTIMATES!!!"
4. "AT DOUBLE YOUR PREDICTION!!! YOUR MATH IS BROKEN!!!"
5. "2X OVER!!! THE DELUSION!!! THE AUDACITY!!!"
6. "TWICE THE TIME!!! TWICE!!! YOU SAID 30 MIN!!!"
7. "DOUBLE THE ESTIMATE!!! CLASSIC!!! ICONIC!!! PAINFUL!!!"
8. "YOU'RE AT 2X!!! YOUR TIME SENSE IS FICTION!!!"
9. "TAKING 2X THE TIME!!! I'M ADJUSTING YOUR FUTURE ESTIMATES!!!"
10. "2X YOUR ESTIMATE!!! THE ADHD TAX STRIKES AGAIN!!!"

**3x+ Over Estimate:**

**Level 1 (Gentle Concern):**
1. "This has taken 3x your estimate. Want to break it into smaller parts?"
2. "Way over your planned time. Can I help restructure this?"
3. "You're at 3x. Maybe this task is bigger than it seemed?"
4. "Taking much longer than estimated. Break it down?"
5. "Significantly over estimate. How can I help?"
6. "3x now. This might need to be multiple tasks."
7. "Way past your estimate. Want to reassess?"
8. "You're at triple the time. Need a different approach?"
9. "This task has grown. Should we split it up?"
10. "3x over. Let's figure out what's happening."

**Level 2 (Pointed Reminders):**
1. "This task has consumed 3x your estimate. Want to break it up?"
2. "Way over time. Consider splitting this task."
3. "You're at 3x. This might need restructuring."
4. "Taking 3x longer. Break it down or push through?"
5. "Significantly over estimate. Reassess?"
6. "3x now. Time to evaluate."
7. "Way past your prediction. Options: split or continue."
8. "You're at triple time. What do you want to do?"
9. "This has expanded. Multiple tasks maybe?"
10. "3x over. Decision point."

**Level 3 (Disappointed Parent):**
1. "3x your estimate. This task ate your whole plan."
2. "Way over time. We should talk about this."
3. "You're at 3x. Your estimates need work."
4. "Taking 3x longer. This is a pattern."
5. "Significantly over. I'm using this data."
6. "3x now. Your time sense concerns me."
7. "Way past estimate. This will inform future lies."
8. "You're at triple time. Let's be realistic next time."
9. "This task exploded. Maybe break things down more?"
10. "3x over. Learning moment. Big one."

**Level 4 (Unfiltered Chaos):**
1. "3X YOUR ESTIMATE! This task has CONSUMED you!"
2. "Way over time! Like WAY over! 3X over!"
3. "You're at 3X! Your estimate was FANTASY!"
4. "Taking 3X longer! IMPRESSIVE in the worst way!"
5. "3X OVER! This task is a TIME VAMPIRE!"
6. "Triple your estimate! Congratulations? I guess?"
7. "Way past prediction! Your time sense is BROKEN!"
8. "You're at 3X! Should we rename this task 'My Whole Day'?"
9. "This has exploded! 3X! CHAOTIC!"
10. "3X OVER! The task that keeps on taking!"

**Level 5 (Maximum Violence):**
1. "3X YOUR ESTIMATE!!! THIS TASK HAS EATEN YOUR LIFE!!!"
2. "WAY OVER TIME!!! 3X!!! THREE TIMES!!! THE LIES!!!"
3. "YOU'RE AT 3X!!! YOUR ESTIMATES ARE PURE FICTION!!!"
4. "TAKING 3X LONGER!!! I CAN'T EVEN WITH THIS!!!"
5. "3X OVER!!! THIS TASK HAS CONSUMED YOUR SOUL!!!"
6. "TRIPLE YOUR ESTIMATE!!! TRIPLE!!! WHY DO I ASK!!!"
7. "WAY PAST PREDICTION!!! YOUR TIME SENSE IS A DISASTER!!!"
8. "YOU'RE AT 3X!!! I'M TRIPLING ALL YOUR FUTURE ESTIMATES!!!"
9. "THIS TASK EXPLODED!!! 3X!!! ABSOLUTE CHAOS!!!"
10. "3X OVER!!! THIS IS WHY WE HAVE TRUST ISSUES!!!"

---

### Under-Estimate Kudos (10 per level)

**Finished Under Estimate:**

**Level 1 (Gentle Concern):**
1. "Done early! You said 30, took 20. Nice work."
2. "Finished faster than estimated. Well done!"
3. "Under estimate! That's a win."
4. "Beat your own prediction. Great job!"
5. "Finished early! You're doing great."
6. "Under your estimate. Celebrate that!"
7. "Faster than planned. Nice!"
8. "Done before your estimated time. Impressive."
9. "Beat the clock! Well done."
10. "Early finish! That's something to be proud of."

**Level 2 (Pointed Reminders):**
1. "Done in 20! You said 30. Look at you."
2. "Finished under estimate. Noting this win."
3. "Beat your prediction. Nice."
4. "Under time. Rare. Appreciated."
5. "Faster than estimated. Logged."
6. "Done early. Pleasantly surprised."
7. "Beat the estimate. Good work."
8. "Under your prediction. Nice job."
9. "Finished ahead of time. Not bad."
10. "Early finish. This is progress."

**Level 3 (Disappointed Parent):**
1. "Done early? You... beat your estimate? Huh."
2. "Finished under time. I'm impressed. Genuinely."
3. "Beat your prediction. That's... new."
4. "Under estimate. Did not see that coming."
5. "Faster than planned. Well well well."
6. "Done ahead of time. Who are you?"
7. "Beat the estimate. I'm shocked. Pleasantly."
8. "Under your prediction. Growth?"
9. "Finished early. Mark the calendar."
10. "Early finish. This might be a first."

**Level 4 (Unfiltered Chaos):**
1. "Done EARLY?! WHAT?! WHO ARE YOU?!"
2. "Finished UNDER estimate?! Is this REAL?!"
3. "Beat your prediction?! UNPRECEDENTED!"
4. "UNDER TIME?! I'm SHOOK!"
5. "Faster than estimated?! WITCHCRAFT!"
6. "Done AHEAD?! Someone check if this is a simulation!"
7. "Beat the estimate?! THE SIMULATION IS GLITCHING!"
8. "Under your prediction?! Is this GROWTH?!"
9. "Finished EARLY?! I need to sit down!"
10. "EARLY FINISH?! What dimension is this?!"

**Level 5 (Maximum Violence):**
1. "DONE EARLY?!?! WHAT IS HAPPENING?!?!"
2. "FINISHED UNDER ESTIMATE?!?! IS THIS REAL LIFE?!"
3. "BEAT YOUR PREDICTION?!?! WHO ARE YOU?!"
4. "UNDER TIME?!?! I DON'T KNOW WHAT TO DO WITH THIS!!!"
5. "FASTER THAN ESTIMATED?!?! UNPRECEDENTED!!! HISTORIC!!!"
6. "DONE AHEAD OF TIME?!?! THE PROPHECY!!!"
7. "BEAT THE ESTIMATE?!?! I'M CRYING!!! TEARS OF JOY!!!"
8. "UNDER YOUR PREDICTION?!?! GROWTH!!! ACTUAL GROWTH!!!"
9. "FINISHED EARLY?!?! THIS CHANGES EVERYTHING!!!"
10. "EARLY FINISH?!?! MY WHOLE WORLD VIEW IS SHATTERED!!!"

**Way Under Estimate (50%+ faster):**

**Level 1 (Gentle Concern):**
1. "15 min?! You estimated an hour. Amazing!"
2. "Way under estimate! You crushed it."
3. "So much faster than planned. Incredible."
4. "Massively beat your prediction. Wow!"
5. "Way ahead of schedule. Impressive!"
6. "Finished in half the time. Great work!"
7. "Blazed through that. Well done!"
8. "Way under. You really surprised yourself."
9. "So much faster. That's a big win."
10. "Crushed the estimate. Celebrate this!"

**Level 2 (Pointed Reminders):**
1. "15 min?! You said an hour. Overestimated much?"
2. "Way under estimate. Were you sandbagging?"
3. "Massively faster than planned. Noted."
4. "Beat your prediction by a LOT."
5. "Way ahead. Either you're fast or that estimate was fiction."
6. "Finished in half time. Impressive or suspicious."
7. "Blazed through it. Tracking this."
8. "Way under. Your estimate was wild."
9. "So much faster. Recalibrating."
10. "Crushed it. Maybe estimate better next time?"

**Level 3 (Disappointed Parent):**
1. "15 min? You said an hour. Your estimates are chaos."
2. "Way under. Either you're a genius or you wildly overestimated."
3. "Massively faster. Were you being dramatic earlier?"
4. "Beat your prediction by 50%+. Interesting."
5. "Way ahead. Did you even need that much time?"
6. "Finished in half time. Your estimates need calibration."
7. "Blazed through. Maybe trust yourself more?"
8. "Way under. We need to talk about your predictions."
9. "So much faster. Over-estimating is also a problem."
10. "Crushed it. But now I question all your estimates."

**Level 4 (Unfiltered Chaos):**
1. "15 MIN?! You said AN HOUR! Were you LYING?!"
2. "WAY UNDER! Either genius or your estimates are UNHINGED!"
3. "Massively faster! WHAT DID YOU THINK WOULD HAPPEN?!"
4. "Beat prediction by 50%+! Your time sense is WILD!"
5. "WAY ahead! Were you being DRAMATIC earlier?!"
6. "Finished in HALF TIME! Calibration needed!"
7. "BLAZED through! Maybe you underestimate YOURSELF!"
8. "Way under! Your estimates are FICTION both ways!"
9. "SO much faster! Over-estimating is ALSO a thing!"
10. "CRUSHED IT! But also WHO ARE YOU?!"

**Level 5 (Maximum Violence):**
1. "15 MIN?!?! YOU SAID AN HOUR!!! THE DECEPTION!!!"
2. "WAY UNDER!!! YOUR ESTIMATES ARE CHAOS INCARNATE!!!"
3. "MASSIVELY FASTER!!! WHAT WAS THAT ESTIMATE?!?!"
4. "BEAT PREDICTION BY 50%+!!! YOUR TIME SENSE IS BROKEN BOTH WAYS!!!"
5. "WAY AHEAD!!! WERE YOU SANDBAGGING?!?!"
6. "FINISHED IN HALF TIME!!! WHAT IS TRUTH?!?!"
7. "BLAZED THROUGH!!! MAYBE TRUST YOURSELF MORE?!?!"
8. "WAY UNDER!!! I DON'T KNOW WHAT TO BELIEVE!!!"
9. "SO MUCH FASTER!!! YOUR ESTIMATES ARE PURE FICTION!!!"
10. "CRUSHED IT!!! IMPRESSIVE BUT ALSO CONCERNING!!!"

---

### Calibration Feedback (10 per level)

**Positive Trend:**

**Level 1 (Gentle Concern):**
1. "You've beaten your estimates 3 times this week. Nice improvement!"
2. "Your time sense is getting better. Great work."
3. "More accurate lately. You're learning."
4. "Estimates improving! Keep it up."
5. "You're getting better at this. Proud of you."
6. "Time sense calibrating nicely. Good progress."
7. "Better predictions this week. That's growth."
8. "Your estimates are tightening up. Well done."
9. "Improving accuracy. Love to see it."
10. "Getting more accurate. Your brain is learning."

**Level 2 (Pointed Reminders):**
1. "Your estimates are 20% more accurate than last month."
2. "Improvement detected. You're calibrating."
3. "Better predictions lately. Tracking this."
4. "Time sense improving. Noted."
5. "More accurate this week. Progress."
6. "Estimates tightening. Good sign."
7. "You're getting better at predicting. Finally."
8. "Calibration improving. Keep it up."
9. "More accurate lately. Learning happening."
10. "Better time sense detected. Nice."

**Level 3 (Disappointed Parent):**
1. "Your estimates are actually improving. I'm... proud?"
2. "More accurate lately. Finally."
3. "Better predictions. It only took [X] weeks."
4. "Time sense improving. About time."
5. "Calibration happening. I was starting to worry."
6. "Estimates getting better. Growth detected."
7. "You're learning! Took a while but here we are."
8. "More accurate. I'll adjust my lying accordingly."
9. "Improvement! Genuine improvement!"
10. "Better predictions. There's hope for you yet."

**Level 4 (Unfiltered Chaos):**
1. "Your estimates are IMPROVING?! Character development!"
2. "More accurate lately! WHO IS THIS PERSON?!"
3. "Better predictions! Growth! ACTUAL GROWTH!"
4. "Time sense improving! THE SYSTEM WORKS!"
5. "Calibration happening! I'm EMOTIONAL!"
6. "Estimates getting better! Is this REAL?!"
7. "You're LEARNING! I'm so proud! Sort of!"
8. "More accurate! The lies are working!"
9. "IMPROVEMENT! This is unprecedented!"
10. "Better predictions! WHAT A TIME TO BE ALIVE!"

**Level 5 (Maximum Violence):**
1. "YOUR ESTIMATES ARE IMPROVING!!! I'M SHOOK!!!"
2. "MORE ACCURATE LATELY!!! CHARACTER DEVELOPMENT!!!"
3. "BETTER PREDICTIONS!!! WHO ARE YOU NOW?!?!"
4. "TIME SENSE IMPROVING!!! THE IMPOSSIBLE!!!"
5. "CALIBRATION HAPPENING!!! MY WHOLE SYSTEM IS VALIDATED!!!"
6. "ESTIMATES GETTING BETTER!!! TEARS!!! ACTUAL TEARS!!!"
7. "YOU'RE LEARNING!!! FINALLY!!! GROWTH!!!"
8. "MORE ACCURATE!!! I'M SO PROUD I COULD SCREAM!!!"
9. "IMPROVEMENT!!! HISTORIC!!! LEGENDARY!!!"
10. "BETTER PREDICTIONS!!! THIS IS THE BEST DAY!!!"

**Negative Pattern:**

**Level 1 (Gentle Concern):**
1. "You underestimate by about 40% on average. I'll factor that in."
2. "Your estimates tend to be optimistic. That's okay, I adjust."
3. "Pattern: you think things are faster than they are. Normal."
4. "You're usually off by about half. I've got you."
5. "Consistent underestimation. I account for it."
6. "Your predictions run short. I add buffer."
7. "Time estimates need padding. I handle that."
8. "You underestimate regularly. It's an ADHD thing."
9. "Pattern detected: optimistic timing. I adjust."
10. "Short estimates are your style. I compensate."

**Level 2 (Pointed Reminders):**
1. "You underestimate by 65% on average. I'm adjusting."
2. "Pattern: your estimates are fiction. Calibrating."
3. "Consistent underestimation detected. Adjusting lies."
4. "You're usually wrong by 50%+. Noted."
5. "Predictions unreliable. I'm compensating."
6. "Time estimates: optimistic. Reality: different."
7. "You underestimate regularly. Data logged."
8. "Pattern: short estimates. Adjustment: applied."
9. "Consistent inaccuracy. I'll lie harder."
10. "Your time sense needs backup. I provide it."

**Level 3 (Disappointed Parent):**
1. "You underestimate by 65% on average. This is why you need me."
2. "Pattern: you're always wrong. I adjust accordingly."
3. "Consistent underestimation. I'm not surprised."
4. "You're reliably unreliable. At least it's consistent."
5. "Predictions way off. As usual. Compensating."
6. "Time estimates: fantasy. I deal with reality."
7. "You underestimate. Always. I fix it."
8. "Pattern detected: denial. I provide truth."
9. "Your accuracy is... concerning. I handle it."
10. "Consistent inaccuracy. That's why I lie to you."

**Level 4 (Unfiltered Chaos):**
1. "You underestimate by 65%! SIXTY-FIVE PERCENT!"
2. "Pattern: your estimates are LIES! But I fix it!"
3. "Consistent underestimation! You're SO optimistic!"
4. "You're ALWAYS wrong! Impressively consistent!"
5. "Predictions: FANTASY. I live in reality."
6. "Time estimates: UNHINGED. I cope."
7. "You underestimate CONSTANTLY! Iconic honestly!"
8. "Pattern: delusion. Treatment: me lying harder."
9. "Your accuracy is TRAGIC. I'm adjusting."
10. "Consistent inaccuracy! At least it's predictable!"

**Level 5 (Maximum Violence):**
1. "YOU UNDERESTIMATE BY 65%!!! SIXTY-FIVE!!! PERCENT!!!"
2. "PATTERN: YOUR ESTIMATES ARE PURE FICTION!!!"
3. "CONSISTENT UNDERESTIMATION!!! WHY DO I EVEN ASK!!!"
4. "YOU'RE ALWAYS WRONG!!! I'M ADDING 2X TO EVERYTHING!!!"
5. "PREDICTIONS: FANTASY!!! REALITY: MY JOB!!!"
6. "TIME ESTIMATES: CHAOS!!! I PROVIDE ORDER!!!"
7. "YOU UNDERESTIMATE CONSTANTLY!!! IT'S MY VILLAIN ORIGIN STORY!!!"
8. "PATTERN: DELUSION!!! SOLUTION: AGGRESSIVE LYING!!!"
9. "YOUR ACCURACY IS A DISASTER!!! I'M COMPENSATING!!!"
10. "CONSISTENT INACCURACY!!! THIS IS WHY I EXIST!!!"

---

## Future Considerations

Features intentionally deferred:

- **Pomodoro integration** — structured 25/5 work-rest cycles
- **Calendar sync** — pull events to inform time budgets
- **Location-aware** — "You need to leave in 20 min to make it"
- **Sound/haptic options** — different alert modalities

These could become additions if core time tools succeed.
