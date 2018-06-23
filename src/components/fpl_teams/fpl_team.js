import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';

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
    this.selectTradeablePlayer = this.selectTradeablePlayer.bind(this);
    this.clearTradeablePlayer = this.clearTradeablePlayer.bind(this);
    this.completeTradeAction = this.completeTradeAction.bind(this);
    this.updateWaiverPickOrder = this.updateWaiverPickOrder.bind(this);
    this.deleteWaiverPick = this.deleteWaiverPick.bind(this);
    this.resetSelection = this.resetSelection.bind(this);
    this.selectFplTeamList = this.selectFplTeamList.bind(this);
  }

  componentDidMount () {
    const self = this;

    this.props.fetchFplTeam({ fpl_team_id: this.state.fplTeamId, show_waiver_picks: true, show_list_positions: true });
    this.props.fetchTeams();
    this.props.fetchPositions();

    cable.subscriptions.create({ channel: 'FplTeamChannel', room: this.state.fplTeamId }, {
      received: function (data) {
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

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;
    const state = this.state;
    let loaded;

    if (prevProps === props) {
      return;
    }

    if (
      props.fpl_team &&
      (props.fpl_team_list || props.league_status !== 'active') &&
      props.league &&
      props.teams &&
      props.positions
    ) {
      loaded = true;
    }

    if (props.success && props.success !== state.success) {
      this.alert('success', props.success);
    }

    if (props.error && props.error !== state.error && props.error.status === 422) {
      const baseError = props.error.data.error.base;

      if (!isEmpty(baseError)) {
        this.alert('error', baseError[0]);
      }
    }

    this.setState({
      ...props,
      loaded: loaded,
      editable: props.editable === 'true',
      show_score: props.show_score === 'true',
    });
  }

  alert (type, message) {
    return (
      Alert[type](
        message, {
          position: 'top',
          effect: 'bouncyflip',
          timeout: 5000,
        }
      )
    )
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
    this.setState({ selected: '', substitute_options: [], tradeeablePlayer: '' });
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

  selectTradeablePlayer (tradeablePlayer) {
    this.setState({ tradeablePlayer: tradeablePlayer });
  }

  clearTradeablePlayer () {
    this.setState({ tradeeablePlayer: '' });
  }

  completeTradeAction () {
    if (this.state.action === 'waiver') {
      this.props.createWaiverPick(this.state.fpl_team_list.id, this.state.selected.id, this.state.tradeablePlayer.id);
    } else if (this.state.action === 'trade') {
      const outPlayer = `${this.state.selected.first_name} ${this.state.selected.last_name}`;
      const inPlayer = `${this.state.tradeablePlayer.first_name} ${this.state.tradeablePlayer.last_name}`
      const confirmText = `Are you sure you want to trade out ${outPlayer} for ${inPlayer}?`;

      if (window.confirm(confirmText)) {
        this.props.tradePlayer(this.state.selected.id, this.state.tradeablePlayer.id);
      }
    }

    this.setState({
      selected: '',
      tradeablePlayer: '',
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
    this.props.fetchFplTeamList({
      fpl_team_list_id: fplTeamListId,
      show_waiver_picks: true,
      show_list_positions: true
    });
  }

  showFplTeamListNav () {
    if (isEmpty(this.state.fpl_team_lists)) {
      return
    }

    return (
      <FplTeamListNav { ...this.state } selectFplTeamList={ this.selectFplTeamList }/>
    );
  }

  showFplTeamListView () {
    if (isEmpty(this.state.list_positions)) {
      return;
    }

    return (
      <div>

        <FplTeamListView
          { ...this.state }
          initiateTrade={ this.initiateTrade }
          completeTradeAction={ this.completeTradeAction }
          selectListPosition={ this.selectListPosition }
          substitutePlayers={ this.substitutePlayers }
          clearSelectedPlayer={ this.clearSelectedPlayer }
          selectTradeablePlayer={ this.selectTradeablePlayer }
          clearTradeablePlayer={ this.clearTradeablePlayer }
          updateWaiverPickOrder={ this.updateWaiverPickOrder }
          deleteWaiverPick={ this.deleteWaiverPick }
          resetSelection={ this.resetSelection }
        />
      </div>
    );
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
            <h3>{ this.state.fpl_team.name } { this.editFplTeamButton() }</h3>
            <p>League: <Link to={ `/leagues/${this.state.league.id}` }> { this.state.league.name }</Link></p>
            { this.showFplTeamListNav() }
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
  let fpl_team;
  let fpl_team_list;
  let list_positions;
  let grouped_list_positions;
  let waiver_picks;
  let status;
  let editable;
  let show_score;

  const FplTeamListsReducer = state.FplTeamListsReducer;
  const FplTeamsReducer = state.FplTeamsReducer;
  const WaiverPicksReducer = state.WaiverPicksReducer;

  if (FplTeamsReducer.fpl_team) {
    fpl_team = FplTeamsReducer.fpl_team;
  }

  if (FplTeamListsReducer.fpl_team_list && fpl_team && FplTeamListsReducer.fpl_team_list.fpl_team_id === fpl_team.id) {
    fpl_team_list = FplTeamListsReducer.fpl_team_list;
    list_positions = FplTeamListsReducer.list_positions;
    grouped_list_positions = FplTeamListsReducer.grouped_list_positions;
    waiver_picks = FplTeamListsReducer.waiver_picks;
    status = FplTeamListsReducer.status;
    editable = FplTeamListsReducer.editable;
    show_score = FplTeamListsReducer.show_score;
  } else {
    fpl_team_list = FplTeamsReducer.fpl_team_list;
    list_positions = FplTeamsReducer.list_positions;
    grouped_list_positions = FplTeamsReducer.grouped_list_positions;
    waiver_picks = FplTeamsReducer.waiver_picks;
    status = FplTeamsReducer.status;
    editable = FplTeamsReducer.editable;
    show_score = FplTeamsReducer.show_score;
  }

  if (WaiverPicksReducer.fpl_team_list && fpl_team_list && WaiverPicksReducer.fpl_team_list.id === fpl_team_list.id) {
    waiver_picks = WaiverPicksReducer.waiver_picks;
  }

  return {
    fpl_team: FplTeamsReducer.fpl_team,
    league_status: FplTeamsReducer.league_status,
    fpl_team_list: fpl_team_list,
    fpl_team_lists: FplTeamsReducer.fpl_team_lists,
    league: FplTeamsReducer.league,
    list_positions: list_positions,
    status: status,
    grouped_list_positions: grouped_list_positions,
    editable: editable,
    show_score: show_score,
    current_user: FplTeamsReducer.current_user,
    user_owns_fpl_team: FplTeamsReducer.user_owns_fpl_team,
    substitute_options: state.ListPositionsReducer.substitute_options,
    unpicked_players: state.LeaguesReducer.unpicked_players,
    waiver_picks: waiver_picks,
    teams: state.TeamsReducer,
    positions: state.PositionsReducer,
    success: FplTeamsReducer.success || FplTeamListsReducer.success || WaiverPicksReducer.success,
    error: (
      FplTeamsReducer.error ||
      FplTeamListsReducer.error ||
      state.ListPositionsReducer.error ||
      WaiverPicksReducer.error
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
