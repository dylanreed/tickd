// ABOUTME: HTML email templates for monthly stats.
// ABOUTME: Styled with "Detention Slip" aesthetic to match daily reminder emails.

export interface MonthlyStats {
  month: string // "January 2026"
  tasksCreated: number
  tasksCompleted: number
  tasksMissed: number
  completionRate: number // 0-100
  reliabilityStart: number
  reliabilityEnd: number
  reliabilityChange: number
  totalBufferHours: number // actual time saved
  perceivedCloseCallCount: number // times they thought they were cutting it close
  worstExcuses: Array<{ text: string; length: number }>
  userName: string
}

const SUBJECT_LINES: Record<number, (month: string) => string> = {
  1: (m) => `Your ${m} stats are in`,
  2: (m) => `${m} recap: Here's how you did`,
  3: (m) => `${m} Report: Tick has thoughts`,
  4: (m) => `${m} DEBRIEF: We need to discuss this`,
  5: (m) => `${m.toUpperCase()} IS OVER AND WE NEED TO TALK`,
}

function getCompletionRoast(rate: number, spicy: number): string {
  if (rate === 100) {
    const roasts: Record<number, string> = {
      1: "Perfect month. Well done.",
      2: "100%. Color us impressed.",
      3: "Perfect score. Who are you and what have you done with the usual mess?",
      4: "100%?! EXCUSE ME?? Is this a bit??",
      5: "100%??? I DON'T BELIEVE IT. SHOW ME THE RECEIPTS.",
    }
    return roasts[spicy]
  }
  if (rate >= 80) {
    const roasts: Record<number, string> = {
      1: "Solid month. Keep it up.",
      2: "Pretty good. Room for a little improvement.",
      3: "Not bad. Tick is cautiously optimistic.",
      4: "DECENT. Could be better but I won't yell. Much.",
      5: "OKAY FINE THIS IS ACCEPTABLE. BARELY.",
    }
    return roasts[spicy]
  }
  if (rate >= 50) {
    const roasts: Record<number, string> = {
      1: "Room for improvement next month.",
      2: "Half and half. We believe in you.",
      3: "Fifty-fifty. Tick is watching.",
      4: "HALF?? Just HALF?? We need to talk.",
      5: "COIN FLIP PRODUCTIVITY. ARE YOU EVEN TRYING??",
    }
    return roasts[spicy]
  }
  const roasts: Record<number, string> = {
    1: "Tough month. Tomorrow is a fresh start.",
    2: "We've seen better months from you.",
    3: "Less than half. Tick is taking notes.",
    4: "LESS THAN HALF?? In THIS economy??",
    5: "ABSOLUTELY UNHINGED BEHAVIOR.",
  }
  return roasts[spicy]
}

function getReliabilityComment(change: number, spicy: number): string {
  if (change > 0) {
    return spicy >= 4 ? `UP ${change} POINTS. SUSPICIOUS BUT OKAY.` : `Up ${change} points. Nice work.`
  }
  if (change < 0) {
    return spicy >= 4 ? `DOWN ${Math.abs(change)} POINTS. NOTED.` : `Down ${Math.abs(change)} points. Let's turn that around.`
  }
  return spicy >= 4 ? "NO CHANGE. STAGNANT." : "Held steady."
}

function getTimeSavedReveal(buffer: number, closeCalls: number, spicy: number): string {
  if (closeCalls === 0) {
    return spicy >= 4
      ? "YOU DIDN'T PANIC ONCE. SUSPICIOUS."
      : "No close calls this month. Suspiciously calm."
  }
  const hours = Math.round(buffer)
  if (spicy >= 4) {
    return `YOU THOUGHT YOU WERE CUTTING IT CLOSE ${closeCalls} TIMES. YOU ACTUALLY HAD ${hours} HOURS OF BUFFER. YOU'RE WELCOME.`
  }
  return `You thought you were cutting it close ${closeCalls} times. You actually had ${hours} hours of buffer total. You're welcome.`
}

function getExcuseSection(excuses: Array<{ text: string; length: number }>, spicy: number): string {
  if (excuses.length === 0) {
    return spicy >= 4
      ? `<tr><td style="padding: 15px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 15px; color: #1a1a1a;">ZERO EXCUSES. SUSPICIOUS.</td></tr>`
      : `<tr><td style="padding: 15px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 15px; color: #1a1a1a;">No excuses this month. Impressive.</td></tr>`
  }

  const header = spicy >= 4 ? "EXCUSE HALL OF SHAME" : "Excuse Hall of Shame"
  const list = excuses.map((e, i) => {
    const suffix = e.length === 10 ? ' - THE BARE MINIMUM' : ''
    return `<tr><td style="padding: 4px 0; font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #1a1a1a;">${i + 1}. "${e.text}" <span style="color: #8b7355;">(${e.length} chars${suffix})</span></td></tr>`
  }).join('')

  return `
    <tr>
      <td style="padding: 20px 0 10px 0; font-family: 'Courier New', Courier, monospace; font-size: 14px; font-weight: bold; color: #c41e3a; text-transform: uppercase; letter-spacing: 1px;">
        ${header}
      </td>
    </tr>
    ${list}
  `
}

function getSignOff(rate: number, spicy: number): string {
  if (spicy >= 4) {
    if (rate >= 80) return "Watching (approvingly),\nTick\n\nP.S. Don't let this go to your head."
    if (rate >= 50) return "Still watching,\nTick\n\nP.S. I expect better next month."
    return "...,\nTick\n\nP.S. We need to schedule a meeting about your choices."
  }
  if (rate >= 80) return "Well done,\nTick"
  if (rate >= 50) return "See you next month,\nTick"
  return "Here if you need help,\nTick"
}

function getFooterNote(rate: number, spicy: number): string {
  if (spicy >= 4) {
    if (rate >= 80) return "This report will be added to your permanent record. (The good section.)"
    if (rate >= 50) return "This report will be added to your permanent record."
    return "This report will be added to your permanent record. HR has been notified. (HR is also me.)"
  }
  return "You can manage your notification preferences in the app."
}

export function generateSubject(stats: MonthlyStats, spicyLevel: number): string {
  return SUBJECT_LINES[spicyLevel](stats.month)
}

export function generateEmailHtml(stats: MonthlyStats, spicyLevel: number): string {
  const isUnhinged = spicyLevel >= 4
  const completionRoast = getCompletionRoast(stats.completionRate, spicyLevel)
  const reliabilityComment = getReliabilityComment(stats.reliabilityChange, spicyLevel)
  const timeSaved = getTimeSavedReveal(stats.totalBufferHours, stats.perceivedCloseCallCount, spicyLevel)
  const excuseSection = getExcuseSection(stats.worstExcuses, spicyLevel)
  const signOff = getSignOff(stats.completionRate, spicyLevel)
  const footerNote = getFooterNote(stats.completionRate, spicyLevel)

  // Stamp text based on completion rate
  const stampText = stats.completionRate >= 80
    ? (isUnhinged ? 'ACCEPTABLE' : 'Good Month')
    : stats.completionRate >= 50
      ? (isUnhinged ? 'NOTED' : 'Room to Grow')
      : (isUnhinged ? 'SEE ME' : 'Needs Work')

  const stampColor = stats.completionRate >= 80 ? '#8b7355' : '#c41e3a'

  const reliabilityArrow = stats.reliabilityChange > 0 ? '↑' : stats.reliabilityChange < 0 ? '↓' : '→'
  const reliabilityColor = stats.reliabilityChange >= 0 ? '#2d5a2d' : '#c41e3a'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isUnhinged ? 'MONTHLY REPORT FROM TICK' : 'Monthly Report from Tick'}</title>
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
                    <strong>TO:</strong>&nbsp;&nbsp;&nbsp;${isUnhinged ? stats.userName.toUpperCase() : stats.userName}
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 4px;">
                    <strong>FROM:</strong>&nbsp;Tick
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 4px;">
                    <strong>RE:</strong>&nbsp;&nbsp;&nbsp;<span style="text-decoration: underline; color: #c41e3a;">${isUnhinged ? `${stats.month.toUpperCase()} PERFORMANCE REVIEW` : `${stats.month} Performance Review`}</span>
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

          <!-- Stats Summary Box -->
          <tr>
            <td style="padding: 25px 30px 15px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e8e4dc; border: 1px solid #d4cfc4;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: bold; color: #1a1a1a;">
                      ${stats.tasksCompleted}/${stats.tasksCreated}
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 14px; color: #5a5a5a; margin-top: 4px;">
                      TASKS COMPLETED
                    </div>
                    <div style="font-family: Georgia, serif; font-size: 24px; font-weight: bold; color: ${stats.completionRate >= 80 ? '#2d5a2d' : stats.completionRate >= 50 ? '#8b7355' : '#c41e3a'}; margin-top: 12px;">
                      ${stats.completionRate}%
                    </div>
                    ${stats.tasksMissed > 0 ? `<div style="font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #c41e3a; margin-top: 8px;">${stats.tasksMissed} MISSED</div>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Roast Quote -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 15px; background-color: #fff9e6; border-left: 4px solid #8b7355; font-family: Georgia, 'Times New Roman', serif; font-size: 15px; font-style: italic; color: #1a1a1a;">
                    "${completionRoast}"
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reliability Score Section -->
          <tr>
            <td style="padding: 0 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding-bottom: 10px; font-family: 'Courier New', Courier, monospace; font-size: 14px; font-weight: bold; color: #1a1a1a; text-transform: uppercase; letter-spacing: 1px;">
                    ${isUnhinged ? 'RELIABILITY CHECK' : 'Reliability Score'}
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Georgia, 'Times New Roman', serif; font-size: 16px; color: #1a1a1a;">
                    <span style="font-size: 24px; font-weight: bold;">${stats.reliabilityStart}%</span>
                    <span style="color: #8b7355; padding: 0 8px;">${reliabilityArrow}</span>
                    <span style="font-size: 24px; font-weight: bold;">${stats.reliabilityEnd}%</span>
                    <span style="color: ${reliabilityColor}; font-size: 14px; margin-left: 8px;">
                      (${stats.reliabilityChange >= 0 ? '+' : ''}${stats.reliabilityChange})
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 8px; font-family: Georgia, 'Times New Roman', serif; font-size: 14px; color: #8b7355;">
                    ${reliabilityComment}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Time Saved Reveal -->
          <tr>
            <td style="padding: 25px 30px 0 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding-bottom: 10px; font-family: 'Courier New', Courier, monospace; font-size: 14px; font-weight: bold; color: #c41e3a; text-transform: uppercase; letter-spacing: 1px;">
                    ${isUnhinged ? 'THE BIG REVEAL' : 'Time Saved'}
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Georgia, 'Times New Roman', serif; font-size: 15px; color: #1a1a1a; line-height: 1.5;">
                    ${timeSaved}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Excuse Hall of Shame -->
          <tr>
            <td style="padding: 10px 30px 0 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                ${excuseSection}
              </table>
            </td>
          </tr>

          <!-- Sign Off -->
          <tr>
            <td style="padding: 25px 30px; font-family: Georgia, 'Times New Roman', serif; font-size: 15px; line-height: 1.5; color: #1a1a1a; white-space: pre-line;">
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

export function generatePlainText(stats: MonthlyStats, spicyLevel: number): string {
  const isUnhinged = spicyLevel >= 4
  const completionRoast = getCompletionRoast(stats.completionRate, spicyLevel)
  const reliabilityComment = getReliabilityComment(stats.reliabilityChange, spicyLevel)
  const timeSaved = getTimeSavedReveal(stats.totalBufferHours, stats.perceivedCloseCallCount, spicyLevel)
  const signOff = getSignOff(stats.completionRate, spicyLevel)

  const excuseList = stats.worstExcuses.length > 0
    ? `\nLaziest excuses:\n${stats.worstExcuses.map((e, i) => `${i + 1}. "${e.text}" (${e.length} chars)`).join('\n')}`
    : ''

  return `
MEMO FROM TICK
${isUnhinged ? `${stats.month.toUpperCase()} PERFORMANCE REVIEW` : `${stats.month} Performance Review`}

TO: ${isUnhinged ? stats.userName.toUpperCase() : stats.userName}
FROM: Tick

---

TASKS: ${stats.tasksCompleted}/${stats.tasksCreated} (${stats.completionRate}%)
${stats.tasksMissed > 0 ? `MISSED: ${stats.tasksMissed}` : ''}

"${completionRoast}"

RELIABILITY: ${stats.reliabilityStart}% → ${stats.reliabilityEnd}% (${stats.reliabilityChange >= 0 ? '+' : ''}${stats.reliabilityChange})
${reliabilityComment}

TIME SAVED:
${timeSaved}
${excuseList}

---

${signOff}

---
tick-d.com
  `.trim()
}
