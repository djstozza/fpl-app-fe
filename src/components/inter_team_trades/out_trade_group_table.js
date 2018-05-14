import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, numberFilter, selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import { Link } from 'react-router-dom';
import { tooltipHeader } from '../../utils/data_table';
import { capitaliseText } from '../../utils/general';
import { map } from 'lodash';
import $ from 'jquery'
import { isEmpty } from 'lodash';

import OutPlayersTable from './out_players_table';
import InPlayersTable from './in_players_table';

export default class OutTradeGroupTable extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: '',
      user_owns_fpl_team: this.props.user_owns_fpl_team,
      tradeGroup: this.props.tradeGroup,
      out_players: this.props.tradeGroup.out_players_tradeable,
      in_players: this.props.tradeGroup.in_players_tradeable,
      positions: this.props.positions,
    }

    this.selectPlayer = this.selectPlayer.bind(this);
    this.clearSelectedPlayer = this.clearSelectedPlayer.bind(this);
    this.selectTradePlayer = this.selectTradePlayer.bind(this);
    this.clearTradePlayer = this.clearTradePlayer.bind(this);
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip();
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      tradeGroup: nextProps.tradeGroup,
      out_players: nextProps.tradeGroup.out_players_tradeable,
      in_players: nextProps.tradeGroup.in_players_tradeable,
    });
  }

  showTradeList (selectorId, buttonId) {
    const $selector = $(`#${selectorId}`);
    const $button = $(`#${buttonId}`);

    if ($selector.hasClass('d-none')) {
      $selector.removeClass('d-none');
      $button.removeClass('btn-primary').addClass('btn-danger').text('Cancel');
    } else {
      $selector.addClass('d-none');
      $button.removeClass('btn-danger').addClass('btn-primary').text('Add');
      this.clearSelectedPlayer();
    }
  }

  addTrade () {
    this.props.updateTrade(
      this.state.tradeGroup.id,
      this.state.selected.list_position_id,
      this.state.tradePlayer.list_position_id,
      null,
      'Add',
    );
    this.clearSelectedPlayer();
  }

  deleteTrade (row) {
    this.props.updateTrade(
      this.state.tradeGroup.id,
      null,
      null,
      row.id,
      'RemoveFromTradeGroup',
    );
  }

  confirmTradeAction (action) {
    const confirmText = `Are you sure you want to ${action} this trade?`

    if (window.confirm(confirmText)) {
      this.props.updateTrade(
        this.state.tradeGroup.id,
        null,
        null,
        null,
        action,
      )
    }
  }


  completeTradeButtons () {
    if (!this.state.user_owns_fpl_team) {
      return;
    }

    if (isEmpty(this.state.selected) || isEmpty(this.state.tradePlayer)) {
      return;
    }

    return (
      <button
        className='btn btn-secondary'
        onClick={ () => this.addTrade() }
      >
        Submit
      </button>
    );
  }

  tradeGroupButtons () {
    const tradeGroup = this.props.tradeGroup;
    const selectorId = `trade-group-${tradeGroup.id}-add`;
    const buttonId = `${selectorId}-button`;

    if (tradeGroup.status == 'pending') {
      return [
        <button
          className='btn btn-primary'
          id={ buttonId }
          key={ buttonId }
          onClick={ () => this.showTradeList(selectorId, buttonId) }
        >
          Add
        </button>,
        <button
          className='btn btn-success'
          key={`trade-group-${tradeGroup.id}-submit` }
          onClick={ () => this.confirmTradeAction('submit') }
        >
          Submit
        </button>,
        <button
          className='btn btn-danger'
          key={ `trade-group-${tradeGroup.id}-delete` }
          onClick={ () => this.confirmTradeAction('delete') } >
          Delete
        </button>
      ];
    } else if (tradeGroup.status == 'submitted') {
      return (
        <button
          className='btn btn-danger'
          key={ `trade-group-${tradeGroup.id}-delete` }
          onClick={ () => this.confirmTradeAction('delete') } >
          Delete
        </button>
      );
    }
  }

  selectPlayer (player) {
    this.setState({ selected: player });
  }

  clearSelectedPlayer () {
    this.setState({ selected: '', tradePlayer: '' });
  }

  selectTradePlayer (tradePlayer) {
    this.setState({ tradePlayer: tradePlayer });
  }

  clearTradePlayer () {
    this.setState({ tradePlayer: '' });
  }

  render () {
    const data = this.props.tradeGroup.trades;

    const columns = [
      {
        text: 'ID',
        dataField: 'id',
        hidden: true,
        editable: false,
      }, {
        text: 'Out',
        dataField: 'out_player_last_name',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }, {
        text: 'In',
        dataField: 'in_player_last_name',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }, {
        text: 'Position',
        dataField: 'singular_name_short',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }, {
        text: 'Delete',
        dataField: 'id',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
        hidden: data.length <= 1 || this.props.tradeGroup.status !== 'pending',
        formatter: (cell, row) => {
         return <button onClick={ (e) => this.deleteTrade(row) }>Delete</button>;
        },
      }
    ];

    return (
      <div>
        <table className='table table-bordered mb-0 text-center'>
          <thead>
            <tr>
              <th className='align-middle'>Trade with: { this.props.tradeGroup.in_fpl_team.name }</th>
              <th>{ this.tradeGroupButtons() }</th>
            </tr>
          </thead>
        </table>
        <div id={ `trade-group-${this.props.tradeGroup.id}-add` } className={ `row d-none` }>
          <div className='col col-md-6 col-sm-12'>
            <OutPlayersTable
              { ...this.state }
              selectPlayer={ this.selectPlayer }
              clearSelectedPlayer={ this.clearSelectedPlayer }
            />
          </div>
          <div className='col col-md-6 col-sm-12'>
            <InPlayersTable
              { ...this.state }
              selectTradePlayer={ this.selectTradePlayer }
              clearTradePlayer={ this.clearTradePlayer }
            />
            { this.completeTradeButtons() }
          </div>
        </div>
        <BootstrapTable
          keyField='id'
          data={ data }
          columns={ columns }
          striped
          hover
        />
      </div>
    );
  }
}
