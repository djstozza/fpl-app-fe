import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchFplTeam from  '../../actions/fpl_teams/fetch_fpl_team.js';
import fetchFplTeamList from  '../../actions/fpl_team_lists/fetch_fpl_team_list.js';
import fetchTeams from '../../actions/teams/fetch_teams.js';
import fetchPositions from '../../actions/positions/fetch_positions.js';
import fetchListPosition from '../../actions/list_positions/fetch_list_position.js';
import updateOrder from '../../actions/fpl_team_lists/update_order.js';
import { every, isEmpty, isNumber } from 'lodash';
import ErrorHandler from '../error_handler.js';
import { Link } from 'react-router-dom';
import { showSuccessAlert, showBaseErrorAlert } from '../../utils/user.js';
import PlayersTable from './players_table';
import FieldView from './field_view';

class FplTeam extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      fplTeamId: this.props.match.params.id,
      listView: 'field',
    };

    this.editFplTeamButton = this.editFplTeamButton.bind(this);
    this.showPlayersTable = this.showPlayersTable.bind(this);
    this.fetchSubstitueOptions = this.fetchSubstitueOptions.bind(this);
    this.clearSelectedPlayer = this.clearSelectedPlayer.bind(this);
    this.substitutePlayers = this.substitutePlayers.bind(this);
    this.showButtons = this.showButtons.bind(this);
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
      grouped_list_positions: nextProps.grouped_list_positions,
      teams: nextProps.teams,
      positions: nextProps.positions,
      substitute_options: nextProps.substitute_options,
      current_user: nextProps.current_user,
      user_owns_fpl_team: nextProps.user_owns_fpl_team,
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

  editFplTeamButton () {
    if (this.state.user_owns_fpl_team) {
      return (
        <Link to={ `/fpl_teams/${this.state.fplTeamId}/edit` } className='btn btn-secondary'>Edit</Link>
      );
    }
  }

  showPlayersTable () {
    if (isEmpty(this.state.fpl_team_list)) {
      return;
    }

    return (
      <div>
        <PlayersTable
          { ...this.state }
          fetchSubstitueOptions={ this.fetchSubstitueOptions }
          substitutePlayers={ this.substitutePlayers }
          clearSelectedPlayer={ this.clearSelectedPlayer }
        />
        <FieldView { ...this.state }
          fetchSubstitueOptions={ this.fetchSubstitueOptions }
          substitutePlayers={ this.substitutePlayers }
          clearSelectedPlayer={ this.clearSelectedPlayer }
        />
      </div>
    );
  }

  fetchSubstitueOptions (listPositionId) {
    this.setState({ selected: listPositionId, playerIsSelected: true });
    this.props.fetchListPosition(listPositionId);
  }

  clearSelectedPlayer () {
    this.setState({ selected: '', substitute_options: [] });
  }

  substitutePlayers (substituteListPositionId) {
    this.props.updateOrder(this.state.selected, substituteListPositionId);
    this.setState({ selected: '' });
  }

  showButtons () {
    if (!this.state.user_owns_fpl_team) {
      return;
    }

    return [
      <button key='waiver' className='btn btn-secondary'>Waiver</button>
    ]
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
            <h3>{ this.state.fpl_team.name } { this.editFplTeamButton() }</h3>
            { this.showPlayersTable() }
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
    grouped_list_positions: state.FplTeamListsReducer.grouped_list_positions,
    current_user: state.FplTeamsReducer.current_user,
    user_owns_fpl_team: state.FplTeamsReducer.user_owns_fpl_team,
    substitute_options: state.ListPositionsReducer.substitute_options,
    teams: state.TeamsReducer,
    positions: state.PositionsReducer,
    success: state.FplTeamsReducer.success,
    error: state.FplTeamsReducer.error || state.FplTeamListsReducer.error || state.ListPositionsReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchFplTeam: fetchFplTeam,
    fetchFplTeamList: fetchFplTeamList,
    fetchTeams: fetchTeams,
    fetchPositions: fetchPositions,
    fetchListPosition: fetchListPosition,
    updateOrder: updateOrder,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FplTeam);
