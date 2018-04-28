import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default class NewTradeGroupButton extends Component {
  newTradeGroupButton () {
    if (this.props.unSelectable) {
      return;
    }

    return (
      <button
        id='new-trade-group-button'
        className='btn btn-primary'
        onClick={ () => this.toggleNewTradeGroup() }
      >
        Create A New Trade
      </button>
    );
  }

  toggleNewTradeGroup () {
    const $tradeGroupList = $('#new-trade-group');
    const $newTradeGroupButton = $('#new-trade-group-button');

    $newTradeGroupButton.toggleClass('btn-danger', 'btn-primary');
    if ($newTradeGroupButton.hasClass('btn-danger')) {
      $($newTradeGroupButton).html('Cancel');
    } else {
      $($newTradeGroupButton).html('Create A New Trade');
    }
  }

  render () {
    return (
      <div>
        { this.newTradeGroupButton() }
        <Link to={ `/fpl_teams/${this.props.fplTeamId}` } className='btn btn-secondary'>Back to Fpl Team</Link>
      </div>
    )
  }
}
