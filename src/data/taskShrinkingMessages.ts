// ABOUTME: Tick sayings and suggestions for task shrinking feature.
// ABOUTME: Messages for prompts and micro-step completions.

export type SpicyLevel = 1 | 2 | 3 | 4 | 5

type ShrinkingContext = 'initial_prompt' | 'micro_step_complete'

interface ShrinkingMessage {
  context: ShrinkingContext
  spicyLevel: SpicyLevel
  messages: string[]
}

const SHRINKING_MESSAGES: ShrinkingMessage[] = [
  // INITIAL PROMPT
  { context: 'initial_prompt', spicyLevel: 1, messages: [
    "This task feels big. What's the very first tiny step?",
    "Let's break this down. What's the smallest action to start?",
    "What's one tiny thing you could do to begin?",
    "Let's shrink this. What's the tiniest first step?",
    "One tiny step. That's all. What would it be?",
  ]},
  { context: 'initial_prompt', spicyLevel: 2, messages: [
    "Task too big? Shrink it. What's the first tiny action?",
    "What's the smallest step that counts as starting this?",
    "Break it down. What's the very first physical action?",
    "One micro-step. What is it?",
    "First physical action. Go. What is it?",
  ]},
  { context: 'initial_prompt', spicyLevel: 3, messages: [
    "The task is overwhelming you. What's the tiniest first step?",
    "You're frozen because it's too big. Shrink it. What's step one?",
    "Break it down. What's the smallest action? Be specific.",
    "You need to make this smaller. What's the first micro-action?",
    "Tell me the tiniest first step. We'll go from there.",
  ]},
  { context: 'initial_prompt', spicyLevel: 4, messages: [
    "Task too big? SHRINK IT! What's the TINY first step?!",
    "What's the SMALLEST action to start? Go!",
    "Break it DOWN! First physical action! What is it?!",
    "SHRINK TIME! What's the micro-step?!",
    "TINY FIRST STEP! Go! What is it?!",
  ]},
  { context: 'initial_prompt', spicyLevel: 5, messages: [
    "TASK TOO BIG?! SHRINK IT!!! WHAT'S THE TINY FIRST STEP?!",
    "WHAT'S THE SMALLEST ACTION TO START?! TELL ME!!!",
    "BREAK IT DOWN!!! FIRST PHYSICAL ACTION!!! NOW!!!",
    "SHRINK IT!!! WHAT'S THE MICRO-STEP?!!!",
    "TINY!!! FIRST!!! STEP!!! WHAT IS IT?!!!",
  ]},

  // MICRO STEP COMPLETE
  { context: 'micro_step_complete', spicyLevel: 1, messages: [
    "Done! That tiny step is complete. What's next, or do you have momentum?",
    "Micro-step finished! Another tiny step, or are you rolling now?",
    "Nice! That small thing is done. Next step?",
    "Step complete! Want another tiny one, or got momentum?",
    "Done! What's the next micro-step? Or are you flowing now?",
  ]},
  { context: 'micro_step_complete', spicyLevel: 2, messages: [
    "Micro-step done. Next tiny step, or got momentum?",
    "Step complete. What's the next small action?",
    "Done! Another micro-step, or are you rolling?",
    "One step finished. Continue shrinking or go bigger?",
    "Micro-step finished. Keep going?",
  ]},
  { context: 'micro_step_complete', spicyLevel: 3, messages: [
    "Micro-step done. See? Not so hard. Next one?",
    "Step complete. Progress. What's the next tiny action?",
    "Done! You actually did a thing. Another small step?",
    "One step finished. Maybe you can do this. Next?",
    "Micro-step finished. Not so scary now. More?",
  ]},
  { context: 'micro_step_complete', spicyLevel: 4, messages: [
    "MICRO-STEP DONE! Next tiny step or MOMENTUM ACHIEVED?!",
    "Step COMPLETE! What's NEXT?!",
    "DONE! Another micro-step or are you ROLLING?!",
    "One step FINISHED! Keep shrinking or GO BIG?!",
    "MICRO-STEP FINISHED! MOMENTUM!",
  ]},
  { context: 'micro_step_complete', spicyLevel: 5, messages: [
    "MICRO-STEP DONE!!! NEXT ONE OR MOMENTUM?!!!",
    "STEP COMPLETE!!! WHAT'S NEXT?!!!",
    "DONE!!! ANOTHER OR ARE YOU ROLLING?!!!",
    "ONE STEP FINISHED!!! KEEP GOING!!!",
    "MICRO-STEP FINISHED!!! UNSTOPPABLE!!!",
  ]},
]

// Keyword-based suggestions for micro-steps
export const microStepSuggestions: Record<string, string[]> = {
  write: ['Open document', 'Write one sentence', 'Write the header'],
  draft: ['Open document', 'Write one sentence', 'Write the header'],
  email: ['Open inbox', 'Find the thread', 'Type the first line'],
  reply: ['Open inbox', 'Find the thread', 'Type the first line'],
  call: ['Find the number', 'Open phone app', "Dial (don't call yet)"],
  phone: ['Find the number', 'Open phone app', "Dial (don't call yet)"],
  clean: ['Pick up one item', 'Clear one surface', 'Set 2-minute timer'],
  organize: ['Pick up one item', 'Clear one surface', 'Set 2-minute timer'],
  fix: ['Open the file', 'Read the error', 'Google one thing'],
  debug: ['Open the file', 'Read the error', 'Google one thing'],
  bug: ['Open the file', 'Read the error', 'Google one thing'],
  plan: ['Open notes', 'Write the question', 'List 3 options'],
  figure: ['Open notes', 'Write the question', 'List 3 options'],
  research: ['Open browser', 'Type one search query', 'Open first result'],
  study: ['Open materials', 'Read first paragraph', 'Write one note'],
  read: ['Open the document', 'Read first paragraph', 'Highlight one thing'],
  review: ['Open the file', 'Read first section', 'Note one thing'],
  prepare: ['Open what you need', 'Write the outline', 'Fill in first item'],
  create: ['Open the tool', 'Name it', 'Add first element'],
  build: ['Open the project', 'Find where to start', 'Write first line'],
  setup: ['Open settings', 'Find the option', 'Change one thing'],
  install: ['Find the download', 'Click download', 'Open installer'],
}

/**
 * Get suggested micro-steps based on task title keywords
 */
export function getSuggestedMicroSteps(taskTitle: string): string[] {
  const titleLower = taskTitle.toLowerCase()
  for (const [keyword, steps] of Object.entries(microStepSuggestions)) {
    if (titleLower.includes(keyword)) {
      return steps
    }
  }
  return ['Open what you need', 'Do one tiny thing', 'Write down the next action']
}

/**
 * Get a random message for a given context and spiciness level
 */
export function getShrinkingMessage(context: ShrinkingContext, spicyLevel: SpicyLevel): string {
  const entry = SHRINKING_MESSAGES.find(
    m => m.context === context && m.spicyLevel === spicyLevel
  )
  if (!entry || entry.messages.length === 0) {
    return "What's the first tiny step?"
  }
  return entry.messages[Math.floor(Math.random() * entry.messages.length)]
}
