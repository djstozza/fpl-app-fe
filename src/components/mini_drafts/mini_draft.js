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

import Spinner from '../spinner';
import ErrorHandler from '../error_handler';
import OutPlayersTable from '../inter_team_trades/out_players_table';
import TradePlayersTable from '../fpl_teams/trade_players_table';
import MiniDraftPicksTable from './mini_draft_picks_table';
import { isEmpty } from 'lodash';

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
    this.selectTradeablePlayer = this.selectTradeablePlayer.bind(this);
    this.clearTradeablePlayer = this.clearTradeablePlayer.bind(this);

    this.pass = this.pass.bind(this);
    this.passMiniDraftPickButton = this.passMiniDraftPickButton.bind(this);
    this.alert = this.alert.bind(this);
  }

  componentDidMount () {
    const self = this;

    this.props.fetchMiniDraftPicks(this.state.leagueId);
    this.props.fetchTeams();
    this.props.fetchPositions();
    this.props.fetchRound();

    cable.subscriptions.create({ channel: 'MiniDraftPickChannel', room: this.state.leagueId }, {
      received: function (data) {
        let your_turn;

        if (
          data.current_mini_draft_pick_user &&
          self.state.current_user.id === data.current_mini_draft_pick_user.id
        ) {
          self.alert('info', "It's your turn.");
          your_turn = true;
        } else {
          your_turn = false;
        }

        self.setState({
          league: data.league,
          fpl_teams: data.fpl_teams,
          current_mini_draft_pick_user: data.current_mini_draft_pick_user,
          mini_draft_picks: data.mini_draft_picks,
          mini_draft_picked: data.mini_draft_picked,
          unpicked_players: data.unpicked_players,
          current_mini_draft_pick: data.current_mini_draft_pick,
          your_turn: your_turn,
        });

        if (data.info) {
          self.alert('info', data.info);
        }
      }
    });
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;
    const state = this.state;
    let loaded;
    let your_turn;

    if (prevProps === props) {
      return;
    }

    if (props.league && props.mini_draft_picks && props.positions && props.teams && props.round) {
      loaded = true;
    }

    if (
      props.current_mini_draft_pick_user &&
      props.current_user.id === props.current_mini_draft_pick_user.id
    ) {
      this.alert('info', "It's your turn.");
      your_turn = true;
    } else {
      your_turn = false;
    }

    if (props.success && props.success !== state.success) {
      this.alert('success', props.success);
    }

    if (props.error && props.error !== state.error && props.error.status === 422) {
      const baseError = props.error.data.error.base;

      if (!isEmpty(baseError)) {
        this.alert('error', baseError[ 0 ]);
      }
    }

    this.setState({
      ...props,
      loaded: loaded,
      your_turn: your_turn,
    });
  }

  alert (type, message) {
    return (
      Alert[ type ](
        message, {
          position: 'top',
          effect: 'bouncyflip',
          timeout: 5000,
        }
      )
    )
  }

  outDescriptionText () {
    if (!this.state.your_turn) {
      return;
    }

    return (
        <div>
            <h4 className='mb-0'>Trade out</h4>
            <span>(1) Select the player you wish to trade out.</span>
        </div>
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
    this.setState({ selected: '', tradeablePlayer: '' });
  }

  selectTradeablePlayer (tradeablePlayer) {
    this.setState({ tradeablePlayer: tradeablePlayer });
  }

  clearTradeablePlayer () {
    this.setState({ tradeablePlayer: '' });
  }

  showTradePlayersTable () {
    if (!this.state.your_turn) {
      return;
    }

    return (
        <div className='col col-md-6 col-sm-12'>
            <h4 className='mb-0'>Trade in</h4>
            <span>(2) Select the player you wish to trade in.</span>
            <TradePlayersTable
          { ...this.state }
          selectTradeablePlayer={ this.selectTradeablePlayer }
          clearTradeablePlayer={ this.clearTradeablePlayer }
        />
            { this.completeTradeButton() }
        </div>
    )
  }

  completeTradeButton () {
    if (!this.state.your_turn) {
      return;
    }

    if (isEmpty(this.state.selected) || isEmpty(this.state.tradeablePlayer)) {
      return;
    }

    return (
        <button
        className='btn btn-secondary'
        onClick={ () => {
            this.props.createMiniDraftPick(
              this.state.leagueId,
              this.state.selected.list_position_id,
              this.state.tradeablePlayer.id,
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

  showMiniDraftPicksTable () {
    if (!isEmpty(this.state.mini_draft_picks)) {
      return (
          <div>
              <h4>Mini draft picks</h4>
              <MiniDraftPicksTable { ... this.state } />
          </div>
      )
    }
  }

  showDraftCompletedAlert () {
    if (isEmpty(this.state.current_mini_draft_pick_user)) {
      return (
          <div className='alert alert-danger alert-dismissible fade show' role="alert">
          The mini draft has been completed
          </div>
      )
    }
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
              { this.showDraftCompletedAlert() }
              { this.passMiniDraftPickButton() }
              <div className='row'>
                  <div className={ `col col-sm-12 ${ this.state.your_turn ? 'col-md-6' : '' }` }>
                      { this.outDescriptionText() }
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
                      { this.showMiniDraftPicksTable() }
                  </div>
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
    round: state.RoundReducer.round,
    teams: state.TeamsReducer,
    positions: state.PositionsReducer,
    league: state.MiniDraftPicksReducer.league,
    fpl_teams: state.MiniDraftPicksReducer.fpl_teams,
    fpl_team_list: state.MiniDraftPicksReducer.fpl_team_list,
    out_players: state.MiniDraftPicksReducer.out_players,
    current_mini_draft_pick_user: state.MiniDraftPicksReducer.current_mini_draft_pick_user,
    current_user: state.MiniDraftPicksReducer.current_user,
    mini_draft_picks: state.MiniDraftPicksReducer.mini_draft_picks,
    mini_draft_picked: state.MiniDraftPicksReducer.mini_draft_picked,
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
