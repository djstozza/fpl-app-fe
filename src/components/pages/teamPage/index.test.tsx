import { within, render, screen } from '@testing-library/react'
import * as rrd from 'react-router-dom'

import ConnectedTeamPage, { TeamPage, TABS } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import { TITLE } from 'utilities/constants'
import { TEAMS, MANCHESTER_UNITED, ARSENAL, PLAYER_SUMMARIES } from 'test/fixtures'
import { initialState as initialTeamState } from 'state/team/reducer'
import { initialState as initialPlayersState } from 'state/players/reducer'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(), // Mock the useParams hook
}))

afterEach(() => {
  jest.clearAllMocks()
})


describe('TeamPage', () => {
  const connectedRender = (state = {}) => render(
    <MockedRouterStore
      defaultState={{
        team: { data: MANCHESTER_UNITED, fixtures: [] },
        teams: { data: TEAMS },
        players: { data: [] },
        ...state
      }}
    >
      <ConnectedTeamPage />
    </MockedRouterStore>
  )

  const customRender = (props = {}) => render(
    <MockedRouter>
      <TeamPage
        team={{ ...initialTeamState, data: MANCHESTER_UNITED }}
        players={initialPlayersState}
        teams={TEAMS}
        fetchTeam={blank__}
        fetchTeams={blank__}
        updateTeamPlayersSort={blank__}
        updateTeamFixturesSort={blank__}
        fetchTeamPlayers={blank__}
        fetchTeamFixtures={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const tabList = (i) => screen.getAllByRole('tablist')[i]
  const tabListTabs = (i) => within(tabList(i)).getAllByRole('tab')

  describe('when teamId is present', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ teamId: MANCHESTER_UNITED.id }))

    it('renders the tab panel, team details and sets the document title', () => {
      connectedRender()

      expect(tabListTabs(0)).toHaveLength(TEAMS.length)
      expect(tabListTabs(0)[3]).toHaveAttribute('aria-selected', 'true')
      expect(tabListTabs(0)[3]).toHaveTextContent(MANCHESTER_UNITED.shortName)

      expect(tabListTabs(1)).toHaveLength(3)
      expect(tabListTabs(1)[0]).toHaveAttribute('aria-selected', 'true')
      expect(tabListTabs(1)[0]).toHaveTextContent(TABS[0].label)
      expect(tabListTabs(1)[1]).toHaveTextContent(TABS[1].label)
      expect(tabListTabs(1)[2]).toHaveTextContent(TABS[2].label)
      expect(document.title).toEqual(`${TITLE} - ${MANCHESTER_UNITED.name} - Details`)
    })

     it('triggers the fetchTeams function on load', () => {
      const fetchTeams = jest.fn()
      customRender({ fetchTeams })

      expect(fetchTeams).toHaveBeenCalledWith({ sort: { shortName: 'asc' } })
    })

    it('calls fetchTeam with the teamId', () => {
      const fetchTeam = jest.fn()
      customRender({ fetchTeam })

      expect(fetchTeam).toHaveBeenCalledWith(
        MANCHESTER_UNITED.id,
        'details',
        {
          'fixtures': { 'kickoffTime': 'asc' },
          'players': { 'totalPoints': 'desc' }
        }
      )
    })

    it('renders nothing if data is not defined', () => {
      const { container } = connectedRender({ team: { data: undefined, fixtures: [] }, players: { data: PLAYER_SUMMARIES } })
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('when teamId is undefined', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ teamId: undefined }))

    it('renders nothing', () => {
      const { container } = connectedRender()

      expect(container).toBeEmptyDOMElement()
    })
  })
})
