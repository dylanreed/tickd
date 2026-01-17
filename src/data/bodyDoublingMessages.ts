// ABOUTME: Tick sayings for body doubling co-working sessions.
// ABOUTME: Messages for session start, encouragement, pause detection, and end.

export type SpicyLevel = 1 | 2 | 3 | 4 | 5

type BodyDoublingContext =
  | 'session_start'
  | 'encouragement'
  | 'pause_detected'
  | 'session_end'

interface BodyDoublingMessage {
  context: BodyDoublingContext
  spicyLevel: SpicyLevel
  messages: string[]
}

const BODY_DOUBLING_MESSAGES: BodyDoublingMessage[] = [
  // SESSION START
  { context: 'session_start', spicyLevel: 1, messages: [
    "Alright, I'm here. Let's do this together.",
    "Starting our session. I'll be right here with you.",
    "I'm here now. Let's work side by side.",
    "Session started. You're not alone. Let's go.",
    "I'm with you. Let's tackle this together.",
  ]},
  { context: 'session_start', spicyLevel: 2, messages: [
    "Session started. I'm here. Let's work.",
    "Alright, I'm watching. Let's get this done.",
    "Here we go. Working together. Focus time.",
    "I'm here. The accountability starts now.",
    "Here. Working. Together. Let's go.",
  ]},
  { context: 'session_start', spicyLevel: 3, messages: [
    "Alright, I'm here. Don't make me regret this.",
    "Session started. I'm watching. Make it count.",
    "I'm present now. Let's see some actual work.",
    "Session active. I'm your accountability. Don't waste it.",
    "I'm with you. Let's actually accomplish something.",
  ]},
  { context: 'session_start', spicyLevel: 4, messages: [
    "Session STARTED! I'm HERE! Let's DO this!",
    "Alright, I'm WATCHING! Time to WORK!",
    "HERE WE GO! Together! FOCUS TIME!",
    "I'M HERE! Accountability ENGAGED! Let's GO!",
    "Session BEGINNING! I SEE you! Let's CRUSH this!",
  ]},
  { context: 'session_start', spicyLevel: 5, messages: [
    "SESSION STARTED!!! I'M HERE!!! LET'S GOOOOO!!!",
    "ALRIGHT I'M WATCHING!!! TIME TO WORK!!!",
    "HERE WE GO!!! TOGETHER!!! FOCUS TIME!!!",
    "I'M HERE!!! ACCOUNTABILITY MODE!!! LET'S GO!!!",
    "SESSION BEGINNING!!! I SEE YOU!!! CRUSH IT!!!",
  ]},

  // DURING SESSION ENCOURAGEMENT
  { context: 'encouragement', spicyLevel: 1, messages: [
    "You're doing great. Keep going.",
    "Nice progress. I see you.",
    "Still here with you. You've got this.",
    "Looking good. Keep at it.",
    "You're working. That's what matters.",
  ]},
  { context: 'encouragement', spicyLevel: 2, messages: [
    "Still working. Good. Keep it up.",
    "Progress happening. I see you.",
    "You're doing it. Continue.",
    "Making moves. Keep going.",
    "Keep going. You're on track.",
  ]},
  { context: 'encouragement', spicyLevel: 3, messages: [
    "You're actually working. I'm pleasantly surprised.",
    "Progress detected. Keep it up.",
    "Still at it. Good. Don't stop.",
    "Work happening. This is what I like to see.",
    "Keep going. You're proving me wrong. Good.",
  ]},
  { context: 'encouragement', spicyLevel: 4, messages: [
    "You're DOING it! KEEP GOING!",
    "Progress HAPPENING! I SEE you!",
    "WORKING! Actually WORKING! NICE!",
    "Making MOVES! Don't STOP!",
    "Keep GOING! You're ON FIRE!",
  ]},
  { context: 'encouragement', spicyLevel: 5, messages: [
    "YOU'RE DOING IT!!! KEEP GOING!!!",
    "PROGRESS HAPPENING!!! I SEE YOU!!!",
    "WORKING!!! ACTUALLY WORKING!!! INCREDIBLE!!!",
    "MAKING MOVES!!! DON'T STOP!!!",
    "KEEP GOING!!! YOU'RE ON FIRE!!!",
  ]},

  // PAUSE DETECTED
  { context: 'pause_detected', spicyLevel: 1, messages: [
    "You paused. Need a break or got stuck?",
    "I noticed you stopped. Everything okay?",
    "Taking a breath? Or need help with something?",
    "Pause detected. Intentional or accidental?",
    "I noticed a pause. Need anything?",
  ]},
  { context: 'pause_detected', spicyLevel: 2, messages: [
    "You paused. Stuck or taking a break?",
    "I noticed you stopped. What's the situation?",
    "Pause detected. Break or distraction?",
    "You stopped. What happened?",
    "You paused. Checking in.",
  ]},
  { context: 'pause_detected', spicyLevel: 3, messages: [
    "You paused. Stuck or distracted?",
    "I noticed you stopped. Should I be concerned?",
    "Pause detected. Please tell me it's a break.",
    "You stopped. We were doing so well.",
    "You paused. I'm watching. What's going on?",
  ]},
  { context: 'pause_detected', spicyLevel: 4, messages: [
    "You PAUSED! Stuck or break?!",
    "I noticed you STOPPED! What HAPPENED?!",
    "PAUSE detected! Break or DISTRACTION?!",
    "You STOPPED! Is everything OKAY?!",
    "You PAUSED! Break or STUCK?!",
  ]},
  { context: 'pause_detected', spicyLevel: 5, messages: [
    "YOU PAUSED!!! STUCK OR BREAK?!!",
    "I NOTICED YOU STOPPED!!! WHAT HAPPENED?!!",
    "PAUSE DETECTED!!! TALK TO ME!!!",
    "YOU STOPPED!!! IS EVERYTHING OKAY?!!",
    "YOU PAUSED!!! I'M CONCERNED!!!",
  ]},

  // SESSION END
  { context: 'session_end', spicyLevel: 1, messages: [
    "Session complete. We did it together. Well done.",
    "Good session! You worked and I kept you company.",
    "Done! Nice work. You weren't alone this time.",
    "Session ended. You showed up. Proud of you.",
    "We did it. Good session. Rest up.",
  ]},
  { context: 'session_end', spicyLevel: 2, messages: [
    "Session complete. Good work. Progress made.",
    "Done. You worked. That's what matters.",
    "Session ended. Nice effort. Logged.",
    "Complete. You showed up and worked.",
    "Session complete. Accountability worked.",
  ]},
  { context: 'session_end', spicyLevel: 3, messages: [
    "Session complete. You actually worked. Impressed.",
    "Done. Accountability helped, I see.",
    "Session ended. You did better than expected.",
    "Complete. The presence helped. Noted.",
    "Good session. Do it again sometime.",
  ]},
  { context: 'session_end', spicyLevel: 4, messages: [
    "Session COMPLETE! We DID it!",
    "DONE! You WORKED! That was REAL!",
    "Session ENDED! Nice EFFORT!",
    "COMPLETE! You showed UP!",
    "COMPLETE! Session LOGGED! Well DONE!",
  ]},
  { context: 'session_end', spicyLevel: 5, messages: [
    "SESSION COMPLETE!!! WE DID IT!!!",
    "DONE!!! YOU WORKED!!! INCREDIBLE!!!",
    "SESSION ENDED!!! NICE EFFORT!!!",
    "COMPLETE!!! YOU SHOWED UP!!!",
    "COMPLETE!!! WELL DONE!!! REST UP!!!",
  ]},
]

/**
 * Get a random message for a given context and spiciness level
 */
export function getBodyDoublingMessage(context: BodyDoublingContext, spicyLevel: SpicyLevel): string {
  const entry = BODY_DOUBLING_MESSAGES.find(
    m => m.context === context && m.spicyLevel === spicyLevel
  )
  if (!entry || entry.messages.length === 0) {
    return "I'm here with you."
  }
  return entry.messages[Math.floor(Math.random() * entry.messages.length)]
}
