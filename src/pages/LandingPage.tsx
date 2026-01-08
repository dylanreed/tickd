// ABOUTME: Pre-launch landing page for collecting waitlist signups.
// ABOUTME: Features hero, how it works, spiciness preview, and email capture.

import { useState } from 'react'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setSubmitting(true)
    // TODO: Connect to actual email service (Buttondown, ConvertKit, etc.)
    // For now, just simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-lavender font-body">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Tick Placeholder */}
          <div className="w-32 h-32 mx-auto mb-8 bg-tick-body rounded-full flex items-center justify-center shadow-lg">
            <div className="w-24 h-24 bg-tick-face rounded-full flex items-center justify-center relative">
              {/* Simple face */}
              <div className="absolute top-6 left-5 w-3 h-3 bg-charcoal rounded-full"></div>
              <div className="absolute top-6 right-5 w-3 h-3 bg-charcoal rounded-full"></div>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-tick-nose rounded-full"></div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-2 bg-charcoal rounded-full"></div>
              {/* Cheeks */}
              <div className="absolute top-9 left-2 w-3 h-2 bg-tick-cheeks rounded-full opacity-60"></div>
              <div className="absolute top-9 right-2 w-3 h-2 bg-tick-cheeks rounded-full opacity-60"></div>
            </div>
          </div>

          <h1 className="font-pixel text-2xl md:text-4xl text-charcoal mb-6 leading-relaxed">
            YOU CAN'T HANDLE<br />THE TRUTH!!!
          </h1>

          <p className="text-xl md:text-2xl text-charcoal mb-4 font-semibold">
            So we lie to you about your deadlines.
          </p>

          <p className="text-lg text-dusty-purple mb-12 max-w-xl mx-auto">
            A todo app for people who only function under pressure.
            We show you fake earlier deadlines so you actually get things done.
          </p>

          {/* Email Capture */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 rounded-full bg-cloud text-charcoal placeholder-warm-gray border-2 border-transparent focus:border-hot-pink focus:outline-none text-lg"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-4 bg-hot-pink text-cloud font-bold rounded-full hover:bg-coral transition-colors disabled:opacity-50 text-lg whitespace-nowrap"
              >
                {submitting ? 'Joining...' : 'Lie to me'}
              </button>
            </form>
          ) : (
            <div className="bg-mint text-charcoal px-8 py-4 rounded-2xl max-w-md mx-auto">
              <p className="font-bold text-lg">You're on the list!</p>
              <p className="text-dusty-purple">We'll email you when it's ready. Or when we feel like it. Trust issues start early.</p>
            </div>
          )}

          <p className="text-warm-gray mt-6 text-sm">
            Join the chaos goblins waiting for launch
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <svg className="w-6 h-6 text-dusty-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-xl md:text-2xl text-charcoal text-center mb-16">
            HOW IT WORKS
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-lavender rounded-2xl flex items-center justify-center">
                <span className="font-pixel text-2xl text-dusty-purple">1</span>
              </div>
              <h3 className="font-bold text-xl text-charcoal mb-3">Add a task</h3>
              <p className="text-dusty-purple">
                Enter the <span className="font-bold">real</span> deadline. Be honest. We won't be.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-peach rounded-2xl flex items-center justify-center">
                <span className="font-pixel text-2xl text-coral">2</span>
              </div>
              <h3 className="font-bold text-xl text-charcoal mb-3">See a fake deadline</h3>
              <p className="text-dusty-purple">
                We show you an <span className="font-bold">earlier</span> date. Panic accordingly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-mint rounded-2xl flex items-center justify-center">
                <span className="font-pixel text-2xl text-charcoal">3</span>
              </div>
              <h3 className="font-bold text-xl text-charcoal mb-3">Finish "early"</h3>
              <p className="text-dusty-purple">
                Complete the task, then discover you had <span className="font-bold">days to spare</span>. Dopamine achieved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4 bg-peach">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-pixel text-xl md:text-2xl text-charcoal mb-8">
            SOUND FAMILIAR?
          </h2>

          <div className="space-y-6 text-lg text-charcoal">
            <p className="bg-cloud/50 p-6 rounded-2xl">
              "I'll do it when it's urgent"
              <span className="block text-dusty-purple text-base mt-2">— You, 3 weeks before the deadline</span>
            </p>
            <p className="bg-cloud/50 p-6 rounded-2xl">
              "Why didn't I start earlier?!"
              <span className="block text-dusty-purple text-base mt-2">— Also you, 3 hours before the deadline</span>
            </p>
            <p className="bg-cloud/50 p-6 rounded-2xl">
              "I work best under pressure"
              <span className="block text-dusty-purple text-base mt-2">— You, justifying the chaos</span>
            </p>
          </div>

          <p className="mt-12 text-xl text-charcoal font-semibold">
            What if the pressure was... manufactured? <span className="text-hot-pink">Strategically?</span>
          </p>
        </div>
      </section>

      {/* Spiciness Preview Section */}
      <section className="py-20 px-4 bg-lavender">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-xl md:text-2xl text-charcoal text-center mb-6">
            CHOOSE YOUR ROAST LEVEL
          </h2>
          <p className="text-center text-dusty-purple mb-12 text-lg">
            How mean should we be when you ignore your tasks?
          </p>

          <div className="space-y-4 max-w-2xl mx-auto">
            {/* Level 1 */}
            <div className="bg-cloud p-6 rounded-2xl border-l-4 border-mint">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-mint text-charcoal px-3 py-1 rounded-full text-sm font-bold">Level 1</span>
                <span className="text-dusty-purple">Gentle concern</span>
              </div>
              <p className="text-charcoal italic">"oh no baby what is you doing"</p>
            </div>

            {/* Level 3 */}
            <div className="bg-cloud p-6 rounded-2xl border-l-4 border-golden">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-golden text-charcoal px-3 py-1 rounded-full text-sm font-bold">Level 3</span>
                <span className="text-dusty-purple">Disappointed parent</span>
              </div>
              <p className="text-charcoal italic">"I have asked you ONE thing. ONE THING."</p>
            </div>

            {/* Level 5 */}
            <div className="bg-cloud p-6 rounded-2xl border-l-4 border-hot-pink">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-hot-pink text-cloud px-3 py-1 rounded-full text-sm font-bold">Level 5</span>
                <span className="text-dusty-purple">Maximum violence</span>
              </div>
              <p className="text-charcoal italic">"I'M DMING ALL YOUR EXES ABOUT THIS."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials Section */}
      <section className="py-20 px-4 bg-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-xl md:text-2xl text-charcoal text-center mb-12">
            FUTURE REVIEWS
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-lavender/30 p-6 rounded-2xl">
              <p className="text-charcoal mb-4">"Finally, an app that understands I can't be trusted."</p>
              <p className="text-dusty-purple text-sm">— Future User</p>
            </div>
            <div className="bg-peach/30 p-6 rounded-2xl">
              <p className="text-charcoal mb-4">"I've never been gaslit so effectively."</p>
              <p className="text-dusty-purple text-sm">— Someone, Probably</p>
            </div>
            <div className="bg-mint/30 p-6 rounded-2xl">
              <p className="text-charcoal mb-4">"Is this... is this therapy?"</p>
              <p className="text-dusty-purple text-sm">— A Concerningly Relatable Person</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-hot-pink">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-pixel text-xl md:text-2xl text-cloud mb-6">
            READY TO BE LIED TO?
          </h2>
          <p className="text-cloud/90 text-lg mb-8">
            Join the waitlist. We'll email you when it's ready to manipulate you into productivity.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 rounded-full bg-cloud text-charcoal placeholder-warm-gray border-2 border-transparent focus:border-golden focus:outline-none text-lg"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-4 bg-charcoal text-cloud font-bold rounded-full hover:bg-dusty-purple transition-colors disabled:opacity-50 text-lg whitespace-nowrap"
              >
                {submitting ? 'Joining...' : 'Lie to me'}
              </button>
            </form>
          ) : (
            <div className="bg-cloud text-charcoal px-8 py-4 rounded-2xl max-w-md mx-auto">
              <p className="font-bold text-lg">You're on the list!</p>
              <p className="text-dusty-purple">The deception begins soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-charcoal text-center">
        <p className="text-warm-gray text-sm">
          Built by someone who also can't handle the truth
        </p>
        <p className="text-dusty-purple text-xs mt-2">
          Liars Todo © 2026 — Strategic deception for chaos goblins
        </p>
      </footer>
    </div>
  )
}
