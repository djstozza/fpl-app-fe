import { UPDATE_INTER_TEAM_TRADE_GROUP, SHOW_INTER_TEAM_TRADE_GROUP_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function updateInterTeamTradeGroup (
  fplTeamListId,
  interTeamTradeGroupId,
  outListPositionId,
  inListPositionId,
  tradeId,
  action
) {
  return dispatch => {
    axios({
      url: `${API_ROOT}/inter_team_trade_groups/${interTeamTradeGroupId}.json`,
      method: 'PUT',
      ...getLocalStorageHeader(),
      data: {
        fpl_team_list_id: fplTeamListId,
        out_list_position_id: outListPositionId,
        in_list_position_id: inListPositionId,
        inter_team_trade_id: tradeId,
        trade_action: action,
      }
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
