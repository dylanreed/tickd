// ABOUTME: Tests for the AddTaskForm component.
// ABOUTME: Verifies form input, validation, and submission.

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AddTaskForm from './AddTaskForm'

describe('AddTaskForm', () => {
  const mockOnAdd = vi.fn()

  beforeEach(() => {
    mockOnAdd.mockReset()
    mockOnAdd.mockResolvedValue({ error: null })
  })

  it('renders title and due date inputs', () => {
    render(<AddTaskForm onAdd={mockOnAdd} theme="hinged" />)
    expect(screen.getByPlaceholderText(/task title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument()
  })

  it('calls onAdd with form data when submitted', async () => {
    render(<AddTaskForm onAdd={mockOnAdd} theme="hinged" />)

    fireEvent.change(screen.getByPlaceholderText(/task title/i), {
      target: { value: 'New Task' }
    })
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: '2026-01-15' }
    })
    fireEvent.click(screen.getByRole('button', { name: /add/i }))

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Task',
      }))
    })
  })
})
