import { FETCH_TEAM, SHOW_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchTeam (teamId) {
  return dispatch => {
    axios.get(`${API_ROOT}/teams/${teamId}.json`).then(res => {
      dispatch(fetchTeamAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_ERRORS, payload: error.response });
    });
  }
}

function fetchTeamAsync (data) {
  return {
    type: FETCH_TEAM,
    payload: data
  };
}
