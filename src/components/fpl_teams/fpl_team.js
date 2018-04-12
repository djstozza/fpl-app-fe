import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchFplTeam from  '../../actions/fpl_teams/fetch_fpl_team.js';
import { every, isEmpty, isNumber } from 'lodash';
import ErrorHandler from '../error_handler.js';
import { Link } from 'react-router-dom';
import { showSuccessAlert, showBaseErrorAlert } from '../../utils/user.js';

class FplTeam extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      fplTeamId: this.props.match.params.id
    };

    this.editFplTeamButton = this.editFplTeamButton.bind(this);
  }

  componentWillMount () {
    this.props.fetchFplTeam(this.state.fplTeamId);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      fpl_team: nextProps.fpl_team,
      current_user: nextProps.current_user,
      error: nextProps.error,
    });

    if (!isEmpty(nextProps.success)) {
      this.setState({
        success: nextProps.success
      });
    }

    if (!isEmpty(nextProps.fpl_team)) {
      this.setState({
        loaded: true
      });
    }
  }

  editFplTeamButton () {
    if (this.state.current_user.id === this.state.fpl_team.user_id) {
      return (
        <Link to={ `/fpl_teams/${this.state.fplTeamId}/edit` } className='btn btn-secondary'>Edit</Link>
      );
    }
  }

  render () {
    if (this.state.error && this.state.error.status !== 422) {
      return (
        <ErrorHandler error={ this.state.error } />
      )
    }

    if (this.state.loaded) {
      return (
        <div>
          { showSuccessAlert(this.state.success) }
          { showBaseErrorAlert(this.state.error) }
          <h3>{ this.state.fpl_team.name }</h3>
          { this.editFplTeamButton() }
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
    fpl_team: state.FplTeamsReducer.fpl_team,
    current_user: state.FplTeamsReducer.current_user,
    success: state.FplTeamsReducer.success,
    error: state.FplTeamsReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchFplTeam: fetchFplTeam,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FplTeam);
