// ABOUTME: Main landing/home page explaining the app concept.
// ABOUTME: Shows before login with sign-up CTA and how it works section.

import { useState } from "react";
import TickSprite from "../components/TickSprite";

interface HomePageProps {
  onGetStarted: () => void;
}

// Sprite expressions for each roast level
const levelExpressions: Record<
  number,
  "smug" | "skeptical" | "disappointed" | "scheming" | "unhinged"
> = {
  1: "smug",
  2: "skeptical",
  3: "disappointed",
  4: "scheming",
  5: "unhinged",
};

export default function HomePage({ onGetStarted }: HomePageProps) {
  const [selectedLevel, setSelectedLevel] = useState<number>(3);

  return (
    <div className="min-h-screen bg-clock-parchment font-body">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center relative">
        <div className="max-w-3xl mx-auto">
          {/* Tick */}
          <div className="flex justify-center mb-8">
            <div className="animate-tick-shake">
              <TickSprite expression="waving" size="xl" className="drop-shadow-[6px_6px_0_rgba(28,25,23,0.3)]" />
            </div>
          </div>

          <h1 className="font-pixel text-2xl md:text-3xl text-clock-black mb-6 leading-relaxed">
            TICK'D
          </h1>

          <p className="text-xl md:text-2xl text-clock-black mb-4 font-semibold">
            The to-do app that lies about your deadlines
          </p>

          <p className="text-lg text-clock-black/70 mb-8 max-w-xl mx-auto">
            Because you only function under pressure, and we both know it.
          </p>

          <button
            onClick={onGetStarted}
            className="px-10 py-4 bg-clock-red text-clock-ivory font-bold border-3 border-clock-black hover:bg-clock-black transition-colors text-lg shadow-[4px_4px_0_0_#1c1917] hover:shadow-[2px_2px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5"
          >
            Get Started
          </button>

          <p className="text-clock-black/50 mt-4 text-sm font-mono">
            14-day free trial, then $1/month
          </p>

          <p className="mt-6 text-clock-black/70">
            Already have an account?{" "}
            <button
              onClick={onGetStarted}
              className="text-clock-red hover:text-clock-brass underline font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="font-pixel text-xs text-clock-black/40 animate-bounce">
            ↓ SCROLL ↓
          </div>
        </div>
      </section>

      {/* Tick Mark Divider */}
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
            HOW IT WORKS
          </h2>
          <p className="text-center text-clock-black/60 mb-16 font-mono">
            (three steps to strategic self-deception)
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto mb-6 bg-clock-parchment border-3 border-clock-black flex items-center justify-center shadow-[4px_4px_0_0_#1c1917] group-hover:shadow-[2px_2px_0_0_#1c1917] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all group-hover:rotate-2">
                <span className="font-pixel text-2xl text-clock-black">01</span>
              </div>
              <h3 className="font-bold text-xl text-clock-black mb-3">
                Add a task
              </h3>
              <p className="text-clock-black/70">
                Enter the <em>real</em> deadline. Be honest. Tick won't be.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto mb-6 bg-clock-brass/20 border-3 border-clock-black flex items-center justify-center shadow-[4px_4px_0_0_#1c1917] group-hover:shadow-[2px_2px_0_0_#1c1917] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all group-hover:-rotate-2">
                <span className="font-pixel text-2xl text-clock-brass">02</span>
              </div>
              <h3 className="font-bold text-xl text-clock-black mb-3">
                See a fake deadline
              </h3>
              <p className="text-clock-black/70">
                Tick shows you an <em>earlier</em> date. Panic accordingly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto mb-6 bg-clock-red/10 border-3 border-clock-black flex items-center justify-center shadow-[4px_4px_0_0_#1c1917] group-hover:shadow-[2px_2px_0_0_#1c1917] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all group-hover:rotate-1">
                <span className="font-pixel text-2xl text-clock-red">03</span>
              </div>
              <h3 className="font-bold text-xl text-clock-black mb-3">
                Finish "early"
              </h3>
              <p className="text-clock-black/70">
                Complete the task, then discover you had <em>days to spare</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tick Mark Divider */}
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

      {/* The Problem Section */}
      <section className="py-20 px-4 bg-clock-parchment">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-pixel text-lg md:text-xl text-clock-black mb-2">
            SOUND FAMILIAR?
          </h2>
          <p className="text-clock-red font-mono text-sm mb-12">
            (we're not judging. ok maybe a little.)
          </p>

          <div className="space-y-4 text-left max-w-xl mx-auto">
            <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917] -rotate-1">
              <p className="text-clock-black font-medium">"I'll do it when it's urgent"</p>
              <p className="text-clock-black/50 text-sm mt-1 font-mono">— You, 3 weeks before the deadline</p>
            </div>

            <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917] rotate-1">
              <p className="text-clock-black font-medium">"Why didn't I start earlier?!"</p>
              <p className="text-clock-black/50 text-sm mt-1 font-mono">— Also you, 3 hours before the deadline</p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-clock-dark text-clock-ivory border-3 border-clock-black max-w-xl mx-auto">
            <p className="text-xl">
              What if the pressure was... <span className="text-clock-red font-bold">manufactured?</span>
            </p>
          </div>
        </div>
      </section>

      {/* Tick Mark Divider */}
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
          <h2 className="font-pixel text-lg md:text-xl text-clock-black text-center mb-10">
            CHOOSE YOUR ROAST LEVEL
          </h2>

          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
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
                } ${selectedLevel === level
                    ? "shadow-[2px_2px_0_0_#1c1917] translate-x-0.5 translate-y-0.5 ring-2 ring-clock-red"
                    : "shadow-[4px_4px_0_0_#1c1917] opacity-60 hover:opacity-100"}`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-clock-parchment border-3 border-clock-black p-6 shadow-[4px_4px_0_0_#1c1917] flex items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 border-2 border-clock-black text-sm font-bold font-mono ${
                    selectedLevel <= 2 ? "bg-mint/50" : selectedLevel === 3 ? "bg-clock-brass/30" : "bg-clock-red/30"
                  }`}>
                    Level {selectedLevel}
                  </span>
                  <span className="text-clock-black/60 font-mono text-sm">
                    {selectedLevel === 1 && "gentle concern"}
                    {selectedLevel === 2 && "pointed reminders"}
                    {selectedLevel === 3 && "disappointed parent"}
                    {selectedLevel === 4 && "unfiltered chaos"}
                    {selectedLevel === 5 && "maximum violence"}
                  </span>
                </div>
                <p className="text-clock-black italic text-lg">
                  {selectedLevel === 1 && '"oh no baby what is you doing"'}
                  {selectedLevel === 2 && '"Overdue. Per my last three notifications."'}
                  {selectedLevel === 3 && '"I have asked you ONE thing. ONE THING."'}
                  {selectedLevel === 4 && '"THE AUDACITY. THE UNMITIGATED GALL."'}
                  {selectedLevel === 5 && '"I\'M DMING ALL YOUR EXES ABOUT THIS."'}
                </p>
              </div>
              <div className="flex-shrink-0">
                <TickSprite
                  expression={levelExpressions[selectedLevel]}
                  size="xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tick Mark Divider */}
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

      {/* Meet Tick Section */}
      <section className="py-20 px-4 bg-clock-parchment">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-pixel text-lg md:text-xl text-clock-black mb-8">
            MEET TICK
          </h2>

          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center group">
              <div className="group-hover:animate-tick-shake">
                <TickSprite expression="happy" size="lg" className="mx-auto mb-2" />
              </div>
              <p className="text-sm text-clock-black/60 font-mono">friendly</p>
            </div>
            <div className="text-center group">
              <div className="group-hover:animate-tick-shake">
                <TickSprite expression="scheming" size="lg" className="mx-auto mb-2" />
              </div>
              <p className="text-sm text-clock-black/60 font-mono">suspicious</p>
            </div>
            <div className="text-center group">
              <div className="group-hover:animate-tick-shake">
                <TickSprite expression="unhinged" size="lg" className="mx-auto mb-2" />
              </div>
              <p className="text-sm text-clock-black/60 font-mono">unhinged</p>
            </div>
          </div>

          <p className="text-lg text-clock-black max-w-xl mx-auto">
            Tick lives in the corner of your screen, watching. Judging. Lying.
            Tap him for a quip. Long-press to adjust how mean he is.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-clock-dark">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-pixel text-lg md:text-xl text-clock-ivory mb-6">
            READY TO BE LIED TO?
          </h2>
          <p className="text-clock-ivory/70 text-lg mb-8">
            Join the chaos goblins who've accepted they can't handle the truth.
          </p>

          <button
            onClick={onGetStarted}
            className="px-10 py-4 bg-clock-red text-clock-ivory font-bold border-3 border-clock-red hover:bg-clock-brass hover:border-clock-brass hover:text-clock-black transition-colors text-lg"
          >
            Start Free Trial
          </button>

          <p className="text-clock-ivory/40 mt-4 text-sm font-mono">
            14 days free · $1/month after
          </p>
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
          Built by someone who also can't handle the truth
        </p>
        <p className="text-clock-ivory/30 text-xs mt-2 font-mono">
          tick'd © 2026
        </p>
      </footer>
    </div>
  );
}
