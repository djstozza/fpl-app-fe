import * as actions from './actions'

const sort = { pickNumber: 'desc' }
const filter = { team_id: ['1'] }
const page = { offset: '1', limit: '50' }
const leagueId = '1'
const inPlayerId = '321'

describe('Mini draft picks actions', () => {
  test(actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX, () => {
    expect(actions.fetchMiniDraftPicks({ sort: undefined, filter: undefined }))
      .toEqual({ type: actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX, sort: undefined, filter: undefined })

    expect(actions.fetchMiniDraftPicks({ sort, filter }))
      .toEqual({ type: actions.API_LEAGUE_MINI_DRAFT_PICKS_INDEX, sort, filter })
  })

  test(actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX, () => {
    expect(actions.fetchMiniDraftPicksStatus(leagueId))
      .toEqual({ type: actions.API_LEAGUE_MINI_DRAFT_PICKS_STATUS_INDEX, leagueId })
  })

  test(actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX, () => {
    expect(actions.fetchMiniDraftPickFacets())
      .toEqual({ type: actions.API_LEAGUE_MINI_DRAFT_PICKS_FACETS_INDEX })
  })

  test(actions.UPDATE_MINI_DRAFT_PICKS_FILTER, () => {
    expect(actions.updateFilter(filter))
      .toEqual({ type: actions.UPDATE_MINI_DRAFT_PICKS_FILTER, filter })
  })

  test(actions.UPDATE_MINI_DRAFT_PICKS_SORT, () => {
    expect(actions.updateSort(sort))
      .toEqual({ type: actions.UPDATE_MINI_DRAFT_PICKS_SORT, sort })
  })

  test(actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE, () => {
    expect(actions.createMiniDraftPick(inPlayerId))
      .toEqual({ type: actions.API_LEAGUE_MINI_DRAFT_PICK_CREATE, inPlayerId })
  })

  test(actions.API_LEAGUE_MINI_DRAFT_PICK_PASS, () => {
    expect(actions.passMiniDraftPick())
      .toEqual({ type: actions.API_LEAGUE_MINI_DRAFT_PICK_PASS })
  })

  test(actions.MINI_DRAFT_FETCH_TRADEABLE_PLAYERS, () => {
    expect(actions.fetchTradeablePlayers({ sort: undefined, filter: undefined, page: undefined }))
      .toEqual({ type: actions.MINI_DRAFT_FETCH_TRADEABLE_PLAYERS, sort: undefined, filter: undefined, page: undefined })

    expect(actions.fetchTradeablePlayers({ sort, filter, page }))
      .toEqual({ type: actions.MINI_DRAFT_FETCH_TRADEABLE_PLAYERS, sort, filter, page })
  })

  test(actions.MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_FILTER, () => {
    expect(actions.updateTradeablePlayersFilter(filter))
      .toEqual({ type: actions.MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_FILTER, filter })
  })

  test(actions.MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_SORT, () => {
    expect(actions.updateTradeablePlayersSort(sort))
      .toEqual({ type: actions.MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_SORT, sort })
  })

  test(actions.MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_PAGE, () => {
    expect(actions.updateTradeablePlayersPage(page.offset))
      .toEqual({ type: actions.MINI_DRAFT_UPDATE_TRADEABLE_PLAYERS_PAGE, offset: page.offset })
  })
})
