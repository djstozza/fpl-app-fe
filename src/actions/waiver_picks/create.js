import { CREATE_WAIVER_PICK, SHOW_WAIVER_PICK_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function createWaiverPick (fplTeamListId, listPositionId, inPlayerId) {
  return dispatch => {
    axios({
      url: `${ API_ROOT }/fpl_team_lists/${ fplTeamListId }/waiver_picks.json`,
      method: 'POST',
      ...getLocalStorageHeader(),
      data: {
        list_position_id: listPositionId,
        in_player_id: inPlayerId,
      }
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(createWaiverPickAsync(res.data));
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

function createWaiverPickAsync (data) {
  return {
    type: CREATE_WAIVER_PICK,
    payload: data
  };
}
