// ABOUTME: Tests for notification settings component.
// ABOUTME: Verifies toggle and permission request flow.

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import NotificationSettings from './NotificationSettings'

const mockSubscribe = vi.fn()
const mockUnsubscribe = vi.fn()
const mockUpdateProfile = vi.fn()

// Mock usePushSubscription hook
vi.mock('../hooks/usePushSubscription', () => ({
  usePushSubscription: () => ({
    permissionState: 'prompt',
    isSubscribed: false,
    loading: false,
    isSupported: true,
    subscribe: mockSubscribe,
    unsubscribe: mockUnsubscribe,
  }),
}))

// Mock useProfile hook
vi.mock('../hooks/useProfile', () => ({
  useProfile: () => ({
    profile: {
      id: 'test-user',
      email: 'test@example.com',
      notification_preferences: 'both',
      reliability_score: 75,
      theme: 'hinged',
      created_at: '2024-01-01',
    },
    loading: false,
    error: null,
    updateProfile: mockUpdateProfile,
    adjustReliabilityScore: vi.fn(),
  }),
}))

describe('NotificationSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSubscribe.mockResolvedValue({ error: null })
    mockUnsubscribe.mockResolvedValue({ error: null })
    mockUpdateProfile.mockResolvedValue({ error: null })
  })

  it('renders notification preference options', () => {
    render(<NotificationSettings />)
    expect(screen.getByText('Browser Notifications')).toBeInTheDocument()
    expect(screen.getByText('Email Notifications')).toBeInTheDocument()
  })

  it('shows enable button when not subscribed to browser notifications', () => {
    render(<NotificationSettings />)
    const buttons = screen.getAllByRole('button')
    const enableButton = buttons.find((btn) => btn.textContent === 'Enable')
    expect(enableButton).toBeInTheDocument()
  })

  it('shows current preference summary', () => {
    render(<NotificationSettings />)
    expect(screen.getByText(/browser.*email/i)).toBeInTheDocument()
  })

  it('calls subscribe when enabling browser notifications', async () => {
    render(<NotificationSettings />)
    const enableButton = screen.getAllByRole('button').find((btn) => btn.textContent === 'Enable')
    fireEvent.click(enableButton!)
    await waitFor(() => {
      expect(mockSubscribe).toHaveBeenCalled()
    })
  })

  it('shows email address in email section', () => {
    render(<NotificationSettings />)
    expect(screen.getByText(/test@example.com/)).toBeInTheDocument()
  })
})

describe('NotificationSettings with subscribed state', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUnsubscribe.mockResolvedValue({ error: null })
    // Override the mock for this describe block
    vi.doMock('../hooks/usePushSubscription', () => ({
      usePushSubscription: () => ({
        permissionState: 'granted',
        isSubscribed: true,
        loading: false,
        isSupported: true,
        subscribe: mockSubscribe,
        unsubscribe: mockUnsubscribe,
      }),
    }))
  })

  it('shows disable button when already subscribed', async () => {
    // Re-import to get the new mock
    vi.resetModules()
    vi.doMock('../hooks/usePushSubscription', () => ({
      usePushSubscription: () => ({
        permissionState: 'granted',
        isSubscribed: true,
        loading: false,
        isSupported: true,
        subscribe: mockSubscribe,
        unsubscribe: mockUnsubscribe,
      }),
    }))
    vi.doMock('../hooks/useProfile', () => ({
      useProfile: () => ({
        profile: {
          id: 'test-user',
          email: 'test@example.com',
          notification_preferences: 'both',
          reliability_score: 75,
          theme: 'hinged',
          created_at: '2024-01-01',
        },
        loading: false,
        error: null,
        updateProfile: mockUpdateProfile,
        adjustReliabilityScore: vi.fn(),
      }),
    }))

    const { default: NotificationSettingsComponent } = await import('./NotificationSettings')
    render(<NotificationSettingsComponent />)
    const disableButton = screen.getAllByRole('button').find((btn) => btn.textContent === 'Disable')
    expect(disableButton).toBeInTheDocument()
  })
})

describe('NotificationSettings when not supported', () => {
  it('shows not supported message when push is unavailable', async () => {
    vi.resetModules()
    vi.doMock('../hooks/usePushSubscription', () => ({
      usePushSubscription: () => ({
        permissionState: 'not_supported',
        isSubscribed: false,
        loading: false,
        isSupported: false,
        subscribe: vi.fn(),
        unsubscribe: vi.fn(),
      }),
    }))
    vi.doMock('../hooks/useProfile', () => ({
      useProfile: () => ({
        profile: {
          id: 'test-user',
          email: 'test@example.com',
          notification_preferences: 'email',
          reliability_score: 75,
          theme: 'hinged',
          created_at: '2024-01-01',
        },
        loading: false,
        error: null,
        updateProfile: vi.fn(),
        adjustReliabilityScore: vi.fn(),
      }),
    }))

    const { default: NotificationSettingsComponent } = await import('./NotificationSettings')
    render(<NotificationSettingsComponent />)
    expect(screen.getByText(/not supported/i)).toBeInTheDocument()
  })
})

describe('NotificationSettings when permission denied', () => {
  it('shows blocked message when permission denied', async () => {
    vi.resetModules()
    vi.doMock('../hooks/usePushSubscription', () => ({
      usePushSubscription: () => ({
        permissionState: 'denied',
        isSubscribed: false,
        loading: false,
        isSupported: true,
        subscribe: vi.fn(),
        unsubscribe: vi.fn(),
      }),
    }))
    vi.doMock('../hooks/useProfile', () => ({
      useProfile: () => ({
        profile: {
          id: 'test-user',
          email: 'test@example.com',
          notification_preferences: 'email',
          reliability_score: 75,
          theme: 'hinged',
          created_at: '2024-01-01',
        },
        loading: false,
        error: null,
        updateProfile: vi.fn(),
        adjustReliabilityScore: vi.fn(),
      }),
    }))

    const { default: NotificationSettingsComponent } = await import('./NotificationSettings')
    render(<NotificationSettingsComponent />)
    expect(screen.getByText(/blocked/i)).toBeInTheDocument()
  })
})

describe('NotificationSettings with different preferences', () => {
  it('shows browser only when preference is browser', async () => {
    vi.resetModules()
    vi.doMock('../hooks/usePushSubscription', () => ({
      usePushSubscription: () => ({
        permissionState: 'granted',
        isSubscribed: true,
        loading: false,
        isSupported: true,
        subscribe: vi.fn(),
        unsubscribe: vi.fn(),
      }),
    }))
    vi.doMock('../hooks/useProfile', () => ({
      useProfile: () => ({
        profile: {
          id: 'test-user',
          email: 'test@example.com',
          notification_preferences: 'browser',
          reliability_score: 75,
          theme: 'hinged',
          created_at: '2024-01-01',
        },
        loading: false,
        error: null,
        updateProfile: vi.fn(),
        adjustReliabilityScore: vi.fn(),
      }),
    }))

    const { default: NotificationSettingsComponent } = await import('./NotificationSettings')
    render(<NotificationSettingsComponent />)
    expect(screen.getByText(/browser only/i)).toBeInTheDocument()
  })

  it('shows email only when preference is email', async () => {
    vi.resetModules()
    vi.doMock('../hooks/usePushSubscription', () => ({
      usePushSubscription: () => ({
        permissionState: 'prompt',
        isSubscribed: false,
        loading: false,
        isSupported: true,
        subscribe: vi.fn(),
        unsubscribe: vi.fn(),
      }),
    }))
    vi.doMock('../hooks/useProfile', () => ({
      useProfile: () => ({
        profile: {
          id: 'test-user',
          email: 'test@example.com',
          notification_preferences: 'email',
          reliability_score: 75,
          theme: 'hinged',
          created_at: '2024-01-01',
        },
        loading: false,
        error: null,
        updateProfile: vi.fn(),
        adjustReliabilityScore: vi.fn(),
      }),
    }))

    const { default: NotificationSettingsComponent } = await import('./NotificationSettings')
    render(<NotificationSettingsComponent />)
    expect(screen.getByText(/email only/i)).toBeInTheDocument()
  })

  it('shows none when preference is none', async () => {
    vi.resetModules()
    vi.doMock('../hooks/usePushSubscription', () => ({
      usePushSubscription: () => ({
        permissionState: 'prompt',
        isSubscribed: false,
        loading: false,
        isSupported: true,
        subscribe: vi.fn(),
        unsubscribe: vi.fn(),
      }),
    }))
    vi.doMock('../hooks/useProfile', () => ({
      useProfile: () => ({
        profile: {
          id: 'test-user',
          email: 'test@example.com',
          notification_preferences: 'none',
          reliability_score: 75,
          theme: 'hinged',
          created_at: '2024-01-01',
        },
        loading: false,
        error: null,
        updateProfile: vi.fn(),
        adjustReliabilityScore: vi.fn(),
      }),
    }))

    const { default: NotificationSettingsComponent } = await import('./NotificationSettings')
    render(<NotificationSettingsComponent />)
    // The text is split across elements, so search for the span containing "None"
    expect(screen.getByText('None')).toBeInTheDocument()
  })
})

describe('NotificationSettings with no profile', () => {
  it('renders nothing when profile is null', async () => {
    vi.resetModules()
    vi.doMock('../hooks/usePushSubscription', () => ({
      usePushSubscription: () => ({
        permissionState: 'prompt',
        isSubscribed: false,
        loading: false,
        isSupported: true,
        subscribe: vi.fn(),
        unsubscribe: vi.fn(),
      }),
    }))
    vi.doMock('../hooks/useProfile', () => ({
      useProfile: () => ({
        profile: null,
        loading: false,
        error: null,
        updateProfile: vi.fn(),
        adjustReliabilityScore: vi.fn(),
      }),
    }))

    const { default: NotificationSettingsComponent } = await import('./NotificationSettings')
    const { container } = render(<NotificationSettingsComponent />)
    expect(container.firstChild).toBeNull()
  })
})
