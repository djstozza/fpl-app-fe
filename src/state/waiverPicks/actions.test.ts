import * as actions from './actions'

describe('Waiver picks actions', () => {
  test(actions.API_LIST_POSITION_WAIVER_PICKS_CREATE, () => {
    expect(actions.createWaiverPick('346'))
      .toEqual({ type: actions.API_LIST_POSITION_WAIVER_PICKS_CREATE, inPlayerId: '346' })
  })

  test(actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX, () => {
    expect(actions.fetchWaiverPicks('12'))
      .toEqual({ type: actions.API_FPL_TEAM_LIST_WAIVER_PICKS_INDEX, fplTeamListId: '12' })
  })

  test(actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER, () => {
    expect(actions.changeWaiverPickOrder('5', '3', '2')).toEqual({
      type: actions.API_FPL_TEAM_LSIT_WAIVER_PICKS_CHANGE_ORDER,
      fplTeamListId: '5',
      waiverPickId: '3',
      newPickNumber: '2'
    })
  })
})
