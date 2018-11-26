import { UPDATE_LEAGUE, SHOW_LEAGUE_ERRORS } from '../types';
import axios from 'axios';
import { push } from 'react-router-redux';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function updateLeague (params) {
  return dispatch => {
    axios({
      url: `${ API_ROOT }/leagues/${ params.leagueId }.json`,
      method: 'PUT',
      ...getLocalStorageHeader(),
      data: {
        league: {
          name: params.name,
          code: params.code,
        }
      }
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(push(`/leagues/${ res.data.league.id }`));
      dispatch(createLeagueAsync(res.data));
    }).catch(error => {
      setLocalStorageHeader(error.response);
      dispatch({ type: SHOW_LEAGUE_ERRORS, payload: { league: params.league, error: error.response } });
    });
  }
}

function createLeagueAsync (data) {
  return {
    type: UPDATE_LEAGUE,
    payload: data
  };
}
