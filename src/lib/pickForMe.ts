// ABOUTME: Weighted random task selection algorithm for Pick For Me.
// ABOUTME: Pretends to be random but uses smart prioritization.

import type { TaskWithFakeDate } from "../types/task";

export interface TaskWeight {
  taskId: string;
  weight: number;
  reasons: string[];
}

export interface PickConfig {
  deadlineProximityWeight: number; // How much to favor tasks due sooner
  taskAgeWeight: number; // How much to favor older tasks
  quickWinWeight: number; // How much to favor likely quick tasks
  randomnessWeight: number; // How much pure randomness to add
}

export const DEFAULT_PICK_CONFIG: PickConfig = {
  deadlineProximityWeight: 0.35,
  taskAgeWeight: 0.2,
  quickWinWeight: 0.25,
  randomnessWeight: 0.2,
};

// Keywords that indicate quick tasks
const QUICK_WIN_KEYWORDS = [
  "call",
  "email",
  "text",
  "check",
  "send",
  "reply",
  "book",
  "schedule",
  "confirm",
  "order",
  "buy",
  "pay",
  "submit",
  "sign",
  "review",
  "approve",
];

/**
 * Detect if a task is likely a quick win based on title
 */
export function isQuickWin(title: string): boolean {
  const lowerTitle = title.toLowerCase();

  // Check for quick win keywords
  for (const keyword of QUICK_WIN_KEYWORDS) {
    if (lowerTitle.includes(keyword)) {
      return true;
    }
  }

  // Short titles (under 30 chars) are often quick tasks
  if (title.length < 30) {
    return true;
  }

  // Complex punctuation suggests multi-step tasks
  const hasComplexPunctuation =
    title.includes(":") || title.includes(";") || title.includes("then");
  if (hasComplexPunctuation) {
    return false;
  }

  return false;
}

/**
 * Calculate deadline proximity score (0-1)
 * Higher score for tasks due sooner
 */
export function calculateDeadlineScore(task: TaskWithFakeDate): number {
  const now = new Date();
  const dueDate = new Date(task.fake_due_date);
  const hoursUntilDue = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  // Already overdue = maximum urgency
  if (hoursUntilDue <= 0) {
    return 1;
  }

  // Due within 24 hours = very high
  if (hoursUntilDue <= 24) {
    return 0.9;
  }

  // Due within 48 hours = high
  if (hoursUntilDue <= 48) {
    return 0.7;
  }

  // Due within a week = medium
  if (hoursUntilDue <= 168) {
    return 0.5;
  }

  // Due within 2 weeks = low
  if (hoursUntilDue <= 336) {
    return 0.3;
  }

  // Far future = minimal
  return 0.1;
}

/**
 * Calculate task age score (0-1)
 * Higher score for tasks that have been sitting around longer
 */
export function calculateAgeScore(task: TaskWithFakeDate): number {
  const now = new Date();
  const created = new Date(task.created_at);
  const daysOld = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

  // Brand new (< 1 day) = low priority for age
  if (daysOld < 1) {
    return 0.1;
  }

  // 1-3 days old = medium
  if (daysOld <= 3) {
    return 0.3;
  }

  // 4-7 days old = high
  if (daysOld <= 7) {
    return 0.6;
  }

  // Over a week = very high (it's being ignored)
  if (daysOld <= 14) {
    return 0.8;
  }

  // Over 2 weeks = maximum (seriously neglected)
  return 1;
}

/**
 * Calculate quick win score (0-1)
 */
export function calculateQuickWinScore(task: TaskWithFakeDate): number {
  return isQuickWin(task.title) ? 0.8 : 0.2;
}

/**
 * Calculate total weight for a single task
 */
export function calculateTaskWeight(
  task: TaskWithFakeDate,
  config: PickConfig = DEFAULT_PICK_CONFIG
): TaskWeight {
  const reasons: string[] = [];

  const deadlineScore = calculateDeadlineScore(task);
  const ageScore = calculateAgeScore(task);
  const quickWinScore = calculateQuickWinScore(task);
  const randomScore = Math.random();

  // Build reasons list for debugging
  if (deadlineScore >= 0.7) {
    reasons.push("Due soon");
  }
  if (ageScore >= 0.6) {
    reasons.push("Been waiting");
  }
  if (quickWinScore >= 0.8) {
    reasons.push("Quick win");
  }

  // Calculate weighted total
  const weight =
    deadlineScore * config.deadlineProximityWeight +
    ageScore * config.taskAgeWeight +
    quickWinScore * config.quickWinWeight +
    randomScore * config.randomnessWeight;

  return {
    taskId: task.id,
    weight,
    reasons,
  };
}

/**
 * Calculate weights for all tasks
 */
export function calculateAllWeights(
  tasks: TaskWithFakeDate[],
  config: PickConfig = DEFAULT_PICK_CONFIG
): TaskWeight[] {
  return tasks.map((task) => calculateTaskWeight(task, config));
}

/**
 * Pick a task using weighted random selection
 * Returns null if no tasks available
 */
export function pickTask(
  tasks: TaskWithFakeDate[],
  config: PickConfig = DEFAULT_PICK_CONFIG,
  excludeIds: string[] = []
): TaskWithFakeDate | null {
  // Filter out excluded tasks
  const availableTasks = tasks.filter((t) => !excludeIds.includes(t.id));

  if (availableTasks.length === 0) {
    return null;
  }

  // If only one task, return it
  if (availableTasks.length === 1) {
    return availableTasks[0];
  }

  // Calculate weights
  const weights = calculateAllWeights(availableTasks, config);

  // Normalize weights to sum to 1
  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  const normalizedWeights = weights.map((w) => ({
    ...w,
    weight: w.weight / totalWeight,
  }));

  // Weighted random selection
  const random = Math.random();
  let cumulative = 0;

  for (let i = 0; i < normalizedWeights.length; i++) {
    cumulative += normalizedWeights[i].weight;
    if (random <= cumulative) {
      return availableTasks[i];
    }
  }

  // Fallback to last task (should rarely happen due to floating point)
  return availableTasks[availableTasks.length - 1];
}

/**
 * Check if all tasks are overdue
 */
export function areAllTasksOverdue(tasks: TaskWithFakeDate[]): boolean {
  if (tasks.length === 0) return false;
  return tasks.every((task) => task.urgency === "overdue");
}

/**
 * Get the earn-out threshold based on reliability score
 */
export function getEarnOutThreshold(reliabilityScore: number): number {
  if (reliabilityScore >= 80) return 1;
  if (reliabilityScore >= 50) return 2;
  if (reliabilityScore >= 25) return 3;
  return 4;
}
