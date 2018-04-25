import { FETCH_UNPICKED_PLAYERS, FETCH_LIST_POSITION, SHOW_LEAGUE_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config';

export default function fetchUnpickedPlayers (leagueId) {
  return dispatch => {
    axios.get(`${API_ROOT}/leagues/${leagueId}/unpicked_players.json`).then(res => {
      dispatch(clearSubstituteOptions());
      dispatch(fetchUnpickedPlayersAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_LEAGUE_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchUnpickedPlayersAsync (data) {
  return {
    type: FETCH_UNPICKED_PLAYERS,
    payload: data
  };
}

function clearSubstituteOptions () {
  return {
    type: FETCH_LIST_POSITION, payload: { substitute_options: [] }
  }
}
