import { FETCH_ROUNDS } from '../types';
import axios from 'axios';

export default function fetchRounds (tz) {
  return dispatch => {
    axios.get('http://localhost:3001/api/v1/rounds.json').then(res => {
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
