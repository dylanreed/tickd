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
    low: 'border-gray-200 bg-white',
    medium: 'border-amber-200 bg-amber-50',
    high: 'border-orange-300 bg-orange-50',
    critical: 'border-red-300 bg-red-50',
    overdue: 'border-red-500 bg-red-100',
  },
  unhinged: {
    low: 'border-gray-300 bg-white',
    medium: 'border-yellow-400 bg-yellow-50',
    high: 'border-orange-500 bg-orange-100 animate-pulse',
    critical: 'border-red-600 bg-red-200 animate-pulse',
    overdue: 'border-red-700 bg-red-300 animate-bounce',
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
    <div className={`rounded-lg border-2 p-4 ${urgencyStyle} transition-all`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-sm font-medium ${task.urgency === 'overdue' ? 'text-red-700' : 'text-gray-700'}`}>
              {timeRemaining === 'overdue' ? 'OVERDUE' : `Due in ${timeRemaining}`}
            </span>
            {task.category && (
              <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full">
                {task.category}
              </span>
            )}
          </div>
          {urgencyMessage && (
            <p className={`text-xs mt-1 ${theme === 'unhinged' ? 'font-bold text-red-600' : 'text-gray-500'}`}>
              {urgencyMessage}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onComplete(task.id)}
            aria-label="Complete task"
            className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            {theme === 'unhinged' ? 'DONE (finally)' : 'Complete'}
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
              className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
