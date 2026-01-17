// ABOUTME: Tick sayings for "Just 5 Minutes" commitment feature.
// ABOUTME: Messages for starting, checkpoints, clean exits, and flow state.

export type SpicyLevel = 1 | 2 | 3 | 4 | 5

type FiveMinutesContext =
  | 'starting'
  | 'first_five_complete'
  | 'user_stops_at_five'
  | 'ten_min_soft_push'
  | 'fifteen_min_continuation'
  | 'flow_complete'

interface FiveMinutesMessage {
  context: FiveMinutesContext
  spicyLevel: SpicyLevel
  messages: string[]
}

const FIVE_MINUTES_MESSAGES: FiveMinutesMessage[] = [
  // STARTING
  { context: 'starting', spicyLevel: 1, messages: [
    "Just 5 minutes. That's all. You can do anything for 5 minutes.",
    "Let's start small. 5 minutes. I'll be right here.",
    "5 minutes. Not the whole task. Just 5 minutes.",
    "Ready for 5 minutes? That's all I'm asking.",
    "Just a tiny commitment. 5 minutes. You've got this.",
  ]},
  { context: 'starting', spicyLevel: 2, messages: [
    "5 minutes. That's it. Just start.",
    "Let's do 5 minutes. You can stop after, promise.",
    "5 minutes of work. Not negotiable. Very doable.",
    "Just 5 minutes. Clock starts now.",
    "5 minute challenge. Accept?",
  ]},
  { context: 'starting', spicyLevel: 3, messages: [
    "5 minutes. Surely you can manage 5 minutes.",
    "Just 5 minutes. I'm not asking for a miracle here.",
    "5 minutes. You've procrastinated longer than that already.",
    "Let's try 5 minutes. Prove me wrong about you.",
    "5 minutes of actual effort. That's all.",
  ]},
  { context: 'starting', spicyLevel: 4, messages: [
    "5 MINUTES! Just FIVE! You can do ANYTHING for 5 minutes!",
    "5 minutes! That's NOTHING! Start!",
    "JUST 5 MINUTES! The paralysis ends NOW!",
    "5 minutes of trying! That's IT! Go!",
    "Just 5 minutes! BREAK THE FREEZE!",
  ]},
  { context: 'starting', spicyLevel: 5, messages: [
    "5 MINUTES!!! FIVE!!! JUST START!!!",
    "5 MINUTES!!! THAT'S ALL!!! MOVE!!!",
    "JUST 5 MINUTES!!! THE FREEZE ENDS NOW!!!",
    "5 MINUTES!!! YOU'VE BEEN PARALYZED LONGER THAN THIS!!!",
    "JUST 5 MINUTES!!! I'M BEGGING!!!",
  ]},

  // FIRST 5 COMPLETE / CLEAN EXIT OFFERED
  { context: 'first_five_complete', spicyLevel: 1, messages: [
    "5 minutes done! You kept your promise. Stop or keep going?",
    "That's 5 minutes! You did it. What do you want to do now?",
    "5 minutes complete. You showed up. That matters.",
    "Done! 5 minutes of real effort. Proud of you.",
    "5 minutes! You can stop guilt-free or continue. Your choice.",
  ]},
  { context: 'first_five_complete', spicyLevel: 2, messages: [
    "5 minutes. Done. Promise kept. Stop or continue?",
    "That's 5 minutes! You can stop now. Or not. Up to you.",
    "5 minutes complete. Commitment honored.",
    "Done! 5 minutes logged. What's the call?",
    "5 minutes! Stop guilt-free or ride the momentum.",
  ]},
  { context: 'first_five_complete', spicyLevel: 3, messages: [
    "5 minutes. Done. You actually did it. I'm... impressed?",
    "That's 5 minutes! You kept your word. Genuinely surprised.",
    "5 minutes complete. You proved me slightly less wrong.",
    "Done! 5 minutes. See? You can do things.",
    "5 minutes! Stop or keep going. You've earned the choice.",
  ]},
  { context: 'first_five_complete', spicyLevel: 4, messages: [
    "5 MINUTES DONE! YOU DID IT! You actually DID IT!",
    "That's 5! PROMISE KEPT! Who ARE you?!",
    "5 minutes complete! THE FREEZE IS BROKEN!",
    "DONE! 5 minutes! You're FREE! Or keep going! CHOOSE!",
    "5 MINUTES! You showed UP! This is HUGE!",
  ]},
  { context: 'first_five_complete', spicyLevel: 5, messages: [
    "5 MINUTES DONE!!! YOU ACTUALLY DID IT!!!",
    "THAT'S 5!!! PROMISE KEPT!!! I'M SO PROUD!!!",
    "5 MINUTES COMPLETE!!! THE PARALYSIS IS DEFEATED!!!",
    "DONE!!! 5 MINUTES!!! YOU SHOWED UP!!!",
    "5 MINUTES!!! YOU BROKE THROUGH!!! INCREDIBLE!!!",
  ]},

  // USER STOPS AT 5
  { context: 'user_stops_at_five', spicyLevel: 1, messages: [
    "Stopping at 5? That's completely okay. You kept your promise.",
    "5 minutes was the deal. You did 5 minutes. Well done.",
    "That's a win. You started. You did 5. That's enough.",
    "Stopping here is valid. You honored your commitment.",
    "You said 5, you did 5. That's success.",
  ]},
  { context: 'user_stops_at_five', spicyLevel: 2, messages: [
    "Stopping at 5. Deal honored. No judgment.",
    "5 minutes was the agreement. You delivered. Rest up.",
    "That's a completed commitment. Well done.",
    "Stopping here. You did what you said. That's rare.",
    "5 minutes logged. Progress made. Good work.",
  ]},
  { context: 'user_stops_at_five', spicyLevel: 3, messages: [
    "Stopping at 5. Fine. A deal's a deal.",
    "5 minutes was the promise. You kept it. I respect that.",
    "Stopping here? Okay. You did do the 5 minutes.",
    "5 and done. That's... something. It's something.",
    "Deal fulfilled. 5 minutes. We'll do more next time.",
  ]},
  { context: 'user_stops_at_five', spicyLevel: 4, messages: [
    "Stopping at 5! VALID! You did the thing!",
    "5 and done! That's FINE! You STARTED!",
    "Stopping here? A deal's a deal! NO SHAME!",
    "5 minutes complete! Stopping is ALLOWED!",
    "Done at 5! You broke the freeze! VICTORY!",
  ]},
  { context: 'user_stops_at_five', spicyLevel: 5, messages: [
    "STOPPING AT 5!!! THAT'S A WIN!!! YOU DID IT!!!",
    "5 AND DONE!!! PROMISE KEPT!!! NO SHAME!!!",
    "STOPPING HERE!!! YOU STARTED!!! THAT'S EVERYTHING!!!",
    "5 MINUTES COMPLETE!!! YOU SHOWED UP!!!",
    "STOPPING AT 5!!! COMMITMENT HONORED!!! RESPECT!!!",
  ]},

  // 10 MIN SOFT PUSH
  { context: 'ten_min_soft_push', spicyLevel: 1, messages: [
    "10 minutes! You're still going. Want to keep at it?",
    "That's 10 minutes now. You're doing great. Continue?",
    "10 minutes in. How's it feeling? Keep going?",
    "You've passed 10 minutes. You're in it. Stay with it?",
    "10 minutes! Nice flow. Want to continue?",
  ]},
  { context: 'ten_min_soft_push', spicyLevel: 2, messages: [
    "10 minutes! You're in it now. Keep going?",
    "That's 10. Double your commitment. Continue?",
    "10 minutes in. Momentum is real. Ride it?",
    "You've hit 10 minutes. Want to keep the streak?",
    "10 minutes! Flow state loading. Keep at it?",
  ]},
  { context: 'ten_min_soft_push', spicyLevel: 3, messages: [
    "10 minutes. You're still here. I'm pleasantly surprised. Continue?",
    "That's 10. Double your promise. Maybe keep going?",
    "10 minutes in. Momentum exists. Don't waste it?",
    "You've hit 10. That's twice what you committed. More?",
    "10 minutes! See? You can do things. Keep going?",
  ]},
  { context: 'ten_min_soft_push', spicyLevel: 4, messages: [
    "10 MINUTES! You're STILL GOING! Keep it up?!",
    "That's 10! DOUBLE your promise! MORE?!",
    "10 minutes in! MOMENTUM IS REAL! Ride it!",
    "You've hit 10! WHY STOP NOW?!",
    "That's 10! Already working! KEEP THE ENERGY!",
  ]},
  { context: 'ten_min_soft_push', spicyLevel: 5, messages: [
    "10 MINUTES!!! YOU'RE CRUSHING IT!!! KEEP GOING!!!",
    "THAT'S 10!!! DOUBLE YOUR PROMISE!!! DON'T STOP NOW!!!",
    "10 MINUTES IN!!! MOMENTUM IS HAPPENING!!! RIDE IT!!!",
    "YOU'VE HIT 10!!! WHY WOULD YOU STOP?!!",
    "10 MINUTES!!! YOU'RE ACTUALLY DOING IT!!! MORE!!!",
  ]},

  // 15 MIN CONTINUATION
  { context: 'fifteen_min_continuation', spicyLevel: 1, messages: [
    "15 minutes! You started with 5. Look how far you've come.",
    "That's 15 now. You're doing beautifully. Still with me?",
    "15 minutes of work you almost didn't start. Proud of you.",
    "You've been going 15 minutes. Amazing progress.",
    "15 minutes! The paralysis is a distant memory. Nice work.",
  ]},
  { context: 'fifteen_min_continuation', spicyLevel: 2, messages: [
    "15 minutes. You said 5. Look at you now.",
    "That's 15. Triple your commitment. Solid work.",
    "15 minutes of work you almost avoided. Progress.",
    "You've been at it 15 minutes. Momentum achieved.",
    "15 minutes! From paralysis to productivity. Nice.",
  ]},
  { context: 'fifteen_min_continuation', spicyLevel: 3, messages: [
    "15 minutes. You actually kept going. I'm impressed.",
    "That's 15. Triple your promise. Who are you?",
    "15 minutes of work. From you. Shocking. (Good shocking.)",
    "You've been going 15 minutes. I didn't expect this.",
    "15 minutes! You said 5 and delivered 15. Respect.",
  ]},
  { context: 'fifteen_min_continuation', spicyLevel: 4, messages: [
    "15 MINUTES! You said FIVE! LOOK AT YOU!",
    "That's 15! TRIPLE commitment! WHO IS THIS?!",
    "15 minutes of ACTUAL WORK! FROM YOU!",
    "You've been going 15! MOMENTUM ACHIEVED!",
    "15 MINUTES! I'm literally EMOTIONAL!",
  ]},
  { context: 'fifteen_min_continuation', spicyLevel: 5, messages: [
    "15 MINUTES!!! YOU SAID 5!!! THIS IS INCREDIBLE!!!",
    "THAT'S 15!!! TRIPLE YOUR COMMITMENT!!! LEGEND!!!",
    "15 MINUTES OF WORK!!! ACTUAL WORK!!! FROM YOU!!!",
    "YOU'VE BEEN GOING 15!!! UNSTOPPABLE!!!",
    "15 MINUTES!!! YOU STARTED WITH 5!!! HERO!!!",
  ]},

  // FLOW STATE / FINAL COMPLETION
  { context: 'flow_complete', spicyLevel: 1, messages: [
    "You started with 5 minutes. You finished the whole thing. Incredible.",
    "From 'just 5 minutes' to complete. Look what you did.",
    "Done! All from a tiny 5-minute commitment. So proud.",
    "You almost didn't start. Now you're finished. Amazing.",
    "From frozen to finished. All because you tried 5 minutes.",
  ]},
  { context: 'flow_complete', spicyLevel: 2, messages: [
    "Started with 5 minutes. Finished the whole task. That's how it works.",
    "Done! From 'just 5' to complete. The system works.",
    "You almost didn't start. Now it's done. Remember this.",
    "Complete! 5 minutes broke the freeze. The rest was momentum.",
    "Finished! The 5 minute trick works. Use it again.",
  ]},
  { context: 'flow_complete', spicyLevel: 3, messages: [
    "You started with 5 minutes. You finished everything. I'm... proud.",
    "Done! From paralysis to completion. Maybe you can do things.",
    "You almost didn't start. Now you're done. Let that sink in.",
    "Complete! 5 minutes broke the freeze. Remember this next time.",
    "Finished! See what happens when you just start?",
  ]},
  { context: 'flow_complete', spicyLevel: 4, messages: [
    "You started with 5 MINUTES! You finished EVERYTHING! INCREDIBLE!",
    "DONE! From 'just 5' to COMPLETE! THE SYSTEM WORKS!",
    "You almost didn't START! Now you're FINISHED!",
    "COMPLETE! 5 minutes broke the freeze! LOOK AT YOU!",
    "Task DONE! All from a tiny commitment! WOW!",
  ]},
  { context: 'flow_complete', spicyLevel: 5, messages: [
    "YOU STARTED WITH 5 MINUTES!!! YOU FINISHED EVERYTHING!!!",
    "DONE!!! FROM 'JUST 5' TO COMPLETE!!! LEGENDARY!!!",
    "YOU ALMOST DIDN'T START!!! NOW YOU'RE FINISHED!!! HERO!!!",
    "COMPLETE!!! 5 MINUTES BROKE THE FREEZE!!! VICTORY!!!",
    "TASK DONE!!! ALL FROM 5 MINUTES!!! INCREDIBLE!!!",
  ]},
]

/**
 * Get a random message for a given context and spiciness level
 */
export function getFiveMinutesMessage(context: FiveMinutesContext, spicyLevel: SpicyLevel): string {
  const entry = FIVE_MINUTES_MESSAGES.find(
    m => m.context === context && m.spicyLevel === spicyLevel
  )
  if (!entry || entry.messages.length === 0) {
    return "5 minutes. Let's go."
  }
  return entry.messages[Math.floor(Math.random() * entry.messages.length)]
}
