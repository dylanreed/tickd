// ABOUTME: Tick sayings for momentum builder warmup feature.
// ABOUTME: Messages for offers, streak progress, and completion.

export type SpicyLevel = 1 | 2 | 3 | 4 | 5

type MomentumContext = 'warmup_offer' | 'streak_progress' | 'warmup_complete'

interface MomentumMessage {
  context: MomentumContext
  spicyLevel: SpicyLevel
  messages: string[]
}

const MOMENTUM_MESSAGES: MomentumMessage[] = [
  // WARMUP OFFER
  { context: 'warmup_offer', spicyLevel: 1, messages: [
    "Want to warm up with some easy wins first?",
    "This one's big. Maybe start with something smaller?",
    "How about a few quick tasks to build momentum?",
    "Want to do some easy ones first to get going?",
    "Build some momentum first? Easy tasks?",
  ]},
  { context: 'warmup_offer', spicyLevel: 2, messages: [
    "That's a big task. Want to warm up first?",
    "Build some momentum with quick wins?",
    "Start with easy tasks, then tackle the beast?",
    "Warm up mode? Few quick ones first?",
    "Start small, then go big?",
  ]},
  { context: 'warmup_offer', spicyLevel: 3, messages: [
    "Stuck on the big one? Warm up with quick wins first.",
    "Maybe start with something you can actually finish first.",
    "Build some momentum. You need it.",
    "This task is too big to start cold. Warm up?",
    "The big task isn't going anywhere. Warm up?",
  ]},
  { context: 'warmup_offer', spicyLevel: 4, messages: [
    "STUCK? Warm up with QUICK WINS first!",
    "Build some MOMENTUM! Easy tasks GO!",
    "This one's HUGE! Start SMALL!",
    "WARM UP MODE! Quick wins to START!",
    "Start SMALL! Build UP! Then CRUSH IT!",
  ]},
  { context: 'warmup_offer', spicyLevel: 5, messages: [
    "STUCK?! WARM UP WITH QUICK WINS FIRST!!!",
    "BUILD SOME MOMENTUM!!! EASY TASKS!!! GO!!!",
    "THIS ONE'S HUGE!!! START SMALL!!!",
    "WARM UP MODE!!! QUICK WINS!!! NOW!!!",
    "START SMALL!!! BUILD UP!!! THEN DESTROY THAT TASK!!!",
  ]},

  // STREAK PROGRESS (uses [REMAINING] placeholder)
  { context: 'streak_progress', spicyLevel: 1, messages: [
    "Nice! One quick win done. [REMAINING] left in warmup.",
    "Progress! [REMAINING] more easy wins, then the big one.",
    "That's one! [REMAINING] more tiny tasks to go.",
    "One done! [REMAINING] left. Building that momentum.",
    "Quick win! [REMAINING] left before you're warmed up.",
  ]},
  { context: 'streak_progress', spicyLevel: 2, messages: [
    "Quick win done. [REMAINING] left.",
    "Progress. [REMAINING] more warmup tasks.",
    "That's one. [REMAINING] more.",
    "One done. [REMAINING] left in warmup.",
    "Momentum building. [REMAINING] more.",
  ]},
  { context: 'streak_progress', spicyLevel: 3, messages: [
    "Quick win done. [REMAINING] left. Keep it up.",
    "Progress. [REMAINING] more. Maybe this will work.",
    "That's one. [REMAINING] more. You're building.",
    "One done. [REMAINING] left. Momentum building.",
    "Quick win. [REMAINING] left. The system works.",
  ]},
  { context: 'streak_progress', spicyLevel: 4, messages: [
    "Quick win DONE! [REMAINING] LEFT!",
    "PROGRESS! [REMAINING] more WARMUP tasks!",
    "That's ONE! [REMAINING] MORE! BUILDING!",
    "One DONE! [REMAINING] left! KEEP GOING!",
    "QUICK WIN! [REMAINING] LEFT! YOU GOT THIS!",
  ]},
  { context: 'streak_progress', spicyLevel: 5, messages: [
    "QUICK WIN DONE!!! [REMAINING] LEFT!!!",
    "PROGRESS!!! [REMAINING] MORE WARMUP TASKS!!!",
    "THAT'S ONE!!! [REMAINING] MORE!!! BUILDING!!!",
    "ONE DONE!!! [REMAINING] LEFT!!! KEEP GOING!!!",
    "QUICK WIN!!! [REMAINING] LEFT!!! UNSTOPPABLE!!!",
  ]},

  // WARMUP COMPLETE
  { context: 'warmup_complete', spicyLevel: 1, messages: [
    "Warmed up! You've got momentum now. Ready for the big one?",
    "Quick wins complete! You're flowing. Time for the real task?",
    "Warmup done! How do you feel? Ready?",
    "Momentum built! The scary task doesn't look so scary now?",
    "All warmed up! The beast awaits. Ready?",
  ]},
  { context: 'warmup_complete', spicyLevel: 2, messages: [
    "Warmed up. Momentum built. Big task time.",
    "Quick wins done. You're ready. Go.",
    "Warmup complete. The real task awaits.",
    "Momentum achieved. Time for the beast.",
    "Momentum built. Time to face the big one.",
  ]},
  { context: 'warmup_complete', spicyLevel: 3, messages: [
    "Warmed up. Now do the actual task.",
    "Momentum built. No more excuses. Big task.",
    "Warmup complete. Time to face the real one.",
    "You're ready now. The beast. Go.",
    "Ready now. Time to tackle what you've been avoiding.",
  ]},
  { context: 'warmup_complete', spicyLevel: 4, messages: [
    "WARMED UP! Momentum BUILT! BIG TASK TIME!",
    "Quick wins DONE! You're READY! GO!",
    "WARMUP COMPLETE! The BEAST awaits!",
    "MOMENTUM achieved! Time for the REAL challenge!",
    "MOMENTUM BUILT! Time to CRUSH the big one!",
  ]},
  { context: 'warmup_complete', spicyLevel: 5, messages: [
    "WARMED UP!!! MOMENTUM BUILT!!! BIG TASK TIME!!!",
    "QUICK WINS DONE!!! YOU'RE READY!!! GO!!!",
    "WARMUP COMPLETE!!! THE BEAST AWAITS!!!",
    "MOMENTUM ACHIEVED!!! TIME FOR THE REAL CHALLENGE!!!",
    "MOMENTUM BUILT!!! CRUSH THE BIG ONE!!!",
  ]},
]

/**
 * Get a random message for a given context and spiciness level
 * For streak_progress, replace [REMAINING] with actual count
 */
export function getMomentumMessage(
  context: MomentumContext,
  spicyLevel: SpicyLevel,
  remaining?: number
): string {
  const entry = MOMENTUM_MESSAGES.find(
    m => m.context === context && m.spicyLevel === spicyLevel
  )
  if (!entry || entry.messages.length === 0) {
    return context === 'warmup_complete' ? "Ready for the big one!" : "Keep going!"
  }
  let message = entry.messages[Math.floor(Math.random() * entry.messages.length)]

  if (remaining !== undefined) {
    message = message.replace('[REMAINING]', String(remaining))
  }

  return message
}
