import { GENERATE_PICK_NUMBERS, SHOW_LEAGUE_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function generatePickNumbers (leagueId) {
  return dispatch => {
    axios({
      url: `${API_ROOT}/leagues/${leagueId}/generate_pick_numbers.json`,
      method: 'PUT',
      ...getLocalStorageHeader(),
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(generatePickNumbersAsync(res.data));
    }).catch(error => {
      const errorResponse = error.response;
      const errorData = errorResponse.data;

      setLocalStorageHeader(errorResponse);

      dispatch({
        type: SHOW_LEAGUE_ERRORS,
        payload: {
          error: errorResponse,
          league: errorData.league,
          fpl_teams: errorData.fpl_teams,
          current_user: errorData.current_user,
          commissioner: errorData.commissioner,
        }
      });
    });
  }
}

function generatePickNumbersAsync (data) {
  return {
    type: GENERATE_PICK_NUMBERS,
    payload: data
  };
}
