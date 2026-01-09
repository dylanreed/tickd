// ABOUTME: Landing page for tick'd with "Pixel O'Clock" aesthetic (unhinged edition).
// ABOUTME: Targets people with time blindness/ADHD who need deadline support.

import { useState, useEffect } from 'react'
import TickSprite, { type TickExpression } from '../components/TickSprite'

const heroExpressions: TickExpression[] = ['scheming', 'unhinged', 'judgmental', 'smug', 'suspicious']

interface LandingPageProps {
  onGetStarted?: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [expressionIndex, setExpressionIndex] = useState(0)

  // Cycle through chaotic expressions
  useEffect(() => {
    const interval = setInterval(() => {
      setExpressionIndex(prev => (prev + 1) % heroExpressions.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setSubmitting(true)
    // TODO: Connect to actual email service (Buttondown, ConvertKit, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-clock-parchment font-body overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative">
        {/* Chaotic background tick marks */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 bg-clock-black transition-all duration-1000"
              style={{
                height: `${20 + Math.random() * 60}px`,
                left: `${(i / 30) * 100}%`,
                top: `${30 + Math.sin(i) * 20}%`,
                opacity: 0.03 + Math.random() * 0.02,
                transform: `rotate(${Math.sin(i * 0.5) * 15}deg)`,
              }}
            />
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Tick Sprite */}
          <div className="flex justify-center mb-8">
            <div className="animate-tick-shake">
              <TickSprite
                expression={heroExpressions[expressionIndex]}
                size="xl"
                className="drop-shadow-[6px_6px_0_rgba(28,25,23,0.3)]"
              />
            </div>
          </div>

          <p className="font-mono text-sm text-clock-red mb-4 tracking-widest animate-pulse">
            ⚠ INTERVENTION REQUIRED ⚠
          </p>

          <h1 className="font-pixel text-xl md:text-3xl text-clock-black mb-6 leading-relaxed tracking-tight">
            YOUR BRAIN IS<br />LYING TO YOU<br />ABOUT TIME
          </h1>

          <p className="text-2xl md:text-3xl text-clock-black mb-2 font-bold">
            So we lie back. <span className="text-clock-red">Strategically.</span>
          </p>

          <p className="text-lg text-clock-black/70 mb-4 max-w-xl mx-auto leading-relaxed">
            A deadline app for people with time blindness and ADHD.
            We show you fake earlier deadlines because your brain literally cannot perceive "two weeks from now" as a real thing.
          </p>

          <p className="text-clock-brass font-mono text-sm mb-10">
            (it's not a character flaw. it's neuroscience. we gotchu.)
          </p>

          {/* CTA */}
          {onGetStarted ? (
            <button
              onClick={onGetStarted}
              className="px-10 py-4 bg-clock-red text-clock-ivory font-bold border-3 border-clock-black hover:bg-clock-black transition-colors text-lg shadow-[4px_4px_0_0_#1c1917] hover:shadow-[2px_2px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              LIE TO ME
            </button>
          ) : !submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 bg-clock-ivory text-clock-black placeholder-clock-black/40 border-3 border-clock-black focus:border-clock-red focus:outline-none text-lg font-mono shadow-[4px_4px_0_0_#1c1917] focus:shadow-[2px_2px_0_0_#1c1917] focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-4 bg-clock-red text-clock-ivory font-bold border-3 border-clock-black hover:bg-clock-black transition-colors disabled:opacity-50 text-lg whitespace-nowrap shadow-[4px_4px_0_0_#1c1917] hover:shadow-[2px_2px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                {submitting ? 'PROCESSING...' : 'JOIN WAITLIST'}
              </button>
            </form>
          ) : (
            <div className="bg-clock-ivory border-3 border-clock-black px-8 py-6 max-w-md mx-auto shadow-[4px_4px_0_0_#1c1917] rotate-1">
              <p className="font-pixel text-sm text-clock-black">YOU'RE IN, BESTIE</p>
              <p className="text-clock-black/70 mt-2">We'll email you. Probably earlier than you expect. Trust issues start now.</p>
            </div>
          )}

          <p className="text-clock-black/50 mt-6 text-sm font-mono">
            14 days free · then $1/month · cheaper than therapy
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="font-pixel text-xs text-clock-black/40 animate-bounce">
            ↓ SCROLL FOR THE SCIENCE ↓
          </div>
        </div>
      </section>

      {/* Chaotic Tick Mark Divider */}
      <div className="flex justify-center items-end gap-3 py-6 bg-clock-dark overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`w-0.5 ${i % 5 === 0 ? 'bg-clock-brass' : 'bg-clock-ivory/20'}`}
            style={{
              height: `${8 + Math.sin(i * 0.8) * 12}px`,
              transform: `rotate(${Math.sin(i) * 5}deg)`
            }}
          />
        ))}
      </div>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-clock-ivory">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-lg md:text-xl text-clock-black text-center mb-2">
            THE SCHEME
          </h2>
          <p className="text-center text-clock-black/60 mb-16 font-mono">
            (three steps to outsmarting your own garbage brain)
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto mb-6 bg-clock-parchment border-3 border-clock-black flex items-center justify-center shadow-[4px_4px_0_0_#1c1917] group-hover:shadow-[2px_2px_0_0_#1c1917] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all group-hover:rotate-2">
                <span className="font-pixel text-2xl text-clock-black">01</span>
              </div>
              <h3 className="font-bold text-xl text-clock-black mb-3">Tell us the truth</h3>
              <p className="text-clock-black/70">
                Enter when it's <em>actually</em> due. Be honest. This is the last time you'll see that date.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto mb-6 bg-clock-brass/20 border-3 border-clock-black flex items-center justify-center shadow-[4px_4px_0_0_#1c1917] group-hover:shadow-[2px_2px_0_0_#1c1917] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all group-hover:-rotate-2">
                <span className="font-pixel text-2xl text-clock-brass">02</span>
              </div>
              <h3 className="font-bold text-xl text-clock-black mb-3">We gaslight you</h3>
              <p className="text-clock-black/70">
                We show you an <em>earlier</em> deadline. Your brain finally goes "oh CRAP" instead of "eh, later."
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto mb-6 bg-clock-red/10 border-3 border-clock-black flex items-center justify-center shadow-[4px_4px_0_0_#1c1917] group-hover:shadow-[2px_2px_0_0_#1c1917] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all group-hover:rotate-1">
                <span className="font-pixel text-2xl text-clock-red">03</span>
              </div>
              <h3 className="font-bold text-xl text-clock-black mb-3">Sweet, sweet victory</h3>
              <p className="text-clock-black/70">
                Finish "just in time" and discover you actually had <em>days left</em>. Dopamine achieved. Shame avoided.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chaotic Divider */}
      <div className="flex justify-center items-end gap-3 py-6 bg-clock-dark overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`w-0.5 ${i % 5 === 0 ? 'bg-clock-brass' : 'bg-clock-ivory/20'}`}
            style={{
              height: `${8 + Math.cos(i * 0.6) * 10}px`,
              transform: `rotate(${Math.cos(i) * 8}deg)`
            }}
          />
        ))}
      </div>

      {/* The Problem Section - Unhinged Edition */}
      <section className="py-20 px-4 bg-clock-parchment">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-pixel text-lg md:text-xl text-clock-black mb-2">
            TIME BLINDNESS
          </h2>
          <p className="text-clock-red font-mono text-sm mb-12">
            IT'S NOT A MORAL FAILING, KAREN
          </p>

          <div className="space-y-4 text-left max-w-xl mx-auto">
            <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917] -rotate-1">
              <div className="flex items-start gap-3">
                <span className="font-pixel text-xs text-clock-brass mt-1">»</span>
                <div>
                  <p className="text-clock-black font-medium">"I have two weeks. That's basically infinite time."</p>
                  <p className="text-clock-black/50 text-sm mt-1 font-mono">— Your brain, committing crimes against future you</p>
                </div>
              </div>
            </div>

            <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917] rotate-1">
              <div className="flex items-start gap-3">
                <span className="font-pixel text-xs text-clock-red mt-1">»</span>
                <div>
                  <p className="text-clock-black font-medium">"WAIT THAT'S TOMORROW?!"</p>
                  <p className="text-clock-black/50 text-sm mt-1 font-mono">— Your brain, 13 days later, betrayed by itself</p>
                </div>
              </div>
            </div>

            <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917] -rotate-0.5">
              <div className="flex items-start gap-3">
                <span className="font-pixel text-xs text-clock-black mt-1">»</span>
                <div>
                  <p className="text-clock-black font-medium">"I literally cannot start until I feel the fear."</p>
                  <p className="text-clock-black/50 text-sm mt-1 font-mono">— Your brain, finally being honest</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-clock-dark text-clock-ivory border-3 border-clock-black max-w-xl mx-auto rotate-1 shadow-[6px_6px_0_0_#ca8a04]">
            <p className="font-pixel text-xs mb-3 text-clock-brass">THE BIG BRAIN INSIGHT</p>
            <p className="text-xl leading-relaxed">
              You <em>need</em> the panic to function. That's just how your brain works.
              <span className="text-clock-brass"> So we manufacture panic earlier</span>,
              giving you time to actually do the thing.
            </p>
            <p className="text-clock-ivory/50 text-sm mt-4 font-mono">
              it's not cheating. it's an accommodation.
            </p>
          </div>
        </div>
      </section>

      {/* Chaotic Divider */}
      <div className="flex justify-center items-end gap-3 py-6 bg-clock-dark overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`w-0.5 ${i % 5 === 0 ? 'bg-clock-brass' : 'bg-clock-ivory/20'}`}
            style={{
              height: `${10 + Math.sin(i * 1.2) * 8}px`,
              transform: `rotate(${Math.sin(i * 0.7) * 10}deg)`
            }}
          />
        ))}
      </div>

      {/* Spiciness Preview Section */}
      <section className="py-20 px-4 bg-clock-ivory">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-lg md:text-xl text-clock-black text-center mb-2">
            CHOOSE YOUR VIOLENCE
          </h2>
          <p className="text-center text-clock-black/60 mb-4 font-mono">
            How mean should Tick be when you're slacking?
          </p>
          <p className="text-center text-clock-red/80 text-sm mb-12">
            (yes his name is Tick. yes he judges you. yes you can adjust his attitude.)
          </p>

          <div className="space-y-4 max-w-2xl mx-auto">
            {/* Level 1 */}
            <div className="bg-clock-parchment border-3 border-clock-black p-5 flex items-center gap-4 shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              <div className="w-14 h-14 bg-mint/50 border-3 border-clock-black flex items-center justify-center shrink-0 rotate-2">
                <span className="font-pixel text-sm">1</span>
              </div>
              <div>
                <p className="text-sm text-clock-black/50 font-mono mb-1">therapy voice</p>
                <p className="text-clock-black italic text-lg">"hey friend, just checking in on that thing~"</p>
              </div>
            </div>

            {/* Level 3 */}
            <div className="bg-clock-parchment border-3 border-clock-black p-5 flex items-center gap-4 shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              <div className="w-14 h-14 bg-clock-brass/30 border-3 border-clock-black flex items-center justify-center shrink-0 -rotate-1">
                <span className="font-pixel text-sm">3</span>
              </div>
              <div>
                <p className="text-sm text-clock-black/50 font-mono mb-1">disappointed parent</p>
                <p className="text-clock-black italic text-lg">"I have asked you ONE thing. ONE. THING."</p>
              </div>
            </div>

            {/* Level 5 */}
            <div className="bg-clock-parchment border-3 border-clock-black p-5 flex items-center gap-4 shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              <div className="w-14 h-14 bg-clock-red/20 border-3 border-clock-black flex items-center justify-center shrink-0 rotate-3">
                <span className="font-pixel text-sm text-clock-red">5</span>
              </div>
              <div>
                <p className="text-sm text-clock-black/50 font-mono mb-1">unhinged chaos mode</p>
                <p className="text-clock-black italic text-lg">"I'M TELLING YOUR MOTHER. I'M DMING YOUR EXES. I'M CALLING YOUR BOSS."</p>
              </div>
            </div>
          </div>

          <p className="text-center text-clock-black/40 text-sm mt-8 font-mono">
            adjustable anytime · tick remembers nothing · tick forgives nothing
          </p>
        </div>
      </section>

      {/* Chaotic Divider */}
      <div className="flex justify-center items-end gap-3 py-6 bg-clock-dark overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`w-0.5 ${i % 5 === 0 ? 'bg-clock-brass' : 'bg-clock-ivory/20'}`}
            style={{
              height: `${6 + Math.cos(i * 0.9) * 12}px`,
              transform: `rotate(${Math.cos(i * 0.5) * 6}deg)`
            }}
          />
        ))}
      </div>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-clock-parchment">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-lg md:text-xl text-clock-black text-center mb-2">
            WHAT YOU GET
          </h2>
          <p className="text-center text-clock-black/50 font-mono text-sm mb-12">
            (besides crippling self-awareness)
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-clock-ivory border-3 border-clock-black p-6 shadow-[4px_4px_0_0_#1c1917] -rotate-1 hover:rotate-0 transition-transform">
              <div className="font-pixel text-xs text-clock-brass mb-3">ADAPTIVE LIES</div>
              <h3 className="font-bold text-lg text-clock-black mb-2">Smart Pressure Scaling</h3>
              <p className="text-clock-black/70 text-sm">
                Miss deadlines? We lie harder. Build trust? We ease up. Your reliability score determines how aggressively we gaslight you.
              </p>
            </div>

            <div className="bg-clock-ivory border-3 border-clock-black p-6 shadow-[4px_4px_0_0_#1c1917] rotate-1 hover:rotate-0 transition-transform">
              <div className="font-pixel text-xs text-clock-brass mb-3">EXCUSE SYSTEM</div>
              <h3 className="font-bold text-lg text-clock-black mb-2">Snooze with Shame</h3>
              <p className="text-clock-black/70 text-sm">
                Need more time? Write an excuse. You get 6 hours. But you have to type out WHY you failed yourself. Accountability, baby.
              </p>
            </div>

            <div className="bg-clock-ivory border-3 border-clock-black p-6 shadow-[4px_4px_0_0_#1c1917] rotate-0.5 hover:rotate-0 transition-transform">
              <div className="font-pixel text-xs text-clock-brass mb-3">THE REVEAL</div>
              <h3 className="font-bold text-lg text-clock-black mb-2">Dopamine on Completion</h3>
              <p className="text-clock-black/70 text-sm">
                Finish a task and we show you how much time you ACTUALLY had left. The relief hits different when you find out you had 3 days to spare.
              </p>
            </div>

            <div className="bg-clock-ivory border-3 border-clock-black p-6 shadow-[4px_4px_0_0_#1c1917] -rotate-0.5 hover:rotate-0 transition-transform">
              <div className="font-pixel text-xs text-clock-brass mb-3">TICK</div>
              <h3 className="font-bold text-lg text-clock-black mb-2">Your Personal Chaos Gremlin</h3>
              <p className="text-clock-black/70 text-sm">
                A little creature who lives in the corner of your screen. He watches. He judges. He threatens. He celebrates. He is unhinged. You will love him.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 bg-clock-dark relative overflow-hidden">
        {/* Background chaos */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute font-pixel text-clock-ivory text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              TICK
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="font-pixel text-xl md:text-2xl text-clock-ivory mb-4">
            STOP FIGHTING<br />YOUR OWN BRAIN
          </h2>
          <p className="text-clock-ivory/70 text-xl mb-8 max-w-md mx-auto">
            Work with your chaos. Not against it.
          </p>

          {onGetStarted ? (
            <button
              onClick={onGetStarted}
              className="px-10 py-4 bg-clock-red text-clock-ivory font-bold border-3 border-clock-red hover:bg-clock-brass hover:border-clock-brass hover:text-clock-black transition-colors text-lg"
            >
              GASLIGHT ME
            </button>
          ) : !submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 bg-clock-ivory text-clock-black placeholder-clock-black/40 border-3 border-clock-ivory focus:border-clock-brass focus:outline-none text-lg font-mono"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-4 bg-clock-red text-clock-ivory font-bold border-3 border-clock-red hover:bg-clock-brass hover:border-clock-brass hover:text-clock-black transition-colors disabled:opacity-50 text-lg whitespace-nowrap"
              >
                {submitting ? '...' : 'JOIN WAITLIST'}
              </button>
            </form>
          ) : (
            <div className="bg-clock-ivory text-clock-black px-8 py-6 max-w-md mx-auto border-3 border-clock-ivory rotate-1">
              <p className="font-pixel text-sm">EXCELLENT CHOICE</p>
              <p className="text-clock-black/70 mt-2">The manipulation begins shortly. We're so proud of you.</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-clock-ivory/40 text-sm font-mono">
            <span>14 days free</span>
            <span>·</span>
            <span>$1/month after</span>
            <span>·</span>
            <span>cheaper than missing another deadline</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-clock-black text-center border-t-3 border-clock-dark">
        <div className="flex justify-center gap-2 mb-4">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-0.5 ${i === 3 ? 'h-4 bg-clock-brass' : 'h-2 bg-clock-ivory/20'}`}
              style={{ transform: `rotate(${(i - 3) * 5}deg)` }}
            />
          ))}
        </div>
        <p className="text-clock-ivory/50 text-sm">
          built for brains that experience time as a lie
        </p>
        <p className="text-clock-ivory/30 text-xs mt-2 font-mono">
          tick'd © 2026 · made with chaos and love
        </p>
      </footer>
    </div>
  )
}
