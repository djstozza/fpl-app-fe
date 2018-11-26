import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import ErrorHandler from '../../components/errorHandler';
import { Redirect } from 'react-router';

const error404 = {
  status: 404,
  response: {
    title: 'mock error',
    description: 'mock error details',
    data: undefined
  }
}

const error500 = {
  status: 500,
  response: {
    title: 'mock error',
    description: 'mock error details',
    data: undefined
  }
}

const error401 = {
  status: 401,
  response: {
    title: 'mock error',
    description: 'mock error details',
    data: undefined
  }
}

describe('<Error />', () => {
  describe('render()', () => {
    test('renders the component if the status is 404', () => {
      const wrapper = shallow(<ErrorHandler error={error404} />);

      expect(wrapper.find('.message-container h2').text()).to.equal('Page Not Found');
      expect(wrapper.find('.message-container').text()).to.include('The page you were looking for does not exist.');
      expect(wrapper.find('.message-container').text()).to.include(
        'You may have mistyped the address or the page may have moved.'
      );
    });


    test('renders the component if the status is 500', () => {
      const wrapper = shallow(<ErrorHandler error={error500} />);

      expect(wrapper.find('.message-container h2').text()).to.equal('Something went wrong');
      expect(wrapper.find('.message-container p').text()).to.equal(
        "Oops... Looks like there's a problem on this page."
      );
    });

    test('redirects to the home page if the status is 401', () => {
      const wrapper = shallow(<ErrorHandler error={error401} />);
      const redirectProps = wrapper.find(Redirect).props()

      expect(redirectProps.to).to.equal('/login');
      expect(redirectProps.error).to.equal(error401);
    });
  });
});
