import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useURL } from './useURL'

// Mock
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useLocation: jest.fn(),
}))

describe('useURL hook', () => {
  it('returns correct URL object', () => {
    const mockParams = { id: '123&example' }
    const mockLocation = {
      pathname: '/example/path',
      hash: '#testhash',
    }

    // set up mock return values for useParams and useLocation
    jest
      .spyOn(require('react-router-dom'), 'useParams')
      .mockReturnValue(mockParams)
    jest
      .spyOn(require('react-router-dom'), 'useLocation')
      .mockReturnValue(mockLocation)

    // render a component using the useURL hook
    const TestComponent = () => {
      const url = useURL()
      return (
        <div>
          <span data-testid="id">{url.id}</span>
          <span data-testid="name">{url.name}</span>
          <span data-testid="hash">{url.hash}</span>
          <span data-testid="pathname">{url.pathname}</span>
        </div>
      )
    }

    render(
      <BrowserRouter>
        <TestComponent />
      </BrowserRouter>,
    )

    // assert: the rendered component displays the correct values
    expect(screen.getByTestId('id')).toHaveTextContent('123')
    expect(screen.getByTestId('name')).toHaveTextContent('example')
    expect(screen.getByTestId('hash')).toHaveTextContent('testhash')
    expect(screen.getByTestId('pathname')).toHaveTextContent('/example/path')
  })
})
