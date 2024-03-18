import { render, screen, act } from '@testing-library/react'
import WS from 'jest-websocket-mock'
import * as rrd from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import ConnectedDraftPage, { DraftPage, TABS } from '.'
import { initialState as playersInitialState } from 'state/players/reducer'
import { initialState as draftInitialState } from 'state/draftPicks/reducer'

import {
  LIVE_LEAGUE,
  DRAFT_PICKS
} from 'test/fixtures'
import { MockedRouterStoreWithRoute, MockedRouter, blank__ } from 'test/helpers'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(), // Mock the useParams hook
}))

jest.mock('@rails/actioncable', () => ({
  createConsumer: () => ({
    subscriptions: {
      create: (_, handlers) => {
        // Save the received handler so we can call it later
        global.receivedHandler = handlers.received
      }
    }
  })
}))

afterEach(() => {
  jest.clearAllMocks();
})

const errors = [
  {
    detail: 'You cannot draft players at this time',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  },
  {
    detail: 'You cannot pick out of turn',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  },
  {
    detail: 'You have already selected your position in the mini draft',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  }
]

describe('DraftPage', () => {
  const connectedRender = (props = {}, state = {}) => render(
    <MockedRouterStoreWithRoute
      defaultState={{
        league: { data: LIVE_LEAGUE },
        players: playersInitialState,
        draftPicks: draftInitialState,
        ...state
      }}
    >
      <SnackbarProvider maxSnack={3}>
        <ConnectedDraftPage
          {...props}
        />
      </SnackbarProvider>
    </MockedRouterStoreWithRoute>
  )

  const customRender = (props = {}) => render(
    <MockedRouter>
      <SnackbarProvider maxSnack={3}>
        <DraftPage
          league={LIVE_LEAGUE}
          players={playersInitialState}
          draftPicks={draftInitialState}
          fetchLeague={blank__}
          fetchDraftPicksStatus={blank__}
          fetchDraftPickFacets={blank__}
          fetchDraftPicks={blank__}
          updateDraftPick={blank__}
          updateDraftPicksFilter={blank__}
          updateDraftPicksSort={blank__}
          fetchAvailablePlayers={blank__}
          fetchPlayerFacets={blank__}
          updateAvailablePlayersFilter={blank__}
          updateAvailablePlayersSort={blank__}
          updateAvailablePlayersPage={blank__}
          {...props}
        />
      </SnackbarProvider>
    </MockedRouter>
  )

  const tabs = () => screen.getAllByRole('tab')
  const alerts = () => screen.queryAllByRole('alert')
  
  describe('when leagueId is present', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ leagueId: '1' }))
    
    it('renders the draft picks tab by default', () => {
      connectedRender()

      expect(alerts().length).toEqual(0)
  
      expect(tabs()).toHaveLength(2)
      expect(tabs()[1]).toHaveAttribute('aria-selected', 'true')
      
      expect(tabs()[0]).toHaveTextContent(TABS[0].label)
      expect(tabs()[1]).toHaveTextContent(TABS[1].label)
      
      expect(screen.getByRole('heading')).toHaveTextContent(`${LIVE_LEAGUE.name} Draft`)
    })

    it('triggers fetchLeague on render', () => {
      const fetchLeague = jest.fn()
      customRender({ fetchLeague })

      expect(fetchLeague).toHaveBeenCalledWith(LIVE_LEAGUE.id)
    })

    it('triggers fetchDraftPicksStatus on render', () => {
      const fetchDraftPicksStatus = jest.fn()
      customRender({ fetchDraftPicksStatus })

      expect(fetchDraftPicksStatus).toHaveBeenCalledWith(LIVE_LEAGUE.id)
    })

    it('shows errors with the snackbar when present', () => {
      customRender({ draftPicks: { data: DRAFT_PICKS, errors } })

      expect(alerts().length).toEqual(errors.length)
      expect(alerts()[0]).toHaveTextContent(errors[0].detail)
      expect(alerts()[0].className).toContain('notistack-MuiContent-error')
      expect(alerts()[1]).toHaveTextContent(errors[1].detail)
      expect(alerts()[1].className).toContain('notistack-MuiContent-error')
      expect(alerts()[2]).toHaveTextContent(errors[2].detail)
      expect(alerts()[2].className).toContain('notistack-MuiContent-error')
    })

    it('does not render anything if there is no league', () => {
      customRender({ league: undefined })

      expect(screen.queryByTestId('DraftPage')).not.toBeInTheDocument()
    })

    describe('receiving and handles WebSocket messages',  () => {
      const server = new WS("ws://localhost:1234")
      new WebSocket("ws://localhost:1234")

      const message = 'This is a test message'

      beforeEach(async () => { await server.connected })

      afterEach(() => server.close())

      it('renders the message when updatedAt > previous updatedAt', async () => {
        customRender()
    
        act(() => global.receivedHandler({ updatedAt: 1, message }))

        expect(alerts().length).toEqual(1)
        expect(alerts()[0]).toHaveTextContent(message)
        expect(alerts()[0].className).toContain('notistack-MuiContent-success')
      })

      it('does not render the message if updatedAt < previous updatedAt', async () => {
        customRender()

        act(() => global.receivedHandler({ updatedAt: -1, message }))

        expect(alerts().length).toEqual(0)
      })
    })
  })

  describe('when there is no leagueId', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ playerId: '1' }))
    
    it('does not render anything', () => {
      customRender()

      expect(screen.queryByTestId('DraftPage')).not.toBeInTheDocument()
    })
  })
})


