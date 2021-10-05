import { createMount } from '@material-ui/core/test-utils'

import ConnectedLeaguePage, { LeaguePage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import { TITLE } from 'utilities/constants'
import { LEAGUES } from 'test/fixtures'

describe('LeaguePage', () => {
  const connectedRender = (props = {}, state = {}) => createMount()(
    <MockedRouterStore
      defaultState={{
        league: { data: LEAGUES[0] },
        ...state
      }}
    >
      <ConnectedLeaguePage
        fetchLeague={blank__}
        match={{ params: { leagueId: LEAGUES[0].id } }}
        {...props}
      />
    </MockedRouterStore>
  )

  const render = (props = {}) => createMount()(
    <MockedRouter>
      <LeaguePage
        league={{ data: LEAGUES[0] }}
        fetchLeague={blank__}
        match={{ params: { leagueId: LEAGUES[0].id  } }}
        {...props}
      />
    </MockedRouter>
  )

  const tabs = wrapper => wrapper.find('Tabs').find('WithStyles(ForwardRef(Tab))')

  it('renders the league details by default and sets the document title', () => {
    const wrapper = connectedRender()

    expect(tabs(wrapper)).toHaveLength(2)
    expect(tabs(wrapper).at(0).props().selected).toEqual(true)
    expect(tabs(wrapper).at(0).text()).toEqual('Details')
    expect(wrapper.find('h4').text()).toEqual(`${LEAGUES[0].name}`)
  })

  it('triggers the fetchLeague function on load', () => {
    const fetchLeague = jest.fn()
    const wrapper = render({ fetchLeague })

    expect(fetchLeague).toHaveBeenCalledWith(LEAGUES[0].id)
  })

  it('renders nothing if data is not defined', () => {
    const wrapper = connectedRender({}, { league: { data: undefined } })
    expect(wrapper.html()).toEqual('')
  })
})
