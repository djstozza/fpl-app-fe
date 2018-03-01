import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import _ from 'underscore';

export default class TeamLadder extends Component {
  render () {
    const data = _.sortBy(this.props.teams, (team) => { return team.attributes.position });

    const columns = [
      { dataField: 'attributes.position',text: 'Position', sort: true, align: 'center', headerAlign: 'center' },
      { dataField: 'attributes.name', text: 'Name', sort: true, align: 'center', headerAlign: 'center' },
      { dataField: 'attributes.played', text: 'Played', sort: true, align: 'center', headerAlign: 'center' },
      { dataField: 'attributes.wins', text: 'Wins', sort: true, align: 'center', headerAlign: 'center' },
      { dataField: 'attributes.losses', text: 'Losses', sort: true, align: 'center', headerAlign: 'center' },
      { dataField: 'attributes.draws', text: 'Draws', sort: true, align: 'center', headerAlign: 'center' },
      { dataField: 'attributes.current_form', text: 'Current Form', align: 'center', headerAlign: 'center' },
      { dataField: 'attributes.goal_difference', text: 'G/D', sort: true, align: 'center', headerAlign: 'center' },
      { dataField: 'attributes.points' , text: 'Points', sort: true, align: 'center', headerAlign: 'center' }
    ]

    const defaultSorted = [{ dataField: 'attributes.position', order: 'asc' }];

    const rowClasses = (row, rowIndex) => {
      let classes;
      if (this.props.team && row.id === String(this.props.team.id)) {
        classes = 'diff-e';
      }

      return classes;
    };

    return (
      <div className='bs-md-scroll-table'>
        <BootstrapTable
          keyField='attributes.name'
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
