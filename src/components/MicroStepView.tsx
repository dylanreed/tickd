// ABOUTME: Displays current micro-step for a shrunk task.
// ABOUTME: Shows progress and offers momentum exit.

import { useState, useEffect } from 'react'
import TickSprite from './TickSprite'
import type { MicroStep } from '../types/paralysisTools'
import { getShrinkingMessage } from '../data/taskShrinkingMessages'
import type { SpicyLevel } from '../data/taskShrinkingMessages'

interface MicroStepViewProps {
  taskTitle: string
  microSteps: MicroStep[]
  currentStepIndex: number
  onCompleteStep: () => void
  onAddStep: () => void
  onHasMomentum: () => void
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
}

export default function MicroStepView({
  taskTitle,
  microSteps,
  currentStepIndex,
  onCompleteStep,
  onAddStep,
  onHasMomentum,
  spicyLevel,
  theme,
}: MicroStepViewProps) {
  const [completionMessage, setCompletionMessage] = useState<string | null>(null)
  const isHinged = theme === 'hinged'

  const currentStep = microSteps[currentStepIndex]
  const completedCount = microSteps.filter(s => s.completed).length
  const isLastStep = currentStepIndex === microSteps.length - 1 && currentStep?.completed

  // Show completion message briefly when step is completed
  useEffect(() => {
    if (currentStep?.completed && !isLastStep) {
      setCompletionMessage(getShrinkingMessage('micro_step_complete', spicyLevel))
      const timer = setTimeout(() => setCompletionMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [currentStep?.completed, isLastStep, spicyLevel])

  if (!currentStep) {
    return null
  }

  const allComplete = microSteps.every(s => s.completed)

  if (isHinged) {
    return (
      <div className="bg-hinged-bg border border-hinged-border rounded-lg p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TickSprite expression={completionMessage ? 'happy' : 'eager'} size="sm" />
            <span className="text-xs text-hinged-text-secondary uppercase tracking-wide">
              Micro-step {currentStepIndex + 1}
              {microSteps.length > 1 && ` of ${microSteps.length}`}
            </span>
          </div>
          {/* Progress dots */}
          <div className="flex gap-1">
            {microSteps.map((step, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  step.completed
                    ? 'bg-hinged-accent'
                    : i === currentStepIndex
                    ? 'bg-hinged-accent/50'
                    : 'bg-hinged-border'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current step or completion message */}
        {completionMessage ? (
          <p className="text-sm text-hinged-text mb-3">{completionMessage}</p>
        ) : allComplete ? (
          <p className="text-sm text-hinged-text mb-3">
            All steps complete! What's next?
          </p>
        ) : (
          <p className="text-hinged-text font-medium mb-3">
            {currentStep.text}
          </p>
        )}

        {/* Task context */}
        <p className="text-xs text-hinged-text-secondary mb-3 truncate">
          Task: {taskTitle}
        </p>

        {/* Actions */}
        {!allComplete && !currentStep.completed ? (
          <div className="flex gap-2">
            <button
              onClick={onCompleteStep}
              className="flex-1 px-3 py-2 text-sm bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover transition-colors"
            >
              Done with this step
            </button>
            {completedCount >= 1 && (
              <button
                onClick={onHasMomentum}
                className="px-3 py-2 text-sm text-hinged-text-secondary hover:text-hinged-text border border-hinged-border rounded-md transition-colors"
              >
                Got momentum
              </button>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onAddStep}
              className="flex-1 px-3 py-2 text-sm text-hinged-text border border-hinged-border rounded-md hover:border-hinged-accent transition-colors"
            >
              Add next tiny step
            </button>
            <button
              onClick={onHasMomentum}
              className="flex-1 px-3 py-2 text-sm bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover transition-colors"
            >
              I've got momentum
            </button>
          </div>
        )}
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="bg-clock-ivory border-3 border-clock-black p-4 shadow-[4px_4px_0_0_#1c1917]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TickSprite expression={completionMessage ? 'happy' : 'eager'} size="sm" />
          <span className="text-xs font-pixel text-clock-brass uppercase">
            STEP {currentStepIndex + 1}
            {microSteps.length > 1 && ` / ${microSteps.length}`}
          </span>
        </div>
        {/* Progress blocks */}
        <div className="flex gap-1">
          {microSteps.map((step, i) => (
            <div
              key={i}
              className={`w-3 h-3 border-2 border-clock-black ${
                step.completed
                  ? 'bg-mint'
                  : i === currentStepIndex
                  ? 'bg-clock-brass'
                  : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current step or completion message */}
      {completionMessage ? (
        <p className="text-sm font-mono text-charcoal mb-3">{completionMessage}</p>
      ) : allComplete ? (
        <p className="text-sm font-mono text-charcoal mb-3">
          ALL DONE! WHAT'S NEXT?
        </p>
      ) : (
        <p className="text-clock-black font-bold mb-3 text-lg">
          {currentStep.text}
        </p>
      )}

      {/* Task context */}
      <p className="text-xs font-mono text-clock-brass mb-3 truncate">
        TASK: {taskTitle}
      </p>

      {/* Actions */}
      {!allComplete && !currentStep.completed ? (
        <div className="flex gap-2">
          <button
            onClick={onCompleteStep}
            className="flex-1 px-3 py-2 text-sm font-mono text-clock-black border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            DONE!
          </button>
          {completedCount >= 1 && (
            <button
              onClick={onHasMomentum}
              className="px-3 py-2 text-sm font-mono text-clock-black border-2 border-clock-black bg-clock-parchment shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              ROLLING!
            </button>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onAddStep}
            className="flex-1 px-3 py-2 text-sm font-mono text-clock-black border-2 border-clock-black bg-clock-parchment shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            + STEP
          </button>
          <button
            onClick={onHasMomentum}
            className="flex-1 px-3 py-2 text-sm font-mono text-clock-black border-2 border-clock-black bg-hot-pink shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            UNSTOPPABLE!
          </button>
        </div>
      )}
    </div>
  )
}
