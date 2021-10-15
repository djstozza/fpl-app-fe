import { createMount } from '@material-ui/core/test-utils'

import MiniDraftPicksTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { MINI_DRAFT_PICKS, MINI_DRAFT_PICK_FACETS } from 'test/fixtures'
import { initialFilterState } from 'state/miniDraftPicks/reducer'
import { PLAYERS_URL } from 'utilities/constants'

const season = 'summer'

describe('MiniDraftPicksTable', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <MiniDraftPicksTable
        miniDraftPicks={{
          data: MINI_DRAFT_PICKS,
          facets: MINI_DRAFT_PICK_FACETS,
          meta: { total: MINI_DRAFT_PICKS.length },
          season
        }}
        fetchMiniDraftPicks={blank__}
        updateMiniDraftPicksSort={blank__}
        updateMiniDraftPicksFilter={blank__}
        fetchMiniDraftPickFacets={blank__}
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

    expect(link(wrapper, 1, 1).props().to).toEqual(`${PLAYERS_URL}/${MINI_DRAFT_PICKS[0].outPlayer.id}`)
    expect(link(wrapper, 1, 1).text())
      .toEqual(`${MINI_DRAFT_PICKS[0].outPlayer.firstName} ${MINI_DRAFT_PICKS[0].outPlayer.lastName}`)
    expect(link(wrapper, 1, 3).text())
      .toEqual(`${MINI_DRAFT_PICKS[0].inPlayer.firstName} ${MINI_DRAFT_PICKS[0].inPlayer.lastName}`)
    expect(tableCell(wrapper, 1, 6).text()).toEqual('No')

    expect(tableCell(wrapper, 3, 1).text()).toEqual('-')
    expect(tableCell(wrapper, 3, 2).text()).toEqual('-')
    expect(tableCell(wrapper, 3, 3).text()).toEqual('-')
    expect(tableCell(wrapper, 3, 4).text()).toEqual('-')
    expect(tableCell(wrapper, 3, 5).text()).toEqual('-')
    expect(tableCell(wrapper, 3, 6).text()).toEqual('Yes')
  })

  it('triggers fetchMiniDraftPicks on render', () => {
    const fetchMiniDraftPicks = jest.fn()
    render({ fetchMiniDraftPicks })

    expect(fetchMiniDraftPicks).toHaveBeenCalledWith(initialFilterState)
  })

  it('triggers fetchMiniDraftPickFacets on render', () => {
    const fetchMiniDraftPickFacets = jest.fn()
    render({ fetchMiniDraftPickFacets })

    expect(fetchMiniDraftPickFacets).toHaveBeenCalledWith()
  })

  it('triggers updateMiniDraftPicksSort', () => {
    const updateMiniDraftPicksSort = jest.fn()
    const wrapper = render({ updateMiniDraftPicksSort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')
    expect(updateMiniDraftPicksSort).toHaveBeenCalledWith({ pickNumber: 'desc' })
  })

  it('renders nothing if there is no season and does not trigger fetchMiniDraftPickFacets', () => {
    const fetchMiniDraftPickFacets = jest.fn()
    const wrapper = render({
      fetchMiniDraftPickFacets,
      miniDraftPicks: {
        data: MINI_DRAFT_PICKS,
        meta: { total: MINI_DRAFT_PICKS.length }
      }
    })

    expect(wrapper.html()).toEqual('')

    expect(fetchMiniDraftPickFacets).not.toHaveBeenCalled()
  })

  it('triggers updateMiniDraftPicksFilter', () => {
    const updateMiniDraftPicksFilter = jest.fn()
    const wrapper = render({ updateMiniDraftPicksFilter})

    wrapper.find('HeaderCell').at(7).find('button').simulate('click')

    menuItem(wrapper).at(0).simulate('click')
    menuItem(wrapper).at(1).simulate('click')

    wrapper.find('li').find('button').at(1).simulate('click')

    expect(updateMiniDraftPicksFilter).toHaveBeenCalledWith({
      fplTeamId: [
        MINI_DRAFT_PICK_FACETS.fplTeams[0].value,
        MINI_DRAFT_PICK_FACETS.fplTeams[1].value
      ]
    })
  })
})
