import { FETCH_TEAMS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config';

export default function fetchTeams () {
  return dispatch => {
    axios.get(`${API_ROOT}/teams.json`).then(res => {
      dispatch(fetchTeamsAsync(res.data));
    });
  }
}

function fetchTeamsAsync (data) {
  return {
    type: FETCH_TEAMS,
    payload: data
  };
}
