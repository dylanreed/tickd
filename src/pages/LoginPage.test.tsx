// ABOUTME: Tests for the login page component.
// ABOUTME: Verifies email input, form submission, and success message.

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LoginPage from './LoginPage'

const mockSignIn = vi.fn()

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    loading: false,
  })
}))

describe('LoginPage', () => {
  beforeEach(() => {
    mockSignIn.mockReset()
    mockSignIn.mockResolvedValue({ error: null })
  })

  it('renders email input and submit button', () => {
    render(<LoginPage />)
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /lie to me/i })).toBeInTheDocument()
  })

  it('submits email and shows success message', async () => {
    render(<LoginPage />)

    const input = screen.getByPlaceholderText(/email/i)
    const button = screen.getByRole('button', { name: /lie to me/i })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com')
      expect(screen.getByText(/check your email/i)).toBeInTheDocument()
    })
  })
})
