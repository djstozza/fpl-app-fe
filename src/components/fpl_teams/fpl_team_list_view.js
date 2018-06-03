import React, { Component } from 'react';
import { every, isEmpty, isNumber } from 'lodash';
import { Link } from 'react-router-dom';
import { capitaliseText } from '../../utils/general';

import FplTeamListTable from './fpl_team_list_table';
import FieldView from './field_view';
import TradePlayersTable from './trade_players_table';
import WaiverPicksTable from './waiver_picks_table';


export default class FplTeamListView extends Component {
  showButtons () {
    if (!this.props.user_owns_fpl_team) {
      return;
    }

    if (!this.props.editable) {
      return;
    }

    return (
      <div>
        { this.listPositionSelectButton() }
        <Link to={ `/fpl_teams/${this.props.fplTeamId}/inter_team_trades` } className='btn btn-secondary btn-lg'>
          Inter team trades
        </Link>
        { this.goToMiniDraftLink() }
      </div>
    )
  }

  listPositionSelectButton () {
    if (this.props.status === 'mini_draft') {
      return;
    }

    if (this.props.action === 'substitute') {
      return (
        <button
          className='btn btn-secondary btn-lg'
          onClick={ () => this.props.initiateTrade() }
        >
          { capitaliseText(this.props.status) }
        </button>
      )
    } else {
      return (
        <button
          key='substitute'
          className='btn btn-secondary btn-lg'
          onClick={ () => this.props.resetSelection() }
        >
          Change line up
        </button>
      )
    }
  }

  goToMiniDraftLink () {
    if (this.props.status === 'mini_draft') {
      return (
        <Link to={ `/leagues/${this.props.fpl_team.league_id}/mini_draft` } className='btn btn-lg btn-secondary'>
          Go to mini draft
        </Link>
      )
    }
  }

  colClass () {
    let classes;

    if (this.props.action === 'substitute' || (this.props.status !== 'waiver' && this.props.status !== 'trade')) {
      classes = 'col-lg-12';
    } else {
      classes = 'col-lg-6';
    }
    return classes;
  }

  showFplTeamListTable () {
    return (
      <div>
        { this.descriptionText() }
        <FplTeamListTable { ...this.props } />
        <FieldView { ...this.props } />
      </div>
    );
  }

  descriptionTitle () {
    if (!this.props.user_owns_fpl_team) {
      return;
    }

    if (!this.props.editable) {
      return;
    }

    let title;

    if (this.props.action === 'substitute') {
      title = 'Starting Lineup';
    } else {
      title = `${capitaliseText(this.props.action)} Out`;
    }

    return <h4 className='mb-0'>{ title }</h4>
  }

  descriptionText () {
    if (!this.props.user_owns_fpl_team) {
      return;
    }

    if (!this.props.editable) {
      return;
    }

    let title;
    let text;

    if (this.props.action === 'substitute') {
      title = 'Starting Lineup';
      text= 'Select your starting lineup';
    } else {
      title = `${capitaliseText(this.props.action)} Out`;
      text= `(1) Select the player you wish to ${ this.props.action } out`
    }

    return (
      <div>
        <h4 className='mb-0'>{ title }</h4>
        <span>{ text }</span>
      </div>
    )
  }

  showTradePlayersTable () {
    if (isEmpty(this.props.unpicked_players)) {
      return;
    }

    if (this.props.action === 'substitute') {
      return;
    }

    if (!this.props.editable) {
      return;
    }

    return (
      <div>
        <h4 className='mb-0'>{ capitaliseText(this.props.action) } In</h4>
        <span>(2) Select the player you wish to { this.props.action } in</span>
        <TradePlayersTable { ...this.props } />
        { this.completeTradeButtons() }
      </div>
    )
  }

  completeTradeButtons () {
    if (!this.props.user_owns_fpl_team) {
      return;
    }

    if (isEmpty(this.props.selected) || isEmpty(this.props.tradePlayer)) {
      return;
    }

    return (
      <button
        className='btn btn-secondary'
        onClick={ () => this.props.completeTradeAction() }
      >
       Complete { capitaliseText(this.props.action) }
      </button>
    );
  }

  showWaiverPicksTable () {
    if (!this.props.user_owns_fpl_team) {
      return;
    }

    if (isEmpty(this.props.waiver_picks)) {
      return;
    }

    return (
      <div>
        <h4 className='mt-3 mb-0'>Waiver Picks</h4>
        <WaiverPicksTable { ...this.props } />
      </div>
    );
  }

  goToDraftLink () {
    if (this.props.league_status === 'draft') {
      return (
        <Link to={ `/leagues/${this.props.fpl_team.league_id}/draft` } className='btn btn-primary'>
          Go to Draft
        </Link>
      )
    }
  }

  showScore () {
    if (this.props.status !== 'started') {
      return;
    }

    return (
      <h5>Score: { this.props.fpl_team_list.total_score }</h5>
    );
  }

  render () {
    if (this.props.league_status !== 'active') {
      return (
        <div>
          <p>You will be able to view your players once the draft has been completed</p>
          { this.goToDraftLink() }
        </div>
      )
    } else {
      return (
        <div>
          { this.showScore() }
          { this.showButtons() }
          <div className='row'>
            <div className={`col col-12 col-md-12 ${this.colClass()}`}>
              { this.showFplTeamListTable() }
            </div>
            <div className='col col-12 col-md-12 col-lg-6'>
              { this.showTradePlayersTable() }
            </div>
          </div>
          { this.showWaiverPicksTable() }
        </div>
      );
    }
  }
}
