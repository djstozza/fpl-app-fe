import { render, screen } from '@testing-library/react'

import ConnectedPrivateRoute, { PrivateRoute } from '.'
import { MockedRouterStore, blank__ } from 'test/helpers'
import { LOGIN_URL } from 'utilities/constants'
import { USER_1 } from 'test/fixtures'

describe('PrivateRoute', () => {
  const text = 'Child component'
  
  const customRender = (props = {}, state = {}) => render(
    <MockedRouterStore defaultState={{ auth: { user: null }, ...state }}>
      <PrivateRoute
        updateSession={blank__}
        {...props}
      >
        <div>
          {text}
        </div>
      </PrivateRoute>
    </MockedRouterStore>
  )

  const connectedRender = (state = {}) =>  render(
    <MockedRouterStore defaultState={{ auth: { user: null }, ...state }}>
      <ConnectedPrivateRoute>
        <div>
          {text}
        </div>
      </ConnectedPrivateRoute>
    </MockedRouterStore>
  )

  const child = () => screen.queryByText(text)

  it('redirects to the loginPage if there is no user', () => {
    expect(window.location.pathname).toEqual('/')

    customRender()
    expect(child()).not.toBeInTheDocument()
    expect(window.location.pathname).toEqual(LOGIN_URL)
  })

  it('renders the component if the user is present', () => {
    const updateSession = jest.fn()
    customRender({ user: USER_1, updateSession }, { auth: { user: USER_1 } })

    expect(child()).toBeInTheDocument()
    expect(updateSession).toHaveBeenCalled()
  })

  it('renders the connected component', () => {
    connectedRender({ auth: { user: USER_1 } })

    expect(child()).toBeInTheDocument()
  })
})
