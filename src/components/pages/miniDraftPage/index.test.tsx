import { within, render, screen, act } from '@testing-library/react'
import WS from 'jest-websocket-mock'
import * as rrd from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import moment from 'moment'

import ConnectedMiniDraftPage, { MiniDraftPage, TABS } from '.'

import {
  LIVE_LEAGUE,
  PLAYER_SUMMARIES,
  MINI_DRAFT_PICKS,
  FPL_TEAM_LIST_1,
  ROUND_1
} from 'test/fixtures'
import { MockedRouterStoreWithRoute, MockedRouter, blank__ } from 'test/helpers'
import { initialState as playersInitialState } from 'state/players/reducer'
import { initialState as miniDraftPicksInitialState } from 'state/miniDraftPicks/reducer'
import { initialState as fplTeamListInitialState } from 'state/fplTeamList/reducer'

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
    detail: 'Player has already been taken',
    code: 'is invalid',
    source: 'base',
    title: 'is invalid'
  }
]

const fplTeamListId = '1'

describe('MiniDraftPage', () => {
  const connectedRender = (state = {}) => render(
    <MockedRouterStoreWithRoute
      defaultState={{
        league: { data: LIVE_LEAGUE },
        players: { data: PLAYER_SUMMARIES },
        miniDraftPicks: { data: MINI_DRAFT_PICKS, errors: [], fplTeamListId },
        fplTeamList: { ...FPL_TEAM_LIST_1, outListPosition: undefined },
        ...state
      }}
    >
      <SnackbarProvider maxSnack={3}>
        <ConnectedMiniDraftPage />
      </SnackbarProvider>
    </MockedRouterStoreWithRoute>
  )

  const customRender = (props = {}) => render(
    <MockedRouter>
      <SnackbarProvider maxSnack={3}>
        <MiniDraftPage
          league={LIVE_LEAGUE}
          players={{ ...playersInitialState, data: PLAYER_SUMMARIES }}
          miniDraftPicks={{ ...miniDraftPicksInitialState, fplTeamListId }}
          fplTeamList={fplTeamListInitialState}
          fetchLeague={blank__}
          fetchMiniDraftPicksStatus={blank__}
          fetchListPositions={blank__}
          fetchMiniDraftPicks={blank__}
          createMiniDraftPick={blank__}
          updateMiniDraftPicksFilter={blank__}
          updateMiniDraftPicksSort={blank__}
          fetchMiniDraftPickFacets={blank__}
          fetchPlayerFacets={blank__}
          fetchTradeablePlayers={blank__}
          updateTradeablePlayersSort={blank__}
          updateTradeablePlayersFilter={blank__}
          updateTradeablePlayersPage={blank__}
          passMiniDraftPick={blank__}
          setOutListPosition={blank__}
          {...props}
        />
      </SnackbarProvider>
    </MockedRouter>
  )

  const tabs = () => screen.getAllByRole('tab')
  const snackBarContainer = () => document.querySelector('.notistack-SnackbarContainer') as HTMLElement
  const alerts = () => within(snackBarContainer()).queryAllByRole('alert')
  const draftCompletedAlert = () => screen.queryByText('The mini draft has successfully been completed')

  describe('when leagueId is present', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ leagueId: '1' }))

    it('renders the draft picks tab by default', () => {
      connectedRender()

      expect(tabs()).toHaveLength(2)
      expect(tabs()[1]).toHaveAttribute('aria-selected', 'true')
      
      expect(tabs()[0]).toHaveTextContent(TABS[0].label)
      expect(tabs()[1]).toHaveTextContent(TABS[1].label)
      
      expect(screen.getByRole('heading')).toHaveTextContent(`${LIVE_LEAGUE.name} Mini Draft`)
    })

     it('triggers fetchLeague on render', () => {
      const fetchLeague = jest.fn()
      customRender({ fetchLeague })

      expect(fetchLeague).toHaveBeenCalledWith(LIVE_LEAGUE.id)
    })

      it('triggers fetchMiniDraftPicksStatus on render', () => {
      const fetchMiniDraftPicksStatus = jest.fn()
      customRender({ fetchMiniDraftPicksStatus })

      expect(fetchMiniDraftPicksStatus).toHaveBeenCalledWith(LIVE_LEAGUE.id)
    })

     it('shows errors with the snackbar when present', () => {
      customRender({ miniDraftPicks: { data: MINI_DRAFT_PICKS, errors } })

      expect(alerts()).toHaveLength(3)
    })

    it('triggers fetchListPositions on render', () => {
      const fetchListPositions = jest.fn()
      customRender({ fetchListPositions })

      expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LIST_1.id)
    })

    it('does not trigger fetchListPositions if fplTeamListId is undefined', () => {
      const fetchListPositions = jest.fn()
      customRender({ fetchListPositions, miniDraftPicks: { data: MINI_DRAFT_PICKS, errors: [] } })

      expect(fetchListPositions).not.toHaveBeenCalled()
    })

    it('sets the deadline time as the waiverDeadline if waiverDeadline < the current time', () => {
      const waiverDeadline = moment().add(2, 'days').toDate()

      const round = {
        ...ROUND_1,
        waiverDeadline
      }

      customRender({ miniDraftPicks: { data: MINI_DRAFT_PICKS, errors: [], round, fplTeamListId } })
      expect(draftCompletedAlert()).not.toBeInTheDocument()
    })

    it('sets the deadline time as undefined if waiverDeadline > the current time', () => {
      const waiverDeadline = moment().subtract(2, 'days').toDate()

      const round = {
        ...ROUND_1,
        waiverDeadline
      }

      customRender({ miniDraftPicks: { data: MINI_DRAFT_PICKS, errors: [], round, fplTeamListId } })
      expect(draftCompletedAlert()).toBeInTheDocument()
    })

    it('renders nothing if there is no league', () => {
      const { container } = customRender({ league: undefined })

      expect(container).toBeEmptyDOMElement()
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

        expect(snackBarContainer()).not.toBeInTheDocument()
      })
    })
  })

  describe('when leagueId is not present', () => {
    beforeEach(() => (rrd as jest.Mocked<typeof rrd>).useParams.mockReturnValue({ leagueId: undefined }))

    it('renders nothing if there is no league', () => {
      const { container } = connectedRender()

      expect(container).toBeEmptyDOMElement()
    })
  })
})
