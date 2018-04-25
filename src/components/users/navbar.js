import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logout from '../../actions/users/logout';
import isEmpty from 'lodash/isEmpty'

class Navbar extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loggedIn: this.props.loggedIn
    }

    this.userLinks = this.userLinks.bind(this);
    this.logout = this.logout.bind(this);
  }

  userLinks () {
    if (this.state.loggedIn) {
      return [
        <Link key='profile' to='/profile' className="btn btn-outline-secondary">Profile</Link>,
        <Link key='fpl-teams' to='/fpl_teams' className="btn btn-outline-secondary">My Teams</Link>,
        <button
          key='logout'
          onClick={ (e) => { this.logout(e) } }
          className="btn btn-outline-secondary"
        >
          Log out
        </button>
      ];
    } else {
      return [
        <Link key='login' to='/login' className="btn btn-outline-secondary">Log in</Link>,
        <Link key='sign-up' to='/sign-up' className="btn btn-outline-secondary">Sign up</Link>
      ];
    }
  }

  logout (e) {
    e.preventDefault();
    this.props.logout();
  }

  componentWillMount () {
    this.setState({ loggedIn: !isEmpty(localStorage.getItem('access-token')) })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ loggedIn: !isEmpty(localStorage.getItem('access-token')) });
  }

  render () {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark justify-content-between">
        <Link className="navbar-brand" to="/">Fpl App Fe</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#nav-collapse"
          aria-controls="nav-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav-collapse">
          <ul className="navbar-nav mr-auto mt-2 mt-sm-0">
            <li className='nav-item mx-auto'>
              <Link to='/teams/1' className="nav-link">Teams</Link>
            </li>
            <li className='nav-item mx-auto'>
              <Link to='/players' className="nav-link">Players</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto mt-2 order-1 mt-sm-0">
            { this.userLinks() }
          </ul>
        </div>
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
