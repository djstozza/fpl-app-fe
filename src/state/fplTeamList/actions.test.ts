import * as actions from './actions'

import { INTER_TEAM_TRADE_GROUP_1, LIST_POSITION_1 } from 'test/fixtures'

const fplTeamListId = '1'

describe('Fpl team list actions', () => {
  test(actions.API_FPL_TEAM_LISTS_SHOW, () => {
    expect(actions.fetchFplTeamList(fplTeamListId)).toEqual({ type: actions.API_FPL_TEAM_LISTS_SHOW, fplTeamListId })
  })

  test(actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX, () => {
    expect(actions.fetchListPositions(fplTeamListId))
      .toEqual({ type: actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX, fplTeamListId })

    const interTeamTradeGroup = INTER_TEAM_TRADE_GROUP_1

    expect(actions.fetchListPositions(fplTeamListId, interTeamTradeGroup))
      .toEqual({ type: actions.API_FPL_TEAM_LIST_LIST_POSITIONS_INDEX, fplTeamListId, interTeamTradeGroup })
  })

  test(actions.API_FPL_TEAM_LISTS_UPDATE, () => {
    const outListPositionId = '2'
    const inListPositionId = '5'

    expect(actions.processSubstitution(fplTeamListId, outListPositionId, inListPositionId))
      .toEqual({ type: actions.API_FPL_TEAM_LISTS_UPDATE, fplTeamListId, outListPositionId, inListPositionId })
  })

  test(actions.SET_OUT_LIST_POSITION, () => {
    const outListPosition = LIST_POSITION_1

    expect(actions.setOutListPosition(outListPosition))
      .toEqual({ type: actions.SET_OUT_LIST_POSITION, outListPosition })
  })
})
