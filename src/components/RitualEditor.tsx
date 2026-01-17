// ABOUTME: Editor for customizing startup ritual steps.
// ABOUTME: Used in settings page to configure transition ritual.

import { useState } from 'react'
import type { StartupRitualStep } from '../types/paralysisTools'

interface RitualEditorProps {
  steps: StartupRitualStep[]
  onChange: (steps: StartupRitualStep[]) => void
  theme: 'hinged' | 'unhinged'
}

const DEFAULT_STEPS: StartupRitualStep[] = [
  { id: 'close_tabs', text: 'Close unnecessary tabs/apps', isDefault: true },
  { id: 'get_drink', text: 'Get water or coffee', isDefault: true },
  { id: 'phone_away', text: 'Phone on silent or away', isDefault: true },
  { id: 'breathe', text: 'Take 3 deep breaths', isDefault: true },
  { id: 'pick_task', text: 'Pick your first task', isDefault: true },
]

function generateId(): string {
  return `step_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export default function RitualEditor({
  steps,
  onChange,
  theme,
}: RitualEditorProps) {
  const [newStepText, setNewStepText] = useState('')
  const isHinged = theme === 'hinged'

  // If no steps, initialize with defaults
  const currentSteps = steps.length > 0 ? steps : DEFAULT_STEPS

  const addStep = () => {
    if (!newStepText.trim()) return

    const newStep: StartupRitualStep = {
      id: generateId(),
      text: newStepText.trim(),
      isDefault: false,
    }
    onChange([...currentSteps, newStep])
    setNewStepText('')
  }

  const removeStep = (stepId: string) => {
    onChange(currentSteps.filter(s => s.id !== stepId))
  }

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= currentSteps.length) return

    const newSteps = [...currentSteps]
    const [removed] = newSteps.splice(index, 1)
    newSteps.splice(newIndex, 0, removed)
    onChange(newSteps)
  }

  const resetToDefaults = () => {
    onChange(DEFAULT_STEPS)
  }

  if (isHinged) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-hinged-text">
            Startup Ritual Steps
          </label>
          <button
            onClick={resetToDefaults}
            className="text-xs text-hinged-accent hover:text-hinged-accent-hover"
          >
            Reset to defaults
          </button>
        </div>

        {/* Current steps */}
        <div className="space-y-2">
          {currentSteps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center gap-2 p-2 bg-hinged-bg rounded border border-hinged-border"
            >
              <span className="text-xs text-hinged-text-secondary w-6">
                {index + 1}.
              </span>
              <span className="flex-1 text-sm text-hinged-text">{step.text}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => moveStep(index, 'up')}
                  disabled={index === 0}
                  className="text-xs text-hinged-text-secondary hover:text-hinged-text disabled:opacity-30 px-1"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveStep(index, 'down')}
                  disabled={index === currentSteps.length - 1}
                  className="text-xs text-hinged-text-secondary hover:text-hinged-text disabled:opacity-30 px-1"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeStep(step.id)}
                  className="text-xs text-red-500 hover:text-red-600 px-1"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add new step */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newStepText}
            onChange={e => setNewStepText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addStep()}
            placeholder="Add a step..."
            className="flex-1 px-3 py-2 text-sm border border-hinged-border rounded bg-hinged-bg text-hinged-text placeholder:text-hinged-text-secondary focus:outline-none focus:border-hinged-accent"
          />
          <button
            onClick={addStep}
            disabled={!newStepText.trim()}
            className="px-4 py-2 text-sm bg-hinged-accent text-white rounded hover:bg-hinged-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-pixel text-xs text-clock-brass uppercase">
          STARTUP RITUAL
        </label>
        <button
          onClick={resetToDefaults}
          className="font-mono text-xs text-dusty-purple hover:text-hot-pink"
        >
          RESET
        </button>
      </div>

      {/* Current steps */}
      <div className="space-y-2">
        {currentSteps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center gap-2 p-2 bg-clock-ivory border-2 border-clock-black"
          >
            <span className="font-pixel text-xs text-clock-brass w-6">
              {index + 1}.
            </span>
            <span className="flex-1 font-mono text-sm text-clock-black">
              {step.text}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => moveStep(index, 'up')}
                disabled={index === 0}
                className="font-mono text-xs text-clock-brass hover:text-hot-pink disabled:opacity-30 px-1"
              >
                ↑
              </button>
              <button
                onClick={() => moveStep(index, 'down')}
                disabled={index === currentSteps.length - 1}
                className="font-mono text-xs text-clock-brass hover:text-hot-pink disabled:opacity-30 px-1"
              >
                ↓
              </button>
              <button
                onClick={() => removeStep(step.id)}
                className="font-mono text-xs text-hot-pink hover:text-dusty-purple px-1"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add new step */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newStepText}
          onChange={e => setNewStepText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addStep()}
          placeholder="ADD A STEP..."
          className="flex-1 px-3 py-2 font-mono text-sm border-2 border-clock-black bg-cloud text-clock-black placeholder:text-clock-brass focus:outline-none"
        />
        <button
          onClick={addStep}
          disabled={!newStepText.trim()}
          className="px-4 py-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ADD
        </button>
      </div>
    </div>
  )
}
