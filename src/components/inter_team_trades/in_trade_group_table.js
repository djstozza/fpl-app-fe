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

export default class InTradeGroupTable extends Component {
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

  tradeGroupButtons () {
    const tradeGroup = this.props.tradeGroup;
    const selectorId = `trade-group-${tradeGroup.id}-add`;
    const buttonId = `${selectorId}-button`;

    if (tradeGroup.status == 'submitted') {
      return [
        <button
          className='btn btn-success'
          key={ `trade-group-${tradeGroup.id}-approve` }
          onClick={ () => this.confirmTradeAction('approve') } >
          Approve
        </button>,
        <button
          className='btn btn-danger'
          key={ `trade-group-${tradeGroup.id}-decline` }
          onClick={ () => this.confirmTradeAction('decline') } >
          Decline
        </button>
      ]
    }
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
        dataField: 'in_player_last_name',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }, {
        text: 'In',
        dataField: 'out_player_last_name',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }, {
        text: 'Position',
        dataField: 'singular_name_short',
        align: 'center',
        headerAlign: 'center',
        headerFormatter: tooltipHeader,
      }
    ];

    return (
      <div>
        <table className='table table-bordered mb-0 text-center'>
          <thead>
            <tr>
              <th className='align-middle'>Trade with: { this.props.tradeGroup.out_fpl_team.name }</th>
              <th>{ this.tradeGroupButtons() }</th>
            </tr>
          </thead>
        </table>
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
