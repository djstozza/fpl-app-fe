import { createMount } from '@material-ui/core/test-utils'

import TradeablePlayersTable from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { TITLE, PLAYERS_URL, TEAMS_URL } from 'utilities/constants'
import { PLAYER_SUMMARIES, DRAFT_PICK_STATUS, PLAYER_FACETS, LIST_POSITION_2 } from 'test/fixtures'
import { initialFilterState } from 'state/players/reducer'
import { playersTableCells } from 'components/pages/playersPage'

const players = { data: PLAYER_SUMMARIES, meta: { total: PLAYER_SUMMARIES.length }, facets: PLAYER_FACETS }
const cellNumber = Object.values(playersTableCells()).length

describe('TradeablePlayersTable', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <TradeablePlayersTable
        players={players}
        outListPosition={LIST_POSITION_2}
        fetchTradeablePlayers={blank__}
        fetchPlayerFacets={blank__}
        updateTradeablePlayersFilter={blank__}
        updateTradeablePlayersSort={blank__}
        updateTradeablePlayersPage={blank__}
        submitAction={blank__}
        isOwner
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

    expect(wrapper.find('WithStyles(ForwardRef(TableRow))')).toHaveLength(PLAYER_SUMMARIES.length + 1)
    expect(link(wrapper, 2, 0).props().to).toEqual(`${PLAYERS_URL}/${PLAYER_SUMMARIES[1].id}`)
    expect(link(wrapper, 2, 0).text()).toEqual(PLAYER_SUMMARIES[1].lastName)

    expect(link(wrapper, 1, 1).props().to).toEqual(`${PLAYERS_URL}/${PLAYER_SUMMARIES[0].id}`)
    expect(link(wrapper, 1, 1).text()).toEqual(PLAYER_SUMMARIES[0].firstName)

    expect(link(wrapper, 3, 2).props().to).toEqual(`${TEAMS_URL}/${PLAYER_SUMMARIES[2].team.id}/`)
    expect(link(wrapper, 3, 2).text()).toEqual(PLAYER_SUMMARIES[2].team.shortName)
    expect(link(wrapper, 3, 2).find('img').props().alt).toEqual(PLAYER_SUMMARIES[2].team.shortName)

    expect(headerCell(wrapper).length).toEqual(cellNumber + 1)
  })

  it('triggers the submit action - isWaiver false', () => {
    const submitAction = jest.fn()
    const wrapper = render({ submitAction })

    expect(headerCell(wrapper).length).toEqual(cellNumber + 1)

    expect(dialog(wrapper).props().open).toEqual(false)

    tableCell(wrapper, 1, cellNumber).find('button').simulate('click')

    expect(dialog(wrapper).props().open).toEqual(true)

    expect(dialog(wrapper).text()).toContain(
      `Confirm tradeOut: ${LIST_POSITION_2.player.firstName} ${LIST_POSITION_2.player.lastName}` +
      `In: ${PLAYER_SUMMARIES[0].firstName} ${PLAYER_SUMMARIES[0].lastName}` +
      `This trade cannot be reversed once confirmed`
    )

    dialog(wrapper).find('button').at(1).simulate('click')

    expect(dialog(wrapper).props().open).toEqual(false)

    expect(submitAction).toHaveBeenCalledWith(PLAYER_SUMMARIES[0].id)
  })

  it('triggers the submit action - isWaiver true', () => {
    const submitAction = jest.fn()
    const wrapper = render({ submitAction, isWaiver: true })

    expect(headerCell(wrapper).length).toEqual(cellNumber + 1)

    expect(dialog(wrapper).props().open).toEqual(false)

    tableCell(wrapper, 1, cellNumber).find('button').simulate('click')

    expect(dialog(wrapper).props().open).toEqual(true)
    expect(dialog(wrapper).text()).toContain(
      `Confirm waiver pickOut: ${LIST_POSITION_2.player.firstName} ${LIST_POSITION_2.player.lastName}` +
      `In: ${PLAYER_SUMMARIES[0].firstName} ${PLAYER_SUMMARIES[0].lastName}`
    )

    dialog(wrapper).find('button').at(1).simulate('click')

    expect(dialog(wrapper).props().open).toEqual(false)

    expect(submitAction).toHaveBeenCalledWith(PLAYER_SUMMARIES[0].id)
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

  it('triggers the fetchTradeablePlayers and fetchPlayerFacets function on load', () => {
    const fetchTradeablePlayers = jest.fn()
    const fetchPlayerFacets = jest.fn()
    const wrapper = render({ fetchTradeablePlayers, fetchPlayerFacets })

    expect(fetchTradeablePlayers).toHaveBeenCalledWith(initialFilterState)
    expect(fetchPlayerFacets).toHaveBeenCalled()
  })

  it('triggers updateTradeablePlayersSort', () => {
    const updateTradeablePlayersSort = jest.fn()
    const wrapper = render({ updateTradeablePlayersSort })

    tableCell(wrapper, 0, 0).find('WithStyles(ForwardRef(TableSortLabel))').simulate('click')
    expect(updateTradeablePlayersSort).toHaveBeenCalledWith({ lastName: 'asc' })
  })

  it('triggers updateTradeablePlayersFilter', () => {
    const updateTradeablePlayersFilter = jest.fn()
    const wrapper = render({ updateTradeablePlayersFilter })

    wrapper.find('HeaderCell').at(2).find('button').simulate('click')

    menuItem(wrapper).at(0).simulate('click')
    menuItem(wrapper).at(3).simulate('click')
    wrapper.find('li').find('button').at(1).simulate('click')

    expect(updateTradeablePlayersFilter)
      .toHaveBeenCalledWith({ teamId: [PLAYER_FACETS.teams[0].value, PLAYER_FACETS.teams[3].value] })
  })

  it('triggers updateTradeablePlayersPage', () => {
    const updateTradeablePlayersPage = jest.fn()
    const { page: { offset, limit } } = initialFilterState
    const playersArr = Array(limit + 1).fill(PLAYER_SUMMARIES[0])

    const wrapper = render({
      players: { data: playersArr, meta: { total: playersArr.length } },
      updateTradeablePlayersPage
    })

    expect(pagination(wrapper).text()).toEqual(`1-${limit} of ${playersArr.length}`)
    pagination(wrapper).find('button').at(1).simulate('click')
    expect(updateTradeablePlayersPage).toHaveBeenCalledWith(offset + limit)
  })

  it('does not show the trade column if isOwner = false', () => {
    const wrapper = render({ isOwner: false })

    expect(headerCell(wrapper).length).toEqual(cellNumber)
  })
})
