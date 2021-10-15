import { createMount } from '@material-ui/core/test-utils'

import ConnectedTeamPage, { TeamPage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import { TITLE } from 'utilities/constants'
import { TEAMS, MANCHESTER_UNITED, ARSENAL, PLAYERS } from 'test/fixtures'

describe('TeamPage', () => {
  const connectedRender = (props = {}, state = {}) => createMount()(
    <MockedRouterStore
      defaultState={{
        team: { data: MANCHESTER_UNITED, fixtures: [] },
        teams: { data: TEAMS },
        players: { data: [] },
        ...state
      }}
    >
      <ConnectedTeamPage
        fetchTeam={blank__}
        fetchTeams={blank__}
        updateTeamPlayersSort={blank__}
        updateTeamFixturesSort={blank__}
        match={{ params: { teamId: MANCHESTER_UNITED.id }}}
        {...props}
      />
    </MockedRouterStore>
  )

  const render = (props = {}) => createMount()(
    <MockedRouter>
      <TeamPage
        team={{ data: MANCHESTER_UNITED, fixtures: [] }}
        teams={TEAMS}
        fetchTeam={blank__}
        fetchTeams={blank__}
        updateTeamPlayersSort={blank__}
        updateTeamFixturesSort={blank__}
        match={{ params: { teamId: MANCHESTER_UNITED.id } }}
        {...props}
      />
    </MockedRouter>
  )

  const tabPanelTabs = wrapper => wrapper.find('TabPanel').find('WithStyles(ForwardRef(Tab))')
  const teamTabs = wrapper => wrapper.find('Tabs').find('WithStyles(ForwardRef(Tab))')

  it('renders the tab panel, team details and sets the document title', () => {
    const wrapper = connectedRender()
    wrapper.update()

    expect(wrapper.find('TabPanel').text()).toEqual('ARSLEEMCIMUNTOT')

    expect(tabPanelTabs(wrapper)).toHaveLength(TEAMS.length)
    expect(tabPanelTabs(wrapper).at(3).props().selected).toEqual(true)
    expect(tabPanelTabs(wrapper).at(3).text()).toEqual(MANCHESTER_UNITED.shortName)

    expect(teamTabs(wrapper)).toHaveLength(3)
    expect(teamTabs(wrapper).at(0).props().selected).toEqual(true)
    expect(document.title).toEqual(`${TITLE} - ${MANCHESTER_UNITED.name} - Details`)
  })

  it('triggers the fetchTeams function on load', () => {
    const fetchTeams = jest.fn()
    render({ fetchTeams })

    expect(fetchTeams).toHaveBeenCalledWith({ sort: { shortName: 'asc' } })
  })

  it('calls fetchTeam with the teamId', () => {
    const fetchTeam = jest.fn()
    const teamId =  ARSENAL.id
    const wrapper = render({ fetchTeam, match: { params: { teamId } } })

    expect(fetchTeam).toHaveBeenCalledWith(teamId, 'details', undefined)
    expect(tabPanelTabs(wrapper).at(0).props().selected).toEqual(true)
    expect(tabPanelTabs(wrapper).at(0).text()).toEqual(ARSENAL.shortName)
  })

  it('renders nothing if data is not defined', () => {
    const wrapper = connectedRender({}, { team: { data: undefined, fixtures: [] }, players: { data: PLAYERS } })
    expect(wrapper.html()).toEqual('')
  })
})
