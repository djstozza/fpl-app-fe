import React from 'react';
import FixtureGroups from './fixture_groups';

export default class Round extends React.Component {
  render () {
    return (
      <div>
        <h4>{ this.props.round.name }</h4>
        <FixtureGroups { ...this.props } />
      </div>
    );
  }
}
