import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PersonasProvider } from 'src/context/PersonasContext'
import { Navigation } from './index'

describe('Navigation Component', () => {
  it('renders logo and login link with correct attributes', () => {
    render(
      <BrowserRouter>
        <PersonasProvider>
          <Navigation />
        </PersonasProvider>
      </BrowserRouter>,
    )

    // Assert that logo is rendered with correct attributes
    const logoElement = screen.getByAltText('Iris')
    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveClass('logo')

    // Assert that login link is rendered with correct attributes
    const loginLink = screen.getByTitle('Log In')
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveClass('login')
  })
})
