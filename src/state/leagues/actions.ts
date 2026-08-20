import { decamelizeKeys } from 'humps'
import qs from 'qs'

import history from 'state/history'
import { apiRequest } from 'state/request/actions'

import {
  API_URL,
  PROFILE_URL,
  LEAGUES_URL,
  JOIN_LEAGUE_URL
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'

export const API_LEAGUES_INDEX = 'API_LEAGUES_INDEX'
export const API_LEAGUES_CREATE = 'API_LEAGUES_CREATE'
export const API_LEAGUES_JOIN = 'API_LEAGUES_JOIN'
export const UPDATE_LEAGUES_SORT = 'UPDATE_LEAGUES_SORT'
export const INITIALIZE_FORM = 'INITIALIZE_FORM'

type LeagueProps = {
  name: string,
  code: string,
  fplTeamName: string
}

export const fetchLeagues = () => (dispatch) => {
  dispatch({ type: API_LEAGUES_INDEX })

  return dispatch(apiRequest({
    needsAuth: true,
    method: 'GET',
    url: `${API_URL}${LEAGUES_URL}`,
    successAction: success(API_LEAGUES_INDEX),
    failureAction: failure(API_LEAGUES_INDEX)
  }))
}

export const createLeague = ({ league }:{ league: LeagueProps }) => async (dispatch) => {
  dispatch({ type: API_LEAGUES_CREATE, league })

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url: `${API_URL}${LEAGUES_URL}`,
    body: { league: decamelizeKeys(league) },
    successAction: success(API_LEAGUES_CREATE),
    failureAction: failure(API_LEAGUES_CREATE)
  }))

  if (ok) history.replace(`${PROFILE_URL}${LEAGUES_URL}`)
}

export const joinLeague = ({ league }:{ league: LeagueProps }) => async (dispatch) => {
  dispatch({ type: API_LEAGUES_JOIN, league })

  const ok = await dispatch(apiRequest({
    needsAuth: true,
    method: 'POST',
    url: `${API_URL}${JOIN_LEAGUE_URL}`,
    body: { league: decamelizeKeys(league) },
    successAction: success(API_LEAGUES_JOIN),
    failureAction: failure(API_LEAGUES_JOIN)
  }))

  if (ok) history.replace(`${PROFILE_URL}${LEAGUES_URL}`)
}

export const updateSort = (sort: Object) => (dispatch) => {
  dispatch({ type: UPDATE_LEAGUES_SORT, sort })
  history.push(`${PROFILE_URL}${LEAGUES_URL}?${qs.stringify({ sort })}`)
}

export const initializeForm = () => ({ type: INITIALIZE_FORM })
