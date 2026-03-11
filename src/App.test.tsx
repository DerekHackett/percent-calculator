import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Percent Studio app', () => {
  it('renders the main layout and default calculator heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /percent studio/i }),
    ).toBeInTheDocument()

    const partHeadings = screen.getAllByRole('heading', { name: /part & whole/i })
    expect(partHeadings.length).toBeGreaterThan(0)
  })
})


