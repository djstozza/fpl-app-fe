import { SIGN_UP, SHOW_USER_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT,  setLocalStorageHeader } from './../../api-config.js';
import { push } from 'react-router-redux';

export default function signUp (params) {
  return dispatch => {
    axios.post(`${API_ROOT}/auth.json`, params).then(res => {
      setLocalStorageHeader(res);
      dispatch(push(`/profile`));
      dispatch(signUpAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_USER_ERRORS, payload: { error: error.response } });
    });
  }
}

function signUpAsync (data) {
  return {
    type: SIGN_UP,
    payload: data
  };
}
