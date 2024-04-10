import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ChatItem } from './index'

describe('ChatItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Moks
    jest
      .spyOn(require('src/context/DialogContext'), 'useDialog')
      .mockReturnValue({
        resetChat: jest.fn(),
      })
    jest.spyOn(require('src/hooks/useURL'), 'useURL').mockReturnValue({
      pathname: '/test',
    })
  })

  it('renders children and handles click event', () => {
    render(
      <BrowserRouter>
        <ChatItem hash="testHash">Test Children</ChatItem>
      </BrowserRouter>,
    )

    const chatItemLink = screen.getByText('Test Children')
    fireEvent.click(chatItemLink)

    expect(chatItemLink.getAttribute('href')).toBe('/test#testHash')
  })
})
