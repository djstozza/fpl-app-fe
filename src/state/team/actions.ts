import qs from 'qs'

import { API_URL, TEAMS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import { apiRequest } from 'state/request/actions'
import { fetchPlayers } from 'state/players/actions'
import history from 'state/history'
import { stringify } from 'utilities/helpers'

export const API_TEAMS_SHOW = 'API_TEAMS_SHOW'
export const FETCH_TEAM_PLAYERS = 'FETCH_TEAM_PLAYERS'
export const API_TEAMS_FIXTURES_INDEX = 'API_TEAMS_FIXTURES_INDEX'
export const API_TEAM_PLAYERS_INDEX = 'API_TEAMS_PLAYERS_INDEX'
export const UPDATE_TEAM_PLAYERS_SORT = 'UPDATE_TEAM_PLAYERS_SORT'
export const UPDATE_TEAM_FIXTURES_SORT = 'UPDATE_TEAM_FIXTURES_SORT'

type SortValue = { [key: string]: string }

type TeamSort = { fixtures: SortValue, players: SortValue }

type Props = {
  id: string,
  tab: string,
  sort: TeamSort
}

type UpdateProps = {
  tab: string,
  sort: SortValue
}

export const fetchTeam = (teamId: string, tab: string, sort: TeamSort) => (dispatch) => {
  dispatch({ type: API_TEAMS_SHOW, teamId, tab, sort })

  return dispatch(apiRequest({
    needsAuth: false,
    method: 'GET',
    url: `${API_URL}${TEAMS_URL}/${teamId}`,
    successAction: success(API_TEAMS_SHOW),
    failureAction: failure(API_TEAMS_SHOW)
  }))
}

export const fetchTeamFixtures = ({ id: teamId, tab, sort }: Props) => (dispatch) => {
  dispatch({ type: API_TEAMS_FIXTURES_INDEX, teamId, tab, sort })

  const url = `${API_URL}${TEAMS_URL}/${teamId}/fixtures?${stringify({ sort: sort.fixtures })}`

  return dispatch(apiRequest({
    needsAuth: false,
    method: 'GET',
    url,
    successAction: success(API_TEAMS_FIXTURES_INDEX),
    failureAction: failure(API_TEAMS_FIXTURES_INDEX)
  }))
}

export const fetchTeamPlayers = ({ id: teamId, sort }: Pick<Props, 'id' | 'sort'>) => (dispatch) => {
  dispatch({ type: FETCH_TEAM_PLAYERS, teamId, sort })
  dispatch(fetchPlayers({ filter: { teamId }, sort: sort.players }))
}

export const updateTeamPlayersSort = ({ tab, sort }: UpdateProps) => (dispatch, getState) => {
  dispatch({ type: UPDATE_TEAM_PLAYERS_SORT, tab, sort })

  const { data: { id: teamId } } = getState().team

  history.push(`${TEAMS_URL}/${teamId}/${tab}?${qs.stringify({ sort: { players: sort } })}`)
}

export const updateTeamFixturesSort = ({ tab, sort }: UpdateProps) => (dispatch, getState) => {
  dispatch({ type: UPDATE_TEAM_FIXTURES_SORT, tab, sort })

  const { data: { id: teamId } } = getState().team

  history.push(`${TEAMS_URL}/${teamId}/${tab}?${qs.stringify({ sort: { fixtures: sort } })}`)
}
