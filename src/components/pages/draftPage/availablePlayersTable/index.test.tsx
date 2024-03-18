import { fireEvent, render, screen, within } from '@testing-library/react'

import AvailablePlayersTable from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { PLAYERS_URL, TEAMS_URL } from 'utilities/constants'
import { PLAYER_SUMMARIES, DRAFT_PICK_STATUS, PLAYER_FACETS } from 'test/fixtures'
import { initialFilterState } from 'state/players/reducer'
import { playersTableCells } from 'components/pages/playersPage'

const players = { data: PLAYER_SUMMARIES, meta: { total: PLAYER_SUMMARIES.length }, facets: PLAYER_FACETS }
const cellNumber = Object.values(playersTableCells()).length

describe('AvailablePlayersTable', () => {

  const customRender = (context = {}) => {
    const baseContext = {
      players: players,
      draftPicks: { ...DRAFT_PICK_STATUS },
      fetchAvailablePlayers: blank__,
      fetchPlayerFacets: blank__,
      updateAvailablePlayersFilter: blank__,
      updateAvailablePlayersSort: blank__,
      updateAvailablePlayersPage: blank__,
      updateDraftPick: blank__,
      setTab: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <AvailablePlayersTable />
      </RouteWithOutletContext>
    )
  }
  
  // const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)
  const headerCell = wrapper =>  wrapper.find('HeaderCell')
  const menuItem = wrapper => wrapper.find('WithStyles(ForwardRef(MenuItem))')
  const pagination = wrapper => wrapper.find('WithStyles(ForwardRef(TablePagination))')
  // const dialog = wrapper => wrapper.find('WithStyles(ForwardRef(Dialog))')

  const sortTable = () => screen.getByTestId('SortTable')
  const tableRows = () => within(sortTable()).getAllByRole('row')
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]
  const link = (i, j) => within(tableCell(i, j)).getByRole('link')
  const columnHeaders = () => screen.getAllByRole('columnheader')
  const presentation = () => screen.queryAllByRole('presentation')
  const dialog = () => presentation()[1]
  const checkboxes = () => screen.queryAllByRole('checkbox')
  const tablePagination = () => screen.getByTestId('SortTablePagination')

  it('shows the player rows', () => {
    customRender({ draftPicks: { ...DRAFT_PICK_STATUS, userCanPick: false } })

    expect(tableRows()).toHaveLength(PLAYER_SUMMARIES.length + 1)
    expect(columnHeaders().length).toEqual(cellNumber)

    expect(link(1, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${PLAYER_SUMMARIES[0].id}`)
    expect(link(1, 1)).toHaveTextContent(PLAYER_SUMMARIES[0].firstName)

    expect(link(2, 0)).toHaveAttribute('href', `${PLAYERS_URL}/${PLAYER_SUMMARIES[1].id}`)
    expect(link(2, 0)).toHaveTextContent(PLAYER_SUMMARIES[1].lastName)

    expect(link(3, 2)).toHaveAttribute('href', `${TEAMS_URL}/${PLAYER_SUMMARIES[2].team.id}/`)
    expect(link(3, 2)).toHaveTextContent(PLAYER_SUMMARIES[2].team.shortName)
    expect(within(link(3, 2)).getByRole('img')).toHaveAttribute('alt', PLAYER_SUMMARIES[2].team.shortName)
  })

  it('allows the user to draft a player if userCanPick = true', () => {
    const updateDraftPick = jest.fn()
    customRender({ updateDraftPick })

    expect(presentation().length).toEqual(0)
    
    expect(columnHeaders().length).toEqual(cellNumber + 1)

    fireEvent.click(within(tableCell(1, cellNumber)).getByText('Draft'))
    expect(dialog().style.opacity).toEqual('1')

    expect(dialog()).toHaveTextContent(`Are you wish to draft ${PLAYER_SUMMARIES[0].firstName} ${PLAYER_SUMMARIES[0].lastName}?`)
    fireEvent.click(within(dialog()).getByText('Confirm'))

    expect(dialog().style.opacity).toEqual('0') // Dialog closed

    expect(updateDraftPick)
      .toHaveBeenCalledWith({ nextDraftPickId: DRAFT_PICK_STATUS.nextDraftPickId, playerId: PLAYER_SUMMARIES[0].id })
  })

  it('closes the draft dialog when cancel is clicked', () => {
    const updateDraftPick = jest.fn()
    customRender({ updateDraftPick })

    expect(presentation().length).toEqual(0)
    
    expect(columnHeaders().length).toEqual(cellNumber + 1)

    fireEvent.click(within(tableCell(1, cellNumber)).getByText('Draft'))

    expect(dialog()).toHaveTextContent(`Are you wish to draft ${PLAYER_SUMMARIES[0].firstName} ${PLAYER_SUMMARIES[0].lastName}?`)
    fireEvent.click(within(dialog()).getByText('Cancel'))

    expect(dialog().style.opacity).toEqual('0') // Dialog closed

    expect(updateDraftPick).not.toHaveBeenCalled()
  })

  it('closes the draft dialog when the backdrop is clicked', () => {
    const updateDraftPick = jest.fn()
    customRender({ updateDraftPick })

    expect(presentation().length).toEqual(0)
    
    expect(columnHeaders().length).toEqual(cellNumber + 1)

    fireEvent.click(within(tableCell(1, cellNumber)).getByText('Draft'))

    const backdrop = document.querySelector('.MuiBackdrop-root')

    if (backdrop) {
      fireEvent.click(backdrop)
    } else {
      throw new Error('.MuiBackdrop-root not found')
    }

    expect(dialog().style.opacity).toEqual('0')

    expect(updateDraftPick).not.toHaveBeenCalled()
  })

  it('triggers the fetchAvailablePlayers and fetchPlayerFacets function on load', () => {
    const fetchAvailablePlayers = jest.fn()
    const fetchPlayerFacets = jest.fn()

    customRender({ fetchAvailablePlayers, fetchPlayerFacets })

    expect(fetchAvailablePlayers).toHaveBeenCalledWith(initialFilterState)
    expect(fetchPlayerFacets).toHaveBeenCalled()
  })

  it('triggers updateAvailablePlayersSort', () => {
    const updateAvailablePlayersSort = jest.fn()
    customRender({ updateAvailablePlayersSort })

    fireEvent.click(within(columnHeaders()[0]).getByTestId('ArrowDownwardIcon'))
    expect(updateAvailablePlayersSort).toHaveBeenCalledWith({ lastName: 'asc' })
  })

  it('triggers updateAvailablePlayersFilter', () => {
    const updateAvailablePlayersFilter = jest.fn()
    customRender({ updateAvailablePlayersFilter })

    fireEvent.click(within(columnHeaders()[2]).getByLabelText('filter'))
    fireEvent.click(checkboxes()[0])
    fireEvent.click(checkboxes()[3])
    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

    expect(updateAvailablePlayersFilter)
      .toHaveBeenCalledWith({ teamId: [PLAYER_FACETS.teams[0].value, PLAYER_FACETS.teams[3].value] })
  })

  it('triggers updateAvailablePlayersPage', () => {
    const updateAvailablePlayersPage = jest.fn()
    const { page: { offset, limit } } = initialFilterState
    const playersArr = Array(limit + 1).fill(PLAYER_SUMMARIES[0])

    customRender({
      players: { data: playersArr, meta: { total: playersArr.length } },
      updateAvailablePlayersPage
    })

    expect(tablePagination()).toHaveTextContent(`1–${limit} of ${playersArr.length}`)
    fireEvent.click(screen.getByTitle('Go to next page'))
    expect(updateAvailablePlayersPage).toHaveBeenCalledWith(offset + limit)
  })
})
