// ABOUTME: Tests for TaskListPage component.
// ABOUTME: Verifies task list rendering, completion flow, and theme toggling.

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TaskListPage from './TaskListPage'

const mockUser = { id: 'user-1', email: 'test@example.com' }
const mockProfile = { id: 'user-1', email: 'test@example.com', reliability_score: 75, theme: 'hinged' as const, notification_preferences: 'none' as const, created_at: new Date().toISOString() }
const mockTasks = [
  { id: 'task-1', user_id: 'user-1', title: 'Test Task', description: null, real_due_date: new Date(Date.now() + 86400000).toISOString(), category: null, status: 'pending' as const, completed_at: null, was_on_time: null, created_at: new Date().toISOString(), fake_due_date: new Date(Date.now() + 43200000), urgency: 'medium' as const },
]

const mockSignOut = vi.fn()
const mockAddTask = vi.fn().mockResolvedValue({ data: {}, error: null })
const mockCompleteTask = vi.fn().mockResolvedValue({ data: {}, error: null, wasOnTime: true, realDueDate: new Date() })
const mockDeleteTask = vi.fn().mockResolvedValue({ error: null })
const mockUpdateProfile = vi.fn().mockResolvedValue({ data: {}, error: null })

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: mockUser, session: null, loading: false, signIn: vi.fn(), signOut: mockSignOut }),
}))

vi.mock('../hooks/useTasks', () => ({
  useTasks: () => ({ tasks: mockTasks, loading: false, error: null, addTask: mockAddTask, completeTask: mockCompleteTask, deleteTask: mockDeleteTask, refetch: vi.fn() }),
}))

vi.mock('../hooks/useProfile', () => ({
  useProfile: () => ({ profile: mockProfile, loading: false, error: null, updateProfile: mockUpdateProfile }),
}))

describe('TaskListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders task list with header and add form', () => {
    render(<TaskListPage />)

    expect(screen.getByText('Liars Todo')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Task title')).toBeInTheDocument()
  })

  it('shows reliability score', () => {
    render(<TaskListPage />)

    expect(screen.getByText(/Reliability score: 75%/)).toBeInTheDocument()
  })

  it('calls signOut when sign out button is clicked', () => {
    render(<TaskListPage />)

    fireEvent.click(screen.getByText('Sign out'))
    expect(mockSignOut).toHaveBeenCalled()
  })

  it('completes task and shows completion modal', async () => {
    render(<TaskListPage />)

    fireEvent.click(screen.getByLabelText('Complete task'))

    await waitFor(() => {
      expect(mockCompleteTask).toHaveBeenCalledWith('task-1')
    })

    await waitFor(() => {
      expect(screen.getByText('Task Completed')).toBeInTheDocument()
    })
  })

  it('toggles theme when theme toggle is clicked', async () => {
    render(<TaskListPage />)

    fireEvent.click(screen.getByText('Hinged'))

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({ theme: 'unhinged' })
    })
  })
})
