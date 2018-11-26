import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Spinner from '../../components/spinner';

describe('<Spinner />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Spinner />);

      expect(wrapper.find('.spinner-container')).to.have.lengthOf(1);
      expect(wrapper.find('.fa.fa-futbol-o.fa-5x.fa-spin')).to.have.lengthOf(1);
    });
  });
});
