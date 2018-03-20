import { FETCH_PLAYER, SHOW_PLAYER_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchPlayers (playerId) {
  return dispatch => {
    axios.get(`${API_ROOT}/players/${playerId}.json`).then(res => {
      dispatch(fetchPlayersAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_PLAYER_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchPlayersAsync (data) {
  return {
    type: FETCH_PLAYER,
    payload: data
  };
}
