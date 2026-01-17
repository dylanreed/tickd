// ABOUTME: Tick sayings for daily check-in brain state selection.
// ABOUTME: Messages for each brain state with 5 spiciness levels.

export type SpicyLevel = 1 | 2 | 3 | 4 | 5
import type { BrainState } from '../types/timeTools'

interface CheckinMessage {
  brainState: BrainState
  spicyLevel: SpicyLevel
  messages: string[]
}

const CHECKIN_MESSAGES: CheckinMessage[] = [
  // BRAIN STATE 1 - Very Low Energy
  { brainState: 1, spicyLevel: 1, messages: [
    "Low energy day. Let's keep it simple.",
    "Taking it easy today.",
    "A gentle day is valid.",
  ]},
  { brainState: 1, spicyLevel: 2, messages: [
    "Rough day, huh? We'll work with it.",
    "Brain fog mode activated. I get it.",
    "Some days are like this. That's okay.",
  ]},
  { brainState: 1, spicyLevel: 3, messages: [
    "Brain operating at potato-level. Noted!",
    "Today we achieve... one thing. Maybe.",
    "Existence is the goal today. Valid!",
  ]},
  { brainState: 1, spicyLevel: 4, messages: [
    "Brain.exe has crashed! Rebooting expectations...",
    "Today's energy: a deflated balloon. WORKING WITH IT!",
    "Zero bars of brain signal! Time to phone it in!",
  ]},
  { brainState: 1, spicyLevel: 5, messages: [
    "BRAIN WENT TO LUNCH! WITHOUT YOU! CHAOS MODE!",
    "TODAY'S ENERGY: ABSOLUTE DUMPSTER FIRE! EMBRACE IT!",
    "CONSCIOUSNESS IS OPTIONAL! SURVIVAL IS THE GOAL!",
  ]},

  // BRAIN STATE 2 - Low Energy
  { brainState: 2, spicyLevel: 1, messages: [
    "A slower day. We can work with that.",
    "Lower energy today. Adjusting expectations.",
    "Taking things at a gentler pace.",
  ]},
  { brainState: 2, spicyLevel: 2, messages: [
    "Running a bit low. Let's be strategic.",
    "Not peak performance, but we've got this.",
    "Energy's limited. Pick battles wisely.",
  ]},
  { brainState: 2, spicyLevel: 3, messages: [
    "Engine's sputtering but it runs! Barely!",
    "Brain at 40% power. It's something!",
    "Today's a 'pick your battles' kinda day!",
  ]},
  { brainState: 2, spicyLevel: 4, messages: [
    "Running on FUMES but STILL MOVING! Respect!",
    "Brain battery LOW! Plug in some caffeine!",
    "POWER SAVING MODE! Only essential functions!",
  ]},
  { brainState: 2, spicyLevel: 5, messages: [
    "BRAIN RUNNING ON EMERGENCY RESERVES! QUICK TASKS ONLY!",
    "LOW POWER MODE! LIKE A PHONE AT 5%! BUT ANGRIER!",
    "TODAY'S FUEL: PURE SPITE AND MAYBE COFFEE!",
  ]},

  // BRAIN STATE 3 - Moderate
  { brainState: 3, spicyLevel: 1, messages: [
    "Average energy today.",
    "A normal day. Good to go.",
    "Standard operating mode.",
  ]},
  { brainState: 3, spicyLevel: 2, messages: [
    "Decent energy! Let's make it count.",
    "Feeling okay? Okay is good enough.",
    "Middle of the road. Solid foundation.",
  ]},
  { brainState: 3, spicyLevel: 3, messages: [
    "Baseline chaos achieved! Standard operations!",
    "Brain is... present! That's something!",
    "50% power! Half a brain is still brain!",
  ]},
  { brainState: 3, spicyLevel: 4, messages: [
    "MEDIUM BRAIN POWER! Not bad, not great, JUST RIGHT!",
    "Solidly mediocre energy! PERFECTLY AVERAGE! LOVE IT!",
    "Brain status: FUNCTIONAL CHAOS! My favorite!",
  ]},
  { brainState: 3, spicyLevel: 5, messages: [
    "BASELINE CHAOS GOBLIN MODE! STANDARD ISSUE MAYHEM!",
    "BRAIN IS... BRAINING! AT REGULATION LEVELS! WEIRD!",
    "NORMAL ENERGY?! IN THIS ECONOMY?! SUSPICIOUS!",
  ]},

  // BRAIN STATE 4 - Good Energy
  { brainState: 4, spicyLevel: 1, messages: [
    "Good energy today.",
    "Feeling productive.",
    "A solid day ahead.",
  ]},
  { brainState: 4, spicyLevel: 2, messages: [
    "Feeling good! Let's capitalize on this.",
    "Nice energy today. Time to tackle things.",
    "Good day brewing. Make it count!",
  ]},
  { brainState: 4, spicyLevel: 3, messages: [
    "Brain is ONLINE! This is not a drill!",
    "Actually functional today?! Suspicious but useful!",
    "Good energy?! Quick, do hard things!",
  ]},
  { brainState: 4, spicyLevel: 4, messages: [
    "BRAIN IS COOPERATING?! USE IT BEFORE IT BETRAYS YOU!",
    "HIGH FUNCTION MODE! Quick, tackle the scary tasks!",
    "TODAY'S A GOOD BRAIN DAY! MAKE HAY WHILE THE SUN SHINES!",
  ]},
  { brainState: 4, spicyLevel: 5, messages: [
    "FUNCTIONAL HUMAN DETECTED! DEPLOY THE HARD TASKS!",
    "BRAIN IS FIRING?! THIS IS YOUR MOMENT! STRIKE NOW!",
    "GOOD ENERGY DAY! THE UNIVERSE DEMANDS PRODUCTIVITY!",
  ]},

  // BRAIN STATE 5 - High Energy
  { brainState: 5, spicyLevel: 1, messages: [
    "High energy today.",
    "Feeling very productive.",
    "Ready to tackle challenges.",
  ]},
  { brainState: 5, spicyLevel: 2, messages: [
    "Feeling energized! Big things today.",
    "Peak energy! Let's use it wisely.",
    "Great day! Time for ambitious tasks.",
  ]},
  { brainState: 5, spicyLevel: 3, messages: [
    "HYPERFOCUS IMMINENT! Channel it wisely!",
    "Maximum power! Don't waste it on email!",
    "Brain firing on all cylinders! This is RARE!",
  ]},
  { brainState: 5, spicyLevel: 4, messages: [
    "UNSTOPPABLE MODE ACTIVATED! The tasks TREMBLE!",
    "MAXIMUM BRAIN POWER! DO THE SCARY THING! NOW!",
    "PEAK PERFORMANCE! This won't last! MOVE MOVE MOVE!",
  ]},
  { brainState: 5, spicyLevel: 5, messages: [
    "CHAOS GOBLIN AT MAXIMUM POWER! UNLEASH THE PRODUCTIVITY!",
    "HYPERFOCUS DEMON SUMMONED! POINT IT AT YOUR TASKS!",
    "BRAIN GO BRRRRR! DESTROY YOUR TODO LIST! FEEL ALIVE!",
  ]},
]

// Greeting messages for opening the check-in
interface GreetingMessages {
  spicyLevel: SpicyLevel
  messages: string[]
}

const GREETING_MESSAGES: GreetingMessages[] = [
  { spicyLevel: 1, messages: [
    "How are you feeling today?",
    "Let's check in on your energy.",
    "How's your brain doing?",
  ]},
  { spicyLevel: 2, messages: [
    "Morning! How's the brain today?",
    "Quick check-in! How we doing?",
    "Hey! What's your energy like?",
  ]},
  { spicyLevel: 3, messages: [
    "BRAIN STATUS REPORT! How bad is it?",
    "Daily assessment! What are we working with?",
    "Time to rate your brain chaos level!",
  ]},
  { spicyLevel: 4, messages: [
    "BRAIN AUDIT TIME! Confess your energy levels!",
    "Daily brain interrogation! SPILL THE BEANS!",
    "Check-in o'clock! How functional are we?!",
  ]},
  { spicyLevel: 5, messages: [
    "BRAIN INSPECTION TIME! WHAT FRESH CHAOS TODAY?!",
    "DAILY CONSCIOUSNESS EVALUATION! RATE YOUR EXISTENCE!",
    "HOW MUCH BRAIN DO YOU HAVE TODAY?! BE HONEST!",
  ]},
]

/**
 * Get a greeting message for the check-in modal
 */
export function getCheckinGreeting(spicyLevel: SpicyLevel): string {
  const entry = GREETING_MESSAGES.find(g => g.spicyLevel === spicyLevel)
  if (!entry || entry.messages.length === 0) {
    return "How are you feeling today?"
  }
  return entry.messages[Math.floor(Math.random() * entry.messages.length)]
}

/**
 * Get a response message for a selected brain state
 */
export function getCheckinResponse(brainState: BrainState, spicyLevel: SpicyLevel): string {
  const entry = CHECKIN_MESSAGES.find(
    m => m.brainState === brainState && m.spicyLevel === spicyLevel
  )
  if (!entry || entry.messages.length === 0) {
    return "Got it!"
  }
  return entry.messages[Math.floor(Math.random() * entry.messages.length)]
}
