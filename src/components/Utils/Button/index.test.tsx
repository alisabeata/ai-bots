import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './index'

describe('Button Component', () => {
  it('renders button with provided children', () => {
    render(<Button onClick={() => {}}>Click me</Button>)

    // Assert that button is rendered with provided children
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveTextContent('Click me')
  })

  it('calls onClick handler when button is clicked', () => {
    const onClickMock = jest.fn()
    render(<Button onClick={onClickMock}>Click me</Button>)

    // Click the button
    fireEvent.click(screen.getByRole('button'))

    // Assert that onClick handler is called
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('applies correct class from CSS module', () => {
    render(<Button onClick={() => {}}>Click me</Button>)

    // Assert that button has the correct class from CSS module
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toHaveClass('button')
  })
})
