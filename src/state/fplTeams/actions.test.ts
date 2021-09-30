import * as actions from './actions'

describe('Fpl teams actions', () => {
  test(actions.API_FPL_TEAMS_INDEX, () => {
    expect(actions.fetchFplTeams()).toEqual({ type: actions.API_FPL_TEAMS_INDEX })
  })

  test(actions.UPDATE_FPL_TEAMS_SORT, () => {
    const sort = { name: 'desc' }
    expect(actions.updateFplTeamsSort(sort)).toEqual({ type: actions.UPDATE_FPL_TEAMS_SORT, sort })
  })
})
