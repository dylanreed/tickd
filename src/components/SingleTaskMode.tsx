// ABOUTME: Full-view replacement showing one task at a time.
// ABOUTME: User must complete tasks to unlock full list (earn-out).

import { formatTimeRemaining } from "../lib/lieCalculator";
import type { SpicyLevel } from "../data/pickForMeMessages";
import type { TaskWithFakeDate } from "../types/task";
import Tick from "./Tick";

interface SingleTaskModeProps {
  task: TaskWithFakeDate;
  tasksRemaining: number;
  totalRequired: number;
  tasksCompleted: number;
  onComplete: () => void;
  onDismiss: () => void;
  theme: "hinged" | "unhinged";
  spicyLevel: SpicyLevel;
  userName?: string;
  totalTasks: number;
  overdueTasks: number;
  showProgress?: boolean;
}

export default function SingleTaskMode({
  task,
  tasksRemaining,
  totalRequired,
  tasksCompleted,
  onComplete,
  onDismiss,
  theme,
  spicyLevel,
  userName,
  totalTasks,
  overdueTasks,
  showProgress = true,
}: SingleTaskModeProps) {
  const isHinged = theme === "hinged";
  const timeRemaining = formatTimeRemaining(task.fake_due_date);
  const isOverdue = task.urgency === "overdue";

  // Progress bar percentage
  const progressPercent = (tasksCompleted / totalRequired) * 100;

  return (
    <div
      className={`min-h-screen font-body ${
        isHinged ? "bg-hinged-bg" : "bg-lavender"
      }`}
    >
      {/* Header */}
      <header
        className={`shadow-sm sticky top-0 z-10 ${
          isHinged
            ? "bg-hinged-card border-b border-hinged-border"
            : "bg-cloud"
        }`}
      >
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1
            className={`text-center ${
              isHinged
                ? "font-medium text-hinged-text"
                : "font-pixel text-sm text-charcoal"
            }`}
          >
            {isHinged ? "Focus Mode" : "SINGLE-TASK MODE"}
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress indicator - only show if showProgress is true */}
        {showProgress && (
          <div
            className={`rounded-xl p-4 mb-6 ${
              isHinged ? "bg-hinged-card border border-hinged-border" : "bg-cloud"
            }`}
          >
            <p
              className={`text-center text-sm mb-2 ${
                isHinged ? "text-hinged-text-secondary" : "text-dusty-purple"
              }`}
            >
              {isHinged
                ? `Complete ${tasksRemaining} more task${tasksRemaining > 1 ? "s" : ""} to unlock your list`
                : `${tasksRemaining} task${tasksRemaining > 1 ? "s" : ""} until FREEDOM`}
            </p>
            {/* Progress bar */}
            <div
              className={`h-2 rounded-full overflow-hidden ${
                isHinged ? "bg-gray-200" : "bg-lavender"
              }`}
            >
              <div
                className={`h-full transition-all duration-500 ${
                  isHinged ? "bg-hinged-accent" : "bg-mint"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p
              className={`text-center text-xs mt-1 ${
                isHinged ? "text-hinged-text-secondary" : "text-dusty-purple"
              }`}
            >
              {tasksCompleted} / {totalRequired}
            </p>
          </div>
        )}

        {/* Task card - enlarged and centered */}
        <div
          className={`rounded-2xl p-6 mb-6 ${
            isHinged
              ? "bg-hinged-card border-2 border-hinged-accent shadow-lg"
              : isOverdue
              ? "bg-hot-pink/20 border-4 border-hot-pink animate-pulse"
              : "bg-cloud border-4 border-mint shadow-xl"
          }`}
        >
          {/* Task title */}
          <h2
            className={`text-xl font-bold mb-2 ${
              isHinged ? "text-hinged-text" : "text-charcoal"
            }`}
          >
            {task.title}
          </h2>

          {/* Task description */}
          {task.description && (
            <p
              className={`mb-4 ${
                isHinged ? "text-hinged-text-secondary" : "text-dusty-purple"
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Due date */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`text-sm font-medium ${
                isOverdue
                  ? isHinged
                    ? "text-red-600"
                    : "text-hot-pink"
                  : isHinged
                  ? "text-hinged-text-secondary"
                  : "text-charcoal"
              }`}
            >
              {timeRemaining === "overdue"
                ? isHinged
                  ? "Overdue"
                  : "OVERDUE"
                : `Due in ${timeRemaining}`}
            </span>
            {task.category && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isHinged
                    ? "bg-gray-100 text-hinged-text-secondary"
                    : "bg-lavender text-dusty-purple"
                }`}
              >
                {task.category}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onComplete}
              className={`flex-1 py-4 font-bold text-lg transition-colors ${
                isHinged
                  ? "bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover"
                  : "bg-mint text-charcoal rounded-full hover:bg-mint/80"
              }`}
            >
              {isHinged ? "Done" : "DONE (finally)"}
            </button>
            <button
              onClick={onDismiss}
              className={`flex-1 py-4 font-bold text-lg transition-colors ${
                isHinged
                  ? "bg-gray-100 text-hinged-text rounded-md hover:bg-gray-200"
                  : "bg-lavender text-dusty-purple rounded-full hover:bg-peach"
              }`}
            >
              {isHinged ? "Can't right now" : "can't rn"}
            </button>
          </div>
        </div>

        {/* Dismissal message area - shows when task is dismissed */}
        <div
          className={`text-center text-sm ${
            isHinged ? "text-hinged-text-secondary" : "text-dusty-purple"
          }`}
        >
          {isHinged
            ? "Skipping a task doesn't count toward unlocking your list."
            : "skipping doesn't help you escape btw"}
        </div>
      </main>

      {/* Tick in the corner */}
      <Tick
        totalTasks={totalTasks}
        completedTasks={0}
        overdueTasks={overdueTasks}
        approachingTasks={0}
        spicyLevel={spicyLevel}
        userName={userName}
      />
    </div>
  );
}
