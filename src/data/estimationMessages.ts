// ABOUTME: Tick sayings for task time estimation feedback.
// ABOUTME: Covers over/under estimates with 5 spiciness levels.

import type { EstimateContext } from '../types/timeTools'

export type SpicyLevel = 1 | 2 | 3 | 4 | 5

interface EstimationMessage {
  context: EstimateContext
  spicyLevel: SpicyLevel
  messages: string[]
}

const ESTIMATION_MESSAGES: EstimationMessage[] = [
  // SPOT ON - Within 10% of estimate
  { context: 'spot_on', spicyLevel: 1, messages: [
    "Right on target. Well done.",
    "Good estimate. That's great.",
    "You nailed the timing.",
  ]},
  { context: 'spot_on', spicyLevel: 2, messages: [
    "Impressive! Your estimate was spot on.",
    "Look at you, knowing yourself!",
    "Nice work on that prediction.",
  ]},
  { context: 'spot_on', spicyLevel: 3, messages: [
    "Whoa, you actually guessed right?",
    "Your brain and reality agree for once!",
    "Did you... plan this? WHO ARE YOU?",
  ]},
  { context: 'spot_on', spicyLevel: 4, messages: [
    "WHAT. You were actually RIGHT?!",
    "I need to lie down. You predicted correctly.",
    "Is this... self-awareness? In THIS economy?",
  ]},
  { context: 'spot_on', spicyLevel: 5, messages: [
    "EXCUSE ME. You KNEW how long it would take?! Are you even ADHD?!",
    "IMPOSSIBLE. Your time perception worked. I'm calling the scientists.",
    "THE PROPHECY IS TRUE. You understood time. I'm scared.",
  ]},

  // UNDER - Finished faster than estimated
  { context: 'under', spicyLevel: 1, messages: [
    "You finished earlier than expected.",
    "Done ahead of schedule.",
    "Quicker than you thought!",
  ]},
  { context: 'under', spicyLevel: 2, messages: [
    "Finished with time to spare! Nice.",
    "Faster than expected. Good job!",
    "Under-promised, over-delivered!",
  ]},
  { context: 'under', spicyLevel: 3, messages: [
    "Speedy! Were you dreading this more than necessary?",
    "Done early! The anxiety was lying to you.",
    "Faster than you thought, huh? Classic overestimate.",
  ]},
  { context: 'under', spicyLevel: 4, messages: [
    "ZOOM! Either you're fast or you thought this was harder than it was.",
    "Early bird! Your dread was lying to you AGAIN.",
    "Finished quick! Maybe trust yourself next time? (no pressure)",
  ]},
  { context: 'under', spicyLevel: 5, messages: [
    "SPEED DEMON! Your estimate was more dramatic than necessary!",
    "Done in a FLASH! The task was NOT as scary as your brain said!",
    "EARLY?! Your anxiety had you thinking this was HARD!",
  ]},

  // WAY UNDER - 50%+ faster
  { context: 'way_under', spicyLevel: 1, messages: [
    "Much faster than expected.",
    "You really overestimated this one.",
    "Finished in half the time or less.",
  ]},
  { context: 'way_under', spicyLevel: 2, messages: [
    "Wow, way faster! Were you scared of this task?",
    "That was quick! Your estimate was very generous.",
    "Done in no time! Less scary than anticipated?",
  ]},
  { context: 'way_under', spicyLevel: 3, messages: [
    "ZOOM ZOOM! You thought this would take TWICE as long!",
    "Speed run! Your brain really oversold the difficulty here.",
    "Done in half the time! The task was not the boss level you imagined.",
  ]},
  { context: 'way_under', spicyLevel: 4, messages: [
    "LIGHTNING ROUND! Your brain thought this was HARD! IT WASN'T!",
    "Finished in RECORD TIME! Your anxiety is a DRAMA QUEEN!",
    "50% faster?! Your dread-to-reality ratio is BROKEN!",
  ]},
  { context: 'way_under', spicyLevel: 5, messages: [
    "YOU ABSOLUTE SPEED DEMON! Your brain said HOURS and it took MINUTES!",
    "THE TASK WAS A LIE! It wasn't hard AT ALL! YOUR ANXIETY PRANKED YOU!",
    "DONE IN A FLASH! Your estimate was PANIC, not PLANNING!",
  ]},

  // OVER 1.5x - Took 50% longer than estimated
  { context: 'over_1_5x', spicyLevel: 1, messages: [
    "This took a bit longer than expected.",
    "Slightly over your estimate.",
    "Added some extra time there.",
  ]},
  { context: 'over_1_5x', spicyLevel: 2, messages: [
    "A little over! Things happen.",
    "Took a bit longer, but you did it!",
    "Estimate was optimistic. It's okay.",
  ]},
  { context: 'over_1_5x', spicyLevel: 3, messages: [
    "Hmm, 50% over. Classic time blindness!",
    "A little optimistic there, friend.",
    "Time got away from you, huh? We've all been there.",
  ]},
  { context: 'over_1_5x', spicyLevel: 4, messages: [
    "Uh oh, ran over! Your brain's clock needs calibration!",
    "50% longer! Time is a slippery little fish, isn't it?",
    "Over estimate! Your internal clock is vibing, not timing!",
  ]},
  { context: 'over_1_5x', spicyLevel: 5, messages: [
    "TIME BLINDNESS STRIKES AGAIN! 50% over! Your brain's clock is CHAOS!",
    "UH OH! Optimistic much? Your estimate was a DREAM, not a PLAN!",
    "WHOOPS! Time played its little tricks on you AGAIN!",
  ]},

  // OVER 2x - Took double the estimated time
  { context: 'over_2x', spicyLevel: 1, messages: [
    "This took about twice as long as planned.",
    "The estimate was quite optimistic.",
    "Double the time. Something to note.",
  ]},
  { context: 'over_2x', spicyLevel: 2, messages: [
    "Took twice as long! These things happen.",
    "Double time! Underestimating is common.",
    "2x over. Worth remembering for next time.",
  ]},
  { context: 'over_2x', spicyLevel: 3, messages: [
    "DOUBLE TIME! Your brain really undersold this one.",
    "2x the estimate! Classic ADHD planning.",
    "Took twice as long! Your brain is an optimist and a liar.",
  ]},
  { context: 'over_2x', spicyLevel: 4, messages: [
    "DOUBLE THE TIME?! Your brain was DELUSIONAL about this task!",
    "2x OVER! Your internal calendar is in a different TIME ZONE!",
    "TWICE AS LONG! Your estimate was a FANTASY!",
  ]},
  { context: 'over_2x', spicyLevel: 5, messages: [
    "DOUBLE THE TIME?! YOUR BRAIN LIVES IN A FANTASY WORLD!",
    "2X OVER! YOUR ESTIMATE WAS A LIE YOUR BRAIN TOLD FOR FUN!",
    "TWICE AS LONG! YOUR TIME PERCEPTION IS LEGALLY FICTIONAL!",
  ]},

  // OVER 3x - Took triple or more
  { context: 'over_3x', spicyLevel: 1, messages: [
    "This took significantly longer than planned.",
    "The estimate was very optimistic.",
    "Much longer than expected. That happens sometimes.",
  ]},
  { context: 'over_3x', spicyLevel: 2, messages: [
    "Way over! The estimate was... ambitious.",
    "Triple time or more! That's okay, you finished.",
    "Very optimistic estimate. Live and learn!",
  ]},
  { context: 'over_3x', spicyLevel: 3, messages: [
    "TRIPLE TIME! Your brain was living in a FANTASY!",
    "3x+ over! Your estimate was more wish than prediction.",
    "So much longer! Your brain's time math needs HELP.",
  ]},
  { context: 'over_3x', spicyLevel: 4, messages: [
    "TRIPLE TIME OR MORE?! Your brain's clock is from another DIMENSION!",
    "3X OVER! Your estimate was FICTION! CREATIVE WRITING!",
    "WAY OVER! Your brain's sense of time is LEGALLY DRUNK!",
  ]},
  { context: 'over_3x', spicyLevel: 5, messages: [
    "3X OVER?! YOUR BRAIN'S TIME PERCEPTION IS A CHAOTIC VOID!",
    "TRIPLE TIME?! YOUR ESTIMATE WAS A FEVER DREAM! A HALLUCINATION!",
    "SO MUCH LONGER! YOUR INTERNAL CLOCK IS IN ANOTHER TIMELINE!",
  ]},

  // CALIBRATION POSITIVE - Pattern of improving accuracy
  { context: 'calibration_positive', spicyLevel: 1, messages: [
    "Your estimates are getting more accurate.",
    "Nice improvement in your time predictions.",
    "Your calibration is improving.",
  ]},
  { context: 'calibration_positive', spicyLevel: 2, messages: [
    "Your estimates are improving! Good trend.",
    "Getting better at predicting! Nice work.",
    "Your time sense is calibrating nicely.",
  ]},
  { context: 'calibration_positive', spicyLevel: 3, messages: [
    "Hey, you're getting better at this! Your estimates are improving!",
    "Calibration success! Your brain is learning time!",
    "Look at you, improving! Time blindness is slightly less blind!",
  ]},
  { context: 'calibration_positive', spicyLevel: 4, messages: [
    "IMPROVEMENT DETECTED! Your time sense is leveling UP!",
    "Your estimates are actually getting BETTER! WHO ARE YOU?!",
    "CALIBRATION SUCCESS! Your brain is learning! I'm so proud!",
  ]},
  { context: 'calibration_positive', spicyLevel: 5, messages: [
    "HOLD UP! YOUR ESTIMATES ARE IMPROVING?! WITCHCRAFT!",
    "YOUR TIME SENSE IS LEVELING UP! THIS IS CHARACTER DEVELOPMENT!",
    "CALIBRATION SUCCESS! YOU'RE ACTUALLY LEARNING! I'M CRYING!",
  ]},

  // CALIBRATION NEGATIVE - Pattern of consistent underestimating
  { context: 'calibration_negative', spicyLevel: 1, messages: [
    "You tend to underestimate how long things take.",
    "Consider adding a time buffer to your estimates.",
    "Your estimates are consistently optimistic.",
  ]},
  { context: 'calibration_negative', spicyLevel: 2, messages: [
    "Pattern noticed: you underestimate time. Try adding 50%.",
    "Your estimates run short. Maybe double them?",
    "Consistent underestimating. Your brain is optimistic!",
  ]},
  { context: 'calibration_negative', spicyLevel: 3, messages: [
    "So... you consistently underestimate. Maybe DOUBLE your guesses?",
    "Your time estimates are reliably wrong. Add a buffer, friend.",
    "Pattern detected: your brain lies about time. Consistently.",
  ]},
  { context: 'calibration_negative', spicyLevel: 4, messages: [
    "Your estimates are CONSISTENTLY wrong! Your brain is a TIME LIAR!",
    "Pattern: you ALWAYS underestimate! Try 2x your first guess!",
    "Your brain's time predictions are RELIABLY FICTIONAL!",
  ]},
  { context: 'calibration_negative', spicyLevel: 5, messages: [
    "YOU UNDERESTIMATE EVERY TIME! YOUR BRAIN IS A SERIAL TIME LIAR!",
    "CONSISTENT PATTERN OF TIME FICTION! DOUBLE YOUR ESTIMATES! ALWAYS!",
    "YOUR BRAIN'S TIME MATH IS CONSISTENTLY, RELIABLY, IMPRESSIVELY WRONG!",
  ]},
]

/**
 * Get a random message for a given estimation context and spiciness level
 */
export function getEstimationMessage(context: EstimateContext, spicyLevel: SpicyLevel): string {
  const entry = ESTIMATION_MESSAGES.find(
    m => m.context === context && m.spicyLevel === spicyLevel
  )
  if (!entry || entry.messages.length === 0) {
    return "Time is weird."
  }
  return entry.messages[Math.floor(Math.random() * entry.messages.length)]
}

/**
 * Determine the estimation context based on actual vs estimated time
 */
export function getEstimateContext(
  estimatedMinutes: number,
  actualMinutes: number
): EstimateContext {
  const ratio = actualMinutes / estimatedMinutes

  if (ratio <= 0.5) return 'way_under'
  if (ratio < 0.9) return 'under'
  if (ratio <= 1.1) return 'spot_on'
  if (ratio <= 1.5) return 'over_1_5x'
  if (ratio <= 2) return 'over_2x'
  return 'over_3x'
}

/**
 * Get all messages for a context (useful for testing)
 */
export function getMessagesForContext(context: EstimateContext): EstimationMessage[] {
  return ESTIMATION_MESSAGES.filter(m => m.context === context)
}
