import { createMount } from '@material-ui/core/test-utils'

import DraftPicksTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { DRAFT_PICKS, DRAFT_PICK_FACETS } from 'test/fixtures'
import { initialFilterState } from 'state/draftPicks/reducer'
import { PLAYERS_URL } from 'utilities/constants'

describe('DraftPicksTable', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <DraftPicksTable
        draftPicks={{ data: DRAFT_PICKS, facets: DRAFT_PICK_FACETS, meta: { total: DRAFT_PICKS.length } }}
        fetchDraftPicks={blank__}
        updateDraftPicksSort={blank__}
        updateDraftPicksFilter={blank__}
        fetchDraftPickFacets={blank__}
        {...props}
      />
    </MockedRouter>
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )
  const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)
  const menuItem = wrapper => wrapper.find('WithStyles(ForwardRef(MenuItem))')

  it('renders the fpl teams table', () => {
    const wrapper = render()

    expect(link(wrapper, 1, 1).props().to).toEqual(`${PLAYERS_URL}/${DRAFT_PICKS[0].player.id}`)
    expect(link(wrapper, 1, 1).text()).toEqual(DRAFT_PICKS[0].player.lastName)
    expect(tableCell(wrapper, 1, 5).text()).toEqual('No')

    expect(tableCell(wrapper, 3, 1).text()).toEqual('-')
    expect(tableCell(wrapper, 3, 2).text()).toEqual('-')
    expect(tableCell(wrapper, 3, 3).text()).toEqual('-')
    expect(tableCell(wrapper, 3, 4).text()).toEqual('-')
    expect(tableCell(wrapper, 3, 5).text()).toEqual('Yes')

    expect(tableCell(wrapper, 4, 1).text()).toEqual('')
    expect(tableCell(wrapper, 4, 2).text()).toEqual('')
    expect(tableCell(wrapper, 4, 3).text()).toEqual('')
    expect(tableCell(wrapper, 4, 4).text()).toEqual('')
    expect(tableCell(wrapper, 4, 5).text()).toEqual('')
  })

  it('triggers fetchDraftPicks on render', () => {
    const fetchDraftPicks = jest.fn()
    render({ fetchDraftPicks })

    expect(fetchDraftPicks).toHaveBeenCalledWith(initialFilterState)
  })

  it('triggers fetchDraftPickFacets on render', () => {
    const fetchDraftPickFacets = jest.fn()
    render({ fetchDraftPickFacets })

    expect(fetchDraftPickFacets).toHaveBeenCalledWith()
  })

  it('triggers updateDraftPicksSort', () => {
    const updateDraftPicksSort = jest.fn()
    const wrapper = render({ updateDraftPicksSort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')
    expect(updateDraftPicksSort).toHaveBeenCalledWith({ pickNumber: 'desc' })
  })

  it('triggers updateDraftPicksFilter', () => {
    const updateDraftPicksFilter = jest.fn()
    const wrapper = render({ updateDraftPicksFilter})

    wrapper.find('HeaderCell').at(3).find('button').simulate('click')

    menuItem(wrapper).at(0).simulate('click')
    menuItem(wrapper).at(3).simulate('click')
    wrapper.find('li').find('button').at(1).simulate('click')

    expect(updateDraftPicksFilter)
      .toHaveBeenCalledWith({ teamId: [DRAFT_PICK_FACETS.teams[0].value, DRAFT_PICK_FACETS.teams[3].value] })
  })
})
