import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, numberFilter, selectFilter, Comparator } from 'react-bootstrap-table2-filter';

export default class FixtureHistoriesTable extends Component {
  render () {
    const player = this.props.player;
    const position = this.props.position;
    const data = this.props.player.player_fixture_histories
    const columns = [
      {
       text: 'ID',
       dataField: 'id',
       hidden: true
      }, {
       text: 'Round',
       dataField: 'round',
       sort: true,
       align: 'center',
       headerAlign: 'center',
     }, {
       text: 'Minutes',
       dataField: 'minutes',
       sort: true,
       align: 'center',
       headerAlign: 'center',
     }, {
       text: 'Goals',
       dataField: 'goals_scored',
       sort: true,
       align: 'center',
       headerAlign: 'center',
       hidden: position.singular_name_short === 'GKP'
     }, {
       text: 'Assists',
       dataField: 'assists',
       align: 'center',
       sort: true,
       headerAlign: 'center',
       hidden: position.singular_name_short === 'GKP'
     }, {
       text: 'Saves',
       dataField: 'saves',
       sort: true,
       align: 'center',
       headerAlign: 'center',
       hidden: position.singular_name_short !== 'GKP'
     }, {
       text: 'Yellow Cards',
       dataField: 'yellow_cards',
       sort: true,
       align: 'center',
       headerAlign: 'center',
     }, {
       text: 'Red Cards',
       dataField: 'red_cards',
       sort: true,
       align: 'center',
       headerAlign: 'center',
     }, {
       text: 'Clean Sheets',
       dataField: 'clean_sheets',
       sort: true,
       align: 'center',
       headerAlign: 'center',
       hidden: position.singular_name_short === 'FWD',
     }, {
       text: 'Goals Conceded',
       dataField: 'goals_conceded',
       sort: true,
       align: 'center',
       hidden: position.singular_name_short === 'FWD',
       headerAlign: 'center',
     }, {
       text: 'Own Goals',
       dataField: 'own_goals',
       sort: true,
       align: 'center',
       hidden: position.singular_name_short === 'FWD',
       headerAlign: 'center',
     }, {
       text: 'Penalties Missed',
       dataField: 'penalties_missed',
       sort: true,
       align: 'center',
       hidden: position.singular_name_short === 'GKP',
       headerAlign: 'center',
     }, {
       text: 'Penalties Saved',
       dataField: 'penalties_saved',
       sort: true,
       align: 'center',
       hidden: position.singular_name_short !== 'GKP',
       headerAlign: 'center',
     }, {
       text: 'Bonus',
       dataField: 'bonus',
       sort: true,
       align: 'center',
       headerAlign: 'center',
     }, {
       text: 'Points',
       dataField: 'total_points',
       sort: true,
       align: 'center',
       headerAlign: 'center',
     }
    ]

    const scrollClassName = position.singular_name_short === 'FWD' ? 'bs-md-scroll-table' : 'bs-scroll-table';

    return (
      <div className={ `${scrollClassName}`} >
        <BootstrapTable
          keyField='id'
          data={ data }
          columns={ columns }
          filter={ filterFactory() }
          striped
          hover
        />
      </div>
    )
  }
}
