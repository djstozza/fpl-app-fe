import { VALIDATE_TOKEN, SHOW_USER_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config.js';

export default function profile () {
  return dispatch => {
    const hash = {
      'access-token': localStorage.getItem('access-token'),
      'client': localStorage.getItem('client'),
      'token-type': localStorage.getItem('token-type'),
      'expiry': localStorage.getItem('expiry'),
      'uid': localStorage.getItem('uid'),
      'content-type': localStorage.getItem('content-type'),
    }

    axios.get(`${API_ROOT}/auth/validate_token.json`, getLocalStorageHeader()).then(res => {
      setLocalStorageHeader(res)
      dispatch(validateTokenAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_USER_ERRORS, payload: { error: error.response } });
    });
  }
}

function validateTokenAsync (data) {
  return {
    type: VALIDATE_TOKEN,
    payload: data
  };
}
