import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchTeams from '../actions/teams/fetch_teams.js';
import fetchTeam from '../actions/team/fetch_team.js';
import fetchTeamPlayers from '../actions/players/fetch_team_players.js';

import TeamsNav from '../components/teams/teams_nav.js';
import TeamAccordion from '../components/teams/team_accordion.js';

class Team extends Component {
  constructor (props) {
    super(props);

    this.state = {
      tz: this.props.tz,
      teams: [],
      fixtures: [],
      teamId: this.props.match.params.id,
      loaded: false
    }

    this.selectTeam = this.selectTeam.bind(this);
  }

  componentWillMount () {
    this.props.fetchTeam(this.state.teamId);
    this.props.fetchTeams();
    this.props.fetchTeamPlayers(this.state.teamId);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      teams: nextProps.teams,
      team: nextProps.team,
      fixtures: nextProps.fixtures,
      players: nextProps.players,
    });

    if (nextProps.teams.length > 0 && nextProps.fixtures.length > 0) {
      this.setState({
        loaded: true
      })
    }
  }

  selectTeam (teamId) {
    this.props.fetchTeam(teamId);
    window.history.pushState(null, '', `/teams/${teamId}`);
  }


  render () {
    if (this.state.loaded) {
      return (
        <div>
          <TeamsNav teams={ this.state.teams } team={this.state.team } selectTeam={ this.selectTeam }/>
          <div className="row">
            <div className="col col-md-10 offset-md-1">
              <h4>{ this.state.team.attributes.name }</h4>
              <TeamAccordion team={ this.state.team } fixtures={ this.state.fixtures } tz={ this.state.tz } teams={ this.state.teams } />
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
    teams: state.TeamsReducer,
    team: state.TeamReducer.team,
    fixtures: state.TeamReducer.fixtures,
    players: state.PlayersReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTeam: fetchTeam,
    fetchTeams: fetchTeams,
    fetchTeamPlayers: fetchTeamPlayers,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
