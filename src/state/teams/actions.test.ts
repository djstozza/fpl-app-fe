import * as actions from './actions'

const sort = { name: 'asc' }

describe('Teams actions', () => {
  test(actions.API_TEAMS_INDEX, () => {
    expect(actions.fetchTeams({ sort })).toEqual({ type: actions.API_TEAMS_INDEX, sort })
  })

  test(actions.UPDATE_TEAMS_SORT, () => {
    expect(actions.updateSort(sort)).toEqual({ type: actions.UPDATE_TEAMS_SORT, sort })
  })
})
