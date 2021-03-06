import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { API_ROOT } from './../../api-config';
import axios from 'axios';

import { tooltipHeader } from '../../utils/data_table';
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
      out_players: [],
      in_players: [],
      tradeGroup: this.props.tradeGroup,
      positions: this.props.positions,
      fplTeamListId: this.props.fpl_team_list.id,
    }

    this.selectPlayer = this.selectPlayer.bind(this);
    this.clearSelectedPlayer = this.clearSelectedPlayer.bind(this);
    this.selectTradeablePlayer = this.selectTradeablePlayer.bind(this);
    this.clearTradeablePlayer = this.clearTradeablePlayer.bind(this);
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
      ...props,
      out_players: props.tradeGroup.out_players_tradeable,
      in_players: props.tradeGroup.in_players_tradeable,
    });
  }

  showTradeList (selectorId, buttonId) {
    const $button = $(`#${ buttonId }`);
    $button.toggleClass('btn-danger', 'btn-primary');

    if ($button.hasClass('btn-danger')) {
      $button.text('Cancel');

      axios({
        url: `${ API_ROOT }/fpl_team_lists/${ this.state.fplTeamListId }/tradeable_players.json`,
        method: 'GET',
        params: { inter_team_trade_group_id: this.props.tradeGroup.id },
      }).then(res => {
        this.setState({
          out_players: res.data.out_players,
          in_players: res.data.in_players,
        })
      });
    } else {
      $button.text('Add');
      this.setState({
        out_players: [],
        in_players: [],
      })
    }
  }

  addTrade () {
    const $button = $(`#trade-group-${ this.props.tradeGroup.id }-add-button`);
    $button.removeClass('btn-danger').addClass('btn-primary').text('Add');

    this.props.updateTrade({
      inter_team_trade_group_id: this.props.tradeGroup.id,
      out_list_position_id: this.state.selected.list_position_id,
      in_list_position_id: this.state.tradeablePlayer.list_position_id,
      trade_action: 'Add',
    });

    this.clearSelectedPlayer();
  }

  deleteTrade (row) {
    this.props.updateTrade({
      inter_team_trade_group_id: this.props.tradeGroup.id,
      inter_team_trade_id: row.id,
      trade_action: 'RemoveFromTradeGroup',
    });
  }

  confirmTradeAction (action) {
    const confirmText = `Are you sure you want to ${ action } this trade?`

    if (window.confirm(confirmText)) {
      this.props.updateTrade({
        inter_team_trade_group_id: this.props.tradeGroup.id,
        trade_action: action,
      })
    }
  }

  completeTradeButtons () {
    if (!this.props.user_owns_fpl_team) {
      return;
    }

    if (isEmpty(this.state.selected) || isEmpty(this.state.tradeablePlayer)) {
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
    const selectorId = `trade-group-${ tradeGroup.id }-add`;
    const buttonId = `${ selectorId }-button`;

    if (tradeGroup.status === 'pending') {
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
          key={ `trade-group-${ tradeGroup.id }-submit` }
          onClick={ () => this.confirmTradeAction('submit') }
        >
          Submit
          </button>,
          <button
          className='btn btn-danger'
          key={ `trade-group-${ tradeGroup.id }-delete` }
          onClick={ () => this.confirmTradeAction('delete') } >
          Delete
          </button>
      ];
    } else if (tradeGroup.status === 'submitted') {
      return (
          <button
          className='btn btn-danger'
          key={ `trade-group-${ tradeGroup.id }-delete` }
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
    this.setState({ selected: '', tradeablePlayer: '' });
  }

  selectTradeablePlayer (tradeablePlayer) {
    this.setState({ tradeablePlayer: tradeablePlayer });
  }

  clearTradeablePlayer () {
    this.setState({ tradeablePlayer: '' });
  }

  showTradeTables () {
    if (isEmpty(this.state.out_players) || isEmpty(this.state.in_players)) {
      return;
    }

    return (
        <div id={ `trade-group-${ this.props.tradeGroup.id }-add` } className='row'>
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
            selectTradeablePlayer={ this.selectTradeablePlayer }
            clearTradeablePlayer={ this.clearTradeablePlayer }
          />
                { this.completeTradeButtons() }
            </div>
        </div>
    );
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
            { this.showTradeTables() }
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
