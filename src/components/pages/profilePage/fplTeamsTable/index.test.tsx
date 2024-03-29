import { fireEvent, within, render, screen } from '@testing-library/react'

import FplTeamsTable from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { FPL_TEAMS } from 'test/fixtures'
import { initialFilterState } from 'state/fplTeams/reducer'
import {
  FPL_TEAMS_URL,
  LEAGUES_URL
} from 'utilities/constants'

describe('FplTeamsTable', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      fplTeams: { data: FPL_TEAMS },
      fetchFplTeams: blank__,
      updateFplTeamsSort: blank__,
      ...context
    }

    return render(
      <RouteWithOutletContext context={baseContext}>
        <FplTeamsTable />
      </RouteWithOutletContext>
    )
  }

  const sortTable = () => screen.getByTestId('SortTable')
  
  const tableRows = () => within(sortTable()).getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]
  const link = (i, j) => within(tableCell(i, j)).getByRole('link')

  const sortButton = (text) => within(screen.getByText(text)).getByRole('button')

  it('renders the fpl teams table', () => {
    customRender()

    expect(link(1, 0)).toHaveAttribute('href', `${FPL_TEAMS_URL}/${FPL_TEAMS[0].id}`)
    expect(link(1, 0)).toHaveTextContent(FPL_TEAMS[0].name)

    expect(link(2, 1)).toHaveAttribute('href', `${LEAGUES_URL}/${FPL_TEAMS[1].league.id}`)
    expect(link(2, 1)).toHaveTextContent(FPL_TEAMS[1].league.name)

    expect(tableCell(3, 2)).toHaveTextContent(String(FPL_TEAMS[2].rank))
  })

  it('triggers fetchFplTeams on render', () => {
    const fetchFplTeams = jest.fn()
    customRender({ fetchFplTeams })

    expect(fetchFplTeams).toHaveBeenCalledWith(initialFilterState)
  })

  it('triggers updateFplTeamsSort', () => {
    const updateFplTeamsSort = jest.fn()
    customRender({ updateFplTeamsSort })

    fireEvent.click(sortButton('N'))

    expect(updateFplTeamsSort).toHaveBeenCalledWith({ sort: { name: 'desc' } })
  })
})
