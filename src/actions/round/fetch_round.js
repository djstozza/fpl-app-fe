import { FETCH_ROUND } from '../types';
import axios from 'axios';

export default function fetchRound (roundId, tz) {
  return dispatch => {
    axios.get(`http://localhost:3001/api/v1/round.json`, { params: { round_id: roundId, tz: tz } }).then(res => {
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
