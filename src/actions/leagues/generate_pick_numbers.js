import { GENERATE_PICK_NUMBERS, SHOW_LEAGUE_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config.js';

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
      dispatch({ type: SHOW_LEAGUE_ERRORS, payload: { error: error.response } });
    });
  }
}

function generatePickNumbersAsync (data) {
  return {
    type: GENERATE_PICK_NUMBERS,
    payload: data
  };
}
