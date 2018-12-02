import React from 'react';
import { mount } from 'enzyme';

import ChangePassword from '../../../components/users/changePassword';

describe('<ChangePassword />', () => {
  test('submits the form', () => {
    const currentUser = {
      email: 'foo@gmail.com',
      username: 'foo',
    }

    const changePassword = jest.fn();

    const props = {
      current_user: currentUser,
      changePassword: changePassword
    }

    const component = mount(<ChangePassword {...props} />);

    component.find('#current-password').simulate(
      'change', {
        target: {
          name: 'current_password', value: '12345678'
        }
      }
    );

    component.find('#password').simulate(
      'change', {
        target: {
          name: 'password', value: '87654321'
        }
      }
    );

    component.find('#password-confirmation').simulate(
      'change', {
        target: {
          name: 'password_confirmation', value: '87654321'
        }
      }
    );

    component.find('form').simulate(
      'submit', {
        preventDefault() {}
      }
    );

    expect(changePassword).toHaveBeenCalledWith({
      current_password: '12345678',
      password: '87654321',
      password_confirmation: '87654321'
    });
  });

  test('shows errors on the form', () => {
    const currentUser = {
      email: 'foo@gmail.com',
      username: 'foo',
    }

    const props = {
      current_user: currentUser,
      changePassword: jest.fn()
    }

    const component = mount(<ChangePassword {...props} />);
    component.setState({
      error:  {
        data: {
          errors: {
            current_password: ['mock current password error'],
            password: ['mock password error'],
            password_confirmation: ['mock password confirmation error'],
          }
        },
        status: 422
      }
    });

    expect(component.find('#current-password').hasClass('is-invalid')).toEqual(true);
    expect(component.find('#password').hasClass('is-invalid')).toEqual(true);
    expect(component.find('#password-confirmation').hasClass('is-invalid')).toEqual(true);

    expect(component.find('.current-password .invalid-feedback').text()).toEqual('mock current password error');
    expect(component.find('.password .invalid-feedback').text()).toEqual('mock password error');
    expect(component.find('.password-confirmation .invalid-feedback').text()).toEqual(
      'mock password confirmation error'
    );
  });
})
