import { fireEvent, render, screen, within } from '@testing-library/react'

import DraftPicksTable from '.'
import { RouteWithOutletContext, blank__ } from 'test/helpers'
import { DRAFT_PICKS, DRAFT_PICK_FACETS, DRAFT_PICK_1 } from 'test/fixtures'
import { initialFilterState } from 'state/draftPicks/reducer'
import { PLAYERS_URL } from 'utilities/constants'

describe('DraftPicksTable', () => {
  const customRender = (context = {}) => {
    const baseContext = {
      draftPicks: { data: DRAFT_PICKS, facets: DRAFT_PICK_FACETS, meta: { total: DRAFT_PICKS.length } },
      fetchDraftPicks: blank__,
      fupdateDraftPicksSort: blank__,
      updateDraftPicksFilter: blank__,
      fetchDraftPickFacets: blank__,
      setTab: blank__,
      ...context
    }

    return render(
      <RouteWithOutletContext context={baseContext}>
        <DraftPicksTable />
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

  it('renders the fpl teams table', () => {
    customRender()

    expect(link(1, 1)).toHaveAttribute('href', `${PLAYERS_URL}/${DRAFT_PICK_1.player.id}`)
    expect(link(1, 1)).toHaveTextContent(DRAFT_PICK_1.player.lastName)
    expect(tableCell(1, 5)).toHaveTextContent('No')

    expect(tableCell(3, 1)).toHaveTextContent('-')
    expect(tableCell(3, 2)).toHaveTextContent('-')
    expect(tableCell(3, 3)).toHaveTextContent('-')
    expect(tableCell(3, 4)).toHaveTextContent('-')
    expect(tableCell(3, 5)).toHaveTextContent('Yes')

    expect(tableCell(4, 1)).toHaveTextContent('')
    expect(tableCell(4, 2)).toHaveTextContent('')
    expect(tableCell(4, 3)).toHaveTextContent('')
    expect(tableCell(4, 4)).toHaveTextContent('')
    expect(tableCell(4, 5)).toHaveTextContent('')
  })

  it('triggers fetchDraftPicks on render', () => {
    const fetchDraftPicks = jest.fn()
    customRender({ fetchDraftPicks })

    expect(fetchDraftPicks).toHaveBeenCalledWith(initialFilterState)
  })

  it('triggers fetchDraftPickFacets on render', () => {
    const fetchDraftPickFacets = jest.fn()
    customRender({ fetchDraftPickFacets })

    expect(fetchDraftPickFacets).toHaveBeenCalledWith()
  })

  it('triggers updateDraftPicksSort', () => {
    const updateDraftPicksSort = jest.fn()
    customRender({ updateDraftPicksSort })

    fireEvent.click(within(columnHeaders()[0]).getByTestId('ArrowDownwardIcon'))
    expect(updateDraftPicksSort).toHaveBeenCalledWith({ pickNumber: 'desc' })
  })

  it('triggers updateDraftPicksFilter', () => {
    const updateDraftPicksFilter = jest.fn()

    customRender({ updateDraftPicksFilter })

    fireEvent.click(within(columnHeaders()[3]).getByLabelText('filter'))
    fireEvent.click(checkboxes()[0])
    fireEvent.click(checkboxes()[3])
    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

    expect(updateDraftPicksFilter)
      .toHaveBeenCalledWith({ teamId: [DRAFT_PICK_FACETS.teams[0].value, DRAFT_PICK_FACETS.teams[3].value] })
  })
})
