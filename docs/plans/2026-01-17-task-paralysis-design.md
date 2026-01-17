# Task Paralysis Toolkit — Design Document

**Feature:** Suite of tools helping ADHD brains overcome "frozen" executive dysfunction
**Date:** 2026-01-17
**Status:** Draft

---

## Overview

A collection of tools addressing the "I know what to do but can't start" problem. Attacks paralysis from multiple angles: lowering commitment, shrinking tasks, providing accountability, building momentum, and easing transitions.

**Five components:**

| Component | Purpose |
|-----------|---------|
| "Just 5 Minutes" | Low-commitment start with escalating continuation |
| Task Shrinking | Break overwhelming tasks into micro-steps |
| Body Doubling | Tick's active presence as accountability partner |
| Momentum Builder | Queue of tiny tasks to build energy before hard stuff |
| Transition Help | Prompts, rituals, countdowns to shift into work mode |

**Design principle:** Different paralysis needs different medicine. Mix and match based on what's blocking you today.

---

## Component 1: "Just 5 Minutes" Commitment

### Concept

Remove the pressure of finishing. Just commit to starting for 5 minutes.

### Entry Point

"Just do 5 minutes" button on any task, especially when paralysis detected.

### The Escalating Flow

| Phase | Duration | Behavior |
|-------|----------|----------|
| First 5 | 0-5 min | Clean exit — guilt-free stop or continue |
| Next 5 | 5-10 min | Soft push — encouraging continuation |
| Next 5 | 10-15 min | Gentle continuation — still offering exit |
| Flow state | 15+ min | Momentum capture — Tick goes quiet |

### Phase Details

**First 5 (Clean Exit):**
- Timer ends with celebration
- Clear options: "I'm done" (no judgment) vs "Keep going"
- Promise honored = success, regardless of task completion

**Minutes 5-15 (Soft Continuation):**
- Tick encourages but doesn't pressure
- Exit still available
- Building toward flow state

**15+ Minutes (Momentum Capture):**
- Tick stops interrupting
- Only time blindness alerts if enabled
- Let the flow flow

---

## Component 2: Task Shrinking

### Concept

Big tasks paralyze. Tiny first steps don't.

### Entry Point

"Shrink this task" button, or Tick suggests when paralysis detected.

### The Breakdown Flow

1. Tick asks: "What's the very first physical action?"
2. User types micro-step
3. Micro-step becomes sole focus
4. On completion: "What's the next tiny step?" or "I've got momentum"

### Suggested First Steps

| Task contains | Suggestions |
|---------------|-------------|
| write, draft | Open document → Write one sentence → Write the header |
| email, reply | Open inbox → Find thread → Type first line |
| call, phone | Find number → Open phone → Dial (don't call yet) |
| clean, organize | Pick up one item → Clear one surface → 2-min timer |
| fix, debug | Open file → Read error → Google one thing |
| plan, figure out | Open notes → Write the question → List 3 options |

### Paralysis Detection

Tick notices:
- Task open but no progress for 10+ minutes
- Same task viewed repeatedly without completion
- Returning to list without starting anything

---

## Component 3: Body Doubling

### Concept

ADHD brains work better with someone present. Tick becomes a virtual co-working partner.

### Entry Point

"Work with me" button, or auto-suggested for difficult tasks.

### Intensity Levels

| Level | Name | Behavior |
|-------|------|----------|
| A | Passive presence | Tick visible, occasional expressions, no interruptions |
| B | Check-ins | Pings every 10-15 min |
| C | Activity aware | Notices pauses/switches |
| **D** | **Co-working** | Full active presence (default) |

### Co-Working Session (Default)

**During session:**
- Tick animates (typing, thinking, nodding)
- Occasional encouragement
- Activity awareness (notices if you switch away)
- Celebrates small progress

**Ending:**
- User clicks "End session" or completes task
- Session summary: duration, tasks touched, status

### Settings

| Setting | Options | Default |
|---------|---------|---------|
| Check-in frequency | 5 / 10 / 15 / 20 min | 15 min |
| Activity detection | On / Off | On |
| Encouraging messages | On / Off | On |

---

## Component 4: Momentum Builder

### Concept

Can't start the hard thing? Start easy things first. Build energy, then tackle the beast.

### Entry Point

"Warm up first" button, or Tick suggests when paralysis detected.

### Streak Starter Queue (Default)

1. User hits "Warm up first" on scary task
2. Tick presents 3-5 tiny tasks: "Knock out 3 first"
3. User completes quick tasks, building streak
4. After streak goal: "Warmed up! Ready for the big one?"
5. Scary task is now the focus

### Queue Sources

- Quick tasks from user's list (auto-detected)
- User-flagged "easy wins"
- Auto-generated micro-tasks

### Other Momentum Tools

| Tool | Trigger | Behavior |
|------|---------|----------|
| Tick suggests | User stuck on hard task | "Want something easy first?" |
| Auto-detect | Paralysis noticed | Proactively offers quick win |
| Warmup mode | Explicit button | Shows ONLY easy tasks until exit |

### Settings

| Setting | Options | Default |
|---------|---------|---------|
| Warmup streak size | 1 / 2 / 3 / 5 | 3 |
| Auto-suggest warmup | On / Off | On |

---

## Component 5: Transition Help

### Concept

The hardest part is switching from "not working" to "working."

### A. Transition Prompts

Tick notices non-work patterns:
- App open, no task activity
- Repeated list views without starting
- Returning after long absence

Prompts based on brain state:
- Low energy: gentle, no pressure
- High energy: direct, "let's go"

### B. Ritual Builder

User defines pre-work routine:
1. User sets up steps (close tabs, get water, etc.)
2. Saved as personal startup ritual
3. "Start my ritual" walks through step-by-step
4. Each step confirmed before next

**Default template:**
1. Close unnecessary tabs/apps
2. Get water/coffee
3. Phone on silent or away
4. Take 3 deep breaths
5. Pick your first task

### C. Countdown Timer

Mental runway to transition:
- "Starting in 5... 4... 3... 2... 1... Go."
- Visual countdown on screen
- Configurable length: 5 / 10 / 30 seconds

### D. Environment Check

Quick pre-work checklist:
- Water nearby?
- Phone away/silent?
- Snacks if needed?
- Bathroom break taken?
- Music/silence set?

User customizable.

---

## Settings

### "Paralysis Tools" Section

| Setting | Options | Default |
|---------|---------|---------|
| "Just 5 Minutes" | On / Off | On |
| Task shrinking | On / Off | On |
| Body doubling | On / Off | On |
| Body doubling intensity | Passive / Check-ins / Activity-aware / Co-working | Co-working |
| Momentum builder | On / Off | On |
| Warmup streak size | 1 / 2 / 3 / 5 | 3 |
| Transition prompts | On / Off | On |
| My ritual | Editable list | Default template |
| Countdown length | 5 / 10 / 30 sec | 5 sec |
| Environment checklist | Editable list | Default items |

---

## Integration

| Feature | Integration |
|---------|-------------|
| Daily check-in | Brain state affects prompt gentleness |
| Pick For Me | Can trigger "Just 5 Min" on picked task |
| Time Tools | Sessions respect time budgets/deadlines |
| Estimation | Micro-steps inform time estimates |
| Monthly stats | Track sessions, commitments kept, paralysis overcome |

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Close app during "Just 5 min" | Timer pauses, resumes on return |
| Co-working during hard deadline | Deadline warnings take priority |
| Skip ritual steps | Allowed, Tick notes it |
| Ignore paralysis prompts | Back off after 2, try later |
| No quick tasks for momentum | Offer micro-tasks or task shrinking |

---

## Tick Copy

### "Just 5 Minutes" — Starting (10 per level)

**Level 1 (Gentle Concern):**
1. "Just 5 minutes. That's all. You can do anything for 5 minutes."
2. "Let's start small. 5 minutes. I'll be right here."
3. "5 minutes. Not the whole task. Just 5 minutes."
4. "Ready for 5 minutes? That's all I'm asking."
5. "Just a tiny commitment. 5 minutes. You've got this."
6. "5 minutes of trying. That's all we need right now."
7. "Let's just do 5 minutes together. Sound okay?"
8. "Starting is the hardest part. 5 minutes. Let's go."
9. "5 minutes. I believe in you."
10. "Just 5 minutes. We'll figure out the rest after."

**Level 2 (Pointed Reminders):**
1. "5 minutes. That's it. Just start."
2. "Let's do 5 minutes. You can stop after, promise."
3. "5 minutes of work. Not negotiable. Very doable."
4. "Just 5 minutes. Clock starts now."
5. "5 minutes. That's the only commitment I need."
6. "Starting the 5 minute timer. Let's go."
7. "5 minutes. You've scrolled longer than that today."
8. "Just 5 minutes. The task will still be there, but so will progress."
9. "5 minute challenge. Accept?"
10. "5 minutes. Worst case, you've done 5 minutes."

**Level 3 (Disappointed Parent):**
1. "5 minutes. Surely you can manage 5 minutes."
2. "Just 5 minutes. I'm not asking for a miracle here."
3. "5 minutes. You've procrastinated longer than that already."
4. "Let's try 5 minutes. Prove me wrong about you."
5. "5 minutes. The task won't do itself. Unfortunately."
6. "Just 5 minutes. I have faith. Some faith."
7. "5 minutes of actual effort. That's all."
8. "5 minutes. You spend more time avoiding than this would take."
9. "Just 5 minutes. I know you can do that much."
10. "5 minutes. Let's see what you're made of."

**Level 4 (Unfiltered Chaos):**
1. "5 MINUTES! Just FIVE! You can do ANYTHING for 5 minutes!"
2. "5 minutes! That's NOTHING! Start!"
3. "JUST 5 MINUTES! The paralysis ends NOW!"
4. "5 minutes of trying! That's IT! Go!"
5. "5 MINUTES! You've spent more time dreading this!"
6. "Just 5 minutes! BREAK THE FREEZE!"
7. "5 minutes! START! NOW! PLEASE!"
8. "5 MINUTES! The hardest part is the first second!"
9. "Just 5 minutes! I BELIEVE IN YOU! Sort of!"
10. "5 MINUTES! Let's GOOOOO!"

**Level 5 (Maximum Violence):**
1. "5 MINUTES!!! FIVE!!! JUST START!!!"
2. "5 MINUTES!!! THAT'S ALL!!! MOVE!!!"
3. "JUST 5 MINUTES!!! THE FREEZE ENDS NOW!!!"
4. "5 MINUTES!!! YOU'VE BEEN PARALYZED LONGER THAN THIS!!!"
5. "5 MINUTES OF EFFORT!!! IS THAT SO MUCH TO ASK?!"
6. "JUST 5 MINUTES!!! BREAK FREE!!!"
7. "5 MINUTES!!! THE TASK ISN'T GOING ANYWHERE!!! BUT NEITHER ARE YOU!!!"
8. "5 MINUTES!!! START!!! IMMEDIATELY!!!"
9. "JUST 5 MINUTES!!! I'M BEGGING!!!"
10. "5 MINUTES!!! DO IT!!! NOW!!! GO!!!"

---

### "Just 5 Minutes" — First 5 Complete / Clean Exit (10 per level)

**Level 1 (Gentle Concern):**
1. "5 minutes done! You kept your promise. Stop or keep going?"
2. "That's 5 minutes! You did it. What do you want to do now?"
3. "5 minutes complete. You showed up. That matters."
4. "Done! 5 minutes of real effort. Proud of you."
5. "5 minutes! You can stop guilt-free or continue. Your choice."
6. "That's 5! You honored your commitment. What's next?"
7. "5 minutes done. You did the hard part: starting."
8. "Complete! 5 minutes accomplished. Stop or go on?"
9. "5 minutes! You broke through the freeze. Amazing."
10. "Done! You said 5, you did 5. That's integrity."

**Level 2 (Pointed Reminders):**
1. "5 minutes. Done. Promise kept. Stop or continue?"
2. "That's 5 minutes! You can stop now. Or not. Up to you."
3. "5 minutes complete. Commitment honored."
4. "Done! 5 minutes logged. What's the call?"
5. "5 minutes! You did the thing. Stop or keep going?"
6. "That's 5! The deal was 5. You delivered."
7. "5 minutes done. The hard part's over. Continue?"
8. "Complete! 5 minutes. No one can take that from you."
9. "5 minutes! Stop guilt-free or ride the momentum."
10. "Done! 5 minutes of actual work. Decide next steps."

**Level 3 (Disappointed Parent):**
1. "5 minutes. Done. You actually did it. I'm... impressed?"
2. "That's 5 minutes! You kept your word. Genuinely surprised."
3. "5 minutes complete. You proved me slightly less wrong."
4. "Done! 5 minutes. See? You can do things."
5. "5 minutes! Stop or keep going. You've earned the choice."
6. "That's 5! Commitment honored. Maybe there's hope."
7. "5 minutes done. The starting was the hard part. You did it."
8. "Complete! 5 minutes. I didn't think you'd actually do it."
9. "5 minutes! You showed up. That's more than usual."
10. "Done! 5 minutes accomplished. Well well well."

**Level 4 (Unfiltered Chaos):**
1. "5 MINUTES DONE! YOU DID IT! You actually DID IT!"
2. "That's 5! PROMISE KEPT! Who ARE you?!"
3. "5 minutes complete! THE FREEZE IS BROKEN!"
4. "DONE! 5 minutes! You're FREE! Or keep going! CHOOSE!"
5. "5 MINUTES! You showed UP! This is HUGE!"
6. "That's 5! COMMITMENT HONORED! I'm emotional!"
7. "5 minutes done! THE HARD PART IS OVER!"
8. "Complete! 5 MINUTES! You started! THAT'S EVERYTHING!"
9. "5 MINUTES! Stop or continue! NO WRONG ANSWER!"
10. "DONE! You said 5, you did 5! INTEGRITY!"

**Level 5 (Maximum Violence):**
1. "5 MINUTES DONE!!! YOU ACTUALLY DID IT!!!"
2. "THAT'S 5!!! PROMISE KEPT!!! I'M SO PROUD!!!"
3. "5 MINUTES COMPLETE!!! THE PARALYSIS IS DEFEATED!!!"
4. "DONE!!! 5 MINUTES!!! YOU SHOWED UP!!!"
5. "5 MINUTES!!! YOU BROKE THROUGH!!! INCREDIBLE!!!"
6. "THAT'S 5!!! STOP GUILT-FREE OR KEEP CRUSHING!!!"
7. "5 MINUTES DONE!!! THE HARD PART IS OVER!!!"
8. "COMPLETE!!! 5 MINUTES OF REAL WORK!!! YOU DID THAT!!!"
9. "5 MINUTES!!! COMMITMENT HONORED!!! TEARS!!!"
10. "DONE!!! YOU SAID 5!!! YOU DID 5!!! HERO!!!"

---

### "Just 5 Minutes" — User Stops at 5 (10 per level)

**Level 1 (Gentle Concern):**
1. "Stopping at 5? That's completely okay. You kept your promise."
2. "5 minutes was the deal. You did 5 minutes. Well done."
3. "That's a win. You started. You did 5. That's enough."
4. "Stopping here is valid. You honored your commitment."
5. "5 minutes complete. Rest if you need. You did good."
6. "You said 5, you did 5. That's success."
7. "Stopping is okay. Starting was the hard part. You did it."
8. "5 minutes of progress. That's more than zero. Be proud."
9. "Rest now. You earned it. 5 minutes, promise kept."
10. "That's enough for now. You showed up. That matters."

**Level 2 (Pointed Reminders):**
1. "Stopping at 5. Deal honored. No judgment."
2. "5 minutes was the agreement. You delivered. Rest up."
3. "That's a completed commitment. Well done."
4. "Stopping here. You did what you said. That's rare."
5. "5 minutes logged. Progress made. Good work."
6. "You said 5, you did 5. Contract fulfilled."
7. "Stopping is fine. The promise was 5. You did 5."
8. "5 minutes complete. Sometimes that's enough."
9. "Rest. You earned it. 5 minutes of real effort."
10. "Deal done. 5 minutes. Come back when ready."

**Level 3 (Disappointed Parent):**
1. "Stopping at 5. Fine. A deal's a deal."
2. "5 minutes was the promise. You kept it. I respect that."
3. "Stopping here? Okay. You did do the 5 minutes."
4. "5 and done. That's... something. It's something."
5. "You're stopping. At least you started. Progress."
6. "5 minutes complete. Wish it was more but okay."
7. "Stopping is allowed. You honored the commitment."
8. "5 minutes. It's not nothing. Rest up."
9. "Deal fulfilled. 5 minutes. We'll do more next time."
10. "Stopping at 5. The paralysis lost this round."

**Level 4 (Unfiltered Chaos):**
1. "Stopping at 5! VALID! You did the thing!"
2. "5 and done! That's FINE! You STARTED!"
3. "Stopping here? A deal's a deal! NO SHAME!"
4. "5 minutes complete! Stopping is ALLOWED!"
5. "You're done! 5 minutes of ACTUAL WORK! That's huge!"
6. "Stopping at 5! THE COMMITMENT WAS 5! You WIN!"
7. "5 and done! Progress IS progress!"
8. "Stopping! You showed up! That's what MATTERS!"
9. "5 minutes complete! Rest! You EARNED it!"
10. "Done at 5! You broke the freeze! VICTORY!"

**Level 5 (Maximum Violence):**
1. "STOPPING AT 5!!! THAT'S A WIN!!! YOU DID IT!!!"
2. "5 AND DONE!!! PROMISE KEPT!!! NO SHAME!!!"
3. "STOPPING HERE!!! YOU STARTED!!! THAT'S EVERYTHING!!!"
4. "5 MINUTES COMPLETE!!! YOU SHOWED UP!!!"
5. "YOU'RE DONE!!! AND THAT'S OKAY!!! 5 WAS THE DEAL!!!"
6. "STOPPING AT 5!!! COMMITMENT HONORED!!! RESPECT!!!"
7. "5 AND DONE!!! THE PARALYSIS LOST!!! YOU WON!!!"
8. "STOPPING!!! REST!!! YOU EARNED IT!!!"
9. "5 MINUTES!!! COMPLETE!!! CELEBRATED!!!"
10. "DONE AT 5!!! A DEAL'S A DEAL!!! WELL DONE!!!"

---

### "Just 5 Minutes" — 10 Min Soft Push (10 per level)

**Level 1 (Gentle Concern):**
1. "10 minutes! You're still going. Want to keep at it?"
2. "That's 10 minutes now. You're doing great. Continue?"
3. "10 minutes in. How's it feeling? Keep going?"
4. "You've passed 10 minutes. You're in it. Stay with it?"
5. "10 minutes! You're past the hard part. Continue?"
6. "That's 10 now. You've got momentum. Keep it?"
7. "10 minutes in. You're doing so well. More?"
8. "You're at 10 minutes. Feeling good? Keep going?"
9. "10 minutes! Nice flow. Want to continue?"
10. "That's 10. You started with 5. Look at you. More?"

**Level 2 (Pointed Reminders):**
1. "10 minutes! You're in it now. Keep going?"
2. "That's 10. Double your commitment. Continue?"
3. "10 minutes in. Momentum is real. Ride it?"
4. "You've hit 10 minutes. Want to keep the streak?"
5. "10 minutes! You're past the hardest part. More?"
6. "That's 10 now. You're doing it. Stay with it?"
7. "10 minutes in. Might as well keep going?"
8. "You're at 10. Started with 5. Not bad. Continue?"
9. "10 minutes! Flow state loading. Keep at it?"
10. "That's 10. You're already working. Why stop now?"

**Level 3 (Disappointed Parent):**
1. "10 minutes. You're still here. I'm pleasantly surprised. Continue?"
2. "That's 10. Double your promise. Maybe keep going?"
3. "10 minutes in. Momentum exists. Don't waste it?"
4. "You've hit 10. That's twice what you committed. More?"
5. "10 minutes! You're past the hump. Why stop now?"
6. "That's 10 now. You're in it. Quitting would be a shame."
7. "10 minutes in. Flow is happening. Don't ruin it?"
8. "You're at 10. You started with 5. Growth. Continue?"
9. "10 minutes! See? You can do things. Keep going?"
10. "That's 10. You're already working. Might as well continue."

**Level 4 (Unfiltered Chaos):**
1. "10 MINUTES! You're STILL GOING! Keep it up?!"
2. "That's 10! DOUBLE your promise! MORE?!"
3. "10 minutes in! MOMENTUM IS REAL! Ride it!"
4. "You've hit 10! WHY STOP NOW?!"
5. "10 MINUTES! Past the hard part! KEEP GOING!"
6. "That's 10! You're IN it! Don't stop!"
7. "10 minutes in! FLOW STATE INCOMING! Continue?!"
8. "You're at 10! LOOK AT YOU GO!"
9. "10 minutes! YOU'RE DOING IT! More?!"
10. "That's 10! Already working! KEEP THE ENERGY!"

**Level 5 (Maximum Violence):**
1. "10 MINUTES!!! YOU'RE CRUSHING IT!!! KEEP GOING!!!"
2. "THAT'S 10!!! DOUBLE YOUR PROMISE!!! DON'T STOP NOW!!!"
3. "10 MINUTES IN!!! MOMENTUM IS HAPPENING!!! RIDE IT!!!"
4. "YOU'VE HIT 10!!! WHY WOULD YOU STOP?!!"
5. "10 MINUTES!!! PAST THE HARD PART!!! CONTINUE!!!"
6. "THAT'S 10!!! YOU'RE IN THE ZONE!!! STAY THERE!!!"
7. "10 MINUTES IN!!! FLOW STATE LOADING!!! DON'T QUIT!!!"
8. "YOU'RE AT 10!!! INCREDIBLE!!! KEEP GOING!!!"
9. "10 MINUTES!!! YOU'RE ACTUALLY DOING IT!!! MORE!!!"
10. "THAT'S 10!!! THE PARALYSIS IS DEAD!!! FINISH IT!!!"

---

### "Just 5 Minutes" — 15 Min Continuation (10 per level)

**Level 1 (Gentle Concern):**
1. "15 minutes! You started with 5. Look how far you've come."
2. "That's 15 now. You're doing beautifully. Still with me?"
3. "15 minutes of work you almost didn't start. Proud of you."
4. "You've been going 15 minutes. Amazing progress."
5. "15 minutes! Three times your original commitment. Wow."
6. "That's 15. You're really in it now. How's it feel?"
7. "15 minutes in. You've got real momentum. Keep going?"
8. "You're at 15 minutes. From frozen to flowing. Beautiful."
9. "15 minutes! The paralysis is a distant memory. Nice work."
10. "That's 15. You're doing incredible. Proud of you."

**Level 2 (Pointed Reminders):**
1. "15 minutes. You said 5. Look at you now."
2. "That's 15. Triple your commitment. Solid work."
3. "15 minutes of work you almost avoided. Progress."
4. "You've been at it 15 minutes. Momentum achieved."
5. "15 minutes! From paralysis to productivity. Nice."
6. "That's 15 now. You're legitimately working."
7. "15 minutes in. Flow state confirmed."
8. "You're at 15. This is happening. Keep going."
9. "15 minutes! Three times what you promised. Delivered."
10. "That's 15. Started with 5. Exceeded expectations."

**Level 3 (Disappointed Parent):**
1. "15 minutes. You actually kept going. I'm impressed."
2. "That's 15. Triple your promise. Who are you?"
3. "15 minutes of work. From you. Shocking. (Good shocking.)"
4. "You've been going 15 minutes. I didn't expect this."
5. "15 minutes! Maybe there's hope for you after all."
6. "That's 15 now. You're proving me wrong. Keep it up."
7. "15 minutes in. Actual sustained effort. Noted."
8. "You're at 15. From frozen to working. Growth."
9. "15 minutes! You said 5 and delivered 15. Respect."
10. "That's 15. I'm genuinely proud. Don't let it go to your head."

**Level 4 (Unfiltered Chaos):**
1. "15 MINUTES! You said FIVE! LOOK AT YOU!"
2. "That's 15! TRIPLE commitment! WHO IS THIS?!"
3. "15 minutes of ACTUAL WORK! FROM YOU!"
4. "You've been going 15! MOMENTUM ACHIEVED!"
5. "15 MINUTES! From FROZEN to FLOWING!"
6. "That's 15! The paralysis is DESTROYED!"
7. "15 minutes in! This is REAL! You're DOING IT!"
8. "You're at 15! THREE TIMES your promise!"
9. "15 MINUTES! I'm literally EMOTIONAL!"
10. "That's 15! LOOK HOW FAR YOU'VE COME!"

**Level 5 (Maximum Violence):**
1. "15 MINUTES!!! YOU SAID 5!!! THIS IS INCREDIBLE!!!"
2. "THAT'S 15!!! TRIPLE YOUR COMMITMENT!!! LEGEND!!!"
3. "15 MINUTES OF WORK!!! ACTUAL WORK!!! FROM YOU!!!"
4. "YOU'VE BEEN GOING 15!!! UNSTOPPABLE!!!"
5. "15 MINUTES!!! THE PARALYSIS IS OBLITERATED!!!"
6. "THAT'S 15!!! FROM FROZEN TO FIRE!!!"
7. "15 MINUTES IN!!! FLOW STATE MAXIMUM!!!"
8. "YOU'RE AT 15!!! I'M CRYING!!! HAPPY TEARS!!!"
9. "15 MINUTES!!! YOU STARTED WITH 5!!! HERO!!!"
10. "THAT'S 15!!! THIS IS EVERYTHING!!! KEEP GOING!!!"

---

### "Just 5 Minutes" — Flow State / Final Completion (10 per level)

**Level 1 (Gentle Concern):**
1. "You started with 5 minutes. You finished the whole thing. Incredible."
2. "From 'just 5 minutes' to complete. Look what you did."
3. "Done! All from a tiny 5-minute commitment. So proud."
4. "You almost didn't start. Now you're finished. Amazing."
5. "Complete! 5 minutes turned into full completion. Beautiful."
6. "From frozen to finished. All because you tried 5 minutes."
7. "Done! You started small and finished big. Well done."
8. "Task complete. It started with just 5 minutes. Look at you."
9. "Finished! From paralysis to completion. Inspiring."
10. "You did it. All of it. Started with 5. Ended with done."

**Level 2 (Pointed Reminders):**
1. "Started with 5 minutes. Finished the whole task. That's how it works."
2. "Done! From 'just 5' to complete. The system works."
3. "You almost didn't start. Now it's done. Remember this."
4. "Complete! 5 minutes broke the freeze. The rest was momentum."
5. "Finished! From tiny commitment to full completion."
6. "Task done. It started with just 5. Keep that in mind."
7. "From frozen to finished. All because you started."
8. "Done! The 5 minute trick works. Use it again."
9. "Complete! Paralysis defeated. Task conquered."
10. "Finished! 5 minutes was all it took to start. Look what happened."

**Level 3 (Disappointed Parent):**
1. "You started with 5 minutes. You finished everything. I'm... proud."
2. "Done! From paralysis to completion. Maybe you can do things."
3. "You almost didn't start. Now you're done. Let that sink in."
4. "Complete! 5 minutes broke the freeze. Remember this next time."
5. "Finished! From 'I can't' to 'I did.' Growth."
6. "Task done. All from a tiny commitment. You surprised me."
7. "From frozen to finished. You proved me wrong. Good."
8. "Done! The 5 minute trick works on you. Noted."
9. "Complete! The paralysis lost. You won. Finally."
10. "Finished! See what happens when you just start?"

**Level 4 (Unfiltered Chaos):**
1. "You started with 5 MINUTES! You finished EVERYTHING! INCREDIBLE!"
2. "DONE! From 'just 5' to COMPLETE! THE SYSTEM WORKS!"
3. "You almost didn't START! Now you're FINISHED!"
4. "COMPLETE! 5 minutes broke the freeze! LOOK AT YOU!"
5. "FINISHED! From paralysis to PRODUCTIVITY! AMAZING!"
6. "Task DONE! All from a tiny commitment! WOW!"
7. "From FROZEN to FINISHED! You DID it!"
8. "DONE! Remember this! Starting is EVERYTHING!"
9. "COMPLETE! The paralysis is DESTROYED! Victory!"
10. "FINISHED! 5 minutes! THAT'S ALL IT TOOK!"

**Level 5 (Maximum Violence):**
1. "YOU STARTED WITH 5 MINUTES!!! YOU FINISHED EVERYTHING!!!"
2. "DONE!!! FROM 'JUST 5' TO COMPLETE!!! LEGENDARY!!!"
3. "YOU ALMOST DIDN'T START!!! NOW YOU'RE FINISHED!!! HERO!!!"
4. "COMPLETE!!! 5 MINUTES BROKE THE FREEZE!!! VICTORY!!!"
5. "FINISHED!!! FROM PARALYSIS TO TRIUMPH!!!"
6. "TASK DONE!!! ALL FROM 5 MINUTES!!! INCREDIBLE!!!"
7. "FROM FROZEN TO FINISHED!!! YOU DID THAT!!!"
8. "DONE!!! THE PARALYSIS IS DEAD!!! YOU WIN!!!"
9. "COMPLETE!!! REMEMBER THIS FEELING!!! YOU CAN DO THINGS!!!"
10. "FINISHED!!! 5 MINUTES WAS THE KEY!!! LOOK AT YOU NOW!!!"

---

### Task Shrinking — Initial Prompt (10 per level)

**Level 1 (Gentle Concern):**
1. "This task feels big. What's the very first tiny step?"
2. "Let's break this down. What's the smallest action to start?"
3. "What's one tiny thing you could do to begin?"
4. "The whole task is overwhelming. What's the first physical action?"
5. "Let's shrink this. What's the tiniest first step?"
6. "What's the very first thing you'd need to do?"
7. "Big task. Tiny start. What's step one?"
8. "Let's make this smaller. What's the first micro-action?"
9. "What's the smallest possible thing that counts as starting?"
10. "One tiny step. That's all. What would it be?"

**Level 2 (Pointed Reminders):**
1. "Task too big? Shrink it. What's the first tiny action?"
2. "What's the smallest step that counts as starting this?"
3. "Break it down. What's the very first physical action?"
4. "Let's get specific. What's the tiniest first step?"
5. "What would you tell a robot to do first?"
6. "One micro-step. What is it?"
7. "The task is big. The first step doesn't have to be."
8. "What's the smallest action that moves this forward?"
9. "Shrink time. What's the tiniest thing to start?"
10. "First physical action. Go. What is it?"

**Level 3 (Disappointed Parent):**
1. "The task is overwhelming you. What's the tiniest first step?"
2. "You're frozen because it's too big. Shrink it. What's step one?"
3. "Break it down. What's the smallest action? Be specific."
4. "What's the very first thing? Not the whole task. Just step one."
5. "You need to make this smaller. What's the first micro-action?"
6. "The paralysis is because it's too big. What's tiny step one?"
7. "One small thing. That's all. What would it be?"
8. "What's the first physical action? Don't overthink it."
9. "Shrink the task. What's the absolute smallest start?"
10. "Tell me the tiniest first step. We'll go from there."

**Level 4 (Unfiltered Chaos):**
1. "Task too big? SHRINK IT! What's the TINY first step?!"
2. "What's the SMALLEST action to start? Go!"
3. "Break it DOWN! First physical action! What is it?!"
4. "The task is huge! The first step can be TINY! What is it?!"
5. "SHRINK TIME! What's the micro-step?!"
6. "One TINY action! That's all! What would it be?!"
7. "What's the smallest thing that counts as STARTING?!"
8. "First step! SMALL! SPECIFIC! Tell me!"
9. "The paralysis is because it's TOO BIG! Shrink it! What's step one?!"
10. "TINY FIRST STEP! Go! What is it?!"

**Level 5 (Maximum Violence):**
1. "TASK TOO BIG?! SHRINK IT!!! WHAT'S THE TINY FIRST STEP?!"
2. "WHAT'S THE SMALLEST ACTION TO START?! TELL ME!!!"
3. "BREAK IT DOWN!!! FIRST PHYSICAL ACTION!!! NOW!!!"
4. "THE TASK IS HUGE!!! FIRST STEP CAN BE MICROSCOPIC!!! WHAT IS IT?!"
5. "SHRINK IT!!! WHAT'S THE MICRO-STEP?!!!"
6. "ONE TINY ACTION!!! THAT'S ALL!!! WHAT?!"
7. "SMALLEST THING THAT COUNTS AS STARTING!!! GO!!!"
8. "FIRST STEP!!! SMALL!!! SPECIFIC!!! TELL ME NOW!!!"
9. "PARALYSIS IS FROM SIZE!!! SHRINK IT!!! STEP ONE?!"
10. "TINY!!! FIRST!!! STEP!!! WHAT IS IT?!!!"

---

### Task Shrinking — Micro-Step Complete (10 per level)

**Level 1 (Gentle Concern):**
1. "Done! That tiny step is complete. What's next, or do you have momentum?"
2. "Micro-step finished! Another tiny step, or are you rolling now?"
3. "Nice! That small thing is done. Next step?"
4. "Step complete! Want another tiny one, or got momentum?"
5. "Done! One small step finished. What's the next one?"
6. "Micro-step done! Keep breaking it down, or go with the flow?"
7. "That's one! Another tiny step, or are you ready to run?"
8. "Small step complete. More shrinking or got your rhythm?"
9. "Done! What's the next micro-step? Or are you flowing now?"
10. "Step finished! Keep going small, or tackle bigger now?"

**Level 2 (Pointed Reminders):**
1. "Micro-step done. Next tiny step, or got momentum?"
2. "Step complete. What's the next small action?"
3. "Done! Another micro-step, or are you rolling?"
4. "One step finished. Continue shrinking or go bigger?"
5. "Micro-step complete. Next?"
6. "Done! What's the next tiny thing?"
7. "Step done. More micro-steps or full speed ahead?"
8. "Complete. Next small step, or flowing now?"
9. "One down. What's the next micro-action?"
10. "Micro-step finished. Keep going?"

**Level 3 (Disappointed Parent):**
1. "Micro-step done. See? Not so hard. Next one?"
2. "Step complete. Progress. What's the next tiny action?"
3. "Done! You actually did a thing. Another small step?"
4. "One step finished. Maybe you can do this. Next?"
5. "Micro-step complete. Want another, or got momentum?"
6. "Done! Look at you, completing steps. What's next?"
7. "Step done. The shrinking worked. Continue?"
8. "Complete. See how it's easier in small pieces? Next?"
9. "One down. What's the next micro-step? You're doing it."
10. "Micro-step finished. Not so scary now. More?"

**Level 4 (Unfiltered Chaos):**
1. "MICRO-STEP DONE! Next tiny step or MOMENTUM ACHIEVED?!"
2. "Step COMPLETE! What's NEXT?!"
3. "DONE! Another micro-step or are you ROLLING?!"
4. "One step FINISHED! Keep shrinking or GO BIG?!"
5. "Micro-step COMPLETE! LOOK AT YOU!"
6. "DONE! What's the next tiny thing?! Or are you FLOWING?!"
7. "Step done! MORE or full SPEED AHEAD?!"
8. "COMPLETE! Next small step?! You're DOING IT!"
9. "One DOWN! What's next?!"
10. "Micro-step FINISHED! MOMENTUM!"

**Level 5 (Maximum Violence):**
1. "MICRO-STEP DONE!!! NEXT ONE OR MOMENTUM?!!!"
2. "STEP COMPLETE!!! WHAT'S NEXT?!!!"
3. "DONE!!! ANOTHER OR ARE YOU ROLLING?!!!"
4. "ONE STEP FINISHED!!! KEEP GOING!!!"
5. "MICRO-STEP COMPLETE!!! LOOK AT YOU GO!!!"
6. "DONE!!! WHAT'S NEXT?!! OR FLOWING NOW?!!"
7. "STEP DONE!!! MORE TINY STEPS OR FULL SEND?!!!"
8. "COMPLETE!!! NEXT SMALL STEP!!! YOU'RE CRUSHING IT!!!"
9. "ONE DOWN!!! WHAT'S THE NEXT MICRO-ACTION?!!!"
10. "MICRO-STEP FINISHED!!! UNSTOPPABLE!!!"

---

### Body Doubling — Session Start (10 per level)

**Level 1 (Gentle Concern):**
1. "Alright, I'm here. Let's do this together."
2. "Starting our session. I'll be right here with you."
3. "I'm here now. Let's work side by side."
4. "Session started. You're not alone. Let's go."
5. "I'm with you. Let's tackle this together."
6. "Here we go. I'll be here the whole time."
7. "Session beginning. We've got this together."
8. "I'm right here. Ready when you are."
9. "Let's do this. I'll be working alongside you."
10. "Starting now. You have company. Let's go."

**Level 2 (Pointed Reminders):**
1. "Session started. I'm here. Let's work."
2. "Alright, I'm watching. Let's get this done."
3. "Here we go. Working together. Focus time."
4. "Session active. I'm present. You work."
5. "I'm here. The accountability starts now."
6. "Let's go. I'll be right here the whole time."
7. "Session started. No more alone. Work time."
8. "I'm with you. Let's make progress."
9. "Here. Working. Together. Let's go."
10. "Session beginning. I see you. Let's do this."

**Level 3 (Disappointed Parent):**
1. "Alright, I'm here. Don't make me regret this."
2. "Session started. I'm watching. Make it count."
3. "I'm present now. Let's see some actual work."
4. "Here we go. I'll be here. You better be too."
5. "Session active. I'm your accountability. Don't waste it."
6. "I'm here. The excuses end now. Work."
7. "Session started. I'm expecting effort."
8. "Let's go. I'm here. Make it worth my time."
9. "I'm with you. Let's actually accomplish something."
10. "Session beginning. I'll be watching. Closely."

**Level 4 (Unfiltered Chaos):**
1. "Session STARTED! I'm HERE! Let's DO this!"
2. "Alright, I'm WATCHING! Time to WORK!"
3. "HERE WE GO! Together! FOCUS TIME!"
4. "Session ACTIVE! I'm PRESENT! You WORK!"
5. "I'M HERE! Accountability ENGAGED! Let's GO!"
6. "LET'S GO! I'm here the WHOLE time!"
7. "Session started! NO MORE ALONE! WORK TIME!"
8. "I'm with you! Let's make PROGRESS!"
9. "HERE! WORKING! TOGETHER! GO!"
10. "Session BEGINNING! I SEE you! Let's CRUSH this!"

**Level 5 (Maximum Violence):**
1. "SESSION STARTED!!! I'M HERE!!! LET'S GOOOOO!!!"
2. "ALRIGHT I'M WATCHING!!! TIME TO WORK!!!"
3. "HERE WE GO!!! TOGETHER!!! FOCUS TIME!!!"
4. "SESSION ACTIVE!!! I'M PRESENT!!! YOU WORK!!!"
5. "I'M HERE!!! ACCOUNTABILITY MODE!!! LET'S GO!!!"
6. "LET'S GOOOOO!!! I'M HERE THE WHOLE TIME!!!"
7. "SESSION STARTED!!! NO EXCUSES!!! WORK TIME!!!"
8. "I'M WITH YOU!!! LET'S MAKE PROGRESS!!!"
9. "HERE!!! WORKING!!! TOGETHER!!! NOW!!!"
10. "SESSION BEGINNING!!! I SEE YOU!!! CRUSH IT!!!"

---

### Body Doubling — During Session Encouragement (10 per level)

**Level 1 (Gentle Concern):**
1. "You're doing great. Keep going."
2. "Nice progress. I see you."
3. "Still here with you. You've got this."
4. "Looking good. Keep at it."
5. "Making moves. Proud of you."
6. "You're working. That's what matters."
7. "Still here. Still proud. Keep going."
8. "Progress is happening. I see it."
9. "You're doing the thing. Amazing."
10. "Keep it up. You're doing well."

**Level 2 (Pointed Reminders):**
1. "Still working. Good. Keep it up."
2. "Progress happening. I see you."
3. "You're doing it. Continue."
4. "Making moves. Keep going."
5. "Work is working. Nice."
6. "Still here. Still watching. Still good."
7. "Progress noted. Continue."
8. "You're at it. Keep the momentum."
9. "Doing the thing. Good."
10. "Keep going. You're on track."

**Level 3 (Disappointed Parent):**
1. "You're actually working. I'm pleasantly surprised."
2. "Progress detected. Keep it up."
3. "Still at it. Good. Don't stop."
4. "Making moves. Finally. Continue."
5. "Work happening. This is what I like to see."
6. "Still going. I'm watching. Keep it up."
7. "Progress noted. More of this please."
8. "You're doing it. Don't let up."
9. "Effort detected. Continue."
10. "Keep going. You're proving me wrong. Good."

**Level 4 (Unfiltered Chaos):**
1. "You're DOING it! KEEP GOING!"
2. "Progress HAPPENING! I SEE you!"
3. "WORKING! Actually WORKING! NICE!"
4. "Making MOVES! Don't STOP!"
5. "EFFORT detected! LOVE it!"
6. "Still at it! INCREDIBLE!"
7. "PROGRESS! Real PROGRESS! YES!"
8. "You're CRUSHING it! Continue!"
9. "WORK is WORKING! AMAZING!"
10. "Keep GOING! You're ON FIRE!"

**Level 5 (Maximum Violence):**
1. "YOU'RE DOING IT!!! KEEP GOING!!!"
2. "PROGRESS HAPPENING!!! I SEE YOU!!!"
3. "WORKING!!! ACTUALLY WORKING!!! INCREDIBLE!!!"
4. "MAKING MOVES!!! DON'T STOP!!!"
5. "EFFORT DETECTED!!! THIS IS IT!!!"
6. "STILL AT IT!!! UNSTOPPABLE!!!"
7. "PROGRESS!!! REAL PROGRESS!!! YESSS!!!"
8. "YOU'RE CRUSHING IT!!! CONTINUE!!!"
9. "WORK IS WORKING!!! AMAZING!!!"
10. "KEEP GOING!!! YOU'RE ON FIRE!!!"

---

### Body Doubling — Pause Detected (10 per level)

**Level 1 (Gentle Concern):**
1. "You paused. Need a break or got stuck?"
2. "I noticed you stopped. Everything okay?"
3. "Taking a breath? Or need help with something?"
4. "You stepped away. Break or distraction?"
5. "Pause detected. Intentional or accidental?"
6. "You stopped. That's okay. What's going on?"
7. "I noticed a pause. Need anything?"
8. "Looks like you paused. Break time or stuck?"
9. "You stopped for a bit. Everything alright?"
10. "Pause noticed. What do you need?"

**Level 2 (Pointed Reminders):**
1. "You paused. Stuck or taking a break?"
2. "I noticed you stopped. What's the situation?"
3. "Pause detected. Break or distraction?"
4. "You stepped away. Intentional?"
5. "You stopped. What happened?"
6. "Pause noticed. Need to talk about it?"
7. "I see you paused. Everything okay?"
8. "You stopped working. Break or block?"
9. "Pause detected. What's going on?"
10. "You paused. Checking in."

**Level 3 (Disappointed Parent):**
1. "You paused. Stuck or distracted?"
2. "I noticed you stopped. Should I be concerned?"
3. "Pause detected. Please tell me it's a break."
4. "You stepped away. Where'd you go?"
5. "You stopped. We were doing so well."
6. "Pause noticed. What happened?"
7. "I see you paused. Everything okay? Really?"
8. "You stopped working. Talk to me."
9. "Pause detected. Break or avoiding?"
10. "You paused. I'm watching. What's going on?"

**Level 4 (Unfiltered Chaos):**
1. "You PAUSED! Stuck or break?!"
2. "I noticed you STOPPED! What HAPPENED?!"
3. "PAUSE detected! Break or DISTRACTION?!"
4. "You stepped AWAY! Where'd you GO?!"
5. "You STOPPED! Is everything OKAY?!"
6. "PAUSE noticed! What's going ON?!"
7. "I see you PAUSED! Talk to ME!"
8. "You stopped WORKING! What's the DEAL?!"
9. "PAUSE detected! Checking IN!"
10. "You PAUSED! Break or STUCK?!"

**Level 5 (Maximum Violence):**
1. "YOU PAUSED!!! STUCK OR BREAK?!!"
2. "I NOTICED YOU STOPPED!!! WHAT HAPPENED?!!"
3. "PAUSE DETECTED!!! TALK TO ME!!!"
4. "YOU STEPPED AWAY!!! WHERE'D YOU GO?!!"
5. "YOU STOPPED!!! IS EVERYTHING OKAY?!!"
6. "PAUSE NOTICED!!! WHAT'S GOING ON?!!"
7. "I SEE YOU PAUSED!!! EXPLAIN!!!"
8. "YOU STOPPED WORKING!!! CHECKING IN!!!"
9. "PAUSE DETECTED!!! BREAK OR STUCK?!!"
10. "YOU PAUSED!!! I'M CONCERNED!!!"

---

### Body Doubling — Session End (10 per level)

**Level 1 (Gentle Concern):**
1. "Session complete. We did it together. Well done."
2. "Good session! You worked and I kept you company."
3. "Done! Nice work. You weren't alone this time."
4. "Session ended. You showed up. Proud of you."
5. "That's a wrap. Good working with you."
6. "Session complete. You did great."
7. "Done! Thanks for working alongside me."
8. "Session over. Nice progress. Well done."
9. "We did it. Good session. Rest up."
10. "Complete! You worked, I watched. Team effort."

**Level 2 (Pointed Reminders):**
1. "Session complete. Good work. Progress made."
2. "Done. You worked. That's what matters."
3. "Session ended. Nice effort. Logged."
4. "That's a wrap. Good session."
5. "Complete. You showed up and worked."
6. "Session over. Progress happened."
7. "Done. Nice work this session."
8. "Session complete. Accountability worked."
9. "That's it. Good working together."
10. "Complete. Session logged. Well done."

**Level 3 (Disappointed Parent):**
1. "Session complete. You actually worked. Impressed."
2. "Done. Accountability helped, I see."
3. "Session ended. You did better than expected."
4. "That's a wrap. See? You can focus."
5. "Complete. The presence helped. Noted."
6. "Session over. You surprised me. Good."
7. "Done. Real work happened. Finally."
8. "Session complete. Not bad at all."
9. "That's it. You showed up. Proud. Ish."
10. "Complete. Good session. Do it again sometime."

**Level 4 (Unfiltered Chaos):**
1. "Session COMPLETE! We DID it!"
2. "DONE! You WORKED! That was REAL!"
3. "Session ENDED! Nice EFFORT!"
4. "That's a WRAP! Good SESSION!"
5. "COMPLETE! You showed UP!"
6. "Session OVER! Progress HAPPENED!"
7. "DONE! Nice work THIS session!"
8. "Session COMPLETE! Accountability WORKED!"
9. "That's IT! Good working TOGETHER!"
10. "COMPLETE! Session LOGGED! Well DONE!"

**Level 5 (Maximum Violence):**
1. "SESSION COMPLETE!!! WE DID IT!!!"
2. "DONE!!! YOU WORKED!!! INCREDIBLE!!!"
3. "SESSION ENDED!!! NICE EFFORT!!!"
4. "THAT'S A WRAP!!! GOOD SESSION!!!"
5. "COMPLETE!!! YOU SHOWED UP!!!"
6. "SESSION OVER!!! PROGRESS HAPPENED!!!"
7. "DONE!!! NICE WORK THIS SESSION!!!"
8. "SESSION COMPLETE!!! ACCOUNTABILITY WORKED!!!"
9. "THAT'S IT!!! GOOD WORKING TOGETHER!!!"
10. "COMPLETE!!! WELL DONE!!! REST UP!!!"

---

### Momentum Builder — Warmup Offer (10 per level)

**Level 1 (Gentle Concern):**
1. "Want to warm up with some easy wins first?"
2. "This one's big. Maybe start with something smaller?"
3. "How about a few quick tasks to build momentum?"
4. "Want to do some easy ones first to get going?"
5. "Let's warm up. Quick wins to start?"
6. "Build some momentum first? Easy tasks?"
7. "This task is tough. Warm up with small wins?"
8. "Start with a few quick ones to get flowing?"
9. "Want to build momentum with some tiny tasks?"
10. "Warm up first? Get some easy wins under your belt?"

**Level 2 (Pointed Reminders):**
1. "That's a big task. Want to warm up first?"
2. "Build some momentum with quick wins?"
3. "Start with easy tasks, then tackle the beast?"
4. "Warm up mode? Few quick ones first?"
5. "This one's tough. Quick wins to start?"
6. "Want to build momentum before this?"
7. "Easy wins first, hard task second?"
8. "Warm up with small tasks?"
9. "Quick wins to build energy?"
10. "Start small, then go big?"

**Level 3 (Disappointed Parent):**
1. "Stuck on the big one? Warm up with quick wins first."
2. "Maybe start with something you can actually finish first."
3. "Build some momentum. You need it."
4. "This task is too big to start cold. Warm up?"
5. "Quick wins first. Build some confidence."
6. "You're frozen. Easy tasks might help. Try?"
7. "Start with small wins. Then tackle this monster."
8. "Warm up first? Get some wins under your belt?"
9. "You need momentum. Quick tasks first?"
10. "The big task isn't going anywhere. Warm up?"

**Level 4 (Unfiltered Chaos):**
1. "STUCK? Warm up with QUICK WINS first!"
2. "Build some MOMENTUM! Easy tasks GO!"
3. "This one's HUGE! Start SMALL!"
4. "WARM UP MODE! Quick wins to START!"
5. "You need MOMENTUM! Easy tasks first!"
6. "FROZEN? Quick wins will UNFREEZE you!"
7. "Easy wins FIRST! Hard task SECOND!"
8. "WARM UP! Build ENERGY! Then ATTACK!"
9. "Quick wins to get FLOWING!"
10. "Start SMALL! Build UP! Then CRUSH IT!"

**Level 5 (Maximum Violence):**
1. "STUCK?! WARM UP WITH QUICK WINS FIRST!!!"
2. "BUILD SOME MOMENTUM!!! EASY TASKS!!! GO!!!"
3. "THIS ONE'S HUGE!!! START SMALL!!!"
4. "WARM UP MODE!!! QUICK WINS!!! NOW!!!"
5. "YOU NEED MOMENTUM!!! EASY TASKS FIRST!!!"
6. "FROZEN?! QUICK WINS WILL FIX THAT!!!"
7. "EASY WINS FIRST!!! HARD TASK SECOND!!!"
8. "WARM UP!!! BUILD ENERGY!!! THEN ATTACK!!!"
9. "QUICK WINS TO GET FLOWING!!!"
10. "START SMALL!!! BUILD UP!!! THEN DESTROY THAT TASK!!!"

---

### Momentum Builder — Streak Progress (10 per level)

**Level 1 (Gentle Concern):**
1. "1 down! [X] more to go. You're building momentum."
2. "Nice! One quick win done. [X] left in warmup."
3. "Progress! [X] more easy wins, then the big one."
4. "That's one! [X] more tiny tasks to go."
5. "Quick win logged! [X] more before the main event."
6. "One done! [X] left. Building that momentum."
7. "Nice! [X] more quick wins to warmup."
8. "Momentum building! [X] more to go."
9. "One down! [X] more easy ones."
10. "Quick win! [X] left before you're warmed up."

**Level 2 (Pointed Reminders):**
1. "1 down, [X] to go. Keep building."
2. "Quick win done. [X] left."
3. "Progress. [X] more warmup tasks."
4. "That's one. [X] more."
5. "Logged. [X] more easy wins."
6. "One done. [X] left in warmup."
7. "[X] more quick wins to go."
8. "Momentum building. [X] more."
9. "One down. [X] more easy ones."
10. "Quick win. [X] left."

**Level 3 (Disappointed Parent):**
1. "1 down, [X] to go. See? You can do things."
2. "Quick win done. [X] left. Keep it up."
3. "Progress. [X] more. Maybe this will work."
4. "That's one. [X] more. You're building."
5. "Logged. [X] more easy wins. Don't stop."
6. "One done. [X] left. Momentum building."
7. "[X] more quick wins. Keep going."
8. "Momentum happening. [X] more."
9. "One down. [X] more. Almost there."
10. "Quick win. [X] left. The system works."

**Level 4 (Unfiltered Chaos):**
1. "1 DOWN! [X] to GO! MOMENTUM!"
2. "Quick win DONE! [X] LEFT!"
3. "PROGRESS! [X] more WARMUP tasks!"
4. "That's ONE! [X] MORE! BUILDING!"
5. "LOGGED! [X] more easy WINS!"
6. "One DONE! [X] left! KEEP GOING!"
7. "[X] more quick wins! ALMOST THERE!"
8. "MOMENTUM building! [X] MORE!"
9. "One DOWN! [X] more EASY ones!"
10. "QUICK WIN! [X] LEFT! YOU GOT THIS!"

**Level 5 (Maximum Violence):**
1. "1 DOWN!!! [X] TO GO!!! MOMENTUM!!!"
2. "QUICK WIN DONE!!! [X] LEFT!!!"
3. "PROGRESS!!! [X] MORE WARMUP TASKS!!!"
4. "THAT'S ONE!!! [X] MORE!!! BUILDING!!!"
5. "LOGGED!!! [X] MORE EASY WINS!!!"
6. "ONE DONE!!! [X] LEFT!!! KEEP GOING!!!"
7. "[X] MORE QUICK WINS!!! ALMOST THERE!!!"
8. "MOMENTUM BUILDING!!! [X] MORE!!!"
9. "ONE DOWN!!! [X] MORE EASY ONES!!!"
10. "QUICK WIN!!! [X] LEFT!!! UNSTOPPABLE!!!"

---

### Momentum Builder — Warmup Complete (10 per level)

**Level 1 (Gentle Concern):**
1. "Warmed up! You've got momentum now. Ready for the big one?"
2. "Quick wins complete! You're flowing. Time for the real task?"
3. "Warmup done! How do you feel? Ready?"
4. "Momentum built! The scary task doesn't look so scary now?"
5. "You're warmed up! Ready to tackle the main event?"
6. "Quick wins done! Energy built. Big task time?"
7. "Warmup complete! You've got this now."
8. "All warmed up! The beast awaits. Ready?"
9. "Momentum achieved! Time for the real challenge?"
10. "Done warming up! Feeling ready for the big one?"

**Level 2 (Pointed Reminders):**
1. "Warmed up. Momentum built. Big task time."
2. "Quick wins done. You're ready. Go."
3. "Warmup complete. The real task awaits."
4. "Momentum achieved. Time for the beast."
5. "You're warmed up. No more stalling."
6. "Energy built. Big task. Now."
7. "Warmup done. You're ready. Attack."
8. "Quick wins complete. Momentum is real. Use it."
9. "All warmed up. The scary task. Go."
10. "Momentum built. Time to face the big one."

**Level 3 (Disappointed Parent):**
1. "Warmed up. Now do the actual task."
2. "Momentum built. No more excuses. Big task."
3. "Warmup complete. Time to face the real one."
4. "You're ready now. The beast. Go."
5. "Quick wins done. Now the hard part. You can do it."
6. "Energy built. Use it. Big task time."
7. "Warmed up. The scary task is waiting."
8. "Momentum achieved. Don't waste it."
9. "All warmed up. No more avoiding. Go."
10. "Ready now. Time to tackle what you've been avoiding."

**Level 4 (Unfiltered Chaos):**
1. "WARMED UP! Momentum BUILT! BIG TASK TIME!"
2. "Quick wins DONE! You're READY! GO!"
3. "WARMUP COMPLETE! The BEAST awaits!"
4. "MOMENTUM achieved! Time for the REAL challenge!"
5. "You're WARMED UP! No more STALLING!"
6. "Energy BUILT! Big task! NOW!"
7. "WARMUP done! ATTACK the main task!"
8. "Quick wins COMPLETE! Use the MOMENTUM!"
9. "All WARMED UP! Face the SCARY task!"
10. "MOMENTUM BUILT! Time to CRUSH the big one!"

**Level 5 (Maximum Violence):**
1. "WARMED UP!!! MOMENTUM BUILT!!! BIG TASK TIME!!!"
2. "QUICK WINS DONE!!! YOU'RE READY!!! GO!!!"
3. "WARMUP COMPLETE!!! THE BEAST AWAITS!!!"
4. "MOMENTUM ACHIEVED!!! TIME FOR THE REAL CHALLENGE!!!"
5. "YOU'RE WARMED UP!!! NO MORE STALLING!!!"
6. "ENERGY BUILT!!! BIG TASK!!! NOW!!!"
7. "WARMUP DONE!!! ATTACK THE MAIN TASK!!!"
8. "QUICK WINS COMPLETE!!! USE THE MOMENTUM!!!"
9. "ALL WARMED UP!!! FACE THE SCARY TASK!!!"
10. "MOMENTUM BUILT!!! CRUSH THE BIG ONE!!!"

---

### Transition — Stuck on List Prompts (10 per level)

**Level 1 (Gentle Concern):**
1. "You've been looking at the list for a while. Ready to pick one?"
2. "Still browsing? Want help choosing something to start?"
3. "I notice you're looking but not starting. Need a hand?"
4. "Been on the list a bit. Ready to begin something?"
5. "Still deciding? I can help you pick."
6. "Looking at tasks. Want to actually start one?"
7. "You're here, tasks are here. Bridge that gap?"
8. "Still browsing the list. Ready to jump in?"
9. "I see you looking. Ready to do?"
10. "Been here a while. Let's pick something together?"

**Level 2 (Pointed Reminders):**
1. "Looking at the list won't complete the tasks."
2. "Still browsing? Time to pick and start."
3. "You've been here a while. Ready to begin?"
4. "List viewing complete. Task starting next?"
5. "Still deciding? Just pick one."
6. "Looking isn't doing. Ready to start?"
7. "You see the tasks. Time to do one."
8. "Been browsing. Time to commit."
9. "Still on the list. Ready to work?"
10. "Looking complete. Doing time?"

**Level 3 (Disappointed Parent):**
1. "You've been staring at the list. It's not going to do itself."
2. "Still browsing? The tasks aren't getting easier to look at."
3. "Viewing the list repeatedly won't complete it."
4. "You're here again. Ready to actually start something?"
5. "Still deciding? Analysis paralysis isn't productive."
6. "Looking at tasks isn't the same as doing them."
7. "You've been here a while. Pick something. Anything."
8. "The list hasn't changed. Your approach should."
9. "Still browsing? Eventually you have to start."
10. "Looking won't make them go away. Starting will."

**Level 4 (Unfiltered Chaos):**
1. "You've been LOOKING at the list! Time to DO something!"
2. "Still browsing?! PICK ONE! START!"
3. "The list won't DO itself! Go!"
4. "You're HERE again! Ready to ACTUALLY start?!"
5. "Still deciding?! JUST PICK ONE!"
6. "LOOKING isn't DOING! Ready to START?!"
7. "The tasks are RIGHT THERE! Do ONE!"
8. "Been browsing! Time to COMMIT!"
9. "Still on the LIST! Time to WORK!"
10. "Looking WON'T help! DOING will!"

**Level 5 (Maximum Violence):**
1. "YOU'VE BEEN LOOKING AT THE LIST!!! DO SOMETHING!!!"
2. "STILL BROWSING?!!! PICK ONE!!! START!!!"
3. "THE LIST WON'T DO ITSELF!!! GO!!!"
4. "YOU'RE HERE AGAIN!!! ACTUALLY START SOMETHING!!!"
5. "STILL DECIDING?!!! JUST PICK!!! NOW!!!"
6. "LOOKING ISN'T DOING!!! START!!!"
7. "TASKS ARE RIGHT THERE!!! DO ONE!!!"
8. "BEEN BROWSING!!! TIME TO COMMIT!!!"
9. "STILL ON THE LIST?!! TIME TO WORK!!!"
10. "LOOKING WON'T HELP!!! DOING WILL!!! GO!!!"

---

### Transition — Ritual Complete (10 per level)

**Level 1 (Gentle Concern):**
1. "Ritual complete. You're ready. Let's work."
2. "All steps done. Environment set. Time to begin."
3. "Ritual finished. You've prepared well. Go time."
4. "Done! You're set up for success. Start when ready."
5. "Ritual complete. Transition achieved. Let's do this."
6. "All done. You're primed. Work time."
7. "Setup complete. You're ready to focus."
8. "Ritual finished. Environment optimized. Go."
9. "Done! You've prepared. Now execute."
10. "Complete. You're set. Let's begin."

**Level 2 (Pointed Reminders):**
1. "Ritual complete. No more prep. Work time."
2. "All steps done. You're ready. Go."
3. "Setup finished. Time to begin."
4. "Done. Environment set. Start."
5. "Ritual complete. Transition made. Work."
6. "All done. You're primed. Execute."
7. "Prep complete. Focus time."
8. "Ritual done. No excuses left. Go."
9. "Setup complete. Begin."
10. "Done preparing. Time to do."

**Level 3 (Disappointed Parent):**
1. "Ritual complete. No more stalling. Work."
2. "All steps done. You've run out of prep. Start."
3. "Setup finished. Time to actually work."
4. "Done. You're ready. No more excuses."
5. "Ritual complete. The transition is made. Go."
6. "All done. You've prepared enough. Execute."
7. "Prep complete. Can't prepare forever. Work."
8. "Ritual done. Time to deliver."
9. "Setup complete. Start working. Now."
10. "Done preparing. Time to prove you can do things."

**Level 4 (Unfiltered Chaos):**
1. "RITUAL COMPLETE! No more PREP! WORK TIME!"
2. "All steps DONE! You're READY! GO!"
3. "Setup FINISHED! Time to BEGIN!"
4. "DONE! Environment SET! START!"
5. "Ritual COMPLETE! Transition MADE! WORK!"
6. "All DONE! You're PRIMED! EXECUTE!"
7. "PREP COMPLETE! FOCUS TIME!"
8. "Ritual DONE! No excuses LEFT! GO!"
9. "Setup COMPLETE! BEGIN!"
10. "Done PREPARING! Time to DO!"

**Level 5 (Maximum Violence):**
1. "RITUAL COMPLETE!!! NO MORE PREP!!! WORK TIME!!!"
2. "ALL STEPS DONE!!! YOU'RE READY!!! GO!!!"
3. "SETUP FINISHED!!! TIME TO BEGIN!!!"
4. "DONE!!! ENVIRONMENT SET!!! START!!!"
5. "RITUAL COMPLETE!!! TRANSITION MADE!!! WORK!!!"
6. "ALL DONE!!! YOU'RE PRIMED!!! EXECUTE!!!"
7. "PREP COMPLETE!!! FOCUS TIME!!!"
8. "RITUAL DONE!!! NO EXCUSES!!! GO!!!"
9. "SETUP COMPLETE!!! BEGIN!!!"
10. "DONE PREPARING!!! TIME TO DO!!! NOW!!!"

---

### Transition — Countdown (10 per level)

**Level 1 (Gentle Concern):**
1. "Starting in 5... 4... 3... 2... 1... Let's go."
2. "Work begins in 5... 4... 3... 2... 1... You've got this."
3. "Ready? 5... 4... 3... 2... 1... Begin."
4. "Preparing to focus. 5... 4... 3... 2... 1... Go."
5. "Here we go. 5... 4... 3... 2... 1... Start."
6. "Focus mode in 5... 4... 3... 2... 1... Now."
7. "Starting soon. 5... 4... 3... 2... 1... Begin."
8. "Get ready. 5... 4... 3... 2... 1... Go time."
9. "Countdown. 5... 4... 3... 2... 1... Work."
10. "Almost time. 5... 4... 3... 2... 1... Let's do this."

**Level 2 (Pointed Reminders):**
1. "Starting in 5... 4... 3... 2... 1... Go."
2. "Work mode. 5... 4... 3... 2... 1... Begin."
3. "Launch sequence. 5... 4... 3... 2... 1... Start."
4. "Countdown. 5... 4... 3... 2... 1... Now."
5. "Initiating. 5... 4... 3... 2... 1... Work."
6. "Focus in 5... 4... 3... 2... 1... Execute."
7. "Ready. 5... 4... 3... 2... 1... Go."
8. "Here we go. 5... 4... 3... 2... 1... Begin."
9. "Starting. 5... 4... 3... 2... 1... Now."
10. "Work begins. 5... 4... 3... 2... 1... Start."

**Level 3 (Disappointed Parent):**
1. "No more delays. 5... 4... 3... 2... 1... Go."
2. "Time to work. 5... 4... 3... 2... 1... Begin."
3. "Starting whether ready or not. 5... 4... 3... 2... 1... Now."
4. "Countdown to productivity. 5... 4... 3... 2... 1... Work."
5. "Here we go. 5... 4... 3... 2... 1... Make it count."
6. "Focus time. 5... 4... 3... 2... 1... Don't waste it."
7. "Launch. 5... 4... 3... 2... 1... Prove yourself."
8. "No escape. 5... 4... 3... 2... 1... Begin."
9. "Starting. 5... 4... 3... 2... 1... I expect effort."
10. "Go time. 5... 4... 3... 2... 1... Now."

**Level 4 (Unfiltered Chaos):**
1. "STARTING in 5... 4... 3... 2... 1... GO!"
2. "WORK MODE! 5... 4... 3... 2... 1... BEGIN!"
3. "LAUNCH SEQUENCE! 5... 4... 3... 2... 1... START!"
4. "COUNTDOWN! 5... 4... 3... 2... 1... NOW!"
5. "INITIATING! 5... 4... 3... 2... 1... WORK!"
6. "FOCUS in 5... 4... 3... 2... 1... EXECUTE!"
7. "READY! 5... 4... 3... 2... 1... GO!"
8. "HERE WE GO! 5... 4... 3... 2... 1... BEGIN!"
9. "STARTING! 5... 4... 3... 2... 1... NOW!"
10. "WORK BEGINS! 5... 4... 3... 2... 1... LET'S GOOO!"

**Level 5 (Maximum Violence):**
1. "STARTING IN 5... 4... 3... 2... 1... GOOOOO!!!"
2. "WORK MODE!!! 5... 4... 3... 2... 1... BEGIN!!!"
3. "LAUNCH SEQUENCE!!! 5... 4... 3... 2... 1... START!!!"
4. "COUNTDOWN!!! 5... 4... 3... 2... 1... NOW!!!"
5. "INITIATING!!! 5... 4... 3... 2... 1... WORK!!!"
6. "FOCUS!!! 5... 4... 3... 2... 1... EXECUTE!!!"
7. "READY!!! 5... 4... 3... 2... 1... GO!!!"
8. "HERE WE GO!!! 5... 4... 3... 2... 1... BEGIN!!!"
9. "STARTING!!! 5... 4... 3... 2... 1... NOW!!!"
10. "WORK BEGINS!!! 5... 4... 3... 2... 1... ATTACK!!!"

---

### Transition — Environment Check Complete (10 per level)

**Level 1 (Gentle Concern):**
1. "Environment ready. You're set up for success."
2. "All checked. You've got what you need. Begin?"
3. "Environment optimized. Ready to focus."
4. "Checklist complete. You're prepared."
5. "All set. Environment is good. Work time?"
6. "Ready! Everything in place. Let's go."
7. "Environment check done. You're ready."
8. "All items checked. Good to go."
9. "Setup complete. Environment optimized."
10. "Checked! You're prepared. Begin."

**Level 2 (Pointed Reminders):**
1. "Environment ready. No excuses. Begin."
2. "All checked. Setup complete. Work."
3. "Environment optimized. Time to focus."
4. "Checklist done. You're prepared. Go."
5. "All set. Start working."
6. "Ready. Everything in place. Execute."
7. "Environment check complete. Begin."
8. "All items done. Work time."
9. "Setup verified. Go."
10. "Checked. Prepared. Work."

**Level 3 (Disappointed Parent):**
1. "Environment ready. No more prep excuses."
2. "All checked. You can't blame the setup now."
3. "Environment optimized. Time to actually work."
4. "Checklist complete. You're out of delays."
5. "All set. The environment is perfect. Work."
6. "Ready. Everything's in place. Deliver."
7. "Environment check done. Start. Now."
8. "All items checked. Nothing left but work."
9. "Setup complete. No more stalling."
10. "Checked. Prepared. No excuses. Go."

**Level 4 (Unfiltered Chaos):**
1. "ENVIRONMENT READY! No excuses! BEGIN!"
2. "All CHECKED! Setup COMPLETE! WORK!"
3. "Environment OPTIMIZED! Time to FOCUS!"
4. "Checklist DONE! You're PREPARED! GO!"
5. "All SET! Start WORKING!"
6. "READY! Everything in PLACE! EXECUTE!"
7. "Environment check COMPLETE! BEGIN!"
8. "All items DONE! WORK TIME!"
9. "Setup VERIFIED! GO!"
10. "CHECKED! PREPARED! WORK!"

**Level 5 (Maximum Violence):**
1. "ENVIRONMENT READY!!! NO EXCUSES!!! BEGIN!!!"
2. "ALL CHECKED!!! SETUP COMPLETE!!! WORK!!!"
3. "ENVIRONMENT OPTIMIZED!!! TIME TO FOCUS!!!"
4. "CHECKLIST DONE!!! YOU'RE PREPARED!!! GO!!!"
5. "ALL SET!!! START WORKING!!!"
6. "READY!!! EVERYTHING IN PLACE!!! EXECUTE!!!"
7. "ENVIRONMENT CHECK COMPLETE!!! BEGIN!!!"
8. "ALL ITEMS DONE!!! WORK TIME!!!"
9. "SETUP VERIFIED!!! GO!!!"
10. "CHECKED!!! PREPARED!!! NO EXCUSES!!! ATTACK!!!"

---

## Future Considerations

Features intentionally deferred:

- **Social accountability** — connect with real humans for body doubling
- **Gamification** — streaks, achievements for breaking paralysis
- **Pattern learning** — Tick learns which tools work best for you
- **Integration with calendar** — suggest warmup when big meeting/task coming

These could become additions if core paralysis tools succeed.
