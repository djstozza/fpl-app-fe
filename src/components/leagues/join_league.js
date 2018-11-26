import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showBaseErrorAlert } from '../../utils/general';
import joinLeague from  '../../actions/leagues/join_league';

class JoinLeague extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      code: '',
      fpl_team_name: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
  }

  handleChange (event) {
    const target = event.target;

    this.setState({ [ target.name ]: target.value });
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.joinLeague(this.state);
  }

  showError (type) {
    if (this.state.error && this.state.error.data.error[ type ]) {
      return this.state.error.data.error[ type ][ 0 ];
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const props = this.props;

    if (prevProps === props) {
      return;
    }

    this.setState({
      ...props,
    });
  }

  render () {
    return (
        <div className='container-fluid'>
            <h3>Join a League</h3>
            { showBaseErrorAlert(this.state.error) }
            <form onSubmit={ this.handleSubmit } >

                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="name">League Name</label>
                        <input
                type="text"
                name="name"
                className={ `form-control ${ this.showError('name') ? 'is-invalid' : '' }` }
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
                className={ `form-control ${ this.showError('code') ? 'is-invalid' : '' }` }
                id="code"
                onChange={ this.handleChange }
              />
                        <div className="invalid-feedback">
                            { this.showError('code') }
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="fpl-team-name">Fpl Team Name</label>
                        <input
                  type="text"
                  name="fpl_team_name"
                  className={ `form-control ${ this.showError('fpl_team_name') ? 'is-invalid' : '' }` }
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
    joinLeague: joinLeague,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinLeague);
