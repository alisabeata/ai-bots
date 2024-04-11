import React from 'react'
import { render, screen } from '@testing-library/react'
import { Message } from './index'
import { MessageType } from 'src/context/DialogContext'

describe('Message component', () => {
  const mockMessage: MessageType = {
    id: '1',
    sender: {
      type: 'user',
      url: 'user-avatar-url',
    },
    type: 'text',
    text: 'Test message text',
  }

  it('renders message correctly', async () => {
    render(<Message {...mockMessage} />)
    const messageText = await screen.findByText(mockMessage.text)
    expect(messageText).toBeInTheDocument()
  })

  it('renders file message correctly', async () => {
    const fileMessage: MessageType = {
      ...mockMessage,
      type: 'file',
      text: '<p>Test file message</p>',
    }
    render(<Message {...fileMessage} />)
    const fileMessageText = await screen.findByText('Test file message')
    expect(fileMessageText).toBeInTheDocument()
  })
})
