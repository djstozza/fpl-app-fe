import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import { Link } from 'react-router-dom';
import { centerItVariableWidth } from '../../utils/nav_tab';
import compact from 'lodash/compact';
import map from 'lodash/map';
import { mappedObj } from '../../utils/lodash';
import $ from 'jquery';
import { tooltipHeader } from '../../utils/data_table';

const moment = require('moment-timezone');

export default class TeamFixtures extends Component {
  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  render () {
    const self = this;
    const data = this.props.fixtures;
    const teams = this.props.teams;

    const selectableTeams = compact(map(teams, (team) => {
      if (team.id !== self.props.team.id) {
        return team;
      }
    }));

    const selectTeam = (id) => {
      if (self.props.selectTeam) {
        self.props.selectTeam(id);
        centerItVariableWidth( `team-tab-${ id }`, 'nav-tabs', false);
      }
    }

    const teamNameSelectOptions = mappedObj(selectableTeams, 'short_name', 'short_name');

    const columns = [
      {
       text: 'ID',
       dataField: 'fixture_id',
       hidden: true
      }, {
        text: 'Round',
        dataField: 'round_id',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return <Link to={ `/rounds/${ cell }` }>{ cell }</Link>;
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'Kickoff',
        dataField: 'kickoff_time',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        formatter: (cell, row) => {
          return moment(cell).tz(this.props.tz).format('DD/MM/YY HH:mm');
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'Opponent',
        dataField: 'opponent_short_name',
        align: 'center',
        headerAlign: 'center',
        filter: selectFilter({
          options: teamNameSelectOptions,
          placeholder: ' '
        }),
        formatter: (cell, row) => {
          return (
              <Link to={ `/teams/${ row.opponent_id }` } onClick={ () => selectTeam(row.opponent_id) } >
                  { cell }
              </Link>
          );
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'H/A',
        dataField: 'leg',
        align: 'center',
        headerAlign: 'center',
        filter: selectFilter({
          options: { H: 'H', A: 'A' },
          placeholder: ' '
        }),
        headerFormatter: tooltipHeader
      }, {
        text: 'Result',
        dataField: 'result',
        align: 'center',
        headerAlign: 'center',
        filter: selectFilter({
          options: { W: 'W', D: 'D', L: 'L' },
          placeholder: ' '
        }),
        headerFormatter: tooltipHeader
      }, {
        text: 'Score',
        dataField: 'score',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
        classes: 'text-nowrap',
      }, {
        text: 'Advantage',
        dataField: 'advantage',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
        sort: true,
        classes: (cell, row, rowIndex, colIndex) => {
          let adv;
          if (cell > 0) {
            adv = `diff-h-${ cell }`;
          } else if (cell < 0) {
            adv = `diff-a-${ Math.abs(cell) }`;
          } else {
            adv = 'diff-e'
          }

          return `${ adv } transparent-text`;
        },
      }
    ]

    return (
        <div className='bs-xs-scroll-table'>
            <BootstrapTable
          keyField='fixture_id'
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
