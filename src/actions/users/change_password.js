import { CHANGE_PASSWORD, SHOW_USER_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function changePassword (params) {
  return dispatch => {
    axios({
      url:`${ API_ROOT }/auth.json`,
      method: 'PUT',
      data: {
        user: {
          password: params.password,
          current_password: params.current_password,
          password_confirmation: params.password_confirmation,
        }
      },
      ...getLocalStorageHeader()
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(changePasswordAsync(res.data));
    }).catch((error) => {
      setLocalStorageHeader(error.response);
      dispatch({ type: SHOW_USER_ERRORS, payload: { error: error.response, current_user: params.current_user } });
    });
  }
}

function changePasswordAsync (data) {
  return {
    type: CHANGE_PASSWORD,
    payload: { current_user: data.data, success: 'Successfully updated password.' }
  };
}
