import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Prompt } from './index'

describe('Prompt', () => {
  beforeEach(() => {
    // Moks
    jest.clearAllMocks()
    jest
      .spyOn(require('src/context/DialogContext'), 'useDialog')
      .mockReturnValue({
        initSession: jest.fn(),
        addMessage: jest.fn(),
      })
    jest.spyOn(require('src/hooks/useURL'), 'useURL').mockReturnValue({
      hash: 'someHash',
    })
  })

  test('renders without crashing', () => {
    render(<Prompt />)
  })

  test('submitting the form calls sendMessage function', async () => {
    render(<Prompt />)
    const formElement = await screen.findByRole('form')
    expect(formElement).toBeInTheDocument()
  })

  test('renders textarea with placeholder', async () => {
    render(<Prompt />)
    const textarea = await screen.findByPlaceholderText(
      'Type or speak anything..',
    )
    expect(textarea).toBeInTheDocument()
  })

  test('typing in textarea updates message state', async () => {
    render(<Prompt />)
    const textarea = await screen.findByPlaceholderText(
      'Type or speak anything..',
    )
    fireEvent.change(textarea, { target: { value: 'Hello, world!' } })
    expect(textarea).toHaveValue('Hello, world!')
  })
})
