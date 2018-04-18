import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, numberFilter, selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import { Link } from 'react-router-dom';
import { tooltipHeader } from '../../utils/data_table.js';
import { mappedObj } from '../../utils/lodash.js';
import { isEmpty, isNumber } from 'lodash';
import $ from 'jquery'

export default class PlayersTable extends Component {
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

    if (!isNumber(this.props.selected)) {
      this.props.fetchSubstitueOptions(row.id);
    }

    if (row.id === this.props.selected) {
      this.props.clearSelectedPlayer();
    }

    if (isNumber(this.props.selected) && this.validSubstitution(row)) {
      this.props.substitutePlayers(row.id);
    }
  }

  validSubstitution (row) {
    if (!isEmpty(this.props.substitute_options) && this.props.substitute_options.indexOf(row.player_id) >= 0) {
      return true
    }
  }

  render () {
    const data = this.props.fpl_team_list;

    const columns = [
      {
       text: 'ID',
       dataField: 'id',
       hidden: true,
       editable: false,
     }, {
        text: 'Role',
        dataField: 'role',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader
      },, {
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

      if (isNumber(this.props.selected) && this.validSubstitution(row)) {
        classes='select-option';
      }

      if (this.props.selected === row.id) {
        classes='selected';
      }

      return classes;
    }

    return (
      <div className={ `bs-xxs-scroll-table d-sm-none`}>
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
    )
  }
}
