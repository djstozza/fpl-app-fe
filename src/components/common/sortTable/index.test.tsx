import { createMount } from '@material-ui/core/test-utils'

import SortTable from '.'
import { SearchContext } from 'components/common/searchListener'
import { MockedRouter, blank__ } from 'test/helpers'
import { PLAYER_FACETS, PLAYER_SUMMARIES } from 'test/fixtures'
import { playersTableCells } from 'components/pages/playersPage'

const cells = Object.values(playersTableCells())
const offset = 0
const limit = 3

describe('SortTable', () => {
  const render = (props = {}, context = {}) => createMount()(
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

  const sortLabel = wrapper => wrapper.find('WithStyles(ForwardRef(TableSortLabel))')
  const tableBodyRows = (wrapper, row) => {
    const base = wrapper.find('WithStyles(ForwardRef(TableBody))').find('WithStyles(ForwardRef(TableRow))')
     return row !== undefined ? base.at(row) : base
  }
  const tableCell = (wrapper, row) => tableBodyRows(wrapper, row).find('WithStyles(ForwardRef(TableCell))')
  const headerCell = wrapper => wrapper.find('HeaderCell')
  const tablePagination = wrapper => wrapper.find('WithStyles(ForwardRef(TablePagination))')
  const button = wrapper => wrapper.find('button')

  it('shows the no results found message if the collection is empty', () => {
    const wrapper = render({ collection: [] })

    expect(tableCell(wrapper).text()).toEqual('No results found')
  })

  it('shows the fetching message if fetching = true and the collection is empty', () => {
    const wrapper = render({ collection: [], fetching: true })

    expect(tableCell(wrapper).text()).toEqual('Loading collection...')
  })

  it('renders the table rows and cells', () => {
    const wrapper = render()
    expect(headerCell(wrapper)).toHaveLength(cells.length)
    expect(tableBodyRows(wrapper)).toHaveLength(PLAYER_SUMMARIES.length)
    expect(tableCell(wrapper, 0)).toHaveLength(cells.length)

    expect(tableCell(wrapper, 3).at(3).html()).toContain(PLAYER_SUMMARIES[3].position.singularNameShort)
  })

  describe('sort', () => {
    test('desc -> asc', () => {
      const handleSortChange = jest.fn()
      const wrapper = render({ handleSortChange })

      sortLabel(wrapper).at(4).simulate('click') // Total points sort label
      expect(handleSortChange).toBeCalledWith({ 'totalPoints': 'asc' })
    })

    test('asc -> desc', () => {
      const handleSortChange = jest.fn()

      const wrapper = render(
        { handleSortChange },
        {
          search: {
            page: { offset, limit },
            sort: { totalPoints: 'asc' }
          }
        }
      )

      sortLabel(wrapper).at(4).simulate('click') // Total points sort label
      expect(handleSortChange).toBeCalledWith({ totalPoints: 'desc' })
    })

    test('none -> asc', () => {
      const handleSortChange = jest.fn()

      const wrapper = render(
        { handleSortChange },
        {
          search: {
            page: { offset, limit }
          }
        }
      )

      sortLabel(wrapper).at(4).simulate('click') // Total points sort label
      expect(handleSortChange).toBeCalledWith({ totalPoints: 'asc' })
    })

    test('with a tab', () => {
      const wrapper = render(
        { tab: 'tab' },
        {
          search: { sort: { tab: { totalPoints: 'asc' } } }
        }
      )
      expect(wrapper.find('HeaderCell').at(4).props().sort).toEqual({ totalPoints: 'asc' })
    })
  })

  describe('pagination', () => {
    it('trggers changes in pagaination', () => {
      const handleChangePage = jest.fn()

      const wrapper = render({ handleChangePage })
      expect(tablePagination(wrapper).text()).toEqual(`${1 + offset}-${offset + limit} of ${PLAYER_SUMMARIES.length}`)
      button(wrapper).at(4).simulate('click')
      expect(handleChangePage).toHaveBeenCalledWith(3)
    })

    it('disables pagination if noOffset is true', () => {
      const wrapper = render({ noOffset: true })

      expect(tablePagination(wrapper).text())
        .toEqual(`1-${offset + PLAYER_SUMMARIES.length} of ${PLAYER_SUMMARIES.length}`)
    })

    it('uses the default pagination if none provided', () => {
      const wrapper = render(
        {},
        { search: undefined }
      )

      expect(tablePagination(wrapper).text())
        .toEqual(`1-${offset + PLAYER_SUMMARIES.length} of ${PLAYER_SUMMARIES.length}`)
    })
  })
})
