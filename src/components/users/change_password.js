import React, { Component } from 'react';

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

    this.setState({ [target.name]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.changePassword({ ...this.state });
  }

  showError(type) {
    if (this.state && this.state.error && this.state.error.data.errors[type]) {
      return this.state.error.data.errors[type][0];
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ error: nextProps.error });
  }

  render () {
    return (
      <form onSubmit={ this.handleSubmit } >
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="current_password">Current Password</label>
              <input
                type="password"
                name="current_password"
                className={ `form-control ${this.showError('password') ? 'is-invalid' : ''}` }
                id="current_password"
                onChange={ this.handleChange }
              />
              <div className="invalid-feedback">
                { this.showError('current_password') }
              </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className={ `form-control ${this.showError('password') ? 'is-invalid' : ''}` }
                id="password"
                onChange={ this.handleChange }
              />
              <div className="invalid-feedback">
                { this.showError('password') }
              </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="password_confirmation">Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                className={ `form-control ${this.showError('password') ? 'is-invalid' : ''}` }
                id="password_confirmation"
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
