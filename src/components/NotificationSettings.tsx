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

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg text-charcoal dark:text-lavender">
        Notification Settings
      </h3>

      {/* Browser Notifications */}
      <div className="bg-lavender/30 dark:bg-dusty-purple/30 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-charcoal dark:text-lavender">
              Browser Notifications
            </p>
            <p className="text-sm text-dusty-purple dark:text-lavender/70">
              {!isSupported
                ? 'Not supported in this browser'
                : permissionState === 'denied'
                  ? 'Blocked - enable in browser settings'
                  : isSubscribed
                    ? 'Enabled - you will receive push notifications'
                    : 'Get push notifications'}
            </p>
          </div>
          {isSupported && permissionState !== 'denied' && (
            <button
              onClick={handleBrowserToggle}
              disabled={loading}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                isSubscribed
                  ? 'bg-lavender text-charcoal hover:bg-peach'
                  : 'bg-hot-pink text-white hover:bg-coral'
              }`}
            >
              {loading ? '...' : isSubscribed ? 'Disable' : 'Enable'}
            </button>
          )}
        </div>
        {browserError && (
          <p className="text-sm text-coral mt-2">{browserError}</p>
        )}
      </div>

      {/* Email Notifications */}
      <div className="bg-lavender/30 dark:bg-dusty-purple/30 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-charcoal dark:text-lavender">
              Email Notifications
            </p>
            <p className="text-sm text-dusty-purple dark:text-lavender/70">
              Receive reminders at {profile.email}
            </p>
          </div>
          <button
            onClick={handleEmailToggle}
            disabled={saving}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              emailEnabled
                ? 'bg-lavender text-charcoal hover:bg-peach'
                : 'bg-hot-pink text-white hover:bg-coral'
            }`}
          >
            {saving ? '...' : emailEnabled ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Current preference summary */}
      <div className="text-center text-sm text-dusty-purple dark:text-lavender/70">
        Currently receiving:{' '}
        <span className="font-medium text-charcoal dark:text-lavender">
          {prefs === 'both'
            ? 'Browser & Email'
            : prefs === 'browser'
              ? 'Browser only'
              : prefs === 'email'
                ? 'Email only'
                : 'None'}
        </span>
      </div>
    </div>
  )
}
