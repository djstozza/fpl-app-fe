import React, { Component } from 'react';
import ReactTable from 'react-table';
import TeamFixtures from './team_fixtures.js';
import TeamLadder from './team_ladder.js';

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
          <div className="card-header" id="headingTwo">
            <h6 className="mb-0">
              <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Collapsible Group Item #2
              </button>
            </h6>
          </div>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#team-accordion">
            <div className="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.  wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
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
