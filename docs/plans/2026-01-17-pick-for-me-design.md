# Pick For Me — Design Document

**Feature:** Decision overwhelm helper with escalating single-task mode
**Date:** 2026-01-17
**Status:** Draft

---

## Overview

A "Pick For Me" button that removes decision burden by selecting a task for the user. Under the hood, Tick uses a smart weighted algorithm but presents it as random. If the user asks twice without completing anything, Tick escalates to single-task mode — hiding the full list until the user earns their way out by completing tasks.

---

## Core Mechanics

### Pick For Me Button

- Appears on TaskListPage when 2+ incomplete tasks exist
- Tick "randomly" selects a task using a hidden priority algorithm
- Selected task gets highlighted, others dim slightly
- User can still choose a different task or hit "Pick Again"

### Escalation Trigger

If user hits "Pick For Me" a second time without completing the first pick:
- Tick recognizes decision paralysis
- Forces single-task mode
- List is hidden, only the picked task is visible

### Single-Task Mode

- One task displayed at a time
- Two actions: **Done** or **Can't right now**
- Dismissing cycles to the next smart pick (doesn't count toward freedom)
- Completing counts toward earning list access back

### Earning Your Way Out

Number of completions required scales with reliability score:

| Reliability Score | Tasks to Complete |
|-------------------|-------------------|
| 80%+ | 1 |
| 50-79% | 2 |
| 25-49% | 3 |
| Below 25% | 4 |

---

## The "Sneaky Smart" Algorithm

Tick pretends to pick randomly but actually weighs:

| Signal | Weight | Description |
|--------|--------|-------------|
| Deadline proximity | High | Tasks due sooner (fake deadline) surface first |
| Task age | Medium | Ignored tasks get a boost over time |
| Quick win potential | Medium | Shorter/simpler tasks when user seems stuck |
| Streak protection | High | Prioritize tasks that save an active streak |
| Reliability impact | Low | Slight bias toward score-improving tasks |

### Quick Win Detection

**Phase 1 (Launch):** Infer from task title keywords and length
- Quick indicators: "call," "email," "text," "check," "send," "reply," "book"
- Longer titles with multiple clauses = likely more complex

**Phase 2 (Later):** Learn from user's completion speed over time

### The Randomness Lie

~20% actual randomness added so picks don't feel deterministic. User occasionally gets a "suboptimal" pick, which sells the illusion.

---

## UI Components

### Button Placement

- Floating button near Tick in the corner
- Icon: dice or shuffle
- Only visible with 2+ incomplete tasks

### Button States

| State | Label | Behavior |
|-------|-------|----------|
| Default | "Pick For Me" | Selects and highlights a task |
| After first pick | "Pick Again" | Available but triggers escalation if used |
| Single-task mode | Hidden | User is past needing it |

### Picked Task Visual

- Highlighted card with glow/border
- Tick pointing gesture
- Other tasks dimmed but visible

### Single-Task Mode View

- Full view replacement (not modal)
- Task card centered and enlarged
- Progress indicator: "Complete 2 more to unlock your list"
- Tick visible and expressive
- Navigation allowed (settings, etc.) but returning to tasks = still single-task mode

---

## Settings

New "Focus Tools" section:

| Setting | Options | Default |
|---------|---------|---------|
| Pick For Me | On / Off | On |
| Single-task escalation | On / Off | On |
| Show earn-out progress | On / Off | On |

---

## Integration with Existing Features

- **Spiciness:** All copy in this feature respects spiciness level
- **Reliability score:** Determines earn-out threshold; completions still update score
- **Notifications:** Nudge if stuck in single-task mode too long
- **Monthly stats:** Track Pick For Me usage and escalations

**Subscription:** Ships as core experience (free tier included)

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Only 1 task | Button hidden |
| All tasks overdue | Prioritize oldest overdue |
| Complete via notification while in single-task mode | Counts toward earn-out |
| Add task while in single-task mode | Task added, list stays hidden |
| Close app, return later | Single-task mode persists |
| 0 incomplete tasks | Button hidden, normal empty state |

---

## Tick Copy

### "Random" Selection Copy (10 sayings)

Used when Tick picks a task:

1. "I closed my eyes and pointed. This one."
2. "Randomly selected. Definitely didn't think about it."
3. "The algorithm has spoken. (There is no algorithm.)"
4. "Picked by chaos. You're welcome."
5. "I threw all your tasks in a hat. This one came out."
6. "Eeny, meeny, miny... this one."
7. "The universe chose. I'm just the messenger."
8. "Random pick! (I'm lying. But you knew that.)"
9. "Fate has decided. Don't argue with fate."
10. "*spins wheel* This one! Totally random. Trust me."

### Escalation Trigger Copy (10 sayings per level)

**Level 1 (Gentle Concern):**
1. "Hey, you asked twice. Want me to simplify things?"
2. "Looks like choosing is hard right now. I can help with that."
3. "Two picks — let me just show you one at a time."
4. "It's okay. Decisions are tough. I've got you."
5. "Let's try something gentler. One task at a time."
6. "No pressure. I'll narrow it down for you."
7. "Seems like you're stuck. Single-task mode might help."
8. "No worries. Let's focus on just one thing together."
9. "The list might be overwhelming. I'll put it away for now."
10. "Deep breath. One task. We've got this."

**Level 2 (Pointed Reminders):**
1. "You asked twice. Seems like you need me to take the wheel."
2. "Two picks, no progress. Let me simplify things for you."
3. "Having trouble choosing? I'll just show you one at a time."
4. "Decisions are hard. I get it. Here's one task."
5. "Let's try something different. One task. Just one."
6. "Too many options? I'm narrowing it down for you."
7. "I notice you're stuck. Single-task mode activated."
8. "No judgment. Let's focus on just one thing."
9. "The list is overwhelming you. I'm putting it away for now."
10. "Okay. We're doing this one task at a time now."

**Level 3 (Disappointed Parent):**
1. "Two picks, zero tasks done. I'm hiding the list. You'll thank me."
2. "You can't handle the list right now. That's fine. One task."
3. "I gave you a choice. You asked for another. Now you get neither."
4. "The list is going away until you prove you can focus."
5. "Pick For Me isn't a toy. Single-task mode. Let's go."
6. "Twice? Really? Okay. No more list for you."
7. "*sigh* You need structure. Here's structure."
8. "I'm not mad. I'm just... managing you now."
9. "List privileges: revoked. Earn them back."
10. "You asked me to pick twice. Now I'm picking everything."

**Level 4 (Unfiltered Chaos):**
1. "Pick For Me AGAIN? No. You don't get choices anymore."
2. "Two picks and nothing done? LIST JAIL."
3. "You've lost list privileges. This is your fault."
4. "Oh, you wanted OPTIONS? Too late. One task. GO."
5. "The list is GONE. You spiraled. This is the consequence."
6. "I'm staging an intervention. One. Task. At. A. Time."
7. "You can't be trusted with multiple tasks. Proven fact."
8. "Congratulations! You've unlocked: FORCED FOCUS MODE."
9. "The list was too much for you. I'm not surprised."
10. "Decision paralysis detected. Activating timeout protocol."

**Level 5 (Maximum Violence):**
1. "YOU CAN'T BE TRUSTED WITH A LIST. ONE TASK. THAT'S IT."
2. "TWO PICKS?! THE LIST IS DEAD TO YOU NOW."
3. "PICK FOR ME ISN'T A GAME. SINGLE TASK MODE. IMMEDIATELY."
4. "YOU ABSOLUTE DISASTER. NO MORE LIST. ONE TASK. DO IT."
5. "THE LIST?! YOU THINK YOU DESERVE THE LIST?! NO."
6. "I'M HIDING EVERYTHING. YOU GET ONE TASK. COPE."
7. "DECISION PARALYSIS DETECTED. INITIATING LOCKDOWN."
8. "YOU HAD CHOICES. YOU BLEW IT. NOW THERE'S ONLY ONE."
9. "CONGRATULATIONS ON YOUR COMPLETE INABILITY TO CHOOSE. HERE'S ONE TASK."
10. "THE LIST HAS BEEN CONFISCATED. BLAME YOURSELF."

### Dismissal Copy ("Can't right now") (10 sayings per level)

**Level 1 (Gentle Concern):**
1. "No worries at all. How about this one?"
2. "That's completely okay. Let's try another."
3. "Not that one? Here's something else."
4. "Skipping is totally fine. Here's what's next."
5. "No problem! Moving on."
6. "Can't do that one? Valid. Next!"
7. "Let's find something that works better for you."
8. "That's alright. Here's another pick."
9. "Not feeling it? That's okay. Next task."
10. "Okay! Different task coming up."

**Level 2 (Pointed Reminders):**
1. "No worries. How about this one instead?"
2. "That's okay. Let's try another."
3. "Not that one? Here's a different option."
4. "Skipping is fine. Here's what's next."
5. "No problem. Moving on."
6. "Can't do that one? Sure. Next!"
7. "Let's find something that works for you."
8. "Alright. Here's another pick."
9. "Not feeling it? Fair. Next task."
10. "Okay. Different task coming up."

**Level 3 (Disappointed Parent):**
1. "Fine. But you can't dodge forever."
2. "Skipped. But it'll be back."
3. "Alright. But we're running out of options here."
4. "Moving on. For now."
5. "*notes this down* Okay. Next one."
6. "You're going to run out of tasks to skip eventually."
7. "Dismissed. Don't make this a habit."
8. "That task will still exist later. Just saying."
9. "Okay. But I'm watching you."
10. "Skipping. I'm keeping track, you know."

**Level 4 (Unfiltered Chaos):**
1. "SKIPPED. The task remembers. Tasks always remember."
2. "Fine. Run away from that one. Here's another."
3. "You can't skip them all. (Watch me pick harder ones.)"
4. "Dismissed! But like... why though."
5. "Next task. But I'm judging you."
6. "Okay SKIPPER. Here's another one."
7. "That task is going to haunt you later."
8. "Avoidance! Fun! Here's another problem for you."
9. "Skipping skipping skipping. When does it END."
10. "Fine. FINE. Different task. Whatever."

**Level 5 (Maximum Violence):**
1. "COWARD. Here's another one."
2. "YOU CAN'T SKIP YOUR WHOLE LIFE. (Next task.)"
3. "SKIPPED?! THAT TASK HAD A FAMILY."
4. "RUNNING AWAY WON'T SAVE YOU. HERE'S ANOTHER."
5. "SKIP. SKIP. SKIP. IS THIS WHO YOU ARE NOW?"
6. "DISMISSED. THE TASK WILL REMEMBER THIS BETRAYAL."
7. "FINE. BUT THIS AVOIDANCE? IT'S GOING ON YOUR RECORD."
8. "NEXT TASK. BUT KNOW THAT I'M DISAPPOINTED."
9. "YOU CAN RUN BUT YOU CAN'T HIDE. NEW TASK."
10. "SKIPPING. WOW. THE COWARDICE. HERE'S ANOTHER ONE."

### Earn-Out Progress Copy (10 sayings)

When completing a task in single-task mode:

1. "Nice! [X] more to go, then you get your list back."
2. "One down! [X] more and you're free."
3. "Progress! [X] tasks left until list access."
4. "That's one! [X] more to prove yourself."
5. "Completed! [X] to go. Keep it up."
6. "Tick! [X] more and I'll trust you with choices again."
7. "One closer to freedom. [X] remaining."
8. "You did a thing! [X] more things to go."
9. "[X] more completions until you can see the list."
10. "Getting there! [X] left in your sentence."

### Earn-Out Complete Copy (10 sayings per level)

**Level 1 (Gentle Concern):**
1. "You did it! Here's your list back. I knew you could."
2. "Freedom earned! Welcome back to choices."
3. "The list has returned. You handled that so well."
4. "Single-task mode complete. You're back in control."
5. "Nicely done! The list is yours again."
6. "You focused and finished. Here's your reward: options."
7. "Task mode complete! I'm really proud of you."
8. "You earned list access back. Go you!"
9. "Back to normal. You absolutely crushed it."
10. "The list is back. You proved you could focus. Great job."

**Level 2 (Pointed Reminders):**
1. "You did it! Here's your list back. I knew you could do it."
2. "Freedom earned. Welcome back to having choices."
3. "The list has returned! You handled that really well."
4. "Single-task mode complete. You're back in the driver's seat."
5. "Nicely done. The list is yours again."
6. "You focused and finished. Here's your reward: options."
7. "Task mode complete! Proud of you."
8. "You earned list access back. Nice work!"
9. "Back to normal. You crushed it."
10. "The list is back. You proved you could focus."

**Level 3 (Disappointed Parent):**
1. "Look at you! Focused mode complete. Here's your list back. Don't make me regret this."
2. "Freedom earned. The list has returned. Try not to spiral."
3. "You did it. I'm... cautiously optimistic."
4. "List privileges: restored. Tentatively."
5. "You can have your list back. Don't blow it."
6. "Single-task mode survived. Here's hoping you learned something."
7. "Back to the list. I'll be watching."
8. "You earned it. The list is back. Stay focused."
9. "Okay. You've proven yourself. For now."
10. "List returned. Let's not do this again soon, okay?"

**Level 4 (Unfiltered Chaos):**
1. "OH WOW you actually did it. List's back. Don't get cocky."
2. "Freedom! Try not to immediately spiral again."
3. "The list returns! Let's see how long THIS lasts."
4. "You survived timeout. Congratulations? Here's your list."
5. "Against all odds, you focused. List restored."
6. "I didn't think you'd actually do it. Here's your list."
7. "Single-task mode: DEFEATED. Your list lives again."
8. "You earned back list privileges. I'm genuinely shocked."
9. "Back to normal! (Normal being: chaotic but with options.)"
10. "The list is back. My faith in you is cautiously renewed."

**Level 5 (Maximum Violence):**
1. "FINE. YOU CAN HAVE YOUR PRECIOUS LIST BACK. DON'T BLOW IT."
2. "FREEDOM. EARNED THROUGH SUFFERING. AS IT SHOULD BE."
3. "THE LIST RETURNS. IF YOU END UP BACK HERE I'M GOING TO SCREAM."
4. "YOU ACTUALLY DID IT?! LIST RESTORED. I'M SHOOK."
5. "SINGLE-TASK PRISON: ESCAPED. DON'T COME BACK."
6. "CONGRATULATIONS ON YOUR PAROLE. THE LIST IS BACK."
7. "YOU SURVIVED. THE LIST SURVIVED. WE'RE ALL TRAUMATIZED."
8. "FREEDOM! SWEET FREEDOM! NOW DON'T MAKE ME DO THAT AGAIN."
9. "THE LIST HAS BEEN RESTORED. USE IT WISELY OR ELSE."
10. "YOU DID IT. I'M PROUD. (AGGRESSIVELY PROUD.) LIST RETURNED."

### All Tasks Overdue Copy (10 sayings)

When Pick For Me is used and everything is overdue:

1. "They're ALL late. Let's just start somewhere."
2. "Everything's overdue. Cool. Cool cool cool. Here's one."
3. "Bad news: all overdue. Good news: I picked one anyway."
4. "At this point, any progress is progress. Start here."
5. "It's all on fire. This one's slightly less on fire."
6. "Overdue. All of it. But we start somewhere."
7. "No good options, only overdue ones. Here's your least bad choice."
8. "The whole list is late. Let's dig out together."
9. "Everything's past due. Deep breath. This one first."
10. "All overdue. No judgment. (Some judgment.) Let's go."

---

## Future Considerations

Features intentionally deferred:

- **Energy matching:** "How fried are you?" quick check before picking
- **Time-based picking:** "I have 30 minutes" mode
- **Task breakdown:** Help splitting big tasks when user keeps dismissing

These could become additional Focus Tools modules if this feature succeeds.
