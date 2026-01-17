// ABOUTME: Tick sayings for transition help and startup rituals.
// ABOUTME: Messages for list prompts, ritual completion, countdown, and environment check.

export type SpicyLevel = 1 | 2 | 3 | 4 | 5

type TransitionContext =
  | 'stuck_on_list'
  | 'ritual_complete'
  | 'countdown'
  | 'environment_check_complete'

interface TransitionMessage {
  context: TransitionContext
  spicyLevel: SpicyLevel
  messages: string[]
}

const TRANSITION_MESSAGES: TransitionMessage[] = [
  // STUCK ON LIST
  { context: 'stuck_on_list', spicyLevel: 1, messages: [
    "You've been looking at the list for a while. Ready to pick one?",
    "Still browsing? Want help choosing something to start?",
    "I notice you're looking but not starting. Need a hand?",
    "Been on the list a bit. Ready to begin something?",
    "Still deciding? I can help you pick.",
  ]},
  { context: 'stuck_on_list', spicyLevel: 2, messages: [
    "Looking at the list won't complete the tasks.",
    "Still browsing? Time to pick and start.",
    "You've been here a while. Ready to begin?",
    "Still deciding? Just pick one.",
    "Looking complete. Doing time?",
  ]},
  { context: 'stuck_on_list', spicyLevel: 3, messages: [
    "You've been staring at the list. It's not going to do itself.",
    "Still browsing? The tasks aren't getting easier to look at.",
    "Viewing the list repeatedly won't complete it.",
    "Still deciding? Analysis paralysis isn't productive.",
    "Looking won't make them go away. Starting will.",
  ]},
  { context: 'stuck_on_list', spicyLevel: 4, messages: [
    "You've been LOOKING at the list! Time to DO something!",
    "Still browsing?! PICK ONE! START!",
    "The list won't DO itself! Go!",
    "Still deciding?! JUST PICK ONE!",
    "Looking WON'T help! DOING will!",
  ]},
  { context: 'stuck_on_list', spicyLevel: 5, messages: [
    "YOU'VE BEEN LOOKING AT THE LIST!!! DO SOMETHING!!!",
    "STILL BROWSING?!!! PICK ONE!!! START!!!",
    "THE LIST WON'T DO ITSELF!!! GO!!!",
    "STILL DECIDING?!!! JUST PICK!!! NOW!!!",
    "LOOKING WON'T HELP!!! DOING WILL!!! GO!!!",
  ]},

  // RITUAL COMPLETE
  { context: 'ritual_complete', spicyLevel: 1, messages: [
    "Ritual complete. You're ready. Let's work.",
    "All steps done. Environment set. Time to begin.",
    "Ritual finished. You've prepared well. Go time.",
    "Done! You're set up for success. Start when ready.",
    "Complete. You're set. Let's begin.",
  ]},
  { context: 'ritual_complete', spicyLevel: 2, messages: [
    "Ritual complete. No more prep. Work time.",
    "All steps done. You're ready. Go.",
    "Setup finished. Time to begin.",
    "Ritual complete. Transition made. Work.",
    "Done preparing. Time to do.",
  ]},
  { context: 'ritual_complete', spicyLevel: 3, messages: [
    "Ritual complete. No more stalling. Work.",
    "All steps done. You've run out of prep. Start.",
    "Setup finished. Time to actually work.",
    "Done. You're ready. No more excuses.",
    "Done preparing. Time to prove you can do things.",
  ]},
  { context: 'ritual_complete', spicyLevel: 4, messages: [
    "RITUAL COMPLETE! No more PREP! WORK TIME!",
    "All steps DONE! You're READY! GO!",
    "Setup FINISHED! Time to BEGIN!",
    "Ritual DONE! No excuses LEFT! GO!",
    "Done PREPARING! Time to DO!",
  ]},
  { context: 'ritual_complete', spicyLevel: 5, messages: [
    "RITUAL COMPLETE!!! NO MORE PREP!!! WORK TIME!!!",
    "ALL STEPS DONE!!! YOU'RE READY!!! GO!!!",
    "SETUP FINISHED!!! TIME TO BEGIN!!!",
    "RITUAL DONE!!! NO EXCUSES!!! GO!!!",
    "DONE PREPARING!!! TIME TO DO!!! NOW!!!",
  ]},

  // COUNTDOWN
  { context: 'countdown', spicyLevel: 1, messages: [
    "Starting in 5... 4... 3... 2... 1... Let's go.",
    "Work begins in 5... 4... 3... 2... 1... You've got this.",
    "Ready? 5... 4... 3... 2... 1... Begin.",
    "Here we go. 5... 4... 3... 2... 1... Start.",
    "Almost time. 5... 4... 3... 2... 1... Let's do this.",
  ]},
  { context: 'countdown', spicyLevel: 2, messages: [
    "Starting in 5... 4... 3... 2... 1... Go.",
    "Work mode. 5... 4... 3... 2... 1... Begin.",
    "Launch sequence. 5... 4... 3... 2... 1... Start.",
    "Countdown. 5... 4... 3... 2... 1... Now.",
    "Work begins. 5... 4... 3... 2... 1... Start.",
  ]},
  { context: 'countdown', spicyLevel: 3, messages: [
    "No more delays. 5... 4... 3... 2... 1... Go.",
    "Time to work. 5... 4... 3... 2... 1... Begin.",
    "Starting whether ready or not. 5... 4... 3... 2... 1... Now.",
    "Here we go. 5... 4... 3... 2... 1... Make it count.",
    "Go time. 5... 4... 3... 2... 1... Now.",
  ]},
  { context: 'countdown', spicyLevel: 4, messages: [
    "STARTING in 5... 4... 3... 2... 1... GO!",
    "WORK MODE! 5... 4... 3... 2... 1... BEGIN!",
    "LAUNCH SEQUENCE! 5... 4... 3... 2... 1... START!",
    "COUNTDOWN! 5... 4... 3... 2... 1... NOW!",
    "WORK BEGINS! 5... 4... 3... 2... 1... LET'S GOOO!",
  ]},
  { context: 'countdown', spicyLevel: 5, messages: [
    "STARTING IN 5... 4... 3... 2... 1... GOOOOO!!!",
    "WORK MODE!!! 5... 4... 3... 2... 1... BEGIN!!!",
    "LAUNCH SEQUENCE!!! 5... 4... 3... 2... 1... START!!!",
    "COUNTDOWN!!! 5... 4... 3... 2... 1... NOW!!!",
    "WORK BEGINS!!! 5... 4... 3... 2... 1... ATTACK!!!",
  ]},

  // ENVIRONMENT CHECK COMPLETE
  { context: 'environment_check_complete', spicyLevel: 1, messages: [
    "Environment ready. You're set up for success.",
    "All checked. You've got what you need. Begin?",
    "Environment optimized. Ready to focus.",
    "Ready! Everything in place. Let's go.",
    "Checked! You're prepared. Begin.",
  ]},
  { context: 'environment_check_complete', spicyLevel: 2, messages: [
    "Environment ready. No excuses. Begin.",
    "All checked. Setup complete. Work.",
    "Environment optimized. Time to focus.",
    "Ready. Everything in place. Execute.",
    "Checked. Prepared. Work.",
  ]},
  { context: 'environment_check_complete', spicyLevel: 3, messages: [
    "Environment ready. No more prep excuses.",
    "All checked. You can't blame the setup now.",
    "Environment optimized. Time to actually work.",
    "Ready. Everything's in place. Deliver.",
    "Checked. Prepared. No excuses. Go.",
  ]},
  { context: 'environment_check_complete', spicyLevel: 4, messages: [
    "ENVIRONMENT READY! No excuses! BEGIN!",
    "All CHECKED! Setup COMPLETE! WORK!",
    "Environment OPTIMIZED! Time to FOCUS!",
    "READY! Everything in PLACE! EXECUTE!",
    "CHECKED! PREPARED! WORK!",
  ]},
  { context: 'environment_check_complete', spicyLevel: 5, messages: [
    "ENVIRONMENT READY!!! NO EXCUSES!!! BEGIN!!!",
    "ALL CHECKED!!! SETUP COMPLETE!!! WORK!!!",
    "ENVIRONMENT OPTIMIZED!!! TIME TO FOCUS!!!",
    "READY!!! EVERYTHING IN PLACE!!! EXECUTE!!!",
    "CHECKED!!! PREPARED!!! NO EXCUSES!!! ATTACK!!!",
  ]},
]

/**
 * Get a random message for a given context and spiciness level
 */
export function getTransitionMessage(context: TransitionContext, spicyLevel: SpicyLevel): string {
  const entry = TRANSITION_MESSAGES.find(
    m => m.context === context && m.spicyLevel === spicyLevel
  )
  if (!entry || entry.messages.length === 0) {
    return "Ready to start?"
  }
  return entry.messages[Math.floor(Math.random() * entry.messages.length)]
}
