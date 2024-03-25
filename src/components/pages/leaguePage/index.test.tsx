import { render, screen } from '@testing-library/react'
import * as rrd from 'react-router-dom'

import ConnectedLeaguePage, { LeaguePage, TABS } from '.'
import { MockedRouterStoreWithRoute, MockedRouter, blank__ } from 'test/helpers'
import { LEAGUES } from 'test/fixtures'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(), // Mock the useParams hook
}))

afterEach(() => {
  jest.clearAllMocks();
})

describe('LeaguePage', () => {
  const connectedRender = (props = {}, state = {}) => render(
    <MockedRouterStoreWithRoute
      defaultState={{
        league: { data: LEAGUES[0] },
        ...state
      }}
    >
      <ConnectedLeaguePage />
    </MockedRouterStoreWithRoute>
  )

  const customRender = (props = {}) => render(
    <MockedRouter>
      <LeaguePage
        league={LEAGUES[0]}
        fetchLeague={blank__}
        errors={[]}
        submitting={false}
        fplTeams={[]}
        fetchFplTeams={blank__}
        updateFplTeamsSort={blank__}
        generateDraftPicks={blank__}
        updateLeague={blank__}
        initializeForm={blank__}
        createDraft={blank__}
        sort={{}}
        fetching={false}
        {...props}
      />
    </MockedRouter>
  )

  const tabsArr = Object.values(TABS)

  const tabs = () => screen.getAllByRole('tab')
  const heading = () => screen.getByRole('heading')
  describe('when leagueId is present', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ leagueId: '1' }))

    it('renders the league details by default and sets the document title', () => {
      connectedRender()

      expect(screen.getByTestId('LeaguePage')).toBeInTheDocument()
  
      expect(tabs()).toHaveLength(tabsArr.length)
      expect(tabs()[0]).toHaveAttribute('aria-selected', 'true')
      
      expect(tabs()[0]).toHaveTextContent(tabsArr[0].label)
      expect(tabs()[1]).toHaveTextContent(tabsArr[1].label)

      expect(heading()).toHaveTextContent(`${LEAGUES[0].name}`)
    })


    it('triggers the fetchLeague function on load', () => {
      const fetchLeague = jest.fn()
      customRender({ fetchLeague })

      expect(fetchLeague).toHaveBeenCalledWith(LEAGUES[0].id)
    })

    it('renders nothing if data is not defined', () => {
      connectedRender({}, { league: { data: undefined } })
      
      expect(screen.queryByTestId('LeaguePage')).not.toBeInTheDocument()
    })
  })

  describe('when leagueId is not present', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ leagueId: undefined }))
    it('renders nothing if leagueId is not present', () => {
      connectedRender()
      
      expect(screen.queryByTestId('LeaguePage')).not.toBeInTheDocument()
    })
  })
})
