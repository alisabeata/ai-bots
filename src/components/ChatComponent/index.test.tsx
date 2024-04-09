import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { ChatComponent } from './index'
import { DialogProvider } from 'src/context/DialogContext'
import { BrowserRouter } from 'react-router-dom'

describe('ChatComponent', () => {
  const mockAddNewChat = jest.fn() // Mock function to spy on

  window.HTMLElement.prototype.scrollIntoView = function () {}

  beforeEach(() => {
    jest
      .spyOn(require('src/context/DialogContext'), 'useDialog')
      .mockImplementation(() => ({
        addNewChat: mockAddNewChat,
        state: { messages: [] },
      }))
  })

  afterEach(() => {
    jest.restoreAllMocks() // Restore all mocks after each test
  })

  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <DialogProvider id="someId&queryId">
          <ChatComponent />
        </DialogProvider>
      </BrowserRouter>,
    )
  })

  test('calls addNewChat function when new-chat button is clicked', () => {
    render(
      <BrowserRouter>
        <DialogProvider id="someId&queryId">
          <ChatComponent />
        </DialogProvider>
      </BrowserRouter>,
    )

    const newChatButton = screen.getByRole('button', { name: /new chat/i })
    fireEvent.click(newChatButton)

    expect(mockAddNewChat).toHaveBeenCalled() // Check if the mock function is called
  })
})
