import { FETCH_ROUND } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchRound (roundId, tz) {
  return dispatch => {
    axios.get(`${API_ROOT}/round.json`, { params: { round_id: roundId, tz: tz } }).then(res => {
      dispatch(fetchRoundAsync(res.data));
    });
  }
}

function fetchRoundAsync (data) {
  return {
    type: FETCH_ROUND,
    payload: data
  };
}
