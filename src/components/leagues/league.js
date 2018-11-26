import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchLeague from  '../../actions/leagues/fetch_league';
import generatePickNumbers from  '../../actions/leagues/generate_pick_numbers';
import updateDraftPickOrder from  '../../actions/leagues/update_draft_pick_order';
import createDraft from  '../../actions/leagues/create_draft';
import fetchRound from '../../actions/round/fetch_round';
import { isEmpty } from 'lodash';

import Spinner from '../spinner';
import ErrorHandler from '../error_handler';
import Alert from 'react-s-alert';
import { Link } from 'react-router-dom';
import { showSuccessAlert, showBaseErrorAlert } from '../../utils/general';
import FplTeamsTable from '../leagues/fpl_teams_table';

class League extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      leagueId: this.props.match.params.id
    }

    this.generatePickNumbers = this.generatePickNumbers.bind(this);
    this.updateDraftPickOrder = this.updateDraftPickOrder.bind(this);
    this.createDraftButton = this.createDraftButton.bind(this);
    this.goToDraftLink = this.goToDraftLink.bind(this);
  }

  componentDidMount () {
    this.props.fetchLeague(this.state.leagueId);
    this.props.fetchRound();
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;
    const state = this.state;
    let loaded;

    if (prevProps === props) {
      return;
    }

    if (props.league && props.commissioner) {
      loaded = true;
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

  generatePickNumbers () {
    if (this.state.league.status !== 'generate_draft_picks') {
      return;
    }

    if (this.state.fpl_teams.length < 8) {
      return;
    }

    if (this.props.current_user.id === this.props.commissioner.id) {
      return (
          <button
          className='btn btn-secondary'
          onClick={ () => this.props.generatePickNumbers(this.state.leagueId) }
        >
          Generate Pick Numbers
          </button>
      );
    }
  }

  createDraftButton () {
    if (this.state.league.status !== 'create_draft') {
      return;
    }

    if (this.props.current_user.id === this.props.commissioner.id) {
      return (
          <button className='btn btn-secondary' onClick={ () => this.props.createDraft(this.state.leagueId) }>
          Create Draft
          </button>
      );
    }
  }

  goToDraftLink () {
    if (this.state.league.status !== 'draft') {
      return;
    }

    return (
        <Link to={ `/leagues/${ this.state.leagueId }/draft` } className='btn btn-secondary'>
        Go to draft
        </Link>
    );
  }

  goToMiniDraftLink () {
    if (this.state.round.mini_draft) {
      return (
          <Link to={ `/leagues/${ this.state.leagueId }/mini_draft` } className='btn btn-secondary'>
          Go to mini draft
          </Link>
      )
    }
  }

  editLeagueButton () {
    if (this.state.commissioner.id === this.state.current_user.id) {
      return (
          <Link to={ `/leagues/${ this.state.leagueId }/edit` } className='btn btn-secondary'>Edit</Link>
      );
    }
  }

  updateDraftPickOrder (fplTeamId, pickNumber) {
    this.props.updateDraftPickOrder(this.state.leagueId, fplTeamId, pickNumber)
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
              { showSuccessAlert(this.state.success) }
              { showBaseErrorAlert(this.state.error) }
              <h3>{ this.state.league.name }  { this.editLeagueButton() }</h3>
              <p>Commisioner: { this.state.commissioner.username }</p>
              <FplTeamsTable { ...this.state } updateDraftPickOrder={ this.updateDraftPickOrder } />
              { this.generatePickNumbers() }
              { this.createDraftButton() }
              { this.goToDraftLink() }
              { this.goToMiniDraftLink() }
          </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

function mapStateToProps (state) {
  return {
    league: state.LeaguesReducer.league,
    current_user: state.LeaguesReducer.current_user,
    commissioner: state.LeaguesReducer.commissioner,
    fpl_teams: state.LeaguesReducer.fpl_teams,
    round: state.RoundReducer.round,
    success: state.LeaguesReducer.success,
    error: state.LeaguesReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchLeague: fetchLeague,
    generatePickNumbers: generatePickNumbers,
    updateDraftPickOrder: updateDraftPickOrder,
    createDraft: createDraft,
    fetchRound: fetchRound,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(League);
