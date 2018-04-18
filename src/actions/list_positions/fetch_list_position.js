import { FETCH_LIST_POSITION, SHOW_LIST_POSITION_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config.js';

export default function fetchListPosition (listPositionId) {
  return dispatch => {
    axios.get(`${API_ROOT}/list_positions/${listPositionId}.json`).then(res => {
      dispatch(fetchListPositionAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_LIST_POSITION_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchListPositionAsync (data) {
  return {
    type: FETCH_LIST_POSITION,
    payload: data
  };
}
