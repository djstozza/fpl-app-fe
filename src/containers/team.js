import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchTeams from '../actions/teams/fetch_teams.js';
import fetchTeam from '../actions/team/fetch_team.js';
import fetchTeamPlayers from '../actions/players/fetch_team_players.js';
import fetchPositions from '../actions/positions/fetch_positions.js';

import TeamsNav from '../components/teams/teams_nav.js';
import TeamAccordion from '../components/teams/team_accordion.js';

class Team extends Component {
  constructor (props) {
    super(props);

    this.state = {
      tz: this.props.tz,
      teams: [],
      fixtures: [],
      players: [],
      positions: [],
      teamId: this.props.match.params.id,
      loaded: false
    }

    this.selectTeam = this.selectTeam.bind(this);
  }

  componentWillMount () {
    this.props.fetchTeam(this.props.match.params.id);
    this.props.fetchTeams();
    this.props.fetchTeamPlayers(this.props.match.params.id);
    this.props.fetchPositions();
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      teams: nextProps.teams,
      team: nextProps.team,
      fixtures: nextProps.fixtures,
      players: nextProps.players,
      positions: nextProps.positions,
    });

    if (nextProps.teams.length > 0 && nextProps.team !== undefined) {
      this.setState({
        loaded: true
      });
    }
  }

  selectTeam (teamId) {
    this.props.fetchTeam(teamId);
    this.props.fetchTeamPlayers(teamId);
    window.history.pushState(null, '', `/teams/${teamId}`);
  }


  render () {
    if (this.state.loaded) {
      return (
        <div>
          <TeamsNav teams={ this.state.teams } team={ this.state.team } selectTeam={ this.selectTeam } />
          <div className="row">
            <div className="col col-md-10 offset-md-1">
              <h4>{ this.state.team.name }</h4>
              <TeamAccordion
                team={ this.state.team }
                fixtures={ this.state.fixtures }
                tz={ this.state.tz }
                teams={ this.state.teams }
                players={ this.state.players }
                positions={ this.state.positions }
                selectTeam={ this.selectTeam }
              />
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
    positions: state.PositionsReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTeam: fetchTeam,
    fetchTeams: fetchTeams,
    fetchTeamPlayers: fetchTeamPlayers,
    fetchPositions: fetchPositions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
