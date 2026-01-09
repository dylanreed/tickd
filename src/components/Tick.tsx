// ABOUTME: Tick mascot component that lives in the corner of the app.
// ABOUTME: Shows contextual expressions and displays quips on tap.

import { useState, useCallback, useRef } from 'react'
import { getRandomQuip, determineContext, type AppContext } from '../data/tickQuips'

// Import sprite sheets at appropriate sizes for display
import coreSprites128 from '../assets/tick/sprites/core_expressions_128.png'
import secondarySprites128 from '../assets/tick/sprites/secondary_expressions_128.png'

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

// Core expressions (sheet 1, positions 0-9)
// idle, happy, suspicious, concerned, disappointed, judgmental, unhinged, celebrating, shocked, smug
type CoreExpression = 'idle' | 'happy' | 'suspicious' | 'concerned' | 'disappointed' | 'judgmental' | 'unhinged' | 'celebrating' | 'shocked' | 'smug'

// Secondary expressions (sheet 2, positions 0-9)
// eager, scheming, relaxed, confused, apologetic, pleading, skeptical, annoyed, waving, tapping_foot
type SecondaryExpression = 'eager' | 'scheming' | 'relaxed' | 'confused' | 'apologetic' | 'pleading' | 'skeptical' | 'annoyed' | 'waving' | 'tapping_foot'

type TickExpression = CoreExpression | SecondaryExpression

const coreExpressionIndex: Record<CoreExpression, number> = {
  idle: 0,
  happy: 1,
  suspicious: 2,
  concerned: 3,
  disappointed: 4,
  judgmental: 5,
  unhinged: 6,
  celebrating: 7,
  shocked: 8,
  smug: 9,
}

const secondaryExpressionIndex: Record<SecondaryExpression, number> = {
  eager: 0,
  scheming: 1,
  relaxed: 2,
  confused: 3,
  apologetic: 4,
  pleading: 5,
  skeptical: 6,
  annoyed: 7,
  waving: 8,
  tapping_foot: 9,
}

function isCoreExpression(expr: TickExpression): expr is CoreExpression {
  return expr in coreExpressionIndex
}

function getExpressionForContext(context: AppContext): TickExpression {
  switch (context) {
    case 'all_complete':
    case 'just_completed':
      return 'celebrating'
    case 'after_reveal':
      return 'smug'
    case 'no_tasks':
      return 'relaxed'
    case 'on_track':
      return 'idle'
    case 'approaching_deadline':
      return 'suspicious'
    case 'overdue_mild':
      return 'disappointed'
    case 'overdue_medium':
      return 'judgmental'
    case 'overdue_spicy':
      return 'unhinged'
    default:
      return 'idle'
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

  // Get sprite sheet and position for current expression
  const isCore = isCoreExpression(expression)
  const spriteSheet = isCore ? coreSprites128 : secondarySprites128
  const spriteIndex = isCore
    ? coreExpressionIndex[expression]
    : secondaryExpressionIndex[expression as SecondaryExpression]
  // Each frame is 1/10 of the sheet, position as percentage of (imageWidth - containerWidth)
  const backgroundPositionX = `${spriteIndex * -11.111}%`

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
          w-20 h-20 md:w-24 md:h-24
          transition-transform
          hover:scale-110
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-hot-pink focus:ring-offset-2
          ${isAnimating ? 'animate-bounce' : ''}
        `}
        aria-label="Tick the mascot - tap for a message"
        title="Tap me!"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${spriteSheet})`,
            backgroundSize: '1000% 100%',
            backgroundPosition: `${backgroundPositionX} center`,
          }}
          role="img"
          aria-label={`Tick looking ${expression}`}
        />
      </button>
    </div>
  )
}
