import React, { Component } from 'react';
import ReactTable from 'react-table';

export default class TeamLadder extends Component {
  render () {
    const data = this.props.teams
    const columns = [
      { Header: () => <b>Position</b>, accessor: 'attributes.position' },
      { Header: () => <b>Name</b>, accessor: 'attributes.name' },
      { Header: () => <b>Played</b>, accessor: 'attributes.played' },
      { Header: () => <b>Wins</b>, accessor: 'attributes.wins' },
      { Header: () => <b>Losses</b>, accessor: 'attributes.losses' },
      { Header: () => <b>Draws</b>, accessor: 'attributes.draws' },
      { Header: () => <b>Form</b>, accessor: 'attributes.current_form' },
      { Header: () => <b>P/D</b>, accessor: 'attributes.goal_difference' },
      { Header: () => <b>Points</b>, accessor: 'attributes.points' }
    ]

    return (
      <ReactTable
        data={ data }
        columns={ columns }
        showPaginationBottom={ false }
        defaultSorted={[
          { id: "attributes.position", asc: true }
        ]}
        className="-striped -highlight centered"
      />
    );
  }
}
