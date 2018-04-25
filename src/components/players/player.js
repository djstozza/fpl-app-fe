import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchTeam from '../../actions/team/fetch_team';
import fetchPlayer from '../../actions/players/fetch_player';
import fetchPositions from '../../actions/positions/fetch_positions';
import ErrorHandler from '../error_handler';

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
        <div className="container-fluid">
          <div className="col col-md-10 offset-md-1">
            <PlayerHeader { ...this.state } />
            <PlayerAccordion { ...this.state } />
            <br/>
          </div>
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
    error: state.PlayersReducer.error
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
