import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import signUp from '../../actions/users/sign_up';
import PropTypes from 'prop-types';

class Signup extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
  }

  handleChange(event) {
    const target = event.target;

    this.setState({ [ target.name ]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signUp(this.state);
  }

  showError(type) {
    if (this.state && this.state.error && this.state.error.data.errors[ type ]) {
      return this.state.error.data.errors[ type ][ 0 ];
    }
  }

  componentDidUpdate (prevProps, prevState) {
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
            <div className='row'>
                <div className='col col-md-6 offset-md-3 col-sm-12 col-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Sign Up</h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={ this.handleSubmit } >
                                <div className="form-row">
                                    <div className="form-group email col-md-12">
                                        <label htmlFor="email">Email</label>
                                        <input
                        type="email"
                        name="email"
                        className={ `form-control ${ this.showError('email') ? 'is-invalid' : '' }` }
                        id="email"
                        placeholder="Email"
                        onChange={ this.handleChange }
                      />
                                        <div className="invalid-feedback">
                                            { this.showError('email') }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group username col-md-12">
                                        <label htmlFor="username">Username</label>
                                        <input
                        type="text"
                        name="username"
                        className={ `form-control ${ this.showError('username') ? 'is-invalid' : '' }` }
                        id="username"
                        placeholder="Username"
                        onChange={ this.handleChange }
                      />
                                        <div className="invalid-feedback">
                                            { this.showError('username') }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group password col-md-12">
                                        <label htmlFor="password">Password</label>
                                        <input
                          type="password"
                          name="password"
                          className={ `form-control ${ this.showError('password') ? 'is-invalid' : '' }` }
                          id="password"
                          placeholder="Password"
                          onChange={ this.handleChange }
                        />
                                        <div className="invalid-feedback">
                                            { this.showError('password') }
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    email: state.UsersReducer.email,
    username: state.UsersReducer.username,
    password: state.UsersReducer.password,
    error: state.UsersReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    signUp: signUp,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

Signup.propTypes = {
  email: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  signUp: PropTypes.func.isRequired
}
