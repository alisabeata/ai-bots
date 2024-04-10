import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Chat } from './index'
import * as useURLModule from 'src/hooks/useURL'

// Mocks
jest.mock('src/context/DialogContext', () => ({
  DialogProvider: ({ children }: { children: React.ReactNode }) => children,
}))

jest.mock('src/context/ChatSessionsContext', () => ({
  ChatSessionsProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}))

jest.mock('src/components/Navigation', () => ({
  Navigation: () => <div>Mocked Navigation</div>,
}))

jest.mock('src/components/ChatComponent', () => ({
  ChatComponent: () => <div>Mocked ChatComponent</div>,
}))

describe('Chat component', () => {
  it('renders correctly with id', async () => {
    // Mock
    jest.spyOn(useURLModule, 'useURL').mockReturnValue({
      id: 'mockedId',
      name: '',
      hash: '',
      pathname: '',
      updateHash: () => {},
    })

    render(<Chat />)

    await waitFor(() => {
      expect(screen.getByText('Mocked Navigation')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Mocked ChatComponent')).toBeInTheDocument()
    })
  })

  it('renders nothing without id', () => {
    // Mock
    jest.spyOn(useURLModule, 'useURL').mockReturnValue({
      id: '',
      name: '',
      hash: '',
      pathname: '',
      updateHash: () => {},
    })

    jest.spyOn(console, 'error').mockImplementation(() => {}) // expected error for missing id

    render(<Chat />)

    expect(screen.queryByText('Mocked Navigation')).not.toBeInTheDocument()
    expect(screen.queryByText('Mocked ChatComponent')).not.toBeInTheDocument()
  })
})
