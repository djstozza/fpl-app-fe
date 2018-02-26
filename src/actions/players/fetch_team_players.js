import { FETCH_TEAM_PLAYERS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchTeamPlayers (teamId) {
  return dispatch => {
    axios.get(`${API_ROOT}/players.json`, { params: { team_id: teamId } }).then(res => {
      dispatch(fetchTeamPlayersAsync(res.data));
    });
  }
}

function fetchTeamPlayersAsync (data) {
  return {
    type: FETCH_TEAM_PLAYERS,
    payload: data
  };
}
