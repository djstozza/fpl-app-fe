import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import Spinner from '../spinner';
import fetchTeams from '../../actions/teams/fetch_teams';
import fetchTeam from '../../actions/team/fetch_team';
import fetchPositions from '../../actions/positions/fetch_positions';

import TeamsNav from './teams_nav';
import TeamAccordion from './team_accordion';
import ErrorHandler from '../error_handler';

import { store } from '../../App';
import { push } from 'react-router-redux';

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

  componentDidMount () {
    this.props.fetchTeam(this.props.match.params.id);
    this.props.fetchTeams();
    this.props.fetchPositions();
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;
    let loaded;

    if (prevProps === props) {
      return;
    }

    if (props.team && !isEmpty(props.teams) && !isEmpty(props.players) && !isEmpty(props.positions)) {
      loaded = true;
    }

    this.setState({
      ...props,
      loaded: loaded,
    });
  }

  selectTeam (teamId) {
    this.props.fetchTeam(teamId);
    store.dispatch(push(`/teams/${teamId}`))
  }


  render () {
    if (this.state.error) {
      return (
        <ErrorHandler error={ this.state.error } />
      )
    }

    if (this.state.loaded) {
      return (
        <div>
          <TeamsNav teams={ this.state.teams } team={ this.state.team } selectTeam={ this.selectTeam } />
          <div className='container-fluid'>
            <div className="row">
              <div className="col col-md-10 offset-md-1">
                <h4>{ this.state.team.name }</h4>
                <TeamAccordion { ...this.state } selectTeam={ this.selectTeam } />
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
    teams: state.TeamsReducer,
    team: state.TeamReducer.team,
    fixtures: state.TeamReducer.fixtures,
    players: state.TeamReducer.players,
    positions: state.PositionsReducer,
    error: state.TeamReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchTeam: fetchTeam,
    fetchTeams: fetchTeams,
    fetchPositions: fetchPositions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
