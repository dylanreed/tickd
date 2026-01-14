// ABOUTME: Tests for excuse (snooze) management hook.
// ABOUTME: Verifies excuse creation and postponement logic.

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useExcuses } from './useExcuses'

const mockInsert = vi.fn()
const mockSelect = vi.fn()
const mockEq = vi.fn()
const mockOrder = vi.fn()
const mockGt = vi.fn()
const mockLimit = vi.fn()
const mockSingle = vi.fn()

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: mockInsert,
      select: mockSelect,
    })),
  },
}))

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'test-user-id' } }),
}))

describe('useExcuses', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Default chain for insert
    mockInsert.mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: mockSingle.mockResolvedValue({ data: null, error: null }),
      }),
    })

    // Default chain for select - support chained eq calls
    mockEq.mockReturnValue({
      order: mockOrder.mockResolvedValue({ data: [], error: null }),
      gt: mockGt.mockReturnValue({
        limit: mockLimit.mockResolvedValue({ data: [], error: null }),
      }),
      limit: mockLimit.mockResolvedValue({ data: [], error: null }),
      eq: mockEq, // Allow chaining of multiple eq calls
    })

    mockSelect.mockReturnValue({
      eq: mockEq,
    })
  })

  it('provides makeExcuse function', () => {
    const { result } = renderHook(() => useExcuses())
    expect(typeof result.current.makeExcuse).toBe('function')
  })

  it('provides getExcusesForTask function', () => {
    const { result } = renderHook(() => useExcuses())
    expect(typeof result.current.getExcusesForTask).toBe('function')
  })

  it('provides getRecentExcuses function', () => {
    const { result } = renderHook(() => useExcuses())
    expect(typeof result.current.getRecentExcuses).toBe('function')
  })

  it('provides isTaskPostponed function', () => {
    const { result } = renderHook(() => useExcuses())
    expect(typeof result.current.isTaskPostponed).toBe('function')
  })

  it('requires minimum 10 character excuse', async () => {
    const { result } = renderHook(() => useExcuses())

    let response: { success: boolean; error?: string }
    await act(async () => {
      response = await result.current.makeExcuse('task-123', 'short')
    })

    expect(response!.success).toBe(false)
    expect(response!.error).toContain('10 characters')
  })

  it('accepts excuses with 10 or more characters', async () => {
    const mockExcuse = {
      id: 'excuse-1',
      task_id: 'task-123',
      user_id: 'test-user-id',
      excuse_text: 'I had a meeting that ran over',
      postponed_until: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
    }

    mockInsert.mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: mockExcuse, error: null }),
      }),
    })

    const { result } = renderHook(() => useExcuses())

    let response: { success: boolean; data?: typeof mockExcuse }
    await act(async () => {
      response = await result.current.makeExcuse('task-123', 'I had a meeting that ran over')
    })

    expect(response!.success).toBe(true)
    expect(response!.data).toBeDefined()
  })

  it('postpones notifications for 12 hours when making excuse', async () => {
    const now = Date.now()
    vi.useFakeTimers()
    vi.setSystemTime(now)

    const { result } = renderHook(() => useExcuses())

    await act(async () => {
      await result.current.makeExcuse('task-123', 'Traffic was terrible today')
    })

    // Verify the insert was called
    const { supabase } = await import('../lib/supabase')
    expect(supabase.from).toHaveBeenCalledWith('excuses')
    expect(mockInsert).toHaveBeenCalled()

    // Check that postponed_until is approximately 12 hours from now
    const insertCall = mockInsert.mock.calls[0][0]
    const postponedUntil = new Date(insertCall.postponed_until).getTime()
    const twelveHoursFromNow = now + 12 * 60 * 60 * 1000

    // Allow 1 second tolerance
    expect(Math.abs(postponedUntil - twelveHoursFromNow)).toBeLessThan(1000)

    vi.useRealTimers()
  })

  it('returns excuses for a specific task', async () => {
    const mockExcuses = [
      {
        id: 'excuse-1',
        task_id: 'task-123',
        user_id: 'test-user-id',
        excuse_text: 'First excuse here',
        postponed_until: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ]

    const mockEqChain = vi.fn()
    mockEqChain.mockReturnValue({
      order: vi.fn().mockResolvedValue({ data: mockExcuses, error: null }),
      gt: mockGt.mockReturnValue({
        limit: mockLimit.mockResolvedValue({ data: [], error: null }),
      }),
      limit: mockLimit.mockResolvedValue({ data: [], error: null }),
      eq: mockEqChain, // Allow chaining
    })

    mockSelect.mockReturnValue({
      eq: mockEqChain,
    })

    const { result } = renderHook(() => useExcuses())

    let excuses: typeof mockExcuses
    await act(async () => {
      excuses = await result.current.getExcusesForTask('task-123')
    })

    expect(excuses!).toHaveLength(1)
    expect(excuses![0].excuse_text).toBe('First excuse here')
  })

  it('returns recent excuses for user', async () => {
    const mockExcuses = [
      {
        id: 'excuse-1',
        task_id: 'task-123',
        user_id: 'test-user-id',
        excuse_text: 'Recent excuse one',
        postponed_until: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
      {
        id: 'excuse-2',
        task_id: 'task-456',
        user_id: 'test-user-id',
        excuse_text: 'Recent excuse two',
        postponed_until: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ]

    mockSelect.mockReturnValue({
      eq: vi.fn().mockReturnValue({
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue({ data: mockExcuses, error: null }),
        }),
        gt: mockGt.mockReturnValue({
          limit: mockLimit.mockResolvedValue({ data: [], error: null }),
        }),
        limit: mockLimit.mockResolvedValue({ data: mockExcuses, error: null }),
      }),
    })

    const { result } = renderHook(() => useExcuses())

    let excuses: typeof mockExcuses
    await act(async () => {
      excuses = await result.current.getRecentExcuses(5)
    })

    expect(excuses!).toHaveLength(2)
  })

  it('checks if task is currently postponed', async () => {
    const futureTime = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()
    const mockActiveExcuse = [
      {
        id: 'excuse-1',
        task_id: 'task-123',
        user_id: 'test-user-id',
        excuse_text: 'Active postponement',
        postponed_until: futureTime,
        created_at: new Date().toISOString(),
      },
    ]

    const mockGtChain = vi.fn()
    mockGtChain.mockReturnValue({
      limit: vi.fn().mockResolvedValue({ data: mockActiveExcuse, error: null }),
    })

    const mockEqChain = vi.fn()
    mockEqChain.mockReturnValue({
      order: mockOrder.mockResolvedValue({ data: [], error: null }),
      gt: mockGtChain,
      limit: mockLimit.mockResolvedValue({ data: [], error: null }),
      eq: mockEqChain, // Allow chaining
    })

    mockSelect.mockReturnValue({
      eq: mockEqChain,
    })

    const { result } = renderHook(() => useExcuses())

    let isPostponed: boolean
    await act(async () => {
      isPostponed = await result.current.isTaskPostponed('task-123')
    })

    expect(isPostponed!).toBe(true)
  })

  it('returns false for non-postponed task', async () => {
    // Default mock returns empty array
    // Reset mocks to use the default beforeEach setup
    vi.clearAllMocks()

    // Default chain for select - support chained eq calls
    mockEq.mockReturnValue({
      order: mockOrder.mockResolvedValue({ data: [], error: null }),
      gt: mockGt.mockReturnValue({
        limit: mockLimit.mockResolvedValue({ data: [], error: null }),
      }),
      limit: mockLimit.mockResolvedValue({ data: [], error: null }),
      eq: mockEq, // Allow chaining of multiple eq calls
    })

    mockSelect.mockReturnValue({
      eq: mockEq,
    })

    const { result } = renderHook(() => useExcuses())

    let isPostponed: boolean
    await act(async () => {
      isPostponed = await result.current.isTaskPostponed('task-123')
    })

    expect(isPostponed!).toBe(false)
  })

  it('requires authentication for makeExcuse', async () => {
    vi.doMock('../contexts/AuthContext', () => ({
      useAuth: () => ({ user: null }),
    }))

    // Re-import to get the mocked version
    vi.resetModules()
    const { useExcuses: useExcusesNoAuth } = await import('./useExcuses')

    const { result } = renderHook(() => useExcusesNoAuth())

    let response: { success: boolean; error?: string }
    await act(async () => {
      response = await result.current.makeExcuse('task-123', 'Valid excuse text here')
    })

    expect(response!.success).toBe(false)
    expect(response!.error).toContain('authenticated')

    // Restore original mock
    vi.doMock('../contexts/AuthContext', () => ({
      useAuth: () => ({ user: { id: 'test-user-id' } }),
    }))
  })
})
