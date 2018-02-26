import React, { Component } from 'react';
import $ from 'jquery';
import { centerItVariableWidth } from '../../utils/nav_tab.js';

export default class TeamsNav extends Component {
  componentDidMount () {
    $('ul.tabs').tabs();
    centerItVariableWidth(`team-tab-${this.props.team.id}`, "teams-nav");
  }

  render () {
    const self = this;
    const teamId = this.props.team.id;
    const teamList = this.props.teams.map(function (team) {

      const teamImg = require(`../../images/shields/${team.attributes.short_name.toLowerCase()}.png`);
      const teamTabClass = `team-tab-${team.id}`

      return (
        <li
          key={ team.id }
          className={ `tab col s4 m2` }
        >
          <a
            className={ `nav-link ${team.id == teamId ? 'active' : ''} ${teamTabClass}` }
            onClick={ () => {
              centerItVariableWidth(teamTabClass, "nav-tabs");
              self.props.selectTeam(team.id) }
            }
          >
            <div className='valign-wrapper'>
              <img className='nav-img' src={ teamImg } alt={ team.attributes.name } />
              <span>&nbsp;{ team.attributes.short_name }</span>
            </div>
          </a>
        </li>
      );
    });

    return (
      <div className="row">
        <div className="col s12">
          <ul className="nav-tabs tabs tabs-fixed-width">
            { teamList }
          </ul>
        </div>
      </div>
    )
  }
}
