import * as actions from './actions'

import { LIST_POSITION_1 } from 'test/fixtures'

const fplTeamListId = '1'
const interTeamTradeGroupId = '5'
const inListPosition = LIST_POSITION_1

describe('Inter team trade groups actions', () => {
  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS, () => {
    expect(actions.fetchInterTeamTradeGroups(fplTeamListId))
      .toEqual({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS, fplTeamListId })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE, () => {
    expect(actions.createInterTeamTradeGroup(inListPosition))
      .toEqual({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CREATE, inListPosition })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT, () => {
    expect(actions.submitInterTeamTradeGroup(interTeamTradeGroupId))
      .toEqual({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_SUBMIT, interTeamTradeGroupId })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL, () => {
    expect(actions.cancelInterTeamTradeGroup(interTeamTradeGroupId))
      .toEqual({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_CANCEL, interTeamTradeGroupId })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE, () => {
    expect(actions.approveInterTeamTradeGroup(interTeamTradeGroupId))
      .toEqual({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_APPROVE, interTeamTradeGroupId })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE, () => {
    expect(actions.declineInterTeamTradeGroup(interTeamTradeGroupId))
      .toEqual({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_DECLINE, interTeamTradeGroupId })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE, () => {
    expect(actions.addToInterTeamTradeGroup(inListPosition))
      .toEqual({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUPS_ADD_TRADE, inListPosition })
  })

  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE, () => {
    const interTeamTradeId = '1'

    expect(actions.removeTrade(interTeamTradeId))
      .toEqual({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADES_DELETE, interTeamTradeId })
  })
})
