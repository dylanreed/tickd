// ABOUTME: Displays warmup task queue during momentum building.
// ABOUTME: Shows progress toward streak goal and target task.

import TickSprite from './TickSprite'
import type { Task } from '../types/task'
import { getMomentumMessage } from '../data/momentumMessages'
import type { SpicyLevel } from '../data/momentumMessages'

interface WarmupQueueProps {
  warmupTasks: Task[]
  completedCount: number
  requiredCount: number
  targetTaskTitle: string
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
  onTaskClick: (taskId: string) => void
  onSkipToTarget: () => void
  onCancel: () => void
}

export default function WarmupQueue({
  warmupTasks,
  completedCount,
  requiredCount,
  targetTaskTitle,
  spicyLevel,
  theme,
  onTaskClick,
  onSkipToTarget,
  onCancel,
}: WarmupQueueProps) {
  const isHinged = theme === 'hinged'
  const remaining = Math.max(0, requiredCount - completedCount)

  // Get progress message
  const message = completedCount > 0
    ? getMomentumMessage('streak_progress', spicyLevel, remaining)
    : getMomentumMessage('warmup_offer', spicyLevel)

  if (isHinged) {
    return (
      <div className="bg-hinged-card border border-hinged-border rounded-lg p-4 mb-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <TickSprite expression={completedCount > 0 ? 'happy' : 'eager'} size="sm" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-hinged-text-secondary uppercase tracking-wide">
                Warmup Mode
              </span>
              <button
                onClick={onCancel}
                className="text-xs text-hinged-text-secondary hover:text-hinged-text"
              >
                Cancel
              </button>
            </div>
            <p className="text-sm text-hinged-text">{message}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-hinged-bg rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-hinged-accent transition-all duration-500"
            style={{ width: `${(completedCount / requiredCount) * 100}%` }}
          />
        </div>

        {/* Warmup tasks */}
        {warmupTasks.length > 0 && (
          <div className="space-y-2 mb-4">
            <p className="text-xs text-hinged-text-secondary uppercase tracking-wide">
              Quick wins ({remaining} to go)
            </p>
            {warmupTasks.map(task => (
              <button
                key={task.id}
                onClick={() => onTaskClick(task.id)}
                className="w-full text-left p-2 rounded border border-hinged-border hover:border-hinged-accent hover:bg-hinged-bg transition-colors"
              >
                <span className="text-sm text-hinged-text">{task.title}</span>
                {task.estimated_minutes && (
                  <span className="ml-2 text-xs text-hinged-text-secondary">
                    ~{task.estimated_minutes}min
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Target task */}
        <div className="pt-3 border-t border-hinged-border">
          <p className="text-xs text-hinged-text-secondary uppercase tracking-wide mb-1">
            Then tackle
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-hinged-text truncate">
              {targetTaskTitle}
            </span>
            <button
              onClick={onSkipToTarget}
              className="text-xs text-hinged-accent hover:text-hinged-accent-hover"
            >
              Skip to this
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="bg-clock-ivory border-3 border-clock-black p-4 shadow-[4px_4px_0_0_#1c1917] mb-4">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <TickSprite expression={completedCount > 0 ? 'happy' : 'eager'} size="sm" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-pixel text-clock-brass uppercase">
              WARMUP MODE
            </span>
            <button
              onClick={onCancel}
              className="text-xs font-mono text-dusty-purple hover:text-hot-pink"
            >
              CANCEL
            </button>
          </div>
          <p className="text-sm font-mono text-charcoal">{message}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-clock-parchment border-2 border-clock-black overflow-hidden mb-4">
        <div
          className="h-full bg-mint transition-all duration-500"
          style={{ width: `${(completedCount / requiredCount) * 100}%` }}
        />
      </div>

      {/* Warmup tasks */}
      {warmupTasks.length > 0 && (
        <div className="space-y-2 mb-4">
          <p className="text-xs font-pixel text-clock-brass uppercase">
            QUICK WINS ({remaining} TO GO)
          </p>
          {warmupTasks.map(task => (
            <button
              key={task.id}
              onClick={() => onTaskClick(task.id)}
              className="w-full text-left p-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-cloud shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <span>{task.title}</span>
              {task.estimated_minutes && (
                <span className="ml-2 text-clock-brass">
                  ~{task.estimated_minutes}m
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Target task */}
      <div className="pt-3 border-t-2 border-clock-black">
        <p className="text-xs font-pixel text-clock-brass uppercase mb-1">
          THEN CRUSH
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-clock-black truncate">
            {targetTaskTitle}
          </span>
          <button
            onClick={onSkipToTarget}
            className="text-xs font-mono text-hot-pink hover:text-dusty-purple"
          >
            SKIP →
          </button>
        </div>
      </div>
    </div>
  )
}
