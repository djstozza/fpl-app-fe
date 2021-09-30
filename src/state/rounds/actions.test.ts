import * as actions from './actions'

describe('Rounds actions', () => {
  test(actions.API_ROUNDS_INDEX, () => {
    expect(actions.fetchRounds()).toEqual({ type: actions.API_ROUNDS_INDEX })
  })
})
