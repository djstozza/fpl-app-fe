import { render, screen } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'

import NewTeamTrade from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { LIST_POSITIONS, FPL_TEAM_LIST_1, INTER_TEAM_TRADE_GROUPS } from 'test/fixtures'

const errors = [
  {
    code: 'is invalid',
    detail: 'You cannot make a trade at this time',
    source: 'name',
    title: 'Is Invalid'
  }
]

describe('NewTeamTrade', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      fplTeam: { isOwner: true },
      fplTeamList: { listPositions: LIST_POSITIONS, outListPosition: LIST_POSITIONS[3] },
      currentFplTeamList: FPL_TEAM_LIST_1, 
      selectedFplTeamListId: FPL_TEAM_LIST_1.id,
      interTeamTradeGroups: { data: INTER_TEAM_TRADE_GROUPS, errors: [] },
      listPosition: { tradeableListPositions: LIST_POSITIONS },
      deadline: new Date(),
      setOutListPosition: blank__,
      fetchTradeableListPositions: blank__,
      fetchInterTeamTradeGroup: blank__,
      createInterTeamTradeGroup: blank__,
      updateTradeableListPositionsFilter: blank__,
      updateTradeableListPositionsSort: blank__,
      fetchTradeableListPositionFacets: blank__,
      fetchListPositions: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <SnackbarProvider maxSnack={3}>
          <NewTeamTrade />
        </SnackbarProvider>
      </RouteWithOutletContext>
    )
  }

  const newTeamTrade = () => screen.queryByTestId('NewTeamTrade')
  const listPositionsTable = () => screen.queryByTestId('ListPositionsTable')
  const outListPosition = () => screen.queryByTestId('OutListPosition')
  const tradeableListPositionsTable = () => screen.queryByTestId('TradeableListPositionsTable')
  const alert = () => screen.getAllByRole('alert')

  it('only does not render the listPositionsTable if outListPosition is present', () => {
    customRender()

    expect(newTeamTrade()).toBeInTheDocument()
    expect(listPositionsTable()).not.toBeInTheDocument()
    expect(outListPosition()).toBeInTheDocument()
    expect(tradeableListPositionsTable()).toBeInTheDocument()
  })

  it('only renders the ListPositionsTable if outListPosition is undefined', () => {
    customRender({ fplTeamList: { listPositions: LIST_POSITIONS, outListPosition: undefined } })

    expect(newTeamTrade()).toBeInTheDocument()
    expect(listPositionsTable()).toBeInTheDocument()
    expect(outListPosition()).not.toBeInTheDocument()
    expect(tradeableListPositionsTable()).not.toBeInTheDocument()
  })

  it('calls fetchListPositions if there is a selectedFplTeamListId', () => {
    const fetchListPositions = jest.fn()

    customRender({ fetchListPositions })

    expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LIST_1.id)
  })

  it('does not call fetchListPositions if there is no currentFplTeamList', () => {
    const fetchListPositions = jest.fn()

    customRender({ fetchListPositions, currentFplTeamList: undefined })

    expect(fetchListPositions).not.toHaveBeenCalled()
  })

  it('shows errors with the snackbar when present', () => {
    customRender({ interTeamTradeGroups: { errors } })

   expect(alert()).toHaveLength(errors.length)
  })

  it('renders nothing if there are no listPositions', () => {
    customRender({ fplTeamList: { listPositions: [] } })

    expect(newTeamTrade()).not.toBeInTheDocument()
  })
})
