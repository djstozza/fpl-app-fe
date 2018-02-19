import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchRounds from '../actions/rounds/fetch_rounds.js';
import fetchRound from '../actions/round/fetch_round.js';
import fetchTeams from '../actions/teams/fetch_teams.js';

import Round from '../components/rounds/round.js';
import RoundNav from '../components/rounds/round_nav.js';

import TeamLadder from '../components/teams/team_ladder.js';

import { CABLE_CONNECTION } from '../api-config.js';

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

  componentWillMount() {
    this.props.fetchRounds();
    this.props.fetchRound(this.props.match.params.id);
    this.props.fetchTeams();
  }

  componentDidMount () {

  }

  componentWillReceiveProps(nextProps) {
    const self = this;

    this.setState({
      rounds: nextProps.rounds,
      round: nextProps.round,
      fixtures: nextProps.fixtures,
      teams: nextProps.teams,
    });

    if (nextProps.rounds.length > 0 && nextProps.round && nextProps.teams.length > 0) {
      this.setState({
        loaded: true
      });

      cable.subscriptions.create({ channel: 'RoundChannel', room: nextProps.round.id }, {
        received: function (data) {
          if (self.state.round === data.round) {
            self.setState({
              fixtures: data.fixtures
            });
          }
        }
      });
    }
  }

  selectRound (roundId) {
    this.props.fetchRound(roundId);
    window.history.pushState(null, '', `/rounds/${roundId}`);
  }

  render () {
    if (this.state.loaded) {

      return (
        <div>
          <RoundNav rounds={ this.state.rounds } round={this.state.round } selectRound={ this.selectRound }/>
          <div className="row">
            <div className="col s12 offset-m1 m10">
              <Round
                round={ this.state.round }
                fixtures={ this.state.fixtures }
                teams={ this.state.teams }
                tz={ this.state.tz }
              />
              <TeamLadder teams={ this.state.teams } />
            </div>
          </div>
        </div>
      );
    } else {
      return <p>Loading...</p>
    }
  }
}

function mapStateToProps (state) {
  return {
    rounds: state.RoundsReducer,
    round: state.RoundReducer.round,
    fixtures: state.RoundReducer.fixtures,
    teams: state.TeamsReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRounds: fetchRounds,
    fetchRound: fetchRound,
    fetchTeams: fetchTeams,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rounds);
