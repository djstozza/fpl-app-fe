import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchTeam from '../../actions/team/fetch_team';
import fetchTeams from '../../actions/teams/fetch_teams';
import fetchPlayer from '../../actions/players/fetch_player';
import fetchPositions from '../../actions/positions/fetch_positions';

import Spinner from '../spinner';
import ErrorHandler from '../errorHandler';
import PlayerHeader from './player_header';
import PlayerAccordion from './player_accordion';

class Player extends Component {
  constructor (props) {
    super(props);

    this.state = {
      playerId: this.props.match.params.id,
      loaded: false,
    }
  }

  componentDidMount () {
    this.props.fetchTeams();
    this.props.fetchPlayer(this.props.match.params.id);
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;
    let loaded;

    if (prevProps === props) {
      return;
    }

    if (props.player && props.teams && props.position) {
      loaded = true;
    }

    this.setState({
      ...props,
      loaded: loaded,
    });
  }

  render () {
    if (this.state.error) {
      return (
          <ErrorHandler error={ this.state.error } />
      );
    }

    if (this.state.loaded) {
      return (
          <div className="container-fluid">
              <div className="col col-md-10 offset-md-1">
                  <PlayerHeader { ...this.state } />
                  <PlayerAccordion { ...this.state } />
                  <br/>
              </div>
          </div>
      )
    } else {
      return <Spinner />;
    }
  }
}

function mapStateToProps (state) {
  return {
    team: state.PlayersReducer.team,
    teams: state.TeamsReducer,
    position: state.PlayersReducer.position,
    player: state.PlayersReducer.player,
    error: state.PlayersReducer.error
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTeam: fetchTeam,
    fetchTeams: fetchTeams,
    fetchPlayer: fetchPlayer,
    fetchPositions: fetchPositions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
