// ABOUTME: Card component displaying a single task with fake due date.
// ABOUTME: Adapts styling based on urgency level and theme (hinged/unhinged).

import { useEffect, useRef, useState } from 'react'
import type { TaskWithFakeDate } from '../types/task'
import { formatTimeRemaining } from '../lib/lieCalculator'

interface TaskCardProps {
  task: TaskWithFakeDate
  onComplete: (taskId: string) => void
  onDelete?: (taskId: string) => void
  onExcuse?: (taskId: string) => void
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

export default function TaskCard({ task, onComplete, onDelete, onExcuse, theme }: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const timeRemaining = formatTimeRemaining(task.fake_due_date)
  const urgencyStyle = urgencyStyles[theme][task.urgency]
  const urgencyMessage = urgencyMessages[theme][task.urgency]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  if (task.status === 'completed') {
    return null // Completed tasks handled separately
  }

  const isHinged = theme === 'hinged'
  const hasMenuItems = onDelete || onExcuse

  const handleExcuse = () => {
    if (onExcuse) {
      onExcuse(task.id)
    }
    setMenuOpen(false)
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id)
    }
    setMenuOpen(false)
  }

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
        <div className="flex gap-2 items-center">
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
          {hasMenuItems && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Task options"
                aria-expanded={menuOpen}
                className={`p-2 transition-colors ${
                  isHinged
                    ? 'text-hinged-text-secondary hover:text-hinged-text rounded-md hover:bg-gray-100'
                    : 'text-dusty-purple hover:text-charcoal rounded-full hover:bg-lavender/50'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              {menuOpen && (
                <div
                  role="menu"
                  className={`absolute right-0 top-full mt-1 min-w-[160px] py-1 z-50 shadow-lg ${
                    isHinged
                      ? 'bg-white border border-gray-200 rounded-md'
                      : 'bg-cloud border-2 border-lavender rounded-xl'
                  }`}
                >
                  {onExcuse && (
                    <button
                      role="menuitem"
                      onClick={handleExcuse}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        isHinged
                          ? 'text-hinged-text hover:bg-gray-100'
                          : 'text-charcoal hover:bg-lavender/30 font-medium'
                      }`}
                    >
                      {isHinged ? 'Make an excuse...' : 'Make an excuse... (we get it)'}
                    </button>
                  )}
                  {onDelete && (
                    <button
                      role="menuitem"
                      onClick={handleDelete}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        isHinged
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-hot-pink hover:bg-hot-pink/10 font-medium'
                      }`}
                    >
                      {isHinged ? 'Delete task' : 'Delete task (yeet it)'}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
