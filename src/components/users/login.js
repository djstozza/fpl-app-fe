import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import login from '../../actions/users/login';
import { isEmpty } from 'lodash';
import { showErrorAlert, showSuccessAlert } from '../../utils/general';

class LogInForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }

    if (!isEmpty(this.props.location.state)) {
      this.state['referrer'] = this.props.location.state.referrer.pathname;
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

  componentWillReceiveProps (nextProps) {
    this.setState({ error: nextProps.error, current_user: nextProps.current_user, success: nextProps.success });
  }

  render () {
    return (
      <div>
        { showSuccessAlert(this.state.success) }
        { showErrorAlert(this.state.error) }
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
