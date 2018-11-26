import { CREATE_INTER_TEAM_TRADE_GROUP, SHOW_INTER_TEAM_TRADE_GROUP_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function createInterTeamTradeGroup (outListPositionId, inListPositionId, fplTeamListId) {
  return dispatch => {
    axios({
      url: `${ API_ROOT }/inter_team_trade_groups.json`,
      method: 'POST',
      ...getLocalStorageHeader(),
      data: {
        out_list_position_id: outListPositionId,
        in_list_position_id: inListPositionId,
        fpl_team_list_id: fplTeamListId,
      }
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(createInterTeamTradeGroupAsync(res.data));
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

function createInterTeamTradeGroupAsync (data) {
  return {
    type: CREATE_INTER_TEAM_TRADE_GROUP,
    payload: data
  };
}
