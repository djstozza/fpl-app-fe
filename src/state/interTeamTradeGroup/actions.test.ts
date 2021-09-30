import * as actions from './actions'

describe('Inter team trade group actions', () => {
  test(actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP, () => {
    const fplTeamListId = '1'
    const interTeamTradeGroupId = '4'

    expect(actions.fetchInterTeamTradeGroup(fplTeamListId, interTeamTradeGroupId))
      .toEqual({ type: actions.API_FPL_TEAM_LIST_INTER_TEAM_TRADE_GROUP, fplTeamListId, interTeamTradeGroupId })
  })
})
