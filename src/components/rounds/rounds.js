import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import fetchRounds from '../../actions/rounds/fetch_rounds';
import fetchRound from '../../actions/round/fetch_round';
import fetchTeams from '../../actions/teams/fetch_teams';

import Round from './round';
import RoundsNav from './rounds_nav';
import TeamLadder from '../teams/team_ladder';
import Spinner from '../spinner';
import ErrorHandler from '../error_handler';

import { store } from '../../App';
import { push } from 'react-router-redux';

import { CABLE_CONNECTION } from '../../api-config';

const ActionCable = require('actioncable');
const cable = ActionCable.createConsumer(CABLE_CONNECTION);

class Rounds extends Component {
  constructor (props) {
    super(props);

    this.state = {
      tz: this.props.tz,
      rounds: [],
      teams: [],
      loaded: false
    }

    this.selectRound = this.selectRound.bind(this);
  }

  componentDidMount () {
    this.props.fetchRounds();
    this.props.fetchRound(this.props.match.params.id);
    this.props.fetchTeams();
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;
    const self = this;
    let loaded;

    if (prevProps === props) {
      return;
    }

    if (!isEmpty(props.rounds) && !isEmpty(props.round) && !isEmpty(props.teams)) {
      loaded = true;

      cable.subscriptions.create({ channel: 'RoundChannel', room: props.round.id }, {
        received: function (data) {
          if (props.round.id === data.round.id && props.round.is_current) {
            self.setState({
              fixtures: data.fixtures,
            });
          }
        }
      });
    }

    this.setState({
      ...props,
      loaded: loaded,
    });
  }

  selectRound (roundId) {
    this.props.fetchRound(roundId);
    store.dispatch(push(`/rounds/${roundId}`))
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
          <RoundsNav { ...this.state } selectRound={ this.selectRound }/>
          <div className='container-fluid'>
            <div className="row">
              <div className="col col-md-10 offset-md-1">
                <Round {...this.state } />
                <br/>
                <h4>Team Ladder</h4>
                <TeamLadder teams={ this.state.teams } />
              </div>
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
    rounds: state.RoundsReducer,
    round: state.RoundReducer.round,
    fixtures: state.RoundReducer.fixtures,
    teams: state.TeamsReducer,
    error: state.RoundReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchRounds: fetchRounds,
    fetchRound: fetchRound,
    fetchTeams: fetchTeams,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rounds);
