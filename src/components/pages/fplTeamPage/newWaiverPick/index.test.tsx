import { render, screen } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'

import NewWaiverPick from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { LIST_POSITIONS, PLAYER_SUMMARIES, FPL_TEAM_LISTS } from 'test/fixtures'

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

describe('NewWaiverPick', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      waiverPicks: { errors: [] },
      trades: { errors: [] },
      fplTeam: { isOwner: true },
      fplTeamList: { listPositions: LIST_POSITIONS,  outListPosition: undefined },
      currentFplTeamList: FPL_TEAM_LISTS[0],
      isWaiver: true,
      deadline: new Date(),
      fetchListPositions: blank__,
      setOutListPosition: blank__,
      fetchTradeablePlayers: blank__,
      updateTradeablePlayersFilter: blank__,
      updateTradeablePlayersSort: blank__,
      updateTradeablePlayersPage: blank__,
      players: { data: PLAYER_SUMMARIES, meta: { total: PLAYER_SUMMARIES.length } },
      fetchPlayerFacets: blank__,
      createMiniDraftPick: blank__,
      setTab: blank__,
      setAction: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <SnackbarProvider maxSnack={3}>
          <NewWaiverPick />
        </SnackbarProvider>
      </RouteWithOutletContext>
    )
  }

  const newWaiverPick = () => screen.queryByTestId('NewWaiverPick')
  const listPositionsTable = () => screen.queryByTestId('ListPositionsTable')
  const outListPosition = () => screen.queryByTestId('OutListPosition')
  const tradeablePlayersTable = () => screen.queryByTestId('TradeablePlayersTable')
  const alert = () => screen.getAllByRole('alert')

  describe('isWaiver = true', () => {
    it('only renders the ListPositionsTable if outListPosition is undefined', () => {
      customRender()
      
      expect(newWaiverPick()).toBeInTheDocument()
      expect(listPositionsTable()).toBeInTheDocument()
      expect(outListPosition()).not.toBeInTheDocument()
      expect(tradeablePlayersTable()).not.toBeInTheDocument()
    })

    it('renders the TradeableListPositionsTable and OutListPosition if outListPosition is present', () => {
      customRender({ fplTeamList: { listPositions: LIST_POSITIONS, outListPosition: LIST_POSITIONS[0] } })

      expect(listPositionsTable()).not.toBeInTheDocument()
      expect(outListPosition()).toBeInTheDocument()
      expect(tradeablePlayersTable()).toBeInTheDocument()
    })

    it('sets the tab and action', () => {
      const setTab = jest.fn()
      const setAction = jest.fn()

      customRender({ setTab, setAction })

      expect(setTab).toHaveBeenCalledWith('waiverPicks')
      expect(setAction).toHaveBeenCalledWith('new')
    })
  })

  describe('isWaiver = false', () => {
    it('only renders the ListPositionsTable if outListPosition is undefined', () => {
      customRender({ isWaiver: false })

      expect(newWaiverPick()).toBeInTheDocument()
      expect(listPositionsTable()).toBeInTheDocument()
      expect(outListPosition()).not.toBeInTheDocument()
      expect(tradeablePlayersTable()).not.toBeInTheDocument()
    })

    it('renders the TradeableListPositionsTable and OutListPosition if outListPosition is present', () => {
      customRender({
        isWaiver: false,
        fplTeamList: { listPositions: LIST_POSITIONS,  outListPosition: LIST_POSITIONS[0] }
      })

      expect(listPositionsTable()).not.toBeInTheDocument()
      expect(outListPosition()).toBeInTheDocument()
      expect(tradeablePlayersTable()).toBeInTheDocument()
    })

    it('sets the tab and action', () => {
      const setTab = jest.fn()
      const setAction = jest.fn()

      customRender({ setTab, setAction, isWaiver: false })

      expect(setTab).toHaveBeenCalledWith('trades')
      expect(setAction).toHaveBeenCalledWith('new')
    })
  })

  it('triggers fetchListPositions on render if the fplTeamListId is present', () => {
    const fetchListPositions = jest.fn()

    customRender({
      waiverPicks: { errors: [] },
      fetchListPositions
    })

    expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LISTS[0].id)
  })

  it('does not fetchListPositions on render if currentFplTeamList is undefined', () => {
    const fetchListPositions = jest.fn()

    customRender({
      waiverPicks: { errors: [] },
      currentFplTeamList: undefined,
      fetchListPositions
    })

    expect(fetchListPositions).not.toHaveBeenCalled()
  })

  it('shows errors with the snackbar when present', () => {
    customRender({ waiverPicks: { errors } })
    
    expect(alert()).toHaveLength(errors.length)
  })

  it('renders nothing if there are no list positions present', () => {
    customRender({ fplTeamList: { listPositions: [] } })

    expect(newWaiverPick()).not.toBeInTheDocument()
  })
})
