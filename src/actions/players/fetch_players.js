import { FETCH_PLAYERS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchPlayers (teamId) {
  return dispatch => {
    axios.get(`${API_ROOT}/players.json`).then(res => {
      dispatch(fetchPlayersAsync(res.data));
    });
  }
}

function fetchPlayersAsync (data) {
  return {
    type: FETCH_PLAYERS,
    payload: data
  };
}
