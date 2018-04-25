import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Link } from 'react-router-dom';
import { tooltipHeader } from '../../utils/data_table';
import { map, sortBy } from 'lodash';
import $ from 'jquery'

export default class FplTeamsTable extends Component {
  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  render () {
    const data = this.props.fpl_teams;
    const sortedFplTeamsByPickNumber = sortBy(data, (fplTeam) => { return fplTeam.draft_pick_number });
    const pickNumberOptions = map(sortedFplTeamsByPickNumber, (fplTeam) => {
      const pickNumber = fplTeam.draft_pick_number
      return (
        <option key={ pickNumber } value={ pickNumber }>{ pickNumber }</option>
      )
    });
    const status = this.props.league.status

    const columns = [
      {
       text: 'ID',
       dataField: 'fpl_team_id',
       hidden: true,
       editable: false,
      }, {
        text: 'Team Name',
        dataField: 'name',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        formatter: (cell, row) => {
          return <Link to={ `/fpl_teams/${row.fpl_team_id}` }>{ cell }</Link>;
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'User',
        dataField: 'username',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        formatter: (cell, row) => {
          return <Link to={ `/users/${row.user_id}` }>{ cell }</Link>;
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'Pick Number',
        dataField: 'draft_pick_number',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        formatter: (cell, row) => {
          if (status === 'create_draft') {
            return (
              <select
                defaultValue={ cell }
                onChange={ (e) => this.props.updateDraftPickOrder(row.fpl_team_id, e.target.value, false) }
              >
                { pickNumberOptions }
              </select>
            )
          } else {
            return cell
          }
        },
        style: status === 'generate_draft_picks',
        headerFormatter: tooltipHeader
      }, {
        text: 'Total Score',
        dataField: 'total_score',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        hidden: this.props.noScore,
        headerFormatter: tooltipHeader
      }
    ]

    return (
      <div>
        <BootstrapTable
          keyField='fpl_team_id'
          data={ status === 'create_draft' ? sortedFplTeamsByPickNumber : data }
          columns={ columns }
          striped
          hover
        />
      </div>
    )
  }
}
