import { FETCH_ROUNDS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchRounds (tz) {
  return dispatch => {
    axios.get(`${API_ROOT}/rounds.json`).then(res => {
      dispatch(fetchRoundsAsync(res.data));
    });
  }
}

function fetchRoundsAsync (data) {
  return {
    type: FETCH_ROUNDS,
    payload: data
  };
}
