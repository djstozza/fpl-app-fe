import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Signup from '../../../components/users/signup';
import UsersReducer from '../../../reducers/reducer_users';

// Turns out this import allowed the signUp action to be mocked
import * as signUp from '../../../actions/users/sign_up';

describe('<Signup />', () => {
  describe('render()', () => {
    test('submits the form data', () => {
      const middlewares = [thunk]

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
  });
});
