import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { AILists } from './index'
import { BrowserRouter } from 'react-router-dom'
import { PersonasProvider } from 'src/context/PersonasContext'
import { MOCK_BOTS } from 'src/components/Mocks'

// Mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ personas: [{ id: 1, name: 'Test Character' }] }),
    ok: true,
  }),
) as jest.Mock

describe('Content Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders properly with mock data', () => {
    render(
      <BrowserRouter>
        <PersonasProvider>
          <AILists />
        </PersonasProvider>
      </BrowserRouter>,
    )

    // assert: the titles and descriptions are rendered
    expect(screen.getByText('Iris Characters')).toBeInTheDocument()
    expect(screen.getByText('AIs created by Iris team')).toBeInTheDocument()
    expect(screen.getByText('Purpose Bots')).toBeInTheDocument()
    expect(
      screen.getByText('AIs created to achieve your goals'),
    ).toBeInTheDocument()

    // assert: mock characters and mock bots are rendered
    MOCK_BOTS.forEach((bot) => {
      expect(screen.getByText(bot.name)).toBeInTheDocument()
    })
  })

  it('fetches data from the API', async () => {
    render(
      <BrowserRouter>
        <PersonasProvider>
          <AILists />
        </PersonasProvider>
      </BrowserRouter>,
    )
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
  })
})
