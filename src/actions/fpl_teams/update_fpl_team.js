import { UPDATE_FPL_TEAM, SHOW_FPL_TEAM_ERRORS } from '../types';
import axios from 'axios';
import { push } from 'react-router-redux';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function updateFplTeam (params) {
  return dispatch => {
    axios({
      url: `${API_ROOT}/fpl_teams/${params.fplTeamId}.json`,
      method: 'PUT',
      ...getLocalStorageHeader(),
      data: {
        name: params.name,
      }
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(push(`/fpl_teams/${res.data.fpl_team.id}`));
      dispatch(updateFplTeamAsync(res.data));
    }).catch(error => {
      const data = error.response.data;
      setLocalStorageHeader(error.response);
      dispatch({
        type: SHOW_FPL_TEAM_ERRORS,
        payload: { fpl_team: data.fpl_team, current_user: data.current_user, error: error.response }
      });
    });
  }
}

function updateFplTeamAsync (data) {
  return {
    type: UPDATE_FPL_TEAM,
    payload: data
  };
}
