// ABOUTME: Main landing/home page explaining the app concept.
// ABOUTME: Shows before login with sign-up CTA and how it works section.

import { useState } from 'react'

// Import mascot images
import neutralImg from '../assets/tick/neutral.png'
import shiftyImg from '../assets/tick/shifty.png'
import evilImg from '../assets/tick/evil.png'

interface HomePageProps {
  onGetStarted: () => void
}

export default function HomePage({ onGetStarted }: HomePageProps) {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-lavender font-body">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Tick */}
          <div className="w-32 h-32 mx-auto mb-8">
            <img
              src={neutralImg}
              alt="Tick the mascot"
              className="w-full h-full object-cover rounded-full shadow-lg"
            />
          </div>

          <h1 className="font-pixel text-2xl md:text-3xl text-charcoal mb-6 leading-relaxed">
            TICK IS A LIAR
          </h1>

          <p className="text-xl md:text-2xl text-charcoal mb-4 font-semibold">
            A todo app that lies to you about deadlines.
          </p>

          <p className="text-lg text-dusty-purple mb-8 max-w-xl mx-auto">
            Because you only function under pressure, and we both know it.
          </p>

          <button
            onClick={onGetStarted}
            className="px-10 py-4 bg-hot-pink text-cloud font-bold rounded-full hover:bg-coral transition-colors text-lg"
          >
            Get Started
          </button>

          <p className="text-warm-gray mt-4 text-sm">
            Free forever. No credit card needed.
          </p>

          <p className="mt-6 text-dusty-purple">
            Already have an account?{' '}
            <button
              onClick={onGetStarted}
              className="text-hot-pink hover:text-coral underline font-medium transition-colors"
            >
              Sign in
            </button>
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
                Enter the <span className="font-bold">real</span> deadline. Be honest. Tick won't be.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-peach rounded-2xl flex items-center justify-center">
                <span className="font-pixel text-2xl text-coral">2</span>
              </div>
              <h3 className="font-bold text-xl text-charcoal mb-3">See a fake deadline</h3>
              <p className="text-dusty-purple">
                Tick shows you an <span className="font-bold">earlier</span> date. Panic accordingly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-mint rounded-2xl flex items-center justify-center">
                <span className="font-pixel text-2xl text-charcoal">3</span>
              </div>
              <h3 className="font-bold text-xl text-charcoal mb-3">Finish "early"</h3>
              <p className="text-dusty-purple">
                Complete the task, then discover you had <span className="font-bold">days to spare</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4 bg-peach/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-pixel text-xl md:text-2xl text-charcoal mb-8">
            SOUND FAMILIAR?
          </h2>

          <div className="space-y-4 text-lg text-charcoal">
            <p className="bg-cloud/70 p-5 rounded-2xl">
              "I'll do it when it's urgent"
              <span className="block text-dusty-purple text-base mt-2">— You, 3 weeks before the deadline</span>
            </p>
            <p className="bg-cloud/70 p-5 rounded-2xl">
              "Why didn't I start earlier?!"
              <span className="block text-dusty-purple text-base mt-2">— Also you, 3 hours before the deadline</span>
            </p>
          </div>

          <p className="mt-10 text-xl text-charcoal font-semibold">
            What if the pressure was... <span className="text-hot-pink">manufactured?</span>
          </p>
        </div>
      </section>

      {/* Spiciness Preview Section */}
      <section className="py-20 px-4 bg-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-xl md:text-2xl text-charcoal text-center mb-4">
            CHOOSE YOUR ROAST LEVEL
          </h2>
          <p className="text-center text-dusty-purple mb-10 text-lg">
            How mean should Tick be when you ignore your tasks?
          </p>

          <div className="flex justify-center gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onMouseEnter={() => setHoveredLevel(level)}
                onMouseLeave={() => setHoveredLevel(null)}
                className={`w-12 h-12 rounded-full font-bold transition-all ${
                  level === 1 ? 'bg-mint text-charcoal' :
                  level === 2 ? 'bg-peach text-charcoal' :
                  level === 3 ? 'bg-golden text-charcoal' :
                  level === 4 ? 'bg-coral text-cloud' :
                  'bg-hot-pink text-cloud'
                } ${hoveredLevel === level ? 'scale-125 shadow-lg' : ''}`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            {/* Level previews */}
            <div className={`bg-lavender/30 p-6 rounded-2xl transition-all ${hoveredLevel === 1 ? 'opacity-100' : hoveredLevel ? 'opacity-0 hidden' : 'opacity-100'}`}>
              {hoveredLevel === 1 ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-mint text-charcoal px-3 py-1 rounded-full text-sm font-bold">Level 1</span>
                    <span className="text-dusty-purple">Gentle concern</span>
                  </div>
                  <p className="text-charcoal italic">"oh no baby what is you doing"</p>
                </>
              ) : !hoveredLevel ? (
                <p className="text-dusty-purple text-center">Hover over a level to preview</p>
              ) : null}
            </div>

            {hoveredLevel === 2 && (
              <div className="bg-peach/30 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-peach text-charcoal px-3 py-1 rounded-full text-sm font-bold">Level 2</span>
                  <span className="text-dusty-purple">Pointed reminders</span>
                </div>
                <p className="text-charcoal italic">"Overdue. Per my last three notifications."</p>
              </div>
            )}

            {hoveredLevel === 3 && (
              <div className="bg-golden/30 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-golden text-charcoal px-3 py-1 rounded-full text-sm font-bold">Level 3</span>
                  <span className="text-dusty-purple">Disappointed parent</span>
                </div>
                <p className="text-charcoal italic">"I have asked you ONE thing. ONE THING."</p>
              </div>
            )}

            {hoveredLevel === 4 && (
              <div className="bg-coral/30 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-coral text-cloud px-3 py-1 rounded-full text-sm font-bold">Level 4</span>
                  <span className="text-dusty-purple">Unfiltered chaos</span>
                </div>
                <p className="text-charcoal italic">"THE AUDACITY. THE UNMITIGATED GALL."</p>
              </div>
            )}

            {hoveredLevel === 5 && (
              <div className="bg-hot-pink/30 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-hot-pink text-cloud px-3 py-1 rounded-full text-sm font-bold">Level 5</span>
                  <span className="text-dusty-purple">Maximum violence</span>
                </div>
                <p className="text-charcoal italic">"I'M DMING ALL YOUR EXES ABOUT THIS."</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Meet Tick Section */}
      <section className="py-20 px-4 bg-lavender">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-pixel text-xl md:text-2xl text-charcoal mb-8">
            MEET TICK
          </h2>

          <div className="flex justify-center gap-6 mb-8">
            <div className="text-center">
              <img src={neutralImg} alt="Tick neutral" className="w-20 h-20 rounded-full shadow-md mx-auto mb-2" />
              <p className="text-sm text-dusty-purple">Friendly</p>
            </div>
            <div className="text-center">
              <img src={shiftyImg} alt="Tick shifty" className="w-20 h-20 rounded-full shadow-md mx-auto mb-2" />
              <p className="text-sm text-dusty-purple">Suspicious</p>
            </div>
            <div className="text-center">
              <img src={evilImg} alt="Tick evil" className="w-20 h-20 rounded-full shadow-md mx-auto mb-2" />
              <p className="text-sm text-dusty-purple">Unhinged</p>
            </div>
          </div>

          <p className="text-lg text-charcoal max-w-xl mx-auto">
            Tick lives in the corner of your screen, watching. Judging. Lying.
            Tap him for a quip. Long-press to adjust how mean he is.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-hot-pink">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-pixel text-xl md:text-2xl text-cloud mb-6">
            READY TO BE LIED TO?
          </h2>
          <p className="text-cloud/90 text-lg mb-8">
            Join the chaos goblins who've accepted they can't handle the truth.
          </p>

          <button
            onClick={onGetStarted}
            className="px-10 py-4 bg-cloud text-hot-pink font-bold rounded-full hover:bg-lavender transition-colors text-lg"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-charcoal text-center">
        <p className="text-warm-gray text-sm">
          Built by someone who also can't handle the truth
        </p>
        <p className="text-dusty-purple text-xs mt-2">
          Tick is a Liar © 2026 — Strategic deception for chaos goblins
        </p>
      </footer>
    </div>
  )
}
