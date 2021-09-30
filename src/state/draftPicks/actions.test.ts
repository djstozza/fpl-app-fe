import * as actions from './actions'

const sort = { pickNumber: 'asc' }
const filter = { team_id: ['1'] }
const leagueId = '1'
const playerId = '5'
const miniDraft = true
const nextDraftPickId = '10'

describe('Draft picks actions', () => {
  test(actions.API_LEAGUE_DRAFT_PICKS_INDEX, () => {
    expect(actions.fetchDraftPicks({ sort }))
      .toEqual({ type: actions.API_LEAGUE_DRAFT_PICKS_INDEX, sort, filter: undefined })

    expect(actions.fetchDraftPicks({ sort, filter }))
      .toEqual({ type: actions.API_LEAGUE_DRAFT_PICKS_INDEX, sort, filter })
  })

  test(actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX, () => {
    expect(actions.fetchDraftPicksStatus(leagueId))
      .toEqual({ type: actions.API_LEAGUE_DRAFT_PICKS_STATUS_INDEX, leagueId })
  })

  test(actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX, () => {
    expect(actions.fetchDraftPickFacets()).toEqual({ type: actions.API_LEAGUE_DRAFT_PICKS_FACETS_INDEX })
  })

  test(actions.UPDATE_DRAFT_PICKS_FILTER, () => {
    expect(actions.updateFilter(filter)).toEqual({ type: actions.UPDATE_DRAFT_PICKS_FILTER, filter })
  })

  test(actions.UPDATE_DRAFT_PICKS_SORT, () => {
    expect(actions.updateSort(sort)).toEqual({ type: actions.UPDATE_DRAFT_PICKS_SORT, sort })
  })

  test(actions.API_LEAGUE_DRAFT_PICK_UPDATE, () => {
    expect(actions.updateDraftPick({ nextDraftPickId, playerId }))
      .toEqual({ type: actions.API_LEAGUE_DRAFT_PICK_UPDATE, nextDraftPickId, playerId, miniDraft: undefined })

    expect(actions.updateDraftPick({ nextDraftPickId, miniDraft }))
      .toEqual({ type: actions.API_LEAGUE_DRAFT_PICK_UPDATE, nextDraftPickId, playerId: undefined, miniDraft })
  })
})
