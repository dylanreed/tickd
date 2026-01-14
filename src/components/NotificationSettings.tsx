// ABOUTME: Component for managing notification preferences.
// ABOUTME: Allows toggling browser/email notifications.

import { useState } from 'react'
import { usePushSubscription } from '../hooks/usePushSubscription'
import { useProfile } from '../hooks/useProfile'

export default function NotificationSettings() {
  const { profile, updateProfile } = useProfile()
  const { permissionState, isSubscribed, isSupported, subscribe, unsubscribe, loading } =
    usePushSubscription()
  const [saving, setSaving] = useState(false)
  const [browserError, setBrowserError] = useState<string | null>(null)

  if (!profile) return null

  const prefs = profile.notification_preferences
  const isHinged = profile.theme !== 'unhinged'

  const handleBrowserToggle = async () => {
    setBrowserError(null)
    if (isSubscribed) {
      await unsubscribe()
    } else {
      const result = await subscribe()
      if (result.error) {
        setBrowserError(result.error.message)
      }
    }
  }

  const handleEmailToggle = async () => {
    setSaving(true)
    const emailEnabled = prefs === 'email' || prefs === 'both'
    let newPref: 'email' | 'browser' | 'both' | 'none'

    if (emailEnabled) {
      // Turning off email
      newPref = prefs === 'both' ? 'browser' : 'none'
    } else {
      // Turning on email
      newPref = prefs === 'browser' ? 'both' : 'email'
    }

    await updateProfile({ notification_preferences: newPref })
    setSaving(false)
  }

  const emailEnabled = prefs === 'email' || prefs === 'both'

  if (isHinged) {
    return (
      <div className="space-y-6">
        <h3 className="font-bold text-lg text-charcoal">Notification Settings</h3>

        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Browser Notifications</p>
              <p className="text-sm text-dusty-purple">
                {!isSupported ? 'Not supported in this browser'
                  : permissionState === 'denied' ? 'Blocked - enable in browser settings'
                  : isSubscribed ? 'Enabled - you will receive push notifications'
                  : 'Get push notifications'}
              </p>
            </div>
            {isSupported && permissionState !== 'denied' && (
              <button onClick={handleBrowserToggle} disabled={loading} className={`px-4 py-2 rounded-md font-medium transition-colors ${isSubscribed ? 'bg-lavender text-charcoal hover:bg-peach' : 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'}`}>
                {loading ? '...' : isSubscribed ? 'Disable' : 'Enable'}
              </button>
            )}
          </div>
          {browserError && <p className="text-sm text-coral mt-2">{browserError}</p>}
        </div>

        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">Email Notifications</p>
              <p className="text-sm text-dusty-purple">Receive reminders at {profile.email}</p>
            </div>
            <button onClick={handleEmailToggle} disabled={saving} className={`px-4 py-2 rounded-md font-medium transition-colors ${emailEnabled ? 'bg-lavender text-charcoal hover:bg-peach' : 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'}`}>
              {saving ? '...' : emailEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-dusty-purple">
          Currently receiving: <span className="font-medium text-charcoal">
            {prefs === 'both' ? 'Browser & Email' : prefs === 'browser' ? 'Browser only' : prefs === 'email' ? 'Email only' : 'None'}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-pixel text-sm text-clock-black">HOW I'LL BUG YOU</h3>

      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Browser Notifications</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {!isSupported ? 'your browser is too old for this'
                : permissionState === 'denied' ? 'blocked · unblock me in settings (I dare you)'
                : isSubscribed ? 'I can now interrupt your doomscrolling'
                : 'let me ping you when you\'re slacking'}
            </p>
          </div>
          {isSupported && permissionState !== 'denied' && (
            <button
              onClick={handleBrowserToggle}
              disabled={loading}
              className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
                isSubscribed ? 'bg-clock-parchment text-clock-black' : 'bg-clock-red text-clock-ivory'
              }`}
            >
              {loading ? '...' : isSubscribed ? 'Disable' : 'Enable'}
            </button>
          )}
        </div>
        {browserError && <p className="text-clock-red text-sm mt-3 font-mono">{browserError}</p>}
      </div>

      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">Email Notifications</p>
            <p className="text-sm text-clock-black/60 font-mono">
              {emailEnabled ? `spamming ${profile.email} with love` : `I could email ${profile.email}...`}
            </p>
          </div>
          <button
            onClick={handleEmailToggle}
            disabled={saving}
            className={`px-5 py-3 font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap ${
              emailEnabled ? 'bg-clock-parchment text-clock-black' : 'bg-clock-red text-clock-ivory'
            }`}
          >
            {saving ? '...' : emailEnabled ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-clock-black/60 font-mono">
        current harassment level: <span className="font-bold text-clock-black">
          {prefs === 'both' ? 'MAXIMUM (browser + email)' : prefs === 'browser' ? 'browser only' : prefs === 'email' ? 'email only' : 'silent mode (suspicious)'}
        </span>
      </div>
    </div>
  )
}
