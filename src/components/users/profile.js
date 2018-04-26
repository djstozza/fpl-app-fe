import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import profile from '../../actions/users/profile';
import { showErrorAlert, showSuccessAlert } from '../../utils/general';
import update from '../../actions/users/update';
import changePassword from '../../actions/users/change_password';

import ChangePassword from './change_password';
import Edit from './edit';
import isEmpty from 'lodash/isEmpty';

class Profile extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false
    }

    this.update = this.update.bind(this);
    this.changePassword = this.changePassword.bind(this);
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
          { showSuccessAlert(this.state.success, this.state.error) }
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
    update: update,
    changePassword: changePassword
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
