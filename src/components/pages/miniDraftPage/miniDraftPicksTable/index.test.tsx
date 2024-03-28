import { fireEvent, render, screen, within } from '@testing-library/react'

import MiniDraftPicksTable from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { 
  MINI_DRAFT_PICKS,
  MINI_DRAFT_PICK_1,
  MINI_DRAFT_PICK_FACETS
} from 'test/fixtures'
import { initialFilterState } from 'state/miniDraftPicks/reducer'
import { PLAYERS_URL } from 'utilities/constants'

const season = 'summer'

describe('MiniDraftPicksTable', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      miniDraftPicks: {
        data: MINI_DRAFT_PICKS,
        facets: MINI_DRAFT_PICK_FACETS,
        meta: { total: MINI_DRAFT_PICKS.length },
        season
      },
      fetchMiniDraftPicks: blank__,
      updateMiniDraftPicksSort: blank__,
      updateMiniDraftPicksFilter: blank__,
      fetchMiniDraftPickFacets: blank__,
      setTab: blank__,
      setAction: blank__,
      ...context
    }

    return render(
      <RouteWithOutletContext context={baseContext}>
        <MiniDraftPicksTable />
      </RouteWithOutletContext>
    )
  }
  
  const sortTable = () => screen.getByTestId('SortTable')
  
  const tableRows = () => within(sortTable()).getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]
  const link = (i, j) => within(tableCell(i, j)).getByRole('link')
  const columnHeaders = () => screen.getAllByRole('columnheader')
  const checkboxes = () => screen.queryAllByRole('checkbox')

  const sortButton = (text) => within(screen.getByText(text)).getByRole('button')

  it('renders the fpl teams table', () => {
    customRender()

    expect(screen.getByTestId('MiniDraftPicksTable')).toBeInTheDocument()

    expect(link(1, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${MINI_DRAFT_PICK_1.outPlayer.id}`)
    expect(link(1, 1))
      .toHaveTextContent(`${MINI_DRAFT_PICK_1.outPlayer.firstName} ${MINI_DRAFT_PICK_1.outPlayer.lastName}`)
    expect(link(1, 3))
      .toHaveTextContent(`${MINI_DRAFT_PICK_1.inPlayer.firstName} ${MINI_DRAFT_PICK_1.inPlayer.lastName}`)
    expect(tableCell(1, 6)).toHaveTextContent('No')

    expect(tableCell(3, 1)).toHaveTextContent('-')
    expect(tableCell(3, 2)).toHaveTextContent('-')
    expect(tableCell(3, 3)).toHaveTextContent('-')
    expect(tableCell(3, 4)).toHaveTextContent('-')
    expect(tableCell(3, 5)).toHaveTextContent('-')
    expect(tableCell(3, 6)).toHaveTextContent('Yes')
  })

  it('triggers fetchMiniDraftPicks, setTab on render', () => {
    const fetchMiniDraftPicks = jest.fn()
    const setTab = jest.fn()

    customRender({ 
      fetchMiniDraftPicks,
      setTab
    })

    expect(fetchMiniDraftPicks).toHaveBeenCalledWith(initialFilterState)
    expect(setTab).toHaveBeenCalledWith('miniDraftPicks')
  })

  it('triggers fetchMiniDraftPickFacets on render', () => {
    const fetchMiniDraftPickFacets = jest.fn()
    customRender({ fetchMiniDraftPickFacets })

    expect(fetchMiniDraftPickFacets).toHaveBeenCalledWith()
  })

  it('triggers updateMiniDraftPicksSort', () => {
    const updateMiniDraftPicksSort = jest.fn()
    customRender({ updateMiniDraftPicksSort })

    fireEvent.click(sortButton('PN'))
    expect(updateMiniDraftPicksSort).toHaveBeenCalledWith({ pickNumber: 'desc' })
  })

  it('renders nothing if there is no season and does not trigger fetchMiniDraftPickFacets', () => {
    const fetchMiniDraftPickFacets = jest.fn()
    
    customRender({
      fetchMiniDraftPickFacets,
      miniDraftPicks: {
        data: MINI_DRAFT_PICKS,
        meta: { total: MINI_DRAFT_PICKS.length }
      }
    })

    expect(screen.queryByTestId('MiniDraftPicksTable')).not.toBeInTheDocument()

    expect(fetchMiniDraftPickFacets).not.toHaveBeenCalled()
  })

  it('triggers updateMiniDraftPicksFilter', () => {
    const updateMiniDraftPicksFilter = jest.fn()
    customRender({ updateMiniDraftPicksFilter})


    fireEvent.click(within(columnHeaders()[7]).getByLabelText('filter'))
    fireEvent.click(checkboxes()[0])
    fireEvent.click(checkboxes()[1])
    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

    expect(updateMiniDraftPicksFilter).toHaveBeenCalledWith({
      fplTeamId: [
        MINI_DRAFT_PICK_FACETS.fplTeams[0].value,
        MINI_DRAFT_PICK_FACETS.fplTeams[1].value
      ]
    })
  })
})
