// ABOUTME: Quick-reference page explaining how Tickd works.
// ABOUTME: Accessible from landing page and in-app, hybrid tone with Tick commentary.

import TickSprite, { type TickExpression } from '../components/TickSprite'

interface HowItWorksPageProps {
  onBack?: () => void
}

interface CardProps {
  title: string
  description: string
  tickQuote: string
  tickExpression: TickExpression
  rotation?: string
}

function Card({ title, description, tickQuote, tickExpression, rotation = 'rotate-0' }: CardProps) {
  return (
    <div className={`bg-clock-ivory border-3 border-clock-black p-6 shadow-[4px_4px_0_0_#1c1917] ${rotation} hover:rotate-0 transition-transform`}>
      <div className="flex gap-4 items-start">
        <div className="shrink-0">
          <TickSprite expression={tickExpression} size="sm" />
        </div>
        <div className="flex-1">
          <div className="font-pixel text-xs text-clock-brass mb-2">{title}</div>
          <p className="text-clock-black/80 mb-3">{description}</p>
          <p className="text-clock-black/60 italic text-sm">"{tickQuote}"</p>
        </div>
      </div>
    </div>
  )
}

export default function HowItWorksPage({ onBack }: HowItWorksPageProps) {
  return (
    <div className="min-h-screen bg-clock-parchment font-body">
      {/* Header */}
      <header className="bg-clock-dark py-4 px-4 border-b-3 border-clock-black">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {onBack && (
            <button
              onClick={onBack}
              className="text-clock-ivory/70 hover:text-clock-ivory font-mono text-sm transition-colors"
            >
              ← Back
            </button>
          )}
          <div className="flex-1" />
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="font-pixel text-lg md:text-xl text-clock-black mb-2">
              HOW TICKD WORKS
            </h1>
            <p className="text-clock-black/50 font-mono text-sm">
              (the short version for people who don't read instructions)
            </p>
          </div>

          {/* Intro */}
          <div className="bg-clock-ivory border-3 border-clock-black p-6 mb-8 shadow-[4px_4px_0_0_#1c1917] -rotate-1">
            <div className="flex gap-4 items-center">
              <div className="shrink-0">
                <TickSprite expression="scheming" size="md" />
              </div>
              <div>
                <p className="text-clock-black mb-3">
                  Tickd is a deadline app that shows you <strong>fake earlier deadlines</strong>.
                  You panic, you work, you finish "just in time" — then discover you actually had days to spare.
                </p>
                <p className="text-clock-black/60 italic">
                  "I lie to you. It's a whole thing. You'll love it."
                </p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-6">
            <Card
              title="THE LIE"
              description="You enter the real deadline. We show you an earlier one. Your brain finally registers urgency instead of 'eh, future me's problem.' You never see the real date until you finish."
              tickQuote="You can't handle the truth. Literally. That's why you're here."
              tickExpression="suspicious"
              rotation="-rotate-1"
            />

            <Card
              title="SPICINESS LEVELS"
              description="Choose how aggressive Tick gets when you're slacking. Level 1 is gentle concern. Level 5 is unhinged chaos. Adjustable anytime by long-pressing Tick."
              tickQuote="I can be your therapist or your drill sergeant. Your call."
              tickExpression="judgmental"
              rotation="rotate-1"
            />

            <Card
              title="RELIABILITY SCORE"
              description="The app tracks how often you meet deadlines. Lower score = we lie harder. Higher score = we ease up. It's adaptive gaslighting."
              tickQuote="Earn my trust and I'll stop lying so aggressively. Betray it and I become unhinged."
              tickExpression="disappointed"
              rotation="-rotate-0.5"
            />

            <Card
              title="THE REVEAL"
              description="Finish a task and we show you the truth: the real deadline vs what you thought. Finding out you had 3 days to spare hits different."
              tickQuote="I lied. You thrived. Dopamine achieved."
              tickExpression="smug"
              rotation="rotate-0.5"
            />
          </div>

          {/* Footer CTA */}
          <div className="mt-12 text-center">
            <p className="text-clock-black/40 font-mono text-sm mb-4">
              that's it. that's the whole thing.
            </p>
            {onBack && (
              <button
                onClick={onBack}
                className="px-8 py-3 bg-clock-red text-clock-ivory font-bold border-3 border-clock-black hover:bg-clock-black transition-colors shadow-[4px_4px_0_0_#1c1917] hover:shadow-[2px_2px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5"
              >
                GOT IT
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 bg-clock-black text-center border-t-3 border-clock-dark mt-auto">
        <p className="text-clock-ivory/30 text-xs font-mono">
          tick'd © 2026 · made with chaos and love
        </p>
      </footer>
    </div>
  )
}
