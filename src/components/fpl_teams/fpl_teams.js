import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchFplTeams from '../../actions/fpl_teams/fetch_fpl_teams';

import Spinner from '../spinner';
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

  componentDidMount () {
    this.props.fetchFplTeams()
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;
    const state = this.state;
    let loaded;

    if (prevProps === props) {
      return;
    }

    if (props.fpl_teams) {
      loaded = true;
    }

    if (props.success && props.success !== state.success) {
      this.alert('success', props.success);
    }

    if (props.error && props.error !== state.error && props.error.status === 422) {
      const baseError = props.error.data.error.base;

      if (!isEmpty(baseError)) {
        this.alert('error', baseError[0]);
      }
    }

    this.setState({
      ...props,
      loaded: loaded,
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
      return <Spinner />;
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
