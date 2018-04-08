import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';

import fetchDraftPicks from  '../../actions/draft_picks/fetch_draft_picks.js';
import fetchTeams from '../../actions/teams/fetch_teams.js';
import fetchPositions from '../../actions/positions/fetch_positions.js';
import updateDraftPick from '../../actions/draft_picks/update_draft_pick.js';

import ErrorHandler from '../error_handler.js';
import DraftPlayersTable from './draft_players_table.js';
import DraftPicksTable from './draft_picks_table.js';
import { every, isEmpty, isNumber } from 'lodash';
import { showSuccessAlert } from '../../utils/user.js';

import { CABLE_CONNECTION } from '../../api-config.js';

const ActionCable = require('actioncable');
const cable = ActionCable.createConsumer(CABLE_CONNECTION);

class Draft extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      leagueId: this.props.match.params.id
    }

    this.updateDraft = this.updateDraft.bind(this);
    this.draftDescription = this.draftDescription.bind(this);
    this.miniDraftPickButton = this.miniDraftPickButton.bind(this);
    this.alert = this.alert.bind(this);
  }

  componentWillMount () {
    const self = this;

    this.props.fetchDraftPicks(this.state.leagueId);
    this.props.fetchTeams();
    this.props.fetchPositions();

    cable.subscriptions.create({ channel: 'DraftPickChannel', room: this.state.leagueId }, {
      received: function (data) {
        let currentUserTurn;
        let yourTurnAlertable;

        if (!isEmpty(data.current_draft_pick_user) && !isEmpty(self.state.current_user)) {
          currentUserTurn = self.state.current_user.id === data.current_draft_pick_user.id;
          yourTurnAlertable = data.current_draft_pick_user.id !== self.state.current_draft_pick_user.id
        }

        if (currentUserTurn && yourTurnAlertable) {
          self.alert('info', "It's your turn.");
        }

        self.setState({
          unpicked_players: data.unpicked_players,
          current_draft_pick: data.current_draft_pick,
          draft_picks: data.draft_picks,
          current_draft_pick_user: data.current_draft_pick_user,
          your_turn: currentUserTurn,
          mini_draft_picked: data.mini_draft_picked,
          all_players_picked: data.all_players_picked,
          info: data.info,
        });

        self.alert('info', data.info);

        if (data.league.status == 'active') {
          self.alert('success', 'The draft has been completed.');
        }
      }
    });
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      league: nextProps.league,
      fpl_teams: nextProps.fpl_teams,
      draft_picks: nextProps.draft_picks,
      mini_draft_picked: nextProps.mini_draft_picked,
      all_players_picked: nextProps.all_players_picked,
      unpicked_players: nextProps.unpicked_players,
      current_draft_pick: nextProps.current_draft_pick,
      current_draft_pick_user: nextProps.current_draft_pick_user,
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

    if (!isEmpty(nextProps.league) && !isEmpty(nextProps.draft_picks)) {

      if (
        !isEmpty(nextProps.current_draft_pick_user) &&
        nextProps.current_user.id === nextProps.current_draft_pick_user.id
      ) {
        this.alert('info', "It's your turn.");

        this.setState({
          your_turn: true
        });
      }

      this.setState({
        loaded: true
      });

      if (nextProps.league.status === 'active') {
        this.alert('success', 'The draft has been completed.');
      }
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
    if (isEmpty(this.state.current_draft_pick) || allPlayersPicked && miniDraftPicked) {
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

  miniDraftPickButton () {
    if (isEmpty(this.state.current_draft_pick) || this.state.mini_draft_picked) {
      return;
    }

    if (!this.state.your_turn) {
      return;
    }

    return (
      <button
        className='btn btn-secondary btn-lg'
        onClick={ () => { this.updateDraft(null, true) } }
      >
        Mini Draft
      </button>
    )
  }

  updateDraft (playerId, miniDraft) {
    this.props.updateDraftPick(this.state.leagueId, this.state.current_draft_pick.id, playerId, miniDraft);
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
          <h3>League { this.state.leagueId } Draft</h3>
          { this.draftDescription() }
          <div className='row'>
            <div className='col col-12'>
              <DraftPlayersTable {...this.state } updateDraft={ this.updateDraft } />
              { this.miniDraftPickButton() }
            </div>
          </div>
          <div className='row'>
            <div className='col col-12'>
              <h4>All Draft Picks</h4>
              <DraftPicksTable { ...this.state } />
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
    teams: state.TeamsReducer,
    positions: state.PositionsReducer,
    league: state.DraftPicksReducer.league,
    fpl_teams: state.DraftPicksReducer.fpl_teams,
    current_draft_pick_user: state.DraftPicksReducer.current_draft_pick_user,
    current_user: state.DraftPicksReducer.current_user,
    draft_picks: state.DraftPicksReducer.draft_picks,
    mini_draft_picked: state.DraftPicksReducer.mini_draft_picked,
    all_players_picked: state.DraftPicksReducer.all_players_picked,
    unpicked_players: state.DraftPicksReducer.unpicked_players,
    current_draft_pick: state.DraftPicksReducer.current_draft_pick,
    success: state.DraftPicksReducer.success,
    info: state.DraftPicksReducer.info,
    error: state.DraftPicksReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchDraftPicks: fetchDraftPicks,
    fetchTeams: fetchTeams,
    fetchPositions: fetchPositions,
    updateDraftPick: updateDraftPick,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft);
