import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, numberFilter, selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import _ from 'underscore';

export default class PlayersTable extends Component {
  render () {
    const self = this;
    const team = this.props.team;
    const teams = this.props.teams;
    const players = this.props.players;
    const data = _.sortBy(players, (player) => { return player.attributes.total_points }).reverse();

    const positionOptions = _.object(_.map(self.props.positions, (position) => {
      return [position.id, position.attributes.singular_name_short];
    }));

    const teamOptions = _.object(_.map(teams, (team) => {
      return [team.id, team.attributes.short_name];
    }));

    const defaultSorted = [{ dataField: 'attributes.total_points', order: 'desc' }];

    const columns = [
      {
       text: 'ID',
       dataField: 'id',
       hidden: true
      }, {
        text: 'Last Name',
        dataField: 'attributes.last_name',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        filter: textFilter({
          placeholder: ' '
        })
      }, {
        text: 'Position',
        dataField: 'relationships.position.data.id',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return positionOptions[cell];
        },
        filter: selectFilter({
          options: positionOptions,
          placeholder: ' ',
        })
      }, {
        text: 'Team',
        dataField: 'relationships.team.data.id',
        align: 'center',
        headerAlign: 'center',
        hidden: team !== undefined,
        formatter: (cell, row) => {
          return teamOptions[cell];
        },
        filter: selectFilter({
          options: teamOptions,
          placeholder: ' ',
        }),
      }, {
        text: 'Goals',
        dataField: 'attributes.goals_scored',
        sort: true,
        align: 'center',
        headerAlign: 'center',
      }, {
        text: 'Assists',
        dataField: 'attributes.assists',
        sort: true,
        align: 'center',
        headerAlign: 'center',
      }, {
        text: 'Yellow Cards',
        dataField: 'attributes.yellow_cards',
        sort: true,
        align: 'center',
        headerAlign: 'center',
      }, {
        text: 'Red Cards',
        dataField: 'attributes.red_cards',
        sort: true,
        align: 'center',
        headerAlign: 'center',
      }, {
        text: 'Clean Sheets',
        dataField: 'attributes.clean_sheets',
        sort: true,
        align: 'center',
        headerAlign: 'center',
      }, {
        text: 'Goals Conceded',
        dataField: 'attributes.goals_conceded',
        sort: true,
        align: 'center',
        headerAlign: 'center',
      }, {
        text: 'Saves',
        dataField: 'attributes.saves',
        sort: true,
        align: 'center',
        headerAlign: 'center',
      },{
        text: 'Form',
        dataField: 'attributes.form',
        sort: true,
        align: 'center',
        headerAlign: 'center',
      }, {
        text: 'PPG',
        dataField: 'attributes.points_per_game',
        sort: true,
        align: 'center',
        headerAlign: 'center',
      }, {
        text: 'Deam Team',
        dataField: 'attributes.in_dreamteam',
        sort: true,
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return cell ? 'Yes' : 'No';
        },
      }, {
        text: 'Total Points',
        dataField: 'attributes.total_points',
        sort: true,
        align: 'center',
        headerAlign: 'center',
      }
    ]

    return (
      <div className='bs-scroll-table'>
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
