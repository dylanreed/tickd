// ABOUTME: Tests for the settings page component.
// ABOUTME: Verifies header, back navigation, and notification settings display.

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SettingsPage from './SettingsPage'

// Mock the hooks
vi.mock('../hooks/usePushSubscription', () => ({
  usePushSubscription: () => ({
    permissionState: 'prompt',
    isSubscribed: false,
    isSupported: true,
    loading: false,
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
  }),
}))

vi.mock('../hooks/useProfile', () => ({
  useProfile: () => ({
    profile: {
      id: 'user-123',
      email: 'test@example.com',
      reliability_score: 75,
      theme: 'hinged',
      notification_preferences: 'none',
      subscription_status: 'trialing',
      trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      stripe_customer_id: null,
      subscription_id: null,
    },
    updateProfile: vi.fn(),
    loading: false,
  }),
}))

vi.mock('../hooks/useSubscription', () => ({
  useSubscription: () => ({
    status: 'trialing',
    isLocked: false,
    isTrialing: true,
    trialDaysRemaining: 7,
    loading: false,
  }),
}))

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'user-123', email: 'test@example.com' },
    session: null,
    loading: false,
    signIn: vi.fn(),
    signOut: vi.fn(),
  }),
}))

describe('SettingsPage', () => {
  const mockOnBack = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders settings header', () => {
    render(<SettingsPage onBack={mockOnBack} />)
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders back button', () => {
    render(<SettingsPage onBack={mockOnBack} />)
    const backButton = screen.getByRole('button', { name: /back/i })
    expect(backButton).toBeInTheDocument()
  })

  it('calls onBack when back button clicked', () => {
    render(<SettingsPage onBack={mockOnBack} />)
    const backButton = screen.getByRole('button', { name: /back/i })
    fireEvent.click(backButton)
    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })

  it('renders NotificationSettings component', () => {
    render(<SettingsPage onBack={mockOnBack} />)
    expect(screen.getByText('Notification Settings')).toBeInTheDocument()
  })

  it('applies hinged theme styling by default', () => {
    render(<SettingsPage onBack={mockOnBack} />)
    const container = screen.getByTestId('settings-page')
    expect(container).toHaveClass('bg-hinged-bg')
  })
})
