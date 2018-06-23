import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import login from '../../actions/users/login';
import { isString, isEmpty } from 'lodash';
import Alert from 'react-s-alert';

class LogInForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }

    if (!isEmpty(this.props.location.state)) {
      this.state['referrer'] = this.props.location.state.referrer.pathname;
      this.state['error'] = this.props.location.state.error;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;

    this.setState({ [target.name]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state);
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;
    const state = this.state;
    const error = props.error;

    if (prevProps === props) {
      return;
    }

    if (props.success && props.success !== state.success) {
      this.alert('success', props.success);
    }

    if (error && error !== state.error) {
      const errorMessage = isString(error) ? error : error.data.errors[0];

      if (!isEmpty(errorMessage)) {
        this.alert('error', errorMessage);
      }
    }

    this.setState({
      ...props,
    });
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
    );
  }

  render () {
    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col col-sm-12 offset-md-3 col-md-6 mb-auto mt-auto'>
              <div className='card'>
                <div className='card-header'>
                  <h4>Login</h4>
                </div>
                <div className='card-body'>
                  <form onSubmit={ this.handleSubmit } >
                    <div className="form-row">
                      <div className="form-group col-sm-12">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          className='form-control'
                          id="email"
                          placeholder="Email"
                          onChange={ this.handleChange }
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-sm-12">
                        <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            name="password"
                            className='form-control'
                            id="password"
                            placeholder="Password"
                            autoComplete="on"
                            onChange={ this.handleChange }
                          />
                      </div>
                      <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                  </form>
                </div>
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
    current_user: state.UsersReducer.data,
    email: state.UsersReducer.email,
    password: state.UsersReducer.password,
    success: state.UsersReducer.success,
    error: state.UsersReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    login: login,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
