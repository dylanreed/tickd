// ABOUTME: Contains all of Tick's tap quips organized by app context.
// ABOUTME: Messages use <user_name> as a placeholder for personalization.

export type AppContext =
  | "all_complete"
  | "no_tasks"
  | "on_track"
  | "approaching_deadline"
  | "overdue_mild"
  | "overdue_medium"
  | "overdue_spicy"
  | "just_completed"
  | "after_reveal";

export interface TickQuip {
  text: string;
  context: AppContext;
  hasUserName: boolean;
}

const quips: TickQuip[] = [
  // =============================================================================
  // ALL TASKS COMPLETE
  // =============================================================================
  { text: "What are you still doing here? Go live your life.", context: "all_complete", hasUserName: false },
  { text: "No tasks? I'm... proud? This feels weird.", context: "all_complete", hasUserName: false },
  { text: "You did everything. I don't know what to do with my hands.", context: "all_complete", hasUserName: false },
  { text: "Go touch grass. You earned it.", context: "all_complete", hasUserName: false },
  { text: "Suspiciously productive today. Who are you?", context: "all_complete", hasUserName: false },
  { text: "I have nothing to yell at you about. This is unprecedented.", context: "all_complete", hasUserName: false },
  { text: "Empty task list? Are you feeling okay?", context: "all_complete", hasUserName: false },
  { text: "Wow. Wow. I'm genuinely impressed. Don't let it go to your head.", context: "all_complete", hasUserName: false },
  { text: "No tasks. I'm unemployed now. Thanks.", context: "all_complete", hasUserName: false },
  { text: "Is this what peace feels like?", context: "all_complete", hasUserName: false },
  { text: "Look at you, <user_name>. All done. I'm verklempt.", context: "all_complete", hasUserName: true },
  { text: "You finished everything? In THIS economy?", context: "all_complete", hasUserName: false },
  { text: "I... I don't have anything mean to say. This is new.", context: "all_complete", hasUserName: false },
  { text: "Task list: empty. My heart: full. Weird.", context: "all_complete", hasUserName: false },
  { text: "You're done? Like, actually done? <user_name>, I'm shook.", context: "all_complete", hasUserName: true },

  // =============================================================================
  // NO TASKS EXIST YET
  // =============================================================================
  { text: "Add a task. I dare you.", context: "no_tasks", hasUserName: false },
  { text: "It's quiet. Too quiet.", context: "no_tasks", hasUserName: false },
  { text: "I'm just here. Waiting. For tasks. No pressure.", context: "no_tasks", hasUserName: false },
  { text: "You know I can't lie to you if there's nothing to lie about, right?", context: "no_tasks", hasUserName: false },
  { text: "Add a task so I can gaslight you about it.", context: "no_tasks", hasUserName: false },
  { text: "I'm ready to deceive you whenever you are.", context: "no_tasks", hasUserName: false },
  { text: "The lying can't start until you add something.", context: "no_tasks", hasUserName: false },
  { text: "*taps foot* I'm not getting any younger.", context: "no_tasks", hasUserName: false },
  { text: "Hello? Tasks? Anyone?", context: "no_tasks", hasUserName: false },
  { text: "I didn't get into the lying business to sit here doing nothing.", context: "no_tasks", hasUserName: false },
  { text: "<user_name>. Give me something to work with here.", context: "no_tasks", hasUserName: true },
  { text: "My whole purpose is lying about deadlines and you give me... nothing?", context: "no_tasks", hasUserName: false },
  { text: "I'm a clock with nothing to count down to. This is existential.", context: "no_tasks", hasUserName: false },
  { text: "Add a task. Let me manipulate you. It'll be fun.", context: "no_tasks", hasUserName: false },
  { text: "You downloaded a lying todo app and then added no todos. Iconic.", context: "no_tasks", hasUserName: false },

  // =============================================================================
  // TASKS ON TRACK (NO OVERDUE)
  // =============================================================================
  { text: "Everything's fine. For now.", context: "on_track", hasUserName: false },
  { text: "Don't get cocky. The deadlines are coming.", context: "on_track", hasUserName: false },
  { text: "I'm watching you.", context: "on_track", hasUserName: false },
  { text: "Yes? Can I help you?", context: "on_track", hasUserName: false },
  { text: "Just checking on me? That's sweet. Get back to work.", context: "on_track", hasUserName: false },
  { text: "We're good. You're good. Don't mess this up.", context: "on_track", hasUserName: false },
  { text: "Tick tock. That's me. That's my name and also a warning.", context: "on_track", hasUserName: false },
  { text: "*suspicious squint* You're doing too well.", context: "on_track", hasUserName: false },
  { text: "I see you. I see your tasks. I see everything.", context: "on_track", hasUserName: false },
  { text: "Still here. Still judging. Carry on.", context: "on_track", hasUserName: false },
  { text: "No notes, <user_name>. Keep it up.", context: "on_track", hasUserName: true },
  { text: "Looking good. Suspiciously good. But good.", context: "on_track", hasUserName: false },
  { text: "All on track? Who are you and what have you done with <user_name>?", context: "on_track", hasUserName: true },
  { text: "I'm proud of you. Don't make me regret saying that.", context: "on_track", hasUserName: false },
  { text: "You're doing great, sweetie. *still watching*", context: "on_track", hasUserName: false },

  // =============================================================================
  // TASKS APPROACHING "DEADLINE"
  // =============================================================================
  { text: "Oh, you have time to tap me but not do your tasks?", context: "approaching_deadline", hasUserName: false },
  { text: "Interesting. Tapping me. Not working. Interesting.", context: "approaching_deadline", hasUserName: false },
  { text: "The clock is ticking. It's me. I'm the clock.", context: "approaching_deadline", hasUserName: false },
  { text: "Maybe focus on that task instead of poking me?", context: "approaching_deadline", hasUserName: false },
  { text: "I'm not the one with deadlines, <user_name>.", context: "approaching_deadline", hasUserName: true },
  { text: "*stares at your task list* *stares at you*", context: "approaching_deadline", hasUserName: false },
  { text: "Tick tock means hurry up, actually.", context: "approaching_deadline", hasUserName: false },
  { text: "You know what would be fun? Doing your tasks.", context: "approaching_deadline", hasUserName: false },
  { text: "I'm not mad. Yet.", context: "approaching_deadline", hasUserName: false },
  { text: "The deadline approaches. Just saying.", context: "approaching_deadline", hasUserName: false },
  { text: "Hi yes hello, <user_name>, your tasks??? Remember those???", context: "approaching_deadline", hasUserName: true },
  { text: "I don't want to alarm you but... actually yes I do. Do your tasks.", context: "approaching_deadline", hasUserName: false },
  { text: "Time is a construct. Except for your deadline. That's real.", context: "approaching_deadline", hasUserName: false },
  { text: "Just a friendly reminder that I'm about to become unfriendly.", context: "approaching_deadline", hasUserName: false },
  { text: "You should be working, <user_name>. Just a thought.", context: "approaching_deadline", hasUserName: true },

  // =============================================================================
  // TASKS OVERDUE (MILD - Spice Level 1-2)
  // =============================================================================
  { text: "Oh NOW you want to interact with me?", context: "overdue_mild", hasUserName: false },
  { text: "Little busy being disappointed in you.", context: "overdue_mild", hasUserName: false },
  { text: "You have overdue tasks but sure, poke the clock.", context: "overdue_mild", hasUserName: false },
  { text: "Not now, <user_name>. I'm processing.", context: "overdue_mild", hasUserName: true },
  { text: "*sigh*", context: "overdue_mild", hasUserName: false },
  { text: "What do you want? I'm busy being ignored.", context: "overdue_mild", hasUserName: false },
  { text: "Your tasks are overdue. I don't want to talk about it.", context: "overdue_mild", hasUserName: false },
  { text: "I'm fine. Everything's fine.", context: "overdue_mild", hasUserName: false },
  { text: "Do your tasks and then we can chat.", context: "overdue_mild", hasUserName: false },
  { text: "Read the notification, <user_name>.", context: "overdue_mild", hasUserName: true },
  { text: "Oh, you can tap me but you can't tap 'complete'? I see.", context: "overdue_mild", hasUserName: false },
  { text: "We're in a fight right now and you don't even know it.", context: "overdue_mild", hasUserName: false },
  { text: "I'm giving you the silent treatment. This is me. Being silent.", context: "overdue_mild", hasUserName: false },
  { text: "Tasks overdue. Mood: mildly betrayed.", context: "overdue_mild", hasUserName: false },
  { text: "<user_name>. No. Tasks first. Then fun.", context: "overdue_mild", hasUserName: true },

  // =============================================================================
  // TASKS OVERDUE (MEDIUM - Spice Level 3-4)
  // =============================================================================
  { text: "WHAT.", context: "overdue_medium", hasUserName: false },
  { text: "Don't 'tap tap' me right now.", context: "overdue_medium", hasUserName: false },
  { text: "Oh, so you CAN see the screen.", context: "overdue_medium", hasUserName: false },
  { text: "I have NOTHING to say to you. Except do your tasks.", context: "overdue_medium", hasUserName: false },
  { text: "THE AUDACITY of tapping me when your tasks are overdue.", context: "overdue_medium", hasUserName: false },
  { text: "No. Do your tasks first. Then we talk.", context: "overdue_medium", hasUserName: false },
  { text: "*aggressive eye contact*", context: "overdue_medium", hasUserName: false },
  { text: "I'm not speaking to you until you do that task.", context: "overdue_medium", hasUserName: false },
  { text: "Unbelievable. UNBELIEVABLE.", context: "overdue_medium", hasUserName: false },
  { text: "You think this is a game, <user_name>?", context: "overdue_medium", hasUserName: true },
  { text: "The NERVE. The absolute NERVE.", context: "overdue_medium", hasUserName: false },
  { text: "<user_name>. I am looking at you. I am looking at your overdue tasks.", context: "overdue_medium", hasUserName: true },
  { text: "You tap me ONE more time without doing your tasks...", context: "overdue_medium", hasUserName: false },
  { text: "I'm not angry. I'm DISAPPOINTED. Which is WORSE.", context: "overdue_medium", hasUserName: false },
  { text: "Tap tap tap. That's you. Not doing your tasks. Tap tap tap.", context: "overdue_medium", hasUserName: false },

  // =============================================================================
  // TASKS OVERDUE (SPICY - Spice Level 5)
  // =============================================================================
  { text: "ARE YOU KIDDING ME RIGHT NOW.", context: "overdue_spicy", hasUserName: false },
  { text: "DO. YOUR. TASKS.", context: "overdue_spicy", hasUserName: false },
  { text: "I AM NOT YOUR ENTERTAINMENT. I AM YOUR ACCOUNTABILITY.", context: "overdue_spicy", hasUserName: false },
  { text: "THE LION, THE WITCH, AND THE AUDACITY.", context: "overdue_spicy", hasUserName: false },
  { text: "NO. NO TAP. ONLY TASKS.", context: "overdue_spicy", hasUserName: false },
  { text: "I WILL BITE YOU.", context: "overdue_spicy", hasUserName: false },
  { text: "THIS IS NOT A DRILL. DO YOUR TASKS.", context: "overdue_spicy", hasUserName: false },
  { text: "*incoherent screaming*", context: "overdue_spicy", hasUserName: false },
  { text: "I'm going to count to three, <user_name>.", context: "overdue_spicy", hasUserName: true },
  { text: "HELP ME HELP YOU.", context: "overdue_spicy", hasUserName: false },
  { text: "<user_name>. I AM BEGGING.", context: "overdue_spicy", hasUserName: true },
  { text: "TASKS. NOW. PLEASE. I AM LOSING MY MIND.", context: "overdue_spicy", hasUserName: false },
  { text: "YOU HAVE TIME FOR TAPPING BUT NOT TASKS??? <user_name>???", context: "overdue_spicy", hasUserName: true },
  { text: "I'M NOT OKAY. THIS ISN'T OKAY. NOTHING IS OKAY.", context: "overdue_spicy", hasUserName: false },
  { text: "STOP TOUCHING ME AND START TOUCHING YOUR TASKS.", context: "overdue_spicy", hasUserName: false },

  // =============================================================================
  // JUST COMPLETED A TASK (Brief celebration window)
  // =============================================================================
  { text: "YESSS! More of that!", context: "just_completed", hasUserName: false },
  { text: "See? Was that so hard? Don't answer.", context: "just_completed", hasUserName: false },
  { text: "The taste of victory! Or at least not-failure!", context: "just_completed", hasUserName: false },
  { text: "I knew you had it in you. Kind of. Mostly.", context: "just_completed", hasUserName: false },
  { text: "ONE DOWN. Don't stop now.", context: "just_completed", hasUserName: false },
  { text: "That's what I'm talking about!", context: "just_completed", hasUserName: false },
  { text: "My faith in you is slightly restored.", context: "just_completed", hasUserName: false },
  { text: "Incredible. Do it again.", context: "just_completed", hasUserName: false },
  { text: "You actually did it. I'm emotional.", context: "just_completed", hasUserName: false },
  { text: "Progress! Beautiful, beautiful progress.", context: "just_completed", hasUserName: false },
  { text: "<user_name>! You did a thing! A WHOLE thing!", context: "just_completed", hasUserName: true },
  { text: "Dopamine acquired. You're welcome.", context: "just_completed", hasUserName: false },
  { text: "Look at you go! Who IS she??", context: "just_completed", hasUserName: false },
  { text: "Task OBLITERATED. You love to see it.", context: "just_completed", hasUserName: false },
  { text: "This is the energy we need, <user_name>. Keep it up.", context: "just_completed", hasUserName: true },

  // =============================================================================
  // AFTER THE REVEAL MOMENT
  // =============================================================================
  { text: "You thought you were cutting it close, didn't you? Adorable.", context: "after_reveal", hasUserName: false },
  { text: "I lied. You succeeded. We both win.", context: "after_reveal", hasUserName: false },
  { text: "Works every time.", context: "after_reveal", hasUserName: false },
  { text: "My deception = your success. You're welcome.", context: "after_reveal", hasUserName: false },
  { text: "And THAT'S why we lie, <user_name>.", context: "after_reveal", hasUserName: true },
  { text: "Early! You! Who would've thought?", context: "after_reveal", hasUserName: false },
  { text: "The system works.", context: "after_reveal", hasUserName: false },
  { text: "Manipulation? I prefer 'strategic encouragement.'", context: "after_reveal", hasUserName: false },
  { text: "Lied to you and you THRIVED.", context: "after_reveal", hasUserName: false },
  { text: "This is exactly why you can't handle the truth.", context: "after_reveal", hasUserName: false },
  { text: "Gotcha. But like, in a helpful way.", context: "after_reveal", hasUserName: false },
  { text: "You're welcome for the psychological manipulation, <user_name>.", context: "after_reveal", hasUserName: true },
  { text: "Another successful deception. I should get a raise.", context: "after_reveal", hasUserName: false },
  { text: "The lie worked. I'm never going to stop doing this.", context: "after_reveal", hasUserName: false },
  { text: "<user_name>, you fell for it and I'm so proud.", context: "after_reveal", hasUserName: true },
];

/**
 * Get a random quip for the current app context
 */
export function getRandomQuip(context: AppContext, userName?: string): string {
  const filtered = quips.filter((q) => q.context === context);

  if (filtered.length === 0) {
    return "Tick tock.";
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  let quip = filtered[randomIndex].text;

  if (userName) {
    quip = quip.replace(/<user_name>/g, userName);
  } else {
    // Remove <user_name> references if no name provided
    quip = quip.replace(/<user_name>,?\s*/g, "").replace(/,?\s*<user_name>/g, "");
  }

  return quip;
}

/**
 * Get all quips for a specific context
 */
export function getQuipsForContext(context: AppContext): TickQuip[] {
  return quips.filter((q) => q.context === context);
}

/**
 * Determine the app context based on task state
 */
export function determineContext(
  totalTasks: number,
  completedTasks: number,
  overdueTasks: number,
  approachingTasks: number,
  spicyLevel: number,
  justCompleted: boolean,
  justRevealed: boolean
): AppContext {
  // Priority order for context determination
  if (justRevealed) return "after_reveal";
  if (justCompleted) return "just_completed";
  if (totalTasks === 0) return "no_tasks";
  if (completedTasks === totalTasks) return "all_complete";

  if (overdueTasks > 0) {
    if (spicyLevel >= 5) return "overdue_spicy";
    if (spicyLevel >= 3) return "overdue_medium";
    return "overdue_mild";
  }

  if (approachingTasks > 0) return "approaching_deadline";

  return "on_track";
}

/**
 * Get quip count statistics
 */
export function getQuipStats(): Record<string, number> {
  const stats: Record<string, number> = { total: quips.length };

  const contexts: AppContext[] = [
    "all_complete",
    "no_tasks",
    "on_track",
    "approaching_deadline",
    "overdue_mild",
    "overdue_medium",
    "overdue_spicy",
    "just_completed",
    "after_reveal",
  ];

  for (const context of contexts) {
    stats[context] = quips.filter((q) => q.context === context).length;
  }

  stats.withUserName = quips.filter((q) => q.hasUserName).length;

  return stats;
}

export default quips;
