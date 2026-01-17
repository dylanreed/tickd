// ABOUTME: Contains all Pick For Me messages organized by context and spiciness level.
// ABOUTME: Messages use <user_name> and [X] as placeholders for personalization.

export type SpicyLevel = 1 | 2 | 3 | 4 | 5;

export type PickForMeContext =
  | "random_selection"
  | "escalation_trigger"
  | "dismissal"
  | "earnout_progress"
  | "earnout_complete"
  | "all_overdue";

export interface PickForMeMessage {
  text: string;
  context: PickForMeContext;
  spicyLevel: SpicyLevel | null; // null for context-agnostic messages
  hasUserName: boolean;
}

const messages: PickForMeMessage[] = [
  // =============================================================================
  // RANDOM SELECTION COPY (Context-agnostic, no spiciness levels)
  // Used when Tick picks a task
  // =============================================================================
  {
    text: "I closed my eyes and pointed. This one.",
    context: "random_selection",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Randomly selected. Definitely didn't think about it.",
    context: "random_selection",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "The algorithm has spoken. (There is no algorithm.)",
    context: "random_selection",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Picked by chaos. You're welcome.",
    context: "random_selection",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "I threw all your tasks in a hat. This one came out.",
    context: "random_selection",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Eeny, meeny, miny... this one.",
    context: "random_selection",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "The universe chose. I'm just the messenger.",
    context: "random_selection",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Random pick! (I'm lying. But you knew that.)",
    context: "random_selection",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Fate has decided. Don't argue with fate.",
    context: "random_selection",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "*spins wheel* This one! Totally random. Trust me.",
    context: "random_selection",
    spicyLevel: null,
    hasUserName: false,
  },

  // =============================================================================
  // ESCALATION TRIGGER COPY (10 per spiciness level)
  // Used when user hits Pick For Me twice without completing
  // =============================================================================

  // Level 1 (Gentle Concern)
  {
    text: "Hey, you asked twice. Want me to simplify things?",
    context: "escalation_trigger",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Looks like choosing is hard right now. I can help with that.",
    context: "escalation_trigger",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Two picks — let me just show you one at a time.",
    context: "escalation_trigger",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "It's okay. Decisions are tough. I've got you.",
    context: "escalation_trigger",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Let's try something gentler. One task at a time.",
    context: "escalation_trigger",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "No pressure. I'll narrow it down for you.",
    context: "escalation_trigger",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Seems like you're stuck. Single-task mode might help.",
    context: "escalation_trigger",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "No worries. Let's focus on just one thing together.",
    context: "escalation_trigger",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "The list might be overwhelming. I'll put it away for now.",
    context: "escalation_trigger",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Deep breath. One task. We've got this.",
    context: "escalation_trigger",
    spicyLevel: 1,
    hasUserName: false,
  },

  // Level 2 (Pointed Reminders)
  {
    text: "You asked twice. Seems like you need me to take the wheel.",
    context: "escalation_trigger",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Two picks, no progress. Let me simplify things for you.",
    context: "escalation_trigger",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Having trouble choosing? I'll just show you one at a time.",
    context: "escalation_trigger",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Decisions are hard. I get it. Here's one task.",
    context: "escalation_trigger",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Let's try something different. One task. Just one.",
    context: "escalation_trigger",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Too many options? I'm narrowing it down for you.",
    context: "escalation_trigger",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "I notice you're stuck. Single-task mode activated.",
    context: "escalation_trigger",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "No judgment. Let's focus on just one thing.",
    context: "escalation_trigger",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "The list is overwhelming you. I'm putting it away for now.",
    context: "escalation_trigger",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Okay. We're doing this one task at a time now.",
    context: "escalation_trigger",
    spicyLevel: 2,
    hasUserName: false,
  },

  // Level 3 (Disappointed Parent)
  {
    text: "Two picks, zero tasks done. I'm hiding the list. You'll thank me.",
    context: "escalation_trigger",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "You can't handle the list right now. That's fine. One task.",
    context: "escalation_trigger",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "I gave you a choice. You asked for another. Now you get neither.",
    context: "escalation_trigger",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "The list is going away until you prove you can focus.",
    context: "escalation_trigger",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "Pick For Me isn't a toy. Single-task mode. Let's go.",
    context: "escalation_trigger",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "Twice? Really? Okay. No more list for you.",
    context: "escalation_trigger",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "*sigh* You need structure. Here's structure.",
    context: "escalation_trigger",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "I'm not mad. I'm just... managing you now.",
    context: "escalation_trigger",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "List privileges: revoked. Earn them back.",
    context: "escalation_trigger",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "You asked me to pick twice. Now I'm picking everything.",
    context: "escalation_trigger",
    spicyLevel: 3,
    hasUserName: false,
  },

  // Level 4 (Unfiltered Chaos)
  {
    text: "Pick For Me AGAIN? No. You don't get choices anymore.",
    context: "escalation_trigger",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Two picks and nothing done? LIST JAIL.",
    context: "escalation_trigger",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "You've lost list privileges. This is your fault.",
    context: "escalation_trigger",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Oh, you wanted OPTIONS? Too late. One task. GO.",
    context: "escalation_trigger",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "The list is GONE. You spiraled. This is the consequence.",
    context: "escalation_trigger",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "I'm staging an intervention. One. Task. At. A. Time.",
    context: "escalation_trigger",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "You can't be trusted with multiple tasks. Proven fact.",
    context: "escalation_trigger",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Congratulations! You've unlocked: FORCED FOCUS MODE.",
    context: "escalation_trigger",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "The list was too much for you. I'm not surprised.",
    context: "escalation_trigger",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Decision paralysis detected. Activating timeout protocol.",
    context: "escalation_trigger",
    spicyLevel: 4,
    hasUserName: false,
  },

  // Level 5 (Maximum Violence)
  {
    text: "YOU CAN'T BE TRUSTED WITH A LIST. ONE TASK. THAT'S IT.",
    context: "escalation_trigger",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "TWO PICKS?! THE LIST IS DEAD TO YOU NOW.",
    context: "escalation_trigger",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "PICK FOR ME ISN'T A GAME. SINGLE TASK MODE. IMMEDIATELY.",
    context: "escalation_trigger",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "YOU ABSOLUTE DISASTER. NO MORE LIST. ONE TASK. DO IT.",
    context: "escalation_trigger",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "THE LIST?! YOU THINK YOU DESERVE THE LIST?! NO.",
    context: "escalation_trigger",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "I'M HIDING EVERYTHING. YOU GET ONE TASK. COPE.",
    context: "escalation_trigger",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "DECISION PARALYSIS DETECTED. INITIATING LOCKDOWN.",
    context: "escalation_trigger",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "YOU HAD CHOICES. YOU BLEW IT. NOW THERE'S ONLY ONE.",
    context: "escalation_trigger",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "CONGRATULATIONS ON YOUR COMPLETE INABILITY TO CHOOSE. HERE'S ONE TASK.",
    context: "escalation_trigger",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "THE LIST HAS BEEN CONFISCATED. BLAME YOURSELF.",
    context: "escalation_trigger",
    spicyLevel: 5,
    hasUserName: false,
  },

  // =============================================================================
  // DISMISSAL COPY ("Can't right now") (10 per spiciness level)
  // Used when user dismisses a task in single-task mode
  // =============================================================================

  // Level 1 (Gentle Concern)
  {
    text: "No worries at all. How about this one?",
    context: "dismissal",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "That's completely okay. Let's try another.",
    context: "dismissal",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Not that one? Here's something else.",
    context: "dismissal",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Skipping is totally fine. Here's what's next.",
    context: "dismissal",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "No problem! Moving on.",
    context: "dismissal",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Can't do that one? Valid. Next!",
    context: "dismissal",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Let's find something that works better for you.",
    context: "dismissal",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "That's alright. Here's another pick.",
    context: "dismissal",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Not feeling it? That's okay. Next task.",
    context: "dismissal",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Okay! Different task coming up.",
    context: "dismissal",
    spicyLevel: 1,
    hasUserName: false,
  },

  // Level 2 (Pointed Reminders)
  {
    text: "No worries. How about this one instead?",
    context: "dismissal",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "That's okay. Let's try another.",
    context: "dismissal",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Not that one? Here's a different option.",
    context: "dismissal",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Skipping is fine. Here's what's next.",
    context: "dismissal",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "No problem. Moving on.",
    context: "dismissal",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Can't do that one? Sure. Next!",
    context: "dismissal",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Let's find something that works for you.",
    context: "dismissal",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Alright. Here's another pick.",
    context: "dismissal",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Not feeling it? Fair. Next task.",
    context: "dismissal",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Okay. Different task coming up.",
    context: "dismissal",
    spicyLevel: 2,
    hasUserName: false,
  },

  // Level 3 (Disappointed Parent)
  {
    text: "Fine. But you can't dodge forever.",
    context: "dismissal",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "Skipped. But it'll be back.",
    context: "dismissal",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "Alright. But we're running out of options here.",
    context: "dismissal",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "Moving on. For now.",
    context: "dismissal",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "*notes this down* Okay. Next one.",
    context: "dismissal",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "You're going to run out of tasks to skip eventually.",
    context: "dismissal",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "Dismissed. Don't make this a habit.",
    context: "dismissal",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "That task will still exist later. Just saying.",
    context: "dismissal",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "Okay. But I'm watching you.",
    context: "dismissal",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "Skipping. I'm keeping track, you know.",
    context: "dismissal",
    spicyLevel: 3,
    hasUserName: false,
  },

  // Level 4 (Unfiltered Chaos)
  {
    text: "SKIPPED. The task remembers. Tasks always remember.",
    context: "dismissal",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Fine. Run away from that one. Here's another.",
    context: "dismissal",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "You can't skip them all. (Watch me pick harder ones.)",
    context: "dismissal",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Dismissed! But like... why though.",
    context: "dismissal",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Next task. But I'm judging you.",
    context: "dismissal",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Okay SKIPPER. Here's another one.",
    context: "dismissal",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "That task is going to haunt you later.",
    context: "dismissal",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Avoidance! Fun! Here's another problem for you.",
    context: "dismissal",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Skipping skipping skipping. When does it END.",
    context: "dismissal",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Fine. FINE. Different task. Whatever.",
    context: "dismissal",
    spicyLevel: 4,
    hasUserName: false,
  },

  // Level 5 (Maximum Violence)
  {
    text: "COWARD. Here's another one.",
    context: "dismissal",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "YOU CAN'T SKIP YOUR WHOLE LIFE. (Next task.)",
    context: "dismissal",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "SKIPPED?! THAT TASK HAD A FAMILY.",
    context: "dismissal",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "RUNNING AWAY WON'T SAVE YOU. HERE'S ANOTHER.",
    context: "dismissal",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "SKIP. SKIP. SKIP. IS THIS WHO YOU ARE NOW?",
    context: "dismissal",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "DISMISSED. THE TASK WILL REMEMBER THIS BETRAYAL.",
    context: "dismissal",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "FINE. BUT THIS AVOIDANCE? IT'S GOING ON YOUR RECORD.",
    context: "dismissal",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "NEXT TASK. BUT KNOW THAT I'M DISAPPOINTED.",
    context: "dismissal",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "YOU CAN RUN BUT YOU CAN'T HIDE. NEW TASK.",
    context: "dismissal",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "SKIPPING. WOW. THE COWARDICE. HERE'S ANOTHER ONE.",
    context: "dismissal",
    spicyLevel: 5,
    hasUserName: false,
  },

  // =============================================================================
  // EARN-OUT PROGRESS COPY (Context-agnostic, uses [X] placeholder)
  // Used when completing a task in single-task mode
  // =============================================================================
  {
    text: "Nice! [X] more to go, then you get your list back.",
    context: "earnout_progress",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "One down! [X] more and you're free.",
    context: "earnout_progress",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Progress! [X] tasks left until list access.",
    context: "earnout_progress",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "That's one! [X] more to prove yourself.",
    context: "earnout_progress",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Completed! [X] to go. Keep it up.",
    context: "earnout_progress",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Tick! [X] more and I'll trust you with choices again.",
    context: "earnout_progress",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "One closer to freedom. [X] remaining.",
    context: "earnout_progress",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "You did a thing! [X] more things to go.",
    context: "earnout_progress",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "[X] more completions until you can see the list.",
    context: "earnout_progress",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Getting there! [X] left in your sentence.",
    context: "earnout_progress",
    spicyLevel: null,
    hasUserName: false,
  },

  // =============================================================================
  // EARN-OUT COMPLETE COPY (10 per spiciness level)
  // Used when user has completed enough tasks to exit single-task mode
  // =============================================================================

  // Level 1 (Gentle Concern)
  {
    text: "You did it! Here's your list back. I knew you could.",
    context: "earnout_complete",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Freedom earned! Welcome back to choices.",
    context: "earnout_complete",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "The list has returned. You handled that so well.",
    context: "earnout_complete",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Single-task mode complete. You're back in control.",
    context: "earnout_complete",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Nicely done! The list is yours again.",
    context: "earnout_complete",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "You focused and finished. Here's your reward: options.",
    context: "earnout_complete",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Task mode complete! I'm really proud of you.",
    context: "earnout_complete",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "You earned list access back. Go you!",
    context: "earnout_complete",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "Back to normal. You absolutely crushed it.",
    context: "earnout_complete",
    spicyLevel: 1,
    hasUserName: false,
  },
  {
    text: "The list is back. You proved you could focus. Great job.",
    context: "earnout_complete",
    spicyLevel: 1,
    hasUserName: false,
  },

  // Level 2 (Pointed Reminders)
  {
    text: "You did it! Here's your list back. I knew you could do it.",
    context: "earnout_complete",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Freedom earned. Welcome back to having choices.",
    context: "earnout_complete",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "The list has returned! You handled that really well.",
    context: "earnout_complete",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Single-task mode complete. You're back in the driver's seat.",
    context: "earnout_complete",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Nicely done. The list is yours again.",
    context: "earnout_complete",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "You focused and finished. Here's your reward: options.",
    context: "earnout_complete",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Task mode complete! Proud of you.",
    context: "earnout_complete",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "You earned list access back. Nice work!",
    context: "earnout_complete",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "Back to normal. You crushed it.",
    context: "earnout_complete",
    spicyLevel: 2,
    hasUserName: false,
  },
  {
    text: "The list is back. You proved you could focus.",
    context: "earnout_complete",
    spicyLevel: 2,
    hasUserName: false,
  },

  // Level 3 (Disappointed Parent)
  {
    text: "Look at you! Focused mode complete. Here's your list back. Don't make me regret this.",
    context: "earnout_complete",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "Freedom earned. The list has returned. Try not to spiral.",
    context: "earnout_complete",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "You did it. I'm... cautiously optimistic.",
    context: "earnout_complete",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "List privileges: restored. Tentatively.",
    context: "earnout_complete",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "You can have your list back. Don't blow it.",
    context: "earnout_complete",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "Single-task mode survived. Here's hoping you learned something.",
    context: "earnout_complete",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "Back to the list. I'll be watching.",
    context: "earnout_complete",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "You earned it. The list is back. Stay focused.",
    context: "earnout_complete",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "Okay. You've proven yourself. For now.",
    context: "earnout_complete",
    spicyLevel: 3,
    hasUserName: false,
  },
  {
    text: "List returned. Let's not do this again soon, okay?",
    context: "earnout_complete",
    spicyLevel: 3,
    hasUserName: false,
  },

  // Level 4 (Unfiltered Chaos)
  {
    text: "OH WOW you actually did it. List's back. Don't get cocky.",
    context: "earnout_complete",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Freedom! Try not to immediately spiral again.",
    context: "earnout_complete",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "The list returns! Let's see how long THIS lasts.",
    context: "earnout_complete",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "You survived timeout. Congratulations? Here's your list.",
    context: "earnout_complete",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Against all odds, you focused. List restored.",
    context: "earnout_complete",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "I didn't think you'd actually do it. Here's your list.",
    context: "earnout_complete",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Single-task mode: DEFEATED. Your list lives again.",
    context: "earnout_complete",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "You earned back list privileges. I'm genuinely shocked.",
    context: "earnout_complete",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "Back to normal! (Normal being: chaotic but with options.)",
    context: "earnout_complete",
    spicyLevel: 4,
    hasUserName: false,
  },
  {
    text: "The list is back. My faith in you is cautiously renewed.",
    context: "earnout_complete",
    spicyLevel: 4,
    hasUserName: false,
  },

  // Level 5 (Maximum Violence)
  {
    text: "FINE. YOU CAN HAVE YOUR PRECIOUS LIST BACK. DON'T BLOW IT.",
    context: "earnout_complete",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "FREEDOM. EARNED THROUGH SUFFERING. AS IT SHOULD BE.",
    context: "earnout_complete",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "THE LIST RETURNS. IF YOU END UP BACK HERE I'M GOING TO SCREAM.",
    context: "earnout_complete",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "YOU ACTUALLY DID IT?! LIST RESTORED. I'M SHOOK.",
    context: "earnout_complete",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "SINGLE-TASK PRISON: ESCAPED. DON'T COME BACK.",
    context: "earnout_complete",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "CONGRATULATIONS ON YOUR PAROLE. THE LIST IS BACK.",
    context: "earnout_complete",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "YOU SURVIVED. THE LIST SURVIVED. WE'RE ALL TRAUMATIZED.",
    context: "earnout_complete",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "FREEDOM! SWEET FREEDOM! NOW DON'T MAKE ME DO THAT AGAIN.",
    context: "earnout_complete",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "THE LIST HAS BEEN RESTORED. USE IT WISELY OR ELSE.",
    context: "earnout_complete",
    spicyLevel: 5,
    hasUserName: false,
  },
  {
    text: "YOU DID IT. I'M PROUD. (AGGRESSIVELY PROUD.) LIST RETURNED.",
    context: "earnout_complete",
    spicyLevel: 5,
    hasUserName: false,
  },

  // =============================================================================
  // ALL TASKS OVERDUE COPY (Context-agnostic, no spiciness levels)
  // Used when Pick For Me is used and everything is overdue
  // =============================================================================
  {
    text: "They're ALL late. Let's just start somewhere.",
    context: "all_overdue",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Everything's overdue. Cool. Cool cool cool. Here's one.",
    context: "all_overdue",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Bad news: all overdue. Good news: I picked one anyway.",
    context: "all_overdue",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "At this point, any progress is progress. Start here.",
    context: "all_overdue",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "It's all on fire. This one's slightly less on fire.",
    context: "all_overdue",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Overdue. All of it. But we start somewhere.",
    context: "all_overdue",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "No good options, only overdue ones. Here's your least bad choice.",
    context: "all_overdue",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "The whole list is late. Let's dig out together.",
    context: "all_overdue",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "Everything's past due. Deep breath. This one first.",
    context: "all_overdue",
    spicyLevel: null,
    hasUserName: false,
  },
  {
    text: "All overdue. No judgment. (Some judgment.) Let's go.",
    context: "all_overdue",
    spicyLevel: null,
    hasUserName: false,
  },
];

/**
 * Get a random message for a specific context and optional spiciness level
 */
export function getRandomPickForMeMessage(
  context: PickForMeContext,
  spicyLevel?: SpicyLevel,
  userName?: string,
  remaining?: number
): string {
  const filtered = messages.filter((m) => {
    if (m.context !== context) return false;
    // For context-agnostic messages (null spicyLevel), match any request
    // For spiciness-specific messages, require exact match
    if (m.spicyLevel !== null && spicyLevel !== undefined) {
      return m.spicyLevel === spicyLevel;
    }
    // If requesting context-agnostic (no spicyLevel specified or null in message)
    return m.spicyLevel === null || spicyLevel === undefined;
  });

  if (filtered.length === 0) {
    return "Here's a task for you.";
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  let message = filtered[randomIndex].text;

  // Replace [X] with remaining count if provided
  if (remaining !== undefined) {
    message = message.replace(/\[X\]/g, remaining.toString());
  }

  // Replace user name placeholder
  if (userName) {
    message = message.replace(/<user_name>/g, userName);
  } else {
    message = message
      .replace(/<user_name>,?\s*/g, "")
      .replace(/,?\s*<user_name>/g, "");
  }

  return message;
}

/**
 * Get all messages for a specific context and optional spiciness level
 */
export function getMessagesForContext(
  context: PickForMeContext,
  spicyLevel?: SpicyLevel
): PickForMeMessage[] {
  return messages.filter((m) => {
    if (m.context !== context) return false;
    if (spicyLevel !== undefined) {
      return m.spicyLevel === spicyLevel || m.spicyLevel === null;
    }
    return true;
  });
}

/**
 * Get message count statistics
 */
export function getMessageStats(): Record<string, number> {
  const stats: Record<string, number> = { total: messages.length };

  const contexts: PickForMeContext[] = [
    "random_selection",
    "escalation_trigger",
    "dismissal",
    "earnout_progress",
    "earnout_complete",
    "all_overdue",
  ];

  for (const context of contexts) {
    stats[context] = messages.filter((m) => m.context === context).length;
  }

  for (let level = 1; level <= 5; level++) {
    stats[`level${level}`] = messages.filter(
      (m) => m.spicyLevel === level
    ).length;
  }

  stats.contextAgnostic = messages.filter((m) => m.spicyLevel === null).length;
  stats.withUserName = messages.filter((m) => m.hasUserName).length;

  return stats;
}

export default messages;
