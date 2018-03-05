import React, { Component } from 'react';
import FixtureHistoriesTable from './fixture_history_table.js';

export default class PlayerAccordion extends Component {
  render () {
    return (
      <div id="player-accordion">
        <div className="card">
          <div
            className="card-header accordion-header"
            data-toggle="collapse"
            data-target="#player-fixture-info"
            aria-controls="player-fixture-info"
            id="player-fixture-header"
          >
            <h6 className="mt-1">
              Fixture History
            </h6>
          </div>
          <div
            id="player-fixture-info"
            className="collapse"
            aria-labelledby="player-fixture-header"
            data-parent="#player-accordion"
          >
            <div className="card-body">
              <FixtureHistoriesTable { ...this.props } />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
