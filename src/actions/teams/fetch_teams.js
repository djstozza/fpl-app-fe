import { FETCH_TEAMS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchTeamss (tz) {
  return dispatch => {
    axios.get(`${API_ROOT}/teams.json`).then(res => {
      dispatch(fetchTeamssAsync(res.data));
    });
  }
}

function fetchTeamssAsync (data) {
  return {
    type: FETCH_TEAMS,
    payload: data
  };
}
