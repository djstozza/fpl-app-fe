import { createMount } from '@material-ui/core/test-utils'
import timezoneMock from 'timezone-mock'

import PlayersTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { PLAYER_SUMMARIES } from 'test/fixtures'
import { initialFilterState } from 'state/team/reducer'
import { PLAYERS_URL } from 'utilities/constants'

describe('PlayersTable', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <PlayersTable
        players={{ data: PLAYER_SUMMARIES }}
        fetchTeamPlayers={blank__}
        updateTeamPlayersSort={blank__}
        tab='players'
        teamId='1'
        {...props}
      />
    </MockedRouter>
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )
  const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)

  it('renders the team fixtures table', () => {
    timezoneMock.register('Australia/Adelaide')

    const wrapper = render()

    expect(link(wrapper, 1, 0).props().to).toEqual(`${PLAYERS_URL}/${PLAYER_SUMMARIES[0].id}`)
    expect(link(wrapper, 1, 0).text()).toEqual(PLAYER_SUMMARIES[0].lastName)

    expect(link(wrapper, 2, 1).props().to).toEqual(`${PLAYERS_URL}/${PLAYER_SUMMARIES[1].id}`)
    expect(link(wrapper, 2, 1).text()).toEqual(PLAYER_SUMMARIES[1].firstName)

    expect(tableCell(wrapper, 3, 2).text()).toEqual(PLAYER_SUMMARIES[2].position.singularNameShort)

    expect(tableCell(wrapper, 4, 3).find('StatusIconMapper').props().status).toEqual('a')
  })

  it('triggers fetchTeamPlayers on render', () => {
    const fetchTeamPlayers = jest.fn()
    render({ fetchTeamPlayers })

    expect(fetchTeamPlayers).toHaveBeenCalledWith({ id: '1', ...initialFilterState })
  })

  it('triggers updateTeamPlayersSort', () => {
    const updateTeamPlayersSort = jest.fn()
    const wrapper = render({ updateTeamPlayersSort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')
    expect(updateTeamPlayersSort).toHaveBeenCalledWith({ tab: 'players', sort: { lastName: 'asc' } })
  })
})
