// ABOUTME: HTML email templates for Tick reminder notifications.
// ABOUTME: Styled with "Detention Slip" aesthetic - principal's office meets ransom note.

interface EmailTemplateParams {
  taskTitle: string
  message: string
  tier: '4_day' | '1_day' | 'day_of' | 'overdue'
  theme: 'hinged' | 'unhinged'
}

/**
 * Pool of passive-aggressive HR-style messages for each tier.
 * Randomly selected to keep repeat emails feeling fresh.
 */
const unhingedMessagePool = {
  '4_day': [
    "Per my previous reminder, this task exists.",
    "Just circling back on this deadline.",
    "This is the friendly version of this reminder.",
    "Putting this on your radar, as they say.",
    "Friendly heads up. Note the word 'friendly.' That may change.",
    "This deadline is approaching. Thought you should know.",
    "Four days seems like a lot. It isn't.",
    "Consider this your early warning system activating.",
    "You have time. Not a lot, but some. Use it wisely.",
    "Just flagging this for your awareness.",
    "A gentle nudge. The nudges will get less gentle.",
    "This is your courtesy notice. Courtesy expires in 4 days.",
    "Adding this to your plate. It was already on your plate. But still.",
    "Future you is going to wish present you had started this.",
    "The clock is ticking. That's not a metaphor. I am literally a clock.",
  ],
  '1_day': [
    "Gentle reminder: Tomorrow is a real day that will actually happen.",
    "Your deadline is tomorrow. Please plan accordingly. Or don't.",
    "This task won't complete itself. We checked.",
    "Tomorrow. As in, after you sleep. Assuming you sleep.",
    "One day remains. Make it count. Or don't. Your call.",
    "The future is almost here. Specifically, tomorrow.",
    "You've had time. Now you have less time. Much less.",
    "Just checking if you saw my last reminder. And the one before that.",
    "Due tomorrow. That's not a suggestion.",
    "Sleep well tonight knowing this exists.",
    "This is your one-day warning. There is no half-day warning.",
    "Tomorrow is coming whether you're ready or not.",
    "Circling back more aggressively now.",
    "Per my last email, and the one before that...",
    "Your deadline doesn't care about your schedule.",
  ],
  'day_of': [
    "Due today. No, really. Today today.",
    "Your task is due today. We both know you saw this coming.",
    "This is happening. Right now. Today.",
    "The day has arrived. The day you've been ignoring.",
    "It's today. You know what that means.",
    "No more tomorrows. Just today. Just this.",
    "Your deadline is now. Not 'now-ish.' Now.",
    "Today's the day. Surprise! (It's not a surprise. I told you.)",
    "The deadline is today and my patience has a deadline too.",
    "Due today. Deep breaths. You've got this. Probably.",
    "Remember this task? It remembers you. It's due today.",
    "Today. The day we talked about. It's here.",
    "Your 'I'll do it later' has officially run out of later.",
    "Due date: Today. Your move.",
    "The deadline you've been avoiding is no longer avoidable.",
  ],
  'overdue': [
    "This task is now overdue. We'll need to schedule a meeting.",
    "Your deadline has passed. HR has been notified. (HR is also me.)",
    "Overdue. This will be noted in your file.",
    "The deadline was yesterday. Or before. I've lost track.",
    "Past due. Way past due. Impressively past due, actually.",
    "You missed it. The deadline. It's gone now.",
    "This task is overdue and honestly, I'm disappointed.",
    "Overdue. But you knew that. You've known for a while.",
    "The deadline has come and gone. The task has not.",
    "Your deadline didn't just pass. It left without saying goodbye.",
    "Overdue. Let's not make this a pattern.",
    "The deadline was not a suggestion. It was a deadline.",
    "Still waiting. Still overdue. Still here.",
    "This task is overdue. I'm not mad. I'm just disappointed.",
    "Past due. Please advise on your plan to address this situation.",
  ],
}

const hingedMessagePool = {
  '4_day': [
    "This task is due in 4 days.",
    "Friendly reminder about your upcoming deadline.",
    "Just a heads up - this is due soon.",
    "Your deadline is approaching.",
    "4 days remaining on this task.",
    "Reminder: This task is coming up.",
    "Wanted to remind you about this deadline.",
    "This is due in a few days.",
    "Quick reminder about this task.",
    "Your due date is in 4 days.",
    "Keeping this on your radar.",
    "This deadline is coming up soon.",
    "A reminder about your upcoming task.",
    "4 days until this is due.",
    "This will be due before you know it.",
  ],
  '1_day': [
    "This task is due tomorrow.",
    "Reminder: Due date is tomorrow.",
    "Tomorrow is the deadline.",
    "Just one day left on this task.",
    "Your task is due tomorrow.",
    "Due tomorrow - wanted to make sure you saw this.",
    "The deadline is tomorrow.",
    "One day remaining.",
    "This is due tomorrow.",
    "Tomorrow's the day - your task is due.",
    "Friendly reminder: Due tomorrow.",
    "Your deadline is tomorrow.",
    "Due date: Tomorrow.",
    "This task needs to be done by tomorrow.",
    "One day until your deadline.",
  ],
  'day_of': [
    "This task is due today.",
    "Today is the deadline.",
    "Your task is due today.",
    "Due today.",
    "Today's the day - this task is due.",
    "Reminder: This is due today.",
    "Your deadline is today.",
    "This needs to be completed today.",
    "Due date is today.",
    "Today is your deadline.",
    "This task should be finished today.",
    "Your task is due by end of day.",
    "Due today - don't forget!",
    "Today's deadline reminder.",
    "This is due today.",
  ],
  'overdue': [
    "This task is now overdue.",
    "Your deadline has passed.",
    "This task is past due.",
    "Overdue task reminder.",
    "This deadline has passed.",
    "Your task is overdue.",
    "Past the due date.",
    "This task needs attention - it's overdue.",
    "Overdue reminder.",
    "This was due previously.",
    "Your task is past due.",
    "Deadline passed - this is overdue.",
    "This task is still pending and overdue.",
    "Overdue task.",
    "This deadline was missed.",
  ],
}

/**
 * Returns a random message from the pool for the given tier and theme.
 */
function getRandomPoolMessage(tier: '4_day' | '1_day' | 'day_of' | 'overdue', theme: 'hinged' | 'unhinged'): string {
  const pool = theme === 'unhinged' ? unhingedMessagePool[tier] : hingedMessagePool[tier]
  return pool[Math.floor(Math.random() * pool.length)]
}

/**
 * Generates HTML email for task reminders.
 * Uses table-based layout for email client compatibility.
 */
export function generateReminderEmail(params: EmailTemplateParams): string {
  const { taskTitle, tier, theme } = params

  const isUnhinged = theme === 'unhinged'

  // Get a random message from the pool for this tier/theme
  const bodyMessage = getRandomPoolMessage(tier, theme)

  // Stamp text based on tier
  const stampText = {
    '4_day': isUnhinged ? 'FAIR WARNING' : 'Reminder',
    '1_day': isUnhinged ? 'TOMORROW.' : 'Due Tomorrow',
    'day_of': isUnhinged ? 'TODAY. NOW.' : 'Due Today',
    'overdue': isUnhinged ? 'YOU BLEW IT' : 'Overdue',
  }[tier]

  // Stamp color - more aggressive for urgent tiers
  const stampColor = tier === 'overdue' || tier === 'day_of' ? '#c41e3a' : '#8b7355'

  // Subject line for unhinged mode gets extra flair
  const headerText = isUnhinged ? 'MEMO FROM TICK' : 'Reminder from Tick'

  // The passive-aggressive sign-off
  const signOff = isUnhinged
    ? getUnhingedSignOff(tier)
    : 'Best,\nTick'

  const footerNote = isUnhinged
    ? getUnhingedFooter(tier)
    : 'You can manage your notification preferences in the app.'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headerText}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #e8e4dc; font-family: Georgia, 'Times New Roman', serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e8e4dc;">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Main Container - Manila Folder Look -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; background-color: #f5f0e6; border: 1px solid #d4cfc4; box-shadow: 2px 2px 8px rgba(0,0,0,0.1);">

          <!-- Red Top Bar -->
          <tr>
            <td style="background-color: #c41e3a; height: 4px;"></td>
          </tr>

          <!-- Stamp Area -->
          <tr>
            <td align="right" style="padding: 20px 30px 0 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 14px;
                    font-weight: bold;
                    color: ${stampColor};
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    border: 3px solid ${stampColor};
                    padding: 8px 16px;
                    transform: rotate(-3deg);
                    display: inline-block;
                  ">
                    ${stampText}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Memo Header -->
          <tr>
            <td style="padding: 20px 30px 10px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #5a5a5a;">
                <tr>
                  <td style="padding-bottom: 4px;">
                    <strong>TO:</strong>&nbsp;&nbsp;&nbsp;You (yes, you)
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 4px;">
                    <strong>FROM:</strong>&nbsp;Tick
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 4px;">
                    <strong>RE:</strong>&nbsp;&nbsp;&nbsp;<span style="text-decoration: underline; color: #c41e3a;">${escapeHtml(taskTitle)}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>DATE:</strong>&nbsp;${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider Line -->
          <tr>
            <td style="padding: 0 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="border-bottom: 2px solid #1a1a1a;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Message -->
          <tr>
            <td style="padding: 25px 30px; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 1.6; color: #1a1a1a;">
              ${escapeHtml(bodyMessage)}
            </td>
          </tr>

          <!-- Checkbox (already checked) -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family: 'Courier New', Courier, monospace; font-size: 14px; color: #1a1a1a;">
                    <span style="display: inline-block; width: 18px; height: 18px; border: 2px solid #1a1a1a; text-align: center; line-height: 16px; margin-right: 8px; font-weight: bold; color: #c41e3a;">✓</span>
                    ${isUnhinged ? 'I acknowledge this is my fault' : 'Mark as complete when done'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 10px 30px 30px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    background-color: #1a1a1a;
                    border-radius: 0;
                    padding: 14px 32px;
                  ">
                    <a href="https://tick-d.com" style="
                      font-family: 'Courier New', Courier, monospace;
                      font-size: 14px;
                      font-weight: bold;
                      color: #f5f0e6;
                      text-decoration: none;
                      text-transform: uppercase;
                      letter-spacing: 1px;
                    ">${isUnhinged ? 'FACE YOUR TASKS →' : 'View Tasks →'}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sign Off -->
          <tr>
            <td style="padding: 0 30px 25px 30px; font-family: Georgia, 'Times New Roman', serif; font-size: 15px; line-height: 1.5; color: #1a1a1a; white-space: pre-line;">
${signOff}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #e8e4dc; padding: 20px 30px; font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #8b7355; text-align: center;">
              ${footerNote}
              <br><br>
              <a href="https://tick-d.com" style="color: #8b7355;">tick-d.com</a>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`.trim()
}

function getUnhingedSignOff(tier: string): string {
  const signOffs = {
    '4_day': `Watching,
Tick

P.S. Four days is less time than you think.`,
    '1_day': `Tick-tock,
Tick

P.S. Sleep well tonight.`,
    'day_of': `Still here,
Tick

P.S. I'm not mad. I'm disappointed.`,
    'overdue': `...,
Tick

P.S. We need to talk about your choices.`,
  }
  return signOffs[tier as keyof typeof signOffs] || signOffs['4_day']
}

function getUnhingedFooter(tier: string): string {
  const footers = {
    '4_day': 'This is a courtesy. Don\'t make me send another one.',
    '1_day': 'Did you really think tomorrow would never come?',
    'day_of': 'This could have been avoided. You know that, right?',
    'overdue': 'I\'m adding this to your permanent record.',
  }
  return footers[tier as keyof typeof footers] || footers['4_day']
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
