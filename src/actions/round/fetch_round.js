import { FETCH_ROUND, SHOW_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchRound (roundId) {
  return dispatch => {
    axios.get(`${API_ROOT}/round.json`, { params: { round_id: roundId } }).then(res => {
      dispatch(fetchRoundAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_ERRORS, payload: error.response });
    });;
  }
}

function fetchRoundAsync (data) {
  return {
    type: FETCH_ROUND,
    payload: data
  };
}
