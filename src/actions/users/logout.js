import { LOG_OUT, SHOW_USER_ERRORS } from '../types';
import axios from 'axios';
import { push } from 'react-router-redux';
import { API_ROOT, getLocalStorageHeader } from './../../api-config.js';
import isEmpty from 'lodash/isEmpty';


export default function logout (params) {
  return dispatch => {
    axios.delete(`${API_ROOT}/auth/sign_out.json`, getLocalStorageHeader()).then(res => {
      localStorage.removeItem('access-token');
      localStorage.removeItem('client');
      localStorage.removeItem('token-type');
      localStorage.removeItem('expiry');
      localStorage.removeItem('uid');
      localStorage.removeItem('content-type');
      dispatch(push(`/login`));
      dispatch(logoutAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_USER_ERRORS, payload: { error: error.response } });
    });
  }
}

function logoutAsync (data) {
  return {
    type: LOG_OUT,
    payload: {
      loggedIn: !isEmpty(localStorage.getItem('access-token')),
      success: 'Signed out successfully.'
    }
  }
}
