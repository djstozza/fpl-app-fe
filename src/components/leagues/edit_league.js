import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import editLeague from  '../../actions/leagues/edit_league.js';
import updateLeague from '../../actions/leagues/update_league.js';
import isEmpty from 'lodash/isEmpty';
import ErrorHandler from '../error_handler.js';
import { showBaseErrorAlert } from '../../utils/user.js';

class EditLeague extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      name: '',
      code: '',
      leagueId: this.props.match.params.id
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateCode = this.generateCode.bind(this);
    this.showError = this.showError.bind(this);
  }

  handleChange(event) {
    const target = event.target;

    this.setState({ [target.name]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateLeague(this.state);
  }

  showError(type) {
    if (this.state && this.state.error && this.state.error.data.error[type]) {
      return this.state.error.data.error[type][0];
    }
  }

  generateCode (event) {
    event.preventDefault();
    const code = Math.random().toString(16).slice(2, 8);
    document.getElementById('code').value = code
    this.setState({ code: code })
  }

  componentWillMount () {
    this.props.editLeague(this.props.match.params.id);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      league: nextProps.league,
      name: nextProps.league.name,
      code: nextProps.league.code,
      error: nextProps.error,
    });

    if (!isEmpty(nextProps.success)) {
      this.setState({
        success: nextProps.success
      });
    }


    if (!isEmpty(nextProps.league)) {
      this.setState({
        loaded: true
      });
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
          { showBaseErrorAlert(this.state.error) }
          <h3>Edit { this.state.league.name }</h3>
          <form onSubmit={ this.handleSubmit } >
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="name">League Name</label>
                <input
                  type="text"
                  name="name"
                  className={ `form-control ${this.showError('name') ? 'is-invalid' : ''}` }
                  id="name"
                  value={ this.state.name }
                  onChange={ this.handleChange }
                />
                <div className="invalid-feedback">
                  { this.showError('name') }
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="code">Code</label>
                <input
                  type="text"
                  name="code"
                  disabled="true"
                  className={ `form-control ${this.showError('code') ? 'is-invalid' : ''}` }
                  id="code"
                  value={ this.state.code }
                />
                <div className="invalid-feedback">
                  { this.showError('code') }
                </div>
              </div>
              <button type="button" className="btn btn-secondary" onClick={ (e) => this.generateCode(e) } >
                Generate Code
              </button>
            </div>
            <br/>
            <div className="form-row">
              <div className="form-group col-md-12">
                <button type="submit" className="btn btn-primary">Submit</button>
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
    league: state.LeaguesReducer.league,
    success: state.LeaguesReducer.success,
    error: state.LeaguesReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    editLeague: editLeague,
    updateLeague: updateLeague,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLeague);
