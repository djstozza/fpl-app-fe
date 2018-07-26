import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { every, isEmpty, isNumber } from 'lodash';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Alert from 'react-s-alert';

import fetchFplTeam from  '../../actions/fpl_teams/fetch_fpl_team';
import newInterTeamTradeGroup from  '../../actions/inter_team_trades/new';
import fetchTeams from '../../actions/teams/fetch_teams';
import fetchPositions from '../../actions/positions/fetch_positions';
import createInterTeamTradeGroup from '../../actions/inter_team_trades/create';
import fetchIntrTeamTradeGroups from '../../actions/inter_team_trades/fetch';
import updateInterTeamTradeGroup from '../../actions/inter_team_trades/update';
import fetchLeagueFplTeams from '../../actions/leagues/fetch_fpl_teams';

import Spinner from '../spinner';
import ErrorHandler from '../error_handler';
import { capitaliseText } from '../../utils/general';

import NewTradeGroupButton from './new_trade_group_button';
import OutPlayersTable from './out_players_table';
import InPlayersTable from './in_players_table';
import TradeGroupAccordions from './trade_group_accordions';

import { CABLE_CONNECTION } from '../../api-config';

const ActionCable = require('actioncable');
const cable = ActionCable.createConsumer(CABLE_CONNECTION);

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
    this.selectTradeablePlayer = this.selectTradeablePlayer.bind(this);
    this.clearTradeablePlayer = this.clearTradeablePlayer.bind(this);
    this.showTradeTables = this.showTradeTables.bind(this);
    this.updateTrade = this.updateTrade.bind(this);
  }

  componentDidMount () {
    const self = this;

    this.props.fetchFplTeam({ fpl_team_id: this.state.fplTeamId, show_waiver_picks: false, show_trade_groups: true });
    this.props.fetchTeams();
    this.props.fetchPositions();

    cable.subscriptions.create({ channel: 'FplTeamChannel', room: this.state.fplTeamId }, {
      received: function (data) {
        if (self.state.user_owns_fpl_team) {
          self.setState({
            out_trade_groups: data.out_trade_groups,
            in_trade_groups: data.in_trade_groups,
            editable: data.editable,
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

    if (props.fpl_team && props.teams && props.positions && props.out_trade_groups) {
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

  newInterTeamTrade () {
    if (isEmpty(this.state.fpl_teams)) {
      this.props.fetchLeagueFplTeams(this.state.fpl_team.league_id, this.state.fplTeamId);
    }

    this.props.newInterTeamTradeGroup({ fpl_team_list_id: this.state.fpl_team_list.id });
  }

  selectPlayer (player) {
    this.setState({ selected: player });
  }

  clearSelectedPlayer () {
    this.setState({ selected: '', tradeablePlayer: '' });
  }

  cancelInterTeamTrade () {
    this.setState({
      selected: '',
      tradeablePlayer: '',
      out_players: [],
      in_players: []
    })
  }

  selectTradeablePlayer (tradeablePlayer) {
    this.setState({ tradeablePlayer: tradeablePlayer });
  }

  clearTradeablePlayer () {
    this.setState({ tradeablePlayer: '' });
  }

  updateTrade (params) {
    params['fpl_team_list_id'] = this.state.fpl_team_list.id,
    this.props.updateInterTeamTradeGroup(params);
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
              selectTradeablePlayer={ this.selectTradeablePlayer }
              clearTradeablePlayer={ this.clearTradeablePlayer }
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

    if (isEmpty(this.state.selected) || isEmpty(this.state.tradeablePlayer)) {
      return;
    }

    return (
      <button
        className='btn btn-secondary'
        onClick={ () => {
            this.clearSelectedPlayer();
            this.props.createInterTeamTradeGroup(
              this.state.selected.list_position_id,
              this.state.tradeablePlayer.list_position_id,
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
      <TradeGroupAccordions { ...this.state } updateTrade={ this.updateTrade } />
    );
  }

  render () {
    if (this.state.error && this.state.error.status !== 422) {
      return (
        <ErrorHandler error={ this.state.error } />
      )
    }

    if (!isEmpty(this.state.fpl_team) && !this.state.user_owns_fpl_team) {
      return <Redirect to='/profile' error='You are not authorised to visit this page'/>
    }

    if (this.state.loaded) {
      return (
        <div className='container-fluid'>
          <div className='col col-sm-12'>
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
      return <Spinner />;
    }
  }
}

function mapStateToProps (state) {
  return {
    fpl_team: state.FplTeamsReducer.fpl_team,
    user_owns_fpl_team: state.FplTeamsReducer.user_owns_fpl_team,
    fpl_team_list: state.FplTeamsReducer.fpl_team_list,
    out_players: state.TradeablePlayersReducer.out_players,
    in_players: state.TradeablePlayersReducer.in_players,
    fpl_teams: state.LeaguesReducer.fpl_teams,
    out_trade_groups: state.InterTeamTradesReducer.out_trade_groups || state.FplTeamsReducer.out_trade_groups,
    in_trade_groups: state.InterTeamTradesReducer.in_trade_groups || state.FplTeamsReducer.in_trade_groups,
    editable: state.FplTeamsReducer.editable,
    round_status: state.FplTeamsReducer.round_status,
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
    newInterTeamTradeGroup: newInterTeamTradeGroup,
    fetchTeams: fetchTeams,
    fetchPositions: fetchPositions,
    createInterTeamTradeGroup: createInterTeamTradeGroup,
    fetchIntrTeamTradeGroups: fetchIntrTeamTradeGroups,
    updateInterTeamTradeGroup: updateInterTeamTradeGroup,
    fetchLeagueFplTeams: fetchLeagueFplTeams,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InterTeamTrades);
