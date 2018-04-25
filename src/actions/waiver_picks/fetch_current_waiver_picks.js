import { FETCH_CURRENT_WAIVER_PICKS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config';

export default function fetchPositions (fplTeamId) {
  return dispatch => {
    axios.get(`${API_ROOT}/fpl_teams/${fplTeamId}/waiver_picks.json`).then(res => {
      dispatch(fetchPositionsAsync(res.data));
    });
  }
}

function fetchPositionsAsync (data) {
  return {
    type: FETCH_CURRENT_WAIVER_PICKS,
    payload: data
  };
}
