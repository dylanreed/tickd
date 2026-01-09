// ABOUTME: Tests for push notification subscription management.
// ABOUTME: Verifies subscription flow and permission handling.

import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePushSubscription } from './usePushSubscription'

// Mock supabase
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({ error: null })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => ({ eq: vi.fn(() => ({ error: null })) })),
      })),
    })),
  },
}))

// Mock auth context
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'test-user-id' } }),
}))

describe('usePushSubscription', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns not_supported when Push API unavailable', () => {
    const originalServiceWorker = navigator.serviceWorker
    Object.defineProperty(navigator, 'serviceWorker', {
      value: undefined,
      configurable: true,
    })

    const { result } = renderHook(() => usePushSubscription())
    expect(result.current.permissionState).toBe('not_supported')

    Object.defineProperty(navigator, 'serviceWorker', {
      value: originalServiceWorker,
      configurable: true,
    })
  })

  it('provides subscribe function', () => {
    const { result } = renderHook(() => usePushSubscription())
    expect(typeof result.current.subscribe).toBe('function')
  })

  it('provides unsubscribe function', () => {
    const { result } = renderHook(() => usePushSubscription())
    expect(typeof result.current.unsubscribe).toBe('function')
  })

  it('provides isSupported boolean', () => {
    const { result } = renderHook(() => usePushSubscription())
    expect(typeof result.current.isSupported).toBe('boolean')
  })

  it('provides isSubscribed state', () => {
    const { result } = renderHook(() => usePushSubscription())
    expect(typeof result.current.isSubscribed).toBe('boolean')
  })

  it('provides loading state', () => {
    const { result } = renderHook(() => usePushSubscription())
    expect(typeof result.current.loading).toBe('boolean')
  })
})
