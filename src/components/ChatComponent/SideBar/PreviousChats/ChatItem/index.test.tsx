import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ChatItem } from './index'

jest.mock('src/context/DialogContext', () => ({
  useDialog: jest.fn(),
}))
jest.mock('src/hooks/useURL', () => ({
  useURL: jest.fn(),
}))

describe('ChatItem Component', () => {
  const mockResetChat = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    require('src/context/DialogContext').useDialog.mockReturnValue({
      resetChat: mockResetChat,
    })
    require('src/hooks/useURL').useURL.mockReturnValue({
      pathname: '/test',
      search: '?name=testName',
    })
  })

  it('renders children and handles click event', () => {
    render(
      <BrowserRouter>
        <ChatItem hash="testHash">Test Children</ChatItem>
      </BrowserRouter>,
    )

    const chatItemLink = screen.getByRole('link', { name: 'Test Children' })
    fireEvent.click(chatItemLink)

    // Asserting the href attribute
    expect(chatItemLink).toHaveAttribute('href', '/test?name=testName#testHash')

    // Verify that resetChat was called when the link is clicked
    expect(mockResetChat).toHaveBeenCalledTimes(1)
  })
})
