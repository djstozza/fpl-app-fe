import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchLeague from  '../../actions/leagues/fetch_league';
import generatePickNumbers from  '../../actions/leagues/generate_pick_numbers';
import updateDraftPickOrder from  '../../actions/leagues/update_draft_pick_order';
import createDraft from  '../../actions/leagues/create_draft';
import { every, isEmpty, isNumber } from 'lodash';
import ErrorHandler from '../error_handler';
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

  componentWillMount () {
    this.props.fetchLeague(this.state.leagueId);
  }

  componentWillReceiveProps (nextProps) {
    const fplTeams = nextProps.fpl_teams

    const noScore = every(fplTeams, (fpl_team) => { return isEmpty(fpl_team.total_score) });

    this.setState({
      league: nextProps.league,
      commissioner: nextProps.commissioner,
      current_user: nextProps.current_user,
      fpl_teams: fplTeams,
      noScore: noScore,
      error: nextProps.error,
    });

    if (!isEmpty(nextProps.success)) {
      this.setState({
        success: nextProps.success
      });
    }


    if (!isEmpty(nextProps.league)) {
      this.setState({
        loaded: true
      });
    }
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
        <button className='btn btn-secondary' onClick={ () => this.props.generatePickNumbers(this.state.leagueId) }>
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

    if (this.props.current_user.id === this.props.commissioner.id) {
      return (
        <Link to={ `/leagues/${this.state.leagueId}/draft` } className='btn btn-secondary'>
          Go to draft
        </Link>
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
        <div>
          { showSuccessAlert(this.state.success) }
          { showBaseErrorAlert(this.state.error) }
          <h3>{ this.state.league.name }</h3>
          <p>Commisioner: { this.state.commissioner.username }</p>
          <FplTeamsTable { ...this.state } updateDraftPickOrder={ this.updateDraftPickOrder } />
          { this.generatePickNumbers() }
          { this.createDraftButton() }
          { this.goToDraftLink() }
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
    league: state.LeaguesReducer.league,
    current_user: state.LeaguesReducer.current_user,
    commissioner: state.LeaguesReducer.commissioner,
    fpl_teams: state.LeaguesReducer.fpl_teams,
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(League);
