import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';

import fetchMiniDraftPicks from '../../actions/mini_draft_picks/index';
import fetchTeams from '../../actions/teams/fetch_teams';
import fetchPositions from '../../actions/positions/fetch_positions';
import createMiniDraftPick from '../../actions/mini_draft_picks/create';
import passMiniDraftPick from '../../actions/mini_draft_picks/pass';
import fetchRound from '../../actions/round/fetch_round';

import ErrorHandler from '../error_handler';
import OutPlayersTable from '../inter_team_trades/out_players_table';
import TradePlayersTable from '../fpl_teams/trade_players_table';
// import DraftPlayersTable from './draft_players_table';
import MiniDraftPicksTable from './mini_draft_picks_table';
import { every, isEmpty, isNumber } from 'lodash';
import { showSuccessAlert } from '../../utils/general';

import { CABLE_CONNECTION } from '../../api-config';

const ActionCable = require('actioncable');
const cable = ActionCable.createConsumer(CABLE_CONNECTION);

class MiniDraft extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      leagueId: this.props.match.params.id
    }

    this.selectPlayer = this.selectPlayer.bind(this);
    this.clearSelectedPlayer = this.clearSelectedPlayer.bind(this);
    this.selectTradePlayer = this.selectTradePlayer.bind(this);
    this.clearTradePlayer = this.clearTradePlayer.bind(this);

    this.pass = this.pass.bind(this);
    this.draftDescription = this.draftDescription.bind(this);
    this.passMiniDraftPickButton = this.passMiniDraftPickButton.bind(this);
    this.alert = this.alert.bind(this);
  }

  componentWillMount () {
    const self = this;

    this.props.fetchMiniDraftPicks(this.state.leagueId);
    this.props.fetchTeams();
    this.props.fetchPositions();
    this.props.fetchRound();

    cable.subscriptions.create({ channel: 'MiniDraftPickChannel', room: this.state.leagueId }, {
      received: function (data) {
        let currentUserTurn;
        let yourTurnAlertable;


        if (!isEmpty(data.current_mini_draft_pick_user) && self.state.current_user.id === data.current_mini_draft_pick_user.id) {
          self.alert('info', "It's your turn.");

          self.setState({
            your_turn: true
          });
        } else {
          self.setState({
            your_turn: false
          })
        }

        self.setState({
          league: data.league,
          fpl_teams: data.fpl_teams,
          current_mini_draft_pick_user: data.current_mini_draft_pick_user,
          current_user: data.current_user,
          mini_draft_picks: data.mini_draft_picks,
          mini_draft_picked: data.mini_draft_picked,
          all_players_picked: data.all_players_picked,
          unpicked_players: data.unpicked_players,
          current_mini_draft_pick: data.current_mini_draft_pick,
          info: data.info,
        });

        self.alert('info', data.info);
      }
    });
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    this.setState({
      round: nextProps.round,
      league: nextProps.league,
      fpl_teams: nextProps.fpl_teams,
      fpl_team_list: nextProps.fpl_team_list,
      out_players: nextProps.out_players,
      mini_draft_picks: nextProps.mini_draft_picks,
      mini_draft_picked: nextProps.mini_draft_picked,
      all_players_picked: nextProps.all_players_picked,
      unpicked_players: nextProps.unpicked_players,
      current_mini_draft_pick: nextProps.current_mini_draft_pick,
      current_mini_draft_pick_user: nextProps.current_mini_draft_pick_user,
      current_user: nextProps.current_user,
      teams: nextProps.teams,
      positions: nextProps.positions,
      error: nextProps.error,
    });

    if (!isEmpty(nextProps.success)) {
      this.alert('success', nextProps.success);
    }

    if (!isEmpty(nextProps.error) && nextProps.error.status === 422) {
      this.alert('error', nextProps.error.data.error.base[0]);
    }

    if (!isEmpty(nextProps.league) && !isEmpty(nextProps.teams) && !isEmpty(nextProps.positions) && !isEmpty(nextProps.round)) {
      if (
        !isEmpty(nextProps.current_mini_draft_pick_user) &&
        nextProps.current_user.id === nextProps.current_mini_draft_pick_user.id
      ) {
        this.alert('info', "It's your turn.");

        this.setState({
          your_turn: true
        });
      }

      this.setState({
        loaded: true
      });
    }
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

  draftDescription () {
    const allPlayersPicked = this.state.all_players_picked;
    const miniDraftPicked = this.state.mini_draft_picked
    if (isEmpty(this.state.current_mini_draft_pick) || allPlayersPicked && miniDraftPicked) {
      return;
    }

    if (!this.state.your_turn) {
      return;
    }

    let miniDraftSubStr;

    if (!miniDraftPicked) {
      miniDraftSubStr = ' or select your pick number for the mini draft'
    }

    const draftPlayerStr = `Select the player you wish to draft${ !miniDraftPicked ? miniDraftSubStr : '' }.`
    const miniDraftStr = 'Select your pick number for the mini draft.'

    return (
      <div className='alert alert-primary' role='alert'>{ allPlayersPicked ? miniDraftStr : draftPlayerStr }</div>
    );
  }

  passMiniDraftPickButton () {
    if (isEmpty(this.state.current_mini_draft_pick) || this.state.mini_draft_picked) {
      return;
    }

    if (!this.state.your_turn) {
      return;
    }

    return (
      <button
        className='btn btn-danger btn-lg'
        onClick={ () => { this.pass(null, true) } }
      >
        Pass
      </button>
    )
  }

  pass () {
    const confirmText = 'Are you sure you want to pass?'

    if (window.confirm(confirmText)) {
      this.props.passMiniDraftPick(this.state.leagueId, this.state.fpl_team_list.id);
    }
  }

  selectPlayer (player) {
    this.setState({ selected: player });
  }

  clearSelectedPlayer () {
    this.setState({ selected: '', tradePlayer: '' });
  }

  selectTradePlayer (tradePlayer) {
    this.setState({ tradePlayer: tradePlayer });
  }

  clearTradePlayer () {
    this.setState({ tradePlayer: '' });
  }

  showTradePlayersTable () {
    if (!this.state.your_turn) {
      return;
    }

    return (
      <div className='col col-md-6 col-sm-12'>
        <TradePlayersTable
          { ...this.state }
          selectTradePlayer={ this.selectTradePlayer }
          clearTradePlayer={ this.clearTradePlayer }
        />
        { this.completeTradeButtons() }
      </div>
    )
  }

  completeTradeButtons () {
    if (!this.state.your_turn) {
      return;
    }

    if (isEmpty(this.state.selected) || isEmpty(this.state.tradePlayer)) {
      return;
    }

    return (
      <button
        className='btn btn-secondary'
        onClick={ () => {
            this.props.createMiniDraftPick(
              this.state.leagueId,
              this.state.selected.list_position_id,
              this.state.tradePlayer.id,
              this.state.fpl_team_list.id
            );
            this.clearSelectedPlayer();
          }
        }
      >
        Submit
      </button>
    );
  }

  render () {
    if (this.state.error && this.state.error.status !== 422) {
      return (
        <ErrorHandler error={ this.state.error } />
      );
    }

    if (this.state.loaded) {
      return (
        <div className='container-fluid'>
          <h3>League { this.state.leagueId } Mini Draft</h3>
          { this.passMiniDraftPickButton() }
          <div className='row'>
            <div className={ `col col-sm-12 ${this.state.your_turn ? 'col-md-6' : ''}` }>
              <OutPlayersTable
                { ...this.state }
                selectPlayer={ this.selectPlayer }
                clearSelectedPlayer={ this.clearSelectedPlayer }
              />
            </div>
            { this.showTradePlayersTable() }
          </div>
          <div className='row'>
            <div className='col col-sm-12'>
              <MiniDraftPicksTable { ... this.state } />
            </div>
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
    round: state.RoundReducer.round,
    teams: state.TeamsReducer,
    positions: state.PositionsReducer,
    league: state.MiniDraftPicksReducer.league,
    fpl_teams: state.MiniDraftPicksReducer.fpl_teams,
    fpl_team_list: state.MiniDraftPicksReducer.fpl_team_list,
    out_players: state.MiniDraftPicksReducer.list_positions,
    current_mini_draft_pick_user: state.MiniDraftPicksReducer.current_mini_draft_pick_user,
    current_user: state.MiniDraftPicksReducer.current_user,
    mini_draft_picks: state.MiniDraftPicksReducer.mini_draft_picks,
    mini_draft_picked: state.MiniDraftPicksReducer.mini_draft_picked,
    all_players_picked: state.MiniDraftPicksReducer.all_players_picked,
    unpicked_players: state.MiniDraftPicksReducer.unpicked_players,
    current_mini_draft_pick: state.MiniDraftPicksReducer.current_mini_draft_pick,
    success: state.MiniDraftPicksReducer.success,
    info: state.MiniDraftPicksReducer.info,
    error: state.MiniDraftPicksReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchMiniDraftPicks: fetchMiniDraftPicks,
    fetchTeams: fetchTeams,
    fetchPositions: fetchPositions,
    createMiniDraftPick: createMiniDraftPick,
    passMiniDraftPick: passMiniDraftPick,
    fetchRound: fetchRound,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniDraft);
