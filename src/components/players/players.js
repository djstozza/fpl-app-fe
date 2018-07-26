import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import Spinner from '../spinner';
import fetchPlayers from '../../actions/players/fetch_players';
import fetchPositions from '../../actions/positions/fetch_positions';
import fetchTeams from '../../actions/teams/fetch_teams';

import PlayersTable from './players_table';

class Players extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
    }
  }

  componentDidMount () {
    this.props.fetchTeams();
    this.props.fetchPlayers();
    this.props.fetchPositions();
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;
    let loaded;

    if (prevProps === props) {
      return;
    }

    if (!isEmpty(props.players) && !isEmpty(props.teams) && !isEmpty(props.positions)) {
      loaded = true;
    }

    this.setState({
      ...props,
      loaded: loaded,
    });
  }

  render () {
    if (this.state.loaded) {
      return (
        <div className="container-fluid">
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
      return <Spinner />;
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
