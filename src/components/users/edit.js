import React, { Component } from 'react';

export default class Edit extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: this.props.current_user.email,
      username: this.props.current_user.username,
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
    this.props.update({...this.state});
  }

  showError(type) {
    if (this.state && this.state.error && this.state.error.data.errors[type]) {
      return this.state.error.data.errors[type][0];
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps === this.props) {
      return;
    }

    this.setState({
      error: this.props.error
    })
  }

  render () {
    return (
      <form onSubmit={ this.handleSubmit } >
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className={ `form-control ${this.showError('email') ? 'is-invalid' : ''}` }
              id="email"
              placeholder="Email"
              value={ this.state.email }
              onChange={ this.handleChange }
            />
            <div className="invalid-feedback">
              { this.showError('email') }
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className={ `form-control ${this.showError('username') ? 'is-invalid' : ''}` }
              id="username"
              placeholder="Username"
              value={ this.state.username }
              onChange={ this.handleChange }
            />
            <div className="invalid-feedback">
              { this.showError('username') }
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Edit</button>
        </div>
      </form>
    )
  }
}
