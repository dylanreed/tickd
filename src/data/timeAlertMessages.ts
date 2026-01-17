// ABOUTME: Tick sayings for time passing alerts and milestones.
// ABOUTME: Covers milestone intervals and estimate overages with 5 spiciness levels.

export type SpicyLevel = 1 | 2 | 3 | 4 | 5

type TimeAlertContext =
  | 'milestone_30min'
  | 'milestone_1hr'
  | 'milestone_2hr'
  | 'milestone_3hr'
  | 'estimate_1_5x'
  | 'estimate_2x'
  | 'estimate_3x'

interface TimeAlertMessage {
  context: TimeAlertContext
  spicyLevel: SpicyLevel
  messages: string[]
}

const TIME_ALERT_MESSAGES: TimeAlertMessage[] = [
  // 30 MINUTE MILESTONE
  { context: 'milestone_30min', spicyLevel: 1, messages: [
    "30 minutes have passed.",
    "Half an hour on this task.",
    "30 minute check-in.",
  ]},
  { context: 'milestone_30min', spicyLevel: 2, messages: [
    "Hey, 30 minutes in! How's it going?",
    "Half hour mark. Making progress?",
    "30 minutes! Taking a moment to notice.",
  ]},
  { context: 'milestone_30min', spicyLevel: 3, messages: [
    "Boop! 30 minutes. Time still exists, btw.",
    "Half hour! Just checking you didn't teleport.",
    "30 min update: Time has continued passing. Surprise!",
  ]},
  { context: 'milestone_30min', spicyLevel: 4, messages: [
    "DING! 30 minutes gone. Did you notice? Probably not.",
    "Half hour vanished! Poof! Like your sense of time!",
    "30 MINUTES. Your brain probably thought it was 10.",
  ]},
  { context: 'milestone_30min', spicyLevel: 5, messages: [
    "30 MINUTES ARE GONE FOREVER! DID YOU BLINK?!",
    "HALF HOUR ALERT! TIME IS SLIPPING AWAY! WHEEE!",
    "30 MIN! YOUR TIME BLINDNESS STRIKES AGAIN!",
  ]},

  // 1 HOUR MILESTONE
  { context: 'milestone_1hr', spicyLevel: 1, messages: [
    "One hour has passed.",
    "You've been at this for an hour.",
    "1 hour check-in.",
  ]},
  { context: 'milestone_1hr', spicyLevel: 2, messages: [
    "An hour already! Time for a quick stretch?",
    "1 hour milestone. How's the progress?",
    "One hour in! Remember to breathe.",
  ]},
  { context: 'milestone_1hr', spicyLevel: 3, messages: [
    "ONE HOUR. Time is weird, isn't it?",
    "An hour flew by! Or crawled. Who knows.",
    "1 hour! Your brain probably said '15 minutes.'",
  ]},
  { context: 'milestone_1hr', spicyLevel: 4, messages: [
    "ONE HOUR GONE! Did you feel it? Course not.",
    "60 MINUTES vanished into the void! Classic.",
    "AN HOUR! Your time perception is legally fictional!",
  ]},
  { context: 'milestone_1hr', spicyLevel: 5, messages: [
    "ONE WHOLE HOUR?! WHERE DID IT GO?! WHO TOOK IT?!",
    "60 MINUTES EVAPORATED! YOUR BRAIN LIES ABOUT TIME!",
    "AN HOUR?! IMPOSSIBLE! YOU JUST STARTED! (you didn't)",
  ]},

  // 2 HOUR MILESTONE
  { context: 'milestone_2hr', spicyLevel: 1, messages: [
    "Two hours have passed.",
    "2 hours on this task now.",
    "Two hour mark reached.",
  ]},
  { context: 'milestone_2hr', spicyLevel: 2, messages: [
    "2 hours! Maybe take a short break?",
    "Two hours in. Remember to hydrate!",
    "2 hour milestone. You're really committed!",
  ]},
  { context: 'milestone_2hr', spicyLevel: 3, messages: [
    "TWO HOURS! Do your legs still exist?",
    "2 hours! Time for a bathroom break? Just checking.",
    "Two whole hours! Your focus is either great or concerning.",
  ]},
  { context: 'milestone_2hr', spicyLevel: 4, messages: [
    "TWO HOURS?! Have you MOVED? Blinked? Eaten?",
    "120 MINUTES! That's a LOT of time your brain forgot!",
    "2 HOURS! Hyperfocus or time blindness? Who can tell!",
  ]},
  { context: 'milestone_2hr', spicyLevel: 5, messages: [
    "TWO HOURS VANISHED! ARE YOU A STATUE NOW?!",
    "120 MINUTES GONE! YOUR BODY NEEDS THINGS! WATER! MOVEMENT!",
    "2 WHOLE HOURS?! YOUR SENSE OF TIME IS IN ANOTHER DIMENSION!",
  ]},

  // 3+ HOUR MILESTONE
  { context: 'milestone_3hr', spicyLevel: 1, messages: [
    "Three hours now. Please take a break.",
    "3 hours. Consider stepping away briefly.",
    "Three hour milestone. Rest your eyes.",
  ]},
  { context: 'milestone_3hr', spicyLevel: 2, messages: [
    "3 hours! You really should take a break.",
    "Three hours. Your body is probably stiff. Stretch?",
    "3 hours in. Have you eaten? Had water?",
  ]},
  { context: 'milestone_3hr', spicyLevel: 3, messages: [
    "THREE HOURS! Are you okay? Do you need help?",
    "3 hours! This is either dedication or a cry for help.",
    "Three hours?! Your body has needs! FEED IT!",
  ]},
  { context: 'milestone_3hr', spicyLevel: 4, messages: [
    "THREE HOURS?! This is an INTERVENTION! Stand UP!",
    "180 MINUTES! Do your LEGS still WORK?!",
    "3 HOURS! I'm genuinely worried! TAKE A BREAK!",
  ]},
  { context: 'milestone_3hr', spicyLevel: 5, messages: [
    "THREE HOURS?! THIS IS A HOSTAGE SITUATION! MOVE!!!",
    "180 MINUTES! YOUR BODY IS FILING A COMPLAINT! STAND UP!",
    "3 HOURS?! YOU'VE ENTERED THE DANGER ZONE! BREAK NOW!",
  ]},

  // ESTIMATE 1.5x OVERAGE
  { context: 'estimate_1_5x', spicyLevel: 1, messages: [
    "You're at 1.5x your estimate now.",
    "Task is running 50% over estimate.",
    "Taking longer than planned.",
  ]},
  { context: 'estimate_1_5x', spicyLevel: 2, messages: [
    "50% over estimate! Still going?",
    "1.5x your predicted time. Classic time blindness!",
    "Running a bit over! That's okay, it happens.",
  ]},
  { context: 'estimate_1_5x', spicyLevel: 3, messages: [
    "50% over! Your brain's time math strikes again!",
    "1.5x estimate! The task was lying about its difficulty.",
    "Over estimate! Did you account for... everything?",
  ]},
  { context: 'estimate_1_5x', spicyLevel: 4, messages: [
    "50% OVER! Your estimate was OPTIMISTIC at best!",
    "1.5X! The task was more than you bargained for!",
    "RUNNING OVER! Your brain's clock is creative fiction!",
  ]},
  { context: 'estimate_1_5x', spicyLevel: 5, messages: [
    "50% OVER ESTIMATE! YOUR TIME MATH IS FICTIONAL!",
    "1.5X! THE TASK LIED ABOUT HOW LONG IT WOULD TAKE!",
    "OVER BUDGET! YOUR BRAIN'S CLOCK IS IN FANTASY LAND!",
  ]},

  // ESTIMATE 2x OVERAGE
  { context: 'estimate_2x', spicyLevel: 1, messages: [
    "You're at double your estimate.",
    "Task is taking twice as long as planned.",
    "2x the estimated time now.",
  ]},
  { context: 'estimate_2x', spicyLevel: 2, messages: [
    "Double time! The estimate was very optimistic.",
    "2x estimate! These things happen.",
    "Twice as long! Worth noting for next time.",
  ]},
  { context: 'estimate_2x', spicyLevel: 3, messages: [
    "DOUBLE TIME! Your estimate was a fever dream!",
    "2x! Either the task grew or your estimate shrunk!",
    "Twice as long! Classic time blindness casualty!",
  ]},
  { context: 'estimate_2x', spicyLevel: 4, messages: [
    "DOUBLE THE ESTIMATE! Your brain was DELUSIONAL!",
    "2X TIME! The planning fallacy strikes again!",
    "TWICE AS LONG! Did you forget half the task?!",
  ]},
  { context: 'estimate_2x', spicyLevel: 5, messages: [
    "DOUBLE TIME?! YOUR ESTIMATE WAS PURE FANTASY!",
    "2X OVER! YOUR BRAIN'S TIME PERCEPTION IS BROKEN!",
    "TWICE AS LONG! YOUR INTERNAL CLOCK IS A LIAR!",
  ]},

  // ESTIMATE 3x OVERAGE
  { context: 'estimate_3x', spicyLevel: 1, messages: [
    "You're at triple your estimate now.",
    "Task is taking 3x longer than planned.",
    "Significantly over original estimate.",
  ]},
  { context: 'estimate_3x', spicyLevel: 2, messages: [
    "Triple time! The estimate was very ambitious.",
    "3x over! Something definitely got underestimated.",
    "Three times longer! That's okay, you're learning.",
  ]},
  { context: 'estimate_3x', spicyLevel: 3, messages: [
    "TRIPLE TIME! Your estimate was a wish, not a plan!",
    "3x! Either scope creep or time blindness. Maybe both!",
    "Three times over! Your brain's math is WILD!",
  ]},
  { context: 'estimate_3x', spicyLevel: 4, messages: [
    "TRIPLE THE ESTIMATE?! Were you even on the same task?!",
    "3X OVER! Your planning needs a reality check!",
    "THREE TIMES LONGER! Your estimates are legally fiction!",
  ]},
  { context: 'estimate_3x', spicyLevel: 5, messages: [
    "TRIPLE TIME?! YOUR ESTIMATE WAS FROM ANOTHER DIMENSION!",
    "3X OVER! YOUR TIME PERCEPTION IS A CHAOTIC VOID!",
    "THREE TIMES?! YOUR BRAIN LIVES IN A DIFFERENT TIMELINE!",
  ]},
]

/**
 * Get a random message for a given time alert context and spiciness level
 */
export function getTimeAlertMessage(context: TimeAlertContext, spicyLevel: SpicyLevel): string {
  const entry = TIME_ALERT_MESSAGES.find(
    m => m.context === context && m.spicyLevel === spicyLevel
  )
  if (!entry || entry.messages.length === 0) {
    return "Time check!"
  }
  return entry.messages[Math.floor(Math.random() * entry.messages.length)]
}

/**
 * Get milestone context based on elapsed minutes
 */
export function getMilestoneContext(elapsedMinutes: number): TimeAlertContext | null {
  if (elapsedMinutes >= 180) return 'milestone_3hr'
  if (elapsedMinutes >= 120) return 'milestone_2hr'
  if (elapsedMinutes >= 60) return 'milestone_1hr'
  if (elapsedMinutes >= 30) return 'milestone_30min'
  return null
}

/**
 * Get estimate overage context based on ratio
 */
export function getEstimateOverageContext(ratio: number): TimeAlertContext | null {
  if (ratio >= 3) return 'estimate_3x'
  if (ratio >= 2) return 'estimate_2x'
  if (ratio >= 1.5) return 'estimate_1_5x'
  return null
}
