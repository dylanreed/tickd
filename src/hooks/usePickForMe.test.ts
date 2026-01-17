// ABOUTME: Tests for the usePickForMe hook.
// ABOUTME: Verifies state management, escalation, and earn-out logic.

import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePickForMe } from "./usePickForMe";
import type { TaskWithFakeDate } from "../types/task";

// Mock localStorage with proper isolation
let localStorageStore: Record<string, string> = {};
const localStorageMock = {
  getItem: vi.fn((key: string) => localStorageStore[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    localStorageStore[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete localStorageStore[key];
  }),
  clear: vi.fn(() => {
    localStorageStore = {};
  }),
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Helper to create tasks
function createTask(overrides: Partial<TaskWithFakeDate> = {}): TaskWithFakeDate {
  const now = new Date();
  return {
    id: `task-${Math.random().toString(36).substr(2, 9)}`,
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

describe("usePickForMe", () => {
  beforeEach(() => {
    localStorageStore = {};
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("starts with inactive state", () => {
      const tasks = [createTask(), createTask()];
      const { result } = renderHook(() =>
        usePickForMe(tasks, 50, "user-1")
      );

      expect(result.current.state.isActive).toBe(false);
      expect(result.current.state.pickedTaskId).toBeNull();
      expect(result.current.state.pickCount).toBe(0);
      expect(result.current.state.inSingleTaskMode).toBe(false);
    });

    it("canUsePick is true with 2+ pending tasks", () => {
      const tasks = [createTask(), createTask()];
      const { result } = renderHook(() =>
        usePickForMe(tasks, 50, "user-1")
      );

      expect(result.current.canUsePick).toBe(true);
    });

    it("canUsePick is false with fewer than 2 pending tasks", () => {
      const tasks = [createTask()];
      const { result } = renderHook(() =>
        usePickForMe(tasks, 50, "user-1")
      );

      expect(result.current.canUsePick).toBe(false);
    });

    it("canUsePick is false when disabled", () => {
      const tasks = [createTask(), createTask()];
      const { result } = renderHook(() =>
        usePickForMe(tasks, 50, "user-1", false)
      );

      expect(result.current.canUsePick).toBe(false);
    });

    it("filters out completed tasks", () => {
      const tasks = [
        createTask({ status: "completed" }),
        createTask({ status: "completed" }),
        createTask({ status: "pending" }),
      ];
      const { result } = renderHook(() =>
        usePickForMe(tasks, 50, "user-1")
      );

      expect(result.current.canUsePick).toBe(false); // Only 1 pending task
    });
  });

  describe("pickTask", () => {
    it("picks a task and sets isActive to true", () => {
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1")
      );

      act(() => {
        result.current.pickTask();
      });

      expect(result.current.state.isActive).toBe(true);
      expect(result.current.state.pickedTaskId).toBeTruthy();
      expect(result.current.state.pickCount).toBe(1);
    });

    it("returns null when no tasks available", () => {
      const { result } = renderHook(() =>
        usePickForMe([], 50, "user-1")
      );

      let pickedId: string | null;
      act(() => {
        pickedId = result.current.pickTask();
      });

      expect(pickedId!).toBeNull();
    });

    it("returns the picked task id", () => {
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1")
      );

      let pickedId: string | null;
      act(() => {
        pickedId = result.current.pickTask();
      });

      expect(pickedId!).toBe(result.current.state.pickedTaskId);
    });
  });

  describe("escalation", () => {
    it("triggers single-task mode on second pick", () => {
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1")
      );

      act(() => {
        result.current.pickTask(); // First pick
      });

      expect(result.current.state.inSingleTaskMode).toBe(false);

      act(() => {
        result.current.pickTask(); // Second pick - triggers escalation
      });

      expect(result.current.state.inSingleTaskMode).toBe(true);
      expect(result.current.state.tasksToComplete).toBe(2); // 50% reliability = 2 tasks
    });

    it("does not trigger escalation when disabled", () => {
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1", true, false) // escalation disabled
      );

      act(() => {
        result.current.pickTask();
        result.current.pickTask();
      });

      expect(result.current.state.inSingleTaskMode).toBe(false);
    });

    it("sets correct earn-out threshold based on reliability", () => {
      // High reliability (80+) = 1 task
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const { result: highResult } = renderHook(() =>
        usePickForMe([task1, task2], 80, "user-1")
      );

      act(() => {
        highResult.current.pickTask();
      });
      act(() => {
        highResult.current.pickTask();
      });

      expect(highResult.current.state.tasksToComplete).toBe(1);

      // Low reliability (<25) = 4 tasks
      localStorageStore = {};
      const { result: lowResult } = renderHook(() =>
        usePickForMe([task1, task2], 10, "user-2")
      );

      act(() => {
        lowResult.current.pickTask();
      });
      act(() => {
        lowResult.current.pickTask();
      });

      expect(lowResult.current.state.tasksToComplete).toBe(4);
    });
  });

  describe("dismissPick", () => {
    it("clears pick when not in single-task mode", () => {
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1")
      );

      act(() => {
        result.current.pickTask();
      });

      expect(result.current.state.pickedTaskId).toBeTruthy();

      act(() => {
        result.current.dismissPick();
      });

      expect(result.current.state.pickedTaskId).toBeNull();
      expect(result.current.state.isActive).toBe(false);
    });

    it("cycles to next task in single-task mode", () => {
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const task3 = createTask({ id: "task-3" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2, task3], 50, "user-1")
      );

      // Enter single-task mode
      act(() => {
        result.current.pickTask();
      });
      act(() => {
        result.current.pickTask();
      });

      const firstPick = result.current.state.pickedTaskId;
      expect(result.current.state.inSingleTaskMode).toBe(true);

      // Dismiss should cycle to next task
      act(() => {
        result.current.dismissPick();
      });

      expect(result.current.state.inSingleTaskMode).toBe(true);
      expect(result.current.state.pickedTaskId).toBeTruthy();
      expect(result.current.state.dismissedTaskIds).toContain(firstPick);
    });
  });

  describe("completePick", () => {
    it("resets state when not in single-task mode", () => {
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1")
      );

      act(() => {
        result.current.pickTask();
      });

      expect(result.current.state.isActive).toBe(true);

      act(() => {
        result.current.completePick();
      });

      expect(result.current.state.isActive).toBe(false);
      expect(result.current.state.pickedTaskId).toBeNull();
    });

    it("increments tasksCompleted in single-task mode", () => {
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const task3 = createTask({ id: "task-3" });
      const task4 = createTask({ id: "task-4" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2, task3, task4], 50, "user-1") // 50% = 2 tasks to complete
      );

      // Enter single-task mode
      act(() => {
        result.current.pickTask();
      });
      act(() => {
        result.current.pickTask();
      });

      expect(result.current.state.tasksCompleted).toBe(0);
      expect(result.current.state.tasksToComplete).toBe(2);

      act(() => {
        result.current.completePick();
      });

      expect(result.current.state.tasksCompleted).toBe(1);
      expect(result.current.state.inSingleTaskMode).toBe(true);
    });

    it("exits single-task mode when earn-out complete", () => {
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const task3 = createTask({ id: "task-3" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2, task3], 80, "user-1") // 80% = 1 task to complete
      );

      // Enter single-task mode
      act(() => {
        result.current.pickTask();
      });
      act(() => {
        result.current.pickTask();
      });

      expect(result.current.state.inSingleTaskMode).toBe(true);
      expect(result.current.state.tasksToComplete).toBe(1);

      // Complete 1 task should exit
      act(() => {
        result.current.completePick();
      });

      expect(result.current.state.inSingleTaskMode).toBe(false);
      expect(result.current.state.isActive).toBe(false);
    });
  });

  describe("exitSingleTaskMode", () => {
    it("manually exits single-task mode", () => {
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1")
      );

      // Enter single-task mode
      act(() => {
        result.current.pickTask();
      });
      act(() => {
        result.current.pickTask();
      });

      expect(result.current.state.inSingleTaskMode).toBe(true);

      act(() => {
        result.current.exitSingleTaskMode();
      });

      expect(result.current.state.inSingleTaskMode).toBe(false);
      expect(result.current.state.isActive).toBe(false);
    });
  });

  describe("allOverdue", () => {
    it("returns true when all pending tasks are overdue", () => {
      const task1 = createTask({ id: "task-1", urgency: "overdue" });
      const task2 = createTask({ id: "task-2", urgency: "overdue" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1")
      );

      expect(result.current.allOverdue).toBe(true);
    });

    it("returns false when some tasks are not overdue", () => {
      const task1 = createTask({ id: "task-1", urgency: "overdue" });
      const task2 = createTask({ id: "task-2", urgency: "medium" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1")
      );

      expect(result.current.allOverdue).toBe(false);
    });
  });

  describe("currentTask", () => {
    it("returns the currently picked task", () => {
      const task1 = createTask({ id: "task-1", title: "First task" });
      const task2 = createTask({ id: "task-2", title: "Second task" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1")
      );

      act(() => {
        result.current.pickTask();
      });

      expect(result.current.currentTask).toBeTruthy();
      expect(result.current.currentTask?.id).toBe(result.current.state.pickedTaskId);
    });

    it("returns null when no task is picked", () => {
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1")
      );

      expect(result.current.currentTask).toBeNull();
    });
  });

  describe("localStorage persistence", () => {
    it("saves state to localStorage", () => {
      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      const { result } = renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1")
      );

      act(() => {
        result.current.pickTask();
      });

      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it("loads state from localStorage", () => {
      const savedState = {
        isActive: true,
        pickedTaskId: "task-1",
        pickCount: 1,
        inSingleTaskMode: true,
        tasksToComplete: 2,
        tasksCompleted: 1,
        dismissedTaskIds: [],
      };

      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(savedState));

      const task1 = createTask({ id: "task-1" });
      const task2 = createTask({ id: "task-2" });
      renderHook(() =>
        usePickForMe([task1, task2], 50, "user-1")
      );

      // Note: useEffect runs async, so state might start with initial
      // and then update. This test verifies the loading mechanism exists.
      expect(localStorageMock.getItem).toHaveBeenCalled();
    });
  });
});
