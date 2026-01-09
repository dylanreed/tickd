// ABOUTME: Developer preview page for testing color palette options.
// ABOUTME: Shows warm, neutral, and contrast color schemes side by side.

import { useState } from "react";
import TickSprite from "../components/TickSprite";

type Palette = "warm" | "neutral" | "contrast";

const palettes: Record<Palette, {
  name: string;
  bg: string;
  bgSecondary: string;
  accent: string;
  accentHover: string;
  textPrimary: string;
  textSecondary: string;
  card: string;
}> = {
  warm: {
    name: "Warm",
    bg: "#FFF5EB",           // Warm cream
    bgSecondary: "#FFE8D6",  // Soft peach
    accent: "#E85D4C",       // Warm red (matches Tick)
    accentHover: "#D14B3A",
    textPrimary: "#4A3728",  // Warm brown
    textSecondary: "#8B7355",
    card: "#FFFAF5",
  },
  neutral: {
    name: "Neutral",
    bg: "#F7F5F3",           // Warm off-white
    bgSecondary: "#EDE9E4",  // Light warm gray
    accent: "#E85D4C",       // Keep Tick's red
    accentHover: "#D14B3A",
    textPrimary: "#3D3D3D",  // Charcoal
    textSecondary: "#6B6B6B",
    card: "#FFFFFF",
  },
  contrast: {
    name: "Contrast",
    bg: "#E8E4F0",           // Softer lavender
    bgSecondary: "#D9D2E9",  // Muted purple
    accent: "#E85D4C",       // Tick's red
    accentHover: "#D14B3A",
    textPrimary: "#3D3D3D",
    textSecondary: "#6B5B7A", // Dusty purple
    card: "#F8F6FB",
  },
};

function PreviewCard({ palette, isSelected, onClick }: {
  palette: Palette;
  isSelected: boolean;
  onClick: () => void;
}) {
  const p = palettes[palette];

  return (
    <button
      onClick={onClick}
      className={`text-left rounded-xl overflow-hidden transition-all ${
        isSelected ? "ring-4 ring-black/20 scale-105" : "hover:scale-102"
      }`}
    >
      <div style={{ backgroundColor: p.bg }} className="p-6">
        <div className="flex justify-center mb-4">
          <TickSprite expression="happy" size="lg" />
        </div>
        <h2
          className="font-pixel text-lg text-center mb-2"
          style={{ color: p.textPrimary }}
        >
          TICK'D
        </h2>
        <p
          className="text-center text-sm mb-4"
          style={{ color: p.textSecondary }}
        >
          The to-do app that lies about your deadlines
        </p>
        <div
          className="text-center py-2 px-4 rounded-full font-bold text-white text-sm"
          style={{ backgroundColor: p.accent }}
        >
          Get Started
        </div>
      </div>
      <div style={{ backgroundColor: p.bgSecondary }} className="p-4 text-center">
        <span
          className="font-bold text-sm"
          style={{ color: p.textPrimary }}
        >
          #{palette.toUpperCase()}
        </span>
        <p className="text-xs mt-1" style={{ color: p.textSecondary }}>
          {p.name} palette
        </p>
      </div>
    </button>
  );
}

function FullPreview({ palette }: { palette: Palette }) {
  const p = palettes[palette];

  return (
    <div style={{ backgroundColor: p.bg }} className="rounded-2xl overflow-hidden">
      {/* Hero */}
      <div className="p-8 text-center">
        <div className="flex justify-center mb-6">
          <TickSprite expression="idle" size="xl" />
        </div>
        <h1
          className="font-pixel text-2xl mb-4"
          style={{ color: p.textPrimary }}
        >
          TICK'D
        </h1>
        <p
          className="text-xl font-semibold mb-2"
          style={{ color: p.textPrimary }}
        >
          The to-do app that lies about your deadlines
        </p>
        <p
          className="mb-6"
          style={{ color: p.textSecondary }}
        >
          Because you only function under pressure, and we both know it.
        </p>
        <button
          className="px-8 py-3 rounded-full font-bold text-white transition-colors"
          style={{ backgroundColor: p.accent }}
        >
          Get Started
        </button>
        <p className="mt-3 text-sm" style={{ color: p.textSecondary }}>
          Free forever. No credit card needed.
        </p>
      </div>

      {/* Secondary section */}
      <div style={{ backgroundColor: p.card }} className="p-8">
        <h2
          className="font-pixel text-lg text-center mb-6"
          style={{ color: p.textPrimary }}
        >
          HOW IT WORKS
        </h2>
        <div className="flex justify-center gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="w-16 h-16 rounded-xl flex items-center justify-center font-pixel"
              style={{
                backgroundColor: p.bgSecondary,
                color: p.textPrimary
              }}
            >
              {n}
            </div>
          ))}
        </div>
      </div>

      {/* Roast level preview */}
      <div style={{ backgroundColor: p.bgSecondary }} className="p-8">
        <h2
          className="font-pixel text-lg text-center mb-6"
          style={{ color: p.textPrimary }}
        >
          CHOOSE YOUR ROAST
        </h2>
        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                level === 3 ? "scale-125" : "opacity-60"
              }`}
              style={{
                backgroundColor: level <= 2 ? "#B8E0D2" :
                                level === 3 ? "#FFD166" :
                                level === 4 ? p.accent : "#FF5E8A",
                color: level <= 3 ? p.textPrimary : "white"
              }}
            >
              {level}
            </div>
          ))}
        </div>
        <div
          className="rounded-xl p-4 flex items-center gap-4"
          style={{ backgroundColor: p.card }}
        >
          <div className="flex-1">
            <span
              className="text-xs font-bold px-2 py-1 rounded-full"
              style={{ backgroundColor: "#FFD166", color: p.textPrimary }}
            >
              Level 3
            </span>
            <p className="mt-2 italic" style={{ color: p.textPrimary }}>
              "I have asked you ONE thing."
            </p>
          </div>
          <TickSprite expression="disappointed" size="md" />
        </div>
      </div>
    </div>
  );
}

export default function ColorPreviewPage() {
  const [selected, setSelected] = useState<Palette>("warm");

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-body">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-pixel text-2xl text-gray-800 mb-2">
          COLOR PALETTES
        </h1>
        <p className="text-gray-600 mb-8">
          Click a palette to see the full preview below
        </p>

        {/* Palette selector */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <PreviewCard
            palette="warm"
            isSelected={selected === "warm"}
            onClick={() => setSelected("warm")}
          />
          <PreviewCard
            palette="neutral"
            isSelected={selected === "neutral"}
            onClick={() => setSelected("neutral")}
          />
          <PreviewCard
            palette="contrast"
            isSelected={selected === "contrast"}
            onClick={() => setSelected("contrast")}
          />
        </div>

        {/* Full preview */}
        <div className="mb-8">
          <h2 className="font-pixel text-lg text-gray-800 mb-4">
            FULL PREVIEW: #{selected.toUpperCase()}
          </h2>
          <FullPreview palette={selected} />
        </div>

        {/* Color values */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4">
            {palettes[selected].name} Palette Values
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(palettes[selected]).filter(([key]) => key !== "name").map(([key, value]) => (
              <div key={key} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded border border-gray-200"
                  style={{ backgroundColor: value }}
                />
                <div>
                  <p className="text-xs text-gray-500">{key}</p>
                  <p className="text-sm font-mono">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
