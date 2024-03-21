import { fireEvent, render, screen } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'

import AddPlayer from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import {
  LIST_POSITIONS,
  FPL_TEAM_LIST_1,
  INTER_TEAM_TRADE_GROUP_1
} from 'test/fixtures'

const name = 'name'
const teamTradeId = '10'

const errors = [
  {
    code: 'is invalid',
    detail: 'You cannot make a trade at this time',
    source: 'name',
    title: 'Is Invalid'
  }
]

describe('AddPlayer', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      fplTeam: { isOwner: true },
      currentFplTeamList: FPL_TEAM_LIST_1,
      interTeamTradeGroup: INTER_TEAM_TRADE_GROUP_1,
      fetchInterTeamTradeGroup: blank__,
      teamTradeId: teamTradeId,
      selectedFplTeamListId: FPL_TEAM_LIST_1.id,
      fplTeamList: { listPositions: LIST_POSITIONS, outListPosition: LIST_POSITIONS[3] },
      deadline: new Date(),
      listPosition: { tradeableListPositions: LIST_POSITIONS },
      setOutListPosition: blank__,
      fetchListPositions: blank__,
      fetchTradeableListPositions: blank__,
      updateTradeableListPositionsFilter: blank__,
      updateTradeableListPositionsSort: blank__,
      fetchTradeableListPositionFacets: blank__,
      addToInterTeamTradeGroup: blank__,
      interTeamTradeGroups: { errors: [] },
      name,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <SnackbarProvider maxSnack={3}>
          <AddPlayer />
        </SnackbarProvider>
      </RouteWithOutletContext>
    )
  }

  // const snackBarItem = wrapper => wrapper.find('WithStyles(SnackbarItem)')

  const addPlayer = () => screen.queryByTestId('AddPlayer')
  const listPositionsTable = () => screen.queryByTestId('ListPositionsTable')
  const outListPosition = () => screen.queryByTestId('OutListPosition')
  const tradeableListPositionsTable = () => screen.queryByTestId('TradeableListPositionsTable')
  const alert = () => screen.getAllByRole('alert')

  it('only does not render the listPositionsTable if outListPosition is present', () => {
    customRender()

    expect(addPlayer()).toBeInTheDocument()
    expect(listPositionsTable()).not.toBeInTheDocument()
    expect(outListPosition()).toBeInTheDocument()
    expect(tradeableListPositionsTable()).toBeInTheDocument()
  })

  it('only renders the ListPositionsTable if outListPosition is undefined', () => {
    customRender({ fplTeamList: { listPositions: LIST_POSITIONS, outListPosition: undefined } })
    
    expect(addPlayer()).toBeInTheDocument()
    expect(listPositionsTable()).toBeInTheDocument()
    expect(outListPosition()).not.toBeInTheDocument()
    expect(tradeableListPositionsTable()).not.toBeInTheDocument()
  })

  it('calls fetchInterTeamTradeGroup if there is a selectedFplTeamListId', () => {
    const fetchInterTeamTradeGroup = jest.fn()

    customRender({ fetchInterTeamTradeGroup })

    expect(fetchInterTeamTradeGroup).toHaveBeenCalledWith(FPL_TEAM_LIST_1.id, teamTradeId)
  })

  it('does not call fetchInterTeamTradeGroup if there is no selectedFplTeamListId', () => {
    const fetchInterTeamTradeGroup = jest.fn()

    customRender({ fetchInterTeamTradeGroup, selectedFplTeamListId: undefined })

    expect(fetchInterTeamTradeGroup).not.toHaveBeenCalled()
  })

  it('calls fetchListPositions if there is a selectedFplTeamListId', () => {
    const fetchListPositions = jest.fn()

    customRender({ fetchListPositions })

    expect(fetchListPositions).toHaveBeenCalledWith(FPL_TEAM_LIST_1.id, INTER_TEAM_TRADE_GROUP_1)
  })

  it('does not call fetchListPositions if there is no currentFplTeamList', () => {
    const fetchListPositions = jest.fn()

    customRender({ fetchListPositions, currentFplTeamList: undefined })

    expect(fetchListPositions).not.toHaveBeenCalled()
  })

  it('does not call fetchListPositions if there is no interTeamTradeGroup', () => {
    const fetchListPositions = jest.fn()

    customRender({ fetchListPositions, interTeamTradeGroup: undefined })

    expect(fetchListPositions).not.toHaveBeenCalled()
  })

  it('shows errors with the snackbar when present', () => {
    customRender({ interTeamTradeGroups: { errors } })

    expect(alert()).toHaveLength(errors.length)
  })

  it('renders nothing if there are no listPositions', () => {
    customRender({ fplTeamList: { listPositions: [] } })

    expect(addPlayer()).not.toBeInTheDocument()
  })
})
