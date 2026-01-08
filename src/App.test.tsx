// ABOUTME: Smoke test for App component.
// ABOUTME: Verifies the app renders without crashing.

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('Liars Todo')).toBeInTheDocument()
  })
})
