// ABOUTME: Main page displaying the task list with add form.
// ABOUTME: Orchestrates task management and completion reveals.

import { useState, useEffect } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useProfile } from '../hooks/useProfile'
import { useExcuses } from '../hooks/useExcuses'
import { useSubscription } from '../hooks/useSubscription'
import { useAuth } from '../contexts/AuthContext'
import TaskCard from '../components/TaskCard'
import AddTaskForm from '../components/AddTaskForm'
import CompletionModal from '../components/CompletionModal'
import ExcuseModal from '../components/ExcuseModal'
import ThemeToggle from '../components/ThemeToggle'
import Tick from '../components/Tick'
import SpicinessModal from '../components/SpicinessModal'
import SubscriptionLockOverlay from '../components/SubscriptionLockOverlay'

const SPICY_LEVEL_KEY = 'liars-todo-spicy-level'

interface CompletionData {
  taskTitle: string
  realDueDate: Date
  completedAt: Date
  wasOnTime: boolean
}

export default function TaskListPage() {
  const { user, signOut } = useAuth()
  const { profile, updateProfile, adjustReliabilityScore } = useProfile()
  const { tasks, addTask, completeTask, deleteTask, loading } = useTasks()
  const { makeExcuse } = useExcuses()
  const { isLocked, status: subscriptionStatus } = useSubscription()
  const [completionData, setCompletionData] = useState<CompletionData | null>(null)
  const [justCompleted, setJustCompleted] = useState(false)
  const [justRevealed, setJustRevealed] = useState(false)
  const [spicinessModalOpen, setSpicinessModalOpen] = useState(false)
  const [spicyLevel, setSpicyLevel] = useState(3)
  const [excuseTaskId, setExcuseTaskId] = useState<string | null>(null)

  // Load spicy level from localStorage
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`${SPICY_LEVEL_KEY}-${user.id}`)
      if (saved) {
        setSpicyLevel(Number(saved))
      }
    }
  }, [user])

  const handleSpicySave = (level: number) => {
    if (user) {
      localStorage.setItem(`${SPICY_LEVEL_KEY}-${user.id}`, String(level))
      setSpicyLevel(level)
    }
  }

  const excuseTask = tasks.find(t => t.id === excuseTaskId)

  const handleExcuse = (taskId: string) => {
    setExcuseTaskId(taskId)
  }

  const handleExcuseSubmit = async (excuse: string) => {
    if (!excuseTaskId) return { success: false, error: 'No task selected' }
    const result = await makeExcuse(excuseTaskId, excuse)
    if (result.success) {
      setExcuseTaskId(null)
    }
    return result
  }

  const theme = profile?.theme ?? 'hinged'
  const pendingTasks = tasks.filter(t => t.status === 'pending')
  const completedTasks = tasks.filter(t => t.status === 'completed')
  const overdueTasks = pendingTasks.filter(t => t.urgency === 'overdue')
  const approachingTasks = pendingTasks.filter(t => t.urgency === 'critical' || t.urgency === 'high')

  // Reset just completed state after a few seconds
  useEffect(() => {
    if (justCompleted) {
      const timer = setTimeout(() => setJustCompleted(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [justCompleted])

  // Reset just revealed state after a few seconds
  useEffect(() => {
    if (justRevealed) {
      const timer = setTimeout(() => setJustRevealed(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [justRevealed])

  const handleComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    setJustCompleted(true)
    const { wasOnTime, realDueDate } = await completeTask(taskId)

    if (wasOnTime !== undefined && realDueDate) {
      setCompletionData({
        taskTitle: task.title,
        realDueDate,
        completedAt: new Date(),
        wasOnTime,
      })
      await adjustReliabilityScore(wasOnTime)
    }
  }

  const handleModalClose = () => {
    setCompletionData(null)
    setJustRevealed(true)
  }

  // Extract first name from email for Tick
  const userName = user?.email?.split('@')[0] ?? undefined

  const handleThemeToggle = async (newTheme: 'hinged' | 'unhinged') => {
    await updateProfile({ theme: newTheme })
  }

  const isHinged = theme === 'hinged'

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center font-body ${isHinged ? 'bg-hinged-bg' : 'bg-lavender'}`}>
        <div className={isHinged ? 'text-hinged-text-secondary' : 'text-dusty-purple'}>
          {isHinged ? 'Loading...' : 'Loading your lies...'}
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen font-body ${isHinged ? 'bg-hinged-bg' : 'bg-lavender'}`}>
      <header className={`shadow-sm sticky top-0 z-10 ${isHinged ? 'bg-hinged-card border-b border-hinged-border' : 'bg-cloud'}`}>
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className={isHinged ? 'font-medium text-hinged-text' : 'font-pixel text-sm text-charcoal'}>
              {theme === 'unhinged' ? "TICK'D 🤥" : "Tick'd"}
            </h1>
            <p className={`text-xs ${isHinged ? 'text-hinged-text-secondary' : 'text-dusty-purple'}`}>{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
            <button
              onClick={() => (window.location.hash = 'settings')}
              aria-label="Settings"
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
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={signOut}
              className={`text-sm transition-colors ${
                isHinged
                  ? 'text-hinged-text-secondary hover:text-hinged-text'
                  : 'text-dusty-purple hover:text-hot-pink'
              }`}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <AddTaskForm onAdd={addTask} theme={theme} />

        {pendingTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className={isHinged ? 'text-hinged-text-secondary' : 'text-dusty-purple'}>
              {theme === 'unhinged'
                ? "No tasks? Suspicious. What are you hiding?"
                : "No tasks yet. Add one above."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleComplete}
                onDelete={deleteTask}
                onExcuse={handleExcuse}
                theme={theme}
              />
            ))}
          </div>
        )}

        {profile && (
          <div className={`text-center text-sm ${isHinged ? 'text-hinged-text-secondary' : 'text-dusty-purple'}`}>
            Reliability score: <span className={`font-bold ${isHinged ? 'text-hinged-text' : 'text-charcoal'}`}>{profile.reliability_score}%</span>
            {theme === 'unhinged' && profile.reliability_score < 50 && (
              <span className="ml-2 text-hot-pink">(yikes)</span>
            )}
          </div>
        )}
      </main>

      <CompletionModal
        isOpen={!!completionData}
        onClose={handleModalClose}
        taskTitle={completionData?.taskTitle ?? ''}
        realDueDate={completionData?.realDueDate ?? new Date()}
        completedAt={completionData?.completedAt ?? new Date()}
        wasOnTime={completionData?.wasOnTime ?? true}
        theme={theme}
      />

      <Tick
        totalTasks={tasks.length}
        completedTasks={completedTasks.length}
        overdueTasks={overdueTasks.length}
        approachingTasks={approachingTasks.length}
        spicyLevel={spicyLevel}
        justCompleted={justCompleted}
        justRevealed={justRevealed}
        userName={userName}
        onLongPress={() => setSpicinessModalOpen(true)}
      />

      <SpicinessModal
        isOpen={spicinessModalOpen}
        onClose={() => setSpicinessModalOpen(false)}
        currentLevel={spicyLevel}
        onSave={handleSpicySave}
      />

      <ExcuseModal
        isOpen={!!excuseTaskId}
        onClose={() => setExcuseTaskId(null)}
        onSubmit={handleExcuseSubmit}
        taskTitle={excuseTask?.title || 'Unknown Task'}
      />

      {isLocked && (subscriptionStatus === 'expired' || subscriptionStatus === 'canceled') && (
        <SubscriptionLockOverlay status={subscriptionStatus} />
      )}
    </div>
  )
}
