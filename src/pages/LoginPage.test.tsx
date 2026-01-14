// ABOUTME: Tests for the login page component.
// ABOUTME: Verifies email input, form submission, and both auth flows.

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LoginPage from './LoginPage'

const mockSignIn = vi.fn()
const mockSignInWithCode = vi.fn()
const mockVerifyCode = vi.fn()

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    signInWithCode: mockSignInWithCode,
    verifyCode: mockVerifyCode,
    loading: false,
  })
}))

describe('LoginPage', () => {
  beforeEach(() => {
    mockSignIn.mockReset()
    mockSignInWithCode.mockReset()
    mockVerifyCode.mockReset()
    mockSignIn.mockResolvedValue({ error: null })
    mockSignInWithCode.mockResolvedValue({ error: null })
    mockVerifyCode.mockResolvedValue({ error: null })

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(display-mode: standalone)' ? false : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it('renders email input and submit button', () => {
    render(<LoginPage />)
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /lie to me/i })).toBeInTheDocument()
  })

  it('submits email and shows magic link success message in browser', async () => {
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

  it('shows alternate option to send code in browser mode', () => {
    render(<LoginPage />)

    const input = screen.getByPlaceholderText(/email/i)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(screen.getByText(/send a code instead/i)).toBeInTheDocument()
  })

  it('can switch to code flow and shows code entry screen', async () => {
    render(<LoginPage />)

    const input = screen.getByPlaceholderText(/email/i)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const codeOption = screen.getByText(/send a code instead/i)
    fireEvent.click(codeOption)

    await waitFor(() => {
      expect(mockSignInWithCode).toHaveBeenCalledWith('test@example.com')
      expect(screen.getByText(/enter your code/i)).toBeInTheDocument()
    })
  })

  it('verifies code and authenticates', async () => {
    render(<LoginPage />)

    const input = screen.getByPlaceholderText(/email/i)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const codeOption = screen.getByText(/send a code instead/i)
    fireEvent.click(codeOption)

    await waitFor(() => {
      expect(screen.getByText(/enter your code/i)).toBeInTheDocument()
    })

    const codeInput = screen.getByPlaceholderText('000000')
    fireEvent.change(codeInput, { target: { value: '123456' } })

    await waitFor(() => {
      expect(mockVerifyCode).toHaveBeenCalledWith('test@example.com', '123456')
    })
  })

  it('shows error when code verification fails', async () => {
    mockVerifyCode.mockResolvedValue({ error: { message: 'Invalid code' } })

    render(<LoginPage />)

    const input = screen.getByPlaceholderText(/email/i)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const codeOption = screen.getByText(/send a code instead/i)
    fireEvent.click(codeOption)

    await waitFor(() => {
      expect(screen.getByText(/enter your code/i)).toBeInTheDocument()
    })

    const codeInput = screen.getByPlaceholderText('000000')
    fireEvent.change(codeInput, { target: { value: '123456' } })

    await waitFor(() => {
      expect(screen.getByText(/invalid code/i)).toBeInTheDocument()
    })
  })

  it('can resend code', async () => {
    render(<LoginPage />)

    const input = screen.getByPlaceholderText(/email/i)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const codeOption = screen.getByText(/send a code instead/i)
    fireEvent.click(codeOption)

    await waitFor(() => {
      expect(screen.getByText(/enter your code/i)).toBeInTheDocument()
    })

    mockSignInWithCode.mockClear()
    const resendButton = screen.getByText(/resend code/i)
    fireEvent.click(resendButton)

    await waitFor(() => {
      expect(mockSignInWithCode).toHaveBeenCalledWith('test@example.com')
    })
  })

  it('can go back from code entry to email', async () => {
    render(<LoginPage />)

    const input = screen.getByPlaceholderText(/email/i)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const codeOption = screen.getByText(/send a code instead/i)
    fireEvent.click(codeOption)

    await waitFor(() => {
      expect(screen.getByText(/enter your code/i)).toBeInTheDocument()
    })

    const backButton = screen.getByLabelText(/go back/i)
    fireEvent.click(backButton)

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
      expect(screen.queryByText(/enter your code/i)).not.toBeInTheDocument()
    })
  })
})
