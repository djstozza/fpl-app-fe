import React, { Component } from 'react';
import { isEmpty, isNumber } from 'lodash';

export default class FieldView extends Component {
  constructor (props) {
    super(props);
    this.selectPlayer = this.selectPlayer.bind(this);
  }

  selectPlayer (listPosition) {
    if (!this.props.user_owns_fpl_team) {
      return;
    }

    if (!isNumber(this.props.selected)) {
      this.props.fetchSubstitueOptions(listPosition.id);
    }

    if (listPosition.id === this.props.selected) {
      this.props.clearSelectedPlayer();
    }

    if (isNumber(this.props.selected) && this.validSubstitution(listPosition)) {
      this.props.substitutePlayers(listPosition.id);
    }
  }

  validSubstitution (listPosition) {
    if (!isEmpty(this.props.substitute_options) && this.props.substitute_options.indexOf(listPosition.player_id) >= 0) {
      return true
    }
  }

  render () {
    const self = this;
    const groupedListPositions = this.props.grouped_list_positions;
    const startingForwards = groupedListPositions['S']['FWD'];
    const startingMidfielders = groupedListPositions['S']['MID'];
    const startingDefenders = groupedListPositions['S']['DEF'];
    const startingGoalkeeper = groupedListPositions['S']['GKP'];
    const substituteOne = Object.values(groupedListPositions['S1'])[0][0];
    const substituteTwo = Object.values(groupedListPositions['S2'])[0][0];
    const substituteThree = Object.values(groupedListPositions['S3'])[0][0];
    const substituteGoalkeeper = Object.values(groupedListPositions['SGKP'])[0][0];
    console.log(startingForwards, startingMidfielders, startingDefenders);

    function colSpacing(count) {
      const spacing = 5 - count

      if (spacing > 0) {
        return `col col-${spacing}`
      }
    }

    function selectClass (listPosition) {
      if (listPosition.id === self.props.selected) {
        return 'selected';
      } else if (self.validSubstitution(listPosition)) {
        return 'select-option';
      }
    }

    function listPositionInfo(listPosition, key) {
      const crest = require(`../../images/shields/${listPosition['team_short_name'].toLowerCase()}.png`);

      return (
        <div key={ key }
          className={`col col-2 text-center border ${selectClass(listPosition)}`}
          onClick={ () => self.selectPlayer(listPosition) }
        >
          <img className='image-crest mt-1 mt-md-3' src={ crest } alt={ listPosition['team_short_name'] } />
          <p className='mb-0'>{ listPosition['last_name'] }</p>
          <p className='mb-1 mb-md-3'>
            <span>
              { listPosition['opponent_short_name'] } ({listPosition['leg']})
            </span>
            <span>
              { isNumber(listPosition['event_points']) ? ` - ${listPosition['event_points']}` : '' }
            </span>
          </p>
        </div>
      )
    }

    return (
      <div className='d-none d-sm-inline'>
        <div className='row'>
          <div className='col col-12 field'>
            <div className='row'>
              <div className='col col-1 my-auto text-center position-description'>
                FWD
              </div>
              <div className={ colSpacing(startingForwards.length) } />
              {
                startingForwards.map((listPosition, key) => {
                  return listPositionInfo(listPosition, key);
                })
              }
            </div>
            <div className='row'>
              <div className='col col-1 my-auto text-center position-description'>
                MID
              </div>
              <div className={ colSpacing(startingMidfielders.length) } />
              {
                startingMidfielders.map((listPosition, key) => {
                  return listPositionInfo(listPosition, key);
                })
              }
            </div>
            <div className='row'>
              <div className='col col-1 my-auto text-center position-description'>
                DEF
              </div>
              <div className={ colSpacing(startingDefenders.length) } />
              {
                startingDefenders.map((listPosition, key) => {
                  return listPositionInfo(listPosition, key);
                })
              }
            </div>
            <div className='row'>
              <div className='col col-1 my-auto text-center position-description'>
                GKP
              </div>
              <div className={ colSpacing(startingGoalkeeper.length) } />
              {
                startingGoalkeeper.map((listPosition, key) => {
                  return listPositionInfo(listPosition, key);
                })
              }
            </div>
            <div className='row'>
              <div className='col col-1 my-auto text-center position-description'>
                SUB
              </div>
              { listPositionInfo(substituteGoalkeeper, substituteGoalkeeper['id']) }
              <div className='col col-2' />
              { listPositionInfo(substituteOne, substituteOne['id']) }
              { listPositionInfo(substituteTwo, substituteTwo['id']) }
              { listPositionInfo(substituteThree, substituteThree['id']) }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
