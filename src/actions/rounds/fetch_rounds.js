import { FETCH_ROUNDS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config';

export default function fetchRounds () {
  return dispatch => {
    axios.get(`${ API_ROOT }/rounds.json`).then(res => {
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
