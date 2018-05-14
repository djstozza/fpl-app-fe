import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Link } from 'react-router-dom';
import { tooltipHeader } from '../../utils/data_table';
import { mappedObj } from '../../utils/lodash';
import { isEmpty, isNumber } from 'lodash';
import $ from 'jquery'

export default class FplTeamListTable extends Component {
  constructor (props) {
    super(props);

    this.selectPlayer = this.selectPlayer.bind(this);
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  selectPlayer (row, isSelect) {
    if (!this.props.user_owns_fpl_team) {
      return;
    }

    if (isEmpty(this.props.selected)) {
      this.props.selectListPosition(row);
    } else if (row.id === this.props.selected.id) {
      this.props.clearSelectedPlayer();
    } else if ( this.validSubstitution(row) && this.props.action === 'substitute') {
      this.props.substitutePlayers(row);
    }
  }

  validSubstitution (row) {
    if (!isEmpty(this.props.substitute_options) && this.props.substitute_options.indexOf(row.player_id) >= 0) {
      return true
    }
  }

  render () {
    console.log(this.props.list_positions)
    const data = this.props.list_positions;

    const columns = [
      {
       text: 'i',
       dataField: 'i',
       hidden: true,
     }, {
        text: 'Role',
        dataField: 'role',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
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
        dataField: 'team_short_name',
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
        text: 'Opponent',
        dataField: 'opponent_short_name',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return <Link to={ `/teams/${row.opponent_id}` }>{ cell }</Link>;
        },
        headerFormatter: tooltipHeader,
      }, {
        text: 'Minutes',
        dataField: 'minutes',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }, {
        text: 'Total Points',
        dataField: 'total_points',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }, {
        text: 'Points',
        dataField: 'fixture_points',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      },
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

      if (this.validSubstitution(row) && this.props.action === 'substitute') {
        classes = 'select-option';
      } else if (this.props.selected.id === row.id) {
        classes = 'selected';
      }

      return classes;
    }

    return (
      <div className='bs-xxs-scroll-table d-sm-none'>
        <BootstrapTable
          keyField='i'
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
