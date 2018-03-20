import { LOG_IN, SHOW_USER_ERRORS } from '../types';
import axios from 'axios';
import { push } from 'react-router-redux';
import { API_ROOT, setLocalStorageHeader } from './../../api-config.js';

export default function login (params) {
  return dispatch => {
    axios.post(`${API_ROOT}/auth/sign_in.json`, params).then(res => {
      setLocalStorageHeader(res);
      dispatch(push(`/profile`));
      dispatch(loginAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_USER_ERRORS, payload: { error: error.response } });
    });
  }
}

function loginAsync (data) {
  return {
    type: LOG_IN,
    payload: { current_user: data, success: `Welcome back, ${data.data.username}!` }
  };
}
