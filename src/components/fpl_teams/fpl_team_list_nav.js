import React, { Component } from 'react';
import { centerItVariableWidth } from '../../utils/nav_tab';


export default class FplTeamListNav extends Component {
  componentDidMount () {
    centerItVariableWidth(`fpl-team-list-tab-${this.props.fpl_team_list.round_id}`, "nav-tabs", true);
  }

  render () {
    const self = this;
    const roundId = this.props.fpl_team_list.round_id;

    const fplTeamLists = this.props.fpl_team_lists.map(function (fplTeamList) {
      const tabClass = `fpl-team-list-tab-${fplTeamList.round_id}`
      return (
        <li key={ fplTeamList.round_id } className='nav-item'>
          <a
            className={ `nav-link ${fplTeamList.round_id === parseInt(roundId, 10) ? 'active' : ''} ${tabClass}` }
            role="tab"
            onClick={ () => {
              centerItVariableWidth(tabClass, "nav-tabs", false);
              self.props.selectFplTeamList(fplTeamList.id) }
            }
          >
            Gameweek { fplTeamList.round_id }
          </a>
        </li>
      );
    });

    return (
      <ul className="nav nav-tabs scroll-nav mb-2">
        { fplTeamLists }
        <li className='indicator' />
      </ul>
    );
  }
}
