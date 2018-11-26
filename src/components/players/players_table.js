import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import $ from 'jquery'
import { tooltipHeader } from '../../utils/data_table';
import { mappedObj } from '../../utils/lodash';
import sortBy from 'lodash/sortBy';

export default class PlayersTable extends Component {
  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  render () {
    const team = this.props.team;
    const teams = this.props.teams;
    const players = this.props.players;
    const positions = this.props.positions;
    const data = sortBy(players, (player) => { return player.total_points }).reverse();

    const positionOptions = mappedObj(positions, 'id', 'singular_name_short');
    const teamOptions = mappedObj(teams, 'id', 'short_name');

    const columns = [
      {
       text: 'ID',
       dataField: 'id',
       hidden: true
      }, {
        text: 'Last Name',
        dataField: 'last_name',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        filter: textFilter({
          placeholder: ' '
        }),
        formatter: (cell, row) => {
          return <Link to={ `/players/${ row.id }` }>{ cell }</Link>;
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'Position',
        dataField: 'position_id',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return positionOptions[ cell ];
        },
        headerFormatter: tooltipHeader,
        filter: selectFilter({
          options: positionOptions,
          placeholder: ' ',
        })
      }, {
        text: 'Team',
        dataField: 'team_id',
        align: 'center',
        headerAlign: 'center',
        hidden: team !== undefined,
        formatter: (cell, row) => {
          return teamOptions[ cell ];
        },
        headerFormatter: tooltipHeader,
        filter: selectFilter({
          options: teamOptions,
          placeholder: ' ',
        }),
      }, {
        text: 'Goals',
        dataField: 'goals_scored',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      }, {
        text: 'Assists',
        dataField: 'assists',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      }, {
        text: 'Yellow Cards',
        dataField: 'yellow_cards',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      }, {
        text: 'Red Cards',
        dataField: 'red_cards',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      }, {
        text: 'Clean Sheets',
        dataField: 'clean_sheets',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      }, {
        text: 'Goals Conceded',
        dataField: 'goals_conceded',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      }, {
        text: 'Saves',
        dataField: 'saves',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      },{
        text: 'Form',
        dataField: 'form',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      }, {
        text: 'Points Per Game',
        dataField: 'points_per_game',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      }, {
        text: 'Deam Team',
        dataField: 'in_dreamteam',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return cell ? 'Yes' : 'No';
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'Total Points',
        dataField: 'total_points',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      }
    ]

    return (
        <div className='bs-md-scroll-table'>
            <BootstrapTable
          keyField='id'
          data={ data }
          columns={ columns }
          filter={ filterFactory() }
          pagination={ paginationFactory() }
          striped
          hover
        />
        </div>
    )
  }
}
