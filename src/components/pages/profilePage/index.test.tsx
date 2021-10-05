import { createMount } from '@material-ui/core/test-utils'

import ConnectedProfilePage, { ProfilePage } from '.'
import { MockedRouterStore, blank__ } from 'test/helpers'
import { TITLE } from 'utilities/constants'
import { USER_1 } from 'test/fixtures'

describe('ProfilePage', () => {
  const connectedRender = (props = {}, state = {}) => createMount()(
    <MockedRouterStore
      defaultState={{
        auth: { user: USER_1 },
        fplTeams: { data: [] },
        ...state
      }}
    >
      <ConnectedProfilePage
        match={{ params: { tab: 'details' } }}
        {...props}
      />
    </MockedRouterStore>
  )

  const tabs = wrapper => wrapper.find('Tabs').find('WithStyles(ForwardRef(Tab))')

  it('renders the league details by default and sets the document title', () => {
    const wrapper = connectedRender()

    expect(tabs(wrapper)).toHaveLength(3)
    expect(tabs(wrapper).at(0).props().selected).toEqual(true)
    expect(tabs(wrapper).at(0).text()).toEqual('Details')
    expect(wrapper.find('h4').text()).toEqual(`${USER_1.username}`)
  })

  it('renders the details tab by default', () => {
    const wrapper = connectedRender({ match: { params: { tab: undefined } } })

    expect(tabs(wrapper).at(0).props().selected).toEqual(true)
    expect(tabs(wrapper).at(0).text()).toEqual('Details')
  })
})
