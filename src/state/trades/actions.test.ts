import * as actions from './actions'

describe('Trades actions', () => {
  test(actions.API_LIST_POSITION_TRADES_CREATE, () => {
    expect(actions.createTrade('132')).toEqual({ type: actions.API_LIST_POSITION_TRADES_CREATE, inPlayerId: '132' })
  })

  test(actions.API_FPL_TEAM_LIST_TRADES_INDEX, () => {
    expect(actions.fetchTrades('5')).toEqual({ type: actions.API_FPL_TEAM_LIST_TRADES_INDEX, fplTeamListId: '5' })
  })
})
