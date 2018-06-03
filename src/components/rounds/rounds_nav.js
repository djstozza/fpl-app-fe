import React, { Component } from 'react';
import { centerItVariableWidth } from '../../utils/nav_tab';


export default class RoundsNav extends Component {
  componentDidMount () {
    centerItVariableWidth(`round-tab-${this.props.round.id}`, "nav-tabs", true);
  }

  render () {
    const self = this;
    const roundId = this.props.round.id;
    const roundList = this.props.rounds.map(function (round) {
      const roundTabClass = `round-tab-${round.id}`
      return (
        <li key={ round.id } className='nav-item'>
          <a
            className={ `nav-link ${round.id === parseInt(roundId, 10) ? 'active' : ''} ${roundTabClass}` }
            role="tab"
            onClick={ () => {
              centerItVariableWidth(roundTabClass, "nav-tabs", false);
              self.props.selectRound(round.id) }
            }
          >
            { round.name }
          </a>
        </li>
      );
    });

    return (
      <ul className="nav nav-tabs scroll-nav mb-4">
        { roundList }
        <li className='indicator' />
      </ul>
    );
  }
}
