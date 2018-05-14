import { FETCH_ALL_TRADEABLE_PLAYERS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config';

export default function fetchAllTradeablePlayers (fplTeamId) {
  return dispatch => {
    axios.get(`${API_ROOT}/fpl_teams/${fplTeamId}/all_tradeable_players.json`).then(res => {
      dispatch(fetchAllTradeablePlayersAsync(res.data));
    });
  }
}

function fetchAllTradeablePlayersAsync (data) {
  return {
    type: FETCH_ALL_TRADEABLE_PLAYERS,
    payload: data
  };
}
