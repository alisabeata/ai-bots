import React from 'react'
import { render, screen } from '@testing-library/react'
import { Dialog } from './index'
import * as DialogContext from 'src/context/DialogContext'

// Types
type Message = {
  sender: {
    type: string
    url: string
  }
  type: string
  text: string
}

type DialogState = {
  messages: Message[]
}

type UseDialogReturn = {
  state: DialogState
}

describe('Dialog component', () => {
  let useDialogSpy: jest.SpyInstance<UseDialogReturn, []>

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
    const mockMessages: Message[] = [
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
    const mockMessages: Message[] = [
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
