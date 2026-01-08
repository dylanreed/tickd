// ABOUTME: Main page displaying the task list with add form.
// ABOUTME: Orchestrates task management and completion reveals.

import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useProfile } from '../hooks/useProfile'
import { useAuth } from '../contexts/AuthContext'
import TaskCard from '../components/TaskCard'
import AddTaskForm from '../components/AddTaskForm'
import CompletionModal from '../components/CompletionModal'
import ThemeToggle from '../components/ThemeToggle'

interface CompletionData {
  taskTitle: string
  realDueDate: Date
  completedAt: Date
  wasOnTime: boolean
}

export default function TaskListPage() {
  const { user, signOut } = useAuth()
  const { profile, updateProfile } = useProfile()
  const { tasks, addTask, completeTask, deleteTask, loading } = useTasks()
  const [completionData, setCompletionData] = useState<CompletionData | null>(null)

  const theme = profile?.theme ?? 'hinged'
  const pendingTasks = tasks.filter(t => t.status === 'pending')

  const handleComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    const { wasOnTime, realDueDate } = await completeTask(taskId)

    if (wasOnTime !== undefined && realDueDate) {
      setCompletionData({
        taskTitle: task.title,
        realDueDate,
        completedAt: new Date(),
        wasOnTime,
      })
    }
  }

  const handleThemeToggle = async (newTheme: 'hinged' | 'unhinged') => {
    await updateProfile({ theme: newTheme })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading your lies...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {theme === 'unhinged' ? 'Liars Todo 🤥' : 'Liars Todo'}
            </h1>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
            <button
              onClick={signOut}
              className="text-sm text-gray-600 hover:text-gray-900"
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
            <p className="text-gray-500">
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
                theme={theme}
              />
            ))}
          </div>
        )}

        {profile && (
          <div className="text-center text-sm text-gray-500">
            Reliability score: {profile.reliability_score}%
            {theme === 'unhinged' && profile.reliability_score < 50 && (
              <span className="ml-2">(yikes)</span>
            )}
          </div>
        )}
      </main>

      <CompletionModal
        isOpen={!!completionData}
        onClose={() => setCompletionData(null)}
        taskTitle={completionData?.taskTitle ?? ''}
        realDueDate={completionData?.realDueDate ?? new Date()}
        completedAt={completionData?.completedAt ?? new Date()}
        wasOnTime={completionData?.wasOnTime ?? true}
        theme={theme}
      />
    </div>
  )
}
