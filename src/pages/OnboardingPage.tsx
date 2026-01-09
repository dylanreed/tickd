// ABOUTME: Multi-screen onboarding flow introducing Tick and the app concept.
// ABOUTME: Walks users through how the lying system works and sets spiciness level.

import { useState } from 'react'
import type { CreateTaskInput } from '../types/task'
import TickSprite, { type TickExpression } from '../components/TickSprite'

interface OnboardingPageProps {
  onComplete: (spicyLevel: number) => void
  onAddTask?: (task: CreateTaskInput) => Promise<{ error: Error | null }>
}

const spicyLevelLabels: Record<number, { name: string; description: string }> = {
  1: { name: 'Gentle concern', description: 'Soft reminders, minimal judgment' },
  2: { name: 'Pointed reminders', description: 'Slightly passive-aggressive' },
  3: { name: 'Disappointed parent', description: 'Guilt trips and sighs' },
  4: { name: 'Unfiltered chaos', description: 'Dramatic, emotional, caps lock' },
  5: { name: 'Maximum violence', description: 'Full unhinged mode' },
}

const spicyExamples: Record<number, string> = {
  1: '"oh no baby what is you doing"',
  2: '"Overdue. Per my last three notifications."',
  3: '"I have asked you ONE thing. ONE THING."',
  4: '"THE AUDACITY. THE UNMITIGATED GALL."',
  5: '"I\'M DMING ALL YOUR EXES ABOUT THIS."',
}

export default function OnboardingPage({ onComplete, onAddTask }: OnboardingPageProps) {
  const [step, setStep] = useState(0)
  const [spicyLevel, setSpicyLevel] = useState(3)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDueDate, setTaskDueDate] = useState('')
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [taskAdded, setTaskAdded] = useState(false)

  const nextStep = () => setStep(s => s + 1)

  const handleComplete = () => {
    onComplete(spicyLevel)
  }

  const handleAddFirstTask = async () => {
    if (!taskTitle.trim() || !taskDueDate || !onAddTask) {
      nextStep()
      return
    }

    setIsAddingTask(true)
    const { error } = await onAddTask({
      title: taskTitle.trim(),
      real_due_date: new Date(taskDueDate).toISOString(),
    })

    setIsAddingTask(false)
    if (!error) {
      setTaskAdded(true)
    }
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const screens = [
    // Screen 1: Welcome
    {
      expression: 'idle' as TickExpression,
      headline: "Hi! I'm Tick.",
      body: (
        <>
          <p className="mb-4">I'm going to lie to you about your deadlines. Constantly.</p>
          <p className="text-clock-black/60 font-mono text-sm">It's for your own good.</p>
        </>
      ),
      cta: 'Tell me more',
    },
    // Screen 2: The Problem
    {
      expression: 'suspicious' as TickExpression,
      headline: 'Let me guess...',
      body: (
        <>
          <p className="mb-4">
            You only do things when they're urgent. A deadline two weeks away?
            <span className="text-clock-black/60"> Doesn't exist to your brain.</span>
          </p>
          <p>
            But a deadline <span className="text-clock-red font-bold">TOMORROW</span>?
            Suddenly you're a productivity machine.
          </p>
        </>
      ),
      cta: "That's... accurate",
    },
    // Screen 3: The Solution
    {
      expression: 'unhinged' as TickExpression,
      headline: "Here's my evil plan:",
      body: (
        <>
          <p className="mb-4">
            You tell me the <span className="font-bold">REAL</span> deadline.
            I show you a <span className="text-clock-red font-bold">FAKE</span> earlier one.
          </p>
          <p>
            You panic. You work. You finish "just in time" — and discover you're actually
            <span className="text-clock-brass font-bold"> EARLY</span>.
          </p>
        </>
      ),
      cta: 'Diabolical. I love it.',
    },
    // Screen 4: The Spiciness Intro
    {
      expression: 'suspicious' as TickExpression,
      headline: 'One more thing...',
      body: (
        <>
          <p className="mb-6">You get to choose how mean I am when you ignore your tasks.</p>
          <div className="space-y-3 text-left">
            <div className="bg-mint/30 border-2 border-clock-black p-3">
              <span className="font-bold">Level 1:</span>
              <span className="text-clock-black/60 font-mono text-sm"> "gentle concern"</span>
              <p className="text-sm text-clock-black italic mt-1">"oh no baby what is you doing"</p>
            </div>
            <div className="bg-clock-red/20 border-2 border-clock-black p-3">
              <span className="font-bold">Level 5:</span>
              <span className="text-clock-black/60 font-mono text-sm"> "maximum violence"</span>
              <p className="text-sm text-clock-black italic mt-1">"I'M DMING ALL YOUR EXES ABOUT THIS"</p>
            </div>
          </div>
        </>
      ),
      cta: 'Set my spiciness level',
    },
    // Screen 5: Spiciness Selection
    {
      expression: 'idle' as TickExpression,
      headline: 'How mean should I be?',
      body: null,
      cta: "That's perfect",
      isSpicySelector: true,
    },
    // Screen 6: First Task Prompt
    {
      expression: 'celebrating' as TickExpression,
      headline: "Add your first task!",
      body: null,
      cta: 'Add task',
      isFirstTask: true,
    },
    // Screen 7: Setup Complete
    {
      expression: 'idle' as TickExpression,
      headline: "We're all set!",
      body: (
        <>
          <p className="mb-4">I'll be right here in the corner, watching. Judging. Lying.</p>
          <p className="mb-4">
            <span className="font-bold">Tap me</span> anytime if you want to chat.
            <br />
            <span className="font-bold">Long-press</span> to adjust how mean I am.
          </p>
          <p className="text-clock-red font-bold">Let's get you on track.</p>
        </>
      ),
      cta: "Let's do this",
      isFinal: true,
    },
  ]

  const currentScreen = screens[step]

  const getSpicyExpression = (): TickExpression => {
    if (spicyLevel <= 2) return 'idle'
    if (spicyLevel === 3) return 'suspicious'
    return 'unhinged'
  }

  const expression = currentScreen.isSpicySelector
    ? getSpicyExpression()
    : currentScreen.expression

  return (
    <div className="min-h-screen bg-clock-parchment font-body flex flex-col items-center justify-center p-6">
      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {screens.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 border-2 border-clock-black transition-colors ${
              i === step ? 'bg-clock-red' : i < step ? 'bg-clock-brass' : 'bg-clock-ivory'
            }`}
          />
        ))}
      </div>

      {/* Tick */}
      <div className="mb-8">
        <TickSprite expression={expression} size="lg" className="drop-shadow-[4px_4px_0_rgba(28,25,23,0.3)]" />
      </div>

      {/* Content */}
      <div className="bg-clock-ivory border-3 border-clock-black shadow-[6px_6px_0_0_#1c1917] p-8 max-w-md w-full text-center">
        <h1 className="font-pixel text-lg text-clock-black mb-6 leading-relaxed">
          {currentScreen.headline}
        </h1>

        {/* Regular body content */}
        {currentScreen.body && (
          <div className="text-clock-black text-lg mb-8">
            {currentScreen.body}
          </div>
        )}

        {/* Spiciness Selector */}
        {currentScreen.isSpicySelector && (
          <div className="mb-8">
            {/* Level buttons */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setSpicyLevel(level)}
                  className={`w-12 h-12 border-3 border-clock-black font-bold transition-all ${
                    level === 1
                      ? "bg-mint/50"
                      : level === 2
                        ? "bg-clock-parchment"
                        : level === 3
                          ? "bg-clock-brass/30"
                          : level === 4
                            ? "bg-clock-red/30"
                            : "bg-clock-red/50"
                  } ${spicyLevel === level
                      ? "shadow-[1px_1px_0_0_#1c1917] translate-x-0.5 translate-y-0.5 ring-2 ring-clock-red"
                      : "shadow-[3px_3px_0_0_#1c1917] opacity-60 hover:opacity-100"}`}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Current level display */}
            <div className="bg-clock-parchment border-2 border-clock-black p-4 mb-4">
              <p className="font-bold text-clock-black text-xl mb-1">
                Level {spicyLevel}: {spicyLevelLabels[spicyLevel].name}
              </p>
              <p className="text-clock-black/60 text-sm font-mono">
                {spicyLevelLabels[spicyLevel].description}
              </p>
            </div>

            {/* Preview */}
            <div className="text-left">
              <p className="text-sm text-clock-black/60 mb-2 font-mono">Preview:</p>
              <p className="text-clock-black italic bg-clock-parchment border-2 border-clock-black p-3">
                {spicyExamples[spicyLevel]}
              </p>
            </div>

            <p className="text-clock-black/40 text-xs mt-4 font-mono">
              You can change this anytime by long-pressing Tick.
            </p>
          </div>
        )}

        {/* First Task Form */}
        {currentScreen.isFirstTask && !taskAdded && (
          <div className="mb-6 space-y-4">
            <p className="text-clock-black/60 text-sm mb-4 font-mono">
              Be honest about the real deadline. I'll handle the lying.
            </p>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="What do you need to do?"
              className="w-full px-4 py-3 bg-clock-parchment text-clock-black placeholder-clock-black/40 border-3 border-clock-black focus:border-clock-red focus:outline-none shadow-[2px_2px_0_0_#1c1917] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
            />
            <div>
              <label className="block text-sm text-clock-black/60 mb-1 text-left font-mono">
                Real deadline <span className="text-clock-red">(I'll lie about this)</span>
              </label>
              <input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                min={minDate}
                className="w-full px-4 py-3 bg-clock-parchment text-clock-black border-3 border-clock-black focus:border-clock-red focus:outline-none shadow-[2px_2px_0_0_#1c1917] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
              />
            </div>
          </div>
        )}

        {/* Task Added Celebration */}
        {currentScreen.isFirstTask && taskAdded && (
          <div className="mb-6 bg-clock-brass/20 border-2 border-clock-black p-4">
            <p className="text-clock-black font-bold text-lg">Your first task!</p>
            <p className="text-clock-black/60 font-mono text-sm">I've already started lying about the deadline.</p>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={
            currentScreen.isFirstTask
              ? (taskAdded ? nextStep : handleAddFirstTask)
              : currentScreen.isFinal
                ? handleComplete
                : nextStep
          }
          disabled={isAddingTask}
          className="w-full bg-clock-red text-clock-ivory font-bold py-4 px-6 border-3 border-clock-black hover:bg-clock-black transition-colors disabled:opacity-50 shadow-[4px_4px_0_0_#1c1917] hover:shadow-[2px_2px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          {isAddingTask ? 'Adding...' : taskAdded ? 'Continue' : currentScreen.cta}
        </button>

        {/* Skip option on first task prompt */}
        {currentScreen.isFirstTask && !taskAdded && (
          <button
            onClick={nextStep}
            className="w-full mt-3 text-clock-black/60 hover:text-clock-black transition-colors text-sm font-mono"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  )
}
