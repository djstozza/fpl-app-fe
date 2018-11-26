import { UPDATE_USER, SHOW_USER_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function edit (params) {
  return dispatch => {
    axios({
      url:`${ API_ROOT }/auth.json`,
      method: 'PUT',
      data: { user: { email: params.email, username: params.username } },
      ...getLocalStorageHeader()
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(editAsync(res.data));
    }).catch((error) => {
      dispatch({ type: SHOW_USER_ERRORS, payload: { error: error.response, current_user: params.current_user } });
    });
  }
}

function editAsync (data) {
  return {
    type: UPDATE_USER,
    payload: { current_user: data.data, success: 'Successfully updated details.' }
  };
}
