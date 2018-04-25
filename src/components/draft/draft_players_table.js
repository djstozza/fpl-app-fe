import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import filterFactory, { textFilter, numberFilter, selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import $ from 'jquery'
import { tooltipHeader } from '../../utils/data_table';
import { mappedObj } from '../../utils/lodash';
import sortBy from 'lodash/sortBy';

export default class DraftPlayersTable extends Component {
  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  render () {
    const teams = this.props.teams;
    const players = this.props.unpicked_players;
    const positions = this.props.positions;
    const data = sortBy(players, (player) => { return player.total_points }).reverse();

    const positionOptions = mappedObj(positions, 'id', 'singular_name_short');
    const teamOptions = mappedObj(teams, 'id', 'short_name');

    const defaultSorted = [{ dataField: 'attributes.total_points', order: 'desc' }];

    const paginationOptions = {
      hidePageListOnlyOnePage: true
    }

    const columns = [
      {
        text: 'Last Name',
        dataField: 'last_name',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        filter: textFilter({
          placeholder: ' '
        }),
        formatter: (cell, row) => {
          return <Link to={ `/players/${row.player_id}` }>{ cell }</Link>;
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'Team',
        dataField: 'team_id',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return teamOptions[cell];
        },
        headerFormatter: tooltipHeader,
        filter: selectFilter({
          options: teamOptions,
          placeholder: ' ',
        }),
      }, {
        text: 'Position',
        dataField: 'position_id',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return positionOptions[cell];
        },
        headerFormatter: tooltipHeader,
        filter: selectFilter({
          options: positionOptions,
          placeholder: ' ',
        })
      }, {
        text: 'Status',
        dataField: 'status',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return <i className={ `${cell} fa-lg` } />
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'Total Points',
        dataField: 'total_points',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      }, {
        text: 'Draft Player',
        dataField: 'id',
        align: 'center',
        headerAlign: 'center',
        hidden: !this.props.your_turn || (this.props.your_turn && this.props.all_players_picked),
        formatter: (cell, row) => {
          return (
            <button
              className={ `btn btn-primary ${window.innerWidth > 320 ? '' : 'btn-sm' }` }
              onClick={ () => this.props.updateDraft(cell) }
            >
              Draft
            </button>
          );
        },
        headerFormatter: tooltipHeader,
      }
    ]

    return (
      <BootstrapTable
        keyField='id'
        data={ data }
        columns={ columns }
        filter={ filterFactory() }
        pagination={ paginationFactory() }
        striped
        hover
      />
    )
  }
}
