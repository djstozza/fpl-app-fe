import React from 'react';
import { mount } from 'enzyme';

import Edit from '../../../components/users/edit';

describe('<Edit />', () => {
  test('submits the form', () => {
    const currentUser = {
      email: 'foo@gmail.com',
      username: 'foo',
    }

    const update = jest.fn();

    const props = {
      current_user: currentUser,
      update: update
    }

    const component = mount(<Edit {...props} />);

    component.find('#email').simulate(
      'change', {
        target: {
          name: 'email', value: 'bar@gmail.com'
        }
      }
    );

    component.find('#username').simulate(
      'change', {
        target: {
          name: 'username', value: 'bar'
        }
      }
    );

    component.find('form').simulate(
      'submit', {
        preventDefault() {}
      }
    );

    expect(update).toHaveBeenCalledWith({
      email: 'bar@gmail.com',
      username: 'bar'
    });
  });

  test('shows errors on the form', () => {
    const currentUser = {
      email: 'foo@gmail.com',
      username: 'foo',
    }

    const props = {
      current_user: currentUser,
      update: jest.fn()
    }

    const component = mount(<Edit {...props} />);
    component.setState({
      error:  {
        data: {
          errors: {
            email: ['mock email error'],
            username: ['mock username error'],
          }
        },
        status: 422
      }
    });

    expect(component.find('#email').hasClass('is-invalid')).toEqual(true);
    expect(component.find('#username').hasClass('is-invalid')).toEqual(true);

    expect(component.find('.email .invalid-feedback').text()).toEqual('mock email error');
    expect(component.find('.username .invalid-feedback').text()).toEqual('mock username error');
  });
})
