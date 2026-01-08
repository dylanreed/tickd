// ABOUTME: Tests for the useProfile hook.
// ABOUTME: Verifies profile fetching and reliability score adjustments.

import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProfile } from './useProfile'

const mockProfile = {
  id: 'user-1',
  email: 'test@example.com',
  reliability_score: 50,
  theme: 'hinged' as const,
  notification_preferences: 'email' as const,
  created_at: new Date().toISOString(),
}

let capturedUpdatePayload: Record<string, unknown> | null = null

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: mockProfile, error: null }))
        }))
      })),
      update: vi.fn((payload: Record<string, unknown>) => {
        capturedUpdatePayload = payload
        return {
          eq: vi.fn(() => ({
            select: vi.fn(() => ({
              single: vi.fn(() => Promise.resolve({
                data: { ...mockProfile, ...payload },
                error: null
              }))
            }))
          }))
        }
      }),
    }))
  }
}))

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'user-1' }
  })
}))

describe('useProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockProfile.reliability_score = 50
    capturedUpdatePayload = null
  })

  it('fetches profile on mount', async () => {
    const { result } = renderHook(() => useProfile())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.profile).toBeDefined()
    expect(result.current.profile?.reliability_score).toBe(50)
  })

  describe('adjustReliabilityScore', () => {
    it('increases score by 5 when wasOnTime is true', async () => {
      const { result } = renderHook(() => useProfile())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.adjustReliabilityScore(true)
      })

      expect(capturedUpdatePayload).toEqual({ reliability_score: 55 })
    })

    it('decreases score by 10 when wasOnTime is false', async () => {
      const { result } = renderHook(() => useProfile())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.adjustReliabilityScore(false)
      })

      expect(capturedUpdatePayload).toEqual({ reliability_score: 40 })
    })

    it('clamps score to minimum of 0', async () => {
      mockProfile.reliability_score = 5

      const { result } = renderHook(() => useProfile())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.adjustReliabilityScore(false)
      })

      expect(capturedUpdatePayload).toEqual({ reliability_score: 0 })
    })

    it('clamps score to maximum of 100', async () => {
      mockProfile.reliability_score = 98

      const { result } = renderHook(() => useProfile())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.adjustReliabilityScore(true)
      })

      expect(capturedUpdatePayload).toEqual({ reliability_score: 100 })
    })

    it('does nothing when profile is null', async () => {
      vi.doMock('../contexts/AuthContext', () => ({
        useAuth: () => ({
          user: null
        })
      }))

      const { result } = renderHook(() => useProfile())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.adjustReliabilityScore(true)
      })
    })
  })
})
