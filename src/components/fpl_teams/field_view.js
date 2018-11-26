import React, { Component } from 'react';
import { isEmpty, isNumber } from 'lodash';
import $ from 'jquery';

export default class FieldView extends Component {
  constructor (props) {
    super(props);
    this.selectPlayer = this.selectPlayer.bind(this);
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip();
  }

  selectPlayer (listPosition) {
    if (!this.props.user_owns_fpl_team) {
      return;
    }

    if (isEmpty(this.props.selected)) {
      this.props.selectListPosition(listPosition);
    } else if (listPosition.id === this.props.selected.id) {
      this.props.clearSelectedPlayer();
    } else if ( this.validSubstitution(listPosition) && this.props.action === 'substitute') {
      this.props.substitutePlayers(listPosition);
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
    const startingForwards = groupedListPositions[ 'S' ][ 'FWD' ];
    const startingMidfielders = groupedListPositions[ 'S' ][ 'MID' ];
    const startingDefenders = groupedListPositions[ 'S' ][ 'DEF' ];
    const startingGoalkeeper = groupedListPositions[ 'S' ][ 'GKP' ];
    const substituteOne = Object.values(groupedListPositions[ 'S1' ])[ 0 ][ 0 ];
    const substituteTwo = Object.values(groupedListPositions[ 'S2' ])[ 0 ][ 0 ];
    const substituteThree = Object.values(groupedListPositions[ 'S3' ])[ 0 ][ 0 ];
    const substituteGoalkeeper = Object.values(groupedListPositions[ 'SGKP' ])[ 0 ][ 0 ];

    function colSpacing(count) {
      const spacing = 5 - count

      if (spacing > 0) {
        return `col col-${ spacing }`
      }
    }

    function selectClass (listPosition) {
      if (isEmpty(self.props.selected)) {
        return '';
      }

      if (listPosition.id === self.props.selected.id) {
        return 'selected';
      } else if (self.validSubstitution(listPosition) && self.props.action === 'substitute') {
        return 'select-option';
      } else {
        return ''
      }
    }

    function listPositionInfo(listPosition, key) {
      const crest = require(`../../images/shields/${ listPosition[ 'team_short_name' ].toLowerCase() }.png`);

      return (
          <div key={ key }
          className={ `col col-2 border px-1 ${ selectClass(listPosition) }` }
          onClick={ () => self.selectPlayer(listPosition) }
        >
              <div className='row'>
                  <div className='col col-12 mt-1'>
                      <span
                data-toggle="tooltip"
                data-placement="top"
                title={ listPosition.news }
              >
                          <i className={ `${ listPosition.status } fa-lg` }></i>
                      </span>
                      <div className='text-center'>
                          <img className='image-crest' src={ crest } alt={ listPosition[ 'team_short_name' ] } />
                      </div>
                      <div className='mb-0 text-center'>{ listPosition[ 'last_name' ] }</div>
                      <div className='mb-0 text-center'>
                          <span>
                              { listPosition[ 'fixture' ] }
                          </span>
                      </div>
                      <div className='mb-1 mb-md-2 text-center'>
                          <span>
                              { isNumber(listPosition[ 'fixture_points' ]) ? listPosition[ 'fixture_points' ] : '' }
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      )
    }

    return (
        <div className='d-none d-sm-inline field-view'>
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
                        { listPositionInfo(substituteGoalkeeper, substituteGoalkeeper[ 'id' ]) }
                        <div className='col col-2' />
                        { listPositionInfo(substituteOne, substituteOne[ 'id' ]) }
                        { listPositionInfo(substituteTwo, substituteTwo[ 'id' ]) }
                        { listPositionInfo(substituteThree, substituteThree[ 'id' ]) }
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
