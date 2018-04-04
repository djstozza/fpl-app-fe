import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logout from '../../actions/users/logout.js';
import isEmpty from 'lodash/isEmpty'

class Navbar extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loggedIn: this.props.loggedIn
    }

    this.userLinks = this.userLinks.bind(this);
  }

  userLinks () {
    if (this.state.loggedIn) {
      return (
        <div>
          <Link to='/profile' className="btn btn-outline-secondary">Profile</Link>
          <button onClick={ (e) =>  { e.preventDefault; this.props.logout() } } className="btn btn-outline-secondary">Log out</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to='/login' className="btn btn-outline-secondary">Log in</Link>
          <Link to='/sign-up' className="btn btn-outline-secondary">Sign up</Link>
        </div>
      )
    }
  }

  componentWillMount () {
    this.setState({ loggedIn: !isEmpty(localStorage.getItem('access-token')) })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ loggedIn: !isEmpty(localStorage.getItem('access-token')) });
  }

  render () {
    return (


        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
          <Link className="navbar-brand" to="/">Fpl App Fe</Link>
          { this.userLinks() }
        </nav>

    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    logout: logout,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Navbar);
