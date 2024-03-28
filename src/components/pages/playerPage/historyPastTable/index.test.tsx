import { fireEvent, render, screen, within } from '@testing-library/react'
import { Navigate } from 'react-router-dom'

import HistoryPastTable from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { PLAYER_HISTORY_PAST } from 'test/fixtures'
import { initialFilterState } from 'state/player/reducer'
import { PLAYERS_URL } from 'utilities/constants'

const playerId = '1'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: jest.fn()
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('HistoryPastTable', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      player: { data: { hasHistoryPast: true }, historyPast: PLAYER_HISTORY_PAST },
      playerId: playerId,
      fetchPlayerHistoryPast: blank__,
      updatePlayerHistoryPastSort: blank__,
      setTab: blank__,
      ...context
    }
    return render(
      <RouteWithOutletContext context={baseContext}>
        <HistoryPastTable />
      </RouteWithOutletContext>
    )
  }

  const sortTable = () => screen.getByTestId('SortTable')
  
  const tableRows = () => within(sortTable()).getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]

  const sortButton = (text) => within(screen.getByLabelText(text)).getByRole('button')

  it('redirects to the player details page if hasHistoryPast = false', () => {
    customRender({ player: { data: { hasHistoryPast: false }, historyPast: undefined } })

    expect(Navigate).toHaveBeenCalledWith(
      { to: `${PLAYERS_URL}/${playerId}` },
      {}
    )
  })

  it('renders the team fixtures table', () => {
    customRender()

    expect(tableCell(2, 6)).toHaveTextContent(String(PLAYER_HISTORY_PAST[1].redCards))
    expect(tableCell(3, 2)).toHaveTextContent(String(PLAYER_HISTORY_PAST[2].totalPoints))
  })

  it('triggers fetchPlayerHistoryPast, setTab on render', () => {
    const fetchPlayerHistoryPast = jest.fn()
    const setTab = jest.fn()
    customRender({ fetchPlayerHistoryPast, setTab })

    expect(fetchPlayerHistoryPast).toHaveBeenCalledWith({ id: '1', ...initialFilterState })
    expect(setTab).toHaveBeenCalledWith('historyPast')
  })

  it('triggers updatePlayerHistoryPastSort', () => {
    const updatePlayerHistoryPastSort = jest.fn()
    customRender({ updatePlayerHistoryPastSort })

   fireEvent.click(sortButton('Season'))

    expect(updatePlayerHistoryPastSort).toHaveBeenCalledWith({ tab: 'historyPast', sort: { seasonName: 'asc' } })
  })
})
