import { FETCH_FPL_TEAM_LIST, SHOW_FPL_TEAM_LIST_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT,  getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function fetchFplTeamList (params) {
  return dispatch => {
    axios({
      url: `${ API_ROOT }/fpl_team_lists/${ params[ 'fpl_team_list_id' ] }.json`,
      method: 'GET',
      params: params,
      ...getLocalStorageHeader(),
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(fetchFplTeamListAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_FPL_TEAM_LIST_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchFplTeamListAsync (data) {
  return {
    type: FETCH_FPL_TEAM_LIST,
    payload: data
  };
}
