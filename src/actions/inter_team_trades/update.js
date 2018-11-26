import { UPDATE_INTER_TEAM_TRADE_GROUP, SHOW_INTER_TEAM_TRADE_GROUP_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function updateInterTeamTradeGroup (params) {
  return dispatch => {
    axios({
      url: `${ API_ROOT }/inter_team_trade_groups/${ params[ 'inter_team_trade_group_id' ] }.json`,
      method: 'PUT',
      ...getLocalStorageHeader(),
      params: params,
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(updateInterTeamTradeGroupAsync(res.data));
    }).catch(error => {
      const data = error.response.data;
      setLocalStorageHeader(error.response);
      dispatch({
        type: SHOW_INTER_TEAM_TRADE_GROUP_ERRORS,
        payload: {
          error: error.response,
          out_trade_groups: data.out_trade_groups,
          in_trade_groups: data.in_trade_groups,
        }
      });
    });
  }
}

function updateInterTeamTradeGroupAsync (data) {
  return {
    type: UPDATE_INTER_TEAM_TRADE_GROUP,
    payload: data
  };
}
