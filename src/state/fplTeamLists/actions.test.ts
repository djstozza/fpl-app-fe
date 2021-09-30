import * as actions from './actions'

describe('Fpl team lists actions', () => {
  test(actions.API_FPL_TEAM_LISTS_INDEX, () => {
    expect(actions.fetchFplTeamLists('1')).toEqual({ type: actions.API_FPL_TEAM_LISTS_INDEX, fplTeamId: '1' })
  })
})
