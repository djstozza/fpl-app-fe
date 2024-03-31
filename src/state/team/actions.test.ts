import * as actions from './actions'

const teamId = '3'
const tab = 'details'
const sort = {
  fixtures: { kickoffTime: 'desc' },
  players: { totalPoints: 'asc' }
}

describe('Team actions', () => {
  test(actions.API_TEAMS_SHOW, () => {
    expect(actions.fetchTeam(teamId, tab, sort)).toEqual({ type: actions.API_TEAMS_SHOW, teamId, tab, sort })
  })

  test(actions.API_TEAMS_FIXTURES_INDEX, () => {
    expect(actions.fetchTeamFixtures({ id: teamId, tab, sort }))
      .toEqual({ type: actions.API_TEAMS_FIXTURES_INDEX, teamId, tab, sort })
  })

  test(actions.FETCH_TEAM_PLAYERS, () => {
    expect(actions.fetchTeamPlayers({ id: teamId, sort }))
      .toEqual({ type: actions.FETCH_TEAM_PLAYERS, teamId, sort })
  })

  test(actions.UPDATE_TEAM_PLAYERS_SORT, () => {
    expect(actions.updateTeamPlayersSort({ tab, sort: sort.players }))
      .toEqual({ type: actions.UPDATE_TEAM_PLAYERS_SORT, tab, sort: sort.players })
  })

  test(actions.UPDATE_TEAM_FIXTURES_SORT, () => {
    expect(actions.updateTeamFixturesSort({ tab, sort: sort.fixtures }))
      .toEqual({ type: actions.UPDATE_TEAM_FIXTURES_SORT, tab, sort: sort.fixtures })
  })
})
