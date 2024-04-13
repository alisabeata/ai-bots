import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { AIList } from './index'
import { BrowserRouter } from 'react-router-dom'
import { MOCK_CHARACTERS } from 'src/components/Mocks'

jest.mock('src/context/PersonasContext', () => ({
  DialogProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

describe('AIList component', () => {
  const title = 'Test Title'
  const descr = 'Test Description'

  it('renders the component properly', () => {
    render(
      <BrowserRouter>
        <AIList items={MOCK_CHARACTERS} title={title} descr={descr} />
      </BrowserRouter>,
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(descr)).toBeInTheDocument()

    // Check if the initial set of items are rendered
    MOCK_CHARACTERS.slice(0, 9).forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument()
      expect(screen.getByAltText(item.name)).toBeInTheDocument()
      expect(
        screen.getByText(item.descr || 'Some text here...'),
      ).toBeInTheDocument()
    })
  })

  it('always shows "show more" button if items exceed initial shownElements', () => {
    // Ensure MOCK_CHARACTERS has more than 9 items for this test
    render(
      <BrowserRouter>
        <AIList
          items={MOCK_CHARACTERS}
          title={title}
          descr={descr}
          isLoading={false}
        />
      </BrowserRouter>,
    )

    // 'show more' button should appear as there are more than 9 characters
    expect(screen.getByText('show more')).toBeInTheDocument()
  })

  it('does not show "show more" button when items do not exceed initial shownElements', () => {
    // Use fewer than 9 characters for this test scenario
    const fewerItems = MOCK_CHARACTERS.slice(0, 8)
    render(
      <BrowserRouter>
        <AIList
          items={fewerItems}
          title={title}
          descr={descr}
          isLoading={false}
        />
      </BrowserRouter>,
    )

    // 'show more' button should not appear
    expect(screen.queryByText('show more')).not.toBeInTheDocument()
  })

  it('loads more items when "show more" button is clicked and more items are available', () => {
    render(
      <BrowserRouter>
        <AIList items={MOCK_CHARACTERS} title={title} descr={descr} />
      </BrowserRouter>,
    )

    fireEvent.click(screen.getByText('show more'))

    // Check if additional items are loaded
    MOCK_CHARACTERS.slice(0, 18).forEach((item, index) => {
      expect(screen.getByText(item.name)).toBeInTheDocument()

      expect(screen.getByAltText(item.name)).toBeInTheDocument()

      expect(
        screen.getByText(item.descr || 'Some text here...'),
      ).toBeInTheDocument()
    })
  })
})
