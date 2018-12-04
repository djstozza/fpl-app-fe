import React from 'react';
import { render } from 'enzyme';

import TeamsNav from '../../../components/teams/teamsNav';

const props = {
  team: {
    id: 1,
    short_name: 'ARS',
  },
  teams: [
    { id: 1, short_name: 'ARS' },
    { id: 2, short_name: 'BOU' },
  ]
}

const component = render(<TeamsNav {...props} />);

describe('<TeamsNav />', () => {
  test('shows all the nav tabs', () => {
    expect(component.find('.nav-link')).toHaveLength(2);
  });

  test('shows the active nav tab', () => {
    expect(component.find('.nav-link.active')).toHaveLength(1);
    expect(component.find('.nav-link.active').children()[0].attribs.src).toEqual('ars.png');
    expect(component.find('.nav-link.active').children()[0].attribs.class).toEqual('nav-img');
  });
});
