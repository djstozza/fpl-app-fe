import React from 'react'
import Matches from './matches';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';

const moment = require('moment-timezone');

export default class FixtureGroups extends React.Component {
  render () {
    const sortedFixtureGroups = sortBy(this.props.fixtures, (fixture) => {
      return fixture.kickoff_time
    });

    const fixtureGroups = groupBy(sortedFixtureGroups, (fixture) => {
      return moment(fixture.kickoff_time).tz(this.props.tz).format('dddd, Do MMMM Y')
    });

    const fixtureGroupsEntries = Object.entries(fixtureGroups);

    return (
      <div>
        {
          fixtureGroupsEntries.map((fixtureGroup, key) => {
            return [
              <b key={`game-day-${key}`}>{ fixtureGroup[0] }</b>,
              <Matches { ...this.props } key={`matches-${key}`} matches={ fixtureGroup[1] } />
            ]
          })
        }
      </div>
    );
  }
}
