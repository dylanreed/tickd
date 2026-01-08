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
    low: 'border-hinged-border bg-hinged-card',
    medium: 'border-hinged-border bg-hinged-card',
    high: 'border-hinged-border bg-hinged-card',
    critical: 'border-hinged-border bg-hinged-card',
    overdue: 'border-hinged-border bg-hinged-card',
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

  const isHinged = theme === 'hinged'

  return (
    <div className={`${isHinged ? 'rounded-lg' : 'rounded-2xl'} border-2 p-4 ${urgencyStyle} transition-all`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className={`truncate ${isHinged ? 'font-medium text-hinged-text' : 'font-bold text-charcoal'}`}>{task.title}</h3>
          {task.description && (
            <p className={`text-sm mt-1 line-clamp-2 ${isHinged ? 'text-hinged-text-secondary' : 'text-dusty-purple'}`}>{task.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-sm font-medium ${
              task.urgency === 'overdue'
                ? (isHinged ? 'text-red-600' : 'text-hot-pink')
                : (isHinged ? 'text-hinged-text-secondary' : 'text-charcoal')
            }`}>
              {timeRemaining === 'overdue' ? (isHinged ? 'Overdue' : 'OVERDUE') : `Due in ${timeRemaining}`}
            </span>
            {task.category && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isHinged ? 'bg-gray-100 text-hinged-text-secondary' : 'bg-lavender text-dusty-purple'
              }`}>
                {task.category}
              </span>
            )}
          </div>
          {urgencyMessage && (
            <p className={`text-xs mt-1 ${theme === 'unhinged' ? 'font-bold text-hot-pink' : 'text-hinged-text-secondary'}`}>
              {urgencyMessage}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onComplete(task.id)}
            aria-label="Complete task"
            className={`px-4 py-2 text-sm font-bold transition-colors ${
              isHinged
                ? 'bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover'
                : 'bg-mint text-charcoal rounded-full hover:bg-mint/80'
            }`}
          >
            {theme === 'unhinged' ? 'DONE (finally)' : 'Complete'}
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isHinged
                  ? 'bg-gray-100 text-hinged-text-secondary rounded-md hover:bg-gray-200'
                  : 'bg-lavender text-dusty-purple rounded-full hover:bg-lavender/80'
              }`}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
