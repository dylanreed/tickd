// ABOUTME: Tests for the useTasks hook.
// ABOUTME: Verifies task CRUD operations and fake date calculations.

import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useTasks } from './useTasks'

const mockTasks = [
  {
    id: '1',
    user_id: 'user-1',
    title: 'Test Task',
    description: null,
    real_due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    category: null,
    status: 'pending',
    completed_at: null,
    was_on_time: null,
    created_at: new Date().toISOString(),
  }
]

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn((table: string) => {
      if (table === 'tasks') {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn(() => Promise.resolve({ data: mockTasks, error: null }))
            }))
          })),
        }
      }
      if (table === 'excuses') {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              gt: vi.fn(() => Promise.resolve({ data: [], error: null }))
            }))
          })),
        }
      }
      return {
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => Promise.resolve({ data: [], error: null })),
            gt: vi.fn(() => Promise.resolve({ data: [], error: null }))
          }))
        })),
      }
    })
  }
}))

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'user-1' }
  })
}))

vi.mock('./useProfile', () => ({
  useProfile: () => ({
    profile: { reliability_score: 50 }
  })
}))

describe('useTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches tasks on mount', async () => {
    const { result } = renderHook(() => useTasks())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Test Task')
  })

  it('calculates fake due dates for tasks', async () => {
    const { result } = renderHook(() => useTasks())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.tasks[0].fake_due_date).toBeInstanceOf(Date)
    expect(result.current.tasks[0].urgency).toBeDefined()
  })
})
