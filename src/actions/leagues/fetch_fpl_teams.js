import { FETCH_LEAGUE_FPL_TEAMS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config';

export default function fetchLeagueFplTeams (leagueId, fplTeamId) {
  return dispatch => {
    axios({
      url: `${ API_ROOT }/leagues/${ leagueId }/fpl_teams.json`,
      method: 'GET',
      params: {
        fpl_team_id: fplTeamId
      }
    }).then(res => {
      dispatch(fetchLeagueFplTeamsAsync(res.data));
    });
  }
}

function fetchLeagueFplTeamsAsync (data) {
  return {
    type: FETCH_LEAGUE_FPL_TEAMS,
    payload: data
  };
}
