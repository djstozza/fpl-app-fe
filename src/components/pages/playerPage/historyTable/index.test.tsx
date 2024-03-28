import { fireEvent, render, screen, within } from '@testing-library/react'
import { Navigate } from 'react-router-dom'

import HistoryTable from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { PLAYER_HISTORY } from 'test/fixtures'
import { initialFilterState } from 'state/player/reducer'
import { PLAYERS_URL } from 'utilities/constants'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: jest.fn()
}))

afterEach(() => {
  jest.clearAllMocks()
})

const playerId = '1'

describe('HistoryTable', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      player: { data: { hasHistory: true }, history: PLAYER_HISTORY },
      playerId: playerId,
      fetchPlayerHistory: blank__,
      updatePlayerHistoryPast: blank__,
      setTab: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <HistoryTable />
      </RouteWithOutletContext>
    )
  }

  const sortTable = () => screen.getByTestId('SortTable')

  const tableRows = () => within(sortTable()).getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]

  const sortButton = (text) => within(screen.getByLabelText(text)).getByRole('button')

  it('redirects to the player details page if hasHistory = false', () => {
    customRender({ player: { data: { hasHistory: false }, history: undefined } })

    expect(Navigate).toHaveBeenCalledWith(
      { to: `${PLAYERS_URL}/${playerId}` },
      {}
    )
  })

  it('renders the team fixtures table', () => {
    customRender()

    expect(tableCell(2, 4)).toHaveTextContent(String(PLAYER_HISTORY[1].totalPoints))
    expect(tableCell(3, 6)).toHaveTextContent(String(PLAYER_HISTORY[2].assists))
  })

  it('triggers fetchPlayerHistory and setTab on render', () => {
    const fetchPlayerHistory = jest.fn()
    const setTab = jest.fn()
    customRender({ fetchPlayerHistory, setTab })

    expect(fetchPlayerHistory).toHaveBeenCalledWith({ id: '1', ...initialFilterState })
    expect(setTab).toHaveBeenCalledWith('history')
  })

  it('triggers updatePlayerHistorySort', () => {
    const updatePlayerHistorySort = jest.fn()
    customRender({ updatePlayerHistorySort })

    fireEvent.click(sortButton('Round'))

    expect(updatePlayerHistorySort).toHaveBeenCalledWith({ tab: 'history', sort: { 'rounds.deadlineTime': 'asc' } })
  })
})
