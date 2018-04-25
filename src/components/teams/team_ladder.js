import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import { centerItVariableWidth } from '../../utils/nav_tab';
import $ from 'jquery';
import { tooltipHeader } from '../../utils/data_table';

export default class TeamLadder extends Component {
  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  render () {
    const self = this;
    const data = sortBy(this.props.teams, (team) => { return team.position });
    const selectTeam = (id) => {
      if (self.props.selectTeam) {
        self.props.selectTeam(id);
        centerItVariableWidth( `team-tab-${id}`, "nav-tabs", false);
      }
    }

    const columns = [
      {
        dataField: 'position',
        text: 'Position',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      },
      {
        dataField: 'short_name',
        text: 'Name',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return (
            <Link to={ `/teams/${row.id}` } onClick={ () => selectTeam(row.id) } >
              { cell }
            </Link>
          );
        },
        headerFormatter: tooltipHeader
      },
      {
        dataField: 'played',
        text: 'Played',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      },
      {
        dataField: 'wins',
        text: 'Wins',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      },
      {
        dataField: 'losses',
        text: 'Losses',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      },
      {
        dataField: 'draws',
        text: 'Draws',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      },
      {
        dataField: 'current_form',
        text: 'Form',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      },
      {
        dataField: 'goal_difference',
        text: 'Goal Difference',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      },
      { dataField: 'points' ,
        text: 'Points',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      }
    ]

    const defaultSorted = [{ dataField: 'attributes.position', order: 'asc' }];

    const rowClasses = (row, rowIndex) => {
      let classes;
      if (this.props.team && row.id === parseInt(this.props.team.id, 10)) {
        classes = 'selected';
      }

      return classes;
    };

    return (
      <div className='bs-xxs-scroll-table'>
        <BootstrapTable
          keyField='name'
          data={ data }
          columns={ columns }
          striped
          hover
          defaultSorted={ defaultSorted }
          rowClasses={ rowClasses }
        />
      </div>
    );
  }
}
