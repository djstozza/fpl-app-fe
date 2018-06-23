import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchFplTeam from  '../../actions/fpl_teams/fetch_fpl_team';
import updateFplTeam from  '../../actions/fpl_teams/update_fpl_team';
import { every, isEmpty, isNumber } from 'lodash';
import ErrorHandler from '../error_handler';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Alert from 'react-s-alert';
import { showSuccessAlert, showBaseErrorAlert } from '../../utils/general';

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

  componentDidMount () {
    this.props.fetchFplTeam({ fpl_team_id: this.state.fplTeamId });
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;
    const state = this.state;
    let loaded;

    if (prevProps === props) {
      return;
    }

    if (props.fpl_team) {
      loaded = true;
    }

    if (props.success && props.success !== state.success) {
      this.alert('success', props.success);
    }

    this.setState({
      ...props,
      loaded: loaded,
    })
  }

  alert (type, message) {
    return (
      Alert[type](
        message, {
          position: 'top',
          effect: 'bouncyflip',
          timeout: 5000,
        }
      )
    )
  }

  handleChange(event) {

    const target = event.target;
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
      if (this.state.fpl_team.user_id !== this.state.current_user.id) {
        return <Redirect to='/profile' error='You are not authorised to visit this page'/>
      }

      return (
        <div className='container-fluid'>
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
  console.log(state)
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
