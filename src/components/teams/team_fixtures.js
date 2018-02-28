import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import _ from 'underscore';

const moment = require('moment-timezone');

export default class TeamFixtures extends Component {
  render () {
    const self = this;
    const data = this.props.fixtures;
    const teams = this.props.teams;

    const teamSelectOptionsArr = _.compact(_.map(teams, (team) => {
      if (team.id !== self.props.team.id) {
        return [team.attributes.short_name, team.attributes.short_name];
      }
    }));

    const teamNameSelectOptions = _.object(teamSelectOptionsArr);

    const columns = [
      {
        text: 'Round',
        dataField: 'round_id',
        sort: true,
        align: 'center',
        headerAlign: 'center',
      }, {
        text: 'Kickoff',
        dataField: 'kickoff_time',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        formatter: (cell, row) => {
          return moment(cell).tz(this.props.tz).format('DD/MM/YY - HH:MM');
        }
      }, {
        text: 'Opponent',
        dataField: 'opponent_short_name',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        filter: selectFilter({
          options: teamNameSelectOptions,
          placeholder: ' '
        })
      }, {
        text: 'H/A',
        dataField: 'leg',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        filter: selectFilter({
          options: { H: 'H', A: 'A' },
          placeholder: ' '
        })
      }, {
        text: 'Result',
        dataField: 'result',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        filter: selectFilter({
          options: { W: 'W', D: 'D', L: 'L' },
          placeholder: ' '
        })
      }, {
        text: 'Score',
        dataField: 'score',
        align: 'center',
        headerAlign: 'center',
      }, {
        text: 'Advantage',
        dataField: 'advantage',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        classes: (cell, row, rowIndex, colIndex) => {
          let adv;
          if (cell > 0) {
            adv = `diff-h-${cell}`;
          } else if (cell < 0) {
            adv = `diff-a-${Math.abs(cell)}`;
          } else {
            adv = `diff-e`
          }

          return `${adv} transparent-text`;
        },

      }
    ]

    return (
      <div className='bs-table'>
        <BootstrapTable
          keyField='kickoff_time'
          data={ data }
          columns={ columns }
          filter={ filterFactory() }
          striped
          hover
        />
      </div>
    );
  }
}
