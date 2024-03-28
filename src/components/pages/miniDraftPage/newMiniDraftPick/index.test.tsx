import { render, screen } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'

import NewMiniDraftPick from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { LIST_POSITIONS, PLAYER_SUMMARIES, MINI_DRAFT_PICK_STATUS } from 'test/fixtures'

const fplTeamListId = '5'

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

describe('NewMiniDraftPick', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      miniDraftPicks: { ...MINI_DRAFT_PICK_STATUS, errors: [] },
      
      fplTeamList: { listPositions: LIST_POSITIONS, outListPosition: undefined },
      players: { data: PLAYER_SUMMARIES, meta: { total: PLAYER_SUMMARIES.length } },
      isWaiver: false,
      deadline: new Date(),
      setOutListPosition: blank__,
      fetchTradeablePlayers: blank__,
      updateTradeablePlayersFilter: blank__,
      updateTradeablePlayersSort: blank__,
      updateTradeablePlayersPage: blank__,
      fetchListPositions: blank__,
      fetchPlayerFacets: blank__,
      createMiniDraftPick: blank__,
      setTab: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <SnackbarProvider maxSnack={3}>
          <NewMiniDraftPick />
        </SnackbarProvider>
      </RouteWithOutletContext>
    )
  }

  const listPositionTable = () => screen.queryByTestId('ListPositionsTable')
  const outListPosition = () => screen.queryByTestId('OutListPosition')
  const tradeablePlayersTable = () => screen.queryByTestId('TradeablePlayersTable')
  const alert = () => screen.queryAllByRole('alert')

  it('only renders the ListPositionsTable if outListPosition is undefined', () => {
    customRender()

    expect(screen.getByTestId('NewMiniDraftPick')).toBeInTheDocument()

    expect(listPositionTable()).toBeInTheDocument()
    expect(outListPosition()).not.toBeInTheDocument()
    expect(tradeablePlayersTable()).not.toBeInTheDocument()
    expect(alert()).toHaveLength(0)
  })

  it('renders the TradeableListPositionsTable and OutListPosition if outListPosition is present', () => {
    customRender({ fplTeamList: { listPositions: LIST_POSITIONS, outListPosition: LIST_POSITIONS[0] } })

    expect(listPositionTable()).not.toBeInTheDocument()
    expect(outListPosition()).toBeInTheDocument()
    expect(tradeablePlayersTable()).toBeInTheDocument()
  })

  it('triggers fetchListPositions on render if the fplTeamListId is present', () => {
    const fetchListPositions = jest.fn()

    customRender({
      miniDraftPicks: { ...MINI_DRAFT_PICK_STATUS, errors: [], fplTeamListId },
      fetchListPositions
    })

    expect(fetchListPositions).toHaveBeenCalledWith(fplTeamListId)
  })

  it('does not fetchListPositions on render if the fplTeamListId is undefined', () => {
    const fetchListPositions = jest.fn()

    customRender({
      miniDraftPicks: { ...MINI_DRAFT_PICK_STATUS, errors: []},
      fetchListPositions
    })

    expect(fetchListPositions).not.toHaveBeenCalled()
  })

  it('shows errors with the snackbar when present', () => {
    customRender({ miniDraftPicks: { ...MINI_DRAFT_PICK_STATUS, errors } })

    expect((alert())).toHaveLength(3)
  })

  it('renders nothing if there are no list positions present', () => {
    customRender({ fplTeamList: { listPositions: [] } })

    expect(screen.queryByTestId('NewMiniDraftPick')).not.toBeInTheDocument()
  })
})
