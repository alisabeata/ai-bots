import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AIList } from './index'
import { MOCK_CHARACTERS } from '../Mocks'

describe('AIList Component', () => {
  it('loads more items when "show more" button is clicked', async () => {
    render(
      <AIList
        items={MOCK_CHARACTERS}
        title="Mock Title"
        descr="Mock Description"
      />,
    )

    // Assert that 9 items are initially rendered
    expect(screen.getAllByRole('listitem').length).toBe(9)

    // Wait for the "show more" button to appear
    await waitFor(() => {
      expect(screen.getByText('show more')).toBeInTheDocument()
    })

    // Click the "show more" button
    fireEvent.click(screen.getByText('show more'))

    // Assert that more items are rendered after clicking the button
    expect(screen.getAllByRole('listitem').length).toBe(MOCK_CHARACTERS.length)
  })
})
