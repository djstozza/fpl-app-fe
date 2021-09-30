import * as actions from './actions'

describe('Round actions', () => {
  test(actions.API_ROUNDS_SHOW, () => {
    expect(actions.fetchRound(1)).toEqual({ type: actions.API_ROUNDS_SHOW, roundId: 1 })
  })
})
