import { FETCH_OUT_PLAYERS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config';

export default function fetchOutPlayers (fplTeamId) {
  return dispatch => {
    axios.get(`${API_ROOT}/fpl_teams/${fplTeamId}/out_players.json`).then(res => {
      dispatch(fetchOutPlayersAsync(res.data));
    });
  }
}

function fetchOutPlayersAsync (data) {
  return {
    type: FETCH_OUT_PLAYERS,
    payload: data
  };
}
