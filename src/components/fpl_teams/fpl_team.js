import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { every, isEmpty, isNumber } from 'lodash';
import { Link } from 'react-router-dom';

import fetchFplTeam from  '../../actions/fpl_teams/fetch_fpl_team';
import fetchFplTeamList from  '../../actions/fpl_team_lists/fetch_fpl_team_list';
import fetchTeams from '../../actions/teams/fetch_teams';
import fetchPositions from '../../actions/positions/fetch_positions';
import fetchListPosition from '../../actions/list_positions/fetch_list_position';
import updateListPositionOrder from '../../actions/fpl_team_lists/update_list_position_order';
import fetchUnpickedPlayers from '../../actions/leagues/fetch_unpicked_players';
import createWaiverPick from '../../actions/waiver_picks/create';
import updateWaiverPickOrder from '../../actions/waiver_picks/update_waiver_pick_order';
import deleteWaiverPick from '../../actions/waiver_picks/delete_waiver_pick';
import tradePlayer from '../../actions/fpl_team_lists/trade_player';

import ErrorHandler from '../error_handler';
import { showSuccessAlert, showBaseErrorAlert } from '../../utils/general';
import FplTeamListNav from './fpl_team_list_nav';
import FplTeamListView from './fpl_team_list_view';

import { CABLE_CONNECTION } from '../../api-config';

const ActionCable = require('actioncable');
const cable = ActionCable.createConsumer(CABLE_CONNECTION);

class FplTeam extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      fplTeamId: this.props.match.params.id,
      listView: 'field',
      action: 'substitute',
    };

    this.selectListPosition = this.selectListPosition.bind(this);
    this.clearSelectedPlayer = this.clearSelectedPlayer.bind(this);
    this.substitutePlayers = this.substitutePlayers.bind(this);
    this.initiateTrade = this.initiateTrade.bind(this);
    this.selectTradePlayer = this.selectTradePlayer.bind(this);
    this.clearTradePlayer = this.clearTradePlayer.bind(this);
    this.completeTradeAction = this.completeTradeAction.bind(this);
    this.updateWaiverPickOrder = this.updateWaiverPickOrder.bind(this);
    this.deleteWaiverPick = this.deleteWaiverPick.bind(this);
    this.resetSelection = this.resetSelection.bind(this);
    this.selectFplTeamList = this.selectFplTeamList.bind(this);
  }

  componentWillMount () {
    const self = this;

    this.props.fetchFplTeam({ fpl_team_id: this.state.fplTeamId, show_waiver_picks: true, show_list_positions: true });
    // this.props.fetchFplTeamList(this.state.fplTeamId);
    this.props.fetchTeams();
    this.props.fetchPositions();

    cable.subscriptions.create({ channel: 'FplTeamChannel', room: this.state.fplTeamId }, {
      received: function (data) {
        console.log(data);
        self.setState({
          fpl_team_list: data.fpl_team_list,
          fpl_team_lists: data.fpl_team_lists,
          list_positions: data.list_positions,
          grouped_list_positions: data.grouped_list_positions,
          editable: data.editable === 'true',
        });

        if (self.state.user_owns_fpl_team) {
          self.setState({
            waiver_picks: data.waiver_picks,
          });
        }
      }
    });
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      fpl_team: nextProps.fpl_team,
      fpl_team_list: nextProps.fpl_team_list,
      fpl_team_lists: nextProps.fpl_team_lists,
      list_positions: nextProps.list_positions,
      editable: nextProps.editable === 'true',
      status: nextProps.status,
      league_status: nextProps.league_status,
      grouped_list_positions: nextProps.grouped_list_positions,
      teams: nextProps.teams,
      positions: nextProps.positions,
      unpicked_players: nextProps.unpicked_players,
      substitute_options: nextProps.substitute_options,
      waiver_picks: nextProps.waiver_picks,
      current_user: nextProps.current_user,
      user_owns_fpl_team: nextProps.user_owns_fpl_team,
      error: nextProps.error,
    });

    if (!isEmpty(nextProps.success)) {
      this.setState({
        success: nextProps.success
      });
    }

    if (
      (!isEmpty(nextProps.fpl_team) && (!isEmpty(nextProps.fpl_team_list) || nextProps.league_status !== 'active')) &&
      !isEmpty(nextProps.teams) &&
      !isEmpty(nextProps.positions)
    ) {
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

  selectListPosition (listPosition) {
    if (!this.state.editable) {
      return;
    }

    this.setState({ selected: listPosition });
    if (this.state.action === 'substitute') {
      this.props.fetchListPosition(listPosition.id);
    }
  }

  clearSelectedPlayer () {
    this.setState({ selected: '', substitute_options: [], tradePlayer: '' });
  }

  substitutePlayers (substituteListPosition) {
    this.props.updateListPositionOrder(this.state.selected.id, substituteListPosition.id);
    this.setState({ selected: '' });
  }

  initiateTrade () {
    this.props.fetchUnpickedPlayers(this.state.fpl_team.league_id);
    this.setState({
      action: this.state.status,
      selected: '',
    });
  }

  selectTradePlayer (tradePlayer) {
    this.setState({ tradePlayer: tradePlayer });
  }

  clearTradePlayer () {
    this.setState({ tradePlayer: '' });
  }

  completeTradeAction () {
    if (this.state.action === 'waiver') {
      this.props.createWaiverPick(this.state.fpl_team_list.id, this.state.selected.id, this.state.tradePlayer.id);
    } else if (this.state.action === 'trade') {
      const outPlayer = `${this.state.selected.first_name} ${this.state.selected.last_name}`;
      const inPlayer = `${this.state.tradePlayer.first_name} ${this.state.tradePlayer.last_name}`
      const confirmText = `Are you sure you want to trade out ${outPlayer} for ${inPlayer}?`;

      if (window.confirm(confirmText)) {
        this.props.tradePlayer(this.state.selected.id, this.state.tradePlayer.id);
      }
    }

    this.setState({
      selected: '',
      tradePlayer: '',
    })
  }

  updateWaiverPickOrder (waiverPickId, pickNumber) {
    this.props.updateWaiverPickOrder(this.state.fpl_team_list.id, waiverPickId, pickNumber);
  }

  deleteWaiverPick (waiverPick) {
    const confirmText =
      `Are you sure you want to delete this waiver pick - Pick Number: ${waiverPick.pick_number}, ` +
      `Out: ${waiverPick.out_first_name} ${waiverPick.out_last_name}, ` +
      `In: ${waiverPick.in_first_name} ${waiverPick.in_last_name}?`

    if (window.confirm(confirmText)) {
      this.props.deleteWaiverPick(this.state.fpl_team_list.id, waiverPick.id);
    }
  }

  resetSelection () {
    this.setState({ action: 'substitute', selected: '', substitute_options: [] });
  }

  selectFplTeamList (fplTeamListId) {
    this.props.fetchFplTeamList({ fpl_team_list_id: fplTeamListId, show_waiver_picks: true, show_list_positions: true });
  }

  showFplTeamListView () {
    if (isEmpty(this.state.list_positions)) {
      return;
    }
    return (
      <FplTeamListView
        { ...this.state }
        initiateTrade={ this.initiateTrade }
        completeTradeAction={ this.completeTradeAction }
        selectListPosition={ this.selectListPosition }
        substitutePlayers={ this.substitutePlayers }
        clearSelectedPlayer={ this.clearSelectedPlayer }
        selectTradePlayer={ this.selectTradePlayer }
        clearTradePlayer={ this.clearTradePlayer }
        updateWaiverPickOrder={ this.updateWaiverPickOrder }
        deleteWaiverPick={ this.deleteWaiverPick }
        resetSelection={ this.resetSelection }
      />
    );
  }

  render () {
    if (this.state.error && this.state.error.status !== 422) {
      return (
        <ErrorHandler error={ this.state.error } />
      )
    }

    if (this.state.loaded) {
      console.log(this.state)
      return (
        <div className='container-fluid'>
          <div className='col col-sm-12'>
            { showSuccessAlert(this.state.success) }
            { showBaseErrorAlert(this.state.error) }
            <h3>{ this.state.fpl_team.name } { this.editFplTeamButton() }</h3>
            <FplTeamListNav { ...this.state } selectFplTeamList={ this.selectFplTeamList }/>
            { this.showFplTeamListView() }
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
    league_status: state.FplTeamsReducer.league_status,
    fpl_team_list: state.FplTeamListsReducer.fpl_team_list || state.FplTeamsReducer.fpl_team_list,
    fpl_team_lists: state.FplTeamsReducer.fpl_team_lists,
    list_positions: state.FplTeamListsReducer.list_positions || state.FplTeamsReducer.list_positions,
    status: state.FplTeamListsReducer.status || state.FplTeamsReducer.status,
    grouped_list_positions: state.FplTeamListsReducer.grouped_list_positions || state.FplTeamsReducer.grouped_list_positions,
    editable: state.FplTeamListsReducer.editable || state.FplTeamsReducer.editable,
    current_user: state.FplTeamsReducer.current_user,
    user_owns_fpl_team: state.FplTeamsReducer.user_owns_fpl_team,
    substitute_options: state.ListPositionsReducer.substitute_options,
    unpicked_players: state.LeaguesReducer.unpicked_players,
    waiver_picks: state.WaiverPicksReducer.waiver_picks|| state.FplTeamListsReducer.waiver_picks || state.FplTeamsReducer.waiver_picks,
    teams: state.TeamsReducer,
    positions: state.PositionsReducer,
    success: state.FplTeamsReducer.success || state.FplTeamListsReducer.success || state.WaiverPicksReducer.success,
    error: (
      state.FplTeamsReducer.error ||
      state.FplTeamListsReducer.error ||
      state.ListPositionsReducer.error ||
      state.WaiverPicksReducer.error
    ),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchFplTeam: fetchFplTeam,
    fetchFplTeamList: fetchFplTeamList,
    fetchTeams: fetchTeams,
    fetchPositions: fetchPositions,
    fetchListPosition: fetchListPosition,
    fetchUnpickedPlayers: fetchUnpickedPlayers,
    updateListPositionOrder: updateListPositionOrder,
    createWaiverPick: createWaiverPick,
    updateWaiverPickOrder: updateWaiverPickOrder,
    deleteWaiverPick: deleteWaiverPick,
    tradePlayer: tradePlayer,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FplTeam);
