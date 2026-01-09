// ABOUTME: Developer reference page showing all Tick sprite expressions.
// ABOUTME: Displays each sprite with its name and index for easy selection.

import TickSprite, { type TickExpression } from "../components/TickSprite";

const coreExpressions: { name: TickExpression; index: number }[] = [
  { name: "idle", index: 1 },
  { name: "smug", index: 2 },
  { name: "shocked", index: 3 },
  { name: "happy", index: 4 },
  { name: "unhinged", index: 5 },
  { name: "suspicious", index: 6 },
  { name: "disappointed", index: 7 },
  { name: "concerned", index: 8 },
  { name: "celebrating", index: 9 },
  { name: "judgmental", index: 10 },
];

const secondaryExpressions: { name: TickExpression; index: number }[] = [
  { name: "eager", index: 1 },
  { name: "skeptical", index: 2 },
  { name: "waving", index: 3 },
  { name: "annoyed", index: 4 },
  { name: "tapping_foot", index: 5 },
  { name: "pleading", index: 6 },
  { name: "confused", index: 7 },
  { name: "apologetic", index: 8 },
  { name: "relaxed", index: 9 },
  { name: "scheming", index: 10 },
];

export default function SpriteReferencePage() {
  return (
    <div className="min-h-screen bg-lavender font-body p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-pixel text-2xl text-charcoal mb-2">
          SPRITE REFERENCE
        </h1>
        <p className="text-dusty-purple mb-8">
          All Tick expressions with their names and indices (1-indexed)
        </p>

        {/* Core Expressions */}
        <section className="mb-12">
          <h2 className="font-pixel text-lg text-charcoal mb-6">
            CORE EXPRESSIONS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {coreExpressions.map(({ name, index }) => (
              <div
                key={name}
                className="bg-cloud rounded-xl p-4 text-center hover:scale-105 transition-transform"
              >
                <TickSprite expression={name} size="lg" className="mx-auto mb-3" />
                <p className="font-bold text-charcoal">{name}</p>
                <p className="text-sm text-dusty-purple">Core {index}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary Expressions */}
        <section>
          <h2 className="font-pixel text-lg text-charcoal mb-6">
            SECONDARY EXPRESSIONS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {secondaryExpressions.map(({ name, index }) => (
              <div
                key={name}
                className="bg-cloud rounded-xl p-4 text-center hover:scale-105 transition-transform"
              >
                <TickSprite expression={name} size="lg" className="mx-auto mb-3" />
                <p className="font-bold text-charcoal">{name}</p>
                <p className="text-sm text-dusty-purple">Secondary {index}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Back link */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="text-hot-pink hover:text-coral underline font-medium"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
