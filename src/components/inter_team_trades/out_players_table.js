import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { tooltipHeader } from '../../utils/data_table';
import { mappedObj } from '../../utils/lodash';
import { isEmpty, isNumber } from 'lodash';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default class OutPlayersTable extends Component {
  constructor (props) {
    super(props);

    this.selectPlayer = this.selectPlayer.bind(this);
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip();
  }

  selectPlayer (row, isSelect) {
    if (!this.props.user_owns_fpl_team) {
      return;
    }

    if (isEmpty(this.props.selected)) {
      this.props.selectPlayer(row);
    } else if (row.id === this.props.selected.id) {
      this.props.clearSelectedPlayer();
    }
  }

  render () {
    const data = this.props.out_players;

    const columns = [
      {
       text: 'ID',
       dataField: 'id',
       hidden: true,
     }, {
        text: 'Last Name',
        dataField: 'last_name',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return <Link to={ `/players/${row.player_id}` }>{ cell }</Link>;
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'Team',
        dataField: 'short_name',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return <Link to={ `/teams/${row.team_id}` }>{ cell }</Link>;
        },
        headerFormatter: tooltipHeader,
      }, {
        text: 'Position',
        dataField: 'singular_name_short',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }, {
        text: 'Status',
        dataField: 'status',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
        formatter: (cell, row) => {
          return (
            <span
              data-toggle="tooltip"
              data-placement="top"
              title={ row.news }
            >
              <i className={ `${cell} fa-lg` } ></i>
            </span>
          );
        }
      }, {
        text: 'Points',
        dataField: 'event_points',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }, {
        text: 'Total Points',
        dataField: 'total_points',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }
    ]

    const selectRow = {
      mode: 'radio',
      clickToSelect: true,
      hideSelectColumn: true,
      onSelect: this.selectPlayer
    };

    const rowClasses = (row, rowIndex) => {
      let classes = null;

      if (isEmpty(this.props.selected)) {
        return;
      }

      if (this.props.selected.id === row.id) {
        classes='selected';
      }

      return classes;
    }

    return (
      <div>
        <BootstrapTable
          keyField='id'
          data={ data }
          columns={ columns }
          striped
          selectRow={ selectRow }
          rowClasses={ rowClasses }
          hover
        />
      </div>
    );
  }
}
