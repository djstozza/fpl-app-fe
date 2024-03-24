import { fireEvent, render, screen, within } from '@testing-library/react'

import TradeableListPositionsTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { PLAYERS_URL, TEAMS_URL } from 'utilities/constants'
import { LIST_POSITIONS, LIST_POSITION_FACETS, LIST_POSITION_2, INTER_TEAM_TRADE_GROUP_1 } from 'test/fixtures'
import { initialFilterState, initialState } from 'state/listPosition/reducer'
import { listPositionTableCells } from 'components/pages/fplTeamPage/listPositionsTable'

const listPosition = { ...initialState, tradeableListPositions: LIST_POSITIONS, facets: LIST_POSITION_FACETS }
const cellNumber = Object.values(listPositionTableCells()).length

describe('TradeableListPositionsTable', () => {
  const customRender = (props = {}) => {
    return render(
      <MockedRouter>
        <TradeableListPositionsTable
          listPosition={listPosition}
          outListPosition={LIST_POSITION_2}
          fetchTradeableListPositions={blank__}
          fetchTradeableListPositionFacets={blank__}
          updateTradeableListPositionsFilter={blank__}
          updateTradeableListPositionsSort={blank__}
          submitAction={blank__}
          isOwner
          deadline={new Date()}
          {...props}
        />
      </MockedRouter>
    )
  }

  const sortTable = () => screen.getByTestId('SortTable')
  
  const tableRows = () => within(sortTable()).getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]
  const link = (i, j) => within(tableCell(i, j)).getByRole('link')
  const tradeIn = (i, j,)  => within(tableCell(i, j)).getByRole('button', { name: /trade in/i })
  const columnHeaders = () => screen.getAllByRole('columnheader')
  const checkboxes = () => screen.queryAllByRole('checkbox')

  const presentation = () => screen.queryAllByRole('presentation')
  const dialog = () => presentation()[1]

  const confirm = () => within(dialog()).getByRole('button', { name: /confirm/i })
  const cancel = () => within(dialog()).getByRole('button', { name: /cancel/i })

  const sortButton = (text) => within(screen.getByText(text)).getByRole('button')

  it('shows the player rows', () => {
    customRender()

    expect(tableRows()).toHaveLength(LIST_POSITIONS.length + 1)
    expect(tableCells(1)).toHaveLength(cellNumber + 1)
    
    expect(link(2, 0)).toHaveAttribute('href', `${PLAYERS_URL}/${LIST_POSITIONS[1].player.id}`)
    expect(link(2, 0)).toHaveTextContent(LIST_POSITIONS[1].player.lastName)

    expect(link(1, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${LIST_POSITIONS[0].player.id}`)
    expect(link(1, 1)).toHaveTextContent(LIST_POSITIONS[0].player.firstName)

    expect(link(3, 2)).toHaveAttribute('href', `${TEAMS_URL}/${LIST_POSITIONS[2].team.id}/`)
    expect(link(3, 2)).toHaveTextContent(LIST_POSITIONS[2].team.shortName)
    expect(within(link(3, 2)).getByRole('img')).toHaveAttribute('alt', LIST_POSITIONS[2].team.shortName)
  })

  it('triggers the submit action', () => {
    const submitAction = jest.fn()
    customRender({ submitAction, isWaiver: true })

    expect(presentation()).toHaveLength(0)

    fireEvent.click(tradeIn(1, cellNumber))
   
    expect(dialog().style.opacity).toEqual('1')
    expect(dialog()).toHaveTextContent(
      `Confirm tradeOut: ${LIST_POSITION_2.player.firstName} ${LIST_POSITION_2.player.lastName}` +
      `In: ${LIST_POSITIONS[0].player.firstName} ${LIST_POSITIONS[0].player.lastName}`
    )

    fireEvent.click(confirm())

    expect(dialog().style.opacity).toEqual('0')

    expect(submitAction).toHaveBeenCalledWith(LIST_POSITIONS[0])
  })

  it('closes the draft dialog when cancel is clicked', () => {
    const submitAction = jest.fn()
    customRender({ submitAction })

    expect(presentation()).toHaveLength(0)

    fireEvent.click(tradeIn(1, cellNumber))
    expect(dialog().style.opacity).toEqual('1')
    
    fireEvent.click(cancel())
 
    expect(dialog().style.opacity).toEqual('0')

    expect(submitAction).not.toHaveBeenCalled()
  })

  it('closes the draft dialog when cancel is clicked', () => {
    const submitAction = jest.fn()
    customRender({ submitAction })

    expect(presentation()).toHaveLength(0)

    fireEvent.click(tradeIn(1, cellNumber))
    expect(dialog().style.opacity).toEqual('1')

    const backdrop = document.querySelector('.MuiBackdrop-root')

    if (backdrop) {
      fireEvent.click(backdrop)
    } else {
      throw new Error('.MuiBackdrop-root not found')
    }

    expect(dialog().style.opacity).toEqual('0')

    expect(submitAction).not.toHaveBeenCalled()
  })

  it('triggers the fetchTradeableListPositions and fetchTradeableListPositionFacets function on load', () => {
    const fetchTradeableListPositions = jest.fn()
    const fetchTradeableListPositionFacets = jest.fn()

    customRender({ fetchTradeableListPositions, fetchTradeableListPositionFacets })

    expect(fetchTradeableListPositions).toHaveBeenCalledWith(initialFilterState)
    expect(fetchTradeableListPositionFacets).toHaveBeenCalled()
  })

  it('triggers updateTradeableListPositionsSort', () => {
    const updateTradeableListPositionsSort = jest.fn()
    customRender({ updateTradeableListPositionsSort })

    fireEvent.click(sortButton('LN'))
  
    expect(updateTradeableListPositionsSort).toHaveBeenCalledWith({ lastName: 'desc' })
  })

  it('triggers updateTradeableListPositionsFilter', () => {
    const updateTradeableListPositionsFilter = jest.fn()
    customRender({ updateTradeableListPositionsFilter })

    fireEvent.click(within(columnHeaders()[2]).getByLabelText('filter'))
    fireEvent.click(checkboxes()[0])
    fireEvent.click(checkboxes()[3])
    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

    expect(updateTradeableListPositionsFilter)
      .toHaveBeenCalledWith({ team_id: [LIST_POSITION_FACETS.teams[0].value, LIST_POSITION_FACETS.teams[3].value] })
  })

  it('does not show the trade column if isOwner = false', () => {
    customRender({ isOwner: false })

    expect(tableCells(1)).toHaveLength(cellNumber)
    expect(screen.queryAllByRole('button', { name: /trade in/i })).toHaveLength(0)
  })

  it('renders nothing if there is no outListPosition', () => {
    customRender({ outListPosition: undefined })

    expect(screen.queryByTestId('TradeableListPositionsTable')).not.toBeInTheDocument()
  })

  it('includes the inFplTeamListId and excludedPlayerIds filters if an interTeamTradeGroup is present', () => {
    const fetchTradeableListPositions = jest.fn()
    customRender({ fetchTradeableListPositions, interTeamTradeGroup: INTER_TEAM_TRADE_GROUP_1 })

    expect(fetchTradeableListPositions).toHaveBeenCalledWith({
      ...initialFilterState,
      filter: {
        ...initialFilterState.filter,
        inFplTeamListId: INTER_TEAM_TRADE_GROUP_1.inFplTeamListId,
        excludedPlayerIds: INTER_TEAM_TRADE_GROUP_1.trades.map(({ inPlayer: { id } }) => id)
      }
    })
  })
})
