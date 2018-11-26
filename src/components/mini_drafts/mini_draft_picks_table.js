import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import { tooltipHeader } from '../../utils/data_table';
import { mappedObj } from '../../utils/lodash';
import $ from 'jquery'

export default class MiniDraftPicksTable extends Component {
  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip();
  }

  render () {
    const data = this.props.mini_draft_picks;
    const fplTeams = this.props.fpl_teams;
    const fplTeamOptions = mappedObj(fplTeams, 'name', 'name');

    const columns = [
      {
        text: 'ID',
        dataField: 'id',
        hidden: true,
        editable: false,
      }, {
        text: 'Pick Number',
        dataField: 'pick_number',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }, {
        text: 'Fpl Team Name',
        dataField: 'fpl_team_name',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
        filter: selectFilter({
          options: fplTeamOptions,
          placeholder: ' ',
        })
      }, {
        text: 'Out',
        dataField: 'out_last_name',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
         return `${ cell } (${ row.out_team_short_name })`;
        },
        headerFormatter: tooltipHeader,
      }, {
        text: 'In',
        dataField: 'in_last_name',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
        formatter: (cell, row) => {
         return `${ cell } (${ row.in_team_short_name })`;
        },
      }, {
        text: 'Position',
        dataField: 'singular_name_short',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }
    ];

    return (
        <div>
            <BootstrapTable
          keyField='id'
          data={ data }
          columns={ columns }
          striped
          filter={ filterFactory() }
          hover
        />
        </div>
    );
  }
}
