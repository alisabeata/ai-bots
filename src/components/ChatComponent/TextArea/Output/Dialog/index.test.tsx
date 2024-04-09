import React from 'react'
import { render, screen } from '@testing-library/react'
import { Dialog } from './index'
import * as DialogContext from 'src/context/DialogContext'

describe('Dialog component', () => {
  let useDialogSpy: any

  beforeEach(() => {
    // Spy on useDialog hook
    useDialogSpy = jest.spyOn(DialogContext, 'useDialog')
  })

  afterEach(() => {
    // Clean up the spy after each test
    useDialogSpy.mockRestore()
  })

  it('renders dialog correctly with messages', () => {
    // Mock state with messages
    const mockMessages = [
      {
        sender: {
          type: 'user',
          url: 'user-avatar-url',
        },
        type: 'text',
        text: 'Test message 1',
      },
      {
        sender: {
          type: 'bot',
          url: 'bot-avatar-url',
        },
        type: 'text',
        text: 'Test message 2',
      },
    ]

    // Mock useDialog hook return value
    useDialogSpy.mockReturnValue({ state: { messages: mockMessages } })

    render(<Dialog />)
    const dialogElement = screen.getByTestId('dialog')

    expect(dialogElement).toBeInTheDocument()
    expect(dialogElement).toHaveClass('dialog')
  })

  it('applies offset class when there are more than one message', () => {
    // Mock state with multiple messages
    const mockMessages = [
      {
        sender: {
          type: 'user',
          url: 'user-avatar-url',
        },
        type: 'text',
        text: 'Test message 1',
      },
      {
        sender: {
          type: 'bot',
          url: 'bot-avatar-url',
        },
        type: 'text',
        text: 'Test message 2',
      },
    ]

    // Mock useDialog hook return value
    useDialogSpy.mockReturnValue({ state: { messages: mockMessages } })

    render(<Dialog />)
    const dialogElement = screen.getByTestId('dialog')

    expect(dialogElement).toHaveClass('dialog dialog__offset')
  })
})
