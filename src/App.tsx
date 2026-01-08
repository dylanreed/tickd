// ABOUTME: Root application component.
// ABOUTME: Sets up auth provider and routes between login, landing page, and main app.

import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { useTasks } from './hooks/useTasks'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import TaskListPage from './pages/TaskListPage'
import LandingPage from './pages/LandingPage'
import OnboardingPage from './pages/OnboardingPage'

// Set to true to show landing page, false to show the app
const SHOW_LANDING_PAGE = import.meta.env.VITE_SHOW_LANDING_PAGE !== 'false'

const ONBOARDING_KEY = 'liars-todo-onboarding-complete'
const SPICY_LEVEL_KEY = 'liars-todo-spicy-level'

function AppContent() {
  const { user, loading } = useAuth()
  const { addTask } = useTasks()
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null)
  const [showLogin, setShowLogin] = useState(false)

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
    // Show HomePage first, then LoginPage when they click Get Started
    if (!showLogin) {
      return <HomePage onGetStarted={() => setShowLogin(true)} />
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
