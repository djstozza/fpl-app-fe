import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import filterFactory, { textFilter, numberFilter, selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import $ from 'jquery'
import { tooltipHeader } from '../../utils/data_table';
import { mappedObj } from '../../utils/lodash';
import { isEmpty, sortBy } from 'lodash';

export default class PlayersTable extends Component {
  constructor (props) {
    super(props);
    this.selectTradePlayer = this.selectTradePlayer.bind(this);
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  selectTradePlayer (row, isSelect) {
    if (!this.props.user_owns_fpl_team && !this.props.your_turn) {
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
    const unpicked_players = this.props.unpicked_players;
    const positions = this.props.positions;
    const data = sortBy(unpicked_players, (player) => { return player.total_points }).reverse();
    console.log(this.props)
    const positionOptions = mappedObj(positions, 'singular_name_short', 'singular_name_short');
    const teamOptions = mappedObj(teams, 'id', 'short_name');

    const defaultSorted = [{ dataField: 'attributes.total_points', order: 'desc' }];

    const paginationOptions = {
      hidePageListOnlyOnePage: true
    }

    const columns = [
      {
       text: 'ID',
       dataField: 'id',
       hidden: true
      }, {
        text: 'Last Name',
        dataField: 'last_name',
        align: 'center',
        headerAlign: 'center',
        sort: true,
        filter: textFilter({
          placeholder: ' '
        }),
        formatter: (cell, row) => {
          return <Link to={ `/players/${row.id}` }>{ cell }</Link>;
        },
        headerFormatter: tooltipHeader
      }, {
        text: 'Team',
        dataField: 'team_id',
        align: 'center',
        headerAlign: 'center',
        formatter: (cell, row) => {
          return teamOptions[cell];
        },
        headerFormatter: tooltipHeader,
        filter: selectFilter({
          options: teamOptions,
          placeholder: ' ',
        }),
      }, {
        text: 'Position',
        dataField: 'singular_name_short',
        align: 'center',
        headerAlign: 'center',
        headerClasses: 'position-header',
        headerFormatter: tooltipHeader,
        filter: selectFilter({
          options: isEmpty(this.props.selected) ? positionOptions :
                    { [this.props.selected.singular_name_short]: this.props.selected.singular_name_short },
          placeholder: ' ',
          withoutEmptyOption: !isEmpty(this.props.selected),
        })
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
        text: 'Last Round',
        dataField: 'event_points',
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
    ];

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
      <div className='bs-xxs-scroll-table'>
        <BootstrapTable
          keyField='id'
          data={ data }
          columns={ columns }
          filter={ filterFactory() }
          pagination={ paginationFactory({ hideSizePerPage: true }) }
          selectRow={ selectRow }
          rowClasses={ rowClasses }
          striped
          hover
        />
      </div>
    )
  }
}
