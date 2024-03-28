import { fireEvent, within, render, screen } from '@testing-library/react'

import ConnectedPlayersPage, { PlayersPage } from '.'
import { MockedRouterStore, MockedRouter, blank__ } from 'test/helpers'
import { TITLE, PLAYERS_URL, TEAMS_URL } from 'utilities/constants'
import { PLAYER_SUMMARIES, PLAYER_FACETS } from 'test/fixtures'
import { initialFilterState, initialState } from 'state/players/reducer'

const players = { data: PLAYER_SUMMARIES, meta: { total: PLAYER_SUMMARIES.length }, facets: PLAYER_FACETS }

describe('PlayersPage', () => {
  const connectedRender = (state = {}) => render(
    <MockedRouterStore
      defaultState={{
        players,
        ...state
      }}
    >
      <ConnectedPlayersPage />
    </MockedRouterStore>
  )

  const customRender = (props = {}) => render(
    <MockedRouter>
      <PlayersPage
        players={{...initialState, ...players }}
        fetchPlayers={blank__}
        fetchFacets={blank__}
        updateFilter={blank__}
        updateSort={blank__}
        updatePage={blank__}
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

  it('renders the players table and sets the document title', () => {
    connectedRender()

    expect(tableRows()).toHaveLength(PLAYER_SUMMARIES.length + 1)
    expect(link(2, 0)).toHaveAttribute('href', `${PLAYERS_URL}/${PLAYER_SUMMARIES[1].id}`)
    expect(link(2, 0)).toHaveTextContent(PLAYER_SUMMARIES[1].lastName)

    expect(link(1, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${PLAYER_SUMMARIES[0].id}`)
    expect(link(1, 1)).toHaveTextContent(PLAYER_SUMMARIES[0].firstName)

    expect(link(3, 2)).toHaveAttribute('href', `${TEAMS_URL}/${PLAYER_SUMMARIES[2].team.id}/`)
    expect(link(3, 2)).toHaveTextContent(PLAYER_SUMMARIES[2].team.shortName)
    expect(within(link(3, 2)).getByRole('img')).toHaveAttribute('alt', PLAYER_SUMMARIES[2].team.shortName)

    expect(document.title).toEqual(`${TITLE} - Players`)
  })

  it('triggers the fetchPlayers and fetchFacets function on load', () => {
    const fetchPlayers = jest.fn()
    const fetchFacets = jest.fn()
    customRender({ fetchPlayers, fetchFacets })

    expect(fetchPlayers).toHaveBeenCalledWith(initialFilterState)
    expect(fetchFacets).toHaveBeenCalled()
  })

  it('triggers updateSort', () => {
    const updateSort = jest.fn()
    customRender({ updateSort })

    fireEvent.click(sortButton('LN'))
    expect(updateSort).toHaveBeenCalledWith({ lastName: 'asc' })
  })

  it('triggers updateFilter', () => {
    const updateFilter = jest.fn()
    customRender({ updateFilter })

    fireEvent.click(within(columnHeaders()[2]).getByLabelText('filter'))
    fireEvent.click(checkboxes()[0])
    fireEvent.click(checkboxes()[3])
    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

    expect(updateFilter).toHaveBeenCalledWith({ teamId: [PLAYER_FACETS.teams[0].value, PLAYER_FACETS.teams[3].value] })
  })

  it('triggers updatePage', () => {
    const updatePage = jest.fn()
    const { page: { offset, limit } } = initialFilterState
    const playersArr = Array(limit + 1).fill(PLAYER_SUMMARIES[0])

    customRender({
      players: { data: playersArr, meta: { total: playersArr.length } },
      updatePage
    })

    expect(tablePagination()).toHaveTextContent(`1–${limit} of ${playersArr.length}`)
    fireEvent.click(screen.getByTitle('Go to next page'))
    expect(updatePage).toHaveBeenCalledWith(offset + limit)
  })
})
