import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChangePassword extends Component {
  constructor (props) {
    super(props);

    this.state = {
      current_password: '',
      password: '',
      password_confirmation: '',
    }

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
    this.props.changePassword({ ...this.state });
  }

  showError(type) {
    if (this.state && this.state.error && this.state.error.data.errors[ type ]) {
      return this.state.error.data.errors[ type ][ 0 ];
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps === this.props) {
      return;
    }

    this.setState({ error: this.props.error });

    if (this.props.success) {
      this.setState({
        success: null
      });
    }
  }

  render () {
    return (
        <form onSubmit={ this.handleSubmit } >
            <div className="form-row">
                <div className="form-group current-password col-md-12">
                    <label htmlFor="current-password">Current Password</label>
                    <input
                type="password"
                name="current_password"
                className={ `form-control ${ this.showError('current_password') ? 'is-invalid' : '' }` }
                id="current-password"
                onChange={ this.handleChange }
              />
                    <div className="invalid-feedback">
                        { this.showError('current_password') }
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
                onChange={ this.handleChange }
              />
                    <div className="invalid-feedback">
                        { this.showError('password') }
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group password-confirmation col-md-12">
                    <label htmlFor="password-confirmation">Confirm Password</label>
                    <input
                type="password"
                name="password_confirmation"
                className={ `form-control ${ this.showError('password_confirmation') ? 'is-invalid' : '' }` }
                id="password-confirmation"
                onChange={ this.handleChange }
              />
                    <div className="invalid-feedback">
                        { this.showError('password_confirmation') }
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Change Password</button>
            </div>
        </form>
    )
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  error: PropTypes.object
}
