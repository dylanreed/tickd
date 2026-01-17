// ABOUTME: Component for managing Time Blindness Toolkit settings.
// ABOUTME: Allows toggling time tools, estimation, alerts, and visual preferences.

import { useState } from 'react'
import { useProfile } from '../hooks/useProfile'

export default function TimeToolsSettings() {
  const { profile, updateProfile } = useProfile()
  const [saving, setSaving] = useState<string | null>(null)

  if (!profile) return null

  const isHinged = profile.theme !== 'unhinged'

  // Default to true for backwards compatibility
  const timeToolsEnabled = profile.time_tools_enabled ?? true
  const estimationPromptsEnabled = profile.estimation_prompts_enabled ?? true
  const estimateAlertsEnabled = profile.estimate_alerts_enabled ?? true
  const dailyCheckinEnabled = profile.daily_checkin_enabled ?? true
  const brainStateAffectsSpiciness = profile.brain_state_affects_spiciness ?? true
  const deadlineVisuals = profile.deadline_visuals ?? 'match_app'

  const handleToggle = async (
    field: 'time_tools_enabled' | 'estimation_prompts_enabled' | 'estimate_alerts_enabled' | 'daily_checkin_enabled' | 'brain_state_affects_spiciness',
    currentValue: boolean
  ) => {
    setSaving(field)
    await updateProfile({ [field]: !currentValue })
    setSaving(null)
  }

  const handleSelect = async (
    field: 'deadline_visuals',
    value: string
  ) => {
    setSaving(field)
    await updateProfile({ [field]: value as 'hinged' | 'unhinged' | 'match_app' })
    setSaving(null)
  }

  if (isHinged) {
    return (
      <div className="space-y-6">
        <h3 className="font-bold text-lg text-charcoal">Time Tools</h3>

        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Time Blindness Toolkit</p>
              <p className="text-sm text-dusty-purple">
                Enable all time awareness features
              </p>
            </div>
            <button
              onClick={() => handleToggle('time_tools_enabled', timeToolsEnabled)}
              disabled={saving === 'time_tools_enabled'}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                timeToolsEnabled
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'time_tools_enabled' ? '...' : timeToolsEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Time Estimates</p>
              <p className="text-sm text-dusty-purple">
                Ask how long tasks will take when creating them
              </p>
            </div>
            <button
              onClick={() => handleToggle('estimation_prompts_enabled', estimationPromptsEnabled)}
              disabled={saving === 'estimation_prompts_enabled' || !timeToolsEnabled}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                !timeToolsEnabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : estimationPromptsEnabled
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'estimation_prompts_enabled' ? '...' : estimationPromptsEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Estimate Alerts</p>
              <p className="text-sm text-dusty-purple">
                Notify when you're running over your estimate
              </p>
            </div>
            <button
              onClick={() => handleToggle('estimate_alerts_enabled', estimateAlertsEnabled)}
              disabled={saving === 'estimate_alerts_enabled' || !timeToolsEnabled}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                !timeToolsEnabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : estimateAlertsEnabled
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'estimate_alerts_enabled' ? '...' : estimateAlertsEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Daily Check-in</p>
              <p className="text-sm text-dusty-purple">
                Quick brain state check each day
              </p>
            </div>
            <button
              onClick={() => handleToggle('daily_checkin_enabled', dailyCheckinEnabled)}
              disabled={saving === 'daily_checkin_enabled' || !timeToolsEnabled}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                !timeToolsEnabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : dailyCheckinEnabled
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'daily_checkin_enabled' ? '...' : dailyCheckinEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Brain State Adjusts Spiciness</p>
              <p className="text-sm text-dusty-purple">
                Be gentler on low-energy days
              </p>
            </div>
            <button
              onClick={() => handleToggle('brain_state_affects_spiciness', brainStateAffectsSpiciness)}
              disabled={saving === 'brain_state_affects_spiciness' || !timeToolsEnabled || !dailyCheckinEnabled}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                !timeToolsEnabled || !dailyCheckinEnabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : brainStateAffectsSpiciness
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'brain_state_affects_spiciness' ? '...' : brainStateAffectsSpiciness ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Deadline Visuals</p>
              <p className="text-sm text-dusty-purple">
                How urgent deadlines appear
              </p>
            </div>
            <select
              value={deadlineVisuals}
              onChange={(e) => handleSelect('deadline_visuals', e.target.value)}
              disabled={saving === 'deadline_visuals' || !timeToolsEnabled}
              className={`px-4 py-2 rounded-md font-medium border border-hinged-border ${
                !timeToolsEnabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-hinged-card text-hinged-text'
              }`}
            >
              <option value="match_app">Match App Theme</option>
              <option value="hinged">Subtle</option>
              <option value="unhinged">Dramatic</option>
            </select>
          </div>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="space-y-4">
      <h3 className="font-pixel text-sm text-clock-black">TIME TOOLS</h3>

      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Time Blindness Toolkit</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {timeToolsEnabled
                ? 'help with time perception (I know, I know)'
                : 'ignoring time problems (bold)'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('time_tools_enabled', timeToolsEnabled)}
            disabled={saving === 'time_tools_enabled'}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              timeToolsEnabled ? 'bg-clock-red text-clock-ivory' : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'time_tools_enabled' ? '...' : timeToolsEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Time Estimates</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {!timeToolsEnabled
                ? 'enable time tools first'
                : estimationPromptsEnabled
                ? '"how long?" (lol good luck)'
                : 'no estimate prompts (chaos)'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('estimation_prompts_enabled', estimationPromptsEnabled)}
            disabled={saving === 'estimation_prompts_enabled' || !timeToolsEnabled}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              !timeToolsEnabled
                ? 'bg-clock-parchment/50 text-clock-black/30 cursor-not-allowed'
                : estimationPromptsEnabled
                ? 'bg-clock-red text-clock-ivory'
                : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'estimation_prompts_enabled' ? '...' : estimationPromptsEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Estimate Alerts</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {!timeToolsEnabled
                ? 'enable time tools first'
                : estimateAlertsEnabled
                ? 'I\'ll nag when you go over'
                : 'no alerts (living dangerously)'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('estimate_alerts_enabled', estimateAlertsEnabled)}
            disabled={saving === 'estimate_alerts_enabled' || !timeToolsEnabled}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              !timeToolsEnabled
                ? 'bg-clock-parchment/50 text-clock-black/30 cursor-not-allowed'
                : estimateAlertsEnabled
                ? 'bg-clock-red text-clock-ivory'
                : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'estimate_alerts_enabled' ? '...' : estimateAlertsEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Daily Check-in</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {!timeToolsEnabled
                ? 'enable time tools first'
                : dailyCheckinEnabled
                ? '"how\'s the brain today?"'
                : 'skipping brain check (risky)'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('daily_checkin_enabled', dailyCheckinEnabled)}
            disabled={saving === 'daily_checkin_enabled' || !timeToolsEnabled}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              !timeToolsEnabled
                ? 'bg-clock-parchment/50 text-clock-black/30 cursor-not-allowed'
                : dailyCheckinEnabled
                ? 'bg-clock-red text-clock-ivory'
                : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'daily_checkin_enabled' ? '...' : dailyCheckinEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Brain State = Spice Level</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {!timeToolsEnabled || !dailyCheckinEnabled
                ? 'enable check-in first'
                : brainStateAffectsSpiciness
                ? 'gentler on garbage days'
                : 'same spice always (hardcore)'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('brain_state_affects_spiciness', brainStateAffectsSpiciness)}
            disabled={saving === 'brain_state_affects_spiciness' || !timeToolsEnabled || !dailyCheckinEnabled}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              !timeToolsEnabled || !dailyCheckinEnabled
                ? 'bg-clock-parchment/50 text-clock-black/30 cursor-not-allowed'
                : brainStateAffectsSpiciness
                ? 'bg-clock-red text-clock-ivory'
                : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'brain_state_affects_spiciness' ? '...' : brainStateAffectsSpiciness ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Deadline Drama Level</p>
            <p className="text-sm text-clock-black/60 font-mono">
              how scary should urgency look?
            </p>
          </div>
          <select
            value={deadlineVisuals}
            onChange={(e) => handleSelect('deadline_visuals', e.target.value)}
            disabled={saving === 'deadline_visuals' || !timeToolsEnabled}
            className={`px-4 py-3 font-bold border-3 border-clock-black font-mono ${
              !timeToolsEnabled
                ? 'bg-clock-parchment/50 text-clock-black/30 cursor-not-allowed'
                : 'bg-clock-parchment text-clock-black'
            }`}
          >
            <option value="match_app">match theme</option>
            <option value="hinged">subtle</option>
            <option value="unhinged">DRAMATIC</option>
          </select>
        </div>
      </div>

      <div className="text-center text-sm text-clock-black/60 font-mono">
        {!timeToolsEnabled
          ? 'time tools: DISABLED (ignoring time blindness)'
          : 'time awareness mode: ENGAGED'}
      </div>
    </div>
  )
}
