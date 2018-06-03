import { NEW_INTER_TEAM_TRADE_GROUP, SHOW_INTER_TEAM_TRADE_GROUP_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function newInterTeamTradeGroup (params) {
  console.log(params)
  return dispatch => {
    axios({
      url: `${API_ROOT}/fpl_team_lists/${params['fpl_team_list_id']}/tradeable_players.json`,
      method: 'GET',
      params: params,
    }).then(res => {
      dispatch(newInterTeamTradeGroupAsync(res.data));
    });
  }
}

function newInterTeamTradeGroupAsync (data) {
  return {
    type: NEW_INTER_TEAM_TRADE_GROUP,
    payload: data
  };
}
