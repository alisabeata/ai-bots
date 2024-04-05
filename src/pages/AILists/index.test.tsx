import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { AILists } from './index'
import { MOCK_BOTS } from '../../components/Mocks'

// Mock the fetch function
(global as any).fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ personas: [{ id: 1, name: 'Test Character' }] }),
    ok: true,
  }),
)

describe('Content Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders properly with mock data', () => {
    render(<AILists />)

    // Assert that the titles and descriptions are rendered
    expect(screen.getByText('Iris Characters')).toBeInTheDocument()
    expect(screen.getByText('AIs created by Iris team')).toBeInTheDocument()
    expect(screen.getByText('Purpose Bots')).toBeInTheDocument()
    expect(
      screen.getByText('AIs created to achieve your goals'),
    ).toBeInTheDocument()

    // Assert that mock characters and mock bots are rendered
    MOCK_BOTS.forEach((bot) => {
      expect(screen.getByText(bot.name)).toBeInTheDocument()
    })
  })

  it('fetches data from the API', async () => {
    render(<AILists />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
  })
})
