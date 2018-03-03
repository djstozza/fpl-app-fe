import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import { centerItVariableWidth } from '../../utils/nav_tab.js';

export default class TeamLadder extends Component {
  render () {
    const self = this;
    const data = _.sortBy(this.props.teams, (team) => { return team.position });
    const selectTeam = (id) => {
      if (self.props.selectTeam) {
        self.props.selectTeam(id);
        centerItVariableWidth( `team-tab-${id}`, "nav-tabs", false);
      }
    }

    const columns = [
      { dataField: 'position',text: 'Position', sort: true, align: 'center', headerAlign: 'center' },
      {
        dataField: 'name',
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
        }
      },
      { dataField: 'played', text: 'Played', sort: true, align: 'center', headerAlign: 'center' },
      { dataField: 'wins', text: 'Wins', sort: true, align: 'center', headerAlign: 'center' },
      { dataField: 'losses', text: 'Losses', sort: true, align: 'center', headerAlign: 'center' },
      { dataField: 'draws', text: 'Draws', sort: true, align: 'center', headerAlign: 'center' },
      { dataField: 'current_form', text: 'Current Form', align: 'center', headerAlign: 'center' },
      { dataField: 'goal_difference', text: 'G/D', sort: true, align: 'center', headerAlign: 'center' },
      { dataField: 'points' , text: 'Points', sort: true, align: 'center', headerAlign: 'center' }
    ]

    const defaultSorted = [{ dataField: 'attributes.position', order: 'asc' }];

    const rowClasses = (row, rowIndex) => {
      let classes;
      if (this.props.team && row.id === parseInt(this.props.team.id)) {
        classes = 'diff-e';
      }

      return classes;
    };

    return (
      <div className='bs-md-scroll-table'>
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
