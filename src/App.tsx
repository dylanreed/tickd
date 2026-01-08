// ABOUTME: Root application component.
// ABOUTME: Sets up auth provider and routes between login, landing page, and main app.

import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import TaskListPage from './pages/TaskListPage'
import LandingPage from './pages/LandingPage'

// Set to true to show landing page, false to show the app
const SHOW_LANDING_PAGE = import.meta.env.VITE_SHOW_LANDING_PAGE !== 'false'

function AppContent() {
  const { user, loading } = useAuth()

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
    return <LoginPage />
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
