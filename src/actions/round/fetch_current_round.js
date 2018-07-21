import { FETCH_CURRENT_ROUND } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config';

export default function fetchCurrentRound () {
  return dispatch => {
    axios.get(`${API_ROOT}/current_round.json`).then(res => {
      console.log(res.data)
      dispatch(fetchRoundAsync(res.data));
    });
  }
}

function fetchRoundAsync (data) {
  return {
    type: FETCH_CURRENT_ROUND,
    payload: data
  };
}
