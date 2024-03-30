import { fireEvent, render, screen, within } from '@testing-library/react'
import timezoneMock from 'timezone-mock'

import PlayersTable from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { PLAYER_SUMMARIES } from 'test/fixtures'
import { initialFilterState } from 'state/team/reducer'
import { PLAYERS_URL } from 'utilities/constants'

describe('PlayersTable', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      players: { data: PLAYER_SUMMARIES },
      teamId: '1',
      fetchTeamPlayers: blank__,
      updateTeamPlayersSort: blank__,
      setTab: blank__,
      ...context
    }

    return render(
      <RouteWithOutletContext context={baseContext}>
        <PlayersTable />
      </RouteWithOutletContext>
    )
  }

  const sortTable = () => screen.getByTestId('SortTable')
  const tableRows = () => within(sortTable()).getAllByRole('row')
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]
  const link = (i, j) => within(tableCell(i, j)).getByRole('link')
  const sortButton = (text) => within(screen.getByLabelText(text)).getByRole('button')

  it('renders the team fixtures table', () => {
    timezoneMock.register('Australia/Adelaide')

    customRender()

    expect(link(1, 0)).toHaveAttribute('href', `${PLAYERS_URL}/${PLAYER_SUMMARIES[0].id}`)
    expect(link(1, 0)).toHaveTextContent(PLAYER_SUMMARIES[0].lastName)

    expect(link(2, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${PLAYER_SUMMARIES[1].id}`)
    expect(link(2, 1)).toHaveTextContent(PLAYER_SUMMARIES[1].firstName)

    expect(tableCell(3, 2)).toHaveTextContent(PLAYER_SUMMARIES[2].position.singularNameShort)

    expect(within(tableCell(4, 3)).getByTestId('CheckCircleIcon')).toBeInTheDocument()
  })

  it('triggers fetchTeamPlayers and setTab on render', () => {
    const fetchTeamPlayers = jest.fn()
    const setTab = jest.fn()
    customRender({ fetchTeamPlayers, setTab })

    expect(fetchTeamPlayers).toHaveBeenCalledWith({ id: '1', ...initialFilterState })
    expect(setTab).toHaveBeenCalledWith('players')
  })

  it('triggers updateTeamPlayersSort', () => {
    const updateTeamPlayersSort = jest.fn()
    customRender({ updateTeamPlayersSort })

    fireEvent.click(sortButton('Last Name'))
    expect(updateTeamPlayersSort).toHaveBeenCalledWith({ tab: 'players', sort: { lastName: 'asc' } })
  })
})
