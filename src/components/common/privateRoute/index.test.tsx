import { createMount } from '@material-ui/core/test-utils'

import ConnectedPrivateRoute, { PrivateRoute } from '.'
import { MockedRouterStore, blank__ } from 'test/helpers'
import { LOGIN_URL } from 'utilities/constants'
import { USER_1 } from 'test/fixtures'

describe('PrivateRoute', () => {
  const render = (props = {}, state = {}) => createMount()(
    <MockedRouterStore defaultState={{ auth: { user: null }, ...state }}>
      <PrivateRoute
        updateSession={blank__}
        {...props}
      >
        <div>
          Child component
        </div>
      </PrivateRoute>
    </MockedRouterStore>
  )

  const connectedRender = (state = {}) =>  createMount()(
    <MockedRouterStore defaultState={{ auth: { user: null }, ...state }}>
      <ConnectedPrivateRoute>
        <div>
          Child component
        </div>
      </ConnectedPrivateRoute>
    </MockedRouterStore>
  )

  it('redirects to the loginPage if there is no user', () => {
    expect(window.location.pathname).toEqual('/')

    const wrapper = render()

    expect(wrapper.find('Redirect').props().to).toEqual(LOGIN_URL)
    expect(window.location.pathname).toEqual(LOGIN_URL)
  })

  it('renders the component if the user is present', () => {
    const updateSession = jest.fn()
    const wrapper = render({ user: USER_1, updateSession }, { auth: { user: USER_1 } })

    expect(wrapper.text()).toEqual('Child component')
    expect(updateSession).toHaveBeenCalled()
  })

  it('renders the connected component', () => {
    const wrapper = connectedRender({ auth: { user: USER_1 } })

    expect(wrapper.text()).toEqual('Child component')
  })
})
