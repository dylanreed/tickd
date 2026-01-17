// ABOUTME: Identifies tasks likely to be quick wins.
// ABOUTME: Used by Pick For Me and Momentum Builder.

import type { Task } from '../types/task'

const QUICK_KEYWORDS = [
  'call',
  'email',
  'text',
  'check',
  'send',
  'reply',
  'book',
  'schedule',
  'confirm',
  'order',
  'pay',
  'sign',
  'print',
  'download',
  'upload',
  'update',
  'ask',
  'remind',
  'message',
  'notify',
]

/**
 * Determines if a task is likely a quick win based on:
 * - Keywords in the title suggesting brief actions
 * - Short title (likely simple task)
 * - Estimate under 30 minutes
 */
export function isQuickWin(task: Task): boolean {
  const titleLower = task.title.toLowerCase()

  // Keyword match
  if (QUICK_KEYWORDS.some(kw => titleLower.includes(kw))) {
    return true
  }

  // Short title (likely simple task)
  if (task.title.length < 25) {
    return true
  }

  // Has estimate under 30 minutes
  if (task.estimated_minutes && task.estimated_minutes <= 30) {
    return true
  }

  return false
}

/**
 * Get quick win tasks from a list, sorted by estimated time (shortest first)
 */
export function getQuickWins(tasks: Task[], limit?: number): Task[] {
  const quickWins = tasks.filter(t => t.status === 'pending' && isQuickWin(t))

  // Sort by estimated time (null estimates go last)
  quickWins.sort((a, b) => {
    if (a.estimated_minutes === null && b.estimated_minutes === null) return 0
    if (a.estimated_minutes === null) return 1
    if (b.estimated_minutes === null) return -1
    return a.estimated_minutes - b.estimated_minutes
  })

  return limit ? quickWins.slice(0, limit) : quickWins
}

/**
 * Calculate quick win score for a task (higher = quicker)
 */
export function getQuickWinScore(task: Task): number {
  let score = 0
  const titleLower = task.title.toLowerCase()

  // Keyword bonus
  const keywordMatches = QUICK_KEYWORDS.filter(kw => titleLower.includes(kw))
  score += keywordMatches.length * 10

  // Short title bonus
  if (task.title.length < 15) {
    score += 20
  } else if (task.title.length < 25) {
    score += 10
  }

  // Estimate bonus (lower = higher score)
  if (task.estimated_minutes) {
    if (task.estimated_minutes <= 15) {
      score += 30
    } else if (task.estimated_minutes <= 30) {
      score += 20
    } else if (task.estimated_minutes <= 60) {
      score += 10
    }
  }

  return score
}
