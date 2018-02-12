import React, { Component } from 'react';
import $ from 'jquery';
import { centerItVariableWidth } from '../../utils/nav_tab.js';

export default class RoundsNav extends Component {
  componentDidMount () {
    $('ul.tabs').tabs();
    centerItVariableWidth(`round-tab-${this.props.round.id}`, "rounds-nav");
  }

  render () {
    const self = this;
    const roundId = this.props.round.id;
    let roundList = this.props.rounds.map(function (round) {
      let roundTabClass = `round-tab-${round.id}`
      return (
        <li
          key={ round.id }
          className={ `tab col s4 m2` }
        >
          <a
            className={ `round-link ${round.id == roundId ? 'active' : ''} ${roundTabClass}` }
            onClick={ () => {
              centerItVariableWidth(roundTabClass, "rounds-nav");
              self.props.selectRound(round.id) }
            }
          >
            { round.attributes.name }
          </a>
        </li>
      );
    });

    return (
      <div className="row">
        <div className="col s12">
          <ul className="rounds-nav tabs tabs-fixed-width">
            { roundList }
          </ul>
        </div>
      </div>
    )
  }
}
