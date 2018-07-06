import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import FixtureHistoriesTable from './fixture_history_table';
import PastHistoryTable from './past_history_table';

export default class PlayerAccordion extends Component {
  constructor (props) {
    super(props)

    this.playerPastHistory = this.playerPastHistory.bind(this);
  }

  playerFixtureHistory () {
    if (isEmpty(this.props.player.player_fixture_histories)) {
      return;
    }

    return (
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
    );
  }

  playerPastHistory () {
    if (isEmpty(this.props.player.player_past_histories)) {
      return;
    }
    return (
      <div className="card">
        <div
          className="card-header accordion-header"
          data-toggle="collapse"
          data-target="#player-past-info"
          aria-controls="player-past-info"
          id="player-past-header"
        >
          <h6 className="mt-1">
            Past Seasons
          </h6>
        </div>
        <div
          id="player-past-info"
          className="collapse"
          aria-labelledby="player-past-header"
          data-parent="#player-accordion"
        >
          <div className="card-body">
            <PastHistoryTable { ...this.props } />
          </div>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div id="player-accordion">
        { this.playerFixtureHistory() }
        { this.playerPastHistory() }
      </div>
    )
  }
}
