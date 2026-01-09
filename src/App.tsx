// ABOUTME: Root application component.
// ABOUTME: Sets up auth provider and routes between login, landing page, and main app.

import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { useTasks } from './hooks/useTasks'
import LoginPage from './pages/LoginPage'
import TaskListPage from './pages/TaskListPage'
import SettingsPage from './pages/SettingsPage'
import LandingPage from './pages/LandingPage'
import OnboardingPage from './pages/OnboardingPage'
import SpriteReferencePage from './pages/SpriteReferencePage'
import ColorPreviewPage from './pages/ColorPreviewPage'
import Tick from './components/Tick'
import SpicinessModal from './components/SpicinessModal'

// Set to true to show landing page, false to show the app
const SHOW_LANDING_PAGE = import.meta.env.VITE_SHOW_LANDING_PAGE !== 'false'

const ONBOARDING_KEY = 'liars-todo-onboarding-complete'
const SPICY_LEVEL_KEY = 'liars-todo-spicy-level'

function DevPreview() {
  const [spicinessModalOpen, setSpicinessModalOpen] = useState(false)
  const [spicyLevel, setSpicyLevel] = useState(3)

  return (
    <div className="min-h-screen bg-lavender relative">
      <div className="p-8">
        <h1 className="font-pixel text-xl text-charcoal mb-4">Dev Preview</h1>
        <p className="text-dusty-purple mb-4">Current spicy level: {spicyLevel}</p>
        <button
          onClick={() => setSpicinessModalOpen(true)}
          className="px-4 py-2 bg-hot-pink text-white rounded-full font-bold hover:bg-coral transition-colors"
        >
          Open Spiciness Modal
        </button>
      </div>
      <Tick
        totalTasks={5}
        completedTasks={2}
        overdueTasks={1}
        approachingTasks={1}
        spicyLevel={spicyLevel}
        justCompleted={false}
        justRevealed={false}
        userName="Dev"
        onLongPress={() => setSpicinessModalOpen(true)}
      />
      <SpicinessModal
        isOpen={spicinessModalOpen}
        onClose={() => setSpicinessModalOpen(false)}
        currentLevel={spicyLevel}
        onSave={setSpicyLevel}
      />
    </div>
  )
}

function AppContent() {
  const { user, loading } = useAuth()
  const { addTask } = useTasks()
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [hash, setHash] = useState(window.location.hash)

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Check onboarding status on mount and when user changes
  useEffect(() => {
    if (user) {
      const completed = localStorage.getItem(`${ONBOARDING_KEY}-${user.id}`)
      setHasCompletedOnboarding(completed === 'true')
      setShowLogin(false) // Reset when user logs in
    } else {
      setHasCompletedOnboarding(null)
    }
  }, [user])

  const handleOnboardingComplete = (spicyLevel: number) => {
    if (user) {
      localStorage.setItem(`${ONBOARDING_KEY}-${user.id}`, 'true')
      localStorage.setItem(`${SPICY_LEVEL_KEY}-${user.id}`, String(spicyLevel))
      setHasCompletedOnboarding(true)
    }
  }

  // Dev routes
  if (hash === '#sprites') {
    return <SpriteReferencePage />
  }
  if (hash === '#colors') {
    return <ColorPreviewPage />
  }
  if (hash === '#dev') {
    return <DevPreview />
  }

  // Show landing page if enabled (pre-launch mode)
  if (SHOW_LANDING_PAGE) {
    return <LandingPage />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-lavender flex items-center justify-center font-body">
        <div className="text-dusty-purple">Loading...</div>
      </div>
    )
  }

  if (!user) {
    // Show LandingPage first, then LoginPage when they click Get Started
    if (!showLogin) {
      return <LandingPage onGetStarted={() => setShowLogin(true)} />
    }
    return <LoginPage onBack={() => setShowLogin(false)} />
  }

  // Show onboarding for new users
  if (hasCompletedOnboarding === false) {
    return <OnboardingPage onComplete={handleOnboardingComplete} onAddTask={addTask} />
  }

  // Still checking onboarding status
  if (hasCompletedOnboarding === null) {
    return (
      <div className="min-h-screen bg-lavender flex items-center justify-center font-body">
        <div className="text-dusty-purple">Loading...</div>
      </div>
    )
  }

  // Settings page
  if (hash === '#settings') {
    return <SettingsPage onBack={() => (window.location.hash = '')} />
  }

  return <TaskListPage />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
