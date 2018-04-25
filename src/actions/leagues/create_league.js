import { CREATE_LEAGUE, SHOW_LEAGUE_ERRORS } from '../types';
import axios from 'axios';
import { push } from 'react-router-redux';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function createLeague (params) {
  return dispatch => {
    axios({
      url: `${API_ROOT}/leagues.json`,
      method: 'POST',
      ...getLocalStorageHeader(),
      data: {
        league: {
          name: params.name,
          code: params.code,
          fpl_team_name: params.fpl_team_name
        }
      }
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(push(`/leagues/${res.data.league.id}`));
      dispatch(createLeagueAsync(res.data));
    }).catch(error => {
      setLocalStorageHeader(error.response);
      dispatch({ type: SHOW_LEAGUE_ERRORS, payload: { error: error.response } });
    });
  }
}

function createLeagueAsync (data) {
  return {
    type: CREATE_LEAGUE,
    payload: data
  };
}
