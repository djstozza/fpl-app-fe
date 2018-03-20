import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchPlayers from '../../actions/players/fetch_players.js';
import fetchPositions from '../../actions/positions/fetch_positions.js';
import fetchTeams from '../../actions/teams/fetch_teams.js';

import PlayersTable from './players_table.js';

class Players extends Component {
  constructor (props) {
    super(props);

    this.state = {
      teams: [],
      players: [],
      positions: [],
      loaded: false,
    }
  }

  componentWillMount () {
    this.props.fetchTeams();
    this.props.fetchPlayers();
    this.props.fetchPositions();
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      teams: nextProps.teams,
      players: nextProps.players,
      positions: nextProps.positions,
    });

    if (nextProps.teams.length > 0 && nextProps.players.length > 0) {
      this.setState({
        loaded: true
      });
    }
  }

  render () {
    if (this.state.loaded) {
      return (
        <div className="row">
          <div className="col col-md-12">
            <h4>Players</h4>
            <PlayersTable
              players={ this.state.players }
              teams={ this.state.teams }
              positions={ this.state.positions }
            />
          </div>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

function mapStateToProps (state) {
  return {
    teams: state.TeamsReducer,
    players: state.PlayersReducer,
    positions: state.PositionsReducer,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchTeams: fetchTeams,
    fetchPlayers: fetchPlayers,
    fetchPositions: fetchPositions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);
