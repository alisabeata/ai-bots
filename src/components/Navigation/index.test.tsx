import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Navigation } from './index'

jest.mock('src/context/PersonasContext', () => ({
  DialogProvider: ({ children }: { children: React.ReactNode }) => children,
}))

describe('Navigation Component', () => {
  it('renders logo and login link with correct attributes', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    )

    // Assert that the logo is rendered with correct attributes
    const logoElement = screen.getByAltText('Iris')
    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveClass('logo')

    // Assert that the login link is rendered with correct attributes
    const loginLink = screen.getByTitle('Log In')
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveClass('login')
    expect(loginLink).toHaveAttribute('href', '/')
  })
})
