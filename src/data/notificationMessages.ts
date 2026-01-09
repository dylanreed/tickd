// ABOUTME: Contains notification message templates for browser push and email notifications.
// ABOUTME: Messages organized by notification tier and theme (hinged/unhinged).

export type NotificationTier = '4_day' | '1_day' | 'day_of' | 'overdue'
export type Theme = 'hinged' | 'unhinged'

export interface BrowserPushContent {
  title: string
  body: string
}

interface MessageTemplate {
  title: string
  body: string
}

interface EmailTemplate {
  subject: string
  body: string
}

// Browser push notification templates organized by tier and theme
// {task} is the placeholder for task title interpolation
const browserPushTemplates: Record<NotificationTier, Record<Theme, MessageTemplate[]>> = {
  '4_day': {
    hinged: [
      { title: 'Tick: Upcoming Task', body: 'Your task "{task}" is due in 4 days. Just a friendly heads up.' },
      { title: 'Tick: Reminder', body: '"{task}" has 4 days remaining. Plenty of time if you start now.' },
      { title: 'Tick: Task Due Soon', body: 'A quick note: "{task}" is due in 4 days. Consider getting started.' },
    ],
    unhinged: [
      { title: 'TICK SAYS HI', body: 'HEY. "{task}" IS DUE IN 4 DAYS. JUST THOUGHT YOU SHOULD KNOW.' },
      { title: 'TICK IS WATCHING', body: '4 DAYS UNTIL "{task}" IS DUE. THE COUNTDOWN HAS BEGUN.' },
      { title: 'YOUR FRIENDLY REMINDER', body: '"{task}" IN 4 DAYS. I WILL NOT BE IGNORED.' },
    ],
  },
  '1_day': {
    hinged: [
      { title: 'Tick: Task Due Tomorrow', body: '"{task}" is due tomorrow. Time to make progress.' },
      { title: 'Tick: 1 Day Remaining', body: 'Just one day left for "{task}". You\'ve got this.' },
      { title: 'Tick: Final Day Approaching', body: '"{task}" is due in 1 day. Consider prioritizing this.' },
    ],
    unhinged: [
      { title: 'TICK EMERGENCY BROADCAST', body: 'ONE DAY. "{task}" IS DUE IN ONE DAY. THIS IS NOT A DRILL.' },
      { title: 'URGENT TICK ALERT', body: '24 HOURS UNTIL "{task}" DESTROYS YOUR PEACE OF MIND.' },
      { title: 'TICK IS CONCERNED', body: '"{task}" IS DUE TOMORROW AND I AM LOSING MY MIND ABOUT IT.' },
    ],
  },
  'day_of': {
    hinged: [
      { title: 'Tick: Due Today', body: '"{task}" is due today. Time to finish up.' },
      { title: 'Tick: Today\'s Deadline', body: 'Reminder: "{task}" should be completed today.' },
      { title: 'Tick: Final Hours', body: '"{task}" is due today. Let\'s wrap this up.' },
    ],
    unhinged: [
      { title: 'TICK SCREAMING', body: 'TODAY. "{task}" IS DUE TODAY. DO IT. DO IT NOW.' },
      { title: 'TICK MAXIMUM ALERT', body: '"{task}" DEADLINE IS TODAY. I REPEAT: TODAY.' },
      { title: 'TICK PANIC MODE', body: 'THE DAY HAS COME. "{task}" IS DUE. STOP READING THIS AND GO.' },
    ],
  },
  'overdue': {
    hinged: [
      { title: 'Tick: Task Overdue', body: '"{task}" is now past due. Let\'s address this when you can.' },
      { title: 'Tick: Past Deadline', body: 'Your task "{task}" has passed its due date. Time to catch up.' },
      { title: 'Tick: Overdue Notice', body: '"{task}" is overdue. Consider completing it soon.' },
    ],
    unhinged: [
      { title: 'TICK IS UNWELL', body: '"{task}" IS OVERDUE AND I AM NOT OKAY. ARE YOU OKAY? NO.' },
      { title: 'TICK MELTDOWN', body: 'OVERDUE. "{task}" IS OVERDUE. I HAVE BECOME CHAOS INCARNATE.' },
      { title: 'TICK EMERGENCY', body: '"{task}" PASSED ITS DEADLINE. I AM VIBRATING AT DANGEROUS FREQUENCIES.' },
    ],
  },
}

// Email templates organized by tier and theme
const emailTemplates: Record<NotificationTier, Record<Theme, EmailTemplate[]>> = {
  '4_day': {
    hinged: [
      { subject: 'Task Reminder: {task} due in 4 days', body: 'Hello,\n\nThis is a friendly reminder that your task "{task}" is due in 4 days.\n\nThere\'s still plenty of time, but starting early never hurts.\n\nBest,\nTick' },
      { subject: '{task} - 4 Days Remaining', body: 'Hi there,\n\nJust a heads up that "{task}" has 4 days until its deadline.\n\nMight be worth adding it to your schedule.\n\nRegards,\nTick' },
      { subject: 'Upcoming: {task} in 4 days', body: 'Hello,\n\nYour task "{task}" is coming up in 4 days.\n\nNo rush yet, but consider getting started when you have time.\n\nCheers,\nTick' },
    ],
    unhinged: [
      { subject: 'THE CLOCK IS TICKING: {task} in 4 DAYS', body: 'HELLO HUMAN,\n\n4 DAYS. YOU HAVE 4 DAYS UNTIL "{task}" IS DUE.\n\nI KNOW THAT SEEMS LIKE A LOT BUT TIME IS A CRUEL MISTRESS.\n\nTICKING MENACINGLY,\nTICK' },
      { subject: '{task} - THE COUNTDOWN BEGINS', body: 'ATTENTION,\n\n"{task}" HAS ENTERED THE 4-DAY ZONE.\n\nI WILL BE WATCHING. I AM ALWAYS WATCHING.\n\nFOREVER VIGILANT,\nTICK' },
      { subject: '4 DAYS UNTIL RECKONING: {task}', body: 'GREETINGS,\n\nTHE TASK "{task}" LOOMS ON THE HORIZON.\n\n4 DAYS MAY SEEM LIKE AN ETERNITY BUT I ASSURE YOU IT IS NOT.\n\nYOUR TEMPORAL OVERSEER,\nTICK' },
    ],
  },
  '1_day': {
    hinged: [
      { subject: 'Tomorrow: {task} is due', body: 'Hi,\n\nQuick reminder that "{task}" is due tomorrow.\n\nNow would be a good time to wrap things up if you haven\'t already.\n\nBest,\nTick' },
      { subject: '{task} - Due Tomorrow', body: 'Hello,\n\n"{task}" has only 1 day remaining until its deadline.\n\nLet\'s finish strong.\n\nRegards,\nTick' },
      { subject: 'Final Day Warning: {task}', body: 'Hi there,\n\nThis is your 1-day warning for "{task}".\n\nTime to prioritize this one.\n\nCheers,\nTick' },
    ],
    unhinged: [
      { subject: 'TOMORROW. {task}. TOMORROW.', body: 'OH HELLO,\n\nDID YOU KNOW TOMORROW EXISTS? BECAUSE "{task}" IS DUE THEN.\n\nONE DAY. 24 HOURS. 1440 MINUTES. I\'VE COUNTED.\n\nHYPERVENTILATING,\nTICK' },
      { subject: 'THE FINAL COUNTDOWN: {task}', body: 'ATTENTION PLEASE,\n\n"{task}" IS DUE IN EXACTLY ONE DAY.\n\nI AM NOT BEING DRAMATIC. THIS IS URGENT. THIS IS REAL.\n\nCONCERNED AND UNHINGED,\nTICK' },
      { subject: '{task} - 24 HOURS REMAIN', body: 'GREETINGS,\n\nTHE SUN WILL RISE AND SET ONCE MORE BEFORE "{task}" IS DUE.\n\nWHAT WILL YOU DO WITH THIS PRECIOUS TIME?\n\nJUDGING SILENTLY,\nTICK' },
    ],
  },
  'day_of': {
    hinged: [
      { subject: 'Due Today: {task}', body: 'Hi,\n\n"{task}" is due today.\n\nTime to cross this one off your list.\n\nBest,\nTick' },
      { subject: '{task} - Today\'s Deadline', body: 'Hello,\n\nThis is a reminder that today is the deadline for "{task}".\n\nLet\'s get it done.\n\nRegards,\nTick' },
      { subject: 'Today: Complete {task}', body: 'Hi there,\n\n"{task}" should be completed today.\n\nYou\'re in the home stretch.\n\nCheers,\nTick' },
    ],
    unhinged: [
      { subject: 'TODAY TODAY TODAY: {task}', body: 'IT\'S TODAY.\n\n"{task}" IS DUE TODAY.\n\nWHY ARE YOU READING THIS EMAIL? GO DO THE THING!\n\nSCREAMING INTO THE VOID,\nTICK' },
      { subject: '{task} - THE MOMENT HAS ARRIVED', body: 'THE DAY IS HERE.\n\n"{task}" AWAITS ITS COMPLETION.\n\nI BELIEVE IN YOU. MOSTLY. PROBABLY. JUST DO IT.\n\nON THE EDGE OF MY SEAT,\nTICK' },
      { subject: 'FINAL HOURS: {task}', body: 'HELLO,\n\nTHIS IS NOT A DRILL. "{task}" IS DUE TODAY.\n\nTHE CLOCK STRIKES AND I AM THE CLOCK. TICK TOCK.\n\nURGENTLY,\nTICK' },
    ],
  },
  'overdue': {
    hinged: [
      { subject: 'Overdue: {task}', body: 'Hi,\n\n"{task}" has passed its due date.\n\nWhen you get a chance, please complete this task.\n\nBest,\nTick' },
      { subject: '{task} - Past Due', body: 'Hello,\n\nThis is a notice that "{task}" is now overdue.\n\nLet\'s work on getting back on track.\n\nRegards,\nTick' },
      { subject: 'Past Deadline: {task}', body: 'Hi there,\n\n"{task}" has gone past its deadline.\n\nBetter late than never - let\'s finish it up.\n\nCheers,\nTick' },
    ],
    unhinged: [
      { subject: 'IT HAPPENED. {task} IS OVERDUE.', body: 'WELL.\n\nIT FINALLY HAPPENED. "{task}" IS OVERDUE.\n\nI WARNED YOU. I SENT EMAILS. I SCREAMED INTO PIXELS.\n\nDEVASTATED BUT NOT SURPRISED,\nTICK' },
      { subject: '{task} - PAST THE POINT OF NO RETURN', body: 'HELLO.\n\nTHE DEADLINE HAS COME AND GONE.\n\n"{task}" IS OVERDUE AND I AM PROCESSING MY EMOTIONS.\n\nSTARING INTO THE ABYSS,\nTICK' },
      { subject: 'OVERDUE EMERGENCY: {task}', body: 'ATTENTION,\n\n"{task}" IS OVERDUE.\n\nTHIS IS THE MOMENT I WAS BOTH DREADING AND EXPECTING.\n\nMAXIMUM CONCERN ACHIEVED,\nTICK' },
    ],
  },
}

/**
 * Interpolate task title into a message template
 */
function interpolate(template: string, taskTitle: string): string {
  return template.replace(/\{task\}/g, taskTitle)
}

/**
 * Get a random item from an array
 */
function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

/**
 * Get browser push notification content for a given tier, theme, and task
 */
export function getBrowserPushContent(
  tier: NotificationTier,
  theme: Theme,
  taskTitle: string
): BrowserPushContent {
  const templates = browserPushTemplates[tier][theme]
  const template = getRandomItem(templates)

  // For unhinged theme, uppercase the task title to match the ALL CAPS style
  const interpolatedTitle = theme === 'unhinged' ? taskTitle.toUpperCase() : taskTitle

  return {
    title: interpolate(template.title, interpolatedTitle),
    body: interpolate(template.body, interpolatedTitle),
  }
}

/**
 * Get email subject line for a given tier, theme, and task
 */
export function getEmailSubject(
  tier: NotificationTier,
  theme: Theme,
  taskTitle: string
): string {
  const templates = emailTemplates[tier][theme]
  const template = getRandomItem(templates)

  // For unhinged theme, uppercase the task title to match the ALL CAPS style
  const interpolatedTitle = theme === 'unhinged' ? taskTitle.toUpperCase() : taskTitle

  return interpolate(template.subject, interpolatedTitle)
}

/**
 * Get email body for a given tier, theme, and task
 */
export function getEmailBody(
  tier: NotificationTier,
  theme: Theme,
  taskTitle: string
): string {
  const templates = emailTemplates[tier][theme]
  const template = getRandomItem(templates)

  // For unhinged theme, uppercase the task title to match the ALL CAPS style
  const interpolatedTitle = theme === 'unhinged' ? taskTitle.toUpperCase() : taskTitle

  return interpolate(template.body, interpolatedTitle)
}

