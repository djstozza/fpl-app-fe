import { PROFILE, SHOW_USER_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function profile () {
  return dispatch => {
    axios.get(`${API_ROOT}/profile.json`, getLocalStorageHeader()).then(res => {
      setLocalStorageHeader(res);
      dispatch(profileAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_USER_ERRORS, payload: { error: error.response } });
    });
  }
}

function profileAsync (data) {
  return {
    type: PROFILE,
    payload: data
  };
}
