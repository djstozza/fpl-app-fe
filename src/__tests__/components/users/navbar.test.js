import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Navbar from '../../../components/users/navbar';
import { Link } from 'react-router-dom';

import * as logout from '../../../actions/users/logout';

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const logoutActionMock = jest.spyOn(logout, 'default');

const initialState = {};

const store = mockStore(initialState);

const wrapper = shallow(<Navbar store={store} />);
const component = wrapper.dive();


describe('<Navbar />', () => {
  test('it shows the logged out nav tabs', () => {
    expect(component.find(Link)).toHaveLength(5);

    const linkArr = [
      { to: '/', children: 'Fpl App Fe' },
      { to: '/teams/1', children: 'Teams' },
      { to: '/players', children: 'Players' },
      { to: '/login', children: 'Log in' },
      { to: '/sign-up', children: 'Sign up' },
    ]

    component.find(Link).forEach((node, i) => {
      expect(node.props().to).toEqual(linkArr[i].to);
      expect(node.props().children).toEqual(linkArr[i].children);
    });
  });

  test('it shows the logged in nav tabs', () => {
    component.setState({
      loggedIn: true
    });

    expect(component.find(Link)).toHaveLength(5);

    const linkArr = [
      { to: '/', children: 'Fpl App Fe' },
      { to: '/teams/1', children: 'Teams' },
      { to: '/players', children: 'Players' },
      { to: '/profile', children: 'Profile' },
      { to: '/fpl_teams', children: 'My Teams' },
    ]
  });

  test('trigger the log out action', () => {
    component.setState({
      loggedIn: true
    });

    component.find('button[children="Log out"]').simulate('click', {
      preventDefault() {}
    });

    expect(logoutActionMock).toHaveBeenCalled();
  });
});
