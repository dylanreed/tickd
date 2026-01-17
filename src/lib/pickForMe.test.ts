// ABOUTME: Tests for the Pick For Me selection algorithm.
// ABOUTME: Verifies weighted random selection and quick win detection work correctly.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  isQuickWin,
  calculateDeadlineScore,
  calculateAgeScore,
  calculateQuickWinScore,
  calculateTaskWeight,
  pickTask,
  areAllTasksOverdue,
  getEarnOutThreshold,
  DEFAULT_PICK_CONFIG,
} from "./pickForMe";
import type { TaskWithFakeDate } from "../types/task";

// Helper to create a task with overrides
function createTask(overrides: Partial<TaskWithFakeDate> = {}): TaskWithFakeDate {
  const now = new Date();
  return {
    id: "task-1",
    user_id: "user-1",
    title: "Test task",
    description: null,
    real_due_date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: null,
    status: "pending",
    completed_at: null,
    was_on_time: null,
    created_at: now.toISOString(),
    fake_due_date: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
    urgency: "medium",
    is_snoozed: false,
    ...overrides,
  };
}

describe("isQuickWin", () => {
  it("returns true for tasks with quick win keywords", () => {
    expect(isQuickWin("Call mom")).toBe(true);
    expect(isQuickWin("Send email to boss")).toBe(true);
    expect(isQuickWin("Text John about dinner")).toBe(true);
    expect(isQuickWin("Check bank balance")).toBe(true);
    expect(isQuickWin("Reply to Sarah")).toBe(true);
    expect(isQuickWin("Book dentist appointment")).toBe(true);
    expect(isQuickWin("Schedule meeting")).toBe(true);
    expect(isQuickWin("Confirm reservation")).toBe(true);
    expect(isQuickWin("Order groceries")).toBe(true);
    expect(isQuickWin("Pay electricity bill")).toBe(true);
    expect(isQuickWin("Submit timesheet")).toBe(true);
    expect(isQuickWin("Sign documents")).toBe(true);
    expect(isQuickWin("Review PR")).toBe(true);
    expect(isQuickWin("Approve request")).toBe(true);
    expect(isQuickWin("Buy milk")).toBe(true);
  });

  it("returns true for short titles under 30 characters", () => {
    expect(isQuickWin("Do laundry")).toBe(true); // 10 chars
    expect(isQuickWin("Water plants")).toBe(true); // 12 chars
    expect(isQuickWin("Take out trash")).toBe(true); // 14 chars
  });

  it("returns false for complex multi-step tasks", () => {
    expect(isQuickWin("Clean garage: sort tools; organize shelves; sweep floor")).toBe(
      false
    );
    expect(isQuickWin("Prepare presentation: research topic; create slides; practice delivery")).toBe(
      false
    );
    expect(
      isQuickWin("Do the thing and then do the other thing after that")
    ).toBe(false);
  });

  it("handles case insensitivity", () => {
    expect(isQuickWin("CALL MOM")).toBe(true);
    expect(isQuickWin("Email Boss")).toBe(true);
    expect(isQuickWin("CHECK Balance")).toBe(true);
  });
});

describe("calculateDeadlineScore", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-08T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 1 for overdue tasks", () => {
    const task = createTask({
      fake_due_date: new Date("2026-01-07T12:00:00Z"), // yesterday
    });
    expect(calculateDeadlineScore(task)).toBe(1);
  });

  it("returns 0.9 for tasks due within 24 hours", () => {
    const task = createTask({
      fake_due_date: new Date("2026-01-09T06:00:00Z"), // 18 hours away
    });
    expect(calculateDeadlineScore(task)).toBe(0.9);
  });

  it("returns 0.7 for tasks due within 48 hours", () => {
    const task = createTask({
      fake_due_date: new Date("2026-01-10T06:00:00Z"), // 42 hours away
    });
    expect(calculateDeadlineScore(task)).toBe(0.7);
  });

  it("returns 0.5 for tasks due within a week", () => {
    const task = createTask({
      fake_due_date: new Date("2026-01-13T12:00:00Z"), // 5 days away
    });
    expect(calculateDeadlineScore(task)).toBe(0.5);
  });

  it("returns 0.3 for tasks due within 2 weeks", () => {
    const task = createTask({
      fake_due_date: new Date("2026-01-18T12:00:00Z"), // 10 days away
    });
    expect(calculateDeadlineScore(task)).toBe(0.3);
  });

  it("returns 0.1 for tasks due far in the future", () => {
    const task = createTask({
      fake_due_date: new Date("2026-02-08T12:00:00Z"), // 1 month away
    });
    expect(calculateDeadlineScore(task)).toBe(0.1);
  });
});

describe("calculateAgeScore", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-08T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 0.1 for brand new tasks (< 1 day old)", () => {
    const task = createTask({
      created_at: new Date("2026-01-08T06:00:00Z").toISOString(), // 6 hours ago
    });
    expect(calculateAgeScore(task)).toBe(0.1);
  });

  it("returns 0.3 for tasks 1-3 days old", () => {
    const task = createTask({
      created_at: new Date("2026-01-06T12:00:00Z").toISOString(), // 2 days ago
    });
    expect(calculateAgeScore(task)).toBe(0.3);
  });

  it("returns 0.6 for tasks 4-7 days old", () => {
    const task = createTask({
      created_at: new Date("2026-01-03T12:00:00Z").toISOString(), // 5 days ago
    });
    expect(calculateAgeScore(task)).toBe(0.6);
  });

  it("returns 0.8 for tasks 8-14 days old", () => {
    const task = createTask({
      created_at: new Date("2025-12-29T12:00:00Z").toISOString(), // 10 days ago
    });
    expect(calculateAgeScore(task)).toBe(0.8);
  });

  it("returns 1 for tasks over 2 weeks old", () => {
    const task = createTask({
      created_at: new Date("2025-12-20T12:00:00Z").toISOString(), // 19 days ago
    });
    expect(calculateAgeScore(task)).toBe(1);
  });
});

describe("calculateQuickWinScore", () => {
  it("returns 0.8 for quick win tasks", () => {
    const task = createTask({ title: "Call mom" });
    expect(calculateQuickWinScore(task)).toBe(0.8);
  });

  it("returns 0.2 for non-quick win tasks", () => {
    const task = createTask({
      title: "Reorganize entire garage: sort tools; clean shelves; repaint walls",
    });
    expect(calculateQuickWinScore(task)).toBe(0.2);
  });
});

describe("calculateTaskWeight", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-08T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calculates weight based on all factors", () => {
    const task = createTask({
      title: "Call mom",
      fake_due_date: new Date("2026-01-09T12:00:00Z"), // due tomorrow
      created_at: new Date("2026-01-06T12:00:00Z").toISOString(), // 2 days old
    });

    // Mock Math.random to return 0.5 for predictable test
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    const weight = calculateTaskWeight(task);

    // deadline score: 0.9 (due within 24 hours)
    // age score: 0.3 (1-3 days old)
    // quick win score: 0.8 (has "call" keyword)
    // random score: 0.5

    // Expected: 0.9 * 0.35 + 0.3 * 0.2 + 0.8 * 0.25 + 0.5 * 0.2
    // = 0.315 + 0.06 + 0.2 + 0.1 = 0.675
    expect(weight.weight).toBeCloseTo(0.675, 2);
    expect(weight.taskId).toBe("task-1");
    expect(weight.reasons).toContain("Due soon");
    expect(weight.reasons).toContain("Quick win");

    vi.spyOn(Math, "random").mockRestore();
  });

  it("includes 'Been waiting' reason for old tasks", () => {
    const task = createTask({
      created_at: new Date("2026-01-01T12:00:00Z").toISOString(), // 7 days old
    });

    const weight = calculateTaskWeight(task);
    expect(weight.reasons).toContain("Been waiting");
  });
});

describe("pickTask", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-08T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns null when no tasks available", () => {
    expect(pickTask([])).toBeNull();
  });

  it("returns the only task when one task available", () => {
    const task = createTask();
    expect(pickTask([task])).toBe(task);
  });

  it("excludes tasks in excludeIds", () => {
    const task1 = createTask({ id: "task-1" });
    const task2 = createTask({ id: "task-2" });

    const result = pickTask([task1, task2], DEFAULT_PICK_CONFIG, ["task-1"]);
    expect(result).toBe(task2);
  });

  it("returns null when all tasks are excluded", () => {
    const task1 = createTask({ id: "task-1" });
    const task2 = createTask({ id: "task-2" });

    const result = pickTask([task1, task2], DEFAULT_PICK_CONFIG, [
      "task-1",
      "task-2",
    ]);
    expect(result).toBeNull();
  });

  it("tends to pick higher-weight tasks more often", () => {
    // This is a statistical test - run multiple times
    const urgentTask = createTask({
      id: "urgent",
      title: "Call emergency",
      fake_due_date: new Date("2026-01-08T14:00:00Z"), // 2 hours away
    });
    const notUrgentTask = createTask({
      id: "not-urgent",
      title: "Clean garage: sort tools; organize shelves; sweep floor",
      fake_due_date: new Date("2026-02-08T12:00:00Z"), // 1 month away
    });

    let urgentPicked = 0;
    const iterations = 100;

    for (let i = 0; i < iterations; i++) {
      const result = pickTask([urgentTask, notUrgentTask]);
      if (result?.id === "urgent") {
        urgentPicked++;
      }
    }

    // Urgent task should be picked significantly more often
    expect(urgentPicked).toBeGreaterThan(60);
  });
});

describe("areAllTasksOverdue", () => {
  it("returns false for empty array", () => {
    expect(areAllTasksOverdue([])).toBe(false);
  });

  it("returns true when all tasks are overdue", () => {
    const tasks = [
      createTask({ urgency: "overdue" }),
      createTask({ id: "task-2", urgency: "overdue" }),
    ];
    expect(areAllTasksOverdue(tasks)).toBe(true);
  });

  it("returns false when some tasks are not overdue", () => {
    const tasks = [
      createTask({ urgency: "overdue" }),
      createTask({ id: "task-2", urgency: "medium" }),
    ];
    expect(areAllTasksOverdue(tasks)).toBe(false);
  });

  it("returns false when no tasks are overdue", () => {
    const tasks = [
      createTask({ urgency: "low" }),
      createTask({ id: "task-2", urgency: "high" }),
    ];
    expect(areAllTasksOverdue(tasks)).toBe(false);
  });
});

describe("getEarnOutThreshold", () => {
  it("returns 1 for reliability score >= 80", () => {
    expect(getEarnOutThreshold(80)).toBe(1);
    expect(getEarnOutThreshold(90)).toBe(1);
    expect(getEarnOutThreshold(100)).toBe(1);
  });

  it("returns 2 for reliability score 50-79", () => {
    expect(getEarnOutThreshold(50)).toBe(2);
    expect(getEarnOutThreshold(65)).toBe(2);
    expect(getEarnOutThreshold(79)).toBe(2);
  });

  it("returns 3 for reliability score 25-49", () => {
    expect(getEarnOutThreshold(25)).toBe(3);
    expect(getEarnOutThreshold(35)).toBe(3);
    expect(getEarnOutThreshold(49)).toBe(3);
  });

  it("returns 4 for reliability score below 25", () => {
    expect(getEarnOutThreshold(0)).toBe(4);
    expect(getEarnOutThreshold(10)).toBe(4);
    expect(getEarnOutThreshold(24)).toBe(4);
  });
});
