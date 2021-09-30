import * as actions from './actions'

const sort = { lastName: 'desc' }
const filter = { team_id: ['1'] }
const page = { offset: 1, limit: 50 }

describe('Players actions', () => {
  test(actions.API_PLAYERS_INDEX, () => {
    expect(actions.fetchPlayers({ sort: undefined, filter: undefined, page: undefined }))
      .toEqual({ type: actions.API_PLAYERS_INDEX, sort: undefined, filter: undefined, page: undefined })

    expect(actions.fetchPlayers({ sort, filter, page }))
      .toEqual({ type: actions.API_PLAYERS_INDEX, sort, filter, page })
  })

  test(actions.API_PLAYERS_FACETS_INDEX, () => {
    expect(actions.fetchFacets()).toEqual({ type: actions.API_PLAYERS_FACETS_INDEX })
  })

  test(actions.UPDATE_PLAYERS_FILTER, () => {
    expect(actions.updateFilter(filter)).toEqual({ type: actions.UPDATE_PLAYERS_FILTER, filter })
  })

  test(actions.UPDATE_PLAYERS_SORT, () => {
    expect(actions.updateSort(sort)).toEqual({ type: actions.UPDATE_PLAYERS_SORT, sort })
  })

  test(actions.UPDATE_PLAYERS_PAGE, () => {
    expect(actions.updatePage(page.offset)).toEqual({ type: actions.UPDATE_PLAYERS_PAGE, offset: page.offset })
  })
})
