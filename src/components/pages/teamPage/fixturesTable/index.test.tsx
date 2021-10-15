import { createMount } from '@material-ui/core/test-utils'
import timezoneMock from 'timezone-mock'

import FixturesTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { TEAM_FIXTURES } from 'test/fixtures'
import { initialFilterState } from 'state/team/reducer'
import { ROUNDS_URL, TEAMS_URL } from 'utilities/constants'

describe('FixturesTable', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <FixturesTable
        fixtures={TEAM_FIXTURES}
        fetchTeamFixtures={blank__}
        updateTeamFixturesSort={blank__}
        tab='fixtures'
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

    expect(link(wrapper, 1, 0).props().to).toEqual(`${ROUNDS_URL}/${TEAM_FIXTURES[0].round.id}`)
    expect(link(wrapper, 1, 0).text()).toEqual(TEAM_FIXTURES[0].round.name)

    expect(link(wrapper, 2, 1).props().to).toEqual(`${TEAMS_URL}/${TEAM_FIXTURES[1].opponent.id}/fixtures`)
    expect(link(wrapper, 2, 1).text()).toEqual(TEAM_FIXTURES[1].opponent.shortName)
    expect(link(wrapper, 2, 1).find('img').props().alt).toEqual(TEAM_FIXTURES[1].opponent.shortName)

    expect(tableCell(wrapper, 3, 3).text()).toEqual('16/08/21 01:00')

    expect(tableCell(wrapper, 1, 5).text())
      .toEqual(`${TEAM_FIXTURES[0].homeTeamScore} - ${TEAM_FIXTURES[0].awayTeamScore}`)
    expect(tableCell(wrapper, 3, 5).text()).toEqual('') // Upcoming fixtures do not show scores
  })

  it('triggers fetchTeamFixtures on render', () => {
    const fetchTeamFixtures = jest.fn()
    render({ fetchTeamFixtures })

    expect(fetchTeamFixtures).toHaveBeenCalledWith({ id: '1', ...initialFilterState })
  })

  it('triggers fetchTeamFixtures', () => {
    const updateTeamFixturesSort = jest.fn()
    const wrapper = render({ updateTeamFixturesSort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')
    expect(updateTeamFixturesSort).toHaveBeenCalledWith({ tab: 'fixtures', sort: { 'rounds.deadlineTime': 'asc' } })
  })
})
