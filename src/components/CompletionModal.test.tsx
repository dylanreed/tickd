// ABOUTME: Tests for the CompletionModal component.
// ABOUTME: Verifies the dopamine-hit reveal showing real vs fake dates.

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CompletionModal from './CompletionModal'

describe('CompletionModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    taskTitle: 'Test Task',
    realDueDate: new Date('2026-01-15'),
    completedAt: new Date('2026-01-13'),
    wasOnTime: true,
    theme: 'hinged' as const,
  }

  it('shows task title', () => {
    render(<CompletionModal {...defaultProps} />)
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  it('shows early completion message when on time', () => {
    render(<CompletionModal {...defaultProps} />)
    expect(screen.getByText(/2 days/i)).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    render(<CompletionModal {...defaultProps} onClose={onClose} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClose).toHaveBeenCalled()
  })

  it('does not render when isOpen is false', () => {
    render(<CompletionModal {...defaultProps} isOpen={false} />)
    expect(screen.queryByText('Test Task')).not.toBeInTheDocument()
  })
})
