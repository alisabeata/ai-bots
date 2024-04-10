import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Bot } from './index'


describe('Bot component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Moks
    jest
      .spyOn(require('src/context/DialogContext'), 'useDialog')
      .mockReturnValue({
        addNewChat: jest.fn(),
        state: { messages: [] },
      })
    jest.spyOn(require('src/hooks/useURL'), 'useURL').mockReturnValue({
      name: 'TestBot',
    })
  })

  it('renders bot card with correct content', () => {
    render(<Bot onClose={jest.fn()} />)

    const h2Element = screen.getByRole('heading', { level: 2 }) // assume: 'TestBot' is the content of the <h2> element
    expect(h2Element).toBeInTheDocument()
    expect(h2Element).toHaveTextContent('TestBot')
  })

  it('calls addNewChat when "new chat" button is clicked', () => {
    render(<Bot onClose={jest.fn()} />)
    const newChatButton = screen.getByText('new chat')

    fireEvent.click(newChatButton)

    expect(screen.getByText('new chat')).toBeInTheDocument()
  })
})
