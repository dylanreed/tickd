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
  1: "smug", // core 10
  2: "skeptical", // secondary 8
  3: "disappointed", // core 5
  4: "scheming", // secondary 2
  5: "unhinged", // core 7
};

export default function HomePage({ onGetStarted }: HomePageProps) {
  const [selectedLevel, setSelectedLevel] = useState<number>(3);

  return (
    <div className="min-h-screen bg-lavender font-body">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Tick */}
          <div className="flex justify-center mb-8">
            <TickSprite expression="waving" size="xl" />
          </div>

          <h1 className="font-pixel text-2xl md:text-3xl text-charcoal mb-6 leading-relaxed">
            TICK'D
          </h1>

          <p className="text-xl md:text-2xl text-charcoal mb-4 font-semibold">
            The to-do app that lies about your deadlines
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
            14-day free trial, then $1/month
          </p>

          <p className="mt-6 text-dusty-purple">
            Already have an account?{" "}
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
          <svg
            className="w-6 h-6 text-dusty-purple"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
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
              <h3 className="font-bold text-xl text-charcoal mb-3">
                Add a task
              </h3>
              <p className="text-dusty-purple">
                Enter the <span className="font-bold">real</span> deadline. Be
                honest. Tick won't be.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-peach rounded-2xl flex items-center justify-center">
                <span className="font-pixel text-2xl text-coral">2</span>
              </div>
              <h3 className="font-bold text-xl text-charcoal mb-3">
                See a fake deadline
              </h3>
              <p className="text-dusty-purple">
                Tick shows you an <span className="font-bold">earlier</span>{" "}
                date. Panic accordingly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-mint rounded-2xl flex items-center justify-center">
                <span className="font-pixel text-2xl text-charcoal">3</span>
              </div>
              <h3 className="font-bold text-xl text-charcoal mb-3">
                Finish "early"
              </h3>
              <p className="text-dusty-purple">
                Complete the task, then discover you had{" "}
                <span className="font-bold">days to spare</span>.
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
              <span className="block text-dusty-purple text-base mt-2">
                — You, 3 weeks before the deadline
              </span>
            </p>
            <p className="bg-cloud/70 p-5 rounded-2xl">
              "Why didn't I start earlier?!"
              <span className="block text-dusty-purple text-base mt-2">
                — Also you, 3 hours before the deadline
              </span>
            </p>
          </div>

          <p className="mt-10 text-xl text-charcoal font-semibold">
            What if the pressure was...{" "}
            <span className="text-hot-pink">manufactured?</span>
          </p>
        </div>
      </section>

      {/* Spiciness Preview Section */}
      <section className="py-20 px-4 bg-cloud">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-xl md:text-2xl text-charcoal text-center mb-10">
            CHOOSE YOUR ROAST LEVEL
          </h2>

          <div className="flex justify-center gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`w-12 h-12 rounded-full font-bold transition-all ${
                  level === 1
                    ? "bg-mint text-charcoal"
                    : level === 2
                      ? "bg-peach text-charcoal"
                      : level === 3
                        ? "bg-golden text-charcoal"
                        : level === 4
                          ? "bg-coral text-cloud"
                          : "bg-hot-pink text-cloud"
                } ${selectedLevel === level ? "scale-125 ring-4 ring-charcoal/20" : "opacity-60 hover:opacity-100"}`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <div
              className={`p-6 rounded-2xl flex items-center gap-6 ${
                selectedLevel === 1
                  ? "bg-mint/30"
                  : selectedLevel === 2
                    ? "bg-peach/30"
                    : selectedLevel === 3
                      ? "bg-golden/30"
                      : selectedLevel === 4
                        ? "bg-coral/30"
                        : "bg-hot-pink/30"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      selectedLevel === 1
                        ? "bg-mint text-charcoal"
                        : selectedLevel === 2
                          ? "bg-peach text-charcoal"
                          : selectedLevel === 3
                            ? "bg-golden text-charcoal"
                            : selectedLevel === 4
                              ? "bg-coral text-cloud"
                              : "bg-hot-pink text-cloud"
                    }`}
                  >
                    Level {selectedLevel}
                  </span>
                  <span className="text-dusty-purple">
                    {selectedLevel === 1 && "Gentle concern"}
                    {selectedLevel === 2 && "Pointed reminders"}
                    {selectedLevel === 3 && "Disappointed parent"}
                    {selectedLevel === 4 && "Unfiltered chaos"}
                    {selectedLevel === 5 && "Maximum violence"}
                  </span>
                </div>
                <p className="text-charcoal italic">
                  {selectedLevel === 1 && '"oh no baby what is you doing"'}
                  {selectedLevel === 2 &&
                    '"Overdue. Per my last three notifications."'}
                  {selectedLevel === 3 &&
                    '"I have asked you ONE thing. ONE THING."'}
                  {selectedLevel === 4 &&
                    '"THE AUDACITY. THE UNMITIGATED GALL."'}
                  {selectedLevel === 5 &&
                    '"I\'M DMING ALL YOUR EXES ABOUT THIS."'}
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

      {/* Meet Tick Section */}
      <section className="py-20 px-4 bg-lavender">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-pixel text-xl md:text-2xl text-charcoal mb-8">
            MEET TICK
          </h2>

          <div className="flex justify-center gap-6 mb-8">
            <div className="text-center">
              <TickSprite
                expression="happy"
                size="md"
                className="mx-auto mb-2"
              />
              <p className="text-sm text-dusty-purple">Friendly</p>
            </div>
            <div className="text-center">
              <TickSprite
                expression="scheming"
                size="md"
                className="mx-auto mb-2"
              />
              <p className="text-sm text-dusty-purple">Suspicious</p>
            </div>
            <div className="text-center">
              <TickSprite
                expression="unhinged"
                size="md"
                className="mx-auto mb-2"
              />
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
            Start Free Trial
          </button>

          <p className="text-cloud/70 mt-4 text-sm">
            14 days free, then $1/month
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-charcoal text-center">
        <p className="text-warm-gray text-sm">
          Built by someone who also can't handle the truth
        </p>
        <p className="text-dusty-purple text-xs mt-2">
          Tick'd © 2026 — Strategic deception for chaos goblins
        </p>
      </footer>
    </div>
  );
}
