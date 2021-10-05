import { createMount } from '@material-ui/core/test-utils'

import ConnectedLeaguesPage, { LeaguesPage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import {
  TITLE,
  PROFILE_URL,
  LEAGUES_URL,
  NEW_LEAGUE_URL,
  JOIN_LEAGUE_URL
} from 'utilities/constants'
import { LEAGUES } from 'test/fixtures'
import { initialFilterState } from 'state/leagues/reducer'

describe('LeaguesPage', () => {
  const connectedRender = (props = {}, state = {}) => createMount()(
    <MockedRouterStore
      defaultState={{
        leagues: { data: LEAGUES },
        ...state
      }}
    >
      <ConnectedLeaguesPage
        fetchLeagues={blank__}
        updateSort={blank__}
        {...props}
      />
    </MockedRouterStore>
  )

  const render = (props = {}) => createMount()(
    <MockedRouter>
      <LeaguesPage
        leagues={LEAGUES}
        fetchLeagues={blank__}
        updateSort={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )
  const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)
  const buttonLink = wrapper => wrapper.find('ButtonLink')

  it('renders button links', () => {
    const wrapper = render({ leagues: undefined })

    expect(buttonLink(wrapper).at(0).props().to).toEqual(`${PROFILE_URL}${NEW_LEAGUE_URL}`)
    expect(buttonLink(wrapper).at(0).text()).toEqual('New League')
    expect(buttonLink(wrapper).at(1).props().to).toEqual(`${PROFILE_URL}${JOIN_LEAGUE_URL}`)
    expect(buttonLink(wrapper).at(1).text()).toEqual('Join a League')
  })

  it('renders the league table', () => {
    const wrapper = connectedRender()

    expect(wrapper.find('WithStyles(ForwardRef(TableRow))')).toHaveLength(LEAGUES.length + 1)

    expect(tableCell(wrapper, 1, 2).text()).toEqual(LEAGUES[0].owner.username)

    expect(link(wrapper, 2, 0).props().to).toEqual(`${LEAGUES_URL}/${LEAGUES[1].id}`)
    expect(link(wrapper, 2, 0).text()).toEqual(LEAGUES[1].name)

    expect(buttonLink(wrapper).at(0).props().to).toEqual(`${PROFILE_URL}${NEW_LEAGUE_URL}`)
    expect(buttonLink(wrapper).at(0).text()).toEqual('New League')
    expect(buttonLink(wrapper).at(1).props().to).toEqual(`${PROFILE_URL}${JOIN_LEAGUE_URL}`)
    expect(buttonLink(wrapper).at(1).text()).toEqual('Join a League')
  })


  it('triggers the fetchLeagues function on load', () => {
    const fetchLeagues = jest.fn()
    const wrapper = render({ fetchLeagues })

    expect(fetchLeagues).toHaveBeenCalledWith(initialFilterState)
  })

  it('triggers updateSort', () => {
    const updateSort = jest.fn()
    const wrapper = render({ updateSort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')
    expect(updateSort).toHaveBeenCalledWith({ name: 'desc' })
  })
})
