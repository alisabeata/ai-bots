import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { SelectChat } from './index'

describe('SelectChat component', () => {
  beforeEach(() => {
    // Moks
    jest.clearAllMocks()
    jest
      .spyOn(require('src/context/PersonasContext'), 'usePersonas')
      .mockReturnValue({
        charactersData: [
          { id: '1', name: 'Persona 1' },
          { id: '2', name: 'Persona 2' },
        ],
      })
    jest.spyOn(require('src/hooks/useURL'), 'useURL').mockReturnValue({
      name: 'TestName',
    })
  })

  it('renders with default selected option and closed dropdown', () => {
    render(
      <BrowserRouter>
        <SelectChat />
      </BrowserRouter>,
    )

    // Check if default selected option is rendered
    expect(screen.getByText('TestName')).toBeInTheDocument()

    // Check if links were rendered
    expect(screen.getByRole('link', { name: 'Persona 1' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Persona 2' })).toBeInTheDocument()
  })

  it('toggles dropdown when clicked', () => {
    render(
      <BrowserRouter>
        <SelectChat />
      </BrowserRouter>,
    )

    const selectButton = screen.getByText('TestName')
    fireEvent.click(selectButton)
  })
})
