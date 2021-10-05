import { createMount } from '@material-ui/core/test-utils'
import timezoneMock from 'timezone-mock'

import FplTeamsTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { FPL_TEAMS } from 'test/fixtures'
import { initialFilterState } from 'state/fplTeams/reducer'
import {
  FPL_TEAMS_URL,
  LEAGUES_URL
} from 'utilities/constants'

describe('FplTeamsTable', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <FplTeamsTable
        fplTeams={{ data: FPL_TEAMS }}
        fetchFplTeams={blank__}
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

    expect(link(wrapper, 2, 1).props().to).toEqual(`${LEAGUES_URL}/${FPL_TEAMS[1].league.id}`)
    expect(link(wrapper, 2, 1).text()).toEqual(FPL_TEAMS[1].league.name)

    expect(tableCell(wrapper, 3, 2).text()).toEqual(String(FPL_TEAMS[2].rank))
  })

  it('triggers fetchTeamFplTeams on render', () => {
    const fetchFplTeams = jest.fn()
    const wrapper = render({ fetchFplTeams })
    expect(fetchFplTeams).toHaveBeenCalled()
    expect(fetchFplTeams).toHaveBeenCalledWith(initialFilterState)
  })

  it('triggers updateFplTeamsSort', () => {
    const updateFplTeamsSort = jest.fn()
    const wrapper = render({ updateFplTeamsSort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')
    expect(updateFplTeamsSort).toHaveBeenCalledWith({ sort: { name: 'desc' } })
  })
})
