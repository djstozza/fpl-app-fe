import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import $ from 'jquery';
import { tooltipHeader } from '../../utils/data_table';

export default class PastHistoryTable extends Component {
  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  render () {
    const position = this.props.position;
    const data = this.props.player.player_past_histories
    const columns = [
        {
         text: 'ID',
         dataField: 'id',
         hidden: true
       }, {
         text: 'Season',
         dataField: 'season_name',
         sort: true,
         align: 'center',
         headerAlign: 'center',
         headerFormatter: tooltipHeader
       }, {
         text: 'Minutes',
         dataField: 'minutes',
         sort: true,
         align: 'center',
         headerAlign: 'center',
         headerFormatter: tooltipHeader
       }, {
         text: 'Goals',
         dataField: 'goals_scored',
         sort: true,
         align: 'center',
         headerAlign: 'center',
         hidden: position.singular_name_short === 'GKP',
         headerFormatter: tooltipHeader
       }, {
         text: 'Assists',
         dataField: 'assists',
         align: 'center',
         sort: true,
         headerAlign: 'center',
         hidden: position.singular_name_short === 'GKP',
         headerFormatter: tooltipHeader
       }, {
         text: 'Saves',
         dataField: 'saves',
         sort: true,
         align: 'center',
         headerAlign: 'center',
         hidden: position.singular_name_short !== 'GKP',
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
         hidden: position.singular_name_short === 'FWD',
         headerFormatter: tooltipHeader
       }, {
         text: 'Goals Conceded',
         dataField: 'goals_conceded',
         sort: true,
         align: 'center',
         hidden: position.singular_name_short === 'FWD',
         headerAlign: 'center',
         headerFormatter: tooltipHeader
       }, {
         text: 'Own Goals',
         dataField: 'own_goals',
         sort: true,
         align: 'center',
         hidden: position.singular_name_short === 'FWD',
         headerAlign: 'center',
         headerFormatter: tooltipHeader
       }, {
         text: 'Penalties Missed',
         dataField: 'penalties_missed',
         sort: true,
         align: 'center',
         hidden: position.singular_name_short === 'GKP',
         headerAlign: 'center',
         headerFormatter: tooltipHeader
       }, {
         text: 'Penalties Saved',
         dataField: 'penalties_saved',
         sort: true,
         align: 'center',
         hidden: position.singular_name_short !== 'GKP',
         headerAlign: 'center',
         headerFormatter: tooltipHeader
       }, {
         text: 'Bonus',
         dataField: 'bonus',
         sort: true,
         align: 'center',
         headerAlign: 'center',
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
        <div className='bs-xs-scroll-table' >
            <BootstrapTable
          keyField='id'
          data={ data }
          columns={ columns }
          striped
          hover
        />
        </div>
    )
  }
}
