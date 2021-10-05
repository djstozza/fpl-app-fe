import { createMount } from '@material-ui/core/test-utils'

import ConnectedPlayerPage, { PlayerPage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import { TITLE } from 'utilities/constants'
import { PLAYER_SUMMARIES } from 'test/fixtures'

const player = {
  ...PLAYER_SUMMARIES[0],
  code: '1234',
  photo: '1234.jpg',
  hasHistory: true,
  hasHistoryPast: true
}

describe('PlayerPage', () => {
  const connectedRender = (props = {}, state = {}) => createMount()(
    <MockedRouterStore
      defaultState={{
        player: { data: player },
        ...state
      }}
    >
      <ConnectedPlayerPage
        fetchPlayer={blank__}
        fetchPlayerHistory={blank__}
        fetchPlayerHistoryPast={blank__}
        updatePlayerHistorySort={blank__}
        updatePlayerHistoryPastSort={blank__}
        match={{ params: { playerId: PLAYER_SUMMARIES[0].id } }}
        {...props}
      />
    </MockedRouterStore>
  )

  const render = (props = {}) => createMount()(
    <MockedRouter>
      <PlayerPage
        player={{ data: player }}
        fetchPlayer={blank__}
        fetchPlayerHistory={blank__}
        fetchPlayerHistoryPast={blank__}
        updatePlayerHistorySort={blank__}
        updatePlayerHistoryPastSort={blank__}
        match={{ params: { playerId: PLAYER_SUMMARIES[0].id } }}
        {...props}
      />
    </MockedRouter>
  )

  const tabs = wrapper => wrapper.find('Tabs').find('WithStyles(ForwardRef(Tab))')

  it('renders the player details by default and sets the document title', () => {
    const wrapper = connectedRender()

    expect(tabs(wrapper)).toHaveLength(3)
    expect(tabs(wrapper).at(0).props().selected).toEqual(true)
    expect(wrapper.find('h4').text()).toEqual(`${player.firstName} ${player.lastName}(${player.team.shortName})`)
    expect(document.title)
      .toEqual(`${TITLE} - ${player.firstName} ${player.lastName} - Details`)
  })

  it('only renders active tabs', () => {
    const wrapper = connectedRender({}, { player: { data: { ...player, hasHistory: false, hasHistoryPast: false } } })

    expect(tabs(wrapper)).toHaveLength(1)
  })

  it('triggers the fetchPlayer function on load', () => {
    const fetchPlayer = jest.fn()
    const wrapper = render({ fetchPlayer })

    expect(fetchPlayer).toHaveBeenCalledWith(PLAYER_SUMMARIES[0].id)
  })

  it('renders nothing if data is not defined', () => {
    const wrapper = connectedRender({}, { player: { data: undefined } })
    expect(wrapper.html()).toEqual('')
  })
})
