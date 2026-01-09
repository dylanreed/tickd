// ABOUTME: Modal for entering excuses when snoozing a task.
// ABOUTME: Requires min 10 chars and shows Tick looking skeptical.

import { useState } from 'react'
import TickSprite from './TickSprite'

interface ExcuseModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (excuse: string) => Promise<{ success: boolean; error?: string }>
  taskTitle: string
}

const MIN_EXCUSE_LENGTH = 10

const placeholderExcuses = [
  'My dog ate my productivity...',
  'Mercury is in retrograde...',
  'I was doing important research (scrolling)...',
  'My cat needed attention...',
  'The wifi was being weird...',
  'I got distracted by a really good podcast...',
  'The vibes were off...',
  'I needed a mental health moment...',
]

// Returns a stable placeholder index based on current time (changes roughly every second)
function getPlaceholderIndex(): number {
  return Math.floor(Date.now() / 1000) % placeholderExcuses.length
}

interface ExcuseModalContentProps {
  onClose: () => void
  onSubmit: (excuse: string) => Promise<{ success: boolean; error?: string }>
  taskTitle: string
}

function ExcuseModalContent({ onClose, onSubmit, taskTitle }: ExcuseModalContentProps) {
  const [excuse, setExcuse] = useState('')
  // Placeholder is determined once when the component mounts (modal opens)
  const [placeholder] = useState(() => placeholderExcuses[getPlaceholderIndex()])
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isValid = excuse.length >= MIN_EXCUSE_LENGTH
  const charsRemaining = MIN_EXCUSE_LENGTH - excuse.length

  const handleSubmit = async () => {
    if (isValid && !isSubmitting) {
      setIsSubmitting(true)
      setError(null)
      const result = await onSubmit(excuse)
      setIsSubmitting(false)
      if (!result.success) {
        setError(result.error || 'Failed to save excuse')
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && isValid && !isSubmitting) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="fixed inset-0 bg-charcoal/60 flex items-center justify-center p-4 z-50 font-body">
      <div className="bg-cloud rounded-2xl shadow-xl max-w-md w-full p-8">
        {/* Tick */}
        <div className="mx-auto mb-4 flex justify-center">
          <TickSprite expression="skeptical" size="lg" />
        </div>

        <h2 className="font-pixel text-lg text-charcoal text-center mb-2">
          WHAT'S YOUR EXCUSE?
        </h2>

        {/* Task being excused */}
        <p className="text-center text-dusty-purple mb-4">
          For: <span className="font-bold text-charcoal">{taskTitle}</span>
        </p>

        {/* Reprieve hint */}
        <div className="bg-lavender/50 rounded-xl p-3 mb-4 text-center">
          <p className="text-sm text-dusty-purple">
            A convincing excuse buys you <span className="font-bold text-charcoal">+6 hours</span> reprieve
          </p>
        </div>

        {/* Textarea */}
        <div className="mb-4">
          <textarea
            aria-label="Enter your excuse"
            value={excuse}
            onChange={(e) => setExcuse(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full h-24 p-3 rounded-xl border-2 border-lavender focus:border-hot-pink focus:outline-none resize-none text-charcoal placeholder:text-dusty-purple/50"
          />

          {/* Error message */}
          {error && (
            <p className="text-sm text-coral mt-1">{error}</p>
          )}

          {/* Character count */}
          <div className="flex justify-between items-center mt-1">
            <span className={`text-sm ${isValid ? 'text-dusty-purple' : 'text-coral'}`}>
              {excuse.length}/{MIN_EXCUSE_LENGTH}
              {!isValid && charsRemaining > 0 && (
                <span className="ml-1">
                  (at least {charsRemaining} more)
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-lavender text-charcoal font-bold rounded-full hover:bg-peach transition-colors"
          >
            Never mind, I'll do it
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="flex-1 px-6 py-3 bg-hot-pink text-cloud font-bold rounded-full hover:bg-coral transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : "Fine, I'll believe you"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ExcuseModal({ isOpen, onClose, onSubmit, taskTitle }: ExcuseModalProps) {
  // Conditionally render content to ensure fresh state on each open
  if (!isOpen) return null

  return (
    <ExcuseModalContent
      onClose={onClose}
      onSubmit={onSubmit}
      taskTitle={taskTitle}
    />
  )
}
