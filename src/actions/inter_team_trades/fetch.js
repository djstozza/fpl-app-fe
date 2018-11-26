import { FETCH_INTER_TEAM_TRADE_GROUPS, SHOW_INTER_TEAM_TRADE_GROUP_ERRORS } from '../types';
import axios from 'axios';
import { API_ROOT } from './../../api-config';

export default function fetchIntrTeamTradeGroups (fplTeamId) {
  return dispatch => {
    axios.get(`${ API_ROOT }/fpl_teams/${ fplTeamId }/inter_team_trade_groups.json`).then(res => {
      dispatch(fetchIntrTeamTradeGroupsAsync(res.data));
    }).catch(error => {
      dispatch({ type: SHOW_INTER_TEAM_TRADE_GROUP_ERRORS, payload: { error: error.response } });
    });
  }
}

function fetchIntrTeamTradeGroupsAsync (data) {
  return {
    type: FETCH_INTER_TEAM_TRADE_GROUPS,
    payload: data
  };
}
