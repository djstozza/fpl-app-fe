import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Link } from 'react-router-dom';
import { tooltipHeader } from '../../utils/data_table';
import { map, sortBy } from 'lodash';
import $ from 'jquery'

export default class FplTeamsTable extends Component {
  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  render () {
    const data = this.props.fpl_teams;

    const columns = [
      {
       text: 'ID',
       dataField: 'fpl_team_id',
       hidden: true,
       editable: false,
      }, {
        text: 'Team Name',
        dataField: 'name',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        formatter: (cell, row) => {
          return <Link to={ `/fpl_teams/${row.fpl_team_id}` }>{ cell }</Link>;
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'League',
        dataField: 'league_name',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        formatter: (cell, row) => {
          return <Link to={ `/leagues/${row.league_id}` }>{ cell }</Link>;
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'Rank',
        dataField: 'rank',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        headerFormatter: tooltipHeader
      }, {
        text: 'Total Score',
        dataField: 'total_score',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        headerFormatter: tooltipHeader
      }
    ]

    return (
      <div>
        <BootstrapTable
          keyField='fpl_team_id'
          data={ data }
          columns={ columns }
          striped
          hover
        />
      </div>
    )
  }
}
