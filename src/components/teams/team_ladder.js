import React, { Component } from 'react';
import $ from 'jquery';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

export default class TeamLadder extends Component {
  componentDidMount () {
    $('.team-ladder-table table').addClass('scroll-table');
  }
  render () {
    const data = this.props.teams
    const columns = [
      { dataField: 'attributes.position', text: 'Position' },
      { dataField: 'attributes.name', text: 'Name' },
      { dataField: 'attributes.played', text: 'Played' },
      { dataField: 'attributes.wins', text: 'Wins' },
      { dataField: 'attributes.losses', text: 'Losses' },
      { dataField: 'attributes.draws', text: 'Draws' },
      { dataField: 'attributes.current_form', text: 'Current Form' },
      { dataField: 'attributes.goal_difference', text: 'G/D' },
      { dataField: 'attributes.points' , text: 'Points'}
    ]

    return (
      <div className='team-ladder-table'>
        <BootstrapTable
          keyField='attributes.name'
          data={ data }
          columns={ columns }
          striped
          hover
          condensed
          className='foo'
        />
      </div>
    );
  }
}
