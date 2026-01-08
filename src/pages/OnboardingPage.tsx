// ABOUTME: Multi-screen onboarding flow introducing Tick and the app concept.
// ABOUTME: Walks users through how the lying system works and sets spiciness level.

import { useState } from 'react'
import type { CreateTaskInput } from '../types/task'

// Import mascot images
import neutralImg from '../assets/tick/neutral.png'
import shiftyImg from '../assets/tick/shifty.png'
import evilImg from '../assets/tick/evil.png'
import celebrateImg from '../assets/tick/celebrate.png'

interface OnboardingPageProps {
  onComplete: (spicyLevel: number) => void
  onAddTask?: (task: CreateTaskInput) => Promise<{ error: Error | null }>
}

type TickExpression = 'neutral' | 'shifty' | 'evil' | 'celebrate'

const expressionImages: Record<TickExpression, string> = {
  neutral: neutralImg,
  shifty: shiftyImg,
  evil: evilImg,
  celebrate: celebrateImg,
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
      // If no task entered, just skip to next screen
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

  // Calculate min date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const screens = [
    // Screen 1: Welcome
    {
      expression: 'neutral' as TickExpression,
      headline: "Hi! I'm Tick.",
      body: (
        <>
          <p className="mb-4">I'm going to lie to you about your deadlines. Constantly.</p>
          <p className="text-dusty-purple">It's for your own good.</p>
        </>
      ),
      cta: 'Tell me more',
    },
    // Screen 2: The Problem
    {
      expression: 'shifty' as TickExpression,
      headline: 'Let me guess...',
      body: (
        <>
          <p className="mb-4">
            You only do things when they're urgent. A deadline two weeks away?
            <span className="text-dusty-purple"> Doesn't exist to your brain.</span>
          </p>
          <p>
            But a deadline <span className="text-hot-pink font-bold">TOMORROW</span>?
            Suddenly you're a productivity machine.
          </p>
        </>
      ),
      cta: "That's... accurate",
    },
    // Screen 3: The Solution
    {
      expression: 'evil' as TickExpression,
      headline: "Here's my evil plan:",
      body: (
        <>
          <p className="mb-4">
            You tell me the <span className="font-bold">REAL</span> deadline.
            I show you a <span className="text-hot-pink font-bold">FAKE</span> earlier one.
          </p>
          <p>
            You panic. You work. You finish "just in time" — and discover you're actually
            <span className="text-mint font-bold"> EARLY</span>.
          </p>
        </>
      ),
      cta: 'Diabolical. I love it.',
    },
    // Screen 4: The Spiciness Intro
    {
      expression: 'shifty' as TickExpression,
      headline: 'One more thing...',
      body: (
        <>
          <p className="mb-6">You get to choose how mean I am when you ignore your tasks.</p>
          <div className="space-y-3 text-left">
            <div className="bg-mint/30 p-3 rounded-xl">
              <span className="font-bold">Level 1:</span>
              <span className="text-dusty-purple"> "gentle concern"</span>
              <p className="text-sm text-charcoal italic mt-1">"oh no baby what is you doing"</p>
            </div>
            <div className="bg-hot-pink/30 p-3 rounded-xl">
              <span className="font-bold">Level 5:</span>
              <span className="text-dusty-purple"> "maximum violence"</span>
              <p className="text-sm text-charcoal italic mt-1">"I'M DMING ALL YOUR EXES ABOUT THIS"</p>
            </div>
          </div>
        </>
      ),
      cta: 'Set my spiciness level',
    },
    // Screen 5: Spiciness Selection (special - has slider)
    {
      expression: 'neutral' as TickExpression, // Will change dynamically
      headline: 'How mean should I be?',
      body: null, // Custom rendering
      cta: "That's perfect",
      isSpicySelector: true,
    },
    // Screen 6: First Task Prompt (with inline form)
    {
      expression: 'celebrate' as TickExpression,
      headline: "Add your first task!",
      body: null, // Custom rendering for task form
      cta: 'Add task',
      isFirstTask: true,
    },
    // Screen 7: Setup Complete
    {
      expression: 'neutral' as TickExpression,
      headline: "We're all set!",
      body: (
        <>
          <p className="mb-4">I'll be right here in the corner, watching. Judging. Lying.</p>
          <p className="mb-4">
            <span className="font-bold">Tap me</span> anytime if you want to chat.
            <br />
            <span className="font-bold">Long-press</span> to adjust how mean I am.
          </p>
          <p className="text-hot-pink font-bold">Let's get you on track.</p>
        </>
      ),
      cta: "Let's do this",
      isFinal: true,
    },
  ]

  const currentScreen = screens[step]

  // Dynamic expression for spicy selector
  const getSpicyExpression = (): TickExpression => {
    if (spicyLevel <= 2) return 'neutral'
    if (spicyLevel === 3) return 'shifty'
    return 'evil'
  }

  const expression = currentScreen.isSpicySelector
    ? getSpicyExpression()
    : currentScreen.expression

  return (
    <div className="min-h-screen bg-lavender font-body flex flex-col items-center justify-center p-6">
      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {screens.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === step ? 'bg-hot-pink' : i < step ? 'bg-mint' : 'bg-cloud'
            }`}
          />
        ))}
      </div>

      {/* Tick */}
      <div className="w-32 h-32 mb-8">
        <img
          src={expressionImages[expression]}
          alt={`Tick looking ${expression}`}
          className="w-full h-full object-cover rounded-full shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="bg-cloud rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="font-pixel text-lg text-charcoal mb-6 leading-relaxed">
          {currentScreen.headline}
        </h1>

        {/* Regular body content */}
        {currentScreen.body && (
          <div className="text-charcoal text-lg mb-8">
            {currentScreen.body}
          </div>
        )}

        {/* Spiciness Selector */}
        {currentScreen.isSpicySelector && (
          <div className="mb-8">
            {/* Slider */}
            <div className="mb-6">
              <input
                type="range"
                min="1"
                max="5"
                value={spicyLevel}
                onChange={(e) => setSpicyLevel(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right,
                    #B8E0D2 0%,
                    #FFCDB2 25%,
                    #FFD166 50%,
                    #FF7F6B 75%,
                    #FF5E8A 100%
                  )`,
                }}
              />
              <div className="flex justify-between text-xs text-dusty-purple mt-2">
                <span>Gentle</span>
                <span>Unhinged</span>
              </div>
            </div>

            {/* Current level display */}
            <div className="bg-lavender/50 rounded-xl p-4 mb-4">
              <p className="font-bold text-charcoal text-xl mb-1">
                Level {spicyLevel}: {spicyLevelLabels[spicyLevel].name}
              </p>
              <p className="text-dusty-purple text-sm">
                {spicyLevelLabels[spicyLevel].description}
              </p>
            </div>

            {/* Preview */}
            <div className="text-left">
              <p className="text-sm text-dusty-purple mb-2">Preview:</p>
              <p className="text-charcoal italic bg-white/50 p-3 rounded-xl">
                {spicyExamples[spicyLevel]}
              </p>
            </div>

            <p className="text-warm-gray text-xs mt-4">
              You can change this anytime by long-pressing Tick.
            </p>
          </div>
        )}

        {/* First Task Form */}
        {currentScreen.isFirstTask && !taskAdded && (
          <div className="mb-6 space-y-4">
            <p className="text-dusty-purple text-sm mb-4">
              Be honest about the real deadline. I'll handle the lying.
            </p>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="What do you need to do?"
              className="w-full px-4 py-3 rounded-xl bg-white text-charcoal placeholder-warm-gray border-2 border-transparent focus:border-hot-pink focus:outline-none"
            />
            <div>
              <label className="block text-sm text-dusty-purple mb-1 text-left">
                Real deadline <span className="text-hot-pink">(I'll lie about this)</span>
              </label>
              <input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                min={minDate}
                className="w-full px-4 py-3 rounded-xl bg-white text-charcoal border-2 border-transparent focus:border-hot-pink focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Task Added Celebration */}
        {currentScreen.isFirstTask && taskAdded && (
          <div className="mb-6 bg-mint/30 rounded-xl p-4">
            <p className="text-charcoal font-bold text-lg">Your first task!</p>
            <p className="text-dusty-purple">I've already started lying about the deadline.</p>
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
          className="w-full bg-hot-pink text-cloud font-bold py-4 px-6 rounded-full hover:bg-coral transition-colors disabled:opacity-50"
        >
          {isAddingTask ? 'Adding...' : taskAdded ? 'Continue' : currentScreen.cta}
        </button>

        {/* Skip option on first task prompt */}
        {currentScreen.isFirstTask && !taskAdded && (
          <button
            onClick={nextStep}
            className="w-full mt-3 text-dusty-purple hover:text-charcoal transition-colors text-sm"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  )
}
