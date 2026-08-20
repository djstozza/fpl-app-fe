import qs from 'qs'

import * as actions from './actions'
import { apiRequest } from 'state/request/actions'
import { fetchPlayers } from 'state/players/actions'
import history from 'state/history'
import { stringify } from 'utilities/helpers'
import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'

vi.mock('state/request/actions', async () => ({
  ...(await vi.importActual('state/request/actions')),
  apiRequest: vi.fn()
}))

vi.mock('state/players/actions', async () => ({
  ...(await vi.importActual('state/players/actions')),
  fetchPlayers: vi.fn()
}))

afterEach(() => {
  vi.restoreAllMocks()
})

const teamId = '3'
const tab = 'details'
const sort = {
  fixtures: { kickoffTime: 'desc' },
  players: { totalPoints: 'asc' }
}

describe('Team actions', () => {
  describe('fetchTeam', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = vi.fn()

      actions.fetchTeam(teamId, tab, sort)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_TEAMS_SHOW, teamId, tab, sort })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'GET',
        url: `${API_URL}${TEAMS_URL}/${teamId}`,
        successAction: success(actions.API_TEAMS_SHOW),
        failureAction: failure(actions.API_TEAMS_SHOW)
      })
    })
  })

  describe('fetchTeamFixtures', () => {
    it('dispatches the bare action and an apiRequest', () => {
      const dispatch = vi.fn()
      const getState = vi.fn()

      actions.fetchTeamFixtures({ id: teamId, tab, sort })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.API_TEAMS_FIXTURES_INDEX, teamId, tab, sort })
      expect(apiRequest).toHaveBeenCalledWith({
        needsAuth: false,
        method: 'GET',
        url: `${API_URL}${TEAMS_URL}/${teamId}/fixtures?${stringify({ sort: sort.fixtures })}`,
        successAction: success(actions.API_TEAMS_FIXTURES_INDEX),
        failureAction: failure(actions.API_TEAMS_FIXTURES_INDEX)
      })
    })
  })

  describe('fetchTeamPlayers', () => {
    it('dispatches the bare action and the players domain fetch', () => {
      const dispatch = vi.fn()
      const getState = vi.fn()

      actions.fetchTeamPlayers({ id: teamId, sort })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.FETCH_TEAM_PLAYERS, teamId, sort })
      expect(fetchPlayers).toHaveBeenCalledWith({ filter: { teamId }, sort: sort.players })
    })
  })

  describe('updateTeamPlayersSort', () => {
    it('dispatches the bare action and pushes the new sort into the URL', () => {
      const dispatch = vi.fn()
      const getState = vi.fn().mockReturnValue({ team: { data: { id: teamId } } })
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updateTeamPlayersSort({ tab, sort: sort.players })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_TEAM_PLAYERS_SORT, tab, sort: sort.players })
      expect(historyPushSpy).toHaveBeenCalledWith(`${TEAMS_URL}/${teamId}/${tab}?${qs.stringify({ sort: { players: sort.players } })}`)
    })
  })

  describe('updateTeamFixturesSort', () => {
    it('dispatches the bare action and pushes the new sort into the URL', () => {
      const dispatch = vi.fn()
      const getState = vi.fn().mockReturnValue({ team: { data: { id: teamId } } })
      const historyPushSpy = vi.spyOn(history, 'push')

      actions.updateTeamFixturesSort({ tab, sort: sort.fixtures })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actions.UPDATE_TEAM_FIXTURES_SORT, tab, sort: sort.fixtures })
      expect(historyPushSpy).toHaveBeenCalledWith(`${TEAMS_URL}/${teamId}/${tab}?${qs.stringify({ sort: { fixtures: sort.fixtures } })}`)
    })
  })
})
