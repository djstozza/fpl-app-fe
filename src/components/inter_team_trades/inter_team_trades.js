import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { every, isEmpty, isNumber } from 'lodash';
import { Link } from 'react-router-dom';

import fetchFplTeam from  '../../actions/fpl_teams/fetch_fpl_team';
import fetchFplTeamList from  '../../actions/fpl_team_lists/fetch_fpl_team_list';
import fetchTeams from '../../actions/teams/fetch_teams';
import fetchPositions from '../../actions/positions/fetch_positions';

import ErrorHandler from '../error_handler';
import { showSuccessAlert, showBaseErrorAlert, capitaliseText } from '../../utils/general';

import NewTradeGroupButton from './new_trade_group_button';

class InterTeamTrades extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      fplTeamId: this.props.match.params.id,
    }
  }

  componentWillMount () {
    this.props.fetchFplTeam(this.state.fplTeamId);
    this.props.fetchFplTeamList(this.state.fplTeamId);
    this.props.fetchTeams();
    this.props.fetchPositions();
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      fpl_team: nextProps.fpl_team,
      fpl_team_list: nextProps.fpl_team_list,
      list_positions: nextProps.list_positions,
      status: nextProps.status,
      grouped_list_positions: nextProps.grouped_list_positions,
      teams: nextProps.teams,
      positions: nextProps.positions,
      current_user: nextProps.current_user,
      user_owns_fpl_team: nextProps.user_owns_fpl_team,
      unSelectable: nextProps.status === 'pre_game' || nextProps.status === 'started',
      error: nextProps.error,
    });

    if (!isEmpty(nextProps.success)) {
      this.setState({
        success: nextProps.success
      });
    }

    if (!isEmpty(nextProps.fpl_team)) {
      this.setState({
        loaded: true
      });
    }
  }

  render () {
    if (this.state.error && this.state.error.status !== 422) {
      return (
        <ErrorHandler error={ this.state.error } />
      )
    }

    if (this.state.loaded) {
      return (
        <div className='container-fluid'>
          <div className='col col-sm-12'>
            { showSuccessAlert(this.state.success) }
            { showBaseErrorAlert(this.state.error) }
            <h3>{ this.state.fpl_team.name } Inter Team Trades</h3>
            <NewTradeGroupButton { ...this.state }/>
          </div>
        </div>
      );
    } else {
      return (
        <p>Loading...</p>
      );
    }
  }
}

function mapStateToProps (state) {
  return {
    fpl_team: state.FplTeamsReducer.fpl_team,
    fpl_team_list: state.FplTeamListsReducer.fpl_team_list,
    list_positions: state.FplTeamListsReducer.list_positions,
    status: state.FplTeamListsReducer.status,
    grouped_list_positions: state.FplTeamListsReducer.grouped_list_positions,
    current_user: state.FplTeamsReducer.current_user,
    user_owns_fpl_team: state.FplTeamsReducer.user_owns_fpl_team,
    teams: state.TeamsReducer,
    positions: state.PositionsReducer,
    success: state.FplTeamsReducer.success || state.FplTeamsReducer.success,
    error: (
      state.FplTeamsReducer.error ||
      state.FplTeamListsReducer.error
    ),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchFplTeam: fetchFplTeam,
    fetchFplTeamList: fetchFplTeamList,
    fetchTeams: fetchTeams,
    fetchPositions: fetchPositions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InterTeamTrades);
