import { render, screen, within, fireEvent } from '@testing-library/react'

import SortTable from '.'
import { SearchContext } from 'components/common/searchListener'
import { MockedRouter, blank__ } from 'test/helpers'
import { PLAYER_FACETS, PLAYER_SUMMARIES } from 'test/fixtures'
import { playersTableCells } from 'components/pages/playersPage'

const cells = Object.values(playersTableCells())
const offset = 0
const limit = 3

describe('SortTable', () => {
  const customRender = (props = {}, context = {}) => render(
    <MockedRouter>
      <SearchContext.Provider
        value={{
          search: {
            page: { offset, limit },
            sort: { totalPoints: 'desc' }
          },
          ...context
        }}
      >
        <SortTable
          collection={PLAYER_SUMMARIES}
          handleSortChange={blank__}
          handleFilterChange={blank__}
          handleChangePage={blank__}
          facets={PLAYER_FACETS}
          cells={cells}
          fetching={false}
          name='collection'
          {...props}
        />
      </SearchContext.Provider>
    </MockedRouter>
  )

  const sortTable = () => screen.getByTestId('SortTable')
  
  const tableRows = () => within(sortTable()).getAllByRole('row')
  
  const tableCells = (i) => within(tableRows()[i]).getAllByRole('cell')
  const tableCell = (i, j) => tableCells(i)[j]

  const sortButton = (text) => within(screen.getByText(text)).getByRole('button')
  const sortDirection = (text) => within(sortButton(text)).getByTestId('ArrowDownwardIcon')
  
  const tablePagination = () => screen.getByTestId('SortTablePagination')
  
  it('shows the no results found message if the collection is empty', () => {
    customRender({ collection: [] })
  
    expect(tableCell(1, 0)).toHaveTextContent('No results found')
  })

  it('shows the fetching message if fetching = true and the collection is empty', () => {
    customRender({ collection: [], fetching: true })
    expect(tableCell(1, 0)).toHaveTextContent('Loading collection...')
  })

  it('renders the table rows and cells', () => {
    customRender()
    
    expect(tableRows()).toHaveLength(PLAYER_SUMMARIES.length + 1)
    expect(tableCells(1)).toHaveLength(cells.length)
    expect(tableCell(4, 3)).toHaveTextContent(PLAYER_SUMMARIES[3].position.singularNameShort)
  })

  describe('sort', () => {
    test('desc -> asc', () => {
      const handleSortChange = jest.fn()
      customRender({ handleSortChange })

      fireEvent.click(sortButton('TP'))
      expect(handleSortChange).toHaveBeenCalledWith({ 'totalPoints': 'asc' })
    })

    test('asc -> desc', () => {
      const handleSortChange = jest.fn()

      customRender(
        { handleSortChange },
        {
          search: {
            page: { offset, limit },
            sort: { totalPoints: 'asc' }
          }
        }
      )

      fireEvent.click(sortButton('TP'))
      expect(handleSortChange).toHaveBeenCalledWith({ 'totalPoints': 'desc' })
    })

    test('none -> asc', () => {
      const handleSortChange = jest.fn()

      customRender(
        { handleSortChange },
        {
          search: {
            page: { offset, limit }
          }
        }
      )

      fireEvent.click(sortButton('TP'))
      expect(handleSortChange).toHaveBeenCalledWith({ 'totalPoints': 'asc' })
    })

    test('with a tab', () => {
      customRender(
        { tab: 'tab', collection: [] },
        {
          search: { sort: { tab: { totalPoints: 'desc' } } }
        }
      )
      
      expect(sortButton('FN').className).not.toContain('Mui-active')
      expect(sortDirection('FN').classList.toString()).toContain('MuiTableSortLabel-iconDirectionAsc')
      
      expect(sortButton('TP').className).toContain('Mui-active')      
      expect(sortDirection('TP').classList.toString()).toContain('MuiTableSortLabel-iconDirectionDesc')
    })
  })

  describe('pagination', () => {
    it('trggers changes in pagaination', () => {
      const handleChangePage = jest.fn()

      customRender({ handleChangePage })
      
      expect(tablePagination()).toHaveTextContent(`${1 + offset}–${offset + limit} of ${PLAYER_SUMMARIES.length}`)
      
      fireEvent.click(screen.getByTitle('Go to next page'))
      expect(handleChangePage).toHaveBeenCalledWith(offset + limit)
    })

    it('disables pagination if noOffset is true', () => {
      customRender({ noOffset: true })

      expect(tablePagination()).toHaveTextContent(`1–${PLAYER_SUMMARIES.length} of ${PLAYER_SUMMARIES.length}`)
      expect(screen.getByTitle('Go to next page').className).toContain('Mui-disabled')
    })

    it('uses the default pagination if none provided', () => {
      customRender(
        {},
        { search: undefined }
      )

      expect(tablePagination()).toHaveTextContent(`1–${offset + PLAYER_SUMMARIES.length} of ${PLAYER_SUMMARIES.length}`)
    })
  })
})
