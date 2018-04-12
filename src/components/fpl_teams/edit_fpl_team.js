import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchFplTeam from  '../../actions/fpl_teams/fetch_fpl_team.js';
import updateFplTeam from  '../../actions/fpl_teams/update_fpl_team.js';
import { every, isEmpty, isNumber } from 'lodash';
import ErrorHandler from '../error_handler.js';
import { Link } from 'react-router-dom';
import { showSuccessAlert, showBaseErrorAlert } from '../../utils/user.js';

class EditFplTeam extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      fplTeamId: this.props.match.params.id
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
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

  handleChange(event) {

    const target = event.target;
    console.log(event.target, target.name, target.value)
    this.setState({ [target.name]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateFplTeam(this.state);
  }

  showError(type) {
    if (this.state && this.state.error && this.state.error.data.error[type]) {
      return this.state.error.data.error[type][0];
    }
  }

  render () {
    if (this.state.error && this.state.error.status !== 422) {
      return (
        <ErrorHandler error={ this.state.error } />
      )
    }

    if (this.state.loaded) {
      console.log(this.state)
      return (
        <div>
          { showSuccessAlert(this.state.success) }
          { showBaseErrorAlert(this.state.error) }
          <h3>Edit { this.state.fpl_team.name }</h3>
          <form onSubmit={ this.handleSubmit } >
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="name">Fpl Team Name</label>
                  <input
                    type="text"
                    name="name"
                    className={ `form-control ${this.showError('name') ? 'is-invalid' : ''}` }
                    id="name"
                    value={ this.state.name || this.state.fpl_team.name }
                    onChange={ this.handleChange }
                  />
                  <div className="invalid-feedback">
                    { this.showError('name') }
                  </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to={ `/fpl_teams/${this.state.fplTeamId}` } className='btn btn-danger'>Cancel</Link>
              </div>
            </div>
          </form>
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
    updateFplTeam: updateFplTeam,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFplTeam);
