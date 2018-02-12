import { FETCH_TEAMS } from '../types';
import axios from 'axios';

export default function fetchTeamss (tz) {
  return dispatch => {
    axios.get('http://localhost:3001/api/v1/teams.json').then(res => {
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
