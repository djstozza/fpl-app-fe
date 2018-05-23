import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { every, isEmpty, isNumber } from 'lodash';
import { Link } from 'react-router-dom';

import fetchFplTeam from  '../../actions/fpl_teams/fetch_fpl_team';
import fetchOutPlayers from  '../../actions/out_players/fetch_out_players';
import fetchAllTradeablePlayers from '../../actions/in_players/fetch_all_tradeable_players';
import fetchTeams from '../../actions/teams/fetch_teams';
import fetchPositions from '../../actions/positions/fetch_positions';
import createInterTeamTradeGroup from '../../actions/inter_team_trades/create';
import fetchIntrTeamTradeGroups from '../../actions/inter_team_trades/fetch';
import updateInterTeamTradeGroup from '../../actions/inter_team_trades/update';

import ErrorHandler from '../error_handler';
import { showSuccessAlert, showBaseErrorAlert, capitaliseText } from '../../utils/general';

import NewTradeGroupButton from './new_trade_group_button';
import OutPlayersTable from './out_players_table';
import InPlayersTable from './in_players_table';
import TradeGroupAccordions from './trade_group_accordions';

class InterTeamTrades extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      fplTeamId: this.props.match.params.id,
    }

    this.newInterTeamTrade = this.newInterTeamTrade.bind(this);
    this.cancelInterTeamTrade = this.cancelInterTeamTrade.bind(this);
    this.selectPlayer = this.selectPlayer.bind(this);
    this.clearSelectedPlayer = this.clearSelectedPlayer.bind(this);
    this.selectTradePlayer = this.selectTradePlayer.bind(this);
    this.clearTradePlayer = this.clearTradePlayer.bind(this);
    this.showTradeTables = this.showTradeTables.bind(this);
    this.updateTrade = this.updateTrade.bind(this);
  }

  componentWillMount () {
    this.props.fetchIntrTeamTradeGroups(this.state.fplTeamId);
    this.props.fetchFplTeam(this.state.fplTeamId);
    this.props.fetchTeams();
    this.props.fetchPositions();
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      fpl_team: nextProps.fpl_team,
      fpl_teams: nextProps.fpl_teams,
      fpl_team_list: nextProps.fpl_team_list,
      out_players: nextProps.out_players,
      in_players: nextProps.in_players,
      out_trade_groups: nextProps.out_trade_groups,
      in_trade_groups: nextProps.in_trade_groups,
      status: nextProps.status,
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

    if (nextProps.fpl_team && nextProps.teams && nextProps.positions && nextProps.out_trade_groups) {
      this.setState({
        loaded: true
      });
    }
  }

  newInterTeamTrade () {
    this.props.fetchOutPlayers(this.state.fplTeamId);
    this.props.fetchAllTradeablePlayers(this.state.fplTeamId);
  }

  selectPlayer (player) {
    this.setState({ selected: player });
  }

  clearSelectedPlayer () {
    this.setState({ selected: '', tradePlayer: '' });
  }

  cancelInterTeamTrade () {
    this.setState({
      selected: '',
      out_players: [],
      in_players: []
    })
  }

  selectTradePlayer (tradePlayer) {
    this.setState({ tradePlayer: tradePlayer });
  }

  clearTradePlayer () {
    this.setState({ tradePlayer: '' });
  }

  updateTrade (tradeGroupId, selectedId, tradePlayerId, tradeId, tradeAction) {
    this.props.updateInterTeamTradeGroup(
      this.state.fpl_team_list.id,
      tradeGroupId,
      selectedId,
      tradePlayerId,
      tradeId,
      tradeAction,
    );
  }

  showNewInterTeamTrade () {
    if (!isEmpty(this.state.out_players)) {
      return (
        <div className='row'>
          <div className='col col-md-6 col-sm-12'>
            <OutPlayersTable
              {...this.state }
              selectPlayer={ this.selectPlayer }
              clearSelectedPlayer={ this.clearSelectedPlayer }
            />
          </div>
          <div className='col col-md-6 col-sm-12'>
            <InPlayersTable
              { ...this.state }
              selectTradePlayer={ this.selectTradePlayer }
              clearTradePlayer={ this.clearTradePlayer }
            />
            { this.completeTradeButtons() }
          </div>
        </div>
      );
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
        onClick={ () => {
            this.clearSelectedPlayer()
            this.props.createInterTeamTradeGroup(
              this.state.selected.list_position_id,
              this.state.tradePlayer.list_position_id,
              this.state.fpl_team_list.id
            )
          }
        }
      >
        Submit
      </button>
    );
  }

  showTradeTables () {
    if (!this.state.user_owns_fpl_team) {
      return;
    }

    if (isEmpty(this.state.out_trade_groups) && isEmpty(this.state.in_trade_groups)) {
      return;
    }

    return (
      <TradeGroupAccordions { ...this.props } updateTrade={ this.updateTrade } />
    );
  }

  render () {
    if (this.state.error && this.state.error.status !== 422) {
      return (
        <ErrorHandler error={ this.state.error } />
      )
    }

    if (this.state.loaded) {
      console.log(this.state.success)
      return (
        <div className='container-fluid'>
          <div className='col col-sm-12'>
            { showSuccessAlert(this.state.success) }
            { showBaseErrorAlert(this.state.error) }
            <h3>{ this.state.fpl_team.name } Inter Team Trades</h3>
            <NewTradeGroupButton
              { ...this.state }
              newInterTeamTrade={ this.newInterTeamTrade }
              cancelInterTeamTrade={ this.cancelInterTeamTrade }
            />
            { this.showNewInterTeamTrade() }
            { this.showTradeTables() }
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
    user_owns_fpl_team: state.FplTeamsReducer.user_owns_fpl_team,
    fpl_team_list: state.FplTeamsReducer.fpl_team_list,
    out_players: state.OutPlayersReducer.out_players,
    in_players: state.InPlayersReducer.in_players,
    fpl_teams: state.InPlayersReducer.tradeable_fpl_teams,
    out_trade_groups: state.InterTeamTradesReducer.out_trade_groups,
    in_trade_groups: state.InterTeamTradesReducer.in_trade_groups,
    status: state.OutPlayersReducer.status,
    current_user: state.FplTeamsReducer.current_user,
    teams: state.TeamsReducer,
    positions: state.PositionsReducer,
    success: state.InterTeamTradesReducer.success,
    error: state.InterTeamTradesReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchFplTeam: fetchFplTeam,
    fetchOutPlayers: fetchOutPlayers,
    fetchTeams: fetchTeams,
    fetchPositions: fetchPositions,
    fetchAllTradeablePlayers: fetchAllTradeablePlayers,
    createInterTeamTradeGroup: createInterTeamTradeGroup,
    fetchIntrTeamTradeGroups: fetchIntrTeamTradeGroups,
    updateInterTeamTradeGroup: updateInterTeamTradeGroup,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InterTeamTrades);
