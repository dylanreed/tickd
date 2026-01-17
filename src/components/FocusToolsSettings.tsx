// ABOUTME: Component for managing Pick For Me and focus tool settings.
// ABOUTME: Allows toggling Pick For Me, escalation, and earn-out visibility.

import { useState } from 'react'
import { useProfile } from '../hooks/useProfile'

export default function FocusToolsSettings() {
  const { profile, updateProfile } = useProfile()
  const [saving, setSaving] = useState<string | null>(null)

  if (!profile) return null

  const isHinged = profile.theme !== 'unhinged'

  // Default to true if not set (for backwards compatibility)
  const pickForMeEnabled = profile.pick_for_me_enabled ?? true
  const escalationEnabled = profile.single_task_escalation_enabled ?? true
  const showEarnout = profile.show_earnout_progress ?? true

  const handleToggle = async (
    field: 'pick_for_me_enabled' | 'single_task_escalation_enabled' | 'show_earnout_progress',
    currentValue: boolean
  ) => {
    setSaving(field)
    await updateProfile({ [field]: !currentValue })
    setSaving(null)
  }

  if (isHinged) {
    return (
      <div className="space-y-6">
        <h3 className="font-bold text-lg text-charcoal">Focus Tools</h3>

        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Pick For Me</p>
              <p className="text-sm text-dusty-purple">
                Let Tick suggest which task to do next
              </p>
            </div>
            <button
              onClick={() => handleToggle('pick_for_me_enabled', pickForMeEnabled)}
              disabled={saving === 'pick_for_me_enabled'}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                pickForMeEnabled
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'pick_for_me_enabled' ? '...' : pickForMeEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Focus Mode Escalation</p>
              <p className="text-sm text-dusty-purple">
                {escalationEnabled
                  ? 'If you pick twice without completing, enter focus mode'
                  : 'Picking multiple times won\'t trigger focus mode'}
              </p>
            </div>
            <button
              onClick={() => handleToggle('single_task_escalation_enabled', escalationEnabled)}
              disabled={saving === 'single_task_escalation_enabled' || !pickForMeEnabled}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                !pickForMeEnabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : escalationEnabled
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'single_task_escalation_enabled' ? '...' : escalationEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Show Earn-out Progress</p>
              <p className="text-sm text-dusty-purple">
                {showEarnout
                  ? 'Display progress bar during focus mode'
                  : 'Hide the countdown in focus mode'}
              </p>
            </div>
            <button
              onClick={() => handleToggle('show_earnout_progress', showEarnout)}
              disabled={saving === 'show_earnout_progress' || !pickForMeEnabled || !escalationEnabled}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                !pickForMeEnabled || !escalationEnabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : showEarnout
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'show_earnout_progress' ? '...' : showEarnout ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="space-y-4">
      <h3 className="font-pixel text-sm text-clock-black">FOCUS TOOLS</h3>

      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Pick For Me</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {pickForMeEnabled
                ? 'I\'ll tell you what to do (you\'re welcome)'
                : 'you\'re on your own, buddy'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('pick_for_me_enabled', pickForMeEnabled)}
            disabled={saving === 'pick_for_me_enabled'}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              pickForMeEnabled ? 'bg-clock-red text-clock-ivory' : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'pick_for_me_enabled' ? '...' : pickForMeEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Single-Task Escalation</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {!pickForMeEnabled
                ? 'enable Pick For Me first, coward'
                : escalationEnabled
                ? 'pick twice without doing? JAIL.'
                : 'no consequences (how boring)'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('single_task_escalation_enabled', escalationEnabled)}
            disabled={saving === 'single_task_escalation_enabled' || !pickForMeEnabled}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              !pickForMeEnabled
                ? 'bg-clock-parchment/50 text-clock-black/30 cursor-not-allowed'
                : escalationEnabled
                ? 'bg-clock-red text-clock-ivory'
                : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'single_task_escalation_enabled' ? '...' : escalationEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Show Earn-out Progress</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {!pickForMeEnabled || !escalationEnabled
                ? 'enable escalation first'
                : showEarnout
                ? 'see exactly how trapped you are'
                : 'mystery mode (spooky)'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('show_earnout_progress', showEarnout)}
            disabled={saving === 'show_earnout_progress' || !pickForMeEnabled || !escalationEnabled}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              !pickForMeEnabled || !escalationEnabled
                ? 'bg-clock-parchment/50 text-clock-black/30 cursor-not-allowed'
                : showEarnout
                ? 'bg-clock-red text-clock-ivory'
                : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'show_earnout_progress' ? '...' : showEarnout ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-clock-black/60 font-mono">
        {!pickForMeEnabled
          ? 'focus tools: DISABLED (living dangerously)'
          : !escalationEnabled
          ? 'escalation: OFF (too easy)'
          : 'full ADHD mode: ENGAGED'}
      </div>
    </div>
  )
}
