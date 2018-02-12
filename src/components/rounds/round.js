import React from 'react';
import FixtureGroups from './fixture_groups.js';

export default class Round extends React.Component {

  render () {
    return (
      <div>
        <h4>{ this.props.round.name }</h4>
        <FixtureGroups fixtures={ this.props.fixtures } teams={ this.props.teams } tz={ this.props.tz } />
      </div>

    );
  }
}
