import React, { Component } from 'react';
import { centerItVariableWidth } from '../../utils/nav_tab';

export default class TeamsNav extends Component {
  componentDidMount () {
    centerItVariableWidth(`team-tab-${this.props.team.id}`, "nav-tabs", true);
  }

  render () {
    const self = this;
    const teamId = this.props.team.id;
    const teamList = this.props.teams.map(function (team) {
      const teamTabClass = `team-tab-${team.id}`
      const teamImg = require(`../../images/shields/${team.short_name.toLowerCase()}.png`);

      return (
        <li
          key={ team.id }
          className='nav-item'
        >
          <a
            className={ `nav-link ${team.id === parseInt(teamId, 10) ? 'active' : ''} ${teamTabClass}` }
            role="tab"
            onClick={ () => {
              centerItVariableWidth(teamTabClass, "nav-tabs", false);
              self.props.selectTeam(team.id) }
            }
          >
            <img className='nav-img' src={ teamImg } alt={ team.name } />
            <span>&nbsp;{ team.short_name }</span>
          </a>
        </li>
      );
    });

    return (
      <ul className="nav nav-tabs scroll-nav">
        { teamList }
        <li className='indicator' />
      </ul>
    );
  }
}
