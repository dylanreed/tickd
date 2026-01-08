// ABOUTME: Tests for the TaskCard component.
// ABOUTME: Verifies task display, urgency styling, and completion interaction.

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TaskCard from './TaskCard'
import type { TaskWithFakeDate } from '../types/task'

const mockTask: TaskWithFakeDate = {
  id: '1',
  user_id: 'user-1',
  title: 'Test Task',
  description: 'A test description',
  real_due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  category: 'work',
  status: 'pending',
  completed_at: null,
  was_on_time: null,
  created_at: new Date().toISOString(),
  // 2.5 days from now to ensure it shows as "2 days" even with timing variations
  fake_due_date: new Date(Date.now() + 2.5 * 24 * 60 * 60 * 1000),
  urgency: 'medium',
}

describe('TaskCard', () => {
  it('renders task title', () => {
    render(<TaskCard task={mockTask} onComplete={vi.fn()} theme="hinged" />)
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  it('shows fake due date, not real date', () => {
    render(<TaskCard task={mockTask} onComplete={vi.fn()} theme="hinged" />)
    // Should show the fake date (2 days away), not real (5 days)
    expect(screen.getByText(/2 days/i)).toBeInTheDocument()
  })

  it('calls onComplete when complete button clicked', () => {
    const onComplete = vi.fn()
    render(<TaskCard task={mockTask} onComplete={onComplete} theme="hinged" />)
    fireEvent.click(screen.getByRole('button', { name: /complete/i }))
    expect(onComplete).toHaveBeenCalledWith('1')
  })

  it('shows category if present', () => {
    render(<TaskCard task={mockTask} onComplete={vi.fn()} theme="hinged" />)
    expect(screen.getByText('work')).toBeInTheDocument()
  })
})
