import { UPDATE_FPL_TEAM_LIST_ORDER, FETCH_LIST_POSITION, SHOW_FPL_TEAM_LIST_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function updateOrder (listPositionId, substituteListPositionId) {
  return dispatch => {
    axios({
      url: `${API_ROOT}/list_positions/${listPositionId}.json`,
      method: 'PUT',
      ...getLocalStorageHeader(),
      data: {
        substitute_list_position_id: substituteListPositionId,
      }
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(clearSubstituteOptions());
      dispatch(updateOrderAsync(res.data));
    }).catch(error => {
      const data = error.response.data;
      setLocalStorageHeader(error.response);
      dispatch(clearSubstituteOptions());
      dispatch({
        type: SHOW_FPL_TEAM_LIST_ERRORS,
        payload: {
          error: error.response,
          fpl_team_list: data.fpl_team_list,
          grouped_list_positions: data.grouped_list_positions,
        }
      });
    });
  }
}

function updateOrderAsync (data) {
  return {
    type: UPDATE_FPL_TEAM_LIST_ORDER,
    payload: data
  };
}

function clearSubstituteOptions () {
  return {
    type: FETCH_LIST_POSITION, payload: { substitute_options: [] }
  }
}
