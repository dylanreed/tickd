// ABOUTME: Toast notification for time passing alerts.
// ABOUTME: Auto-dismisses after 5 seconds, can be manually dismissed.

import { useState, useEffect } from 'react'
import TickSprite from './TickSprite'

interface TimeAlertToastProps {
  message: string
  type: 'milestone' | 'estimate'
  theme: 'hinged' | 'unhinged'
  onDismiss: () => void
  autoDismissMs?: number
}

export default function TimeAlertToast({
  message,
  type,
  theme,
  onDismiss,
  autoDismissMs = 5000,
}: TimeAlertToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const isHinged = theme === 'hinged'

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss()
    }, autoDismissMs)

    return () => clearTimeout(timer)
  }, [autoDismissMs])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onDismiss()
    }, 300) // Match animation duration
  }

  if (!isVisible) return null

  // Get Tick expression based on type
  const getExpression = () => {
    if (type === 'estimate') return 'judgmental'
    return 'concerned'
  }

  if (isHinged) {
    return (
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isExiting ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="bg-hinged-card border border-hinged-border rounded-lg shadow-lg p-4 flex items-start gap-3 max-w-sm">
          <TickSprite expression={getExpression()} size="sm" />
          <div className="flex-1">
            <p className="text-sm text-hinged-text">{message}</p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-hinged-text-secondary hover:text-hinged-text transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isExiting ? 'opacity-0 -translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100'
      }`}
    >
      <div className={`bg-cloud border-4 rounded-2xl shadow-xl p-4 flex items-start gap-3 max-w-sm ${
        type === 'estimate' ? 'border-hot-pink animate-pulse' : 'border-mint'
      }`}>
        <TickSprite expression={getExpression()} size="sm" />
        <div className="flex-1">
          <p className="text-sm text-charcoal font-mono">{message}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-dusty-purple hover:text-hot-pink transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
