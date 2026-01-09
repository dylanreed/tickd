// ABOUTME: HTML email templates for monthly stats.
// ABOUTME: Generates content based on stats and spicy level.

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
      1: "Perfect month! Well done!",
      2: "100%! Color us impressed.",
      3: "Perfect score. Who are you and what have you done with the usual mess?",
      4: "100%?! EXCUSE ME?? Is this a bit??",
      5: "100%??? I DON'T BELIEVE IT. SHOW ME THE RECEIPTS. ACTUALLY DON'T I'M SCARED.",
    }
    return roasts[spicy]
  }
  if (rate >= 80) {
    const roasts: Record<number, string> = {
      1: "Solid month! Keep it up.",
      2: "Pretty good! Room for a little improvement.",
      3: "Not bad. Tick is cautiously optimistic.",
      4: "DECENT. Could be better but Tick won't yell. Much.",
      5: "OKAY FINE THIS IS ACCEPTABLE. BARELY. DON'T GET COMFORTABLE.",
    }
    return roasts[spicy]
  }
  if (rate >= 50) {
    const roasts: Record<number, string> = {
      1: "Room for improvement next month!",
      2: "Half and half. We believe in you.",
      3: "Fifty-fifty. Tick is watching.",
      4: "HALF?? Just HALF?? We need to talk.",
      5: "COIN FLIP PRODUCTIVITY. ARE YOU EVEN TRYING??",
    }
    return roasts[spicy]
  }
  const roasts: Record<number, string> = {
    1: "Tough month. Tomorrow is a fresh start!",
    2: "We've seen better months from you.",
    3: "Less than half. Tick is taking notes.",
    4: "LESS THAN HALF?? In THIS economy??",
    5: "ABSOLUTELY UNHINGED BEHAVIOR. I'M TELLING EVERYONE.",
  }
  return roasts[spicy]
}

function getReliabilityComment(change: number, spicy: number): string {
  if (change > 0) {
    return spicy >= 4 ? `UP ${change} POINTS. SUSPICIOUS BUT OKAY.` : `Up ${change} points. Nice work.`
  }
  if (change < 0) {
    return spicy >= 4 ? `DOWN ${Math.abs(change)} POINTS. TICK IS DISAPPOINTED.` : `Down ${Math.abs(change)} points. Let's turn that around.`
  }
  return spicy >= 4 ? "NO CHANGE. STAGNANT. CONCERNING." : "Held steady."
}

function getTimeSavedReveal(buffer: number, closeCalls: number, spicy: number): string {
  if (closeCalls === 0) {
    return spicy >= 4
      ? "YOU DIDN'T PANIC ONCE. ARE YOU EVEN HUMAN??"
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
      ? "<p>ZERO EXCUSES. SUSPICIOUS. ARE YOU OKAY??</p>"
      : "<p>No excuses this month. Impressive... or concerning.</p>"
  }

  const header = spicy >= 4 ? "EXCUSE HALL OF SHAME" : "Excuse Hall of Shame"
  const intro = spicy >= 4
    ? "YOUR LAZIEST ATTEMPTS AT JUSTIFICATION:"
    : "Your laziest excuses this month:"

  const list = excuses.map((e) => {
    return `<li>"${e.text}" <span style="color: #9F8BA3;">(${e.length} chars${e.length === 10 ? ' - THE BARE MINIMUM' : ''})</span></li>`
  }).join('')

  return `
    <h3 style="color: #2D2D2D; margin-top: 24px;">${header}</h3>
    <p style="color: #9F8BA3;">${intro}</p>
    <ol style="color: #2D2D2D;">${list}</ol>
  `
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

  const greeting = isUnhinged
    ? `${stats.userName.toUpperCase()}. WE NEED TO TALK.`
    : `Hey ${stats.userName}, here's your ${stats.month} recap.`

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F5F0F7; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; padding: 32px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="font-size: 18px; color: #2D2D2D; margin: 0;">
        ${isUnhinged ? "TICK'D MONTHLY REPORT" : "Tick'd Monthly Report"}
      </h1>
      <p style="color: #9F8BA3; margin-top: 8px;">${stats.month}</p>
    </div>
    <p style="color: #2D2D2D; font-size: 16px;">${greeting}</p>
    <div style="background: #F5F0F7; border-radius: 12px; padding: 20px; margin: 20px 0;">
      <h2 style="color: #2D2D2D; margin: 0 0 12px 0; font-size: 16px;">
        ${isUnhinged ? "THE DAMAGE REPORT" : "Task Summary"}
      </h2>
      <p style="font-size: 32px; font-weight: bold; color: #FF6B9D; margin: 0;">
        ${stats.tasksCompleted}/${stats.tasksCreated} tasks
      </p>
      <p style="color: #9F8BA3; margin: 8px 0 0 0;">
        ${stats.completionRate}% completion rate${stats.tasksMissed > 0 ? ` • ${stats.tasksMissed} missed` : ''}
      </p>
    </div>
    <p style="color: #2D2D2D; font-size: 16px; font-style: italic; background: #FFF5E6; padding: 16px; border-radius: 8px; border-left: 4px solid #FFB347;">
      "${completionRoast}"
    </p>
    <h3 style="color: #2D2D2D; margin-top: 24px;">${isUnhinged ? "RELIABILITY CHECK" : "Reliability Score"}</h3>
    <p style="color: #2D2D2D;">
      <span style="font-size: 24px; font-weight: bold;">${stats.reliabilityStart}%</span>
      <span style="color: #9F8BA3;"> → </span>
      <span style="font-size: 24px; font-weight: bold;">${stats.reliabilityEnd}%</span>
      <span style="color: ${stats.reliabilityChange >= 0 ? '#4CAF50' : '#FF6B9D'};">
        (${stats.reliabilityChange >= 0 ? '+' : ''}${stats.reliabilityChange})
      </span>
    </p>
    <p style="color: #9F8BA3;">${reliabilityComment}</p>
    <h3 style="color: #2D2D2D; margin-top: 24px;">${isUnhinged ? "THE BIG REVEAL" : "Time Saved"}</h3>
    <p style="color: #2D2D2D;">${timeSaved}</p>
    ${excuseSection}
    <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #E8E0ED; text-align: center;">
      <p style="color: #9F8BA3; font-size: 14px;">
        <a href="https://tick-d.com" style="color: #FF6B9D; text-decoration: none;">Open Tick'd</a>
        ${isUnhinged ? " • DON'T MAKE ME SEND ANOTHER ONE OF THESE" : ""}
      </p>
      <p style="color: #C4B8C9; font-size: 12px; margin-top: 12px;">
        You're receiving this because you have email notifications enabled.<br>Manage preferences in Settings.
      </p>
    </div>
  </div>
</body>
</html>
  `
}

export function generatePlainText(stats: MonthlyStats, spicyLevel: number): string {
  const isUnhinged = spicyLevel >= 4
  const completionRoast = getCompletionRoast(stats.completionRate, spicyLevel)

  return `
${isUnhinged ? "TICK'D MONTHLY REPORT" : "Tick'd Monthly Report"}
${stats.month}

${isUnhinged ? `${stats.userName.toUpperCase()}. WE NEED TO TALK.` : `Hey ${stats.userName}, here's your ${stats.month} recap.`}

${isUnhinged ? "THE DAMAGE REPORT" : "Task Summary"}
${stats.tasksCompleted}/${stats.tasksCreated} tasks (${stats.completionRate}%)
${stats.tasksMissed > 0 ? `${stats.tasksMissed} missed` : ''}

"${completionRoast}"

Reliability: ${stats.reliabilityStart}% → ${stats.reliabilityEnd}% (${stats.reliabilityChange >= 0 ? '+' : ''}${stats.reliabilityChange})

${getTimeSavedReveal(stats.totalBufferHours, stats.perceivedCloseCallCount, spicyLevel)}

${stats.worstExcuses.length > 0 ? `Laziest excuses:\n${stats.worstExcuses.map((e, i) => `${i + 1}. "${e.text}" (${e.length} chars)`).join('\n')}` : ''}

---
Open Tick'd: https://tick-d.com
  `.trim()
}
