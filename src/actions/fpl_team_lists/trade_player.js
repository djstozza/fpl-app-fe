import { TRADE_PLAYER, SHOW_FPL_TEAM_LIST_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT, getLocalStorageHeader, setLocalStorageHeader } from './../../api-config';

export default function tradePlayer (listPositionId, inPlayerId) {
  return dispatch => {
    axios({
      url: `${API_ROOT}/trades.json`,
      method: 'POST',
      ...getLocalStorageHeader(),
      data: {
        list_position_id: listPositionId,
        in_player_id: inPlayerId,
      }
    }).then(res => {
      setLocalStorageHeader(res);
      dispatch(tradePlayerAsync(res.data));
    }).catch(error => {
      const data = error.response.data;
      setLocalStorageHeader(error.response);
      dispatch({
        type: SHOW_FPL_TEAM_LIST_ERRORS,
        payload: {
          error: error.response,
          fpl_team_list: data.fpl_team_list,
          grouped_list_positions: data.grouped_list_positions,
          list_positions: data.list_positions,
          status: data.status,
        }
      });
    });
  }
}

function tradePlayerAsync (data) {
  return {
    type: TRADE_PLAYER,
    payload: data
  };
}
