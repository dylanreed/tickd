// ABOUTME: Modal shown when user triggers escalation to single-task mode.
// ABOUTME: Displays escalation message based on spiciness level.

import TickSprite from "./TickSprite";
import { getRandomPickForMeMessage } from "../data/pickForMeMessages";
import type { SpicyLevel } from "../data/pickForMeMessages";

interface EscalationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  theme: "hinged" | "unhinged";
  spicyLevel: SpicyLevel;
  tasksRequired: number;
  userName?: string;
}

export default function EscalationModal({
  isOpen,
  onConfirm,
  theme,
  spicyLevel,
  tasksRequired,
  userName,
}: EscalationModalProps) {
  if (!isOpen) return null;

  const isHinged = theme === "hinged";
  const message = getRandomPickForMeMessage(
    "escalation_trigger",
    spicyLevel,
    userName
  );

  // Determine Tick expression based on spiciness
  const getExpression = (): "concerned" | "disappointed" | "judgmental" | "unhinged" => {
    if (spicyLevel <= 2) return "concerned";
    if (spicyLevel === 3) return "disappointed";
    if (spicyLevel === 4) return "judgmental";
    return "unhinged";
  };

  return (
    <div className="fixed inset-0 bg-charcoal/60 flex items-center justify-center p-4 z-[100] font-body">
      <div
        className={`max-w-md w-full p-8 ${
          isHinged
            ? "bg-hinged-card rounded-lg border border-hinged-border"
            : "bg-cloud rounded-2xl shadow-xl"
        }`}
      >
        {/* Tick */}
        <div className="mx-auto mb-4 flex justify-center">
          <TickSprite expression={getExpression()} size="lg" />
        </div>

        {/* Title */}
        <h2
          className={`text-center mb-4 ${
            isHinged
              ? "font-medium text-lg text-hinged-text"
              : "font-pixel text-lg text-charcoal"
          }`}
        >
          {isHinged ? "Entering Focus Mode" : "SINGLE-TASK MODE ACTIVATED"}
        </h2>

        {/* Message */}
        <p
          className={`text-center mb-6 ${
            isHinged ? "text-hinged-text-secondary" : "text-dusty-purple"
          }`}
        >
          {message}
        </p>

        {/* Earn-out info */}
        <div
          className={`rounded-xl p-4 mb-6 text-center ${
            isHinged ? "bg-gray-50" : "bg-lavender/50"
          }`}
        >
          <p
            className={`text-sm ${
              isHinged ? "text-hinged-text-secondary" : "text-dusty-purple"
            }`}
          >
            {isHinged
              ? `Complete ${tasksRequired} task${tasksRequired > 1 ? "s" : ""} to unlock your full list.`
              : `Complete ${tasksRequired} task${tasksRequired > 1 ? "s" : ""} to escape.`}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onConfirm}
          className={`w-full py-3 font-bold transition-colors ${
            isHinged
              ? "bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover"
              : "bg-hot-pink text-cloud rounded-full hover:bg-coral"
          }`}
        >
          {isHinged ? "Got it" : "FINE. LET'S DO THIS."}
        </button>
      </div>
    </div>
  );
}
