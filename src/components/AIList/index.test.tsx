import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { AIList } from './index'
import { BrowserRouter } from 'react-router-dom'
import { PersonasProvider } from 'src/context/PersonasContext'
import { MOCK_CHARACTERS } from 'src/components/Mocks'

describe('AIList component', () => {
  const title = 'Test Title'
  const descr = 'Test Description'

  it('renders the component properly', () => {
    render(
      <BrowserRouter>
        <PersonasProvider>
          <AIList items={MOCK_CHARACTERS} title={title} descr={descr} />
        </PersonasProvider>
      </BrowserRouter>,
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(descr)).toBeInTheDocument()

    // Check if the items are rendered
    MOCK_CHARACTERS.slice(0, 9).forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument()
      expect(screen.getByAltText(item.name)).toBeInTheDocument()
      expect(screen.getByText(item.descr)).toBeInTheDocument()
    })
  })

  it('shows "show more" button if items exceed shownElements', () => {
    render(
      <BrowserRouter>
        <PersonasProvider>
          <AIList items={MOCK_CHARACTERS} title={title} descr={descr} />
        </PersonasProvider>
      </BrowserRouter>,
    )

    expect(screen.getByText('show more')).toBeInTheDocument()
  })

  it('loads more items when "show more" button is clicked', () => {
    render(
      <BrowserRouter>
        <PersonasProvider>
          <AIList items={MOCK_CHARACTERS} title={title} descr={descr} />
        </PersonasProvider>
      </BrowserRouter>,
    )

    fireEvent.click(screen.getByText('show more'))

    // Check if additional items are loaded
    MOCK_CHARACTERS.slice(0, 18).forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument()
      expect(screen.getByAltText(item.name)).toBeInTheDocument()
      expect(screen.getByText(item.descr)).toBeInTheDocument()
    })
  })
})
