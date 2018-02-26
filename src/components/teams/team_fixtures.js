import React, { Component } from 'react';
import ReactTable from 'react-table';
import _ from 'underscore';

const moment = require('moment-timezone');

export default class TeamFixtures extends Component {
  render () {
    const self = this;
    const data = _.sortBy(this.props.fixtures, (fixture) =>  parseInt(fixture.relationships.round.data.id));
    const columns = [
      {
        Header: 'Round',
        accessor: 'relationships.round.data.id',
        sortMethod: (a, b) => { return parseInt(a) > parseInt(b) ? 1 : -1 }
      }, {
        Header: () => <b>Kickoff</b>,
        accessor: 'attributes.kickoff_time',
        Cell: (row) => {
          return moment(row.original.attributes.kickoff_time).tz(this.props.tz).format('DD/MM/YY - HH:MM')
        }
      }, {
        Header: () => <b>Opponent</b>,
        Cell: (row) => {
          const homeTeamId = row.original.relationships.team_h.data.id
          const awayTeamId = row.original.relationships.team_a.data.id

          let opponentId;
          homeTeamId === self.props.team.id ? opponentId = awayTeamId : opponentId = homeTeamId;

          const opponent = _.find(self.props.teams, (team) => {
            return team.id === opponentId
          })
          return opponent.attributes.name
        }
      }, {
        Header: () => <b>H/A</b>,
        id: 'team_h_id',
        accessor: 'relationships.team_h.data.id',
        Cell: (row) => {
          const homeTeamId = row.original.relationships.team_h.data.id
          return homeTeamId === self.props.team.id ? 'Home' : 'Away';
        },
        filterMethod: (filter, row) => {
          console.log(filter, row._original)
          if (filter.value === "all") {
            return true;
          } else if (filter.value === "Home") {
            return row._original.relationships.team_h.data.id === self.props.team.id;
          } else {
            return row._original.relationships.team_h.data.id !== self.props.team.id;
          }
        },
        Filter: ({ filter, onChange }) => {
          return (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%", display: 'block' }}
              value={filter ? filter.value : "all"}
            >
              <option value="all"></option>
              <option value="Home">Home</option>
              <option value="Away">Away</option>
            </select>
          )

        }
      }, {
        Header: () => <b>Result</b>,
        Cell: (row) => {
          const resultIndex = _.indexOf(data, row.original)
          return self.props.team.attributes.form[resultIndex]
        }
      }, {
        Header: () => <b>Score</b>,
        Cell: (row) => {
          if (row.original.attributes.team_h_score !== null) {
            return `${row.original.attributes.team_h_score} - ${row.original.attributes.team_a_score}`
          }
        }
      }
    ]

    return (
      <ReactTable
        data={ data }
        columns={ columns }
        defaultSorted={[
          { id: 'relationships.round.data.id', asc: true }
        ]}
        className="-striped -highlight centered"
        defaultPageSize={ this.props.fixtures.length }
        filterable
        defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
      />
    );
  }
}
