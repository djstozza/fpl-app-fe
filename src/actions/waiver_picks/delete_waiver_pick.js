import { DELETE_WAIVER_PICK, SHOW_WAIVER_PICK_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function deleteWaiverPick (fplTeamListId, waiverPickId) {
  return dispatch => {
    axios({
      url: `${ API_ROOT }/fpl_team_lists/${ fplTeamListId }/waiver_picks/${ waiverPickId }.json`,
      method: 'DELETE',
      ...getLocalStorageHeader(),
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(deleteWaiverPickAsync(res.data));
    }).catch(error => {
      const data = error.response.data;
      setLocalStorageHeader(error.response);
      dispatch({
        type: SHOW_WAIVER_PICK_ERRORS,
        payload: {
          error: error.response,
          waiver_picks: data.waiver_picks,
        }
      });
    });
  }
}

function deleteWaiverPickAsync (data) {
  return {
    type: DELETE_WAIVER_PICK,
    payload: data
  };
}
