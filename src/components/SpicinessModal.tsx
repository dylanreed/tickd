// ABOUTME: Modal for adjusting the spiciness level of Tick's messages.
// ABOUTME: Opened by long-pressing Tick in the corner.

import { useState } from 'react'

// Import mascot images
import neutralImg from '../assets/mascot/neutral.png'
import shiftyImg from '../assets/mascot/shifty.png'
import evilImg from '../assets/mascot/evil.png'

interface SpicinessModalProps {
  isOpen: boolean
  onClose: () => void
  currentLevel: number
  onSave: (level: number) => void
}

type TickExpression = 'neutral' | 'shifty' | 'evil'

const expressionImages: Record<TickExpression, string> = {
  neutral: neutralImg,
  shifty: shiftyImg,
  evil: evilImg,
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

export default function SpicinessModal({ isOpen, onClose, currentLevel, onSave }: SpicinessModalProps) {
  const [level, setLevel] = useState(currentLevel)

  if (!isOpen) return null

  const getExpression = (): TickExpression => {
    if (level <= 2) return 'neutral'
    if (level === 3) return 'shifty'
    return 'evil'
  }

  const handleSave = () => {
    onSave(level)
    onClose()
  }

  const handleCancel = () => {
    setLevel(currentLevel) // Reset to original
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-charcoal/60 flex items-center justify-center p-4 z-50 font-body">
      <div className="bg-cloud rounded-2xl shadow-xl max-w-md w-full p-8">
        {/* Tick */}
        <div className="w-24 h-24 mx-auto mb-6">
          <img
            src={expressionImages[getExpression()]}
            alt={`Tick looking ${getExpression()}`}
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>

        <h2 className="font-pixel text-lg text-charcoal text-center mb-6">
          HOW MEAN SHOULD I BE?
        </h2>

        {/* Slider */}
        <div className="mb-6">
          <input
            type="range"
            min="1"
            max="5"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
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
        <div className="bg-lavender/50 rounded-xl p-4 mb-4 text-center">
          <p className="font-bold text-charcoal text-xl mb-1">
            Level {level}: {spicyLevelLabels[level].name}
          </p>
          <p className="text-dusty-purple text-sm">
            {spicyLevelLabels[level].description}
          </p>
        </div>

        {/* Preview */}
        <div className="mb-6">
          <p className="text-sm text-dusty-purple mb-2">Preview:</p>
          <p className="text-charcoal italic bg-white/50 p-3 rounded-xl text-center">
            {spicyExamples[level]}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 bg-lavender text-charcoal font-bold rounded-full hover:bg-peach transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-hot-pink text-cloud font-bold rounded-full hover:bg-coral transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
