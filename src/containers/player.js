import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchTeam from '../actions/team/fetch_team.js';
import fetchPlayer from '../actions/players/fetch_player.js';
import fetchPositions from '../actions/positions/fetch_positions.js';
import ErrorHandler from './error_handler.js';

import PlayerHeader from '../components/players/player_header.js';
import PlayerAccordion from '../components/players/player_accordion.js';

class Player extends Component {
  constructor (props) {
    super(props);

    this.state = {
      playerId: this.props.match.params.id,
      loaded: false,
    }
  }

  componentWillMount () {
    this.props.fetchPlayer(this.props.match.params.id);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      player: nextProps.player,
      position: nextProps.position,
      team: nextProps.team,
      error: nextProps.error
    });

    if (nextProps.player) {
      this.setState({
        loaded: true
      });
    }
  }

  render () {
    if (this.state.error) {
      return (
        <ErrorHandler error={ this.state.error } />
      );
    }

    if (this.state.loaded) {
      return (
        <div className="container">
          <PlayerHeader { ...this.state } />
          <PlayerAccordion { ...this.state } />
        </div>
      )
    } else {
      return <p>Loading...</p>;
    }
  }
}

function mapStateToProps (state) {
  return {
    team: state.PlayersReducer.team,
    position: state.PlayersReducer.position,
    player: state.PlayersReducer.player,
    error: state.PlayersReducer.data
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTeam: fetchTeam,
    fetchPlayer: fetchPlayer,
    fetchPositions: fetchPositions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
