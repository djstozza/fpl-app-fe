import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Team from '../../../components/teams/team';
import TeamsNav from '../../../components/teams/teamsNav';
import TeamAccordion from '../../../components/teams/teamAccordion';

import TeamsReducer from '../../../reducers/reducer_teams';
import TeamReducer from '../../../reducers/reducer_team';
import PositionsReducer from '../../../reducers/reducer_positions';

import * as fetchTeams from '../../../actions/teams/fetch_teams';
import * as fetchTeam from '../../../actions/team/fetch_team';
import * as fetchPositions from '../../../actions/positions/fetch_positions';

import Spinner from '../../../components/spinner';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  TeamsReducer: [],
  TeamReducer: {
    team: undefined,
    fixtures: [],
    players: [],
  },
  PositionsReducer: [],
};

const props = {
  match: {
    params: {
      id: 1
    }
  }
}

const store = mockStore(initialState);

const fetchTeamsAction = jest.spyOn(fetchTeams, 'default');
const fetchTeamAction = jest.spyOn(fetchTeam, 'default');
const fetchPositionsAction = jest.spyOn(fetchPositions, 'default');

const wrapper = shallow(<Team store={store} {...props} />);
const component = wrapper.dive();

describe('<Team />', () => {
  test('shows the spinner if not loaded', () => {
    expect(component.find(Spinner)).toHaveLength(1);
  });

  test('renders the component', () => {
    expect(fetchTeamsAction).toHaveBeenCalled();
    expect(fetchTeamAction).toHaveBeenCalledWith(props.match.params.id);
    expect(fetchPositionsAction).toHaveBeenCalled();

    component.setProps({
      team: { id: 1, short_name: 'ARS', name: 'Arsenal' },
      teams: [
        { id: 1, short_name: 'ARS' },
        { id: 2, short_name: 'BOU' },
      ],
      positions: [
        { id: 1, singular_name_short: 'GKP' },
        { id: 2, singular_name_short: 'DEF' },
        { id: 3, singular_name_short: 'MID' },
        { id: 4, singular_name_short: 'FWD' }
      ],
      players: [
        { id: 1, first_name: 'foo' },
        { id: 2, first_name: 'bar' },
        { id: 3, first_name: 'baz' }
      ]
    });

    expect(component.find(TeamsNav)).toHaveLength(1);
    expect(component.find('h4').text().trim()).toEqual('Arsenal');
    expect(component.find('.image-crest').props().src).toEqual('ars.png');
    expect(component.find(TeamAccordion)).toHaveLength(1);
  });
});
