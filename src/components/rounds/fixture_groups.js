import React from 'react'
import Matches from './matches.js';

export default class FixtureGroups extends React.Component {
  render () {
    const fixtureGroups = Object.entries(this.props.fixtures);
    const self = this;

    return (
      <div>
        {
          fixtureGroups.map((fixtureGroup, key) => {
            return [
              <b key={`game-day-${key}`}>{ fixtureGroup[0] }</b>,
              <Matches
                key={`matches-${key}`}
                matches={ fixtureGroup[1] }
                teams={ self.props.teams }
                tz={ self.props.tz }
              />
            ]
          })
        }
      </div>
    );
  }
}
