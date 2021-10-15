import { createMount } from '@material-ui/core/test-utils'

import FplTeamsTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { LIVE_LEAGUE, INITIALIZED_LEAGUE, FPL_TEAMS } from 'test/fixtures'
import { initialFilterState } from 'state/league/reducer'
import { FPL_TEAMS_URL } from 'utilities/constants'

describe('FplTeamsTable', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <FplTeamsTable
        leagueId={LIVE_LEAGUE.id}
        league={LIVE_LEAGUE}
        fplTeams={FPL_TEAMS}
        fetchFplTeams={blank__}
        generateDraftPicks={blank__}
        createDraft={blank__}
        submitting={false}
        updateFplTeamsSort={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const sortTable = wrapper => wrapper.find('SortTable')
  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )
  const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)
  const cellNames = wrapper => sortTable(wrapper).props().cells.map(({ cellId }) => cellId)

  it('renders the fpl teams table', () => {
    const wrapper = render()

    expect(link(wrapper, 1, 0).props().to).toEqual(`${FPL_TEAMS_URL}/${FPL_TEAMS[0].id}`)
    expect(link(wrapper, 1, 0).text()).toEqual(FPL_TEAMS[0].name)

    expect(tableCell(wrapper, 2, 1).text()).toEqual(String(FPL_TEAMS[1].rank))

    expect(tableCell(wrapper, 3, 2).text()).toEqual(String(FPL_TEAMS[2].totalScore))
  })

  it('does not show the draftPickNumber column if showDraftPickColumn = false', () => {
    let wrapper = render()
    expect(cellNames(wrapper).includes('draftPickNumber')).toEqual(true)

    wrapper = render({ leagueId: INITIALIZED_LEAGUE.id, league: INITIALIZED_LEAGUE })
    expect(cellNames(wrapper).includes('draftPickNumber')).toEqual(false)
  })

  it('does not show the live columns if showLiveColumns = false', () => {
    const liveColumns = ['miniDraftPickNumber', 'rank', 'totalScore']
    let wrapper = render({ fplTeams: undefined })

    expect(liveColumns.every(column => cellNames(wrapper).includes(column))).toEqual(true)

    wrapper = render({ leagueId: INITIALIZED_LEAGUE.id, league: INITIALIZED_LEAGUE, fplTeams: undefined })
    expect(liveColumns.filter(column => cellNames(wrapper).includes(column))).toEqual([])
  })

  it('triggers fetchFplTeams on render', () => {
    const fetchFplTeams = jest.fn()
    render({ fetchFplTeams })

    expect(fetchFplTeams).toHaveBeenCalledWith({ id: LIVE_LEAGUE.id, ...initialFilterState })
  })

  it('triggers updateFplTeamsSort', () => {
    const updateFplTeamsSort = jest.fn()
    const wrapper = render({ updateFplTeamsSort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')
    expect(updateFplTeamsSort).toHaveBeenCalledWith({ sort: { name: 'desc' } })
  })
})
