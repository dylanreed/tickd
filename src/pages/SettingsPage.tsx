// ABOUTME: Settings page with notification preferences.
// ABOUTME: Wraps NotificationSettings with consistent layout and back navigation.

import NotificationSettings from '../components/NotificationSettings'
import SubscriptionSettings from '../components/SubscriptionSettings'
import DeleteAccountSection from '../components/DeleteAccountSection'
import { useProfile } from '../hooks/useProfile'
import TickSprite from '../components/TickSprite'

interface SettingsPageProps {
  onBack: () => void
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  const { profile } = useProfile()
  const isHinged = profile?.theme !== 'unhinged'

  if (isHinged) {
    return (
      <div
        data-testid="settings-page"
        className="min-h-screen font-body bg-hinged-bg"
      >
        <header className="shadow-sm sticky top-0 z-10 bg-hinged-card border-b border-hinged-border">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <button
              onClick={onBack}
              aria-label="Back"
              className="p-2 rounded-lg transition-colors text-hinged-text-secondary hover:text-hinged-text hover:bg-hinged-border"
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
            <h1 className="font-medium text-hinged-text">Settings</h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">
          <SubscriptionSettings />
          <NotificationSettings />
          <DeleteAccountSection />
        </main>
      </div>
    )
  }

  return (
    <div
      data-testid="settings-page"
      className="min-h-screen font-body bg-clock-parchment"
    >
      <header className="sticky top-0 z-10 bg-clock-ivory border-b-3 border-clock-black">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            aria-label="Back"
            className="p-2 border-2 border-clock-black bg-clock-parchment shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-clock-black"
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
          <h1 className="font-pixel text-sm text-clock-black">SETTINGS</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Tick greeting with speech bubble */}
        <div className="flex items-start gap-4">
          <TickSprite expression="judgmental" size="md" className="flex-shrink-0" />
          <div className="relative bg-clock-ivory border-3 border-clock-black p-4 shadow-[4px_4px_0_0_#1c1917]">
            {/* Speech bubble tail */}
            <div className="absolute left-0 top-6 -translate-x-full">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-clock-black" />
              <div className="absolute top-[3px] left-[3px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[9px] border-r-clock-ivory" />
            </div>
            <p className="text-clock-black font-bold">Adjusting my settings?</p>
            <p className="text-clock-black/60 text-sm font-mono">fine. but I'm still judging you.</p>
          </div>
        </div>

        <SubscriptionSettings />
        <NotificationSettings />
        <DeleteAccountSection />
      </main>
    </div>
  )
}
