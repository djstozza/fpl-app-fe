import React, { Component } from 'react';
import TeamFixtures from './team_fixtures.js';
import TeamLadder from './team_ladder.js';
import PlayersTable from '../players/players_table.js';

export default class TeamAccordion extends Component {
  render () {
    return (
      <div id="team-accordion">
        <div className="card">
          <div
            className="card-header accordion-header"
            data-toggle="collapse"
            data-target="#team-fixture-info"
            aria-controls="team-fixture-info"
            id="team-fixture-header"
          >
            <h6 className="mt-1">
              Team Fixtures
            </h6>
          </div>
          <div
            id="team-fixture-info"
            className="collapse"
            aria-labelledby="team-fixture-header"
            data-parent="#team-accordion"
          >
            <div className="card-body">
              <TeamFixtures
                team={ this.props.team }
                teams={ this.props.teams }
                fixtures={ this.props.fixtures }
                tz={ this.props.tz }
              />
            </div>
          </div>
        </div>
        <div className="card">
          <div
            className="card-header accordion-header"
            data-toggle="collapse"
            data-target="#team-player-info"
            aria-controls="team-player-info"
            id="team-player-header"
          >
            <h6 className="mt-1">
              Players
            </h6>
          </div>
          <div
            id="team-player-info"
            className="collapse"
            aria-labelledby="team-player-header"
            data-parent="#team-accordion"
          >
            <div className="card-body">
              <PlayersTable
                players={ this.props.players }
                team={ this.props.team }
                teams={ this.props.teams }
                positions={ this.props.positions }
              />
            </div>
          </div>
        </div>
        <div className="card">
          <div
            className="card-header accordion-header"
            data-toggle="collapse"
            data-target="#team-ladder-info"
            aria-controls="team-ladder-info"
            id="team-ladder-header"
          >
            <h6 className="mt-1">
              Ladder
            </h6>
          </div>
          <div
            id="team-ladder-info"
            className="collapse"
            aria-labelledby="team-ladder-header"
            data-parent="#team-accordion"
          >
            <div className="card-body">
              <TeamLadder teams={ this.props.teams } team={ this.props.team } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
