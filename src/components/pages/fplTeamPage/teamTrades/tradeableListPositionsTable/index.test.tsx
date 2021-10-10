import { createMount } from '@material-ui/core/test-utils'

import TradeableListPositionsTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { TITLE, PLAYERS_URL, TEAMS_URL } from 'utilities/constants'
import { LIST_POSITIONS, LIST_POSITION_FACETS, LIST_POSITION_2, INTER_TEAM_TRADE_GROUP_1 } from 'test/fixtures'
import { initialFilterState } from 'state/listPosition/reducer'
import { listPositionTableCells } from 'components/pages/fplTeamPage/listPositionsTable'

const listPosition = { tradeableListPositions: LIST_POSITIONS, facets: LIST_POSITION_FACETS }
const cellNumber = Object.values(listPositionTableCells()).length

describe('TradeableListPositionsTable', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <TradeableListPositionsTable
        listPosition={listPosition}
        outListPosition={LIST_POSITION_2}
        fetchTradeableListPositions={blank__}
        fetchTradeableListPositionFacets={blank__}
        updateTradeableListPositionsFilter={blank__}
        updateTradeableListPositionsSort={blank__}
        submitAction={blank__}
        isOwner
        deadline={new Date()}
        {...props}
      />
    </MockedRouter>
  )

  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )
  const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)
  const headerCell = wrapper =>  wrapper.find('HeaderCell')
  const filterButton = wrapper => headerCell(wrapper).find('button')
  const menuItem = wrapper => wrapper.find('WithStyles(ForwardRef(MenuItem))')
  const pagination = wrapper => wrapper.find('WithStyles(ForwardRef(TablePagination))')
  const dialog = wrapper => wrapper.find('WithStyles(ForwardRef(Dialog))')

  it('shows the player rows', () => {
    const wrapper = render()

    expect(wrapper.find('WithStyles(ForwardRef(TableRow))')).toHaveLength(LIST_POSITIONS.length + 1)
    expect(link(wrapper, 2, 0).props().to).toEqual(`${PLAYERS_URL}/${LIST_POSITIONS[1].player.id}`)
    expect(link(wrapper, 2, 0).text()).toEqual(LIST_POSITIONS[1].player.lastName)

    expect(link(wrapper, 1, 1).props().to).toEqual(`${PLAYERS_URL}/${LIST_POSITIONS[0].player.id}`)
    expect(link(wrapper, 1, 1).text()).toEqual(LIST_POSITIONS[0].player.firstName)

    expect(link(wrapper, 3, 2).props().to).toEqual(`${TEAMS_URL}/${LIST_POSITIONS[2].team.id}/`)
    expect(link(wrapper, 3, 2).text()).toEqual(LIST_POSITIONS[2].team.shortName)
    expect(link(wrapper, 3, 2).find('img').props().alt).toEqual(LIST_POSITIONS[2].team.shortName)

    expect(headerCell(wrapper).length).toEqual(cellNumber + 1)
  })


  it('triggers the submit action', () => {
    const submitAction = jest.fn()
    const wrapper = render({ submitAction, isWaiver: true })

    expect(headerCell(wrapper).length).toEqual(cellNumber + 1)

    expect(dialog(wrapper).props().open).toEqual(false)

    tableCell(wrapper, 1, cellNumber).find('button').simulate('click')

    expect(dialog(wrapper).props().open).toEqual(true)
    expect(dialog(wrapper).text()).toContain(
      `Confirm tradeOut: ${LIST_POSITION_2.player.firstName} ${LIST_POSITION_2.player.lastName}` +
      `In: ${LIST_POSITIONS[0].player.firstName} ${LIST_POSITIONS[0].player.lastName}`
    )

    dialog(wrapper).find('button').at(1).simulate('click')

    expect(dialog(wrapper).props().open).toEqual(false)

    expect(submitAction).toHaveBeenCalledWith(LIST_POSITIONS[0])
  })

  it('closes the draft dialog when cancel is clicked', () => {
    const submitAction = jest.fn()
    const wrapper = render({ submitAction })

    expect(headerCell(wrapper).length).toEqual(cellNumber + 1)

    expect(dialog(wrapper).props().open).toEqual(false)

    tableCell(wrapper, 1, cellNumber).find('button').simulate('click')

    expect(dialog(wrapper).props().open).toEqual(true)
    dialog(wrapper).find('button').at(0).simulate('click')

    expect(dialog(wrapper).props().open).toEqual(false)

    expect(submitAction).not.toHaveBeenCalled()
  })

  it('closes the draft dialog when cancel is clicked', () => {
    const submitAction = jest.fn()
    const wrapper = render({ submitAction })

    expect(headerCell(wrapper).length).toEqual(cellNumber + 1)

    expect(dialog(wrapper).props().open).toEqual(false)

    tableCell(wrapper, 1, cellNumber).find('button').simulate('click')

    wrapper.find('WithStyles(ForwardRef(Backdrop))').simulate('click')

    expect(dialog(wrapper).props().open).toEqual(false)

    expect(submitAction).not.toHaveBeenCalled()
  })

  it('triggers the fetchTradeableListPositions and fetchTradeableListPositionFacets function on load', () => {
    const fetchTradeableListPositions = jest.fn()
    const fetchTradeableListPositionFacets = jest.fn()
    const wrapper = render({ fetchTradeableListPositions, fetchTradeableListPositionFacets })

    expect(fetchTradeableListPositions).toHaveBeenCalledWith(initialFilterState)
    expect(fetchTradeableListPositionFacets).toHaveBeenCalled()
  })

  it('triggers updateTradeableListPositionsSort', () => {
    const updateTradeableListPositionsSort = jest.fn()
    const wrapper = render({ updateTradeableListPositionsSort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')
    expect(updateTradeableListPositionsSort).toHaveBeenCalledWith({ lastName: 'desc' })
  })

  it('triggers updateTradeableListPositionsFilter', () => {
    const updateTradeableListPositionsFilter = jest.fn()
    const wrapper = render({ updateTradeableListPositionsFilter })

    wrapper.find('HeaderCell').at(2).find('button').simulate('click')

    menuItem(wrapper).at(0).simulate('click')
    menuItem(wrapper).at(3).simulate('click')
    wrapper.find('li').find('button').at(1).simulate('click')

    expect(updateTradeableListPositionsFilter)
      .toHaveBeenCalledWith({ team_id: [LIST_POSITION_FACETS.teams[0].value, LIST_POSITION_FACETS.teams[3].value] })
  })

  it('does not show the trade column if isOwner = false', () => {
    const wrapper = render({ isOwner: false })

    expect(headerCell(wrapper).length).toEqual(cellNumber)
  })

  it('renders nothing if there is no outListPosition', () => {
    const wrapper = render({ outListPosition: undefined })

    expect(wrapper.html()).toEqual('')
  })

  it('includes the inFplTeamListId and excludedPlayerIds filters if an interTeamTradeGroup is present', () => {
    const fetchTradeableListPositions = jest.fn()
    const wrapper = render({ fetchTradeableListPositions, interTeamTradeGroup: INTER_TEAM_TRADE_GROUP_1 })

    expect(fetchTradeableListPositions).toHaveBeenCalledWith({
      ...initialFilterState,
      filter: {
        ...initialFilterState.filter,
        inFplTeamListId: INTER_TEAM_TRADE_GROUP_1.inFplTeamListId,
        excludedPlayerIds: INTER_TEAM_TRADE_GROUP_1.trades.map(({ inPlayer: { id } }) => id)
      }
    })
  })
})
