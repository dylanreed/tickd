// ABOUTME: Card component displaying a single task with fake due date.
// ABOUTME: Adapts styling based on urgency level and theme (hinged/unhinged).

import type { TaskWithFakeDate } from '../types/task'
import { formatTimeRemaining } from '../lib/lieCalculator'

interface TaskCardProps {
  task: TaskWithFakeDate
  onComplete: (taskId: string) => void
  onDelete?: (taskId: string) => void
  theme: 'hinged' | 'unhinged'
}

const urgencyStyles = {
  hinged: {
    low: 'border-mint bg-cloud',
    medium: 'border-golden bg-peach/30',
    high: 'border-coral bg-peach/50',
    critical: 'border-hot-pink bg-peach',
    overdue: 'border-hot-pink bg-hot-pink/20',
  },
  unhinged: {
    low: 'border-mint bg-cloud',
    medium: 'border-golden bg-peach/30',
    high: 'border-coral bg-peach/50 animate-pulse',
    critical: 'border-hot-pink bg-hot-pink/30 animate-pulse',
    overdue: 'border-hot-pink bg-hot-pink/40 animate-bounce',
  },
}

const urgencyMessages = {
  hinged: {
    low: '',
    medium: '',
    high: '',
    critical: 'Due soon',
    overdue: 'Overdue',
  },
  unhinged: {
    low: '',
    medium: 'tick tock',
    high: 'WHY ARE YOU READING THIS GO DO IT',
    critical: 'PANIC MODE ACTIVATED',
    overdue: 'YOU ABSOLUTE GREMLIN',
  },
}

export default function TaskCard({ task, onComplete, onDelete, theme }: TaskCardProps) {
  const timeRemaining = formatTimeRemaining(task.fake_due_date)
  const urgencyStyle = urgencyStyles[theme][task.urgency]
  const urgencyMessage = urgencyMessages[theme][task.urgency]

  if (task.status === 'completed') {
    return null // Completed tasks handled separately
  }

  return (
    <div className={`rounded-2xl border-2 p-4 ${urgencyStyle} transition-all`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-charcoal truncate">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-dusty-purple mt-1 line-clamp-2">{task.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-sm font-medium ${task.urgency === 'overdue' ? 'text-hot-pink' : 'text-charcoal'}`}>
              {timeRemaining === 'overdue' ? 'OVERDUE' : `Due in ${timeRemaining}`}
            </span>
            {task.category && (
              <span className="text-xs px-2 py-0.5 bg-lavender text-dusty-purple rounded-full">
                {task.category}
              </span>
            )}
          </div>
          {urgencyMessage && (
            <p className={`text-xs mt-1 ${theme === 'unhinged' ? 'font-bold text-hot-pink' : 'text-dusty-purple'}`}>
              {urgencyMessage}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onComplete(task.id)}
            aria-label="Complete task"
            className="px-4 py-2 text-sm bg-mint text-charcoal font-bold rounded-full hover:bg-mint/80 transition-colors"
          >
            {theme === 'unhinged' ? 'DONE (finally)' : 'Complete'}
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
              className="px-4 py-2 text-sm bg-lavender text-dusty-purple font-medium rounded-full hover:bg-lavender/80 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
