// ABOUTME: Settings for Task Paralysis toolkit features.
// ABOUTME: Toggles for 5 minutes, shrinking, body doubling, momentum, transition help.

import { useState } from 'react'
import { useProfile } from '../hooks/useProfile'
import RitualEditor from './RitualEditor'
import type { BodyDoublingIntensity, StartupRitualStep } from '../types/paralysisTools'

const INTENSITY_OPTIONS: { value: BodyDoublingIntensity; label: string }[] = [
  { value: 'passive', label: 'Silent company' },
  { value: 'checkins', label: 'Gentle check-ins' },
  { value: 'activity_aware', label: 'Notice pauses' },
  { value: 'coworking', label: 'Full coworking' },
]

const COUNTDOWN_OPTIONS = [
  { value: 5, label: '5 seconds' },
  { value: 10, label: '10 seconds' },
  { value: 30, label: '30 seconds' },
]

export default function ParalysisToolsSettings() {
  const { profile, updateProfile } = useProfile()
  const [saving, setSaving] = useState<string | null>(null)

  if (!profile) return null

  const isHinged = profile.theme !== 'unhinged'

  // Default values for backwards compatibility
  const fiveMinEnabled = profile.just_five_minutes_enabled ?? true
  const shrinkingEnabled = profile.task_shrinking_enabled ?? true
  const bodyDoublingEnabled = profile.body_doubling_enabled ?? true
  const bodyDoublingIntensity = profile.body_doubling_intensity ?? 'coworking'
  const momentumEnabled = profile.momentum_builder_enabled ?? true
  const warmupStreakSize = profile.warmup_streak_size ?? 3
  const transitionEnabled = profile.transition_prompts_enabled ?? true
  const countdownLength = profile.countdown_length ?? 5
  const startupRitual = (profile.startup_ritual as StartupRitualStep[]) ?? []

  const handleToggle = async (
    field: string,
    currentValue: boolean
  ) => {
    setSaving(field)
    await updateProfile({ [field]: !currentValue })
    setSaving(null)
  }

  const handleSelect = async (field: string, value: string | number) => {
    setSaving(field)
    await updateProfile({ [field]: value })
    setSaving(null)
  }

  const handleRitualChange = async (steps: StartupRitualStep[]) => {
    await updateProfile({ startup_ritual: steps })
  }

  if (isHinged) {
    return (
      <div className="space-y-6">
        <h3 className="font-bold text-lg text-charcoal">Paralysis Tools</h3>

        {/* Just 5 Minutes */}
        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Just 5 Minutes</p>
              <p className="text-sm text-dusty-purple">
                Low-commitment timer to overcome starting friction
              </p>
            </div>
            <button
              onClick={() => handleToggle('just_five_minutes_enabled', fiveMinEnabled)}
              disabled={saving === 'just_five_minutes_enabled'}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                fiveMinEnabled
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'just_five_minutes_enabled' ? '...' : fiveMinEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Task Shrinking */}
        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Task Shrinking</p>
              <p className="text-sm text-dusty-purple">
                Break big tasks into tiny micro-steps
              </p>
            </div>
            <button
              onClick={() => handleToggle('task_shrinking_enabled', shrinkingEnabled)}
              disabled={saving === 'task_shrinking_enabled'}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                shrinkingEnabled
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'task_shrinking_enabled' ? '...' : shrinkingEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Body Doubling */}
        <div className="bg-lavender/30 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Body Doubling</p>
              <p className="text-sm text-dusty-purple">
                Virtual co-working with Tick
              </p>
            </div>
            <button
              onClick={() => handleToggle('body_doubling_enabled', bodyDoublingEnabled)}
              disabled={saving === 'body_doubling_enabled'}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                bodyDoublingEnabled
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'body_doubling_enabled' ? '...' : bodyDoublingEnabled ? 'On' : 'Off'}
            </button>
          </div>

          {bodyDoublingEnabled && (
            <div className="pt-3 border-t border-hinged-border">
              <label className="text-sm text-dusty-purple block mb-2">
                Intensity level
              </label>
              <select
                value={bodyDoublingIntensity}
                onChange={e => handleSelect('body_doubling_intensity', e.target.value)}
                className="w-full px-3 py-2 border border-hinged-border rounded-md bg-white text-charcoal text-sm focus:outline-none focus:border-hinged-accent"
              >
                {INTENSITY_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Momentum Builder */}
        <div className="bg-lavender/30 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Momentum Builder</p>
              <p className="text-sm text-dusty-purple">
                Warm up with quick wins before big tasks
              </p>
            </div>
            <button
              onClick={() => handleToggle('momentum_builder_enabled', momentumEnabled)}
              disabled={saving === 'momentum_builder_enabled'}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                momentumEnabled
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'momentum_builder_enabled' ? '...' : momentumEnabled ? 'On' : 'Off'}
            </button>
          </div>

          {momentumEnabled && (
            <div className="pt-3 border-t border-hinged-border">
              <label className="text-sm text-dusty-purple block mb-2">
                Warmup streak size
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    onClick={() => handleSelect('warmup_streak_size', num)}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                      warmupStreakSize === num
                        ? 'bg-hinged-accent text-white'
                        : 'bg-white border border-hinged-border text-charcoal hover:border-hinged-accent'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Transition Help */}
        <div className="bg-lavender/30 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Transition Help</p>
              <p className="text-sm text-dusty-purple">
                Startup rituals and countdown timers
              </p>
            </div>
            <button
              onClick={() => handleToggle('transition_prompts_enabled', transitionEnabled)}
              disabled={saving === 'transition_prompts_enabled'}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                transitionEnabled
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-lavender text-charcoal hover:bg-peach'
              }`}
            >
              {saving === 'transition_prompts_enabled' ? '...' : transitionEnabled ? 'On' : 'Off'}
            </button>
          </div>

          {transitionEnabled && (
            <>
              <div className="pt-3 border-t border-hinged-border">
                <label className="text-sm text-dusty-purple block mb-2">
                  Countdown length
                </label>
                <select
                  value={countdownLength}
                  onChange={e => handleSelect('countdown_length', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-hinged-border rounded-md bg-white text-charcoal text-sm focus:outline-none focus:border-hinged-accent"
                >
                  {COUNTDOWN_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-hinged-border">
                <RitualEditor
                  steps={startupRitual}
                  onChange={handleRitualChange}
                  theme="hinged"
                />
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="space-y-4">
      <h3 className="font-pixel text-sm text-clock-black">PARALYSIS TOOLS</h3>

      {/* Just 5 Minutes */}
      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Just 5 Minutes</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {fiveMinEnabled
                ? 'tiny commitment = big results'
                : 'you\'re braver than I thought'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('just_five_minutes_enabled', fiveMinEnabled)}
            disabled={saving === 'just_five_minutes_enabled'}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              fiveMinEnabled ? 'bg-mint text-clock-black' : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'just_five_minutes_enabled' ? '...' : fiveMinEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Task Shrinking */}
      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Task Shrinking</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {shrinkingEnabled
                ? 'big task? MICROSCOPE MODE.'
                : 'facing tasks head-on, huh?'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('task_shrinking_enabled', shrinkingEnabled)}
            disabled={saving === 'task_shrinking_enabled'}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              shrinkingEnabled ? 'bg-mint text-clock-black' : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'task_shrinking_enabled' ? '...' : shrinkingEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Body Doubling */}
      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917] space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Body Doubling</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {bodyDoublingEnabled
                ? 'I\'ll work beside you (creepy? helpful?)'
                : 'flying solo, I see'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('body_doubling_enabled', bodyDoublingEnabled)}
            disabled={saving === 'body_doubling_enabled'}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              bodyDoublingEnabled ? 'bg-mint text-clock-black' : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'body_doubling_enabled' ? '...' : bodyDoublingEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {bodyDoublingEnabled && (
          <div className="pt-3 border-t-2 border-clock-black">
            <label className="font-pixel text-xs text-clock-brass block mb-2">
              INTENSITY
            </label>
            <select
              value={bodyDoublingIntensity}
              onChange={e => handleSelect('body_doubling_intensity', e.target.value)}
              className="w-full px-3 py-2 border-2 border-clock-black bg-cloud text-clock-black font-mono text-sm focus:outline-none"
            >
              {INTENSITY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Momentum Builder */}
      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917] space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Momentum Builder</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {momentumEnabled
                ? 'warm up with quick wins first'
                : 'straight to the boss fight'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('momentum_builder_enabled', momentumEnabled)}
            disabled={saving === 'momentum_builder_enabled'}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              momentumEnabled ? 'bg-mint text-clock-black' : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'momentum_builder_enabled' ? '...' : momentumEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {momentumEnabled && (
          <div className="pt-3 border-t-2 border-clock-black">
            <label className="font-pixel text-xs text-clock-brass block mb-2">
              WARMUP STREAK
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => handleSelect('warmup_streak_size', num)}
                  className={`flex-1 py-2 font-mono font-bold border-2 border-clock-black transition-all ${
                    warmupStreakSize === num
                      ? 'bg-hot-pink text-clock-ivory'
                      : 'bg-cloud text-clock-black hover:bg-clock-parchment'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Transition Help */}
      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917] space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Transition Help</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {transitionEnabled
                ? 'rituals & countdowns to GET GOING'
                : 'winging it, huh?'}
            </p>
          </div>
          <button
            onClick={() => handleToggle('transition_prompts_enabled', transitionEnabled)}
            disabled={saving === 'transition_prompts_enabled'}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              transitionEnabled ? 'bg-mint text-clock-black' : 'bg-clock-parchment text-clock-black'
            }`}
          >
            {saving === 'transition_prompts_enabled' ? '...' : transitionEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {transitionEnabled && (
          <>
            <div className="pt-3 border-t-2 border-clock-black">
              <label className="font-pixel text-xs text-clock-brass block mb-2">
                COUNTDOWN
              </label>
              <select
                value={countdownLength}
                onChange={e => handleSelect('countdown_length', parseInt(e.target.value))}
                className="w-full px-3 py-2 border-2 border-clock-black bg-cloud text-clock-black font-mono text-sm focus:outline-none"
              >
                {COUNTDOWN_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-3 border-t-2 border-clock-black">
              <RitualEditor
                steps={startupRitual}
                onChange={handleRitualChange}
                theme="unhinged"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
