// ABOUTME: Step-by-step guide through user's startup ritual.
// ABOUTME: Each step must be confirmed before proceeding.

import TickSprite from './TickSprite'
import { getTransitionMessage } from '../data/transitionMessages'
import type { SpicyLevel } from '../data/momentumMessages'
import type { StartupRitualStep } from '../types/paralysisTools'

interface RitualWalkthroughProps {
  isOpen: boolean
  steps: StartupRitualStep[]
  currentStep: number
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
  onCompleteStep: () => void
  onSkip: () => void
}

export default function RitualWalkthrough({
  isOpen,
  steps,
  currentStep,
  spicyLevel,
  theme,
  onCompleteStep,
  onSkip,
}: RitualWalkthroughProps) {
  if (!isOpen || steps.length === 0) return null

  const isLastStep = currentStep >= steps.length - 1
  const step = steps[Math.min(currentStep, steps.length - 1)]
  const isComplete = currentStep >= steps.length
  const isHinged = theme === 'hinged'

  // If complete, show the completion message
  if (isComplete) {
    const completionMessage = getTransitionMessage('ritual_complete', spicyLevel)

    if (isHinged) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 animate-bounce-in">
            <div className="text-center">
              <TickSprite expression="celebrating" size="lg" />
              <h3 className="font-medium text-hinged-text mt-3 mb-2">Ritual Complete!</h3>
              <p className="text-sm text-hinged-text-secondary mb-4">{completionMessage}</p>
              <button
                onClick={onCompleteStep}
                className="px-6 py-2 bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover transition-colors"
              >
                Start countdown
              </button>
            </div>
          </div>
        </div>
      )
    }

    // Unhinged complete
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-6 max-w-sm w-full mx-4 animate-bounce-in rotate-1">
          <div className="text-center">
            <TickSprite expression="celebrating" size="lg" />
            <h3 className="font-pixel text-sm text-clock-black mt-3 mb-2">RITUAL COMPLETE!</h3>
            <p className="text-sm text-charcoal font-mono mb-4">{completionMessage}</p>
            <button
              onClick={onCompleteStep}
              className="px-6 py-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              START COUNTDOWN
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isHinged) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-hinged-text-secondary uppercase tracking-wide">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={onSkip}
              className="text-xs text-hinged-text-secondary hover:text-hinged-text"
            >
              Skip ritual
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-hinged-bg rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-hinged-accent transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="text-center mb-6">
            <TickSprite expression="eager" size="md" />
            <h3 className="font-medium text-hinged-text text-lg mt-3">
              {step.text}
            </h3>
          </div>

          <button
            onClick={onCompleteStep}
            className="w-full px-4 py-3 bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover transition-colors"
          >
            {isLastStep ? "Done! Let's go" : 'Done, next step'}
          </button>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-charcoal/60" />
      <div className="relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-6 max-w-sm w-full mx-4 -rotate-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-pixel text-clock-brass uppercase">
            STEP {currentStep + 1}/{steps.length}
          </span>
          <button
            onClick={onSkip}
            className="text-xs font-mono text-dusty-purple hover:text-hot-pink"
          >
            SKIP
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-clock-parchment border-2 border-clock-black overflow-hidden mb-6">
          <div
            className="h-full bg-hot-pink transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="text-center mb-6">
          <TickSprite expression="eager" size="md" />
          <h3 className="font-mono text-clock-black text-lg mt-3 font-bold">
            {step.text.toUpperCase()}
          </h3>
        </div>

        <button
          onClick={onCompleteStep}
          className="w-full px-4 py-3 font-mono text-sm text-clock-black border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          {isLastStep ? "DONE! LET'S GO!" : 'DONE, NEXT →'}
        </button>
      </div>
    </div>
  )
}
