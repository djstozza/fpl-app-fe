import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

export default class NewTradeGroupButton extends Component {
  newTradeGroupButton () {
    if (this.props.unSelectable) {
      return;
    }

    let className;
    let buttonText;

    if (isEmpty(this.props.out_players)) {
      className = 'btn-primary'
      buttonText = 'Create A New Trade'
    } else {
      className = 'btn-danger'
      buttonText = 'Cancel'
    }

    return (
      <button
        id='new-trade-group-button'
        className={ `btn ${className}` }
        onClick={ () => this.toggleNewTradeButton() }
      >
        { buttonText }
      </button>
    );
  }

  toggleNewTradeButton () {
    if (isEmpty(this.props.out_players)) {
      this.props.newInterTeamTrade();
    } else {
      this.props.cancelInterTeamTrade();
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
