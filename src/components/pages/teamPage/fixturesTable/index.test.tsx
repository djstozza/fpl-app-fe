import { fireEvent, render, screen, within } from '@testing-library/react'
import timezoneMock from 'timezone-mock'

import FixturesTable from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { TEAM_FIXTURES } from 'test/fixtures'
import { initialFilterState } from 'state/team/reducer'
import { ROUNDS_URL, TEAMS_URL } from 'utilities/constants'

describe('FixturesTable', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      team: { fixtures: TEAM_FIXTURES },
      teamId: '1',
      fetchTeamFixtures: blank__,
      updateTeamFixturesSort: blank__,
      setTab: blank__,
      ...context
    }
    
    return render(
      <RouteWithOutletContext context={baseContext}>
        <FixturesTable />
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

    expect(link(1, 0)).toHaveAttribute('href', `${ROUNDS_URL}/${TEAM_FIXTURES[0].round.id}`)
    expect(link(1, 0)).toHaveTextContent(TEAM_FIXTURES[0].round.name)

    expect(link(2, 1)).toHaveAttribute('href', `${TEAMS_URL}/${TEAM_FIXTURES[1].opponent.id}/fixtures`)
    expect(link(2, 1)).toHaveTextContent(TEAM_FIXTURES[1].opponent.shortName)
    expect(within(link(2, 1)).getByRole('img')).toHaveAttribute('alt', TEAM_FIXTURES[1].opponent.shortName)

    expect(tableCell(3, 3)).toHaveTextContent('16/08/21 01:00')

    expect(tableCell(1, 5))
      .toHaveTextContent(`${TEAM_FIXTURES[0].homeTeamScore} - ${TEAM_FIXTURES[0].awayTeamScore}`)
    expect(tableCell(3, 5)).toHaveTextContent('') // Upcoming fixtures do not show scores
  })

  it('triggers fetchTeamFixtures and setTab on render', () => {
    const fetchTeamFixtures = jest.fn()
    const setTab = jest.fn()
    customRender({ fetchTeamFixtures, setTab })

    expect(fetchTeamFixtures).toHaveBeenCalledWith({ id: '1', ...initialFilterState })
    expect(setTab).toHaveBeenCalledWith('fixtures')
  })

  it('triggers fetchTeamFixtures', () => {
    const updateTeamFixturesSort = jest.fn()
    customRender({ updateTeamFixturesSort })

    fireEvent.click(sortButton('Round'))

    expect(updateTeamFixturesSort).toHaveBeenCalledWith({ tab: 'fixtures', sort: { 'rounds.deadlineTime': 'asc' } })
  })
})
