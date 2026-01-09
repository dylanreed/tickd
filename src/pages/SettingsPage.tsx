// ABOUTME: Settings page with notification preferences.
// ABOUTME: Wraps NotificationSettings with consistent layout and back navigation.

import NotificationSettings from '../components/NotificationSettings'
import SubscriptionSettings from '../components/SubscriptionSettings'
import { useProfile } from '../hooks/useProfile'

interface SettingsPageProps {
  onBack: () => void
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  const { profile } = useProfile()
  const isHinged = profile?.theme !== 'unhinged'

  return (
    <div
      data-testid="settings-page"
      className={`min-h-screen font-body ${isHinged ? 'bg-hinged-bg' : 'bg-lavender'}`}
    >
      <header
        className={`shadow-sm sticky top-0 z-10 ${isHinged ? 'bg-hinged-card border-b border-hinged-border' : 'bg-cloud'}`}
      >
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            aria-label="Back"
            className={`p-2 rounded-lg transition-colors ${
              isHinged
                ? 'text-hinged-text-secondary hover:text-hinged-text hover:bg-hinged-border'
                : 'text-dusty-purple hover:text-hot-pink hover:bg-lavender'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <h1
            className={
              isHinged ? 'font-medium text-hinged-text' : 'font-pixel text-sm text-charcoal'
            }
          >
            Settings
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        <SubscriptionSettings />
        <NotificationSettings />
      </main>
    </div>
  )
}
