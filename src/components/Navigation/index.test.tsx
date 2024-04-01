import React from 'react'
import { render, screen } from '@testing-library/react'
import { Navigation } from './index'

describe('Navigation Component', () => {
  it('renders logo and login link with correct attributes', () => {
    render(<Navigation />)

    // Assert that logo is rendered with correct attributes
    const logoElement = screen.getByAltText('Iris')
    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveClass('logo')

    // Assert that login link is rendered with correct attributes
    const loginLink = screen.getByTitle('Log In')
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveClass('login')

    // Assert that ghost image and text are rendered within login link
    const ghostImage = screen.getByAltText('Ghost')
    expect(ghostImage).toBeInTheDocument()
    expect(ghostImage).toHaveClass('ghost-image')

    const ghostText = screen.getByText('Cute Ghost')
    expect(ghostText).toBeInTheDocument()
  })

  it('renders correct href attributes', () => {
    render(<Navigation />)

    // Assert that logo and login link have correct href attributes
    // eslint-disable-next-line testing-library/no-node-access
    const logoLink = screen.getByAltText('Iris').closest('a')
    expect(logoLink).toHaveAttribute('href', '/')

    const loginLink = screen.getByTitle('Log In')
    expect(loginLink).toHaveAttribute('href', '/')
  })
})
