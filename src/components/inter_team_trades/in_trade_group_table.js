import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { tooltipHeader } from '../../utils/data_table';
import $ from 'jquery';

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

  componentDidUpdate (prevProps, prevState) {
    const props = this.props;

    if (prevProps === props) {
      return;
    }

    this.setState({
      tradeGroup: props.tradeGroup,
      out_players: props.tradeGroup.out_players_tradeable,
      in_players: props.tradeGroup.in_players_tradeable,
    });
  }

  confirmTradeAction (action) {
    const confirmText = `Are you sure you want to ${action} this trade?`

    if (window.confirm(confirmText)) {
      this.props.updateTrade({
        inter_team_trade_group_id: this.state.tradeGroup.id,
        trade_action: action,
      });
    }
  }

  tradeGroupButtons () {
    const tradeGroup = this.props.tradeGroup;

    if (tradeGroup.status === 'submitted') {
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
