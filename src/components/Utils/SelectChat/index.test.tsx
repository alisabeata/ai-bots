import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { SelectChat } from './index'

// Mock
jest.mock('src/hooks/useURL', () => ({
  useURL: jest.fn(),
}))

jest.mock('src/context/PersonasContext', () => ({
  usePersonas: jest.fn(),
}))

describe('SelectChat component', () => {
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks()

    // Setup mock returns
    require('src/hooks/useURL').useURL.mockReturnValue({
      name: 'TestName',
    })
    require('src/context/PersonasContext').usePersonas.mockReturnValue({
      charactersData: [
        { id: '1', name: 'Persona 1' },
        { id: '2', name: 'Persona 2' },
      ],
    })
  })

  it('renders with default selected option and dropdown initially closed', () => {
    render(
      <BrowserRouter>
        <SelectChat />
      </BrowserRouter>,
    )

    // Check if default selected option is rendered
    expect(screen.getByText('TestName')).toBeInTheDocument()
    // Ensure dropdown is not visible initially
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('toggles dropdown when clicked', async () => {
    render(
      <BrowserRouter>
        <SelectChat />
      </BrowserRouter>,
    )

    const selectButton = screen.getByText('TestName')
    fireEvent.click(selectButton)

    // After clicking, the dropdown should be visible
    expect(screen.getByRole('list')).toBeInTheDocument()

    // Click again to close the dropdown
    fireEvent.click(selectButton)
    await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
  })

  it('updates the selected option when an option is clicked', () => {
    render(
      <BrowserRouter>
        <SelectChat />
      </BrowserRouter>,
    )

    // Open dropdown
    fireEvent.click(screen.getByText('TestName'))
    // Click on an option
    fireEvent.click(screen.getByRole('link', { name: 'Persona 2' }))

    // Expect selected option to update
    expect(screen.getByRole('link', { name: 'Persona 2' })).toBeInTheDocument()
  })
})
