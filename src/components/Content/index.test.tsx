import React from 'react'
import { render, screen } from '@testing-library/react'
import { Content } from './index'
import { MOCK_CHARACTERS } from '../Mocks'
import { MOCK_BOTS } from '../Mocks'

describe('Content Component', () => {
  it('renders properly with mock data', () => {
    render(<Content />)

    // Assert that the titles and descriptions are rendered
    expect(screen.getByText('Iris Characters')).toBeInTheDocument()
    expect(screen.getByText('AIs created by Iris team')).toBeInTheDocument()
    expect(screen.getByText('Purpose Bots')).toBeInTheDocument()
    expect(
      screen.getByText('AIs created to achieve your goals'),
    ).toBeInTheDocument()

    // Assert that mock characters and mock bots are rendered
    MOCK_CHARACTERS.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument()
    })

    MOCK_BOTS.forEach((bot) => {
      expect(screen.getByText(bot.name)).toBeInTheDocument()
    })
  })
})
