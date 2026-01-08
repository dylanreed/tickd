// ABOUTME: Tick mascot component that lives in the corner of the app.
// ABOUTME: Shows contextual expressions and displays quips on tap.

import { useState, useCallback, useRef } from 'react'
import { getRandomQuip, determineContext, type AppContext } from '../data/tickQuips'

// Import mascot images
import neutralImg from '../assets/tick/neutral.png'
import shiftyImg from '../assets/tick/shifty.png'
import disappointedImg from '../assets/tick/disappointed.png'
import evilImg from '../assets/tick/evil.png'
import celebrateImg from '../assets/tick/celebrate.png'

interface TickProps {
  totalTasks: number
  completedTasks: number
  overdueTasks: number
  approachingTasks: number
  spicyLevel?: number
  justCompleted?: boolean
  justRevealed?: boolean
  userName?: string
  onLongPress?: () => void
}

type TickExpression = 'neutral' | 'shifty' | 'disappointed' | 'evil' | 'celebrate'

const expressionImages: Record<TickExpression, string> = {
  neutral: neutralImg,
  shifty: shiftyImg,
  disappointed: disappointedImg,
  evil: evilImg,
  celebrate: celebrateImg,
}

function getExpressionForContext(context: AppContext): TickExpression {
  switch (context) {
    case 'all_complete':
    case 'just_completed':
    case 'after_reveal':
      return 'celebrate'
    case 'no_tasks':
    case 'on_track':
      return 'neutral'
    case 'approaching_deadline':
      return 'shifty'
    case 'overdue_mild':
      return 'disappointed'
    case 'overdue_medium':
    case 'overdue_spicy':
      return 'evil'
    default:
      return 'neutral'
  }
}

export default function Tick({
  totalTasks,
  completedTasks,
  overdueTasks,
  approachingTasks,
  spicyLevel = 3,
  justCompleted = false,
  justRevealed = false,
  userName,
  onLongPress,
}: TickProps) {
  const [quip, setQuip] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isLongPress = useRef(false)

  const context = determineContext(
    totalTasks,
    completedTasks,
    overdueTasks,
    approachingTasks,
    spicyLevel,
    justCompleted,
    justRevealed
  )

  const expression = getExpressionForContext(context)
  const imageSrc = expressionImages[expression]

  const showQuip = useCallback(() => {
    const newQuip = getRandomQuip(context, userName)
    setQuip(newQuip)
    setIsAnimating(true)

    // Hide quip after 4 seconds
    setTimeout(() => {
      setQuip(null)
      setIsAnimating(false)
    }, 4000)
  }, [context, userName])

  const handleTouchStart = useCallback(() => {
    isLongPress.current = false
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true
      if (onLongPress) {
        onLongPress()
      }
    }, 500)
  }, [onLongPress])

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
    if (!isLongPress.current) {
      showQuip()
    }
  }, [showQuip])

  const handleClick = useCallback(() => {
    // For mouse clicks (desktop)
    showQuip()
  }, [showQuip])

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      {/* Speech Bubble */}
      {quip && (
        <div className="bg-cloud rounded-2xl px-4 py-3 shadow-lg max-w-[250px] animate-bounce-in relative">
          <p className="text-charcoal text-sm font-medium">{quip}</p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-cloud rotate-45 transform" />
        </div>
      )}

      {/* Tick */}
      <button
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={() => {
          if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
          }
        }}
        className={`
          w-16 h-16 md:w-20 md:h-20
          rounded-full
          overflow-hidden
          shadow-lg
          transition-transform
          hover:scale-110
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-hot-pink focus:ring-offset-2
          ${isAnimating ? 'animate-bounce' : ''}
        `}
        aria-label="Tick the mascot - tap for a message"
        title="Tap me!"
      >
        <img
          src={imageSrc}
          alt={`Tick looking ${expression}`}
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  )
}
