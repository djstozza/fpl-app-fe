import React, { Component } from 'react';
import ReactTable from 'react-table';
import TeamFixtures from './team_fixtures.js';
import $ from 'jquery';

export default class TeamAccordion extends Component {
  componentDidMount () {
    $('.collapsible').collapsible();
  }

  render () {
    return (
      <div>
        <ul className="collapsible popout" data-collapsible="accordion">
          <li>
            <div className="collapsible-header">Fixtures</div>
            <div className="collapsible-body">
              <TeamFixtures team={ this.props.team } fixtures={ this.props.fixtures } tz={ this.props.tz } teams={ this.props.teams } />
            </div>
          </li>
          <li>
            <div className="collapsible-header">Second</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
          <li>
            <div className="collapsible-header">Third</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
        </ul>
      </div>
    );
  }
}
