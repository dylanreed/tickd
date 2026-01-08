// ABOUTME: Tests for the ThemeToggle component.
// ABOUTME: Verifies hinged/unhinged theme switching.

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  it('shows current theme', () => {
    render(<ThemeToggle theme="hinged" onToggle={vi.fn()} />)
    expect(screen.getByText(/hinged/i)).toBeInTheDocument()
  })

  it('calls onToggle with opposite theme when clicked', () => {
    const onToggle = vi.fn()
    render(<ThemeToggle theme="hinged" onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledWith('unhinged')
  })

  it('toggles from unhinged to hinged', () => {
    const onToggle = vi.fn()
    render(<ThemeToggle theme="unhinged" onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledWith('hinged')
  })
})
