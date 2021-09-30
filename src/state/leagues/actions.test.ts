import * as actions from './actions'

const league = { name: 'League 1', code: '1234', fplTeamName: 'Fpl team 1' }
const sort = { name: 'asc' }

describe('Leagues actions', () => {
  test(actions.API_LEAGUES_INDEX, () => {
    expect(actions.fetchLeagues())
      .toEqual({ type: actions.API_LEAGUES_INDEX })
  })

  test(actions.API_LEAGUES_CREATE, () => {
    expect(actions.createLeague({ league }))
      .toEqual({ type: actions.API_LEAGUES_CREATE, league })
  })

  test(actions.API_LEAGUES_JOIN, () => {
    expect(actions.joinLeague({ league }))
      .toEqual({ type: actions.API_LEAGUES_JOIN, league })
  })

  test(actions.UPDATE_LEAGUES_SORT, () => {
    expect(actions.updateSort(sort))
      .toEqual({ type: actions.UPDATE_LEAGUES_SORT, sort })
  })

  test(actions.INITIALIZE_FORM, () => {
    expect(actions.initializeForm()).toEqual({ type: actions.INITIALIZE_FORM })
  })
})
