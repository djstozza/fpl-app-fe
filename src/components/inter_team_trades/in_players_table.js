import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, numberFilter, selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import { tooltipHeader } from '../../utils/data_table';
import { mappedObj } from '../../utils/lodash';
import { isEmpty, isNumber, sortBy } from 'lodash';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default class InPlayersTable extends Component {
  constructor (props) {
    super(props);
    this.selectTradePlayer = this.selectTradePlayer.bind(this);
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  selectTradePlayer (row, isSelect) {
    if (!this.props.user_owns_fpl_team) {
      return;
    }

    if (isEmpty(this.props.selected)) {
      return;
    } else if (isEmpty(this.props.tradePlayer)) {
      this.props.selectTradePlayer(row);
    } else if (this.props.tradePlayer.id === row.id) {
      this.props.clearTradePlayer();
    }
  }


  render () {
    const teams = this.props.teams;
    const positions = this.props.positions;
    const fplTeams = this.props.fpl_teams;

    const positionOptions = mappedObj(positions, 'singular_name_short', 'singular_name_short');
    const teamOptions = mappedObj(teams, 'short_name', 'short_name');
    const fplTeamOptions = mappedObj(fplTeams, 'name', 'name');
    console.log(fplTeamOptions)

    const data = this.props.in_players;

    let selectOptions;


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
        filter: textFilter({
          placeholder: ' '
        }),
        formatter: (cell, row) => {
          return <Link to={ `/players/${row.id}` }>{ cell }</Link>;
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'Fpl Team Name',
        dataField: 'fpl_team_name',
        align: 'center',
        headerAlign: 'center',
        hidden: !isEmpty(this.props.tradeGroup),
        formatter: (cell, row) => {
          return <Link to={ `/fpl_teams/${row.fpl_team_id}` }>{ cell }</Link>;
        },
        filter: selectFilter({
          options: fplTeamOptions,
          placeholder: ' ',
        }),
        headerFormatter: tooltipHeader,
      }, {
        text: 'Team',
        dataField: 'short_name',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return <Link to={ `/teams/${row.team_id}` }>{ cell }</Link>;
        },
        filter: selectFilter({
          options: teamOptions,
          placeholder: ' ',
        }),
        headerFormatter: tooltipHeader,
      }, {
        text: 'Position',
        dataField: 'singular_name_short',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
        filter: selectFilter({
          options: isEmpty(this.props.selected) ? positionOptions :
                    { [this.props.selected.singular_name_short]: this.props.selected.singular_name_short },
          getFilter: (filter) => {
            console.log(filter)

            selectOptions = filter
            // qualityFilter was assigned once the component has been mounted.

          },
          placeholder: ' ',
          withoutEmptyOption: !isEmpty(this.props.selected),
          placeholder: ' ',
        }),
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
        sort: true,
        headerFormatter: tooltipHeader,
      }, {
        text: 'Total Points',
        dataField: 'total_points',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        headerFormatter: tooltipHeader,
      }
    ]

    const selectRow = {
      mode: 'radio',
      clickToSelect: true,
      hideSelectColumn: true,
      onSelect: this.selectTradePlayer
    };

    const rowClasses = (row, rowIndex) => {
      let classes = null;

      if (isEmpty(this.props.selected)) {
        return;
      }

      if (isEmpty(this.props.tradePlayer)) {
        return
      }

      if (this.props.tradePlayer.id === row.id) {
        classes='select-option';
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
          filter={ filterFactory() }
          pagination={ paginationFactory({ hideSizePerPage: true }) }
          hover
        />
      </div>
    );
  }
}
