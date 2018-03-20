import { FETCH_ROUND, SHOW_ROUND_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchRound (roundId) {
  return dispatch => {
    axios.get(`${API_ROOT}/round.json`, { params: { round_id: roundId } }).then(res => {
      dispatch(fetchRoundAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_ROUND_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchRoundAsync (data) {
  return {
    type: FETCH_ROUND,
    payload: data
  };
}
