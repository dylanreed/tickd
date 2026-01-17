// ABOUTME: Hook for Pick For Me feature state and actions.
// ABOUTME: Manages selection, escalation, and single-task mode.

import { useState, useCallback, useEffect } from "react";
import type { TaskWithFakeDate } from "../types/task";
import {
  pickTask,
  areAllTasksOverdue,
  getEarnOutThreshold,
} from "../lib/pickForMe";

const STORAGE_KEY_PREFIX = "tickd-pick-for-me";

export interface PickForMeState {
  isActive: boolean;
  pickedTaskId: string | null;
  pickCount: number;
  inSingleTaskMode: boolean;
  tasksToComplete: number;
  tasksCompleted: number;
  dismissedTaskIds: string[];
}

export interface UsePickForMeReturn {
  state: PickForMeState;
  pickTask: () => string | null;
  dismissPick: () => string | null;
  completePick: () => void;
  exitSingleTaskMode: () => void;
  resetState: () => void;
  canUsePick: boolean;
  allOverdue: boolean;
  currentTask: TaskWithFakeDate | null;
}

const initialState: PickForMeState = {
  isActive: false,
  pickedTaskId: null,
  pickCount: 0,
  inSingleTaskMode: false,
  tasksToComplete: 0,
  tasksCompleted: 0,
  dismissedTaskIds: [],
};

function getStorageKey(userId: string): string {
  return `${STORAGE_KEY_PREFIX}-${userId}`;
}

function loadState(userId: string): PickForMeState {
  try {
    const stored = localStorage.getItem(getStorageKey(userId));
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...initialState, ...parsed };
    }
  } catch {
    // Ignore localStorage errors
  }
  return initialState;
}

function saveState(userId: string, state: PickForMeState): void {
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(state));
  } catch {
    // Ignore localStorage errors
  }
}

export function usePickForMe(
  tasks: TaskWithFakeDate[],
  reliabilityScore: number,
  userId: string | null,
  enabled: boolean = true,
  escalationEnabled: boolean = true
): UsePickForMeReturn {
  const [state, setState] = useState<PickForMeState>(initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    if (userId) {
      setState(loadState(userId));
    }
  }, [userId]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (userId && state !== initialState) {
      saveState(userId, state);
    }
  }, [userId, state]);

  // Filter to pending tasks only
  const pendingTasks = tasks.filter((t) => t.status === "pending");

  // Check if all tasks are overdue
  const allOverdue = areAllTasksOverdue(pendingTasks);

  // Can only use pick if enabled and 2+ pending tasks
  const canUsePick = enabled && pendingTasks.length >= 2 && !state.inSingleTaskMode;

  // Get current task if one is picked
  const currentTask =
    state.pickedTaskId
      ? pendingTasks.find((t) => t.id === state.pickedTaskId) || null
      : null;

  // Pick a task
  const handlePickTask = useCallback((): string | null => {
    if (!enabled || pendingTasks.length === 0) return null;

    // Check if this is second pick (escalation trigger)
    const isSecondPick = state.pickCount === 1 && state.pickedTaskId !== null;

    // Pick a new task, excluding already dismissed ones
    const picked = pickTask(pendingTasks, undefined, state.dismissedTaskIds);
    if (!picked) return null;

    if (isSecondPick && escalationEnabled) {
      // Trigger escalation to single-task mode
      const threshold = getEarnOutThreshold(reliabilityScore);
      setState((prev) => ({
        ...prev,
        isActive: true,
        pickedTaskId: picked.id,
        pickCount: prev.pickCount + 1,
        inSingleTaskMode: true,
        tasksToComplete: threshold,
        tasksCompleted: 0,
        dismissedTaskIds: [], // Reset dismissed on escalation
      }));
    } else {
      // Normal pick
      setState((prev) => ({
        ...prev,
        isActive: true,
        pickedTaskId: picked.id,
        pickCount: prev.pickCount + 1,
      }));
    }

    return picked.id;
  }, [enabled, escalationEnabled, pendingTasks, state, reliabilityScore]);

  // Dismiss current pick (in single-task mode, cycle to next)
  const handleDismissPick = useCallback((): string | null => {
    if (!state.pickedTaskId) return null;

    if (state.inSingleTaskMode) {
      // In single-task mode, dismissing cycles to next task
      const newDismissed = [...state.dismissedTaskIds, state.pickedTaskId];

      // Pick next task, excluding dismissed ones
      const nextTask = pickTask(pendingTasks, undefined, newDismissed);

      if (!nextTask) {
        // All tasks dismissed, reset dismissed list and pick again
        const freshPick = pickTask(pendingTasks);
        setState((prev) => ({
          ...prev,
          pickedTaskId: freshPick?.id || null,
          dismissedTaskIds: [],
        }));
        return freshPick?.id || null;
      }

      setState((prev) => ({
        ...prev,
        pickedTaskId: nextTask.id,
        dismissedTaskIds: newDismissed,
      }));
      return nextTask.id;
    } else {
      // Not in single-task mode, just clear the pick
      setState((prev) => ({
        ...prev,
        isActive: false,
        pickedTaskId: null,
        pickCount: 0,
      }));
      return null;
    }
  }, [state, pendingTasks]);

  // Complete the current pick
  const handleCompletePick = useCallback((): void => {
    if (!state.pickedTaskId) return;

    if (state.inSingleTaskMode) {
      const newCompleted = state.tasksCompleted + 1;
      const isEarnOutComplete = newCompleted >= state.tasksToComplete;

      if (isEarnOutComplete) {
        // Exit single-task mode
        setState((prev) => ({
          ...prev,
          isActive: false,
          pickedTaskId: null,
          pickCount: 0,
          inSingleTaskMode: false,
          tasksToComplete: 0,
          tasksCompleted: 0,
          dismissedTaskIds: [],
        }));
      } else {
        // Pick next task in single-task mode
        const nextTask = pickTask(
          pendingTasks.filter((t) => t.id !== state.pickedTaskId),
          undefined,
          state.dismissedTaskIds
        );

        setState((prev) => ({
          ...prev,
          tasksCompleted: newCompleted,
          pickedTaskId: nextTask?.id || null,
          dismissedTaskIds: [],
        }));
      }
    } else {
      // Not in single-task mode, just reset
      setState((prev) => ({
        ...prev,
        isActive: false,
        pickedTaskId: null,
        pickCount: 0,
      }));
    }
  }, [state, pendingTasks]);

  // Manually exit single-task mode (for settings toggle or admin)
  const handleExitSingleTaskMode = useCallback((): void => {
    setState(initialState);
    if (userId) {
      localStorage.removeItem(getStorageKey(userId));
    }
  }, [userId]);

  // Reset all state
  const handleResetState = useCallback((): void => {
    setState(initialState);
    if (userId) {
      localStorage.removeItem(getStorageKey(userId));
    }
  }, [userId]);

  return {
    state,
    pickTask: handlePickTask,
    dismissPick: handleDismissPick,
    completePick: handleCompletePick,
    exitSingleTaskMode: handleExitSingleTaskMode,
    resetState: handleResetState,
    canUsePick,
    allOverdue,
    currentTask,
  };
}
