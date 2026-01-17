// ABOUTME: Floating button to trigger Pick For Me task selection.
// ABOUTME: Hidden when < 2 tasks, in single-task mode, or disabled.

import { getRandomPickForMeMessage } from "../data/pickForMeMessages";
import type { SpicyLevel } from "../data/pickForMeMessages";

interface PickForMeButtonProps {
  onPick: () => void;
  isFirstPick: boolean;
  theme: "hinged" | "unhinged";
  spicyLevel: SpicyLevel;
  allOverdue: boolean;
  disabled?: boolean;
}

export default function PickForMeButton({
  onPick,
  isFirstPick,
  theme,
  spicyLevel,
  allOverdue,
  disabled = false,
}: PickForMeButtonProps) {
  const isHinged = theme === "hinged";

  // Get contextual message for button hover/tooltip
  const buttonLabel = isFirstPick ? "Pick For Me" : "Pick Again";
  const tooltipMessage = allOverdue
    ? getRandomPickForMeMessage("all_overdue")
    : isFirstPick
    ? "Let me decide for you"
    : "Asking again, huh?";

  return (
    <button
      onClick={onPick}
      disabled={disabled}
      title={tooltipMessage}
      className={`
        fixed bottom-28 right-4 z-30
        px-4 py-3
        font-bold text-sm
        shadow-lg
        transition-all duration-200
        hover:scale-105 hover:shadow-xl
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${
          isHinged
            ? "bg-hinged-accent text-white rounded-lg hover:bg-hinged-accent-hover"
            : `rounded-full ${
                spicyLevel >= 4
                  ? "bg-hot-pink text-cloud hover:bg-coral animate-pulse"
                  : "bg-mint text-charcoal hover:bg-mint/80"
              }`
        }
      `}
      aria-label={buttonLabel}
    >
      <span className="flex items-center gap-2">
        {/* Dice icon */}
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"
          />
          <circle cx="7" cy="7" r="1" fill="currentColor" />
          <circle cx="17" cy="7" r="1" fill="currentColor" />
          <circle cx="7" cy="17" r="1" fill="currentColor" />
          <circle cx="17" cy="17" r="1" fill="currentColor" />
        </svg>
        {isHinged ? buttonLabel : isFirstPick ? "PICK FOR ME" : "PICK AGAIN"}
      </span>
    </button>
  );
}
