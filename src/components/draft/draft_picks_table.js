import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import $ from 'jquery'
import { tooltipHeader } from '../../utils/data_table';
import { mappedObj } from '../../utils/lodash';
import sortBy from 'lodash/sortBy';

export default class DraftPicksTable extends Component {
  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  render () {
    const draftPicks = this.props.draft_picks;
    const teams = this.props.teams;
    const positions = this.props.positions;
    const fplTeams = this.props.fpl_teams;

    const data = sortBy(draftPicks, (draftPick) => { return draftPick.pick_number });


    const positionOptions = mappedObj(positions, 'singular_name_short', 'singular_name_short');
    const teamOptions = mappedObj(teams, 'short_name', 'short_name');
    const fplTeamOptions = mappedObj(fplTeams, 'name', 'name');

    const paginationOptions = {
      hidePageListOnlyOnePage: true
    }

    const columns = [
      {
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
        text: 'Last Name',
        dataField: 'last_name',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        filter: textFilter({
          placeholder: ' '
        }),
        formatter: (cell, row) => {
          if (row.mini_draft) {
            return 'Mini Draft Pick'
          } else {
            return <Link to={ `/players/${row.player_id}` }>{ cell }</Link>;
          }
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'Team',
        dataField: 'short_name',
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
        dataField: 'singular_name_short',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
        filter: selectFilter({
          options: positionOptions,
          placeholder: ' ',
        })
      },
    ]

    return (
      <BootstrapTable
        keyField='pick_number'
        data={ data }
        columns={ columns }
        filter={ filterFactory() }
        striped
        hover
      />
    )
  }
}
