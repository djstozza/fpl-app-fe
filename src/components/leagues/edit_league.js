import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import editLeague from  '../../actions/leagues/edit_league';
import updateLeague from '../../actions/leagues/update_league';

import Spinner from '../spinner';
import ErrorHandler from '../errorHandler';
import { showBaseErrorAlert } from '../../utils/general';

class EditLeague extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      leagueId: this.props.match.params.id
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateCode = this.generateCode.bind(this);
    this.showError = this.showError.bind(this);
  }

  handleChange(event) {
    const target = event.target;

    this.setState({ [ target.name ]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateLeague(this.state);
  }

  showError(type) {
    if (this.state && this.state.error && this.state.error.data.error[ type ]) {
      return this.state.error.data.error[ type ][ 0 ];
    }
  }

  generateCode (event) {
    event.preventDefault();
    const code = Math.random().toString(16).slice(2, 8);
    document.getElementById('code').value = code
    this.setState({ code: code })
  }

  componentDidMount () {
    this.props.editLeague(this.props.match.params.id);
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;
    let loaded;

    if (prevProps === props) {
      return;
    }

    if (props.league) {
      loaded = true;
    }

    this.setState({
      ...props,
      loaded: loaded,
    });
  }

  render () {
    if (this.state.error && this.state.error.status !== 422) {

      return (
          <ErrorHandler error={ this.state.error } />
      )
    }

    if (this.state.loaded) {
      return (
          <div className='container-fluid'>
              { showBaseErrorAlert(this.state.error) }
              <h3>Edit { this.state.league.name }</h3>

              <form onSubmit={ this.handleSubmit } >
                  <div className="form-row">
                      <div className="form-group col-md-12">
                          <label htmlFor="name">Leage Name</label>
                          <input
                    type="text"
                    name="name"
                    className={ `form-control ${ this.showError('name') ? 'is-invalid' : '' }` }
                    id="name"
                    value={ this.state.name || this.state.league.name }
                    onChange={ this.handleChange }
                  />
                          <div className="invalid-feedback">
                              { this.showError('name') }
                          </div>
                      </div>
                  </div>
                  <div className="form-row">
                      <div className="form-group col-md-12 mb-0">
                          <label htmlFor="code">Code</label>
                          <input
                  type="text"
                  name="code"
                  disabled="true"
                  className={ `form-control ${ this.showError('code') ? 'is-invalid' : '' }` }
                  id="code"
                  value={ this.state.code || this.state.league.code }
                />
                          <div className="invalid-feedback">
                              { this.showError('code') }
                          </div>
                      </div>
                  </div>
                  <div className="form-row">
                      <div className="form-group col-md-12 mb-2">
                          <button type="button" className="btn btn-secondary" onClick={ (e) => this.generateCode(e) } >
                  Generate Code
                          </button>
                      </div>
                  </div>
                  <div className="form-row">
                      <div className="form-group col-md-12">
                          <button type="submit" className="btn btn-primary">Submit</button>
                      </div>
                  </div>
              </form>
          </div>
      );
    } else {
      return <Spinner />;
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
