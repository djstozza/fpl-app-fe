import React from 'react';
import { shallow, mount, setProps } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import LogInForm from '../../../components/users/login';
import UsersReducer from '../../../reducers/reducer_users';

import * as login from '../../../actions/users/login';
import Alert from 'react-s-alert';

describe('<LogInForm />', () => {
  describe('render()', () => {
    test('submits the form data', () => {
      const middlewares = [thunk];

      const loginActionMock = jest.spyOn(login, 'default');
      const mockStore = configureStore(middlewares);
    
      const initialState = {
        UsersReducer: {
          email: '',
          username: '',
          password: '',
        },
      };

      const props = {
        location: { pathname: '/login', state: undefined }
      }

      const store = mockStore(initialState);

      const wrapper = shallow(<LogInForm store={store} {...props} />);
      const component = wrapper.dive();

      component.find('#email').simulate(
        'change', {
          target: {
            name: 'email', value: 'foo@gmail.com'
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

      expect(loginActionMock).toHaveBeenCalledWith({
        email: 'foo@gmail.com',
        password: '12345678'
      });
    });

    test('triggers an alert if invalid', () => {
      const middlewares = [thunk];

      const loginActionMock = jest.spyOn(login, 'default');
      const mockStore = configureStore(middlewares);

      const initialState = {
        UsersReducer: {
          email: '',
          username: '',
          password: '',
        },
      };

      const props = {
        location: { pathname: '/login', state: undefined },
      }

      const store = mockStore(initialState);

      const wrapper = shallow(<LogInForm store={store} {...props} />);
      const component = wrapper.dive();
      const alertMock = jest.spyOn(component.instance(), 'alert');

      component.setProps({
        error: {
          data: {
            errors: ['mocked error response']
          },
          status: 401
        }
      });

      expect(alertMock).toHaveBeenCalledWith('error', 'mocked error response');
    });

    test('triggers an alert and sets the request referrer', () => {
      const middlewares = [thunk];

      const loginActionMock = jest.spyOn(login, 'default');
      const mockStore = configureStore(middlewares);


      const initialState = {
        UsersReducer: {
          email: '',
          username: '',
          password: '',
        },
      };

      const props = {
        location: {
          pathname: '/login',
          state: {
            error: 'mocked error response',
            referrer: {
              pathname: '/someRoute'
            }
          }
        }
      }

      const store = mockStore(initialState);

      const wrapper = shallow(<LogInForm store={store} {...props} />);
      const component = wrapper.dive();

      const instance = component.instance();
      const alertMock = jest.spyOn(instance, 'alert');

      instance.componentDidMount();

      expect(component.state().referrer).toEqual('/someRoute');
      expect(alertMock).toHaveBeenCalledWith('error', 'mocked error response');
    });
  });
});
