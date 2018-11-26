import { UPDATE_WAIVER_PICK_ORDER, SHOW_WAIVER_PICK_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function updateWaiverPickOrder (fplTeamListId, waiverPickId, pickNumber) {
  return dispatch => {
    axios({
      url: `${ API_ROOT }/fpl_team_lists/${ fplTeamListId }/waiver_picks/${ waiverPickId }.json`,
      method: 'PUT',
      ...getLocalStorageHeader(),
      data: { pick_number: pickNumber },
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(updateWaiverPickOrderAsync(res.data));
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

function updateWaiverPickOrderAsync (data) {
  return {
    type: UPDATE_WAIVER_PICK_ORDER,
    payload: data
  };
}
