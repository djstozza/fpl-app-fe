import { createMount } from '@material-ui/core/test-utils'

import ConnectedTeamsPage, { TeamsPage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import { TITLE, TEAMS_URL } from 'utilities/constants'
import { TEAMS } from 'test/fixtures'
import { initialFilterState } from 'state/teams/reducer'

describe('TeamsPage', () => {
  const connectedRender = (props = {}, state = {}) => createMount()(
    <MockedRouterStore
      defaultState={{
        teams: { data: TEAMS },
        ...state
      }}
    >
      <ConnectedTeamsPage
        fetchTeams={blank__}
        updateSort={blank__}
        {...props}
      />
    </MockedRouterStore>
  )

  const render = (props = {}) => createMount()(
    <MockedRouter>
      <TeamsPage
        teams={{ data: TEAMS }}
        fetchTeams={blank__}
        updateSort={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )
  const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)

  it('renders the teams  table and sets the document title', () => {
    const wrapper = connectedRender()

    expect(wrapper.find('WithStyles(ForwardRef(TableRow))')).toHaveLength(TEAMS.length + 1)
    expect(link(wrapper, 2, 0).props().to).toEqual(`${TEAMS_URL}/${TEAMS[1].id}/`)
    expect(link(wrapper, 2, 0).text()).toEqual(TEAMS[1].shortName)
    expect(link(wrapper, 2, 0).find('img').props().alt).toEqual(TEAMS[1].shortName)

    expect(tableCell(wrapper, 4, 11).text()).toEqual(TEAMS[3].currentForm.join(''))

    expect(document.title).toEqual(`${TITLE} - Teams`)
  })

  it('triggers the fetchTeams function on load', () => {
    const fetchTeams = jest.fn()
    render({ fetchTeams })

    expect(fetchTeams).toHaveBeenCalledWith(initialFilterState)
  })

  it('triggers updateSort', () => {
    const updateSort = jest.fn()
    const wrapper = render({ updateSort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')
    expect(updateSort).toHaveBeenCalledWith({ shortName: 'asc' })
  })
})
