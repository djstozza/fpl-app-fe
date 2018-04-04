import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createLeague from  '../../actions/leagues/create_league.js';


class NewLeague extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      code: '',
      fpl_team_name: '',
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
    this.props.createLeague(this.state);
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

  componentWillReceiveProps (nextProps) {
    this.setState({ error: nextProps.error });
  }

  render () {
    return (
      <div>
        <h3>Create League</h3>
        <form onSubmit={ this.handleSubmit } >
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="name">League Name</label>
              <input
                type="text"
                name="name"
                className={ `form-control ${this.showError('name') ? 'is-invalid' : ''}` }
                id="name"
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
              />
              <div className="invalid-feedback">
                { this.showError('code') }
              </div>
            </div>
            <button type="button" className="btn btn-secondary" onClick={ (e) => this.generateCode(e) } >
              Generate Code
            </button>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="fpl-team-name">Fpl Team Name</label>
                <input
                  type="text"
                  name="fpl_team_name"
                  className={ `form-control ${this.showError('fpl_team_name') ? 'is-invalid' : ''}` }
                  id="fpl-team-name"
                  onChange={ this.handleChange }
                />
                <div className="invalid-feedback">
                  { this.showError('fpl_team_name') }
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    name: state.LeaguesReducer.name,
    code: state.LeaguesReducer.code,
    fpl_team_name: state.LeaguesReducer.fpl_team_name,
    error: state.LeaguesReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    createLeague: createLeague,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewLeague);
