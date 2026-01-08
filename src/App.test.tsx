// ABOUTME: Tests for App component.
// ABOUTME: Verifies auth flow and conditional rendering.

import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

vi.mock('./lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } }
      }),
      signInWithOtp: vi.fn(),
      signOut: vi.fn(),
    }
  }
}))

describe('App', () => {
  it('shows login page when not authenticated', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText('Liars Todo')).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    })
  })
})
