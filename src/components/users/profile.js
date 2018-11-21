import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import profile from '../../actions/users/profile';
import update from '../../actions/users/update';
import changePassword from '../../actions/users/change_password';
import Alert from 'react-s-alert';

import Spinner from '../spinner';
import ChangePassword from './change_password';
import Edit from './edit';

class Profile extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false
    }

    this.update = this.update.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  componentDidMount () {
    this.props.profile(this.state);
  }

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;
    const state = this.state;
    let loaded;

    if (prevProps === props) {
      return;
    }

    if (props.success && props.success !== state.success) {
      this.alert('success', props.success);
    }

    if (props.current_user) {
      loaded = true;
    }

    this.setState({
      ...props,
      loaded: loaded,
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

  update(params) {
    this.props.update({ current_user: this.props.current_user, ...params});
  }

  changePassword (params) {
    this.props.changePassword({ current_user: this.props.current_user, ...params});
  }

  render () {
    if (this.state.loaded) {
      const current_user = this.state.current_user
      return (
        <div>
          <div className='row'>
            <div className='col col-md-10 offset-md-1'>
              <div className='container-fluid'>
                <div className='card'>
                  <div className='card-header'>
                    <h4>{ current_user.username }</h4>
                  </div>
                  <div className='card-body my-2 mx-3'>
                    <nav>
                      <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                        <a
                          className="nav-item nav-link active"
                          id="nav-details-tab" data-toggle="tab"
                          href="#nav-details"
                          role="tab"
                          aria-controls="nav-details"
                          aria-selected="true"
                        >
                          Profile
                        </a>
                        <a
                          className="nav-item nav-link"
                          id="nav-passwrod-tab"
                          data-toggle="tab"
                          href="#nav-password"
                          role="tab"
                          aria-controls="nav-password"
                          aria-selected="false"
                        >
                          Password
                        </a>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-details"
                        role="tabpanel"
                        aria-labelledby="nav-details-tab"
                      >
                        <Edit { ...this.state } update={ this.update }/>
                      </div>
                      <div className="tab-pane fade" id="nav-password" role="tabpanel" aria-labelledby="nav-passwrod-tab">
                        <ChangePassword { ...this.state } changePassword={ this.changePassword }/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <Spinner />;
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
    update: update,
    changePassword: changePassword
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
