# Liars Todo - App Copy

All in-app copy organized by flow and context.

---

## 1. Onboarding Flow

### Screen 1: Welcome

**Tick Expression:** idle, waving

**Headline:** "Hi! I'm Tick."

**Body:**
"I'm going to lie to you about your deadlines. Constantly."

"It's for your own good."

**CTA:** "Tell me more"

---

### Screen 2: The Problem

**Tick Expression:** suspicious

**Headline:** "Let me guess..."

**Body:**
"You only do things when they're urgent. A deadline two weeks away? Doesn't exist to your brain."

"But a deadline TOMORROW? Suddenly you're a productivity machine."

**CTA:** "That's... accurate"

---

### Screen 3: The Solution

**Tick Expression:** scheming

**Headline:** "Here's my evil plan:"

**Body:**
"You tell me the REAL deadline. I show you a FAKE earlier one."

"You panic. You work. You finish 'just in time' — and discover you're actually EARLY."

**CTA:** "Diabolical. I love it."

---

### Screen 4: The Spiciness

**Tick Expression:** range display (idle → unhinged)

**Headline:** "One more thing..."

**Body:**
"You get to choose how mean I am when you ignore your tasks."

**Examples:**
- Level 1: "gentle concern" — "oh no baby what is you doing"
- Level 5: "maximum violence" — "I'M DMING ALL YOUR EXES ABOUT THIS"

**CTA:** "Set my spiciness level"

---

### Screen 5: Spiciness Selection

**Tick Expression:** changes with slider

**Headline:** "How mean should I be?"

**Slider Labels:**
- Level 1: "Gentle concern"
- Level 2: "Pointed reminders"
- Level 3: "Disappointed parent"
- Level 4: "Unfiltered chaos"
- Level 5: "Maximum violence"

**Helper Text:** "You can change this anytime by long-pressing me."

**CTA:** "That's perfect"

---

### Screen 6: First Task Prompt

**Tick Expression:** eager

**Headline:** "Perfect! Now let's add your first task."

**Body:**
"Be honest about the real deadline. I'll handle the lying."

"Remember: YOU CAN'T HANDLE THE TRUTH. But I can handle it for you."

**CTA:** "Add my first task"
**Secondary:** "Skip for now"

---

### Screen 7: Setup Complete

**Tick Expression:** idle

**Headline:** "We're all set!"

**Body:**
"I'll be right here in the corner, watching. Judging. Lying."

"Tap me anytime if you want to chat. Long-press to adjust how mean I am."

"Let's get you on track."

**CTA:** "Let's do this"

---

## 2. Empty States

### No Tasks Yet (New User)

**Tick Expression:** tapping_foot

**Headline:** "No tasks yet? Interesting."

**Body:** "I'm ready to lie whenever you are."

**CTA:** "+ Add a task"

**Alternative Headlines (rotate randomly):**
- "I didn't become a professional liar to sit here doing nothing."
- "Add a task. Let me gaslight you. It'll be fun."
- "You downloaded a lying todo app and added no todos. Bold move."
- "The lying can't start until you give me something to lie about."
- "*taps foot* I'm waiting..."

---

### All Tasks Complete

**Tick Expression:** celebrating (with party hat)

**Headline:** "You did EVERYTHING?"

**Body:** "Who ARE you right now?"

**Subtext:** "Go outside. Touch grass. You earned it."

**CTA:** "+ Add more"

**Alternative Headlines (rotate randomly):**
- "All done? I'm... proud? This feels weird."
- "Empty task list. My heart is full. My job is done."
- "Is this what peace feels like?"
- "Incredible. I have nothing mean to say. This is unprecedented."
- "Task list: empty. Chaos goblin: reformed. (Temporarily.)"

---

### No Tasks Due Today

**Tick Expression:** relaxed

**Headline:** "Nothing due today. Nice."

**Body:** "Don't get used to it."

**Alternative Lines:**
- "Today is chill. Tomorrow might not be. Enjoy it."
- "No deadlines today. The calm before the storm."
- "Free day! (According to my lies, anyway.)"

---

### No Overdue Tasks

**Tick Expression:** suspicious

**Headline:** "Nothing overdue? Suspicious."

**Body:** "Keep it that way."

---

### Search Returns No Results

**Tick Expression:** confused

**Headline:** "Nothing found."

**Body:** "Either it doesn't exist, or you spelled it wrong."

**Subtext:** "No judgment. (Some judgment.)"

---

### Offline State

**Tick Expression:** annoyed (with cord accessory)

**Headline:** "You're offline."

**Body:**
"I can show you your tasks, but I can't sync anything until you reconnect."

"The lies will continue when service is restored."

---

## 3. Completion & Reveal

### Task Completed (Before Reveal)

**Tick Expression:** shocked

**Headline:** "Wait. You..."

**Body:** "You actually did it?"

**CTA:** "Show me!"

---

### The Reveal Screen

**Tick Expression:** shocked → smug transition

**Headline:** "TASK COMPLETE"

**Task Display:**
```
"[Task name]" - DONE

You thought:  Due [FAKE DATE]
Reality:      Due [REAL DATE]

You finished: [X] DAYS EARLY
```

**Body:** "I lied. You thrived. You're welcome."

**CTA:** "Amazing!"

---

### Reveal Copy Variations

**Finished Very Early (3+ days):**
- "I lied SO hard and you STILL finished early. Incredible."
- "You had [X] days. You thought you had [Y] hours. Look at you go."
- "Massively early. My deception is working perfectly."

**Finished a Bit Early (1-2 days):**
- "Early! The system works."
- "Ahead of schedule. The lies are paying off."
- "You thought it was close. It wasn't. You're welcome."

**Finished Just in Time (on real deadline):**
- "You made it! (Barely. But you made it.)"
- "Right on time. The real time. Crisis averted."
- "That was closer than I'd like, but we did it."

**Finished on Fake Deadline (still before real):**
- "You finished exactly when I told you to. Good human."
- "Right on the fake deadline. Which means early. Perfect."
- "Textbook execution. Gold star."

**Finished After Fake but Before Real Deadline:**
- "Okay, you missed MY deadline. But you beat the real one."
- "Late by my standards. Early by real standards. I'll take it."
- "You stressed me out but it worked out. Don't do that again."

---

### Mini Completion Toast (subsequent completions same day)

**Messages (rotate randomly):**
- "Another one down!"
- "On a roll!"
- "Keep going!"
- "Unstoppable today."
- "Task crushed."

---

## 4. Reliability Score

### Score Increased

**Tick Expression:** happy

**Headline:** "Your reliability score went UP!"

**Display:** `50% → 55% (+5)`

**Body:** "Keep this up and I might have to lie less."

**Subtext:** "(I'll find other ways to mess with you.)"

**CTA:** "Nice!"

**Alternative Lines:**
- "Look at you, becoming reliable. I'm scared."
- "Score up! You're making my job harder. (Good.)"
- "Improvement! Who knew you had it in you?"
- "Higher score = less lying needed. Keep it up."

---

### Score Decreased

**Tick Expression:** disappointed

**Headline:** "Your reliability score went down."

**Display:** `50% → 45% (-5)`

**Body:** "That means I'll be lying to you more aggressively."

**Subtext:** "You brought this on yourself."

**CTA:** "Fair."

**Alternative Lines:**
- "Score down. Time to lie harder."
- "You need more deception. I'll provide."
- "Lower score = more aggressive lies. You earned this."
- "I'm going to have to be meaner now. For your own good."

---

### Score Milestones

**Hit 75%+ (High Reliability):**
- "75%? You're almost... reliable? This feels wrong."
- "High reliability score! I barely recognize you."
- "At this rate, you might not need me anymore. (You still need me.)"

**Hit 90%+ (Very High):**
- "90%?! Are you sure you downloaded the right app?"
- "Extremely reliable. I'm honestly confused."
- "You might be the most reliable chaos goblin I've ever met."

**Dropped Below 25% (Crisis Mode):**
- "Okay. We need to talk. Your score is... concerning."
- "Below 25%. I'm going to be lying to you A LOT."
- "This is fine. (It's not fine. I'm worried about you.)"

**Dropped to 10% or Below:**
- "Your reliability score is in the single digits. This is an intervention."
- "I've never lied this hard to anyone. I'm impressed, honestly."
- "Rock bottom. Nowhere to go but up. Right? ...Right?"

---

## 5. Error & Edge Cases

### Generic Error

**Tick Expression:** apologetic

**Headline:** "Oops. Something broke."

**Body:** "This one's on me, not you."

**Subtext:** "(For once.)"

**CTA:** "Try again" / "Go back"

---

### Failed to Save Task

**Tick Expression:** concerned

**Headline:** "Couldn't save that task."

**Body:** "Don't worry, I remember what you typed. Want to try again?"

**CTA:** "Try again" / "Cancel"

---

### Failed to Load Tasks

**Tick Expression:** confused

**Headline:** "Can't load your tasks right now."

**Body:** "Either the internet is being weird, or I am. Probably the internet."

**CTA:** "Refresh"

---

### Session Expired / Logged Out

**Tick Expression:** skeptical

**Headline:** "You've been logged out."

**Body:** "Either you did this on purpose, or it's been a while. Either way, let's get you back in."

**CTA:** "Log in again"

---

### Rate Limited

**Tick Expression:** apologetic

**Headline:** "Slow down there!"

**Body:** "You're doing a lot very fast. I appreciate the energy, but take a breath."

**CTA:** "Try again in 30s"

---

### Invalid Date (Past Date Entered)

**Tick Expression:** skeptical

**Headline:** "That date is in the past."

**Body:** "I can lie about deadlines, but I can't manipulate time."

**Subtext:** "(Not yet anyway.)"

---

### Date Too Far in Future

**Tick Expression:** confused

**Headline:** "That deadline is [X] away."

**Body:** "I believe in you, but my lying algorithm isn't designed for deadlines that far out."

**Subtext:** "Try something within 6 months?"

---

### Notification Permission Denied

**Tick Expression:** pleading

**Headline:** "You denied notification access."

**Body:** "How am I supposed to yell at you about deadlines now?"

**Subtext:** "The app will work, but you'll miss my dramatic alerts."

**CTA:** "Enable in settings" / "Skip"

---

## 6. Spiciness Settings Modal

**Tick Expression:** changes with slider position

**Headline:** "How mean should I be?"

**Slider Range:** 1-5

**Level Labels:**
| Level | Label | Description |
|-------|-------|-------------|
| 1 | Gentle concern | Soft reminders, minimal judgment |
| 2 | Pointed reminders | Slightly passive-aggressive |
| 3 | Disappointed parent | Guilt trips and sighs |
| 4 | Unfiltered chaos | Dramatic, emotional, caps lock |
| 5 | Maximum violence | Full unhinged mode |

**Preview Label:** "Preview:"
**Preview:** [Shows sample message for current level]

**Helper Text:** "This affects how I talk to you when tasks are overdue."

**CTA:** "Save" / "Cancel"

---

## 7. Settings Screen

### Section: About Tick

**Headline:** "About Me"

**Body:**
"I'm Tick, your friendly neighborhood liar. I show you fake deadlines because you can't handle the truth."

"The worse you are at meeting deadlines, the more I lie. It's called strategy."

---

### Section: How It Works

**Headline:** "How the Lying Works"

**Body:**
"1. You add a task with the REAL deadline"
"2. I show you a FAKE earlier deadline"
"3. You panic and finish 'early'"
"4. I reveal the truth and you feel great"

---

### Section: Your Stats

**Headline:** "Your Numbers"

**Stats:**
- Reliability Score: [X]%
- Tasks Completed: [X]
- Days Finished Early (total): [X]
- Current Streak: [X] days

---

### Section: Spiciness

**Headline:** "Spiciness Level"

**Current:** Level [X] - "[Level Name]"

**CTA:** "Adjust" (opens modal)

---

## 8. Push Notification Copy

### Approaching Deadline (1 day "away")

**Level 1-2:**
- "Friendly reminder: [Task] is due tomorrow"
- "[Task] is coming up tomorrow. Just a heads up."

**Level 3-4:**
- "[Task] is due TOMORROW. Just saying."
- "Hey. [Task]. Tomorrow. You know what to do."

**Level 5:**
- "[Task] IS DUE TOMORROW. TOMORROW."
- "TOMORROW. [Task]. DO IT."

---

### Overdue Notifications

Use messages from `src/data/overdueMessages.ts` based on spiciness level.

---

### Completion Celebration

- "You did it! [Task] complete."
- "[Task] - DONE. You finished [X] days early!"

---

## 9. Misc UI Copy

### Add Task Form

**Title Placeholder:** "What do you need to do?"
**Date Label:** "Real deadline (be honest, I'll lie for you)"
**Description Placeholder:** "Any details? (optional)"
**CTA:** "Add Task"

---

### Task Card

**Overdue Badge:** "OVERDUE"
**Due Today Badge:** "TODAY"
**Due Tomorrow Badge:** "TOMORROW"
**Completed Badge:** "DONE"

---

### Delete Confirmation

**Headline:** "Delete this task?"

**Body:** "I won't be able to lie to you about it anymore."

**CTA:** "Delete" / "Keep it"

---

### Snooze (Hidden Feature)

**Headline:** "Snooze this reminder?"

**Body:** "Fine. I'll remind you again in..."

**Options:** "1 hour" / "3 hours" / "Tomorrow"

**Subtext:** "You found the snooze button. Don't abuse it."

---

### First Task Added

**Tick Expression:** eager

**Headline:** "Your first task!"

**Body:** "I've already started lying about the deadline. You're welcome."

**CTA:** "Got it"
