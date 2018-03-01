import { FETCH_POSITIONS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchPositions () {
  return dispatch => {
    axios.get(`${API_ROOT}/positions.json`).then(res => {
      dispatch(fetchPositionsAsync(res.data));
    });
  }
}

function fetchPositionsAsync (data) {
  return {
    type: FETCH_POSITIONS,
    payload: data
  };
}
