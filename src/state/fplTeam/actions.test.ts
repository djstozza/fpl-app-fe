import * as actions from './actions'

describe('Fpl team actions', () => {
  test(actions.API_FPL_TEAMS_SHOW, () => {
    expect(actions.fetchFplTeam('1')).toEqual({ type: actions.API_FPL_TEAMS_SHOW, fplTeamId: '1' })
  })

  test(actions.API_FPL_TEAMS_UPDATE, () => {
    const fplTeam = { name: 'Fpl team 1' }
    expect(actions.updateFplTeam({ fplTeam })).toEqual({ type: actions.API_FPL_TEAMS_UPDATE, fplTeam })
  })
})
