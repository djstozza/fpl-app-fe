import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { centerItVariableWidth } from '../../utils/nav_tab';

export default class TeamsNav extends Component {
  componentDidMount () {
    centerItVariableWidth(`team-tab-${ this.props.team.id }`, 'nav-tabs', true);
  }

  render () {
    const self = this;
    const teamId = this.props.team.id;

    const teamList = this.props.teams.map(function (team) {
      const teamTabClass = `team-tab-${ team.id }`
      const teamImg = require(`../../images/shields/${ team.short_name.toLowerCase() }.png`);

      return (
          <li
          key={ team.id }
          className='nav-item'
        >
              <div
            className={ `nav-link ${ team.id === parseInt(teamId, 10) ? 'active' : '' } ${ teamTabClass }` }
            role="tab"
            onClick={ () => {
              centerItVariableWidth(teamTabClass, 'nav-tabs', false);
              self.props.selectTeam(team.id) }
            }
          >
                  <img className='nav-img' src={ teamImg } alt={ team.name } />
                  <span>&nbsp;{ team.short_name }</span>
              </div>
          </li>
      );
    });

    return (
        <ul className="nav nav-tabs scroll-nav mb-4">
            { teamList }
            <li className='indicator' />
        </ul>
    );
  }
}

TeamsNav.propTypes = {
  team: PropTypes.object,
  'team.id': PropTypes.number,
  teams: PropTypes.array,
  'teams.map': PropTypes.func,
}
