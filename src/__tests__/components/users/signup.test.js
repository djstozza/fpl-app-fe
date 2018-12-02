import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Signup from '../../../components/users/signup';
import UsersReducer from '../../../reducers/reducer_users';

import * as signUp from '../../../actions/users/sign_up';

describe('<Signup />', () => {
  test('submits the form data', () => {
    const middlewares = [thunk];

    const signUpActionMock = jest.spyOn(signUp, 'default');
    const mockStore = configureStore(middlewares);

    const initialState = {
      UsersReducer: {
        email: '',
        username: '',
        password: '',
      },
    };

    const store = mockStore(initialState);

    const wrapper = shallow(<Signup store={store} />);
    const component = wrapper.dive();

    component.find('#email').simulate(
      'change', {
        target: {
          name: 'email', value: 'foo@gmail.com'
        }
      }
    );

    component.find('#email').simulate(
      'change', {
        target: {
          name: 'username', value: 'foo'
        }
      }
    );

    component.find('#password').simulate(
      'change', {
        target: {
          name: 'password',
          value: '12345678',
        }
      }
    );

    component.find('form').simulate(
      'submit', {
        preventDefault() {}
      }
    );

    expect(signUpActionMock).toHaveBeenCalledWith({
      email: 'foo@gmail.com',
      username: 'foo',
      password: '12345678'
    });
  });

  test('shows errors on the form', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    const initialState = {
      UsersReducer: {
        email: '',
        username: '',
        password: '',
      },
    };

    const store = mockStore(initialState);

    const wrapper = shallow(<Signup store={store} />);
    const component = wrapper.dive();
    component.setState({
      error:  {
        data: {
          errors: {
            email: ['mock email error'],
            username: ['mock username error'],
            password: ['mock password error']
          }
        },
        status: 422
      }
    });

    expect(component.find('#email').hasClass('is-invalid')).toEqual(true);
    expect(component.find('#username').hasClass('is-invalid')).toEqual(true);
    expect(component.find('#password').hasClass('is-invalid')).toEqual(true);

    expect(component.find('.email .invalid-feedback').text()).toEqual('mock email error');
    expect(component.find('.username .invalid-feedback').text()).toEqual('mock username error');
    expect(component.find('.password .invalid-feedback').text()).toEqual('mock password error');
  });
});
