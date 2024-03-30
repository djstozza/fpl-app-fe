import { fireEvent, within, render, screen } from '@testing-library/react'

import ConnectedTeamsPage, { TeamsPage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import { TITLE, TEAMS_URL } from 'utilities/constants'
import { TEAMS } from 'test/fixtures'
import { initialFilterState, initialState } from 'state/teams/reducer'

describe('TeamsPage', () => {
  const connectedRender = (props = {}, state = {}) => render(
    <MockedRouterStore
      defaultState={{
        teams: { data: TEAMS },
        ...state
      }}
    >
      <ConnectedTeamsPage />
    </MockedRouterStore>
  )

  const customRender = (props = {}) => render(
    <MockedRouter>
      <TeamsPage
        teams={{ ...initialState, data: TEAMS }}
        fetchTeams={blank__}
        updateSort={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const sortTable = () => screen.getByTestId('SortTable')
  
  const tableRows = () => within(sortTable()).getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]
  const link = (i, j) => within(tableCell(i, j)).getByRole('link')
  const columnHeaders = () => screen.getAllByRole('columnheader')
  const checkboxes = () => screen.queryAllByRole('checkbox')

  const sortButton = (text) => within(screen.getByText(text)).getByRole('button')
  
  const tablePagination = () => screen.getByTestId('SortTablePagination')

  it('renders the teams  table and sets the document title', () => {
    connectedRender()

    expect(tableRows()).toHaveLength(TEAMS.length + 1)
    expect(link(2, 0)).toHaveAttribute('href', `${TEAMS_URL}/${TEAMS[1].id}/`)
    expect(link(2, 0)).toHaveTextContent(TEAMS[1].shortName)
    expect(within(link(2, 0)).getByRole('img')).toHaveAttribute('alt', TEAMS[1].shortName)

    expect(tableCell(4, 11)).toHaveTextContent(TEAMS[3].currentForm.join(''))

    expect(document.title).toEqual(`${TITLE} - Teams`)
  })

  it('triggers the fetchTeams function on load', () => {
    const fetchTeams = jest.fn()
    customRender({ fetchTeams })

    expect(fetchTeams).toHaveBeenCalledWith(initialFilterState)
  })

  it('triggers updateSort', () => {
    const updateSort = jest.fn()
    customRender({ updateSort })

    fireEvent.click(sortButton('N'))
    expect(updateSort).toHaveBeenCalledWith({ shortName: 'asc' })
  })
})
