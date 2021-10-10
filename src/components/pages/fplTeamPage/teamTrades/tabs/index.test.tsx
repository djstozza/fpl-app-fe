import { createMount } from '@material-ui/core/test-utils'

import TeamTradeTabs from '.'
import { MockedRouter, blank__ } from 'test/helpers'
import { INTER_TEAM_TRADE_GROUPS, FPL_TEAM_LISTS } from 'test/fixtures'
import { PLAYERS_URL, TEAMS_URL, FPL_TEAMS_URL } from 'utilities/constants'

const fplTeamId = '3'
const fplTeamName = 'Fpl Team Name'

describe('TeamTradeTabs', () => {
  const render = (props = {}) => createMount()(
    <MockedRouter>
      <TeamTradeTabs
        isOwner
        interTeamTradeGroups={{ data: INTER_TEAM_TRADE_GROUPS }}
        fetchInterTeamTradeGroups={blank__}
        fplTeamList={{ data: FPL_TEAM_LISTS[0] }}
        fplTeamLists={{ data: FPL_TEAM_LISTS }}
        deadline={new Date()}
        selectedFplTeamListId={FPL_TEAM_LISTS[0].id}
        fplTeamId={fplTeamId}
        removeTrade={blank__}
        fplTeamName={fplTeamName}
        {...props}
      />
    </MockedRouter>
  )

  const tabs = wrapper => wrapper.find('Tabs').find('WithStyles(ForwardRef(Tab))')
  const tableCell = (wrapper, i, j) => (
    wrapper.find('WithStyles(ForwardRef(TableRow))').at(i).find('WithStyles(ForwardRef(TableCell))').at(j)
  )
  const link = (wrapper, i, j) => tableCell(wrapper, i, j).find('Link').at(0)
  const iconButton = (wrapper, i, j) => tableCell(wrapper, i, j).find('WithStyles(ForwardRef(IconButton))')
  const button = (wrapper, i, j) => tableCell(wrapper, i, j).find('button')
  const dialog = wrapper => wrapper.find('WithStyles(ForwardRef(Dialog))')

  it('renders the outTrades by default', () => {
    const wrapper = render()
    expect(tabs(wrapper)).toHaveLength(2)

    expect(tabs(wrapper).at(0).props().selected).toEqual(true)

    const { outTradeGroups } = INTER_TEAM_TRADE_GROUPS

    expect(tableCell(wrapper, 1, 1).text()).toEqual(outTradeGroups[0].inFplTeam.name)
    expect(tableCell(wrapper, 1, 2).text()).toEqual(outTradeGroups[0].status)
    expect(iconButton(wrapper, 1, 3).props().title).toEqual('Cancel') // canApprove, canSubmit are false but canCancel = true

    expect(tableCell(wrapper, 2, 1).text()).toEqual(outTradeGroups[1].inFplTeam.name)
    expect(tableCell(wrapper, 2, 2).text()).toEqual(outTradeGroups[1].status)
    expect(iconButton(wrapper, 2, 3).at(0).props().title).toEqual('Cancel')
    expect(iconButton(wrapper, 2, 3).at(1).props()).toMatchObject({
      to: `${FPL_TEAMS_URL}/${fplTeamId}/teamTrades/${outTradeGroups[1].id}/addPlayer`,
      title: 'Add player'
    })
    expect(iconButton(wrapper, 2, 3).at(2).props().title).toEqual('Submit')

    expect(tableCell(wrapper, 3, 1).text()).toEqual(outTradeGroups[2].inFplTeam.name)
    expect(tableCell(wrapper, 3, 2).text()).toEqual(outTradeGroups[2].status)
    expect(iconButton(wrapper, 3, 3)).toHaveLength(0) // canApprove, canSubmit and canCancel are all false

    tableCell(wrapper, 1, 0).find('button').simulate('click') // Expand to show trades

    expect(link(wrapper, 4, 1).props().to).toEqual(`${PLAYERS_URL}/${outTradeGroups[0].trades[0].outPlayer.id}`)
    expect(link(wrapper, 4, 1).text())
      .toEqual(`${outTradeGroups[0].trades[0].outPlayer.firstName} ${outTradeGroups[0].trades[0].outPlayer.lastName}`)

    expect(link(wrapper, 4, 2).props().to).toEqual(`${TEAMS_URL}/${outTradeGroups[0].trades[0].outTeam.id}/`)
    expect(link(wrapper, 4, 2).text()).toEqual(`${outTradeGroups[0].trades[0].outTeam.shortName}`)

    expect(link(wrapper, 4, 3).props().to).toEqual(`${PLAYERS_URL}/${outTradeGroups[0].trades[0].inPlayer.id}`)
    expect(link(wrapper, 4, 3).text())
      .toEqual(`${outTradeGroups[0].trades[0].inPlayer.firstName} ${outTradeGroups[0].trades[0].inPlayer.lastName}`)

    expect(link(wrapper, 4, 4).props().to).toEqual(`${TEAMS_URL}/${outTradeGroups[0].trades[0].inTeam.id}/`)
    expect(link(wrapper, 4, 4).text()).toEqual(`${outTradeGroups[0].trades[0].inTeam.shortName}`)

    expect(tableCell(wrapper, 4, 5).text()).toEqual(`${outTradeGroups[0].trades[0].position}`)

    expect(iconButton(wrapper, 4, 6).at(0).props().title).toEqual('Remove player') // Can cancel = true

    expect(link(wrapper, 5, 1).props().to).toEqual(`${PLAYERS_URL}/${outTradeGroups[0].trades[1].outPlayer.id}`)
    expect(link(wrapper, 5, 1).text())
      .toEqual(`${outTradeGroups[0].trades[1].outPlayer.firstName} ${outTradeGroups[0].trades[1].outPlayer.lastName}`)

    expect(link(wrapper, 5, 2).props().to).toEqual(`${TEAMS_URL}/${outTradeGroups[0].trades[1].outTeam.id}/`)
    expect(link(wrapper, 5, 2).text()).toEqual(`${outTradeGroups[0].trades[1].outTeam.shortName}`)

    expect(link(wrapper, 5, 3).props().to).toEqual(`${PLAYERS_URL}/${outTradeGroups[0].trades[1].inPlayer.id}`)
    expect(link(wrapper, 5, 3).text())
      .toEqual(`${outTradeGroups[0].trades[1].inPlayer.firstName} ${outTradeGroups[0].trades[1].inPlayer.lastName}`)

    expect(link(wrapper, 5, 4).props().to).toEqual(`${TEAMS_URL}/${outTradeGroups[0].trades[1].inTeam.id}/`)
    expect(link(wrapper, 5, 4).text()).toEqual(`${outTradeGroups[0].trades[1].inTeam.shortName}`)

    expect(tableCell(wrapper, 5, 5).text()).toEqual(`${outTradeGroups[0].trades[1].position}`)

    expect(iconButton(wrapper, 5, 6).props().title).toEqual('Remove player') // Can cancel = true

    tableCell(wrapper, 1, 0).find('button').simulate('click') // Close expandlable row

    tableCell(wrapper, 3, 0).find('button').simulate('click')

    expect(link(wrapper, 6, 1).props().to).toEqual(`${PLAYERS_URL}/${outTradeGroups[2].trades[0].outPlayer.id}`)
    expect(link(wrapper, 6, 1).text())
      .toEqual(`${outTradeGroups[2].trades[0].outPlayer.firstName} ${outTradeGroups[2].trades[0].outPlayer.lastName}`)

    expect(link(wrapper, 6, 2).props().to).toEqual(`${TEAMS_URL}/${outTradeGroups[2].trades[0].outTeam.id}/`)
    expect(link(wrapper, 6, 2).text()).toEqual(`${outTradeGroups[2].trades[0].outTeam.shortName}`)

    expect(link(wrapper, 6, 3).props().to).toEqual(`${PLAYERS_URL}/${outTradeGroups[2].trades[0].inPlayer.id}`)
    expect(link(wrapper, 6, 3).text())
      .toEqual(`${outTradeGroups[2].trades[0].inPlayer.firstName} ${outTradeGroups[2].trades[0].inPlayer.lastName}`)

    expect(link(wrapper, 6, 4).props().to).toEqual(`${TEAMS_URL}/${outTradeGroups[2].trades[0].inTeam.id}/`)
    expect(link(wrapper, 6, 4).text()).toEqual(`${outTradeGroups[2].trades[0].inTeam.shortName}`)

    expect(tableCell(wrapper, 6, 5).text()).toEqual(`${outTradeGroups[2].trades[0].position}`)

    expect(iconButton(wrapper, 6, 6).at(0)).toHaveLength(0) // Can cancel = false
  })

  it('renders the inTrades if the action = in', () => {
    const wrapper = render({ action: 'in' })
    const { inTradeGroups } = INTER_TEAM_TRADE_GROUPS

    expect(tableCell(wrapper, 1, 1).text()).toEqual(inTradeGroups[0].outFplTeam.name)
    expect(tableCell(wrapper, 1, 2).text()).toEqual(inTradeGroups[0].status)

    expect(iconButton(wrapper, 1, 3).at(0).props().title).toEqual('Approve')
    expect(iconButton(wrapper, 1, 3).at(1).props().title).toEqual('Decline')

    expect(tableCell(wrapper, 2, 1).text()).toEqual(inTradeGroups[1].outFplTeam.name)
    expect(tableCell(wrapper, 2, 2).text()).toEqual(inTradeGroups[1].status)
    expect(iconButton(wrapper, 2, 3)).toHaveLength(0) // canApprove, canSubmit and canCancel are all false

    tableCell(wrapper, 1, 0).find('button').simulate('click') // Expand to show trades

    expect(link(wrapper, 4, 1).props().to).toEqual(`${PLAYERS_URL}/${inTradeGroups[0].trades[0].inPlayer.id}`)
    expect(link(wrapper, 4, 1).text())
      .toEqual(`${inTradeGroups[0].trades[0].inPlayer.firstName} ${inTradeGroups[0].trades[0].inPlayer.lastName}`)

    expect(link(wrapper, 4, 2).props().to).toEqual(`${TEAMS_URL}/${inTradeGroups[0].trades[0].inTeam.id}/`)
    expect(link(wrapper, 4, 2).text()).toEqual(`${inTradeGroups[0].trades[0].inTeam.shortName}`)

    expect(link(wrapper, 4, 3).props().to).toEqual(`${PLAYERS_URL}/${inTradeGroups[0].trades[0].outPlayer.id}`)
    expect(link(wrapper, 4, 3).text())
      .toEqual(`${inTradeGroups[0].trades[0].outPlayer.firstName} ${inTradeGroups[0].trades[0].outPlayer.lastName}`)

    expect(link(wrapper, 4, 4).props().to).toEqual(`${TEAMS_URL}/${inTradeGroups[0].trades[0].outTeam.id}/`)
    expect(link(wrapper, 4, 4).text()).toEqual(`${inTradeGroups[0].trades[0].outTeam.shortName}`)

    expect(tableCell(wrapper, 4, 5).text()).toEqual(`${inTradeGroups[0].trades[0].position}`)
  })

  it('can submit an inter team trade', () => {
    const submitInterTeamTradeGroup = jest.fn()
    const wrapper = render({ submitInterTeamTradeGroup })

    button(wrapper, 2, 3).at(1).simulate('click')

    const { outTradeGroups } = INTER_TEAM_TRADE_GROUPS
    const { trades } = outTradeGroups[1]
    const {
      outPlayer: { firstName: outFirstName, lastName: outLastName },
      inPlayer: { firstName: inFirstName, lastName: inLastName }
    } = trades[0]

    expect(dialog(wrapper).text())
      .toContain(`Confirm SubmitOut: ${outFirstName} ${outLastName}In: ${inFirstName} ${inLastName}`)

    dialog(wrapper).find('button').at(1).simulate('click')
    expect(dialog(wrapper).props().open).toEqual(false)

    expect(submitInterTeamTradeGroup).toHaveBeenCalledWith(outTradeGroups[1].id)
  })

  it('can close the dialog without triggering the confirm action', () => {
    const submitInterTeamTradeGroup = jest.fn()
    const wrapper = render({ submitInterTeamTradeGroup })

    button(wrapper, 2, 3).at(1).simulate('click')

    dialog(wrapper).find('button').at(0).simulate('click')
    expect(dialog(wrapper).props().open).toEqual(false)

    expect(submitInterTeamTradeGroup).not.toHaveBeenCalled()
  })

  it('closes the draft dialog when the backdrop is clicked without triggering the confirm action', () => {
    const submitInterTeamTradeGroup = jest.fn()
    const wrapper = render({ submitInterTeamTradeGroup })

    button(wrapper, 2, 3).at(1).simulate('click')

    wrapper.find('WithStyles(ForwardRef(Backdrop))').simulate('click')
    expect(dialog(wrapper).props().open).toEqual(false)

    expect(dialog(wrapper).props().open).toEqual(false)

    expect(submitInterTeamTradeGroup).not.toHaveBeenCalled()
  })

  it('can cancel an inter team trade', () => {
    const cancelInterTeamTradeGroup = jest.fn()
    const wrapper = render({ cancelInterTeamTradeGroup })

    button(wrapper, 2, 3).at(0).simulate('click')

    const { outTradeGroups } = INTER_TEAM_TRADE_GROUPS
    const { trades } = outTradeGroups[1]
    const {
      outPlayer: { firstName: outFirstName, lastName: outLastName },
      inPlayer: { firstName: inFirstName, lastName: inLastName }
    } = trades[0]

    expect(dialog(wrapper).text())
      .toContain(`Confirm CancelOut: ${outFirstName} ${outLastName}In: ${inFirstName} ${inLastName}`)

    dialog(wrapper).find('button').at(1).simulate('click')
    expect(dialog(wrapper).props().open).toEqual(false)

    expect(cancelInterTeamTradeGroup).toHaveBeenCalledWith(outTradeGroups[1].id)
  })

  it('can remove a trade from an inter team trade group', () => {
    const removeTrade = jest.fn()
    const wrapper = render({ removeTrade })
    button(wrapper, 1, 0).simulate('click')
    button(wrapper, 5, 6).simulate('click')

    const { outTradeGroups } = INTER_TEAM_TRADE_GROUPS
    const { trades } = outTradeGroups[0]
    const {
      outPlayer: { firstName: outFirstName, lastName: outLastName },
      inPlayer: { firstName: inFirstName, lastName: inLastName }
    } = trades[1]

    expect(dialog(wrapper).text())
      .toContain(`Confirm Remove TradeOut: ${outFirstName} ${outLastName}In: ${inFirstName} ${inLastName}`)

    dialog(wrapper).find('button').at(1).simulate('click')
    expect(dialog(wrapper).props().open).toEqual(false)

    expect(removeTrade).toHaveBeenCalledWith(trades[1].id)
  })

  it('can approve an inter team trade', () => {
    const approveInterTeamTradeGroup = jest.fn()
    const wrapper = render({ approveInterTeamTradeGroup, action: 'in' })

    button(wrapper, 1, 3).at(0).simulate('click')

    const { inTradeGroups } = INTER_TEAM_TRADE_GROUPS
    const { trades } = inTradeGroups[0]
    const {
      outPlayer: { firstName: outFirstName, lastName: outLastName },
      inPlayer: { firstName: inFirstName, lastName: inLastName }
    } = trades[0]

    expect(dialog(wrapper).text())
      .toContain(`Confirm ApproveOut: ${inFirstName} ${inLastName}In: ${outFirstName} ${outLastName}`)

    dialog(wrapper).find('button').at(1).simulate('click')
    expect(dialog(wrapper).props().open).toEqual(false)

    expect(approveInterTeamTradeGroup).toHaveBeenCalledWith(inTradeGroups[0].id)
  })

  it('can decline an inter team trade', () => {
    const declineInterTeamTradeGroup = jest.fn()
    const wrapper = render({ declineInterTeamTradeGroup, action: 'in' })

    button(wrapper, 1, 3).at(1).simulate('click')

    const { inTradeGroups } = INTER_TEAM_TRADE_GROUPS
    const { trades } = inTradeGroups[0]
    const {
      outPlayer: { firstName: outFirstName, lastName: outLastName },
      inPlayer: { firstName: inFirstName, lastName: inLastName }
    } = trades[0]

    expect(dialog(wrapper).text())
      .toContain(`Confirm DeclineOut: ${inFirstName} ${inLastName}In: ${outFirstName} ${outLastName}`)

    dialog(wrapper).find('button').at(1).simulate('click')
    expect(dialog(wrapper).props().open).toEqual(false)

    expect(declineInterTeamTradeGroup).toHaveBeenCalledWith(inTradeGroups[0].id)
  })

  it('triggers fetchInterTeamTradeGroups on render', () => {
    const fetchInterTeamTradeGroups = jest.fn()

    const wrapper = render({ fetchInterTeamTradeGroups })

    expect(fetchInterTeamTradeGroups).toHaveBeenCalledWith(FPL_TEAM_LISTS[0].id)
  })

  it('renders nothing if selectedFplTeamListId is undefined', () => {
    const fetchInterTeamTradeGroups = jest.fn()
    const wrapper = render({ selectedFplTeamListId: undefined, fetchInterTeamTradeGroups })

    expect(wrapper.html()).toEqual('')
    expect(fetchInterTeamTradeGroups).not.toHaveBeenCalled()
  })

  it('renders nothing if selectedFplTeamListId is undefined', () => {
    const wrapper = render({ selectedFplTeamListId: undefined })

    expect(wrapper.html()).toEqual('')
  })
})
