import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchFplTeams from '../../actions/fpl_teams/fetch_fpl_teams';
import FplTeamsTable from './fpl_teams_table';
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom';

class FplTeams extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false
    }

    this.fplTeamsTable = this.fplTeamsTable.bind(this);
  }

  componentWillMount () {
    this.props.fetchFplTeams()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      fpl_teams: nextProps.fpl_teams,
      loaded: true
    });
  }

  fplTeamsTable () {
    if (isEmpty(this.state.fpl_teams)) {
      return <p>You currently have no fpl teams. Please create a league or join one using the buttons below.</p>;
    } else {
      return <FplTeamsTable { ...this.state } />
    }
  }

  render () {
    if (this.state.loaded) {
      return (
        <div>
          <h3>My Fpl Teams</h3>
          { this.fplTeamsTable() }
          <Link to='/leagues/new' className='btn btn-primary'>Create a League</Link>
          <Link to='/leagues/join' className='btn btn-secondary'>Join a League</Link>
        </div>
      );
    } else {
      return (
        <p>Loading...</p>
      );
    }
  }
}

function mapStateToProps (state) {
  return {
    fpl_teams: state.FplTeamsReducer.fpl_teams,
    success: state.FplTeamsReducer.success,
    error: state.FplTeamsReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchFplTeams: fetchFplTeams,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FplTeams);
