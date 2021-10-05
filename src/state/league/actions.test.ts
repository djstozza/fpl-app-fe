import * as actions from './actions'

import { LEAGUES } from 'test/fixtures'

const leagueId = '1'
const league = LEAGUES[0]
const sort = { name: 'desc' }
const filter = { position_id: ['1'] }
const page = { offset: 1, limit: 50 }

describe('League actions', () => {
  test(actions.API_LEAGUES_SHOW, () => {
    expect(actions.fetchLeague(leagueId))
      .toEqual({ type: actions.API_LEAGUES_SHOW, leagueId })
  })

  test(actions.API_LEAGUES_UPDATE, () => {
    expect(actions.updateLeague({ league }))
      .toEqual({ type: actions.API_LEAGUES_UPDATE, league })
  })

  test(actions.API_LEAGUE_FPL_TEAMS_INDEX, () => {
    expect(actions.fetchFplTeams({ sort }))
      .toEqual({ type: actions.API_LEAGUE_FPL_TEAMS_INDEX, sort })
  })

  test(actions.API_LEAGUE_GENERATE_DRAFT_PICKS, () => {
    expect(actions.generateDraftPicks(leagueId))
      .toEqual({ type: actions.API_LEAGUE_GENERATE_DRAFT_PICKS, leagueId })
  })

  test(actions.UPDATE_LEAGUE_FPL_TEAMS_SORT, () => {
    expect(actions.updateFplTeamsSort({ sort }))
      .toEqual({ type: actions.UPDATE_LEAGUE_FPL_TEAMS_SORT, sort })
  })

  test(actions.API_LEAGUE_CREATE_DRAFT, () => {
    expect(actions.createDraft(leagueId))
      .toEqual({ type: actions.API_LEAGUE_CREATE_DRAFT, leagueId })
  })

  test(actions.FETCH_AVAILABLE_PLAYERS, () => {
    expect(actions.fetchAvailablePlayers({ sort, filter, page }))
      .toEqual({ type: actions.FETCH_AVAILABLE_PLAYERS, sort, filter, page })
  })

  test(actions.UPDATE_AVAILABLE_PLAYERS_FILTER, () => {
    expect(actions.updateAvailablePlayersFilter(filter))
      .toEqual({ type: actions.UPDATE_AVAILABLE_PLAYERS_FILTER, filter })
  })

  test(actions.UPDATE_AVAILABLE_PLAYERS_SORT, () => {
    expect(actions.updateAvailablePlayersSort(sort))
      .toEqual({ type: actions.UPDATE_AVAILABLE_PLAYERS_SORT, sort })
  })

  test(actions.UPDATE_AVAILABLE_PLAYERS_PAGE, () => {
    expect(actions.updateAvailablePlayersPage(page.offset))
      .toEqual({ type: actions.UPDATE_AVAILABLE_PLAYERS_PAGE, offset: page.offset })
  })

  test(actions.INITIALIZE_FORM, () => {
    expect(actions.initializeForm()).toEqual({ type: actions.INITIALIZE_FORM })
  })
})
