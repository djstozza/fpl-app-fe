import * as actions from './actions'

const sort = { lastName: 'asc' }
const filter = { team_id: ['3'] }
const page = { offset: '1', limit: '50' }
const listPositionId = '1'

describe('List position actions', () => {
  test(actions.FETCH_TRADEABLE_PLAYERS, () => {
    expect(actions.fetchTradeablePlayers({ sort: undefined, filter: undefined, page: undefined }))
      .toEqual({ type: actions.FETCH_TRADEABLE_PLAYERS, sort: undefined, filter: undefined, page: undefined })

    expect(actions.fetchTradeablePlayers({ sort, filter, page }))
      .toEqual({ type: actions.FETCH_TRADEABLE_PLAYERS, sort, filter, page })
  })

  test(actions.API_LIST_POSITION_SHOW, () => {
    expect(actions.fetchValidSubstitutions(listPositionId))
      .toEqual({ type: actions.API_LIST_POSITION_SHOW, listPositionId })
  })

  test(actions.CLEAR_VALID_SUBSTITUTIONS, () => {
    expect(actions.clearValidSubstitutions())
      .toEqual({ type: actions.CLEAR_VALID_SUBSTITUTIONS })
  })

  test(actions.UPDATE_TRADEABLE_PLAYERS_FILTER, () => {
    expect(actions.updateTradeablePlayersFilter(filter))
      .toEqual({ type: actions.UPDATE_TRADEABLE_PLAYERS_FILTER, filter })
  })

  test(actions.UPDATE_TRADEABLE_PLAYERS_SORT, () => {
    expect(actions.updateTradeablePlayersSort(sort))
      .toEqual({ type: actions.UPDATE_TRADEABLE_PLAYERS_SORT, sort })
  })

  test(actions.UPDATE_TRADEABLE_PLAYERS_PAGE, () => {
    expect(actions.updateTradeablePlayersPage(page.offset))
      .toEqual({ type: actions.UPDATE_TRADEABLE_PLAYERS_PAGE, offset: page.offset })
  })

  test(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS, () => {
    expect(actions.fetchTradeableListPositions({ sort: undefined, filter: undefined, page: undefined })).toEqual({
      type: actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS,
      sort: undefined,
      filter: undefined,
      page: undefined
    })

    expect(actions.fetchTradeableListPositions({ sort, filter, page })).toEqual({
      type: actions.API_LIST_POSITION_TRADEABLE_LIST_POSITIONS,
      sort,
      filter,
      page
    })
  })

  test(actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS, () => {
    expect(actions.fetchTradeableListPositionFacets())
      .toEqual({ type: actions.API_LIST_POSITION_TRADEABLE_LIST_POSITION_FACETS })
  })

  test(actions.UPDATE_TRADEABLE_LIST_POSITIONS_FILTER, () => {
    expect(actions.updateTradeableListPositionsFilter({}))
      .toEqual({ type: actions.UPDATE_TRADEABLE_LIST_POSITIONS_FILTER, filter: {} })
  })

  test(actions.UPDATE_TRADEABLE_LIST_POSITIONS_SORT, () => {
    expect(actions.updateTradeableListPositionsSort(sort))
      .toEqual({ type: actions.UPDATE_TRADEABLE_LIST_POSITIONS_SORT, sort })
  })
})
