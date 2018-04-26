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
import fetchCurrentWaiverPicks from '../../actions/waiver_picks/fetch_current_waiver_picks';
import updateWaiverPickOrder from '../../actions/waiver_picks/update_waiver_pick_order';
import deleteWaiverPick from '../../actions/waiver_picks/delete_waiver_pick';
import tradePlayer from '../../actions/fpl_team_lists/trade_player';

import ErrorHandler from '../error_handler';
import { showSuccessAlert, showBaseErrorAlert, capitaliseText } from '../../utils/general';

import FplTeamListTable from './fpl_team_list_table';
import FieldView from './field_view';
import TradePlayersTable from './trade_players_table';
import WaiverPicksTable from './waiver_picks_table';

class FplTeam extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      fplTeamId: this.props.match.params.id,
      listView: 'field',
      action: 'substitute',
    };

    this.fetchSubstitueOptions = this.fetchSubstitueOptions.bind(this);
    this.clearSelectedPlayer = this.clearSelectedPlayer.bind(this);
    this.substitutePlayers = this.substitutePlayers.bind(this);
    this.initiateTrade = this.initiateTrade.bind(this);
    this.selectTradePlayer = this.selectTradePlayer.bind(this);
    this.clearTradePlayer = this.clearTradePlayer.bind(this);
    this.completeTradeButtons = this.completeTradeButtons.bind(this);
    this.completeTradeAction = this.completeTradeAction.bind(this);
    this.updateWaiverPickOrder = this.updateWaiverPickOrder.bind(this);
    this.deleteWaiverPick = this.deleteWaiverPick.bind(this);
  }

  componentWillMount () {
    this.props.fetchFplTeam(this.state.fplTeamId);
    this.props.fetchFplTeamList(this.state.fplTeamId);
    this.props.fetchCurrentWaiverPicks(this.state.fplTeamId);
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

  descriptionTitle () {
    if (!this.state.user_owns_fpl_team) {
      return;
    }

    if (this.state.status === 'pre_game' || this.state.status === 'started') {
      return;
    }

    let title;

    if (this.state.action === 'substitute') {
      title = 'Starting Lineup';
    } else {
      title = `${capitaliseText(this.state.action)} Out`;
    }

    return <h4 className='mb-0'>{ title }</h4>
  }

  descriptionText () {
    if (this.state.status === 'pre_game' || this.state.status === 'started') {
      return;
    }

    if (this.state.action === 'substitute') {
        return <span>Select your starting lineup</span>;
    } else {
      return <span>(1) Select the player you wish to { this.state.action } out</span>;
    }
  }

  fplTeamListView () {
    if (isEmpty(this.state.fpl_team_list)) {
      return;
    }

    return (
      <div>
        { this.showButtons() }
        <div className='row'>
          <div className={`col col-12 col-md-12 ${this.colClass()}`}>
            { this.showFplTeamListTable() }
          </div>
          <div className='col col-12 col-md-12 col-lg-6'>
            { this.showTradePlayersTable() }
          </div>
        </div>
        { this.showWaiverPicksTable() }
      </div>
    )
  }

  showFplTeamListTable () {
    return (
      <div>
        { this.descriptionTitle() }
        { this.descriptionText() }
        <FplTeamListTable
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

  showTradePlayersTable () {
    if (isEmpty(this.state.unpicked_players)) {
      return;
    }

    if (this.state.action === 'substitute') {
      return;
    }

    return (
      <div>
        <h4 className='mb-0'>{ capitaliseText(this.state.action) } In</h4>
        <span>(2) Select the player you wish to { this.state.action } in</span>
        <TradePlayersTable
          { ...this.state }
          players={ this.state.unpicked_players }
          selectTradePlayer={ this.selectTradePlayer }
          clearTradePlayer={ this.clearTradePlayer }
        />
        { this.completeTradeButtons() }
      </div>
    )
  }

  fetchSubstitueOptions (listPosition) {
    this.setState({ selected: listPosition, playerIsSelected: true });
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

  showWaiverPicksTable () {
    if (!this.state.user_owns_fpl_team) {
      return;
    }

    if (isEmpty(this.state.waiver_picks)) {
      return;
    }

    return (
      <div>
        <h4 className='mt-3 mb-0'>Waiver Picks</h4>
        <WaiverPicksTable
          { ...this.state }
          updateWaiverPickOrder={ this.updateWaiverPickOrder }
          deleteWaiverPick={ this.deleteWaiverPick }
        />
      </div>
    );
  }

  selectTradePlayer (tradePlayer) {
    this.setState({ tradePlayer: tradePlayer });
  }

  clearTradePlayer () {
    this.setState({ tradePlayer: '' });
  }

  showButtons () {
    if (!this.state.user_owns_fpl_team) {
      return;
    }

    if (this.state.status === 'pre_game' || this.state.status === 'started') {
      return;
    }

    if (this.state.action === 'substitute' && this.state.status == 'waiver') {
      return [
        <button
          key='waiver'
          className='btn btn-secondary btn-lg'
          onClick={ () => this.initiateTrade() }
        >
          Waiver
        </button>,
      ]
    } else if (this.state.action === 'substitute' && this.state.status === 'trade') {
      return [
        <button
          key='waiver'
          className='btn btn-secondary btn-lg'
          onClick={ () => this.initiateTrade() }
        >
          Trade
        </button>,
      ]
    } else {
      return [
        <button
          key='substitute'
          className='btn btn-secondary btn-lg'
          onClick={ () => this.setState({ action: 'substitute', selected: '', substitute_options: [] }) }
        >
          Change line up
        </button>,
      ]
    }
  }

  completeTradeButtons () {
    if (!this.state.user_owns_fpl_team) {
      return;
    }

    if (isEmpty(this.state.selected) || isEmpty(this.state.tradePlayer)) {
      return;
    }

    return (
      <button
        className='btn btn-secondary'
        onClick={ () => this.completeTradeAction() }
      >
       Complete { capitaliseText(this.state.action) }
      </button>
    );
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

  colClass () {
    let classes;
    if (this.state.action === 'substitute') {
      classes = 'col-lg-12';
    } else {
      classes = 'col-lg-6';
    }
    return classes;
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
            { this.fplTeamListView() }
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
    substitute_options: state.ListPositionsReducer.substitute_options,
    unpicked_players: state.LeaguesReducer.unpicked_players,
    waiver_picks: state.WaiverPicksReducer.waiver_picks,
    teams: state.TeamsReducer,
    positions: state.PositionsReducer,
    success: state.FplTeamsReducer.success || state.WaiverPicksReducer.success,
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
    fetchCurrentWaiverPicks: fetchCurrentWaiverPicks,
    updateWaiverPickOrder: updateWaiverPickOrder,
    deleteWaiverPick: deleteWaiverPick,
    tradePlayer: tradePlayer,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FplTeam);
