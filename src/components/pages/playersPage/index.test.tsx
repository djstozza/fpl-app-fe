import { createMount } from '@material-ui/core/test-utils'

import ConnectedPlayersPage, { PlayersPage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import { TITLE, PLAYERS_URL, TEAMS_URL } from 'utilities/constants'
import { PLAYER_SUMMARIES, PLAYER_FACETS } from 'test/fixtures'
import { initialFilterState } from 'state/players/reducer'

const players = { data: PLAYER_SUMMARIES, meta: { total: PLAYER_SUMMARIES.length }, facets: PLAYER_FACETS }

describe('PlayersPage', () => {
  const connectedRender = (props = {}, state = {}) => createMount()(
    <MockedRouterStore
      defaultState={{
        players,
        ...state
      }}
    >
      <ConnectedPlayersPage
        fetchPlayers={blank__}
        fetchFacets={blank__}
        updateSort={blank__}
        handleFilterChange={blank__}
        handleChangePage={blank__}
        {...props}
      />
    </MockedRouterStore>
  )

  const render = (props = {}) => createMount()(
    <MockedRouter>
      <PlayersPage
        players={players}
        fetchPlayers={blank__}
        fetchFacets={blank__}
        updateSort={blank__}
        handleFilterChange={blank__}
        handleChangePage={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )
  const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)
  const filterButton = wrapper => wrapper.find('HeaderCell').find('button')
  const menuItem = wrapper => wrapper.find('WithStyles(ForwardRef(MenuItem))')
  const pagination = wrapper => wrapper.find('WithStyles(ForwardRef(TablePagination))')

  it('renders the players  table and sets the document title', () => {
    const wrapper = connectedRender()

    expect(wrapper.find('WithStyles(ForwardRef(TableRow))')).toHaveLength(PLAYER_SUMMARIES.length + 1)
    expect(link(wrapper, 2, 0).props().to).toEqual(`${PLAYERS_URL}/${PLAYER_SUMMARIES[1].id}`)
    expect(link(wrapper, 2, 0).text()).toEqual(PLAYER_SUMMARIES[1].lastName)

    expect(link(wrapper, 1, 1).props().to).toEqual(`${PLAYERS_URL}/${PLAYER_SUMMARIES[0].id}`)
    expect(link(wrapper, 1, 1).text()).toEqual(PLAYER_SUMMARIES[0].firstName)

    expect(link(wrapper, 3, 2).props().to).toEqual(`${TEAMS_URL}/${PLAYER_SUMMARIES[2].team.id}/`)
    expect(link(wrapper, 3, 2).text()).toEqual(PLAYER_SUMMARIES[2].team.shortName)
    expect(link(wrapper, 3, 2).find('img').props().alt).toEqual(PLAYER_SUMMARIES[2].team.shortName)

    expect(document.title).toEqual(`${TITLE} - Players`)
  })

  it('triggers the fetchPlayers and fetchFacets function on load', () => {
    const fetchPlayers = jest.fn()
    const fetchFacets = jest.fn()
    const wrapper = render({ fetchPlayers, fetchFacets })

    expect(fetchPlayers).toHaveBeenCalledWith(initialFilterState)
    expect(fetchFacets).toHaveBeenCalled()
  })

  it('triggers updateSort', () => {
    const updateSort = jest.fn()
    const wrapper = render({ updateSort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')
    expect(updateSort).toHaveBeenCalledWith({ lastName: 'asc' })
  })

  it('triggers updateSort', () => {
    const updateFilter = jest.fn()
    const wrapper = render({ updateFilter})

    wrapper.find('HeaderCell').at(2).find('button').simulate('click')

    menuItem(wrapper).at(0).simulate('click')
    menuItem(wrapper).at(3).simulate('click')
    wrapper.find('li').find('button').at(1).simulate('click')

    expect(updateFilter).toHaveBeenCalledWith({ teamId: [PLAYER_FACETS.teams[0].value, PLAYER_FACETS.teams[3].value] })
  })

  it('triggers updatePage', () => {
    const updatePage = jest.fn()
    const { page: { offset, limit } } = initialFilterState
    const playersArr = Array(limit + 1).fill(PLAYER_SUMMARIES[0])

    const wrapper = render({ players: { data: playersArr, meta: { total: playersArr.length } }, updatePage })

    expect(pagination(wrapper).text()).toEqual(`1-${limit} of ${playersArr.length}`)
    pagination(wrapper).find('button').at(1).simulate('click')
    expect(updatePage).toHaveBeenCalledWith(offset + limit)
  })
})
