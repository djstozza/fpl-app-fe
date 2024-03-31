import * as actions from './actions'

const playerId = '352'
const historySort = { kickoffTime: 'desc' }
const historyPastSort = { seasonName: 'asc' }

describe('Player actions', () => {
  test(actions.API_PLAYERS_SHOW, () => {
    expect(actions.fetchPlayer(playerId)).toEqual({ type: actions.API_PLAYERS_SHOW, playerId })
  })

  test(actions.API_PLAYERS_HISTORY_INDEX, () => {
    expect(actions.fetchPlayerHistory({ id: playerId, sort: historySort }))
      .toEqual({ type: actions.API_PLAYERS_HISTORY_INDEX, playerId, sort: historySort })
  })

  test(actions.API_PLAYERS_HISTORY_PAST_INDEX, () => {
    expect(actions.fetchPlayerHistoryPast({ id: playerId, sort: historyPastSort }))
      .toEqual({ type: actions.API_PLAYERS_HISTORY_PAST_INDEX, playerId, sort: historyPastSort })
  })

  test(actions.UPDATE_PLAYER_HISTORY_SORT, () => {
    expect(actions.updatePlayerHistorySort({ id: playerId, sort: historySort }))
      .toEqual({ type: actions.UPDATE_PLAYER_HISTORY_SORT, sort: historySort })
  })

  test(actions.UPDATE_PLAYER_HISTORY_PAST_SORT, () => {
    expect(actions.updatePlayerHistoryPastSort({ id: playerId, sort: historyPastSort }))
      .toEqual({ type: actions.UPDATE_PLAYER_HISTORY_PAST_SORT, sort: historyPastSort })
  })
})
