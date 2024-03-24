import { fireEvent, render, screen, within } from '@testing-library/react'

import TradeablePlayersTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { PLAYERS_URL, TEAMS_URL } from 'utilities/constants'
import { PLAYER_SUMMARIES, PLAYER_FACETS, LIST_POSITION_2 } from 'test/fixtures'
import { initialFilterState, initialState } from 'state/players/reducer'
import { playersTableCells } from 'components/pages/playersPage'

const players = { ...initialState, data: PLAYER_SUMMARIES, meta: { total: PLAYER_SUMMARIES.length }, facets: PLAYER_FACETS }
const cellNumber = Object.values(playersTableCells()).length

describe('TradeablePlayersTable', () => {
  const customRender = (props = {}) => render(
    <MockedRouter>
      <TradeablePlayersTable
        players={players}
        outListPosition={LIST_POSITION_2}
        fetchTradeablePlayers={blank__}
        fetchPlayerFacets={blank__}
        updateTradeablePlayersFilter={blank__}
        updateTradeablePlayersSort={blank__}
        updateTradeablePlayersPage={blank__}
        submitAction={blank__}
        isOwner
        isWaiver={true}
        submitting={false}
        {...props}
      />
    </MockedRouter>
  )

  const sortTable = () => screen.getByTestId('SortTable')
  
  const tableRows = () => within(sortTable()).getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]
  const link = (i, j) => within(tableCell(i, j)).getByRole('link')
  const tradeIn = (i, j,)  => within(tableCell(i, j)).getByRole('button', { name: /trade in/i })
  const waiverIn = (i, j,)  => within(tableCell(i, j)).getByRole('button', { name: /waiver in/i })
  const tradeInQuery = () => screen.queryAllByRole('button', { name: /trade in/i })
  const waiverInQuery = () => screen.queryAllByRole('button', { name: /waiver in/i })
  const columnHeaders = () => screen.getAllByRole('columnheader')
  const checkboxes = () => screen.queryAllByRole('checkbox')

  const presentation = () => screen.queryAllByRole('presentation')
  const dialog = () => presentation()[1]

  const confirm = () => within(dialog()).getByRole('button', { name: /confirm/i })
  const cancel = () => within(dialog()).getByRole('button', { name: /cancel/i })

  const sortButton = (text) => within(screen.getByText(text)).getByRole('button')
  const tablePagination = () => screen.getByTestId('SortTablePagination')

  it('shows the player rows', () => {
    customRender()

    expect(tableRows()).toHaveLength(PLAYER_SUMMARIES.length + 1)
    expect(tableCells(1)).toHaveLength(cellNumber + 1)
    expect(link(2, 0)).toHaveAttribute('href', `${PLAYERS_URL}/${PLAYER_SUMMARIES[1].id}`)
    expect(link(2, 0)).toHaveTextContent(PLAYER_SUMMARIES[1].lastName)

    expect(link(1, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${PLAYER_SUMMARIES[0].id}`)
    expect(link(1, 1)).toHaveTextContent(PLAYER_SUMMARIES[0].firstName)

    expect(link(3, 2)).toHaveAttribute('href', `${TEAMS_URL}/${PLAYER_SUMMARIES[2].team.id}/`)
    expect(link(3, 2)).toHaveTextContent(PLAYER_SUMMARIES[2].team.shortName)
    expect(within(link(3, 2)).getByRole('img')).toHaveAttribute('alt', PLAYER_SUMMARIES[2].team.shortName)
  })

  it('triggers the submit action - isWaiver false', () => {
    const submitAction = jest.fn()
    customRender({ submitAction, isWaiver: false })

    expect(presentation()).toHaveLength(0)
    expect(waiverInQuery()).toHaveLength(0)

    fireEvent.click(tradeIn(1, cellNumber))
    expect(dialog().style.opacity).toEqual('1')

    expect(dialog()).toHaveTextContent(
      `Confirm tradeOut: ${LIST_POSITION_2.player.firstName} ${LIST_POSITION_2.player.lastName}` +
      `In: ${PLAYER_SUMMARIES[0].firstName} ${PLAYER_SUMMARIES[0].lastName}` +
      `This trade cannot be reversed once confirmed`
    )

    fireEvent.click(confirm())
    expect(dialog().style.opacity).toEqual('0')

    expect(submitAction).toHaveBeenCalledWith(PLAYER_SUMMARIES[0].id)
  })

  it('triggers the submit action - isWaiver true', () => {
    const submitAction = jest.fn()
    customRender({ submitAction, isWaiver: true })

    expect(presentation()).toHaveLength(0)
    expect(tradeInQuery()).toHaveLength(0)

    fireEvent.click(waiverIn(1, cellNumber))
    expect(dialog().style.opacity).toEqual('1')

    expect(dialog()).toHaveTextContent(
      `Confirm waiver pickOut: ${LIST_POSITION_2.player.firstName} ${LIST_POSITION_2.player.lastName}` +
      `In: ${PLAYER_SUMMARIES[0].firstName} ${PLAYER_SUMMARIES[0].lastName}`
    )

    fireEvent.click(confirm())
    expect(dialog().style.opacity).toEqual('0')

    expect(submitAction).toHaveBeenCalledWith(PLAYER_SUMMARIES[0].id)
  })

  it('closes the dialog when cancel is clicked', () => {
    const submitAction = jest.fn()
    customRender({ submitAction })

    expect(presentation()).toHaveLength(0)

    fireEvent.click(waiverIn(1, cellNumber))
    expect(dialog().style.opacity).toEqual('1')

    fireEvent.click(cancel())
    expect(dialog().style.opacity).toEqual('0')

    expect(submitAction).not.toHaveBeenCalled()
  })

  it('closes the dialog when clicking out of it', () => {
    const submitAction = jest.fn()
    customRender({ submitAction })

    expect(presentation()).toHaveLength(0)

    fireEvent.click(waiverIn(1, cellNumber))
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

  it('triggers the fetchTradeablePlayers and fetchPlayerFacets function on load', () => {
    const fetchTradeablePlayers = jest.fn()
    const fetchPlayerFacets = jest.fn()

    customRender({ fetchTradeablePlayers, fetchPlayerFacets })

    expect(fetchTradeablePlayers).toHaveBeenCalledWith(initialFilterState)
    expect(fetchPlayerFacets).toHaveBeenCalled()
  })

  it('triggers updateTradeablePlayersSort', () => {
    const updateTradeablePlayersSort = jest.fn()
    customRender({ updateTradeablePlayersSort })

    fireEvent.click(sortButton('LN'))
    expect(updateTradeablePlayersSort).toHaveBeenCalledWith({ lastName: 'asc' })
  })

  it('triggers updateTradeablePlayersFilter', () => {
    const updateTradeablePlayersFilter = jest.fn()
    customRender({ updateTradeablePlayersFilter })

    fireEvent.click(within(columnHeaders()[2]).getByLabelText('filter'))
    fireEvent.click(checkboxes()[0])
    fireEvent.click(checkboxes()[3])
    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

    expect(updateTradeablePlayersFilter)
      .toHaveBeenCalledWith({ teamId: [PLAYER_FACETS.teams[0].value, PLAYER_FACETS.teams[3].value] })
  })

  it('triggers updateTradeablePlayersPage', () => {
    const updateTradeablePlayersPage = jest.fn()
    const { page: { offset, limit } } = initialFilterState
    const playersArr = Array(limit + 1).fill(PLAYER_SUMMARIES[0])

    customRender({
      players: { data: playersArr, meta: { total: playersArr.length } },
      updateTradeablePlayersPage
    })

    expect(tablePagination()).toHaveTextContent(`1–${limit} of ${playersArr.length}`)
    fireEvent.click(screen.getByTitle('Go to next page'))
    expect(updateTradeablePlayersPage).toHaveBeenCalledWith(offset + limit)
  })

  it('does not show the trade column if isOwner = false', () => {
    customRender({ isOwner: false })

    expect(tableCells(1)).toHaveLength(cellNumber)
    expect(tradeInQuery()).toHaveLength(0)
    expect(waiverInQuery()).toHaveLength(0)
  })

  it('does not render if there is no outListPosition', () => {
    customRender({ outListPosition: undefined })

    expect(screen.queryByTestId('TradeablePlayersTable')).not.toBeInTheDocument()
  })
})
