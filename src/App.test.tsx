import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MockedRouterStore } from 'test/helpers'
import { createMount } from '@material-ui/core/test-utils'

test('renders learn react link', () => {
  render(
    <MockedRouterStore>
      <App />
    </MockedRouterStore>
  )
  const linkElement = screen.getByText(/Fpl App/i)
  expect(linkElement).toBeInTheDocument()
})
