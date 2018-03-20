import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import profile from '../../actions/users/profile.js';
import { showErrorAlert, showSuccessAlert } from '../../utils/user.js';
import isEmpty from 'lodash/isEmpty';

class Profile extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false
    }
  }

  componentWillMount () {
    this.props.profile(this.state);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      current_user: nextProps.current_user,
      error: nextProps.error
    });

    if (!isEmpty(nextProps.success)) {
      this.setState({
        success: nextProps.success
      })
    }

    if (!isEmpty(nextProps.current_user )) {
      this.setState({
        loaded: true
      })
    }
  }

  render () {
    if (this.state.loaded) {
      return (
        <div>
          { showSuccessAlert(this.state.success) }
          { showErrorAlert(this.state.error) }
          <p>{ this.state.current_user.username }</p>
        </div>
      )
    } else {
      return <p>Loading...</p>
    }
  }
}

function mapStateToProps (state) {
  return {
    current_user: state.UsersReducer.current_user,
    success: state.UsersReducer.success,
    error: state.UsersReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    profile: profile,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
