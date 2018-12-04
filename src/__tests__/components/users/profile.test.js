import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Profile from '../../../components/users/profile';
import Edit from '../../../components/users/edit';
import ChangePassword from '../../../components/users/changePassword';
import UsersReducer from '../../../reducers/reducer_users';
import Spinner from '../../../components/spinner';

import * as changePassword from '../../../actions/users/changePassword';
import * as update from '../../../actions/users/update';

const changePasswordActionMock = jest.spyOn(changePassword, 'default');
const updateActionMock = jest.spyOn(update, 'default');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  UsersReducer: {
    current_user: undefined
  },
};

const store = mockStore(initialState);

const currentUser = {
  email: 'foo@gmail.com',
  username: 'foo',
}

const wrapper = shallow(<Profile store={store} />);
const component = wrapper.dive();

describe('<Profile />', () => {
  test('shows spinner if state not loaded', () => {
    expect(component.find(Spinner)).toHaveLength(1)
  });

  test('shows the username as a header', () => {
    component.setProps({
      current_user: currentUser
    });

    expect(component.find('.card-header h4').text()).toEqual(currentUser.username);
  });

  test('submits the edit form data', () => {
    component.setProps({
      current_user: currentUser
    });

    const edit = component.find(Edit);

    expect(edit).toHaveLength(1);
    expect(edit.props().current_user).toEqual(currentUser);

    const editComponent = edit.dive();

    expect(editComponent.find('#email').getElement().props.value).toEqual(currentUser.email);
    expect(editComponent.find('#username').getElement().props.value).toEqual(currentUser.username);

    editComponent.find('#email').simulate(
      'change', {
        target: {
          name: 'email', value: 'bar@gmail.com'
        }
      }
    );

    editComponent.find('#username').simulate(
      'change', {
        target: {
          name: 'username', value: 'bar'
        }
      }
    );

    editComponent.find('form').simulate(
      'submit', {
        preventDefault() {}
      }
    );

    expect(updateActionMock).toHaveBeenCalledWith({
      current_user: currentUser,
      email: 'bar@gmail.com',
      username: 'bar'
    });
  });


  test('submits the change password form data', () => {
    component.setProps({
      current_user: currentUser
    });

    const changePassword = component.find(ChangePassword);

    expect(changePassword).toHaveLength(1);
    expect(changePassword.props().current_user).toEqual(currentUser);


    const changePasswordComponent = changePassword.dive();

    changePasswordComponent.find('#current-password').simulate(
      'change', {
        target: {
          name: 'current_password', value: '12345678'
        }
      }
    );

    changePasswordComponent.find('#password').simulate(
      'change', {
        target: {
          name: 'password', value: '87654321'
        }
      }
    );

    changePasswordComponent.find('#password-confirmation').simulate(
      'change', {
        target: {
          name: 'password_confirmation', value: '87654321'
        }
      }
    );

    changePasswordComponent.find('form').simulate(
      'submit', {
        preventDefault() {}
      }
    );

    expect(changePasswordActionMock).toHaveBeenCalledWith({
      current_user: currentUser,
      current_password: '12345678',
      password: '87654321',
      password_confirmation: '87654321'
    });
  });
});
