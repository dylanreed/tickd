// ABOUTME: Tests for the Excuse Modal component.
// ABOUTME: Verifies form validation and submission.

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ExcuseModal from './ExcuseModal'

describe('ExcuseModal', () => {
  const mockOnClose = vi.fn()
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders when isOpen is true', () => {
    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )
    expect(screen.getByText(/what's your excuse/i)).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(
      <ExcuseModal
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )
    expect(screen.queryByText(/excuse/i)).not.toBeInTheDocument()
  })

  it('shows the task title being excused', () => {
    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Buy groceries"
      />
    )
    expect(screen.getByText(/Buy groceries/)).toBeInTheDocument()
  })

  it('shows character count warning for short excuses', () => {
    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'short' } })

    expect(screen.getByText(/at least.*more/i)).toBeInTheDocument()
  })

  it('disables submit button when excuse is too short', () => {
    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'short' } })

    const submitButton = screen.getByRole('button', { name: /believe/i })
    expect(submitButton).toBeDisabled()
  })

  it('enables submit button when excuse is long enough', () => {
    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'I have a very important meeting' } })

    const submitButton = screen.getByRole('button', { name: /believe/i })
    expect(submitButton).toBeEnabled()
  })

  it('calls onSubmit with excuse text when valid', async () => {
    mockOnSubmit.mockResolvedValue({ success: true })

    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'I have a very important meeting' } })

    const submitButton = screen.getByRole('button', { name: /believe/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('I have a very important meeting')
    })
  })

  it('calls onClose when cancel button is clicked', () => {
    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )

    const cancelButton = screen.getByRole('button', { name: /do it/i })
    fireEvent.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalled()
  })

  it('shows the 6 hour reprieve hint', () => {
    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )

    expect(screen.getByText(/6 hour/i)).toBeInTheDocument()
  })

  it('displays Tick with skeptical expression', () => {
    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )

    expect(screen.getByRole('img', { name: /skeptical/i })).toBeInTheDocument()
  })

  it('shows character count as user types', () => {
    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'test' } })

    expect(screen.getByText(/4.*10/)).toBeInTheDocument()
  })

  it('has placeholder text with example excuse', () => {
    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('placeholder')
    expect(textarea.getAttribute('placeholder')?.length).toBeGreaterThan(0)
  })
})
